interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionHeader({
  children,
  className = "",
  id,
}: SectionHeaderProps) {
  return (
    <h2
      id={id}
      className={`w-fit border border-gray-300 rounded-md px-2 py-1 text-xs uppercase mt-10 mb-5 font-semibold ${className} text-nowrap`}
    >
      {children}
    </h2>
  );
}
