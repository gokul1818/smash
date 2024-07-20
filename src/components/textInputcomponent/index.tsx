import React from "react";
import "./styles.css"

interface TextInputProps {
  type: string;
  value?: any;
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
  inputLabel?: string;
  primary?: boolean;
  disabled?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  value,
  placeholder = "",
  onChange,
  className = "",
  inputLabel = "",
  primary = true,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div >
      {Boolean(inputLabel) && <p className="text-start inputBox-label E1-black-color ubuntu-regular">
        {inputLabel}
      </p>}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={primary ? `primary-textinput-Box  ${className}` :
          `transparent-textinput-Box  ${className}`
        }
      />
    </div>
  );
};

export default TextInput;
