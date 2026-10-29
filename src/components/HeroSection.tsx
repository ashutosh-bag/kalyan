'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'lighting',
    name: 'Lighting',
    image: '/images/hero/lighting.jpg',
    href: '#spatial-showcase',
  },
  {
    id: 'textiles',
    name: 'Textiles',
    image: '/images/hero/textiles.jpg',
    href: '#packages',
  },
  {
    id: 'decor',
    name: 'Decor',
    image: '/images/hero/decor.jpg',
    href: '#projects',
  },
  {
    id: 'atmosphere',
    name: 'Atmosphere',
    image: '/images/hero/atmosphere.jpg',
    href: '#about',
  },
];

const FEATURED_SLIDES = [
  {
    id: 'cozy-autumn',
    tag: 'Featured Collection',
    title: 'COZY AUTUMN',
    subtitle: 'Candles, ceramics and textiles for warmer, calmer evenings.',
    image: '/images/casa-noir/cozy-living.jpg',
    ctaText: 'Explore Collection',
    ctaHref: '#packages',
  },
  {
    id: 'casa-noir',
    tag: 'Signature Living',
    title: 'CASA NOIR',
    subtitle: 'Bespoke joinery, circadian lighting and organic textures for modern living.',
    image: '/images/casa-noir/hero-living.jpg',
    ctaText: 'View Interior Tour',
    ctaHref: '#spatial-showcase',
  },
  {
    id: 'master-suite',
    tag: 'Turnkey Suite',
    title: 'SERENE HAVEN',
    subtitle: 'Acoustic fluted oak panels, linen textures and tailored illumination.',
    image: '/images/casa-noir/bedroom.jpg',
    ctaText: 'Explore Packages',
    ctaHref: '#packages',
  },
];

const SEASON_ITEMS = [
  {
    id: 1,
    season: 'Season',
    title: 'Autumn Collection',
    status: 'New collection now on site',
    image: '/images/hero/sofa.png',
  },
  {
    id: 2,
    season: 'Signature',
    title: 'Turnkey 3 BHK Flat',
    status: 'Bespoke joinery & lighting',
    image: '/images/hero/decor.jpg',
  },
  {
    id: 3,
    season: 'Bespoke',
    title: 'Minimalist Duplex',
    status: '45-Day handover guarantee',
    image: '/images/hero/textiles.jpg',
  },
];

