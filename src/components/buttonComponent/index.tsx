import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
