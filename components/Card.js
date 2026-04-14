export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  const base =
    "bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg";
  const merged = className ? `${base} ${className}` : base;
  return (
    <Tag className={merged} {...rest}>
      {children}
    </Tag>
  );
}
