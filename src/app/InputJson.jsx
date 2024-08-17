'use client';

const InputJson = ({ onUpload }) => {

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

  const handleInput = async (params) => {
    try {
      const result = await handleFile(params);
      if (result['type'] === 'following') {
        onUpload(result.content, 'following');
      } else if (result['type'] === 'follower') {
        onUpload(result.content, 'follower');
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Upload a valid JSON files.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 my-10">
      <div className="flex md:flex-row flex-col gap-8 md:gap-14">
        <div>
          <label className="flex gap-2 mb-2 text-sm sm:font-medium text-gray-900 dark:text-white" htmlFor="small_size">
            <h2>Upload follower JSON File</h2>
            <p>(followers_1.json)</p>
          </label>
          <input
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-gray-300 dark:file:text-violet-800"
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
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-gray-300 dark:file:text-violet-800"
            id="large_size"
            type="file"
            accept=".json"
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
};

export default InputJson;
