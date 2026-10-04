"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const scrollCueRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [soundLabel, setSoundLabel] = useState("Sound off");

  useEffect(() => {
    gsap.fromTo(videoRef.current, 
      { scale: 1.15 }, 
      { scale: 1, duration: 2.4, ease: "power3.out", delay: 1.2 }
    );

    const cueTl = gsap.timeline({ repeat: -1 });
    cueTl.fromTo(scrollCueRef.current, 
      { scaleY: 0, transformOrigin: "top" }, 
      { scaleY: 1, duration: 1, ease: "power3.inOut" }
    ).to(scrollCueRef.current, 
      { scaleY: 0, transformOrigin: "bottom", duration: 1, ease: "power3.inOut" }
    );

    return () => {
      gsap.killTweensOf(videoRef.current);
      cueTl.kill();
    };
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    gsap.to(".sound-label", {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        setSoundLabel(nextMuted ? "Sound off" : "Sound on");
        gsap.fromTo(".sound-label", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
      }
    });

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  return (
    // FIX: Changed h-screen to strict h-[100vh] to prevent address-bar resize glitches
    <section ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-foreground">
      <div className="absolute inset-0 w-full h-full transform-gpu">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/media/l1.PNG"
          className="w-full h-full object-cover opacity-90"
        >
          <source src="/media/babugayahero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#14150F]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      <button 
        onClick={toggleSound}
        className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-10 flex items-center gap-3 text-[#F4F0E8] hover:opacity-70 transition-opacity font-sans text-[11px] uppercase tracking-widest"
      >
        <div className="w-8 h-[1px] bg-[#F4F0E8]" />
        <span className="sound-label overflow-hidden block">{soundLabel}</span>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#F4F0E8] z-10">
        <div className="h-12 w-[1px] bg-[#F4F0E8]/20 overflow-hidden">
          <div ref={scrollCueRef} className="w-full h-full bg-[#F4F0E8]" />
        </div>
      </div>
    </section>
  );
}