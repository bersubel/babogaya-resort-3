"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const paragraph = "After two decades of White Desert, it still inspires me to bring people into the heart of the most remote continent on Earth. Antarctica cannot help but have a powerful effect on you. It is not just the beauty or unimaginably large landscapes; it is the reconnection to nature in its purest form.";

export default function DNA() {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const expandWrapperRef = useRef(null);
  const imageMaskRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. Elegant Fade-in for the editorial quote
      gsap.fromTo(textGroupRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: textGroupRef.current, start: "top 75%" }
        }
      );

      // 2. The Overlapping Sticky Expansion & Roll-Up
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop } = context.conditions;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: expandWrapperRef.current,
            start: "top top",
            end: "bottom bottom", 
            scrub: 1, // Smoothly tracks the user's scroll
          }
        });

        // FIX: Using strictly % so GSAP can calculate the math perfectly
        const startClip = isDesktop 
          ? "inset(20% 35% 20% 35% round 24px)" 
          : "inset(25% 10% 25% 10% round 24px)"; 
          
        const fullClip = "inset(0% 0% 0% 0% round 0px)";
        const exitClip = "inset(0% 0% 100% 0% round 0px)";

        // PHASE 1: Expand to Full Screen
        tl.fromTo(imageMaskRef.current,
          { clipPath: startClip },
          { clipPath: fullClip, ease: "none", duration: 1.5 }
        )
        .to(".overlay-dark", { opacity: 0.4, ease: "none", duration: 1.5 }, "<") 
        .fromTo(headlineRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.8 },
          "-=0.6" // Text fades in during the last half of the expansion
        )
        
        // PHASE 2: Reading Pause (Holds the screen so you can view it)
        .to({}, { duration: 0.5 })

        // PHASE 3: Roll Upward Exit to reveal "TheLand" underneath
        .to(imageMaskRef.current, {
          clipPath: exitClip, 
          ease: "none",
          duration: 1.5
        })
        .to(headlineRef.current, {
          y: -100,
          opacity: 0,
          ease: "none",
          duration: 1
        }, "<");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // FIX: -mb-[100vh] physically pulls TheLand up behind this section natively
    <section ref={sectionRef} className="relative w-full bg-[#E4ECE3] text-[#14150F] pt-24 md:pt-40 z-20 -mb-[100vh]">
      
      {/* Editorial Vertical Grid Lines */}
      <div className="absolute inset-0 z-0 grid grid-cols-4 md:grid-cols-6 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-l border-[#14150F]/10 h-full w-full hidden md:block" />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={`mob-${i}`} className="border-l border-[#14150F]/10 h-full w-full md:hidden" />
        ))}
        <div className="absolute right-0 top-0 bottom-0 border-r border-[#14150F]/10" />
      </div>

      {/* Editorial Quote Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-12 gap-6 mb-24 md:mb-40">
         <div ref={textGroupRef} className="md:col-start-6 md:col-span-5 flex flex-col items-start border-l-0 md:border-l border-[#14150F]/0 md:-ml-[1px] pl-0 md:pl-8">
            <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-24 ml-1" />
            <span className="font-serif text-5xl md:text-6xl leading-none text-[#14150F] mb-4">“</span>
            <p className="font-serif italic text-xl md:text-[26px] leading-relaxed md:leading-[1.5] text-[#14150F] mb-12">
              After two decades of exploring the natural world, it still inspires me to bring people into the heart of the most remote continent on Earth. Africa, Ethiopia cannot help but have a powerful effect on you. It is not just the beauty or unimaginably large landscapes; it is the reconnection to nature in its purest form.
            </p>
            <div className="flex flex-col items-start">
               <span className="text-[#14150F] mb-4">-</span>
               <svg viewBox="0 0 400 100" className="w-56 h-auto mb-6 stroke-[#14150F] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10,60 C20,40 40,20 60,30 C80,40 60,70 50,70 C40,70 30,60 40,50 C60,30 80,30 100,50 C120,70 140,70 160,50 C180,30 200,40 220,6₀ C24₀,8₀ 26₀,6₀ 28₀,5₀ C3₀₀,4₀ 34₀,4₀ 38₀,6₀" />
                  <path d="M80,20 L80,80" />
                  <path d="M190,40 L190,70" />
               </svg>
               <h4 className="font-sans font-medium text-sm text-[#14150F]">Babogaya Resort</h4>
               <p className="font-sans text-xs text-[#14150F]/60 mt-1">Co-Founder & CEO</p>
            </div>
         </div>
      </div>

      {/* The Sticky Animation Wrapper (Provides 250vh of scroll space) */}
      <div ref={expandWrapperRef} className="relative w-full h-[250vh] z-10 pointer-events-none">
        <div className="sticky top-0 w-full h-screen overflow-hidden z-10 pointer-events-auto">
          
          <div 
            ref={imageMaskRef}
            className="absolute inset-0 w-full h-full z-10"
            // FIX: Inline style updated to match the % values for seamless load
            style={{ clipPath: 'inset(20% 35% 20% 35% round 24px)' }} 
          >
            <Image 
              src="/media/l4.png" 
              alt="Return to the Wild" 
              fill 
              sizes="100vw"
              className="object-cover scale-[1.05]" 
            />
            <div className="overlay-dark absolute inset-0 bg-[#14150F] opacity-0" />
            
            <div 
              ref={headlineRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-[#F4F0E8] pointer-events-none opacity-0"
            >
              <h3 className="font-serif text-5xl md:text-8xl font-light text-center leading-[0.9]">
                Return to<br/>the Wild
              </h3>
              <div className="mt-12 pointer-events-auto">
                <a href="/philosophy" className="relative font-sans text-xs uppercase tracking-widest pb-1 group/link">
                  Discover more
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F0E8] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}