"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Preloader from '../components/layout/Preloader';
import CustomCursor from '../components/layout/CustomCursor';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import Hero from '../components/home/Hero';
import TheBigThree from '../components/home/TheBigThree';
import DNA from '../components/home/DNA';
import TheLand from '../components/home/TheLand';
import EatAndDrink from '../components/home/EatAndDrink';
import OwnAHouse from '../components/home/OwnAHouse';
import Journey from '../components/home/Journey';
import FeaturedStory from '../components/home/FeaturedStory';
import CollectionsMosaic from '../components/home/CollectionsMosaic';
import WhatsOn from '../components/home/WhatsOn';

export default function Home() {
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // This forces GSAP to recalculate all trigger positions 
    // safely after the preloader finishes its animation.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2500); 

    // Secondary safety net: Refresh when all images physically finish loading
    window.addEventListener('load', () => ScrollTrigger.refresh());

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen">
      <Preloader />
      <CustomCursor />
      <Header />
      
      {/* The strict narrative and z-index flow */}
      <Hero />
      <TheBigThree />
      <DNA />
      <TheLand />
      <EatAndDrink />
      <OwnAHouse />

      <FeaturedStory />
      <CollectionsMosaic />
      <WhatsOn />
      <Journey />
      <Footer />
    </main>
  );
}