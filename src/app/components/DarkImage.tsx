"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DarkImageProps {
  src: string;
  darkSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const DarkImage: React.FC<DarkImageProps> = ({
  src,
  darkSrc,
  alt,
  className,
  width = 100,
  height = 100,
  priority = false
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkDark();

    // Watch for changes to the html class
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDark ? darkSrc : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      quality={95}
      priority={priority}
    />
  );
};

export default DarkImage;
