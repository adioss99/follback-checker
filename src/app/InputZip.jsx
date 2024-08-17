'use client';
import React, { useState } from 'react';
import JSZip from 'jszip';

const InputZip = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event._reactName == 'onDrop' ? event.dataTransfer.files[0] : event.target.files[0];

    if (!file.type.includes('zip')) {
      alert('Please upload a valid ZIP file. ' + file.type);
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const zip = await JSZip.loadAsync(e.target.result);
        const files = Object.keys(zip.files);

        const followerPath = 'connections/followers_and_following/followers_1.json';
        const followingPath = 'connections/followers_and_following/following.json';

        if (!files.includes(followerPath) || !files.includes(followingPath)) {
          alert("ZIP file structure is incorrect. Ensure it contains 'followers_1.json' and 'following.json' in 'connections/followers_and_following/' directory.");
          return;
        }

        const followerContent = JSON.parse(await zip.file(followerPath).async('string'));
        const followingContent = JSON.parse(await zip.file(followingPath).async('string')).relationships_following;

        onUpload([
          [followerContent, 'follower'],
          [followingContent, 'following'],
        ]);
      } catch (error) {
        console.error('Error processing ZIP file:', error);
        alert('Error processing ZIP file.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex items-center m-auto justify-center my-2 p-4 border-2 border-dashed rounded-lg cursor-pointer h-72 max-w-2xl border-gray-300bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${
        isDragging ? 'bg-gray-200 border-gray-500' : 'bg-gray-50 border-gray-300'
      }`}
      htmlFor="dropzone-file"
    >
      <div className="flex flex-col items-center justify-center w-full md:h-44">
        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Drag & Drop to upload</span> or click to select file
        </p>
        <p className="text-tiny md:text-xs text-gray-500 dark:text-gray-400">Only accept ZIP file from Instagram</p>
        <input id="dropzone-file" type="file" className="hidden" accept=".zip" onChange={handleDrop} />
      </div>
    </label>
  );
};

export default InputZip;
