import { useRef, useEffect } from 'react';

const useAnimateElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const rightToLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "opacity 1s, transform 1s";
          containerRef.current.style.opacity = "1";
          containerRef.current.style.transform = "translateY(0)";
        }
      }, 300);
    }

    if (iconsRef.current) {
      iconsRef.current.style.opacity = "0";
      iconsRef.current.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (iconsRef.current) {
          iconsRef.current.style.transition = "opacity 1s, transform 1s";
          iconsRef.current.style.opacity = "1";
          iconsRef.current.style.transform = "translateY(0)";
        }
      }, 600);
    }

    if (rightToLeftRef.current) {
      rightToLeftRef.current.style.opacity = "0";
      rightToLeftRef.current.style.transform = "translateX(20px)";
      setTimeout(() => {
        if (rightToLeftRef.current) {
          rightToLeftRef.current.style.transition = "opacity 1s, transform 1s";
          rightToLeftRef.current.style.opacity = "1";
          rightToLeftRef.current.style.transform = "translateX(0)";
        }
      }, 50);
    }
  }, []);

  return { containerRef, iconsRef, rightToLeftRef };
};

export default useAnimateElements;