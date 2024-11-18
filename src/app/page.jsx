'use client';
import InputJson from './InputJson';
import InputZip from './InputZip';
import TabHow from './TabHow';
import Header from './components/Header';
import Footer from './components/Footer';
import Result from './components/Result';

import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [selected, setSelected] = useState('zip');
  const [follower, setfollower] = useState(null);
  const [following, setfollowing] = useState(null);
  const [notFollowingBack, setnotFollowingBack] = useState([]);
  const [notFollowedback, setnotFollowedback] = useState([]);
  const [show, setshow] = useState(false);

  const handleProccess = (fower, fowing) => {
    if (fower == null || fowing == null) {
      alert('Please upload a valid JSON files');
      return;
    }

    const notFYB = fowing
      .filter((e1) => {
        return !fower.some((e) => e1.string_list_data[0].value === e.string_list_data[0].value);
      })
      .map((e) => e.string_list_data[0])
      .sort((a, b) => a.value.localeCompare(b.value));
    const notFdB = fower
      .filter((e1) => {
        return !fowing.some((e) => e1.string_list_data[0].value === e.string_list_data[0].value);
      })
      .map((e) => e.string_list_data[0])
      .sort((a, b) => a.value.localeCompare(b.value));

    setnotFollowingBack(notFYB);
    setnotFollowedback(notFdB);
    setshow(true);
  };

  const handleUpload = (data, type) => {
    if (type === 'follower') {
      setfollower(data);
    } else if (type === 'following') {
      setfollowing(data);
    }
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
    setnotFollowedback([]);
    setshow(false);
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
            <Tab key="zip" title="ZIP file" className="font-medium w-full">
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
        {show && (
          <Tabs key={1} variant="underlined" aria-label="Tabs radius" className="flex flex-col items-center mt-5">
            <Tab
              key="1"
              title={
                <>
                  <FontAwesomeIcon icon={faCircleArrowLeft} />
                </>
              }
            >
              <div className="flex flex-col items-center my-1">
                {notFollowingBack.length > 0 ? (
                  <>
                    <Result data={notFollowingBack} title={"Not Following You Back"} />
                  </>
                ) : (
                  <div role="alert" className="relative mt-5 flex w-full md:max-w-sm rounded-xl px-4 py-4 text-base text-gray-700 bg-white dark:bg-gray-700 shadow-md font-regular">
                    <div className="mx-auto font-semibold text-gray-900 dark:text-white">Null</div>
                  </div>
                )}
              </div>
            </Tab>
            <Tab
              key="2"
              title={
                <>
                  <FontAwesomeIcon icon={faCircleArrowRight} />
                </>
              }
            >
              <div className="flex flex-col items-center my-1">
                {notFollowedback.length > 0 ? (
                  <>
                    <Result data={notFollowedback} title={"You Don't Follow Back"} />
                  </>
                ) : (
                  <div role="alert" className="relative mt-5 flex w-full md:max-w-sm rounded-xl px-4 py-4 text-base text-gray-700 bg-white dark:bg-gray-700 shadow-md font-regular">
                    <div className="mx-auto font-semibold text-gray-900 dark:text-white">Null</div>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        )}
      </section>
      <Footer />
    </>
  );
}
