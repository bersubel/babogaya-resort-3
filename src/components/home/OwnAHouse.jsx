"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const villas = [
  { 
    id: '01', 
    title: "Lakefront Villa", 
    specs: "2 Guests · 150 SQM · Private Plunge Pool",
    desc: "Perched directly on the water's edge, offering uninterrupted panoramic views of the lake and absolute privacy.", 
    img: "/media/l10.png", 
    bg: "bg-[#F4F0E8]", 
    text: "text-[#14150F]",
    line: "bg-[#14150F]"
  },
  { 
    id: '02', 
    title: "Canopy Suite", 
    specs: "4 Guests · 220 SQM · Suspended Deck",
    desc: "Elevated among the ancient trees, this suite blends seamlessly with the forest canopy for a true wilderness immersion.", 
    img: "/media/l1.png", 
    bg: "bg-[#0C1610]", 
    text: "text-[#F4F0E8]",
    line: "bg-[#F4F0E8]"
  },
  { 
    id: '03', 
    title: "Earth House", 
    specs: "2 Guests · 180 SQM · Courtyard Garden",
    desc: "Architecturally integrated into the natural slope of the land, utilizing raw stone and sustainable materials.", 
    img: "/media/l11.png", 
    bg: "bg-[#E4ECE3]", 
    text: "text-[#14150F]",
    line: "bg-[#14150F]"
  },
  { 
    id: '04', 
    title: "Horizon Retreat", 
    specs: "6 Guests · 400 SQM · Private Chef",
    desc: "Our most exclusive accommodation, featuring expansive living spaces, a private infinity edge, and ultimate seclusion.", 
    img: "/media/l4.png", 
    bg: "bg-[#14150F]", 
    text: "text-[#F4F0E8]",
    line: "bg-[#F4F0E8]"
  }
];

export default function Villas() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector('img');
        
        gsap.fromTo(img,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // 1. -mt-[15vh] pulls this entire block up over the previous page
      // 2. z-50 ensures it stays on top of the Gastronomy section
      // 3. Added a massive drop shadow to emphasize the 3D overlap effect
      className="relative w-full bg-gradient-to-b from-[#2C4532] to-[#14261B] rounded-[40px] md:rounded-[80px] pb-24 md:pb-48 z-50 -mt-[15vh] md:-mt-[20vh] shadow-[0_-30px_80px_rgba(0,0,0,0.6)]"
    >
      
      {/* Added pt-24 md:pt-40 to push the text down safely past the overlap area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-40 pb-24 md:pb-32">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end gap-8 md:gap-0">
          <div>
            <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-6 md:mb-8 ml-1" />
            <h2 className="font-serif text-5xl md:text-7xl font-light text-[#F4F0E8] leading-[1.1] tracking-tight">
              A sanctuary<br />
              <span className="italic text-[#F4F0E8]/60">in the wild.</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="font-sans text-sm md:text-base text-[#F4F0E8]/80 leading-relaxed mb-6">
              Our structures do not dominate the landscape; they dissolve into it. Discover accommodations designed for total privacy and pure reconnection.
            </p>
            <a href="/stay" className="relative font-sans text-xs uppercase tracking-widest pb-1 group/link text-[#F4F0E8] inline-block">
              View all Villas
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F0E8] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full px-4 md:px-12">
        
        {villas.map((villa, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className={`sticky top-[2vh] md:top-[4vh] w-full h-[96vh] md:h-[92vh] ${villa.bg} ${villa.text} flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)] origin-top rounded-[32px] md:rounded-[40px] mb-12`}
          >
            
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-24 pt-12 md:pt-0 z-10">
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest opacity-60 mb-8 md:mb-16">
                Villa {villa.id}
              </span>
              
              <h3 className="font-serif text-5xl md:text-[5vw] leading-[0.9] tracking-tight font-light mb-6 md:mb-12">
                {villa.title}
              </h3>
              
              <div className={`w-full h-[1px] ${villa.line} opacity-20 mb-6 md:mb-8`} />
              
              <p className="font-sans text-xs md:text-sm uppercase tracking-widest opacity-80 mb-6 md:mb-8">
                {villa.specs}
              </p>
              
              <p className="font-sans text-sm md:text-base opacity-70 leading-relaxed max-w-md">
                {villa.desc}
              </p>

              <div className="mt-8 md:mt-16">
                <a href={`/stay/${villa.id}`} className="relative font-sans text-xs uppercase tracking-widest pb-1 group/link inline-block">
                  Discover {villa.title}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] ${villa.line} origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100`} />
                </a>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
              <Image 
                src={villa.img} 
                alt={villa.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
            </div>

          </div>
        ))}
        
      </div>
    </section>
  );
}