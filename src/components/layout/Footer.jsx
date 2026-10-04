"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function Footer() {
  const footerRef = useRef(null);
  const innerRef = useRef(null);
  
  // Background reveal refs
  const bgImageRef = useRef(null);
  const glowRef = useRef(null);
  
  // Text reveal refs
  const textContainerRef = useRef(null);
  const textImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // The Reveal Parallax
      gsap.fromTo(innerRef.current,
        { yPercent: -40, scale: 0.95 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    
    // Global Footer Coordinates
    const { left, top } = footerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // 1. Smoothly track the ambient orange glow
    if (glowRef.current) {
      gsap.to(glowRef.current, { x: x, y: y, duration: 0.6, ease: "power3.out" });
    }

    // 2. Animate the massive background image flashlight via CSS variables
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, { 
        '--mask-x': `${x}px`, 
        '--mask-y': `${y}px`, 
        opacity: 1, 
        duration: 0.2,
        ease: "power2.out"
      });
    }

    // 3. Animate the text-specific image reveal
    if (textContainerRef.current && textImageRef.current) {
      const textRect = textContainerRef.current.getBoundingClientRect();
      const textX = e.clientX - textRect.left;
      const textY = e.clientY - textRect.top;
      
      gsap.to(textImageRef.current, { 
        '--mask-x': `${textX}px`, 
        '--mask-y': `${textY}px`, 
        opacity: 1, 
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (bgImageRef.current) gsap.to(bgImageRef.current, { opacity: 0, duration: 0.5 });
    if (textImageRef.current) gsap.to(textImageRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <footer 
      ref={footerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[80vh] md:h-screen bg-[#0C1610] text-[#F4F0E8] overflow-hidden z-0 cursor-crosshair"
    >
      
      {/* LAYER 1: The Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#F4F0E8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* LAYER 2: The Full-Footer Background Flashlight Reveal */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full z-[5] opacity-0 pointer-events-none"
        style={{
          // Upgraded mask syntax for flawless cross-browser compatibility
          WebkitMaskImage: 'radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, transparent 35vw)',
          maskImage: 'radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, transparent 35vw)',
        }}
      >
        <div className="absolute inset-0 bg-[#0C1610]/60 z-10" />
        <Image 
          src="/media/l8.PNG" 
          alt="Babogaya Landscape" 
          fill 
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* LAYER 3: The Orange Ambient Glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#FF6B00] rounded-full mix-blend-screen opacity-[0.08] pointer-events-none blur-[100px] -translate-x-1/2 -translate-y-1/2 z-[8]"
      />

      {/* LAYER 4: The Footer Content */}
      <div ref={innerRef} className="relative z-10 w-full h-full flex flex-col justify-between pt-24 md:pt-40 pb-12 pointer-events-none">
        
        {/* Top Half: Links and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-0 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-auto">
          
          <div className="flex flex-col">
            <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-6 ml-1" />
            <h4 className="font-serif text-2xl md:text-3xl mb-4 font-light">Babogaya Resort</h4>
            <p className="font-sans text-sm opacity-60 leading-relaxed mb-6">
              Lake Babogaya<br />
              Bishoftu, Ethiopia
            </p>
            <a href="mailto:discover@babogaya.com" className="font-sans text-xs uppercase tracking-widest hover:text-[#FF6B00] transition-colors">
              discover@babogaya.com
            </a>
          </div>

          <div className="flex gap-16 md:gap-32">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Explore</span>
              {['The Land', 'Villas', 'Gastronomy', 'Wellness'].map((link) => (
                <a key={link} href="#" className="font-serif text-lg md:text-xl italic opacity-80 hover:opacity-100 hover:translate-x-2 transition-all duration-300">
                  {link}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Connect</span>
              {['Journal', 'Calendar', 'Careers', 'Contact'].map((link) => (
                <a key={link} href="#" className="font-serif text-lg md:text-xl italic opacity-80 hover:opacity-100 hover:translate-x-2 transition-all duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Social</span>
            <div className="flex gap-6 mb-12">
              {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="font-sans text-xs uppercase tracking-widest hover:text-[#FF6B00] transition-colors">
                  {social}
                </a>
              ))}
            </div>
            <a href="/book" className="px-8 py-4 bg-[#F4F0E8] text-[#0C1610] font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#FF6B00] hover:text-[#F4F0E8] transition-colors duration-500">
              Reserve a Villa
            </a>
          </div>

        </div>

        {/* Bottom Half: Massive Edge-to-Edge Typography */}
        <div className="w-full flex flex-col mt-24 pointer-events-auto">
          
          <div 
            ref={textContainerRef} 
            className="relative w-full text-center overflow-hidden flex flex-col justify-center items-center"
          >
            {/* Base Layer: Solid Edge-to-Edge Text */}
            <h2 className="font-serif font-bold text-[15.5vw] leading-[0.8] text-[#F4F0E8] w-full text-center whitespace-nowrap select-none">
              BABOGAYA
            </h2>
            
            {/* Top Layer: The Nested Image Mask */}
            <h2 
              ref={textImageRef}
              className="absolute top-0 left-0 font-serif font-bold text-[15.5vw] leading-[0.8] w-full text-center whitespace-nowrap select-none opacity-0 pointer-events-none"
              style={{
                backgroundImage: 'url(/media/l1.png)', // Text Reveal Image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                
                // CRITICAL FIXES FOR TEXT IMAGE CLIPPING
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                
                // Upgraded Mask Syntax
                WebkitMaskImage: 'radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, transparent 15vw)',
                maskImage: 'radial-gradient(circle at var(--mask-x, 50%) var(--mask-y, 50%), black 0%, transparent 15vw)',
              }}
            >
              BABOGAYA
            </h2>
          </div>

          {/* Copyright Bar */}
          <div className="w-full flex justify-between items-center mt-8 md:mt-12 border-t border-[#F4F0E8]/20 pt-6 px-6 md:px-12">
            <span className="font-sans text-[10px] opacity-40 uppercase tracking-widest">
              © {new Date().getFullYear()} Babogaya Resort
            </span>
            <span className="font-sans text-[10px] opacity-40 uppercase tracking-widest">
              Site by OPEN
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}