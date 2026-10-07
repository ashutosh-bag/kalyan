'use client';

import React, { useState } from 'react';
import { Play, Pause, RefreshCw, SlidersHorizontal, ArrowDown } from 'lucide-react';
import { HERO_LETTER_IMAGES } from '@/lib/data';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isReversed, setIsReversed] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<'K' | 'Y' | 'N' | null>(null);

  // Dynamic animation pace
  const getDuration = (base: number) => {
    if (speed === 'slow') return `${base * 1.5}s`;
    if (speed === 'fast') return `${base * 0.65}s`;
    return `${base}s`;
  };

  const durK = getDuration(30);
  const durY = getDuration(34);
  const durN = getDuration(38);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] max-h-screen bg-[#07080a] overflow-hidden select-none p-2 sm:p-3 md:p-4"
      aria-label="KYN Interior Architecture Odisha"
    >
      {/* ========================================================================= */}
      {/* OUTER CORNER MARGINS & SLIM ARCHITECTURAL BLUEPRINT FRAME                 */}
      {/* ========================================================================= */}
      <div className="relative w-full h-full border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between p-2 sm:p-4">
        
        {/* Corner registration marks */}
        <div className="absolute top-2 left-2 text-[9px] text-white/30 font-mono tracking-widest pointer-events-none">+ 01</div>
        <div className="absolute top-2 right-2 text-[9px] text-white/30 font-mono tracking-widest pointer-events-none">+ 02</div>
        <div className="absolute bottom-2 left-2 text-[9px] text-white/30 font-mono tracking-widest pointer-events-none">+ 03</div>
        <div className="absolute bottom-2 right-2 text-[9px] text-white/30 font-mono tracking-widest pointer-events-none">+ 04</div>

        {/* Ambient lighting glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#c8a47e]/12 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,8,10,0.6)_80%,#07080a_100%)]" />
        </div>

        {/* ======================================================================= */}
        {/* KYN LETTERS: BIGGER, COMPACT, AND FULL COVERAGE                         */}
        {/* ======================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <svg
            viewBox="0 0 1800 880"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-label="KYN letters covering the whole screen bigger and compact with sliding interior design architecture inside"
            role="img"
          >
            <style>{`
              @font-face {
                font-family: 'Modern Cosmo';
                src: url('/fonts/ModernCosmo.ttf') format('truetype');
                font-weight: 100 900;
                font-style: normal;
                font-display: block;
              }
              .kyn-letter-font {
                font-family: 'Modern Cosmo', var(--font-modern-cosmo), 'Geist', sans-serif;
              }
            `}</style>
            <defs>
              {/* Bigger & Compact letter positioning with Modern Cosmo font styling */}
              {/* Letter K: Centered around x=280 */}
              <clipPath id="tight-kyn-k">
                <text
                  x="280"
                  y="780"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1020"
                  letterSpacing="-10"
                >
                  K
                </text>
              </clipPath>

              {/* Letter Y: Centered around x=880 */}
              <clipPath id="tight-kyn-y">
                <text
                  x="880"
                  y="780"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1020"
                  letterSpacing="-10"
                >
                  Y
                </text>
              </clipPath>

              {/* Letter N: Centered around x=1480 */}
              <clipPath id="tight-kyn-n">
                <text
                  x="1480"
                  y="780"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1020"
                  letterSpacing="-10"
                >
                  N
                </text>
              </clipPath>
            </defs>

            {/* =================================================================== */}
            {/* LETTER K (Sliding Vertically UPWARDS)                                */}
            {/* =================================================================== */}
            <g
              clipPath="url(#tight-kyn-k)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('K')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g
                style={{
                  animation: `slideUpContinuous ${durK} linear infinite`,
                  animationDirection: isReversed ? 'reverse' : 'normal',
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* 1st Loop (Patia & Cuttack luxury living rooms) */}
                <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="0" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="440" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="880" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="1320" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                {/* 2nd Seamless Duplicate */}
                <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="1760" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="2200" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="2640" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="3080" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
              </g>
              <rect x="0" y="0" width="620" height="880" fill="rgba(7, 8, 10, 0.08)" />
            </g>

            {/* =================================================================== */}
            {/* LETTER Y (Sliding Vertically DOWNWARDS)                              */}
            {/* =================================================================== */}
            <g
              clipPath="url(#tight-kyn-y)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('Y')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g
                style={{
                  animation: `slideDownContinuous ${durY} linear infinite`,
                  animationDirection: isReversed ? 'reverse' : 'normal',
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* 1st Loop (Calacatta kitchens & courtyard baths) */}
                <image href={HERO_LETTER_IMAGES.Y[0].url} x="580" y="0" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[1].url} x="580" y="440" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[2].url} x="580" y="880" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[3].url} x="580" y="1320" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                {/* 2nd Seamless Duplicate */}
                <image href={HERO_LETTER_IMAGES.Y[0].url} x="580" y="1760" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[1].url} x="580" y="2200" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[2].url} x="580" y="2640" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.Y[3].url} x="580" y="3080" width="620" height="440" preserveAspectRatio="xMidYMid slice" />
              </g>
              <rect x="580" y="0" width="620" height="880" fill="rgba(7, 8, 10, 0.08)" />
            </g>

            {/* =================================================================== */}
            {/* LETTER N (Sliding HORIZONTALLY)                                     */}
            {/* =================================================================== */}
            <g
              clipPath="url(#tight-kyn-n)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('N')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g
                style={{
                  animation: `slideHorizontalContinuous ${durN} linear infinite`,
                  animationDirection: isReversed ? 'reverse' : 'normal',
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* 1st Loop (Infocity Penthouses & private libraries) */}
                <image href={HERO_LETTER_IMAGES.N[0].url} x="1180" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[1].url} x="1820" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[2].url} x="2460" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[3].url} x="3100" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                {/* 2nd Seamless Duplicate */}
                <image href={HERO_LETTER_IMAGES.N[0].url} x="3740" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[1].url} x="4380" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[2].url} x="5020" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[3].url} x="5660" y="0" width="640" height="880" preserveAspectRatio="xMidYMid slice" />
              </g>
              <rect x="1180" y="0" width="640" height="880" fill="rgba(7, 8, 10, 0.08)" />
            </g>

            {/* =================================================================== */}
            {/* CONTINUOUS ARCHITECTURAL CONTOURS                                  */}
            {/* =================================================================== */}
            <text
              x="280"
              y="780"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1020"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="2.5"
            >
              K
            </text>

            <text
              x="880"
              y="780"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1020"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="2.5"
            >
              Y
            </text>

            <text
              x="1480"
              y="780"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1020"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="2.5"
            >
              N
            </text>
          </svg>
        </div>

        {/* Soft atmospheric gradient across top & bottom */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#07080a]/65 via-transparent to-[#07080a]/80" />

        {/* ======================================================================= */}
        {/* IN BETWEEN / OVERLAY: TOP HOVER BADGE & REGIONAL CITATION               */}
        {/* ======================================================================= */}
        <div className="relative z-20 w-full pt-16 sm:pt-20 text-center pointer-events-none">
          {hoveredLetter ? (
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-neutral-900/90 border border-[#c8a47e]/60 text-xs text-[#e6cfb8] backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 pointer-events-auto">
              <span className="font-semibold text-white">Letter {hoveredLetter}:</span>
              <span>
                {hoveredLetter === 'K' && 'Sliding Vertically Up &bull; Patia & Cuttack Monolithic Living Spaces'}
                {hoveredLetter === 'Y' && 'Sliding Vertically Down &bull; Calacatta & Teak Kitchens, Courtyard Baths'}
                {hoveredLetter === 'N' && 'Sliding Horizontally &bull; Infocity Penthouses & Private Odia Libraries'}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a47e] animate-ping" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#e6cfb8]">
                Bhubaneswar &bull; Cuttack &bull; Puri &bull; Odisha
              </span>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* BOTTOM HUD: BRAND CITATION & CONTROLS (Within the corner margins)      */}
        {/* ======================================================================= */}
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-2.5 pb-1">
          
          {/* Left: Branding */}
          <div className="text-center sm:text-left">
            <h1 className="text-xs sm:text-sm font-serif tracking-[0.2em] text-white uppercase font-light">
              KYN Interior Architecture &bull; Odisha
            </h1>
            <p className="text-[11px] text-neutral-400 tracking-wider font-light mt-0.5">
              Turnkey Luxury Residences, Duplex Villas & Commercial Spaces
            </p>
          </div>

          {/* Center/Right: Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-2xl">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isPlaying ? 'Pause sliding movement' : 'Resume sliding movement'}
              aria-label={isPlaying ? 'Pause movement' : 'Play movement'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#c8a47e]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#c8a47e]" />
                  <span>Play</span>
                </>
              )}
            </button>

            <span className="text-white/20">|</span>

            {/* Reverse Direction */}
            <button
              onClick={() => setIsReversed(!isReversed)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                isReversed ? 'text-[#e6cfb8] bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Reverse continuous sliding directions"
            >
              <RefreshCw className="w-3 h-3 text-[#c8a47e]" />
              <span>Reverse</span>
            </button>

            <span className="text-white/20">|</span>

            {/* Speed Toggle */}
            <div className="flex items-center space-x-1 text-xs text-neutral-400">
              <SlidersHorizontal className="w-3 h-3 text-[#c8a47e] mr-1 hidden sm:inline" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-neutral-400">Pace:</span>
              {(['slow', 'normal', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                    speed === s
                      ? 'bg-[#c8a47e]/20 text-[#e6cfb8] font-semibold border border-[#c8a47e]/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="#projects"
              className="px-4 py-1.5 bg-white text-neutral-950 hover:bg-[#e6cfb8] transition-all text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-lg"
            >
              Explore Projects
            </a>
            <a
              href="#about"
              className="p-1.5 border border-white/20 hover:border-[#c8a47e] hover:text-[#c8a47e] text-neutral-300 rounded-sm transition-all"
              aria-label="Scroll to About"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
