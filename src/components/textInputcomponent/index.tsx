import React from "react";

interface TextInputProps {
  type: "email" | "phone" | "password";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  value,
  placeholder = "",
  onChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  let inputType = "text";
  if (type === "email") {
    inputType = "email";
  } else if (type === "phone") {
    inputType = "tel";
  } else if (type === "password") {
    inputType = "password";
  }

  return (
    <input
      type={inputType}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default TextInput;
