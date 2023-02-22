import { FC, InputHTMLAttributes, RefObject, useState } from 'react';

import { cn } from 'utils/cn';

import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'password' | 'text';
  hasError?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
}

const cnInput = cn('input');

export const Input: FC<Partial<InputProps>> = ({
  className,
  id,
  placeholder,
  value,
  hasError,
  inputRef,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isNonblank = Boolean(value);

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  return (
    <div
      className={cnInput(
        { nonblank: isNonblank, focused: isFocused, error: hasError },
        [className]
      )}
    >
      <label className={cnInput('label')} htmlFor={id}>
        {placeholder}
      </label>
      <input
        className={cnInput('input')}
        id={id}
        value={value}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
      {hasError && <span className={cnInput('error-icon')}>⚠️</span>}
    </div>
  );
};
