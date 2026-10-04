"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const events = [
  { 
    id: '01',
    date: "Oct 12 — 14", 
    title: "The Harvest Feast", 
    category: "Gastronomy", 
    desc: "Join our head chef and local foragers for a multi-course celebration of the season's peak ingredients.",
    img: "/media/l8.PNG" 
  },
  { 
    id: '02',
    date: "Oct 20 — 22", 
    title: "Forest Immersion", 
    category: "Wellness", 
    desc: "A three-day silent retreat focused on mindful walking, meditation, and ancient restorative practices.",
    img: "/media/l11.png" 
  },
  { 
    id: '03',
    date: "Nov 02", 
    title: "Artisan Market", 
    category: "Culture", 
    desc: "Experience the vibrant craftsmanship of our region as local weavers and potters showcase their work.",
    img: "/media/l1.png" 
  },
  { 
    id: '04',
    date: "Nov 15 — 18", 
    title: "Vintner's Weekend", 
    category: "The Cellar", 
    desc: "Exclusive tastings from our private reserves, paired with fire-cooked local delicacies.",
    img: "/media/l9.png" 
  }
];

export default function WhatsOn() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);
  
  // Default to 0 so the first image is visible from the very beginning
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // ENTRY: Reveal the header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );

      // ENTRY: Reveal the rows sequentially
      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out", 
            scrollTrigger: { trigger: row, start: "top 85%" } 
          }
        );
      });

      // EXIT: Parallax fade out as the section rolls up to reveal the Footer
      gsap.to(contentRef.current, {
        y: -100, 
        opacity: 0, 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 95%", 
          end: "bottom 20%",   
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Removed min-h-screen and reduced padding so it ends right after the button
      className="relative w-full rounded-t-[40px] md:rounded-t-[80px] z-[90] -mt-[15vh] md:-mt-[20vh] shadow-[0_-30px_80px_rgba(0,0,0,0.5)] pb-16 md:pb-24 pt-24 md:pt-40 text-[#14150F]"
    >
      
      {/* ========================================= */}
      {/* BACKGROUND LAYERS */}
      {/* ========================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-t-[40px] md:rounded-t-[80px] z-0 pointer-events-none">
        
        {/* Layer 1: Base Light Green Color */}
        <div className="absolute inset-0 bg-[#D4DFD0] z-0" />

        {/* Layer 2: The Interactive Image Backgrounds */}
        {events.map((evt, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Cinematic slow-scale effect */}
            <Image 
              src={evt.img} 
              alt={evt.title} 
              fill 
              className={`object-cover transition-transform duration-[10s] ease-out ${activeIndex === index ? 'scale-100' : 'scale-110'}`}
              sizes="100vw"
            />
            {/* Light Green Overlay: Washes the image in green so the dark text remains perfectly readable */}
            <div className="absolute inset-0 bg-[#D4DFD0]/85 backdrop-blur-[2px]" />
          </div>
        ))}

        {/* Layer 3: The Drafting Grid */}
        <div className="absolute inset-0 z-20 opacity-10"
             style={{ 
               backgroundImage: 'linear-gradient(to right, #14150F 1px, transparent 1px), linear-gradient(to bottom, #14150F 1px, transparent 1px)', 
               backgroundSize: '4vw 4vw' 
             }} 
        />
      </div>

      {/* ========================================= */}
      {/* FOREGROUND CONTENT */}
      {/* ========================================= */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-6 ml-1" />
            <h2 className="font-serif text-5xl md:text-[6vw] font-light tracking-tight leading-[0.9]">
              What's On
            </h2>
          </div>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-sm pb-2">
            Discover a curated calendar of experiences designed to connect you deeply with the rhythm of the land.
          </p>
        </div>

        {/* Full-Width Interactive Rows */}
        <div className="flex flex-col border-t border-[#14150F]/20">
          {events.map((evt, index) => (
            <div 
              key={evt.id}
              ref={el => rowsRef.current[index] = el}
              onMouseEnter={() => setActiveIndex(index)}
              // Removed onMouseLeave so it stays securely on the last hovered image
              className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-[#14150F]/20 cursor-pointer transition-all duration-500
                ${activeIndex !== index ? 'opacity-40 blur-[1px]' : 'opacity-100 blur-0'}
              `}
            >
              
              {/* Left Data */}
              <div className="flex flex-col gap-2 w-full md:w-1/6 mb-6 md:mb-0">
                <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                  {evt.date}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest opacity-60">
                  {evt.category}
                </span>
              </div>

              {/* Massive Center Title */}
              <div className="w-full md:w-4/6 text-left md:text-center z-10">
                <h3 className="font-serif text-4xl md:text-[5vw] font-light leading-none tracking-tight transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:italic group-hover:tracking-normal group-hover:translate-x-4 md:group-hover:translate-x-0 md:group-hover:scale-[1.05]">
                  {evt.title}
                </h3>
                
                {/* Mobile-only Description Dropdown */}
                <div className="md:hidden w-full overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                  <p className="font-sans text-sm opacity-70 mt-6 pb-2 border-l border-[#FF6B00] pl-4">
                    {evt.desc}
                  </p>
                </div>
              </div>

              {/* Right Action Icon (Desktop Only) */}
              <div className="hidden md:flex w-1/6 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                <div className="w-16 h-16 rounded-full border border-[#14150F] flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View Calendar Button */}
        <div className="mt-20 md:mt-24 w-full flex justify-center">
          <a href="/calendar" className="relative font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] pb-2 group/link inline-block">
            View Full Calendar
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#14150F] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100" />
          </a>
        </div>

      </div>
    </section>
  );
}