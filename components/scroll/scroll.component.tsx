import React, { useEffect, useRef, ReactNode } from "react";
import SmoothScrollBar from "smooth-scrollbar";
type SmoothScrollProps = { children: ReactNode };
const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const scrollbar = SmoothScrollBar.init(containerRef.current);
      return () => scrollbar.destroy(); // Clean up the scrollbar when the component unmounts
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default SmoothScroll;
