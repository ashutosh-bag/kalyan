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
    image: '/images/casa-noir/lighting-plant.jpg',
    href: '#spatial-showcase',
  },
  {
    id: 'textiles',
    name: 'Textiles',
    image: '/images/casa-noir/neutral-decor.jpg',
    href: '#packages',
  },
  {
    id: 'decor',
    name: 'Decor',
    image: '/images/casa-noir/decor-pampas.jpg',
    href: '#projects',
  },
  {
    id: 'atmosphere',
    name: 'Atmosphere',
    image: '/images/casa-noir/floating-shelf.jpg',
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
    image: '/images/casa-noir/decor-pampas.jpg',
  },
  {
    id: 2,
    season: 'Signature',
    title: 'Turnkey 3 BHK Flat',
    status: 'Bespoke joinery & lighting',
    image: '/images/casa-noir/floating-shelf.jpg',
  },
  {
    id: 3,
    season: 'Bespoke',
    title: 'Minimalist Duplex',
    status: '45-Day handover guarantee',
    image: '/images/casa-noir/urban-wood.jpg',
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
      className="relative w-full bg-[#FAF8F5] pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ===================================================================== */}
        {/* 1. HERO MAIN ROW: EDITORIAL TYPOGRAPHY & FLOATING BENTO SHOWCASE     */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center mb-10 sm:mb-14">
          
          {/* Left Column: Bold Architectural Headline, CTAs & Social Proof */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Tagline with subtle hairline */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                A HOME THAT FEELS LIKE YOU
              </span>
            </div>

            {/* Massive Bold Grotesque Sans Headline (Ditto 3 lines with periods) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[70px] font-black font-sans text-[#1A1815] uppercase tracking-[-0.03em] leading-[0.98] mb-5">
              DESIGN.<br />
              WARMTH.<br />
              A BETTER HOME.
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-[#68625A] font-normal leading-relaxed max-w-md mb-8">
              Curated home essentials that bring comfort, style and calm to your everyday life.
            </p>

            {/* Action Buttons: Solid Terracotta Pill + White Outline Pill */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-medium text-sm sm:text-base shadow-sm transition-all hover:gap-3 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#1A1815] border border-[#1A1815]/15 font-medium text-sm sm:text-base shadow-xs transition-all cursor-pointer"
              >
                <span>Our Story</span>
              </a>
            </div>

            {/* Social Proof: 4 Overlapping Avatars + 10K+ Happy Customers */}
            <div className="flex items-center gap-3.5">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  src="/images/kalyan/testimonials/client1.jpg" 
                  alt="Customer" 
                  className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client2.jpg" 
                  alt="Customer" 
                  className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client3.jpg" 
                  alt="Customer" 
                  className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover" 
                />
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFEAE2] ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-[#1A1815]">
                  +350
                </div>
              </div>

              <div>
                <span className="block text-sm sm:text-base font-bold text-[#1A1815] leading-tight">
                  10K+
                </span>
                <span className="text-xs text-[#7A7369] font-medium block">
                  Happy Customers
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Centerpiece Visual + 2 Floating White Bento Cards */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end pt-4 lg:pt-0">
            
            {/* Centerpiece Image Container */}
            <div className="relative w-full max-w-[480px] xl:max-w-[530px] aspect-[4/4.8] sm:aspect-[4/4.5] rounded-[32px] sm:rounded-[38px] overflow-hidden shadow-[0_20px_50px_rgba(26,24,21,0.12)] border-2 border-white bg-white">
              <img
                src="/images/casa-noir/cozy-living.jpg"
                alt="Organic Warm Interior Centerpiece"
                className="w-full h-full object-cover object-center"
              />

              {/* Soft Warm Radial Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Right Season & Collection Card */}
            <div className="absolute -top-3 sm:top-4 right-0 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-[#1A1815]/8 w-52 sm:w-60 z-20 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#1A1815]/10 flex-shrink-0">
                  <img 
                    src={currentSeason.image} 
                    alt={currentSeason.title} 
                    className="w-full h-full object-cover transition-all duration-300" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7369] block font-medium">
                    {currentSeason.season}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1A1815] block truncate">
                    {currentSeason.title}
                  </span>
                  <span className="text-[10px] text-[#9C5427] font-medium block truncate">
                    {currentSeason.status}
                  </span>
                </div>
              </div>

              {/* Pagination Arrows */}
              <div className="flex items-center justify-end gap-1.5 mt-3 pt-2 border-t border-[#1A1815]/8">
                <button 
                  type="button" 
                  onClick={prevSeason}
                  aria-label="Previous item" 
                  className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE2] flex items-center justify-center text-[#1A1815] transition-colors border border-[#1A1815]/10 text-xs cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button 
                  type="button" 
                  onClick={nextSeason}
                  aria-label="Next item" 
                  className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE2] flex items-center justify-center text-[#1A1815] transition-colors border border-[#1A1815]/10 text-xs cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Card 2: Bottom Right Shipping & Payment Trust Badges */}
            <div className="absolute bottom-4 sm:bottom-10 right-0 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.1)] border border-[#1A1815]/8 w-56 sm:w-64 z-20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#1A1815]">Free Shipping</span>
                  <span className="block text-[11px] text-[#7A7369]">on orders over $50</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#1A1815]">Secure Payment</span>
                  <span className="block text-[11px] text-[#7A7369]">100% protected</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* 2. SUB-HERO CATEGORY ROW: 4 CLEAN ROUNDED CARDS IN WHITE CONTAINER    */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 lg:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-[#1A1815]/5 mb-10 sm:mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={cat.href}
                className="group relative rounded-2xl bg-[#FAF8F5] p-3 sm:p-4 flex flex-col justify-between hover:bg-[#F5F0E8] transition-all duration-300 cursor-pointer"
              >
                {/* Category Image Area */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 flex items-center justify-center bg-white/70">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Bottom Row: Category Name & Signature Arrow Pill */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-sm sm:text-base text-[#1A1815]">
                    {cat.name}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white group-hover:bg-[#9C5427] group-hover:text-white flex items-center justify-center text-[#1A1815] transition-all shadow-xs text-xs">
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
        <div className="rounded-[30px] sm:rounded-[38px] overflow-hidden bg-[#221C18] text-white p-6 sm:p-10 lg:p-12 relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-between z-10 space-y-6 sm:space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C49B7E] font-semibold block mb-2">
                  {currentFeatured.tag}
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans text-white tracking-tight uppercase leading-tight mb-3">
                  {currentFeatured.title}
                </h2>
                
                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-sm">
                  {currentFeatured.subtitle}
                </p>
              </div>

              {/* White Pill Button */}
              <div>
                <a
                  href={currentFeatured.ctaHref}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#1A1815] font-semibold text-sm sm:text-base shadow-md transition-all cursor-pointer"
                >
                  <span>{currentFeatured.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Pagination Circular Arrow Controls */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={prevFeatured}
                  aria-label="Previous Slide"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#9C5427] text-white flex items-center justify-center hover:bg-[#85451D] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextFeatured}
                  aria-label="Next Slide"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#1A1815] flex items-center justify-center hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Right Cinematic Interior Image */}
            <div className="lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-xl bg-neutral-900">
              <img
                src={currentFeatured.image}
                alt={currentFeatured.title}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              
              {/* Subtle Gradient Fade from dark espresso left side */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#221C18]/60 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
