"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const collections = [
  { id: 'I', title: 'The Canopy', type: 'Architecture', img: '/media/l1.png', aspect: 'aspect-[3/4]', align: 'items-start' },
  { id: 'II', title: 'Raw Earth', type: 'Materials', img: '/media/l8.PNG', aspect: 'aspect-[16/9]', align: 'items-end' },
  { id: 'III', title: 'Evening Rituals', type: 'Experience', img: '/media/l10.png', aspect: 'aspect-[4/5]', align: 'items-center' },
  { id: 'IV', title: 'Untamed', type: 'Landscape', img: '/media/l11.png', aspect: 'aspect-[21/9]', align: 'items-start' },
  { id: 'V', title: 'Sanctuary', type: 'Interiors', img: '/media/l4.png', aspect: 'aspect-[3/4]', align: 'items-end' },
  { id: 'VI', title: 'The Cellar', type: 'Gastronomy', img: '/media/l9.png', aspect: 'aspect-[4/3]', align: 'items-center' },
];

export default function CollectionsMosaic() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // Calculate the total distance the track needs to move horizontally
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const moveDistance = trackWidth - windowWidth;

      // 1. Horizontal Scroll Animation
      gsap.to(trackRef.current, {
        x: -moveDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${moveDistance}`, // The scroll distance matches the horizontal width for a 1:1 feel
          pin: true,
          scrub: 1, // Silky smooth scrubbing
          invalidateOnRefresh: true, // Recalculates on window resize
        }
      });

      // 2. Inner Image Parallax (Moves opposite to the horizontal scroll)
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img,
          { xPercent: -15, scale: 1.1 },
          {
            xPercent: 15,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${moveDistance}`,
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
      // The Signature Overlap: Dark Olive BG, z-[80] to sit above FeaturedStory, and negative top margin
      className="relative w-full bg-[#14150F] text-[#F4F0E8] rounded-[40px] md:rounded-[80px] z-[80] -mt-[15vh] md:-mt-[20vh] shadow-[0_-30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      
      {/* Sticky Container (Locks the screen while the track moves horizontally inside it) */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Absolute Top Header */}
        <div className="absolute top-12 md:top-24 left-0 w-full px-6 md:px-12 flex justify-between items-start z-20 pointer-events-none">
          <div>
            <div className="w-1.5 h-1.5 bg-[#FF6B00] mb-4 ml-1" />
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight">
              Collections
            </h2>
          </div>
          <div className="text-right flex items-center gap-4">
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest opacity-60">Scroll to explore</span>
            <div className="w-12 h-[1px] bg-[#F4F0E8]/40 overflow-hidden relative">
               {/* Animated line to imply scrolling */}
               <div className="absolute top-0 left-0 w-full h-full bg-[#F4F0E8] animate-[slideRight_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* The Horizontal Track */}
        <div 
          ref={trackRef} 
          className="flex gap-12 md:gap-32 px-6 md:px-[20vw] h-[60vh] items-center w-max"
        >
          {collections.map((item, index) => (
            <div 
              key={index} 
              // Alternating alignment creates a staggered "mosaic" wave instead of a boring straight line
              className={`relative flex flex-col justify-center h-full ${item.align} group`}
              style={{ width: index % 2 === 0 ? '45vw' : '65vw' }} // Varies the widths dramatically
            >
              
              {/* Image Container */}
              <div className={`relative w-full ${item.aspect} overflow-hidden rounded-xl md:rounded-2xl shadow-2xl`}>
                <Image 
                  ref={el => imagesRef.current[index] = el}
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-[#14150F]/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Typography below image */}
              <div className="absolute -bottom-16 md:-bottom-24 left-0 w-full flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div>
                  <span className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#FF6B00] mb-2">
                    Collection {item.id} — {item.type}
                  </span>
                  <h3 className="font-serif text-4xl md:text-5xl font-light text-[#F4F0E8]">
                    {item.title}
                  </h3>
                </div>
                <div className="hidden md:block">
                   <a href="#" className="w-12 h-12 rounded-full border border-[#F4F0E8]/30 flex items-center justify-center hover:bg-[#F4F0E8] hover:text-[#14150F] transition-colors">
                     +
                   </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Massive Background Text (Sits behind the track) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-[-1] opacity-[0.03] pointer-events-none">
          <h2 className="font-serif text-[30vw] leading-none font-light tracking-tighter whitespace-nowrap">
            CURATED
          </h2>
        </div>

      </div>
    </section>
  );
}