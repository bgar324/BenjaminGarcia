"use client";

import React, { useEffect, useState } from "react";

interface DarkImageProps {
  src: string;
  darkSrc: string;
  alt: string;
  className?: string;
}

const DarkImage: React.FC<DarkImageProps> = ({ src, darkSrc, alt, className }) => {
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

  return <img src={isDark ? darkSrc : src} alt={alt} className={className} />;
};

export default DarkImage;
