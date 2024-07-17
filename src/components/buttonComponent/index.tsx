import React from 'react';
import "./styles.css"
interface ButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  className?: String;
  primaryBtn?: boolean;
  secondaryBtn?: boolean;

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
    >
      {label}
    </button >
  );
};

export default Button;
