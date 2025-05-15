# backend/main_transcriber.py

import os
import subprocess
import tempfile
import shutil
import torch
from yt_dlp import YoutubeDL
from faster_whisper import WhisperModel
from datetime import timedelta

whisper_model = None

def load_whisper_model():
    global whisper_model
    if whisper_model is None:
        whisper_model = WhisperModel("large-v3", compute_type="float16", device="cuda")


def download_audio(youtube_url, output_file="downloaded_audio.m4a"):
    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_file,
            'quiet': True,
            'noplaylist': True,
        }
        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([youtube_url])
        print(f"✅ Downloaded audio to: {output_file}")
        return output_file 
    except Exception as e:
        print(f"❌ Error downloading YouTube audio: {e}")
        return None


def convert_audio_to_wav(input_file, output_file="processed_audio.wav"):
    try:
        command = ["ffmpeg", "-y", "-i", input_file, "-ac", "1", "-ar", "16000", output_file]
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return output_file if os.path.exists(output_file) else None
    except Exception as e:
        print(f"❌ Error converting audio: {e}")
        return None


def enhance_audio(input_file, output_file="enhanced_audio.wav"):
    try:
        command = [
            "ffmpeg", "-y", "-i", input_file, "-af",
            "adelay=0s:all=true,volume=8dB,highpass=f=50, lowpass=f=10000, dynaudnorm, afftdn=nf=-20",
            output_file
        ]
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        if os.path.exists(output_file):
            print(f"✨ Audio enhanced: {output_file}")
            return output_file
        else:
            return None
    except Exception as e:
        print(f"❌ Error enhancing audio: {e}")
        return None


def isolate_vocals(input_file):
    print("🎤 Isolating vocals with Demucs...")
    try:
        command = ["python", "-m", "demucs", input_file]
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)

        filename = os.path.splitext(os.path.basename(input_file))[0]
        vocals_path = f"./separated/htdemucs/{filename}/vocals.wav"
        if os.path.exists(vocals_path):
            print(f"🎶 Vocal track found: {vocals_path}")
            return vocals_path
        else:
            print(f"❌ Vocal isolation failed. File not found at {vocals_path}")
            return None
    except Exception as e:
        print(f"❌ Error running Demucs: {e}")
        return None


def remove_silence(input_file, output_file="no_silence.wav"):
    try:
        command = ["ffmpeg", "-y", "-i", input_file, "-af", "silenceremove=1:0:-30dB", output_file]
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        if os.path.exists(output_file):
            print(f"🔇 Silence removed: {output_file}")
            return output_file
        else:
            return None
    except Exception as e:
        print(f"❌ Error removing silence: {e}")
        return None


def split_audio_chunks(audio_file, chunk_duration=50):
    temp_dir = tempfile.mkdtemp()
    output_files = []

    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_file]
    total_duration = float(subprocess.check_output(cmd).decode().strip())

    for i in range(0, int(total_duration), chunk_duration):
        output_file = os.path.join(temp_dir, f"chunk_{i//chunk_duration:03d}.wav")
        cmd = ["ffmpeg", "-y", "-i", audio_file, "-ss", str(i), "-t", str(chunk_duration), "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", output_file]
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if os.path.exists(output_file):
            output_files.append(output_file)

    return output_files


def detect_language(audio_file):
    load_whisper_model()
    chunks = split_audio_chunks(audio_file, chunk_duration=40)
    lang_scores = {}

    print(f"🔍 Analyzing {len(chunks)} chunks for language detection...")
    for i, chunk in enumerate(chunks[:10], 1):
        try:
            _, info = whisper_model.transcribe(chunk, language=None)
            if info and info.language and info.language_probability:
                lang_scores[info.language] = lang_scores.get(info.language, 0) + info.language_probability
                print(f"📊 Chunk {i}: {info.language} (confidence: {info.language_probability:.2f})")
        except Exception as e:
            print(f"❌ Failed on chunk {i}: {e}")

    if lang_scores:
        best_lang = max(lang_scores.items(), key=lambda x: x[1])[0]
        if best_lang in ["sa", "pa", "ur", "mr", "bn"]:
            print(f"⚠ Detected language '{best_lang}' overridden to 'hi'")
            best_lang = "hi"
        print(f"✅ Detected Language: {best_lang}")
        return best_lang
    else:
        print("⚠ Detection failed. Defaulting to English.")
        return "en"


