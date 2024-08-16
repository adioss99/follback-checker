// import Image from 'next/image'
import { Image } from '@nextui-org/react';
import React from 'react';

const TabHow = () => {
  const data = [
    { src: ['/how/IMG-20240815-WA0022.jpg', '/how/IMG-20240815-WA0021.jpg'], caption: 'Open your Instagram Settings, click accounts centre' },
    { src: '/how/IMG-20240815-WA0019.jpg', caption: 'Scroll down, click your information and permissions' },
    { src: '/how/IMG-20240815-WA0018.jpg', caption: 'Click Download your information' },
    { src: '/how/IMG-20240815-WA0017.jpg', caption: 'Click Download or transfer information' },
    { src: '/how/IMG-20240815-WA0016.jpg', caption: 'Click some of your information' },
    { src: '/how/IMG-20240815-WA0015.jpg', caption: 'Scroll down, select followers and following, and then click next' },
    { src: '/how/IMG-20240815-WA0014.jpg', caption: 'Select Download to device' },
    { src: '/how/IMG-20240815-WA0013.jpg', caption: 'Change date range into All time, and format into JSON' },
    { src: '/how/IMG-20240815-WA0012.jpg', caption: 'Just wait for a minute, until the file can be downloaded. You should input your instagram password after this to download your information' },
  ];

  return (
    <div className="grid justify-center py-10 max-w-screen-lg grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
      {data.map((e, i) => (
        <div key={i} className="flex flex-col max-w-prose item-center">
          {i === 0 ? (
            <>
              <Image className="mb-5" width={250} src={`${e['src'][0]}`} />
              <Image width={250} src={`${e['src'][1]}`} />
            </>
          ) : (
            <Image width={250} src={`${e['src']}`} />
          )}
          <span className="mt-2 text-sm sm:font-normal text-gray-900 dark:text-white">
            {i + 1}. {e['caption']}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabHow;
