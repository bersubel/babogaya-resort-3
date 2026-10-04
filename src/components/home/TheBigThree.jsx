"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

const slidesData = [
  {
    label: "01. The Estate",
    title: ["Sanctuary in", "the Wild"],
    desc: "A millennium-old castle transformed into a private haven.",
    img: "/media/l1.png",
    btn: "Discover Stay"
  },
  {
    label: "02. Design",
    title: ["Architectural", "Purity"],
    desc: "Restored with profound respect for history and craft.",
    img: "/media/l13.png",
    btn: "Explore Architecture"
  },
  {
    label: "03. Collections",
    title: ["Crafted for", "Generations"],
    desc: "Bespoke pieces born from the land itself.",
    img: "/media/l11.png",
    btn: "View Collections"
  }
];

export default function TheBigThree() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const textRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      // 1. The Entrance Animation (Fires as you scroll into the section)
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Starts just as it enters the viewport
          end: "top top",   // Ends exactly when it pins to the top
          scrub: 1,
        }
      });

      // Expand the rounded card into a full-screen image
      entryTl.fromTo(slidesRef.current[0],
        { clipPath: "inset(15% 10% 15% 10% round 32px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }
      )
      // Scale the image down from a zoom
      .fromTo(slidesRef.current[0].querySelector('.img-container'),
        { scale: 1.3 },
        { scale: 1, ease: "none" },
        "<"
      )
      // Fade and slide the text up smoothly
      .fromTo(textRef.current[0],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, ease: "none" },
        "<0.2"
      );


      // 2. The Slideshow Transition (Fires while pinned)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 1, 
          onUpdate: (self) => {
            let progress = self.progress;
            if (progress < 0.33) setActiveIndex(0);
            else if (progress >= 0.33 && progress < 0.66) setActiveIndex(1);
            else setActiveIndex(2);
          }
        }
      });

      slidesData.forEach((_, i) => {
        if (i === 0) return;
        const prevSlide = slidesRef.current[i - 1];
        const currentSlide = slidesRef.current[i];
        const prevText = textRef.current[i - 1];
        const currentText = textRef.current[i];

        tl.addLabel(`slide${i}`)
          .to(prevSlide.querySelector('.img-container'), { scale: 1.12, ease: "none" }, `slide${i}`)
          .to(prevSlide.querySelector('.overlay'), { opacity: 0.4, ease: "none" }, `slide${i}`)
          .to(prevText.querySelectorAll('.text-line'), { yPercent: -110, stagger: 0.05, ease: "none" }, `slide${i}`)
          .to(prevText, { opacity: 0, ease: "none", duration: 0.2 }, `slide${i}+=0.3`)
          // The angled wiper blade for subsequent slides
          .fromTo(currentSlide, 
            { clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, 0% 100%)" }, 
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" }, 
            `slide${i}`
          )
          .fromTo(currentSlide.querySelector('.img-container'), { scale: 1.25 }, { scale: 1, ease: "none" }, `slide${i}`)
          .fromTo(currentText.querySelectorAll('.text-line'), { yPercent: 110 }, { yPercent: 0, stagger: 0.05, ease: "none" }, `slide${i}`)
          .fromTo(currentText, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.2 }, `slide${i}`);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleModal = (e) => {
    const isOpening = !modalOpen;
    if (isOpening) {
      setModalOpen(true);
      const rect = e.target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      gsap.fromTo(modalRef.current,
        { clipPath: `circle(0% at ${x}px ${y}px)` },
        { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 1, ease: "power3.inOut" }
      );
    } else {
      gsap.to(modalRef.current, {
        clipPath: `circle(0% at 50% 50%)`, duration: 0.8, ease: "power3.inOut",
        onComplete: () => setModalOpen(false)
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-foreground">
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden text-[#F4F0E8]">
        {slidesData.map((slide, i) => (
          <div 
            key={i} 
            ref={el => slidesRef.current[i] = el} 
            className="absolute inset-0 w-full h-full overflow-hidden z-0" 
            style={{ 
              zIndex: i, 
              // Initial card shape for slide 0, wiper shape for others
              clipPath: i === 0 ? 'inset(15% 10% 15% 10% round 32px)' : 'polygon(0% 0%, 0% 0%, -20% 100%, 0% 100%)' 
            }}
          >
            <div className="img-container w-full h-full relative origin-center">
              <div className="absolute inset-0 bg-[#2A2B26]" />
              <Image 
                src={slide.img} 
                alt={slide.title.join(" ")} 
                fill 
                sizes="100vw"
                priority={i === 0}
                className="object-cover" 
              />
              <div className="overlay absolute inset-0 bg-[#14150F] opacity-0" />
            </div>

            <div 
              ref={el => textRef.current[i] = el} 
              className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-24 z-10 pointer-events-none"
              style={{ opacity: i === 0 ? 0 : 1 }} // Hide text initially so it can fade in
            >
              <div className="max-w-2xl">
                <div className="overflow-hidden mb-6">
                  <span className="text-line block font-sans text-[11px] uppercase tracking-widest">{slide.label}</span>
                </div>
                <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] font-light mb-8">
                  {slide.title.map((line, idx) => (
                    <div key={idx} className="overflow-hidden py-1"><span className="text-line block">{line}</span></div>
                  ))}
                </h2>
                <div className="overflow-hidden mb-12">
                  <p className="text-line block font-sans text-sm md:text-base opacity-80">{slide.desc}</p>
                </div>
                <div className="flex gap-6 pointer-events-auto">
                  <button className="px-6 py-3 border border-[#F4F0E8]/30 rounded-full text-xs uppercase tracking-widest hover:bg-[#F4F0E8] hover:text-foreground transition-colors duration-400">{slide.btn}</button>
                  {i === 0 && (
                    <button onClick={toggleModal} className="px-6 py-3 border border-[#F4F0E8]/30 rounded-full text-xs uppercase tracking-widest hover:border-[#F4F0E8] transition-colors duration-400 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#F4F0E8]" /> View Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 font-sans text-[10px] tracking-widest">
          {slidesData.map((_, i) => (
            <span key={i} className={`transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}>0{i + 1}</span>
          ))}
        </div>
      </div>

      <div 
        ref={modalRef} 
        className="fixed inset-0 z-50 bg-[#14150F] flex items-center justify-center text-[#F4F0E8]" 
        style={{ pointerEvents: modalOpen ? 'auto' : 'none', clipPath: 'circle(0% at 50% 50%)' }}
      >
        <button onClick={toggleModal} className="absolute top-8 right-12 text-sm uppercase tracking-widest z-10">Close</button>
        {modalOpen && (
          <div className="w-full h-full p-4 md:p-24">
             <div className="w-full h-full bg-[#2A2B26] flex items-center justify-center font-serif text-3xl">
                [Video Player Embed]
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