export default function HeroSection() {
  const [activeSeasonIdx, setActiveSeasonIdx] = useState(0);
  const [activeFeaturedIdx, setActiveFeaturedIdx] = useState(0);

  const nextSeason = () => {
    setActiveSeasonIdx((prev) => (prev + 1) % SEASON_ITEMS.length);
  };

  const prevSeason = () => {
    setActiveSeasonIdx((prev) => (prev - 1 + SEASON_ITEMS.length) % SEASON_ITEMS.length);
  };

  const nextFeatured = () => {
    setActiveFeaturedIdx((prev) => (prev + 1) % FEATURED_SLIDES.length);
  };

  const prevFeatured = () => {
    setActiveFeaturedIdx((prev) => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
  };

  const currentSeason = SEASON_ITEMS[activeSeasonIdx];
  const currentFeatured = FEATURED_SLIDES[activeFeaturedIdx];

  return (
    <section 
      id="home" 
      className="relative w-full bg-[#FAF8F5] pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24 px-3.5 sm:px-6 lg:px-8 select-none overflow-x-clip"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto">
        
        {/* ===================================================================== */}
        {/* 1. HERO MAIN ROW: EDITORIAL TYPOGRAPHY & FLOATING BENTO SHOWCASE     */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center mb-12 sm:mb-16">
          
          {/* Left Column: Bold Architectural Headline, CTAs & Social Proof */}
          <div className="md:col-span-5 flex flex-col justify-center text-center md:text-left items-center md:items-start pr-0 md:pr-2 lg:pr-4 z-10">
            
            {/* Tagline with subtle hairline */}
            <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                A HOME THAT FEELS LIKE YOU
              </span>
            </div>

            {/* Massive Bold Grotesque Sans Headline (Ditto 3 lines with periods) */}
            <h1 className="text-[32px] xs:text-4xl sm:text-5xl md:text-[40px] lg:text-[50px] xl:text-[60px] font-black font-sans text-[#1A1815] uppercase tracking-[-0.03em] leading-[1.02] sm:leading-[0.98] mb-3.5 sm:mb-4">
              DESIGN.<br />
              WARMTH.<br />
              A BETTER HOME.
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#68625A] font-normal leading-relaxed max-w-md mb-6">
              Curated home essentials that bring comfort, style and calm to your everyday life.
            </p>

            {/* Action Buttons: Solid Terracotta Pill + White Outline Pill */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 mb-7 sm:mb-8 w-full sm:w-auto">
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-medium text-xs sm:text-sm md:text-base shadow-sm transition-all hover:gap-3 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#1A1815] border border-[#1A1815]/15 font-medium text-xs sm:text-sm md:text-base shadow-xs transition-all cursor-pointer"
              >
                <span>Our Story</span>
              </a>
            </div>

            {/* Social Proof: 4 Overlapping Avatars + 10K+ Happy Customers */}
            <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-3.5">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  src="/images/kalyan/testimonials/client1.jpg" 
                  alt="Customer" 
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client2.jpg" 
                  alt="Customer" 
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client3.jpg" 
                  alt="Customer" 
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EFEAE2] ring-2 ring-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-[#1A1815]">
                  +350
                </div>
              </div>

              <div className="text-left">
                <span className="block text-xs sm:text-sm md:text-base font-bold text-[#1A1815] leading-tight">
                  10K+
                </span>
                <span className="text-[10px] sm:text-xs text-[#7A7369] font-medium block">
                  Happy Customers
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Much Bigger Sofa Visual + Unobstructed Corner Bento Badges */}
          <div className="md:col-span-7 relative flex items-center justify-center pt-8 pb-8 md:py-10 min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] xl:min-h-[600px]">
            
            {/* Grand, Large Transparent Sofa Merged with Background - Completely Unobstructed */}
            <div className="relative w-full max-w-[540px] sm:max-w-[640px] md:max-w-[620px] lg:max-w-[760px] xl:max-w-[850px] flex items-center justify-center pointer-events-none select-none my-6 sm:my-8">
              <img
                src="/images/hero/sofa.png"
                alt="Curated Living Interior Sofa"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(26,24,21,0.14)] scale-105 sm:scale-115 lg:scale-125 xl:scale-130 transition-transform duration-700"
              />
            </div>

            {/* Floating Card 1: Top Right Corner - Moved Up & Away from Sofa Body */}
            <div className="absolute top-0 sm:-top-2 lg:top-1 right-0 sm:right-1 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_32px_rgba(26,24,21,0.08)] border border-[#1A1815]/8 w-40 xs:w-44 sm:w-48 lg:w-52 z-20 transition-all pointer-events-auto">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#1A1815]/10 flex-shrink-0">
                  <img 
                    src={currentSeason.image} 
                    alt={currentSeason.title} 
                    className="w-full h-full object-cover transition-all duration-300" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#7A7369] block font-medium">
                    {currentSeason.season}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-[#1A1815] block truncate">
                    {currentSeason.title}
                  </span>
                  <span className="text-[9px] text-[#9C5427] font-medium block truncate">
                    {currentSeason.status}
                  </span>
                </div>
              </div>

              {/* Pagination Arrows */}
              <div className="flex items-center justify-end gap-1.5 mt-1.5 sm:mt-2 pt-1 border-t border-[#1A1815]/8">
                <button 
                  type="button" 
                  onClick={prevSeason}
                  aria-label="Previous item" 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE2] flex items-center justify-center text-[#1A1815] transition-colors border border-[#1A1815]/10 text-xs cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button 
                  type="button" 
                  onClick={nextSeason}
                  aria-label="Next item" 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE2] flex items-center justify-center text-[#1A1815] transition-colors border border-[#1A1815]/10 text-xs cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Floating Card 2: Bottom Right Corner - Moved Down & Away from Sofa Body */}
            <div className="absolute bottom-0 sm:-bottom-2 lg:bottom-1 right-0 sm:right-1 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_32px_rgba(26,24,21,0.08)] border border-[#1A1815]/8 w-44 xs:w-48 sm:w-52 lg:w-56 z-20 space-y-1.5 pointer-events-auto">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-bold text-[#1A1815]">Free Shipping</span>
                  <span className="block text-[8px] sm:text-[10px] text-[#7A7369]">on orders over ₹4,999</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-bold text-[#1A1815]">Secure Payment</span>
                  <span className="block text-[8px] sm:text-[10px] text-[#7A7369]">100% protected</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* 2. SUB-HERO CATEGORY ROW: 4 CLEAN ROUNDED CARDS IN WHITE CONTAINER    */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-3 sm:p-5 lg:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-[#1A1815]/5 mb-10 sm:mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.href}
                className="group relative rounded-xl sm:rounded-2xl bg-[#FAF8F5] p-2.5 sm:p-3.5 lg:p-4 flex flex-col justify-between hover:bg-[#F5F0E8] transition-all duration-300 cursor-pointer"
              >
                {/* Category Image Area */}
                <div className="w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 flex items-center justify-center bg-white/70">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Bottom Row: Category Name & Signature Arrow Pill */}
                <div className="flex items-center justify-between pt-0.5 sm:pt-1 gap-1">
                  <span className="font-bold text-xs sm:text-sm lg:text-base text-[#1A1815] truncate">
                    {cat.name}
                  </span>
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white group-hover:bg-[#9C5427] group-hover:text-white flex items-center justify-center text-[#1A1815] transition-all shadow-xs text-xs flex-shrink-0">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. FEATURED COLLECTION BENTO BANNER (DARK ESPRESSO ROUNDED CONTAINER) */}
        {/* ===================================================================== */}
        <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[38px] overflow-hidden bg-[#221C18] text-white p-5 sm:p-8 lg:p-12 relative shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="md:col-span-5 flex flex-col justify-between z-10 space-y-4 sm:space-y-6 lg:space-y-8">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C49B7E] font-semibold block mb-1.5 sm:mb-2">
                  {currentFeatured.tag}
                </span>
                
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-sans text-white tracking-tight uppercase leading-tight mb-2 sm:mb-3">
                  {currentFeatured.title}
                </h2>
                
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-sm">
                  {currentFeatured.subtitle}
                </p>
              </div>

              {/* White Pill Button */}
              <div>
                <a
                  href={currentFeatured.ctaHref}
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#1A1815] font-semibold text-xs sm:text-sm md:text-base shadow-md transition-all cursor-pointer"
                >
                  <span>{currentFeatured.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Pagination Circular Arrow Controls */}
              <div className="flex items-center gap-2 sm:gap-2.5 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={prevFeatured}
                  aria-label="Previous Slide"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9C5427] text-white flex items-center justify-center hover:bg-[#85451D] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextFeatured}
                  aria-label="Next Slide"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#1A1815] flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Right Cinematic Interior Image */}
            <div className="md:col-span-7 relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-xl bg-neutral-900">
              <img
                src={currentFeatured.image}
                alt={currentFeatured.title}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              
              {/* Subtle Gradient Fade from dark espresso left side */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#221C18]/60 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
