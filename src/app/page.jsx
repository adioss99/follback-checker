'use client';
import { useState } from 'react';

export default function Home() {
  const [follower, setfollower] = useState(null);
  const [following, setfollowing] = useState(null);
  const [notFollowingBack, setnotFollowingBack] = useState([]);

  const handleFile = (event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/json') {
      alert('Please upload a valid JSON file.');
      return Promise.reject('Invalid file type');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          if (content['relationships_following'] && Array.isArray(content['relationships_following'])) {
            resolve({ type: 'following', content: content['relationships_following'] });
          } else if (!content['relationships_following'] && content[0]['string_list_data']) {
            resolve({ type: 'follower', content: content });
          } else {
            reject('Invalid file structure');
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  async function handleInput(params) {
    try {
      const result = await handleFile(params);
      if (result.type === 'following') {
        setfollowing(result.content);
      } else if (result.type === 'follower') {
        setfollower(result.content);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Please upload a valid JSON file.');
    }
  }

  const handleProccess = () => {
    if (follower == null || following == null) {
      alert('Please upload a valid JSON files');
      return;
    }

    const followers = follower.map((e) => {
      return e.string_list_data[0].value;
    });
    const followings = following.map((element) => {
      return element.string_list_data[0].value;
    });

    const notFB = followings.filter((e) => !followers.includes(e));
    const notFollowed = followers.filter((e) => !followings.includes(e));
    setnotFollowingBack(notFB);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-5 md:px-20">
      <header className="flex py-5">
        <h1 className="text-xl font-bold ">FollbackChecker</h1>
      </header>
      <main className="flex flex-col min-h-screen pt-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex md:flex-row flex-col gap-8 sm:gap-14">
            <div>
              <label className="flex gap-2 mb-2 text-sm sm:font-medium text-gray-900 dark:text-white" htmlFor="small_size">
                <h2>Upload follower JSON File</h2>
                <p>(followers_1.json)</p>
              </label>
              <input
                className="block w-full sm:text-lg text-sm rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="large_size"
                type="file"
                accept=".json"
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="flex gap-2 mb-2 text-sm sm:font-medium text-gray-900 dark:text-white" htmlFor="small_size">
                <h2>Upload following JSON File</h2>
                <p>(following.json)</p>
              </label>
              <input
                className="block w-full sm:text-lg text-sm rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="large_size"
                type="file"
                accept=".json"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="flex item-center">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={handleProccess}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Check</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {notFollowingBack.length > 0 && (
            <div className="flex flex-col item-center mt-5">
              <h2 className="text-md font-bold text-center mb-5">Not Following Back</h2>
              <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5 dark:bg-gray-800 dark:border-gray-700">
                <ul className="text-center">
                  {notFollowingBack.map((e, index) => (
                    <li key={index} className="mt-0.5">
                      <p> {e}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* <footer className="flex flex-col items-center py-2">
        <a href="https://github.com/adioss99" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <svg height="16" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>{' '}
          <p className="text-black">@adioss99</p>
        </a>
      </footer> */}
    </div>
  );
}
