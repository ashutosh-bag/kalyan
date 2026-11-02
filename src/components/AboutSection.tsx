'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Smooth counting animation when page is loaded / refreshed
function AnimatedStatCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 2200; // 2.2 seconds smooth exponential count

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out exponential deceleration curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const stats = [
    { target: 65250, suffix: '+', label: 'Sq. Ft. Designed & Crafted' },
    { target: 23160, suffix: '+', label: 'Hours of Craftsmanship' },
    { target: 150, suffix: '+', label: 'Turnkey Homes Delivered' },
    { target: 20, suffix: '+', label: 'Years of Combined Mastery' },
  ];

  return (
    <section 
      id="about" 
      className="relative py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-12 bg-[#F5EFEB] text-[#2C1E16] select-none overflow-hidden border-t border-[#2C1E16]/8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ================================================================= */}
        {/* 1. FOUNDER & LEADERSHIP SHOWCASE (DEBAKALYAN MOHANTY)             */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Founder Portrait Visual (Left Col 1-5) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/3.8] sm:aspect-[3/3.7] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(44,30,22,0.12)] border-2 border-white group bg-[#E8E0D7]">
              <img
                src="/images/hero/owner.jpeg"
                alt="Debakalyan Mohanty - Founder & Principal Designer, Kalyan Design Studio"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Experience Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-[#2C1E16]/8 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D6858] block">Leadership</span>
                  <span className="text-xs sm:text-sm font-black text-[#2C1E16] uppercase">Kalyan Design Studio</span>
                </div>
                <span className="text-xs font-bold text-[#9C5427] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#9C5427]/20">
                  Bhubaneswar
                </span>
              </div>
            </div>
          </div>

          {/* Founder Story & Vision Message (Right Col 6-12) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#9C5427] block mb-2">
                FOUNDER &amp; PRINCIPAL ARCHITECTURAL DESIGNER
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black uppercase text-[#2C1E16] tracking-tight leading-tight">
                DEBAKALYAN MOHANTY
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#7D6858] font-semibold mt-1">
                Visionary Design Director &bull; Turnkey Specialist
              </p>
            </div>

            <blockquote className="border-l-3 sm:border-l-4 border-[#9C5427] pl-5 sm:pl-6 text-base sm:text-lg text-[#2C1E16] italic font-serif leading-relaxed">
              &ldquo;Interior design is not merely about decorating an enclosure; it is the art of curating atmosphere, human emotion, and belongingness. In every villa, apartment, and commercial space we sculpt across Odisha, our promise is absolute craftsmanship, uncompromising material honesty, and spaces that feel uniquely yours.&rdquo;
            </blockquote>

            <p className="text-sm sm:text-base text-[#5C534A] leading-relaxed">
              Under Debakalyan Mohanty&apos;s leadership, Kalyan Design Studio has evolved into Bhubaneswar&apos;s most sought-after interior architecture firm. With an unwavering commitment to precision, transparency, and client collaboration, the studio bridges traditional Odia architectural sensibilities with cutting-edge global design trends.
            </p>

            {/* Signature Flourish */}
            <div className="pt-4 flex items-center justify-between border-t border-[#2C1E16]/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7D6858] font-bold block">
                  Founder&apos;s Signature
                </span>
                <span className="text-sm font-bold text-[#2C1E16]">
                  Debakalyan Mohanty
                </span>
              </div>

              <div className="relative flex items-center pr-2">
                <svg 
                  className="w-32 sm:w-36 h-10 text-[#2C1E16]/80 fill-none stroke-current" 
                  viewBox="0 0 160 50" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 38 C 22 15, 30 8, 38 25 C 42 35, 48 40, 56 26 C 62 16, 68 20, 74 28 C 80 36, 85 30, 92 22 C 98 14, 108 20, 116 30 C 122 38, 134 32, 146 24 M 30 38 Q 85 46 150 28" />
                </svg>
              </div>
            </div>

          </div>

        </div>

        {/* ================================================================= */}
        {/* 2. STATS COUNTER ROW (ANIMATED COUNTING WHEN REFRESHED)           */}
        {/* ================================================================= */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 border-t border-[#2C1E16]/12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-[#2C1E16] font-sans">
                  <AnimatedStatCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-xs sm:text-sm text-[#7D6858] tracking-wide mt-1.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
