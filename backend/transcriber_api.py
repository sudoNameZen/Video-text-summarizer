from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import shutil
import os
import uuid
from main_transcriber import transcribe_pipeline

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model for YouTube transcription
class YouTubeRequest(BaseModel):
    url: str

@app.post("/transcribe/youtube")
async def transcribe_youtube(data: YouTubeRequest):
    print(f"🔗 Received YouTube URL: {data.url}")
    try:
        print(f"Starting transcription process for YouTube video: {data.url}")
        result = transcribe_pipeline(youtube_url=data.url)
        print(f"Transcription result for YouTube URL: {data.url} - {result}")
        return JSONResponse(content={"success": True, **result})
    except Exception as e:
        print(f"❌ YouTube transcription failed for URL {data.url}: {e}")
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})

@app.post("/transcribe/upload")
async def transcribe_upload(file: UploadFile = File(...)):
    print(f"📁 Received file upload: {file.filename}")
    
    if not file.filename.lower().endswith((".mp3", ".wav", ".mp4", ".m4a")):
        print(f"❌ Unsupported file type: {file.filename}")
        return JSONResponse(status_code=400, content={"success": False, "error": "Unsupported file type"})

    # Create a unique temp file name
    file_ext = os.path.splitext(file.filename)[1]
    file_path = f"temp_upload_{uuid.uuid4().hex}{file_ext}"

    try:
        print(f"📁 Saving uploaded file: {file.filename} as {file_path}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print(f"Starting transcription process for file: {file_path}")
        result = transcribe_pipeline(local_file=file_path)
        print(f"Transcription result for file {file.filename}: {result}")
        return JSONResponse(content={"success": True, **result})
    except Exception as e:
        print(f"❌ Upload transcription failed for file {file.filename}: {e}")
        return JSONResponse(status_code=500, content={"success": False, "error": str(e)})
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"🧹 Deleted temp file: {file_path}")
