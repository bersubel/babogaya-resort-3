"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function FeaturedStory() {
  const sectionRef = useRef(null);
  
  // Text Refs
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  
  // Container Refs (For the outer floating effect)
  const img1WrapRef = useRef(null);
  const img2WrapRef = useRef(null);
  const img3WrapRef = useRef(null);
  
  // Inner Image Refs (For the inner parallax effect)
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // 1. Text Reveal Animations
      [textLeftRef.current, textRightRef.current].forEach((textBlock) => {
        gsap.fromTo(textBlock,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: textBlock, start: "top 85%" } }
        );
      });

      // 2. Dual-Layer Floating Image Effect
      const floatImages = [
        { wrap: img1WrapRef.current, img: img1Ref.current, yMove: -40 },
        { wrap: img2WrapRef.current, img: img2Ref.current, yMove: -60 },
        { wrap: img3WrapRef.current, img: img3Ref.current, yMove: -30 }
      ];

      floatImages.forEach(({ wrap, img, yMove }) => {
        if (!wrap || !img) return;

        // Outer Container: Floats up faster than the scroll to create physical separation
        gsap.fromTo(wrap,
          { y: 0 },
          { y: yMove, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } }
        );

        // Inner Image: Standard cinematic parallax
        gsap.fromTo(img,
          { scale: 1.15, yPercent: -5 },
          { scale: 1, yPercent: 5, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // The Overlap Effect: Light Green BG, rounded corners, high z-index, and top margin pull
      className="relative w-full bg-[#E4ECE3] text-[#14150F] rounded-[40px] md:rounded-[80px] z-[70] -mt-[15vh] md:-mt-[20vh] shadow-[0_-30px_80px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      
      {/* Editorial Drafting Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, #14150F 1px, transparent 1px), linear-gradient(to bottom, #14150F 1px, transparent 1px)', 
            backgroundSize: '4vw 4vw' 
          }} 
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full flex flex-col pt-24 md:pt-40 pb-24 md:pb-40">
        
        {/* ============================== */}
        {/* ROW 1: Text Left, Floating Image Right */}
        {/* ============================== */}
        <div className="flex flex-col md:flex-row w-full min-h-[80vh] items-center">
          
          {/* Left: Newspaper Text Block */}
          <div className="w-full md:w-5/12 flex flex-col px-6 md:px-24 mb-16 md:mb-0">
            <div ref={textLeftRef}>
              <h2 className="font-serif uppercase text-6xl md:text-[5.5vw] leading-[0.85] tracking-tight mb-8">
                ABOUT & BABOGAYA<br />
                HISTORY
              </h2>
              <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed max-w-md">
                Babogaya is a private sanctuary rooted in the untamed landscape. Centred around a deep respect for the earth, it is a collection of restored spaces and new architectures that blend seamlessly with the forest canopy. Once a quiet lakeside secret, it has been carefully revived to offer a true wilderness immersion.
              </p>
            </div>
          </div>

          {/* Right: Floating Photograph */}
          <div className="w-full md:w-7/12 relative px-6 md:px-16 h-[50vh] md:h-[80vh]">
            <div 
              ref={img1WrapRef} 
              className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_30px_60px_rgba(20,21,15,0.2)]"
            >
              <Image 
                ref={img1Ref}
                src="/media/l8.PNG" 
                alt="Babogaya Landscape" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>

        {/* Spacer between rows */}
        <div className="w-full h-32 md:h-48" />

        {/* ============================== */}
        {/* ROW 2: Floating Image Left, Text Right (With nested picture) */}
        {/* ============================== */}
        <div className="flex flex-col md:flex-row w-full min-h-[80vh] items-center">
          
          {/* Left: Floating Photograph */}
          <div className="w-full md:w-1/2 relative px-6 md:px-16 h-[50vh] md:h-[90vh] order-2 md:order-1 mt-16 md:mt-0">
            <div 
              ref={img2WrapRef} 
              className="relative w-full h-full overflow-hidden rounded-xl shadow-[0_30px_60px_rgba(20,21,15,0.2)]"
            >
              <Image 
                ref={img2Ref}
                src="/media/l10.png" 
                alt="Evening Traditions" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Text Block + Nested Small Image */}
          <div className="w-full md:w-1/2 flex flex-col px-6 md:px-24 order-1 md:order-2">
            <div ref={textRightRef} className="bg-[#E4ECE3] relative z-20">
              
              <span className="block font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 text-[#14150F]">
                OCTOBER 2026
              </span>
              
              <h2 className="font-serif uppercase text-6xl md:text-[5vw] leading-[0.85] tracking-tight mb-8">
                WE LOVE OUR<br />
                LOCAL TRADITIONS
              </h2>
              
              <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed max-w-md mb-12">
                Travel through the region at the time of a local feast and you may encounter customs that have gathered meaning over centuries. From the rhythmic coffee ceremonies to the evening fires, these shared moments connect us to the roots of the land.
              </p>
              
              <a href="/culture" className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase border-b border-[#14150F]/30 pb-1 hover:border-[#14150F] transition-colors inline-block mb-16">
                READ MORE
              </a>

              {/* The Nested Floating Magazine Image */}
              <div 
                ref={img3WrapRef}
                className="relative w-full max-w-[320px] md:max-w-md aspect-[4/3] overflow-hidden rounded-lg shadow-[0_20px_40px_rgba(20,21,15,0.15)]"
              >
                <Image 
                  ref={img3Ref}
                  src="/media/l4.png" 
                  alt="Gathering at dusk" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>

            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}