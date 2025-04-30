// pages/media-uploader.js
'use client';

import React, { useState } from 'react';
import Head from 'next/head';

const MediaUploader = () => {
  const [mediaType, setMediaType] = useState('audio');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
    setFile(null); // Reset file when media type changes
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the file upload or URL submission here
    console.log('Selected Media Type:', mediaType);
    console.log('Selected File:', file);
    console.log('Entered URL:', url);
  };

  return (
    <div className=" ">
      <Head>
        <title>Media Uploader</title>
      </Head>
      <form onSubmit={handleSubmit} className="space-y-6 inputContainer">

        {/* Media Type Selection */}
        <div className="m-4 flex flex-col items-center">
          <label htmlFor="mediaType" className="subhead">Select Media Type:</label>
          <select id="mediaType" value={mediaType} onChange={handleMediaTypeChange} className="mt-1 block border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 w-50 ">
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* File Upload Area */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center flex flex-col items-center justify-center mx-auto w-[60%] h-70">
          <label htmlFor="fileInput" className="block text-lg text-gray-600 cursor-pointer">
            Click to upload
          </label>
          <p className="text-sm text-gray-500">or drop your file here</p>
          <p className="text-xs text-gray-400">Supports video and audio files</p>
          <input
            type="file"
            id="fileInput"
            accept={mediaType === 'audio' ? 'audio/*' : 'video/*'}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* URL Input */}
        <div className='flex flex-col items-center m-4'>
          <label htmlFor="urlInput" className="subhead">Paste a URL (YouTube, Vimeo, Facebook, etc)</label>
          <div className='flex flex-row items-center space-x-2'>
          <input
            type="url"
            id="urlInput"
            value={url}
            onChange={handleUrlChange}
            placeholder={`Enter ${mediaType} URL`}
            className=" px-4  py-1 w-100 block border  border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
          <button type="submit" className=" px-4 py-1 border-1 border-gray-300 bg-gray-300 text-gray-800 hover:border-2  rounded-md ">Import from URL</button>
          </div>
          
        </div>

  
        

      </form>
    </div>
  );
};

export default MediaUploader;