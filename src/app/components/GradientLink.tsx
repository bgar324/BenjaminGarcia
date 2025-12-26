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
      className="font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
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
