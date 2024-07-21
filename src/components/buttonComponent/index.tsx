import React from 'react';
import "./styles.css"
import { error } from 'console';
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
}) => {
  return (
    <button
      onClick={onClick}
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
