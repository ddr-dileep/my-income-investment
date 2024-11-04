export default function Input({
  placeholder,
  type,
  value,
  onChange,
  className,
}: {
  placeholder: string;
  type: string;
  value: string | undefined | number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className="app-input">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}
