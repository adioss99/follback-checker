import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Result = ({ title, data }) => {
  return (
    <>
      <h2 className="text-md font-bold text-center mb-3 text-gray-900 dark:text-white">{title}</h2>
      <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-700 shadow-md w-full md:max-w-sm rounded-xl bg-clip-border">
        <nav className="flex flex-col gap-1 p-2 w-full font-sans font-medium text-blue-gray-700">
          {data.map((e, index) => (
            <div key={index} className="flex justify-between items-center px-3 py-0.5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-600 rounded-md">
              <span>{e.value}</span>
              <Link href={`${e.href}`} className="rounded-md px-1 hover:bg-gray-100 dark:hover:bg-gray-700" passHref rel="noopener noreferrer" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Result;
