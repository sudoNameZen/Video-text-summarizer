'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

export default function MediaUploader() {
  const [mediaType, setMediaType] = useState('video');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mediaType === 'audio' ? 'audio/*' : 'video/*',
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    
    try {
      // Handle file upload or URL processing
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (url) formData.append('url', url);
      formData.append('mediaType', mediaType);

      const response = await fetch('/api/process-media', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');
      
      const result = await response.json();
      console.log('Processing result:', result);
      // Handle successful processing (redirect or show results)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Convert Video to Text Summary
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Type Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  mediaType === 'video'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Video
              </button>
              <button
                type="button"
                onClick={() => setMediaType('audio')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  mediaType === 'audio'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Audio
              </button>
            </div>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-300'
            }`}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            {file ? (
              <div className="mt-2">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {Math.round(file.size / (1024 * 1024 * 10)) / 100} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag and drop your file here, or click to select'}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {mediaType === 'audio' 
                    ? 'Supports: MP3, WAV, AAC' 
                    : 'Supports: MP4, MOV, AVI'}
                </p>
              </div>
            )}
          </div>

          {/* URL Input */}
          <div>
            <div className="relative flex items-center">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Paste ${mediaType} URL (YouTube, Vimeo, etc.)`}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-24"
              />
              <button
                type="submit"
                disabled={isProcessing || (!file && !url)}
                className={`absolute right-0 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${
                  isProcessing || (!file && !url)
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}