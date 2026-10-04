"use client";
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Template({ children }) {
  const pathname = usePathname();
  
  // Format the path name for the transition text
  const pageName = pathname === '/' ? 'Babogaya' : pathname.replace('/', '').replace('-', ' ');

  useEffect(() => {
    // Force GSAP to recalculate all pin heights after the wipe finishes
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {/* The Olive-Black Transition Wipe */}
      <motion.div
        className="fixed inset-0 z-[60] bg-foreground flex items-center justify-center pointer-events-none"
        initial={{ clipPath: "inset(0% 0 0 0)" }} 
        animate={{ clipPath: "inset(0% 0 100% 0)" }} 
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      >
        <motion.span 
          className="font-serif text-4xl md:text-6xl text-[#F4F0E8] capitalize tracking-wide font-light"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }} 
        >
          {pageName}
        </motion.span>
      </motion.div>

      {/* 
        FIX: Render the page directly! 
        No motion.div means no hidden CSS transforms, allowing GSAP to pin perfectly. 
      */}
      {children}
    </>
  );
}