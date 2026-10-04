"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursor = useRef(null);
  const textRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    // quickTo is highly optimized for mouse tracking
    const xTo = gsap.quickTo(cursor.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('[data-cursor="view"]')) {
        gsap.to(cursor.current, { 
          width: 80, height: 80, 
          backgroundColor: 'transparent', 
          border: '1px solid #F4F0E8', 
          duration: 0.4, ease: 'power3.out' 
        });
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('[data-cursor="view"]')) {
        gsap.to(cursor.current, { 
          width: 8, height: 8, 
          backgroundColor: '#F4F0E8', 
          border: '0px solid transparent', 
          duration: 0.4, ease: 'power3.out' 
        });
        gsap.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div 
      ref={cursor} 
      className="fixed top-0 left-0 w-2 h-2 bg-[#F4F0E8] rounded-full pointer-events-none z-[100] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <span 
        ref={textRef} 
        className="text-[#F4F0E8] font-sans uppercase text-[10px] tracking-widest opacity-0 scale-50 font-medium"
      >
        View
      </span>
    </div>
  );
}