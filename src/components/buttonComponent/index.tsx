import React, { useCallback } from 'react';
import { debounce } from '../../helpers';
import "./styles.css";
interface ButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  className?: String;
  primaryBtn?: boolean;
  secondaryBtn?: boolean;
  type?: any;
  debounceDelay?: number;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className,
  disabled = false,
  height = "50px",
  width = "80%",
  primaryBtn = true,
  secondaryBtn = false,
  type,
  debounceDelay = 300,
}) => {
  const debouncedOnClick = useCallback(
    debounce(() => {
      if (onClick) onClick();
    }, debounceDelay),
    [onClick, debounceDelay]
  );
  return (
    <button
      onClick={debouncedOnClick}
      className={primaryBtn ?
        `primary-btn white-color bg-E1-black-color  ${className}` :
        secondaryBtn ?
          `secondary-btn white-color bg-persianGreen-color ${className}` :
          `${className}`
      }
      disabled={disabled}
      style={{ height, width }}
      type={type}
    >
      {label}
    </button >
  );
};

export default Button;
