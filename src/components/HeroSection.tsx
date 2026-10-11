'use client';

import React, { useState } from 'react';
import { Play, Pause, RefreshCw, SlidersHorizontal, ArrowDown } from 'lucide-react';
import { HERO_LETTER_IMAGES } from '@/lib/data';

type LetterKey = 'K' | 'A1' | 'L' | 'Y' | 'A2' | 'N';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isReversed, setIsReversed] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<LetterKey | null>(null);

  // Dynamic animation pace
  const getDuration = (base: number) => {
    if (speed === 'slow') return `${base * 1.5}s`;
    if (speed === 'fast') return `${base * 0.65}s`;
    return `${base}s`;
  };

  const durK = getDuration(28);
  const durA1 = getDuration(32);
  const durL = getDuration(26);
  const durY = getDuration(34);
  const durA2 = getDuration(30);
  const durN = getDuration(35);

  const getLetterDisplay = (key: LetterKey) => {
    if (key === 'A1' || key === 'A2') return 'A';
    return key;
  };

  const getLetterDescription = (key: LetterKey) => {
    switch (key) {
      case 'K':
        return 'Sliding Up • Patia & Cuttack Monolithic Living Spaces & Foyer';
      case 'A1':
        return 'Sliding Down • Signature Dining Suites & Grand Double-Height Atriums';
      case 'L':
        return 'Sliding Up • Calacatta & Teak Modular Kitchens & Fluted Joinery';
      case 'Y':
        return 'Sliding Down • Luxury Villa Master Suites & Courtyard Baths';
      case 'A2':
        return 'Sliding Up • Artisan Wood Paneling & Ambient Ceilings';
      case 'N':
        return 'Sliding Down • Infocity Penthouses & Private Odia Libraries';
      default:
        return '';
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[620px] sm:min-h-[660px] max-h-screen bg-[#FFF3E9] overflow-hidden select-none p-1.5 sm:p-2.5 md:p-3"
      aria-label="Kalyan Design Studio Interior Architecture Odisha"
    >
      {/* ========================================================================= */}
      {/* OUTER CORNER MARGINS & SLIM ARCHITECTURAL BLUEPRINT FRAME                 */}
      {/* ========================================================================= */}
      <div className="relative w-full h-full border border-[#1A1815]/10 rounded-sm overflow-hidden flex flex-col justify-between p-2 sm:p-3.5">
        
        {/* Corner registration marks */}
        <div className="absolute top-2 left-2 text-[8px] sm:text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 01</div>
        <div className="absolute top-2 right-2 text-[8px] sm:text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 02</div>
        <div className="absolute bottom-2 left-2 text-[8px] sm:text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 03</div>
        <div className="absolute bottom-2 right-2 text-[8px] sm:text-[9px] text-[#1A1815]/40 font-mono tracking-widest pointer-events-none">+ 04</div>

        {/* Ambient lighting glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#FF8526]/18 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,243,233,0.45)_80%,#FFF3E9_100%)]" />
        </div>

        {/* ======================================================================= */}
        {/* CENTRAL SVG CONTAINER: PROMINENT & EXPANDED HEIGHT PRESENTATION         */}
        {/* ======================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto pt-14 sm:pt-16 md:pt-18 pb-14 sm:pb-16 md:pb-14 px-1 sm:px-2 flex items-center justify-center">
          
          {/* ------------------------------------------------------------------- */}
          {/* DESKTOP & TABLET VIEW: "KALYAN" IN ONE PROMINENT HORIZONTAL ROW     */}
          {/* ------------------------------------------------------------------- */}
          <svg
            viewBox="0 0 2160 840"
            preserveAspectRatio="xMidYMid meet"
            className="hidden md:block w-full h-full max-h-[86vh] lg:max-h-[90vh]"
            aria-label="KALYAN letters with sliding interior design architecture inside"
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
              .kalyan-letter-font {
                font-family: 'Bounce Dash', var(--font-bounce-dash), sans-serif;
                font-weight: 900;
              }
            `}</style>
            <defs>
              {/* Letter K: Centered at x=180 */}
              <clipPath id="desk-kalyan-k">
                <text x="180" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  K
                </text>
              </clipPath>

              {/* Letter A (1st): Centered at x=540 */}
              <clipPath id="desk-kalyan-a1">
                <text x="540" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  A
                </text>
              </clipPath>

              {/* Letter L: Centered at x=900 */}
              <clipPath id="desk-kalyan-l">
                <text x="900" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  L
                </text>
              </clipPath>

              {/* Letter Y: Centered at x=1260 */}
              <clipPath id="desk-kalyan-y">
                <text x="1260" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  Y
                </text>
              </clipPath>

              {/* Letter A (2nd): Centered at x=1620 */}
              <clipPath id="desk-kalyan-a2">
                <text x="1620" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  A
                </text>
              </clipPath>

              {/* Letter N: Centered at x=1980 */}
              <clipPath id="desk-kalyan-n">
                <text x="1980" y="730" textAnchor="middle" className="kalyan-letter-font" fontSize="720" letterSpacing="-5">
                  N
                </text>
              </clipPath>
            </defs>

            {/* LETTER K (Sliding Vertically UPWARDS) */}
            <g
              clipPath="url(#desk-kalyan-k)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('K')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(0, 0)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durK} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* LETTER A (1st) (Sliding Vertically DOWNWARDS) */}
            <g
              clipPath="url(#desk-kalyan-a1)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('A1')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(360, 0)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durA1} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.A1[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.A1[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* LETTER L (Sliding Vertically UPWARDS) */}
            <g
              clipPath="url(#desk-kalyan-l)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('L')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(720, 0)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durL} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.L[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.L[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* LETTER Y (Sliding Vertically DOWNWARDS) */}
            <g
              clipPath="url(#desk-kalyan-y)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('Y')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(1080, 0)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durY} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.Y[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.Y[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* LETTER A (2nd) (Sliding Vertically UPWARDS) */}
            <g
              clipPath="url(#desk-kalyan-a2)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('A2')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(1440, 0)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durA2} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.A2[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.A2[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* LETTER N (Sliding Vertically DOWNWARDS) */}
            <g
              clipPath="url(#desk-kalyan-n)"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLetter('N')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(1800, 0)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durN} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.N[0].url} x="0" y="0" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[1].url} x="0" y="420" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[2].url} x="0" y="840" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[3].url} x="0" y="1260" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  {/* Seamless Duplicate */}
                  <image href={HERO_LETTER_IMAGES.N[0].url} x="0" y="1680" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[1].url} x="0" y="2100" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[2].url} x="0" y="2520" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[3].url} x="0" y="2940" width="370" height="420" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="370" height="840" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* CONTINUOUS ARCHITECTURAL CONTOURS FOR DESKTOP K-A-L-Y-A-N */}
            <text x="180" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">K</text>
            <text x="540" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">A</text>
            <text x="900" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">L</text>
            <text x="1260" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">Y</text>
            <text x="1620" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">A</text>
            <text x="1980" y="730" textAnchor="middle" className="kalyan-letter-font pointer-events-none" fontSize="720" letterSpacing="-5" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">N</text>
          </svg>

          {/* ------------------------------------------------------------------- */}
          {/* MOBILE VIEW: "KA / LY / AN" IN 3 STACKED RESPONSIVE ROWS           */}
          {/* ------------------------------------------------------------------- */}
          <svg
            viewBox="0 0 800 1260"
            preserveAspectRatio="xMidYMid meet"
            className="block md:hidden w-full h-full max-h-[76vh] sm:max-h-[82vh]"
            aria-label="KA LY AN letters with sliding interior design architecture inside"
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
              .kalyan-mob-letter-font {
                font-family: 'Bounce Dash', var(--font-bounce-dash), sans-serif;
                font-weight: 900;
              }
            `}</style>
            <defs>
              {/* Row 1: K (x=210, y=350) & A1 (x=590, y=350) */}
              <clipPath id="mob-kalyan-k">
                <text x="210" y="350" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  K
                </text>
              </clipPath>
              <clipPath id="mob-kalyan-a1">
                <text x="590" y="350" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  A
                </text>
              </clipPath>

              {/* Row 2: L (x=210, y=770) & Y (x=590, y=770) */}
              <clipPath id="mob-kalyan-l">
                <text x="210" y="770" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  L
                </text>
              </clipPath>
              <clipPath id="mob-kalyan-y">
                <text x="590" y="770" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  Y
                </text>
              </clipPath>

              {/* Row 3: A2 (x=210, y=1190) & N (x=590, y=1190) */}
              <clipPath id="mob-kalyan-a2">
                <text x="210" y="1190" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  A
                </text>
              </clipPath>
              <clipPath id="mob-kalyan-n">
                <text x="590" y="1190" textAnchor="middle" className="kalyan-mob-letter-font" fontSize="460" letterSpacing="-4">
                  N
                </text>
              </clipPath>
            </defs>

            {/* ROW 1: LETTER K (Slide Up) */}
            <g
              clipPath="url(#mob-kalyan-k)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('K')}
              onMouseEnter={() => setHoveredLetter('K')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(10, 0)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durK} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.K[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.K[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* ROW 1: LETTER A1 (Slide Down) */}
            <g
              clipPath="url(#mob-kalyan-a1)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('A1')}
              onMouseEnter={() => setHoveredLetter('A1')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(410, 0)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durA1} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.A1[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.A1[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A1[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* ROW 2: LETTER L (Slide Up) */}
            <g
              clipPath="url(#mob-kalyan-l)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('L')}
              onMouseEnter={() => setHoveredLetter('L')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(10, 420)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durL} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.L[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.L[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.L[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* ROW 2: LETTER Y (Slide Down) */}
            <g
              clipPath="url(#mob-kalyan-y)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('Y')}
              onMouseEnter={() => setHoveredLetter('Y')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(410, 420)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durY} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.Y[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.Y[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.Y[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* ROW 3: LETTER A2 (Slide Up) */}
            <g
              clipPath="url(#mob-kalyan-a2)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('A2')}
              onMouseEnter={() => setHoveredLetter('A2')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(10, 840)">
                <g
                  style={{
                    animation: `slideUpContinuous ${durA2} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.A2[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.A2[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.A2[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* ROW 3: LETTER N (Slide Down) */}
            <g
              clipPath="url(#mob-kalyan-n)"
              className="cursor-pointer"
              onClick={() => setHoveredLetter('N')}
              onMouseEnter={() => setHoveredLetter('N')}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              <g transform="translate(410, 840)">
                <g
                  style={{
                    animation: `slideDownContinuous ${durN} linear infinite`,
                    animationDirection: isReversed ? 'reverse' : 'normal',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                >
                  <image href={HERO_LETTER_IMAGES.N[0].url} x="0" y="0" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[1].url} x="0" y="260" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[2].url} x="0" y="520" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[3].url} x="0" y="780" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  {/* Duplicate */}
                  <image href={HERO_LETTER_IMAGES.N[0].url} x="0" y="1040" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[1].url} x="0" y="1300" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[2].url} x="0" y="1560" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                  <image href={HERO_LETTER_IMAGES.N[3].url} x="0" y="1820" width="380" height="260" preserveAspectRatio="xMidYMid slice" />
                </g>
                <rect x="0" y="0" width="380" height="410" fill="rgba(7, 8, 10, 0.08)" />
              </g>
            </g>

            {/* CONTINUOUS ARCHITECTURAL CONTOURS FOR MOBILE KA / LY / AN */}
            {/* Row 1: KA */}
            <text x="210" y="350" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">K</text>
            <text x="590" y="350" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">A</text>
            
            {/* Row 2: LY */}
            <text x="210" y="770" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">L</text>
            <text x="590" y="770" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">Y</text>
            
            {/* Row 3: AN */}
            <text x="210" y="1190" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">A</text>
            <text x="590" y="1190" textAnchor="middle" className="kalyan-mob-letter-font pointer-events-none" fontSize="460" letterSpacing="-4" fill="none" stroke="rgba(26, 24, 21, 0.28)" strokeWidth="2.5">N</text>
          </svg>

        </div>

        {/* Soft atmospheric gradient across top & bottom */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#F7F3EB]/70 via-transparent to-[#F7F3EB]/85" />

        {/* ======================================================================= */}
        {/* IN BETWEEN / OVERLAY: TOP HOVER BADGE & REGIONAL CITATION               */}
        {/* ======================================================================= */}
        <div className="relative z-20 w-full pt-14 sm:pt-16 md:pt-18 text-center pointer-events-none">
          {hoveredLetter ? (
            <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/95 border border-[#B68953]/50 text-xs text-[#4A453F] backdrop-blur-md shadow-lg animate-in fade-in zoom-in-95 pointer-events-auto max-w-[92vw] truncate">
              <span className="font-semibold text-[#1A1815]">Letter {getLetterDisplay(hoveredLetter)}:</span>
              <span className="truncate">{getLetterDescription(hoveredLetter)}</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/80 border border-[#1A1815]/10 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68953] animate-ping" />
              <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium text-[#7A6B58]">
                Bhubaneswar &bull; Cuttack &bull; Puri &bull; Odisha
              </span>
            </div>
          )}
        </div>

        {/* Floating Interactive Micro-Badges for Desktop / Tablets */}
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
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 border-t border-[#1A1815]/10 pt-1.5 pb-1 bg-[#FFF3E9]/80 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none rounded-b">
          
          {/* Left: Branding in Bounce Dash */}
          <div className="text-center sm:text-left">
            <h1 className="text-xs sm:text-base font-bounce tracking-wide text-[#1A1815] leading-tight">
              Kalyan Design Studio &bull; <span className="text-[#FF8526]">Odisha</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-[#5C564E] font-century font-medium mt-0.5 line-clamp-1">
              Turnkey Luxury Residences, Modular Kitchens & Complete Interior Packages
            </p>
          </div>

          {/* Center/Right: Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-[#FF8526]/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-century font-bold text-[#4A453F] hover:text-[#FF8526] hover:bg-black/5 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause sliding movement' : 'Resume sliding movement'}
              aria-label={isPlaying ? 'Pause movement' : 'Play movement'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF8526]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF8526]" />
                  <span>Play</span>
                </>
              )}
            </button>

            <span className="text-[#1A1815]/20">|</span>

            {/* Reverse Direction */}
            <button
              onClick={() => setIsReversed(!isReversed)}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-century font-bold transition-colors cursor-pointer ${
                isReversed ? 'text-[#FF8526] bg-[#FF8526]/10' : 'text-[#68625A] hover:text-[#FF8526] hover:bg-black/5'
              }`}
              title="Reverse continuous sliding directions"
            >
              <RefreshCw className="w-3 h-3 text-[#FF8526]" />
              <span>Reverse</span>
            </button>

            <span className="text-[#1A1815]/20">|</span>

            {/* Speed Toggle */}
            <div className="flex items-center space-x-1 text-[11px] sm:text-xs text-[#68625A] font-century">
              <SlidersHorizontal className="w-3 h-3 text-[#FF8526] mr-1 hidden sm:inline" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#68625A] font-bold">Pace:</span>
              {(['slow', 'normal', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] capitalize transition-colors font-medium cursor-pointer ${
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
