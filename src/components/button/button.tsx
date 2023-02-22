import { FC, ButtonHTMLAttributes, MouseEventHandler } from 'react';

import { cn } from 'utils/cn';

import './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'default' | 'plain' | 'submit';
  label: string;
}

const cnButton = cn('button');

export const Button: FC<ButtonProps> = ({
  className,
  label,
  appearance,
  ...props
}) => {
  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <button
      className={cnButton({ appearance }, [className])}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {label}
    </button>
  );
};
