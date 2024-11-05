export default function Heading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <h3 className="text-3xl font-semibold from-neutral-900">{title}</h3>
      {subtitle && <h5 className="text-sm text-gray-500">{subtitle}</h5>}
    </div>
  );
}
