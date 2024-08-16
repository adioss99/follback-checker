'use client';
import InputJson from './InputJson';
import InputZip from './InputZip';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import TabHow from './TabHow';

export default function Home() {
  const [selected, setSelected] = useState('zip');
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

  const handleProccess = (fower, fowing) => {
    if (fower == null || fowing == null) {
      alert('Please upload a valid JSON files');
      return;
    }

    const followers = fower.map((e) => {
      return e.string_list_data[0].value;
    });
    const followings = fowing.map((element) => {
      return element.string_list_data[0].value;
    });

    const notFB = followings.filter((e) => !followers.includes(e));
    const notFollowed = followers.filter((e) => !followings.includes(e));
    setnotFollowedback(notFollowed);
    setnotFollowingBack(notFB);
  };

  const zipResult = (args) => {
    let fower = null;
    let fowing = null;

    args.forEach((e) => {
      if (e[1] === 'follower') {
        fower = e[0];
      } else if (e[1] === 'following') {
        fowing = e[0];
      }
    });
    handleProccess(fower, fowing);
  };

  useEffect(() => {
    setnotFollowingBack([]);
  }, [selected]);

  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen pt-10">
        <div className="flex flex-col items-center">
          <Tabs selectedKey={selected} onSelectionChange={setSelected} variant="underlined" aria-label="Tabs variants">
            <Tab key="json" title="JSON file" className="flex flex-col items-center font-medium">
              <InputJson onUpload={handleUpload} />
              <div className="flex flex-col item-center">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={() => handleProccess(follower, following)}
                >
                  <span className="relative px-5 py-2.5 rounded-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">Check</span>
                </button>
              </div>
            </Tab>
            <Tab key="zip" title="ZIP file" className="font-medium ">
              <InputZip onUpload={zipResult} />
            </Tab>
            <Tab
              key="how"
              title={
                <div className="flex items-center space-x-2">
                  <span>How</span>
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </div>
              }
              className="font-medium "
            >
              <TabHow />
            </Tab>
          </Tabs>
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
