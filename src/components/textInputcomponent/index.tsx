import React from "react";
import "./styles.css"

interface TextInputProps {
  type: string;
  value?: any;
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
  inputLabel?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  value,
  placeholder = "",
  onChange,
  className = "",
  inputLabel = ""
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div >
      <p className="text-start inputBox-label E1-black-color">
        {inputLabel}
      </p>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`primary-textinput-Box  ${className}`}
      />
    </div>
  );
};

export default TextInput;
