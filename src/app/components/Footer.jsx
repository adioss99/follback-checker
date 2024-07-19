import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center py-2">
      <a href="https://github.com/adioss99" target="_blank" rel="noopener noreferrer" className="flex items-center">
        <FontAwesomeIcon icon={faSquareGithub} className="text-sky-300 dark:text-cyan-950" />
      </a>
    </footer>
  );
};

export default Footer;
