import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  height?: string; 
  width?: string; 
  className?: String
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className,
  disabled = false,
  height = "40px",
  width= "80%",
}) => {
  return (
    <button
      onClick={onClick}
      className={`primary-btn ${className}`}
      disabled={disabled}
      style={{ height, width }}
    >
      {label}
    </button>
  );
};

export default Button;
