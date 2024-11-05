import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: boolean;
  errorText?: string;
  className?: string;
}

export default function Input({
  placeholder,
  type = "text",
  name,
  label,
  error = false,
  errorText = "",
  className = "",
  value,
  onChange,
}: InputProps) {
  return (
    <div className={`app-input mb-3 ${error && "border-red-800"}`}>
      <label htmlFor={name} className="text-sm font-semibold">
        {label && label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border-l-8 border-blue-300 outline-blue-300 rounded ${className}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-800 text-xs">{errorText}</p>}
    </div>
  );
}
