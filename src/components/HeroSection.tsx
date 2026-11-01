'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';

// Background slides requested by the user: herobg1.png and herobg2.png
const HERO_BACKGROUNDS = [
  {
    id: 'slide-1',
    image: '/images/hero/herobg1.png',
    title: 'Master Architectural Suite',
    location: 'Patia Villa, Bhubaneswar',
  },
  {
    id: 'slide-2',
    image: '/images/hero/herobg2.png',
    title: 'Bespoke Scandinavian Living',
    location: 'Chandrasekharpur Duplex, Cuttack',
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance backgrounds smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_BACKGROUNDS.length) % HERO_BACKGROUNDS.length);
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* FULL-VIEWPORT CINEMATIC HERO (EXACT DITTO REFERENCE STYLE)             */}
      {/* ===================================================================== */}
      <section 
        id="home" 
        className="relative w-full min-h-[100svh] flex flex-col justify-between select-none overflow-hidden bg-[#1A1815] text-white"
      >
        {/* =================================================================== */}
        {/* 1. SMOOTH CROSSFADING BACKGROUND IMAGES (herobg1.png & herobg2.png) */}
        {/* =================================================================== */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {HERO_BACKGROUNDS.map((bg, idx) => {
            const isActive = activeSlide === idx;
            return (
              <div
                key={bg.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={bg.image}
                  alt={bg.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}

          {/* Minimal Gentle Vignettes ONLY at Top & Bottom edges: ZERO Center Tint */}
          {/* Top Edge Vignette: Ensures navbar links are readable without darkening the room */}
          <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-black/50 via-black/15 to-transparent z-10 pointer-events-none" />
          
          {/* Bottom Edge Vignette: Soft anchor for the bottom text */}
          <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-black/60 via-black/15 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Top Spacer to balance the bottom bar height and allow precise centering */}
        <div className="relative z-10 h-16 sm:h-20 w-full pointer-events-none" aria-hidden="true" />

        {/* =================================================================== */}
        {/* 2. MAIN EDITORIAL CONTENT: STAGGERED HEADLINES SLIGHTLY DOWN IN DEAD CENTER */}
        {/* =================================================================== */}
        <div className="relative z-20 my-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center translate-y-3 sm:translate-y-5 md:translate-y-6 py-2 sm:py-4">
          
          {/* Top Line 1: INSPIRED SPACES (Left Aligned) */}
          <div className="w-full">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-black font-sans text-white uppercase tracking-[-0.03em] leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              INSPIRED SPACES
            </h1>
          </div>

          {/* Stepped Line 2: ELEVATED LIVING (Offset to the Right) */}
          <div className="w-full flex justify-end mt-1.5 sm:mt-2.5 md:mt-3">
            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-black font-sans text-white uppercase tracking-[-0.03em] leading-[0.92] text-right drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              ELEVATED LIVING
            </h2>
          </div>

          {/* Subtitle Description on the Left beneath Line 1 + CTA Buttons */}
          <div className="mt-5 sm:mt-7 md:mt-8 max-w-md lg:max-w-lg flex flex-col items-start">
            <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              We design refined interiors that blend comfort and style, creating spaces that feel inviting and functional while reflecting your personality with thoughtful details and timeless elegance.
            </p>

            {/* Quick Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(156,84,39,0.45)] transition-all hover:gap-3 cursor-pointer"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md shadow-md transition-all cursor-pointer"
              >
                <span>Our Services</span>
              </a>
            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* 3. BOTTOM 3 ARCHITECTURAL HIGHLIGHTS & DISCREET SLIDE SWITCHER      */}
        {/* =================================================================== */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 sm:pb-9 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            {/* 3 Highlights matching reference bottom */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 text-white flex-1">
              {/* Highlight 1 */}
              <div className="flex items-center gap-2.5 group">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#C49B7E] drop-shadow-sm">01</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Functional Space Planning
                </span>
              </div>

              {/* Highlight 2 */}
              <div className="flex items-center gap-2.5 group">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#C49B7E] drop-shadow-sm">02</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Stylish Material Selection
                </span>
              </div>

              {/* Highlight 3 */}
              <div className="flex items-center gap-2.5 group">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-[#C49B7E] drop-shadow-sm">03</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Tailored Design Concepts
                </span>
              </div>
            </div>

            {/* Discreet Slide Switcher Controls (Bottom Right - Completely clear of the central room view) */}
            <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 self-start sm:self-auto shadow-md">
              <span className="text-[11px] font-mono font-bold text-white tracking-widest">
                0{activeSlide + 1} / 0{HERO_BACKGROUNDS.length}
              </span>
              <div className="w-6 h-[1.5px] bg-white/30 relative overflow-hidden rounded-full">
                <div 
                  className="absolute inset-y-0 left-0 bg-[#9C5427] transition-all duration-500 rounded-full"
                  style={{ width: `${((activeSlide + 1) / HERO_BACKGROUNDS.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}