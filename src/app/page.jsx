'use client';
import { useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import InputJson from './InputJson';
import InputZip from './InputZip';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const [follower, setfollower] = useState(null);
  const [following, setfollowing] = useState(null);
  const [notFollowingBack, setnotFollowingBack] = useState([]);
  const [notFollowedback, setnotFollowedback] = useState([]);

  const handleUpload = (data, type) => {
    if (type === 'follower') {
      setfollower(data);
    } else if (type === 'following') {
      setfollowing(data);
    }
  };

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
    setnotFollowedback(notFollowed);
    setnotFollowingBack(notFB);
  };
  
  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen pt-10">
        <div className="flex flex-col items-center">
          <Tabs variant="underlined" aria-label="Tabs variants">
            <Tab key="json" title="JSON file" className="font-medium ">
              <InputJson onUpload={handleUpload} />
            </Tab>
            <Tab key="zip" title="ZIP file" className="font-medium " disabled>
              <InputZip onUpload={handleUpload} />
            </Tab>
          </Tabs>
          <div className="flex item-center">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={handleProccess}
            >
              <span className="relative px-5 py-2.5 rounded-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">Check</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {notFollowingBack.length > 0 && (
            <div className="flex flex-col item-center my-5">
              <h2 className="text-md font-bold text-center mb-5 text-gray-900 dark:text-white">Not Following Back</h2>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5 dark:bg-gray-800 dark:border-gray-700">
                <ul className="text-center">
                  {notFollowingBack.map((e, index) => (
                    <li key={index} className="mt-0.5">
                      <p className="text-gray-900 dark:text-white">{e}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
