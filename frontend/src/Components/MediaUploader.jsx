'use client';

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import ReactPlayer from 'react-player';

/* ---------- helper: parse “[HH:MM:SS - …] …text” ---------- */
const hhmmssToSeconds = (hh, mm, ss) => hh * 3600 + mm * 60 + ss;

const parseLine = (raw) => {
  /* [HH:MM:SS - HH:MM:SS] text */
  const m = raw.match(
    /^\[(\d{2}):(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2}):(\d{2})\]\s*(.*)$/
  );
  if (!m) return null;
  const [, h1, m1, s1, h2, m2, s2, text] = m;
  return {
    start: hhmmssToSeconds(+h1, +m1, +s1),
    end: hhmmssToSeconds(+h2, +m2, +s2),
    text: text.trim(),
  };
};

const normalizeLines = (rawLines = []) =>
  rawLines
    .map((l) => (typeof l === 'string' ? parseLine(l) : l))
    .filter(Boolean);

const formatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  return date.toISOString().substr(11, 8); // HH:MM:SS
};
/* ---------------------------------------------------------- */

export default function MediaUploader() {
  const [mediaType, setMediaType] = useState('video');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState([]); // [{start, end, text}]
  const [videoUrl, setVideoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const playerRef = useRef(null);

  /* ----- dropzone ----- */
  const onDrop = useCallback((files) => files[0] && setFile(files[0]), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mediaType === 'audio' ? 'audio/*' : 'video/*',
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
  });

  /* ----- backend calls (unchanged except we parse lines) ----- */
  const handleFileUpload = async () => {
    if (!file) return alert('select a file first');
    setIsProcessing(true); setErrorMessage('');
    try {
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch('http://localhost:8000/transcribe/upload', { method:'POST', body:fd });
      if (!r.ok) throw 0;
      const { lines } = await r.json();
      setTranscript(normalizeLines(lines));
      setVideoUrl(URL.createObjectURL(file));
    } catch { setErrorMessage('upload / transcribe failed'); }
    finally { setIsProcessing(false); }
  };

  const handleYouTubeSubmit = async () => {
    if (!url.trim()) return alert('paste a URL');
    setIsProcessing(true); setErrorMessage('');
    try {
      const r = await fetch('http://localhost:8000/transcribe/youtube', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({url})
      });
      if (!r.ok) throw 0;
      const { lines } = await r.json();
      setTranscript(normalizeLines(lines));
      setVideoUrl(url);
    } catch { setErrorMessage('YouTube transcription failed'); }
    finally { setIsProcessing(false); }
  };

  // YouTube case
const seekTo = (sec) => {
  const p = playerRef.current;
  if (!p) return;

  const yt = p.getInternalPlayer('youtube');
  if (yt && typeof yt.seekTo === 'function') {
    yt.seekTo(sec, true);
    if (typeof yt.playVideo === 'function') yt.playVideo();
  } else {
    const internal = p.getInternalPlayer();
    if (internal && typeof internal.seekTo === 'function') {
      internal.seekTo(sec); // fallback if it's a custom player
    } else if (internal && typeof internal.currentTime === 'number') {
      internal.currentTime = sec;
      if (typeof internal.play === 'function') internal.play(); // ✅ only call if exists
    }
  }
};



  /* --------------------- UI --------------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Convert {mediaType==='video'?'Video':'Audio'} to Text
        </h1>

        {/* media type switch */}
        <div className="flex justify-center gap-4 mb-4">
          {['video','audio'].map(t=>(
            <button key={t}
              onClick={()=>setMediaType(t)}
              className={`px-4 py-2 rounded ${mediaType===t?'bg-indigo-600 text-white':'bg-gray-200'}`}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        {/* drop zone */}
        <div {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4
            ${isDragActive?'border-indigo-500 bg-indigo-50':'border-gray-300'}`}>
          <input {...getInputProps()}/>
          <CloudArrowUpIcon className="h-10 w-10 mx-auto text-gray-400"/>
          <p className="mt-2 text-gray-600">
            {file ? file.name : 'Drag & drop or click to select'}
          </p>
        </div>

        {/* upload button */}
        <button
          onClick={handleFileUpload}
          disabled={isProcessing||!file}
          className="w-full py-2 mb-6 rounded bg-indigo-600 text-white disabled:opacity-50">
          {isProcessing?'Processing…':'Upload & Transcribe File'}
        </button>

        {/* youtube input */}
        <input value={url} onChange={e=>setUrl(e.target.value)}
          placeholder="YouTube URL"
          className="w-full border p-2 rounded mb-2"/>
        <button
          onClick={handleYouTubeSubmit}
          disabled={isProcessing||!url}
          className="w-full py-2 mb-6 rounded bg-blue-600 text-white disabled:opacity-50">
          {isProcessing?'Processing…':'Transcribe YouTube URL'}
        </button>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        {/* player */}
        {videoUrl && (
          <ReactPlayer ref={playerRef} url={videoUrl} controls width="100%" height={300} className="mb-6"/>
        )}

        {/* transcript */}
        <h2 className="font-semibold mb-2">Transcript</h2>
        <div className="bg-gray-100 p-4 rounded max-h-64 overflow-y-auto text-sm">
          {transcript.length===0 && <p className="text-gray-500">No transcript yet.</p>}
          {transcript.map((l,i)=>( // Here we use both start and end time
            <p key={i}
              className="cursor-pointer hover:text-indigo-600"
              onClick={() => seekTo(l.start)}>
              [{formatTime(l.start)} - {formatTime(l.end)}] {l.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
