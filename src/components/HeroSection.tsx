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
      className="relative w-full h-screen min-h-[600px] max-h-screen bg-[#FFF3E9] overflow-hidden select-none p-2 sm:p-3 md:p-4"
      aria-label="Kalyan Design Studio Interior Architecture Odisha"
    >
      {/* ========================================================================= */}
      {/* OUTER CORNER MARGINS & SLIM ARCHITECTURAL BLUEPRINT FRAME                 */}
      {/* ========================================================================= */}
      <div className="relative w-full h-full border border-[#1A1815]/10 rounded-sm overflow-hidden flex flex-col justify-between p-2 sm:p-4">
        
        {/* Corner registration marks */}
        <div className="absolute top-2 left-2 text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 01</div>
        <div className="absolute top-2 right-2 text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 02</div>
        <div className="absolute bottom-2 left-2 text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 03</div>
        <div className="absolute bottom-2 right-2 text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 04</div>

        {/* Ambient lighting glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[#FF8526]/15 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,243,233,0.45)_80%,#FFF3E9_100%)]" />
        </div>

        {/* ======================================================================= */}
        {/* KYN LETTERS: EXPANDED & PROMINENT                                       */}
        {/* ======================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-16 px-1 sm:px-2 flex items-center justify-center">
          <svg
            viewBox="0 0 1800 880"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-[84vh] sm:max-h-[88vh] md:max-h-[90vh]"
            aria-label="KYN letters with sliding interior design architecture inside"
            role="img"
          >
            <style>{`
              @font-face {
                font-family: 'Bounce Dash';
                src: url('/fonts/BounceDash.otf') format('opentype');
                font-weight: normal;
                font-style: normal;
                font-display: block;
              }
              .kyn-letter-font {
                font-family: 'Bounce Dash', var(--font-bounce-dash), sans-serif;
              }
            `}</style>
            <defs>
              {/* Letter K: Centered around x=315 */}
              <clipPath id="tight-kyn-k">
                <text
                  x="315"
                  y="805"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1080"
                  letterSpacing="-10"
                >
                  K
                </text>
              </clipPath>

              {/* Letter Y: Centered around x=905 */}
              <clipPath id="tight-kyn-y">
                <text
                  x="905"
                  y="805"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1080"
                  letterSpacing="-10"
                >
                  Y
                </text>
              </clipPath>

              {/* Letter N: Centered around x=1490 */}
              <clipPath id="tight-kyn-n">
                <text
                  x="1490"
                  y="805"
                  textAnchor="middle"
                  className="kyn-letter-font"
                  fontSize="1080"
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
                <image href={HERO_LETTER_IMAGES.N[0].url} x="1160" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[1].url} x="1820" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[2].url} x="2480" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[3].url} x="3140" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                {/* 2nd Seamless Duplicate */}
                <image href={HERO_LETTER_IMAGES.N[0].url} x="3800" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[1].url} x="4460" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[2].url} x="5120" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
                <image href={HERO_LETTER_IMAGES.N[3].url} x="5780" y="0" width="660" height="880" preserveAspectRatio="xMidYMid slice" />
              </g>
              <rect x="1160" y="0" width="660" height="880" fill="rgba(7, 8, 10, 0.08)" />
            </g>

            {/* =================================================================== */}
            {/* CONTINUOUS ARCHITECTURAL CONTOURS                                  */}
            {/* =================================================================== */}
            <text
              x="315"
              y="805"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1080"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(26, 24, 21, 0.3)"
              strokeWidth="2.5"
            >
              K
            </text>

            <text
              x="905"
              y="805"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1080"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(26, 24, 21, 0.3)"
              strokeWidth="2.5"
            >
              Y
            </text>

            <text
              x="1490"
              y="805"
              textAnchor="middle"
              className="kyn-letter-font pointer-events-none"
              fontSize="1080"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(26, 24, 21, 0.3)"
              strokeWidth="2.5"
            >
              N
            </text>
          </svg>
        </div>

        {/* Soft atmospheric gradient across top & bottom */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#F7F3EB]/70 via-transparent to-[#F7F3EB]/85" />

        {/* ======================================================================= */}
        {/* IN BETWEEN / OVERLAY: TOP HOVER BADGE & REGIONAL CITATION               */}
        {/* ======================================================================= */}
        <div className="relative z-20 w-full pt-16 sm:pt-20 text-center pointer-events-none">
          {hoveredLetter ? (
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/95 border border-[#B68953]/50 text-xs text-[#4A453F] backdrop-blur-md shadow-lg animate-in fade-in zoom-in-95 pointer-events-auto">
              <span className="font-semibold text-[#1A1815]">Letter {hoveredLetter}:</span>
              <span>
                {hoveredLetter === 'K' && 'Sliding Vertically Up • Patia & Cuttack Monolithic Living Spaces'}
                {hoveredLetter === 'Y' && 'Sliding Vertically Down • Calacatta & Teak Kitchens, Courtyard Baths'}
                {hoveredLetter === 'N' && 'Sliding Horizontally • Infocity Penthouses & Private Odia Libraries'}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#1A1815]/10 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68953] animate-ping" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-[#7A6B58]">
                Bhubaneswar &bull; Cuttack &bull; Puri &bull; Odisha
              </span>
            </div>
          )}
        </div>

        {/* Floating Interactive Micro-Badges */}
        <div className="absolute top-16 left-6 z-30 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-[#FF8526]/30 shadow-md animate-float">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8526] animate-ping" />
          <span className="text-xs font-century font-bold text-[#1A1815]">
            ⭐ 350+ Homes Handed Over Across Odisha
          </span>
        </div>

        <div className="absolute top-16 right-6 z-30 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/95 border border-[#FF8526]/30 shadow-md animate-float-reverse">
          <span className="text-xs font-century font-bold text-[#FF8526]">
            ⚡ 45-Day Handover Guaranteed
          </span>
        </div>

        {/* ======================================================================= */}
        {/* BOTTOM HUD: BRAND CITATION & CONTROLS (Within the corner margins)      */}
        {/* ======================================================================= */}
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1A1815]/10 pt-2.5 pb-1">
          
          {/* Left: Branding in Bounce Dash */}
          <div className="text-center sm:text-left">
            <h1 className="text-sm sm:text-base font-bounce tracking-wide text-[#1A1815]">
              Kalyan Design Studio &bull; <span className="text-[#FF8526]">Odisha</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-[#5C564E] font-century font-medium mt-0.5">
              Turnkey Luxury Residences, Modular Kitchens & Complete Interior Packages
            </p>
          </div>

          {/* Center/Right: Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/95 backdrop-blur-md border border-[#FF8526]/20 px-4 py-1.5 rounded-full shadow-lg">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-century font-bold text-[#4A453F] hover:text-[#FF8526] hover:bg-black/5 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause sliding movement' : 'Resume sliding movement'}
              aria-label={isPlaying ? 'Pause movement' : 'Play movement'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#FF8526]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#FF8526]" />
                  <span>Play</span>
                </>
              )}
            </button>

            <span className="text-[#1A1815]/20">|</span>

            {/* Reverse Direction */}
            <button
              onClick={() => setIsReversed(!isReversed)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-century font-bold transition-colors cursor-pointer ${
                isReversed ? 'text-[#FF8526] bg-[#FF8526]/10' : 'text-[#68625A] hover:text-[#FF8526] hover:bg-black/5'
              }`}
              title="Reverse continuous sliding directions"
            >
              <RefreshCw className="w-3 h-3 text-[#FF8526]" />
              <span>Reverse</span>
            </button>

            <span className="text-[#1A1815]/20">|</span>

            {/* Speed Toggle */}
            <div className="flex items-center space-x-1 text-xs text-[#68625A] font-century">
              <SlidersHorizontal className="w-3 h-3 text-[#FF8526] mr-1 hidden sm:inline" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#68625A] font-bold">Pace:</span>
              {(['slow', 'normal', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors font-medium cursor-pointer ${
                    speed === s
                      ? 'bg-[#FF8526] text-white font-bold shadow-sm'
                      : 'text-[#68625A] hover:text-[#1A1815]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Right CTA in Courgette font */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="#packages"
              className="px-5 py-2 bg-[#FF8526] text-white hover:bg-[#e87417] transition-all font-courgette text-base rounded-xl shadow-md hover:scale-105 active:scale-95"
            >
              View Packages
            </a>
            <a
              href="#packages"
              className="p-2 border border-[#FF8526]/30 hover:border-[#FF8526] text-[#FF8526] rounded-xl transition-all bg-white/80"
              aria-label="Scroll to Packages"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
