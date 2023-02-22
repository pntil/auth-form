import { MouseEventHandler } from 'react';

import { cn } from 'utils/cn';

import './logo.css';
import logo from './logo.png';

const cnLogo = cn('logo');

export const Logo = () => {
  const handleClick: MouseEventHandler<HTMLImageElement> = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  return (
    <img
      className={cnLogo()}
      src={logo}
      alt="Aigelic Geenic Logo"
      onClick={handleClick}
    />
  );
};
