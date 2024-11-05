export default function Input({
  placeholder,
  type,
  name,
  label,
  value,
  onChange,
  className,
  error = false,
  errorText = "",
}: {
  placeholder: string;
  type: string;
  value: string | undefined | number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string | undefined | boolean;
  errorText?: string;
  label?: string;
  name: string;
}) {
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
