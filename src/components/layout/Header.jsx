"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Header() {
  const headerRef = useRef(null);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.6,
      ease: "custom-ease"
    }).progress(1);

    const st = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.scrollY > window.innerHeight - 80) {
          setIsSolid(true);
        } else {
          setIsSolid(false);
        }
        
        if (self.direction === -1) {
          showAnim.play();
        } else if (self.direction === 1 && self.scrollY > window.innerHeight / 2) {
          showAnim.reverse();
        }
      }
    });
    
    return () => st.kill();
  }, []);

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-700 ease-in-out px-6 md:px-12 py-6 flex flex-row items-center justify-between font-sans uppercase text-[11px] tracking-widest font-medium
      ${isSolid ? 'bg-[#F4F0E8] text-[#14150F] shadow-sm' : 'bg-transparent text-[#F4F0E8]'}`}
    >
      {/* Left: Text Links (Now takes 25% of the width) */}
      <nav className="hidden md:flex gap-8 w-1/4">
        <Link href="/hotel" className="hover:opacity-70 transition-opacity">Stay</Link>
        <Link href="/architecture" className="hover:opacity-70 transition-opacity">Design</Link>
        <Link href="/dna" className="hover:opacity-70 transition-opacity">Collections</Link>
      </nav>

      {/* Center: Massive Logo (Now takes 50% of the width to give it room to scale) */}
      <div className="w-1/2 flex justify-start md:justify-center">
        <Link 
          href="/" 
          // Massive height and width boundaries
          className="relative block h-16 md:h-24 w-64 md:w-96"
        >
          <Image 
            src="/media/babogayalogo.png" 
            alt="Babogaya Logo"
            fill
            className="object-contain transition-all duration-700"
            priority
            sizes="(max-width: 768px) 256px, 384px"
          />
        </Link>
      </div>

      {/* Right: Booking & Locale (Now takes 25% of the width) */}
      <div className="w-1/4 flex justify-end items-center gap-6 md:gap-8">
        <button className="hover:opacity-70 transition-opacity">ENG</button>
        <button 
          className="hidden md:block hover:opacity-70 transition-opacity"
          onClick={() => { /* Toggle BookingDrawer logic will go here */ }}
        >
          Book
        </button>
        <button className="flex flex-col gap-[4px] group" aria-label="Menu">
          <span className={`block w-6 h-[1px] transition-colors duration-700 ${isSolid ? 'bg-[#14150F]' : 'bg-[#F4F0E8]'}`} />
          <span className={`block w-6 h-[1px] transition-colors duration-700 ${isSolid ? 'bg-[#14150F]' : 'bg-[#F4F0E8]'}`} />
        </button>
      </div>
    </header>
  );
}