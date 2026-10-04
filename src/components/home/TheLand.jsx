"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function TheLand() {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const imgRef = useRef(null);
  const textLinesRef = useRef([]);
  const picOverlayRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1, 
        }
      });

      // 1. ENTRANCE: Starts as a thick diagonal line (/) and expands to full screen
      tl.fromTo(maskRef.current,
        // The 4 points of the diagonal slash (Top-Left, Top-Right, Bottom-Right, Bottom-Left)
        { clipPath: "polygon(60% 0%, 80% 0%, 40% 100%, 20% 100%)" }, 
        // Expands perfectly to the 4 corners of the screen
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power2.inOut", duration: 1.5 }
      )
      // Dramatic zoom out through the diagonal mask
      .fromTo(imgRef.current,
        { scale: 1.4 },
        { scale: 1, ease: "power2.inOut", duration: 1.5 },
        "<"
      )
      // Text slides up exactly as the image finishes opening
      .fromTo(textLinesRef.current,
        { yPercent: 110, rotate: 2 }, 
        { yPercent: 0, rotate: 0, stagger: 0.1, ease: "power3.out", duration: 0.8 },
        "-=0.7" 
      )
      // Paragraph and Button fade in together
      .fromTo([picOverlayRef.current, buttonRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out", duration: 0.6 },
        "-=0.5"
      )
      
      // 2. READING PAUSE: Holds the layout briefly before releasing the scroll
      .to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // Height reduced to 150vh since the exit animation is removed
      className="relative w-full h-[150vh] z-30 drop-shadow-[0_-20px_40px_rgba(20,21,15,0.15)]"
    >
      {/* Sticky Top locks the screen in place */}
      <div className="sticky top-0 w-full h-screen bg-[#E4ECE3] text-[#14150F] rounded-[40px] md:rounded-[80px] overflow-hidden">
        
        {/* Background Editorial Vertical Grid Lines */}
        <div className="absolute inset-0 z-0 grid grid-cols-4 md:grid-cols-6 w-full h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l border-[#14150F]/10 h-full w-full hidden md:block" />
          ))}
          {[...Array(4)].map((_, i) => (
            <div key={`mob-${i}`} className="border-l border-[#14150F]/10 h-full w-full md:hidden" />
          ))}
          <div className="absolute right-0 top-0 bottom-0 border-r border-[#14150F]/10" />
        </div>

        {/* Top Editorial Details */}
        <div className="absolute top-8 md:top-12 left-0 w-full px-6 md:px-12 flex justify-between items-center font-sans text-xs md:text-sm uppercase tracking-widest opacity-60 z-20 pointer-events-none">
          <span>The Landscape</span>
          <span>08°45'N 38°59'E</span>
        </div>

        {/* THE MASK CONTAINER */}
        <div 
          ref={maskRef} 
          className="absolute inset-0 w-full h-full z-10 origin-center bg-[#14150F]"
          // Fallback clip-path before GSAP takes over
          style={{ clipPath: 'polygon(60% 0%, 80% 0%, 40% 100%, 20% 100%)' }} 
        >
          <Image
            ref={imgRef}
            src="/media/l11.png"
            alt="The Land"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#14150F]/30" /> 

          {/* Huge Centered Typography */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#F4F0E8] z-20">
            <div className="overflow-hidden py-2">
              <h2 
                ref={el => textLinesRef.current[0] = el} 
                className="font-serif text-7xl md:text-[11vw] leading-[0.8] font-light tracking-tight translate-y-[110%]"
              >
                400 ACRES
              </h2>
            </div>
            <div className="overflow-hidden py-2">
              <h2 
                ref={el => textLinesRef.current[1] = el} 
                className="font-serif text-7xl md:text-[11vw] leading-[0.8] font-light tracking-tight translate-y-[110%]"
              >
                UNTAMED
              </h2>
            </div>
          </div>

          {/* Paragraph Overlay (Bottom Left) */}
          <div 
            ref={picOverlayRef} 
            className="absolute bottom-10 left-6 md:bottom-16 md:left-12 max-w-[320px] md:max-w-xl z-30 opacity-0 pointer-events-none text-[#F4F0E8]"
          >
            <p className="font-serif italic text-base md:text-2xl leading-[1.4] drop-shadow-lg font-light">
              "A seamless integration between raw earth and refined architecture. Every element of the landscape remains untouched, offering true reconnection."
            </p>
          </div>

          {/* Explore Button (Bottom Right) */}
          <div ref={buttonRef} className="absolute bottom-10 right-6 md:bottom-16 md:right-12 z-30 opacity-0">
            <a href="/land" className="relative font-sans text-xs md:text-sm uppercase tracking-widest pb-1 group/link text-[#F4F0E8]">
              Explore the Map
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F0E8] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}