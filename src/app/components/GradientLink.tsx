interface GradientLinkProps {
  href: string;
  gradient: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  title?: string;
}

export default function GradientLink({
  href,
  gradient,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  title,
}: GradientLinkProps) {
  return (
    <a
      className="font-medium"
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline",
      }}
      href={href}
      target={target}
      rel={rel}
      title={title}
    >
      {children}
    </a>
  );
}
