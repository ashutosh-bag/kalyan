'use client';

import React from 'react';
import { Layers, Sun, ShieldCheck, Gem, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '65250+', label: 'Sq. Ft. Designed & Crafted' },
    { value: '23160+', label: 'Hours of Craftsmanship' },
    { value: '150+', label: 'Turnkey Homes Delivered' },
    { value: '20+', label: 'Years of Combined Mastery' },
  ];

  const pillars = [
    {
      icon: <Gem className="w-5 h-5 text-[#9C5427]" />,
      title: 'Material Honesty & Craft',
      desc: 'Natural Khandagiri sandstone, seasoned Indian teakwood, unlacquered brass, and moisture-resistant marine ply engineered for tropical longevity.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#9C5427]" />,
      title: 'Tropical Spatial Flow',
      desc: 'Reinterpreting the traditional Odia courtyard (angan) and natural cross-ventilation with razor-sharp modernist geometry and open volumes.',
    },
    {
      icon: <Sun className="w-5 h-5 text-[#9C5427]" />,
      title: 'Circadian Illumination',
      desc: 'Concealed linear architectural lighting calibrated to solar cycles, sculpting serene warmth from morning light until midnight.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#9C5427]" />,
      title: 'Turnkey Rigor in Odisha',
      desc: 'End-to-end execution across Bhubaneswar, Cuttack, and Puri — from structural compliance and custom joinery to guaranteed 45-day handover.',
    },
  ];

  return (
    <section 
      id="about" 
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5EFEB] text-[#2C1E16] select-none overflow-hidden border-t border-[#2C1E16]/8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ================================================================= */}
        {/* 1. TOP EDITORIAL SHOWCASE (EXACT MATCH TO REFERENCE DESIGN)        */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Column 1: Vertical Portrait Interior Visual (Left) */}
          <div className="lg:col-span-4 w-full">
            <div className="relative w-full aspect-[3/3.8] sm:aspect-[4/5] lg:aspect-[3/3.9] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_16px_40px_rgba(44,30,22,0.08)] border border-[#2C1E16]/10 group bg-[#ECE5DE]">
              <img
                src="/images/hero/herobg1.png"
                alt="Kalyan Design Studio Master Bedroom Architecture"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Column 2: Big Bold Heading (Center) */}
          <div className="lg:col-span-4 flex flex-col justify-start pt-1 sm:pt-2">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#7D6858] block mb-4 sm:mb-6">
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-black uppercase text-[#2C1E16] leading-[1.02] tracking-[-0.03em] font-sans">
              <span className="block">WE&apos;RE</span>
              <span className="block">COMMITTED TO</span>
              <span className="block">TURNING YOUR</span>
              <span className="block">VISION INTO</span>
              <span className="block">REALITY</span>
            </h2>
          </div>

          {/* Column 3: Editorial Paragraphs & Elegant Signature (Right) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-1 sm:pt-3">
            <div className="space-y-4 text-[#5C534A] text-sm sm:text-[15px] leading-relaxed font-normal">
              <p>
                Our full service, residential offering covers every detail of your house&apos;s interior designs. From space planning to furnishings, and everything between, we will transform your space into something that is individual to you.
              </p>
              <p>
                At Interiors by Kalyan Design Studio, we aspire to create cohesive and beautiful environments that are as individual as the clients themselves. Our portfolio allows us the opportunity to put our best foot forward. If you are interested in learning more, please get in touch or visit our{' '}
                <a
                  href="#contact"
                  className="text-[#2C1E16] font-semibold underline underline-offset-4 decoration-[#9C5427] hover:text-[#9C5427] transition-colors"
                >
                  Contact
                </a>{' '}
                page.
              </p>
              <p>
                Our home interior design services are comprehensive and include everything - from space planning to custom furniture design, lighting design, material selection, and more. Our team works closely with you to create spaces that resonate a sense of comfort, luxury, and, most importantly, belongingness.
              </p>
            </div>

            {/* Signature & Studio Mark */}
            <div className="pt-6 mt-6 border-t border-[#2C1E16]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#7D6858] font-medium block">
                  Design Studio
                </span>
                <span className="text-sm font-bold text-[#2C1E16]">
                  Kalyan Studio
                </span>
              </div>

              {/* Elegant Artistic Signature Flourish */}
              <div className="relative flex items-center">
                <svg 
                  className="w-28 sm:w-32 h-10 text-[#2C1E16]/80 fill-none stroke-current" 
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
        {/* 2. STATS COUNTER ROW (65250+, 23160+, 150+, 20+)                  */}
        {/* ================================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 border-t border-[#2C1E16]/12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-[#2C1E16] font-sans">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-[#7D6858] tracking-wide mt-1.5 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. STUDIO PILLARS OF EXCELLENCE (SUBTLE SECONDARY LAYER)          */}
        {/* ================================================================= */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-[#2C1E16]/8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[22px] bg-white/70 backdrop-blur-xs border border-[#2C1E16]/6 shadow-[0_4px_20px_rgba(44,30,22,0.03)] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#2C1E16]/8 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#2C1E16] mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
