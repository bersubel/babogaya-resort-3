"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Image from 'next/image';

export default function Journey() {
  const sectionRef = useRef(null);
  
  // Refs for Entrance Animations
  const titleWordsRef = useRef([]);
  const statsRef = useRef(null);
  
  // Map Refs
  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const planeRef = useRef(null);
  const carRef = useRef(null);
  const addisPopupRef = useRef(null);
  const babogayaPopupRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    
    let ctx = gsap.context(() => {
      
      const l1 = path1Ref.current.getTotalLength();
      const l2 = path2Ref.current.getTotalLength();
      
      // 1. Initial Resets
      gsap.set(path1Ref.current, { strokeDasharray: l1, strokeDashoffset: l1 });
      gsap.set(path2Ref.current, { strokeDasharray: l2, strokeDashoffset: l2 });
      gsap.set([addisPopupRef.current, babogayaPopupRef.current], { opacity: 0, scale: 0.8, transformOrigin: "bottom center" });
      gsap.set(carRef.current, { opacity: 0, scale: 0 }); 

      // Align vehicles to the exact start of their paths
      gsap.set(planeRef.current, { xPercent: -50, yPercent: -50 });
      gsap.set(carRef.current, { xPercent: -50, yPercent: -50 });

      // 2. THE FLOODY ENTRANCE & EXIT (Title + Stats)
      // Title Waterfall
      gsap.fromTo(titleWordsRef.current,
        { y: 60, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%", 
            end: "bottom top", 
            toggleActions: "play reverse play reverse" 
          }
        }
      );

      // HUD Stats Slide-in
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { x: 30, opacity: 0, filter: "blur(8px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%", 
              end: "bottom top", 
              toggleActions: "play reverse play reverse" 
            }
          }
        );
      }

      // 3. THE MASTER MAP TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%", 
          scrub: 1,
          pin: true,
        }
      });
      
      // --- FLIGHT PATH (ROUND ARC to Addis) ---
      tl.to(path1Ref.current, { strokeDashoffset: 0, duration: 2.5, ease: "none" })
      .to(planeRef.current, {
        motionPath: {
          path: path1Ref.current,
          align: path1Ref.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90 
        },
        duration: 2.5, 
        ease: "power1.inOut"
      }, "<")
      
      // Transfer point
      .to(addisPopupRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" })
      .to(planeRef.current, { opacity: 0, scale: 0, duration: 0.3 }, "<")
      .to(carRef.current, { opacity: 1, scale: 1, duration: 0.3 }, "<")

      // --- CAR PATH (WINDING CURVE to Babogaya) ---
      .to(path2Ref.current, { strokeDashoffset: 0, duration: 2.5, ease: "none" }, "+=0.3")
      .to(carRef.current, {
        motionPath: {
          path: path2Ref.current,
          align: path2Ref.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: 0 
        },
        duration: 2.5, 
        ease: "power1.inOut"
      }, "<")
      
      // Arrival point
      .to(babogayaPopupRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = ["Anywhere", "To", "Babogaya"];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#14150F] text-[#F4F0E8] rounded-t-[40px] md:rounded-t-[80px] z-[60] -mt-[15vh] md:-mt-[20vh] shadow-[0_-30px_80px_rgba(0,0,0,0.6)]"
    >
      
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-t-[40px] md:rounded-t-[80px]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(#F4F0E8 2px, transparent 2px)', backgroundSize: '60px 60px' }} />

        {/* Floody Title Header */}
        <div className="absolute top-12 md:top-24 left-0 w-full flex justify-center z-30 pointer-events-none">
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight flex gap-3 md:gap-5 px-4">
            {titleText.map((word, index) => (
              <div key={index} className="overflow-visible py-2">
                <span 
                  ref={el => titleWordsRef.current[index] = el}
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
              </div>
            ))}
          </h2>
        </div>

        {/* THE TELEMETRY HUD (Stats) */}
        <div 
          ref={statsRef} 
          className="absolute top-12 md:top-24 right-6 md:right-12 flex flex-col gap-6 md:gap-8 z-30 pointer-events-none text-right"
        >
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 text-[#FF6B00]">Distance</span>
            <span className="font-serif text-xl md:text-2xl italic tracking-wide">45 km</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 text-[#FF6B00]">Drive Time</span>
            <span className="font-serif text-xl md:text-2xl italic tracking-wide">45 mins</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1 text-[#FF6B00]">Climate</span>
            <span className="font-serif text-xl md:text-2xl italic tracking-wide">24°C / 75°F</span>
          </div>
        </div>

        {/* The Interactive Map Area */}
        <div className="absolute inset-0 w-full h-full z-10">
          
          {/* CRITICAL FIX: preserveAspectRatio="none" forces the 1000x1000 SVG coordinates to map exactly to the CSS percentages */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            
            {/* Background Faint Tracks */}
            <path d="M 200 300 Q 350 100 500 550" stroke="#F4F0E8" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="8, 8" fill="none" />
            <path d="M 500 550 C 600 750, 700 850, 850 800" stroke="#F4F0E8" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="8, 8" fill="none" />
            
            {/* Path 1: Flight (Animated Arc) */}
            <path 
              ref={path1Ref}
              d="M 200 300 Q 350 100 500 550" 
              stroke="#FF6B00" strokeWidth="3" fill="none"
              strokeLinecap="round"
            />
            
            {/* Path 2: Drive (Animated Winding S-Curve) */}
            <path 
              ref={path2Ref}
              d="M 500 550 C 600 750, 700 850, 850 800" 
              stroke="#FF6B00" strokeWidth="3" fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* POINT A: Anywhere */}
          <div className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-2 h-2 bg-[#F4F0E8]/40 rounded-full" />
            <span className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#F4F0E8]/50 whitespace-nowrap">
              Departure
            </span>
          </div>

          {/* POINT B: Addis Ababa */}
          <div className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="w-3 h-3 bg-[#FF6B00] rounded-full shadow-[0_0_15px_#FF6B00]" />
            <span className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#F4F0E8] whitespace-nowrap">
              Addis Ababa
            </span>
            <div ref={addisPopupRef} className="absolute bottom-full mb-6 w-40 aspect-video rounded-xl overflow-hidden border border-[#F4F0E8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              <Image src="/media/addis.png" alt="Addis Ababa" fill className="object-cover" />
            </div>
          </div>

          {/* POINT C: Babogaya */}
          <div className="absolute top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="w-4 h-4 bg-[#F4F0E8] rounded-full flex items-center justify-center shadow-[0_0_20px_#F4F0E8]">
              <div className="w-1.5 h-1.5 bg-[#14150F] rounded-full" />
            </div>
            <span className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#F4F0E8] whitespace-nowrap">
              Bishoftu
            </span>
            <div ref={babogayaPopupRef} className="absolute bottom-full mb-6 w-40 aspect-[4/5] rounded-xl overflow-hidden border border-[#F4F0E8]/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              <Image src="/media/l1.png" alt="Babogaya Resort" fill className="object-cover" />
            </div>
          </div>

          {/* VEHICLE 1: Plane Icon */}
          <div ref={planeRef} className="absolute top-0 left-0 z-20 w-8 h-8 flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-45deg)' }}>
               <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2-.5-3.5 1.5L14.5 9l-8.2-1.8c-.8-.2-1.6.4-1.8 1.2-.2.8.2 1.5.9 1.8l5.8 2.6-3 3-.9-.3c-.6-.2-1.3.2-1.5.8-.2.7.2 1.3.8 1.6l3 1.3 1.3 3c.3.6 1 .9 1.6.8.6-.2 1-.9.8-1.5l-.3-.9 3-3 2.6 5.8c.3.7 1 1.1 1.8.9.8-.2 1.4-1 1.2-1.8z"/>
            </svg>
          </div>

          {/* VEHICLE 2: Car Icon */}
          <div ref={carRef} className="absolute top-0 left-0 z-20 w-8 h-8 flex items-center justify-center drop-shadow-[0_0_10px_rgba(255,107,0,0.8)] bg-[#14150F] border border-[#FF6B00]/30 rounded-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
              <circle cx="7" cy="17" r="2"/>
              <path d="M9 17h6"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}