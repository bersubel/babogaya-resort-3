"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function Preloader() {
  const container = useRef(null);
  const content = useRef(null);
  const progress = useRef(null);
  const stripsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container.current, { display: 'none' });
        document.body.style.overflow = '';
        // This is perfectly placed! It recalculates the math for all our sticky overlaps.
        ScrollTrigger.refresh();
      }
    });

    // 1. Entry: Light green panels "spray" down into the screen
    tl.fromTo(stripsRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { 
        scaleY: 1, 
        duration: 0.8, 
        ease: 'power3.inOut', 
        stagger: { amount: 0.5, from: 'random' } 
      }
    )
    // 2. Fade in Logo and Text
    .to(content.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.2")
    
    // 3. Progress Bar sweeps across
    .to(progress.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' })
    
    // 4. Fade out Logo and Text early
    .to(content.current, { yPercent: -30, opacity: 0, duration: 0.5, ease: 'power3.inOut' })
    
    // 5. Exit: Panels spray upward and disappear
    .to(stripsRef.current,
      { 
        scaleY: 0, 
        transformOrigin: 'bottom', 
        duration: 0.8, 
        ease: 'power3.inOut', 
        stagger: { amount: 0.5, from: 'random' } 
      }, 
      "-=0.2"
    );

    return () => tl.kill();
  }, []);

  return (
    // THE FIX: Changed z-50 to z-[9999] so nothing can render over the preloader
    <div ref={container} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Light Green Zigzag Panels Background */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            ref={el => stripsRef.current[i] = el} 
            className="w-full h-full bg-[#D4DFD0]" 
          />
        ))}
      </div>

      {/* Content Wrapper */}
      <div ref={content} className="relative z-10 flex flex-col items-center justify-center opacity-0 text-[#14150F]">
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
          <Image 
            src="/media/babogayalogo.png" 
            alt="Babogaya Logo" 
            fill 
            sizes="(max-width: 768px) 192px, 256px"
            priority 
            className="object-contain drop-shadow-sm" 
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif leading-none">Babogaya</h1>

        {/* Progress Line */}
        <div className="relative z-10 w-48 md:w-64 h-[2px] bg-[#14150F]/10 mt-12 overflow-hidden">
          <div ref={progress} className="w-full h-full bg-[#14150F] origin-left scale-x-0" />
        </div>
      </div>
      
    </div>
  );
}