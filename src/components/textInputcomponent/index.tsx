import React from "react";
import "./styles.css";

interface TextInputProps {
  type: string;
  value?: any;
  placeholder?: string;
  onChange: (value: any) => void;
  handleClickShowPassword?: (value: any) => void;
  className?: string;
  inputLabel?: string;
  primary?: boolean;
  disabled?: boolean;
  error?: any;
  options?: string[];
  isPassword?: boolean
}
 
const TextInput: React.FC<TextInputProps> = ({
  type,
  value,
  placeholder = "",
  onChange,
  className = "",
  inputLabel = "",
  primary = true,
  disabled = false,
  error,
  options = [],
  isPassword = false,
  handleClickShowPassword,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-100 position-relative">
      {inputLabel && (
        <p className="text-start inputBox-label E1-black-color ubuntu-regular">
          {inputLabel}
        </p>
      )}
      {type === "select" ? (
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`${primary ? " form-select form-select-lg  select-primary-textinput-Box" : "transparent-textinput-Box"} ${className}`}
        >
          <option value="" disabled hidden >
            <p className="primarygrey-color">
              {placeholder}
            </p>
          </option>
          {options.map((option, index) => (
            <option className="option" key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${primary ? "primary-textinput-Box" : "transparent-textinput-Box"} ${className}`}
        />
      )}
      {error && (
        <p className="text-start error-inputBox-label E1-black-color ubuntu-regular">
          {error}
        </p>
      )}
      {isPassword &&

        (type === "password" ?
          <p className="show-password-btn" onClick={handleClickShowPassword}>Show</p> :
          <p className="show-password-btn" onClick={handleClickShowPassword}>Hide</p>
        )
      }
    </div>
  );
};

export default TextInput;
