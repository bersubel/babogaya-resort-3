"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const accordionData = [
  { 
    src: "/media/l10.png", 
    title: "Open Fire", 
    price: "Ancient Techniques",
    desc: "Witness the primal connection of flame and flavor as our chefs prepare your meal over open coals."
  },
  { 
    src: "/media/l1.png", 
    title: "The Ritual", 
    price: "Traditional Ceremony",
    desc: "Experience the rich heritage and sensory depth of our local customs and coffee rituals."
  },
  { 
    src: "/media/l11.png", 
    title: "Chef's Table", 
    price: "Intimate Dining",
    desc: "A curated, multi-course journey through our seasonal menu, hosted intimately by our head chef."
  },
  { 
    src: "/media/l4.png", 
    title: "The Lounge", 
    price: "Evening Spirits",
    desc: "Unwind with bespoke cocktails, rare vintages, and uninterrupted views of the landscape."
  }
];

export default function EatAndDrink() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);
  const blocksRef = useRef([]);
  const accordionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // 1. Horizontal Panning for the massive top text
      gsap.to(bgTextRef.current, {
        x: "-30vw", 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Intro Text Reveal (Left Side)
      gsap.fromTo(introLeftRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 1.2, scrollTrigger: { trigger: introLeftRef.current, start: "top 80%" } }
      );

      // 3. Symphony Text Reveal (Right Side)
      gsap.fromTo(introRightRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 1.2, scrollTrigger: { trigger: introRightRef.current, start: "top 80%" } }
      );

      // 4. Initial Rows 1 & 2 Animation
      blocksRef.current.forEach((block) => {
        if (!block) return;
        const mask = block.querySelector('.image-mask');
        const img = block.querySelector('img');
        const externalText = block.querySelector('.external-text');

        gsap.fromTo(mask,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut", duration: 1.2, scrollTrigger: { trigger: block, start: "top 85%" } }
        );

        gsap.fromTo(img,
          { scale: 1.15 },
          { scale: 1, ease: "power2.out", duration: 1.5, scrollTrigger: { trigger: block, start: "top 85%" } }
        );

        if (externalText) {
          gsap.fromTo(externalText,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, ease: "power3.out", duration: 1, delay: 0.2, scrollTrigger: { trigger: block, start: "top 80%" } }
          );
        }
      });

      // 5. Accordion Gallery Entrance
      gsap.fromTo(accordionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 1.2, scrollTrigger: { trigger: accordionRef.current, start: "top 85%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0C1610] text-[#F4F0E8] overflow-hidden z-20">
      
      {/* STICKY BACKGROUND LAYER */}
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        
        {/* Top Panning Text */}
        <div className="absolute top-0 left-0 w-full opacity-[0.08] flex items-start mt-[-2vw]">
          <h2 ref={bgTextRef} className="font-serif text-[18vw] leading-[0.8] font-light whitespace-nowrap tracking-tighter">
            BABOGAYA &nbsp;&nbsp; BABOGAYA &nbsp;&nbsp; BABOGAYA
          </h2>
        </div>

        {/* MASSIVE BACKGROUND LOGO (Shifted down to top-60% as requested) */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[50vw] aspect-square z-0 opacity-10 flex items-center justify-center">
          <Image src="/media/babogayalogo.png" alt="Babogaya Logo" fill className="object-contain" />
        </div>

      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 -mt-[100vh] pb-32 md:pb-48 pt-32 md:pt-48">
        
        <div className="relative w-full flex flex-col z-10">
          
          {/* ============================== */}
          {/* ROW 1: Intro (Left) + 01 (Right) */}
          {/* ============================== */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-16 md:gap-0 mb-32 md:mb-40">
            
            <div ref={introLeftRef} className="w-full md:w-5/12 pt-0 md:pt-24 z-10">
              <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-8 ml-1" />
              <h3 className="font-serif text-5xl md:text-7xl leading-[1.1] font-light tracking-tight text-[#F4F0E8]">
                Rooted deeply<br />
                in the <span className="italic text-[#F4F0E8]/70">untamed earth.</span>
              </h3>
            </div>

            <div ref={el => blocksRef.current[0] = el} className="relative w-full md:w-[40vw]">
              <div className="image-mask relative w-full aspect-[3/4] overflow-hidden rounded-sm">
                <Image src="/media/l8.PNG" alt="The Harvest" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#0C1610]/10" />
              </div>
              <div className="external-text absolute -left-4 md:-left-24 bottom-12 z-20 mix-blend-difference drop-shadow-2xl">
                <span className="block font-sans text-[10px] uppercase tracking-widest mb-2 opacity-80">01 — Earth to Table</span>
                <h3 className="font-serif text-5xl md:text-6xl font-light">The Harvest</h3>
              </div>
            </div>
          </div>

          {/* ============================== */}
          {/* ROW 2: 02 (Left) + Symphony (Right) */}
          {/* ============================== */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-16 md:gap-0 mb-40 md:mb-48">
            
            <div ref={el => blocksRef.current[1] = el} className="relative w-full md:w-[45vw] order-2 md:order-1 mt-16 md:mt-0">
              <div className="image-mask relative w-full aspect-[16/9] overflow-hidden rounded-sm">
                <Image src="/media/l9.png" alt="The Cellar" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#0C1610]/10" />
              </div>
              <div className="external-text absolute -right-4 md:-right-24 bottom-12 z-20 text-right mix-blend-difference drop-shadow-2xl">
                <span className="block font-sans text-[10px] uppercase tracking-widest mb-2 opacity-80">02 — Curated Vintages</span>
                <h3 className="font-serif text-5xl md:text-6xl font-light">The Cellar</h3>
              </div>
            </div>

            <div ref={introRightRef} className="w-full md:w-5/12 pt-0 md:pt-16 z-10 order-1 md:order-2">
              <h3 className="font-serif text-5xl md:text-7xl leading-[1.1] font-light tracking-tight text-[#F4F0E8]">
                A symphony<br />
                of flavours &<br />
                <span className="italic text-[#F4F0E8]/70">shared moments</span>
              </h3>
            </div>
          </div>

          {/* ============================== */}
          {/* ROW 3: THE ACCORDION GALLERY */}
          {/* Replaces the 4 individual blocks with a slick, expanding hover gallery */}
          {/* ============================== */}
          <div ref={accordionRef} className="w-full h-[60vh] md:h-[80vh] flex flex-col md:flex-row gap-2 rounded-[24px] md:rounded-[40px] overflow-hidden bg-[#0C1610]">
            
            {accordionData.map((item, index) => (
              <div 
                key={index} 
                // Core hover expansion logic
                className="group relative flex-1 md:hover:flex-[4] transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1000ms] ease-out" 
                  />
                </div>
                
                {/* Darkening Overlay (Fades slightly on hover) */}
                <div className="absolute inset-0 bg-[#0C1610]/50 md:group-hover:bg-[#0C1610]/20 transition-colors duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1610]/80 via-transparent to-transparent opacity-80 md:opacity-100" />

                {/* Content (Fully visible on hover) */}
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:delay-100">
                  <div>
                    <h3 className="font-serif text-3xl md:text-5xl text-[#F4F0E8]">{item.title}</h3>
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#F4F0E8]/70 mt-2 block">
                      {item.price}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-sans text-xs md:text-sm text-[#F4F0E8]/90 max-w-sm mb-4 md:mb-6 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#FF6B00]">Learn More</span>
                      <span className="text-[#FF6B00]">+</span>
                    </div>
                  </div>
                </div>

                {/* Default Vertical Text (Visible when NOT hovered on desktop) */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <h3 className="font-serif text-3xl rotate-[-90deg] text-[#F4F0E8] whitespace-nowrap tracking-wider">
                    {item.title}
                  </h3>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Explore Button */}
        <div className="w-full flex justify-center mt-24 md:mt-32 z-20 relative">
          <a href="/dining" className="relative font-sans text-xs md:text-sm uppercase tracking-widest pb-1 group/link text-[#F4F0E8]">
            Explore Dining
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F4F0E8] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:scale-x-100" />
          </a>
        </div>

      </div>
    </section>
  );
}