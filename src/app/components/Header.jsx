import React from 'react';
import DarkMode from './DarkMode';

const Header = () => {
  return (
    <header className="flex justify-between py-5">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">InstaFollbackChecker</h1>
      <DarkMode />
    </header>
  );
};

export default Header;