def format_time(seconds):
    return str(timedelta(seconds=int(seconds))).zfill(8)


def transcribe_audio(audio_path, lang="en"):
    load_whisper_model()
    segments, _ = whisper_model.transcribe(
        audio_path,
        language=lang,
        beam_size=15,
        patience=3,
        best_of=10,
        word_timestamps=True,
        vad_filter=False,
        temperature=0.0,
        condition_on_previous_text=False,
        no_speech_threshold=0.2
    )

    formatted = []
    last_end = 0
    for segment in segments:
        if int(segment.start) == int(segment.end):
            print(f"⛔ Skipping zero-length line: \"{segment.text.strip()}\"")
            continue
        if segment.start - last_end > 1:
            print(f"⚠ GAP detected: {segment.start - last_end:.2f}s between {last_end:.2f}s and {segment.start:.2f}s")
        start = format_time(segment.start)
        end = format_time(segment.end)
        text = segment.text.strip()
        formatted.append({"start": start, "end": end, "text": text})
        last_end = segment.end

    return formatted, [f"[{f['start']} - {f['end']}] {f['text']}" for f in formatted]


def transcribe_pipeline(youtube_url=None, local_file=None):
    audio_input = None
    if youtube_url:
        audio_input = download_audio(youtube_url)
    elif local_file:
        audio_input = local_file

    if not audio_input:
        return {"error": "Failed to process input audio."}

    converted = convert_audio_to_wav(audio_input)
    enhanced = enhance_audio(converted)
    vocals_only = isolate_vocals(enhanced)
    no_silence = remove_silence(vocals_only)

    lang = detect_language(no_silence)
    segments, lines = transcribe_audio(no_silence, lang=lang)

    filename = os.path.splitext(os.path.basename(audio_input))[0]
    shutil.rmtree(f"./separated/htdemucs/{filename}", ignore_errors=True)

    return {
        "language": lang,
        "segments": segments,
        "lines": lines
    }


# ======== Jump to Timestamp or Line ========
def jump_to_timestamp_or_line(segments, query):
    try:
        if ':' in query:
            h, m, s = map(int, query.split(':'))
            total_seconds = h * 3600 + m * 60 + s
            for i, seg in enumerate(segments):
                seg_start = sum(int(x) * 60 ** i for i, x in enumerate(reversed(seg['start'].split(':'))))
                seg_end = sum(int(x) * 60 ** i for i, x in enumerate(reversed(seg['end'].split(':'))))
                if seg_start <= total_seconds <= seg_end:
                    print(f"\n🎯 Line {i+1} at {seg['start']} - {seg['end']}: {seg['text']}")
                    return
            print("🔍 Timestamp not found in any segment.")
        else:
            idx = int(query) - 1
            if 0 <= idx < len(segments):
                seg = segments[idx]
                print(f"\n🔢 Line {idx+1} at {seg['start']} - {seg['end']}: {seg['text']}")
            else:
                print("❌ Line number out of range.")
    except Exception as e:
        print(f"⚠ Error processing jump: {e}")


# ======== Jump to Text Match ========
def jump_to_text_line(segments, query_text):
    matches = [seg for seg in segments if query_text.lower() in seg['text'].lower()]
    if not matches:
        print("🔍 No matches found.")
        return
    print(f"\n🔎 Found {len(matches)} matches for '{query_text}':")
    for seg in matches:
        print(f"[{seg['start']} - {seg['end']}] {seg['text']}")
