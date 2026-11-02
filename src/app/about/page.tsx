'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  CheckCircle2, 
  Gem, 
  Layers, 
  Sun, 
  ShieldCheck, 
  Clock, 
  Compass, 
  PhoneCall, 
  Sparkles,
  Award
} from 'lucide-react';

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

export default function AboutPage() {
  const stats = [
    { target: 65250, suffix: '+', label: 'Sq. Ft. Designed & Crafted' },
    { target: 23160, suffix: '+', label: 'Hours of Craftsmanship' },
    { target: 150, suffix: '+', label: 'Turnkey Homes Delivered' },
    { target: 20, suffix: '+', label: 'Years of Combined Mastery' },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'BRIEFING',
      desc: 'We begin with an exhaustive questionnaire to fully grasp the vision, needs and expectations of the Client. Getting the brief right is key to success of the project.',
    },
    {
      step: '02',
      title: 'DESIGN',
      desc: 'Translating the brief into the design blueprint is the next step. We start with a 2-D floor plan followed by 3-D visualisation of the space. This helps paint a vivid picture of the eventual look and feel of the interiors for the client.',
    },
    {
      step: '03',
      title: 'EXECUTION',
      desc: 'This is where the design comes to life. We undertake only end-to-end projects and aim for perfection in every inch. Along with our handpicked team of craftsmen and vendors from across the world, we deliver a globally-inspired functional work of art.',
    },
    {
      step: '04',
      title: 'HANDOVER',
      desc: 'This marks the culmination of an exciting journey for both the client and us as we handover the keys to their new home. A space all set to delight the occupants for years to come.',
    },
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1E16] flex flex-col font-sans select-none">
      
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* =============================================================== */}
          {/* 2. ABOUT EDITORIAL HEADER                                        */}
          {/* =============================================================== */}
          <div className="max-w-4xl mb-14 sm:mb-20">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-8 h-[1.5px] bg-[#9C5427]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#7D6858]">
                STUDIO ETHOS &amp; HERITAGE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black uppercase text-[#2C1E16] leading-[1.04] tracking-[-0.03em] mb-6">
              DELIVERING TIMELESS AESTHETICS &amp; ARCHITECTURAL EXCELLENCE ACROSS ODISHA.
            </h1>

            <p className="text-base sm:text-lg text-[#5C534A] leading-relaxed max-w-3xl font-normal">
              With our projects spanning over the spheres of residential, commercial and corporate construction, we, at <strong className="text-[#2C1E16] font-semibold">Kalyan Design Studio</strong>, aim to deliver excellence and timeless aesthetics. Our skillful interdisciplinary team works closely with our clients and engages in a diverse array of design styles from contemporary, modern, and classical to Scandinavian or baroque — truly a one-of-its-kind service.
            </p>
          </div>

          {/* =============================================================== */}
          {/* 3. EDITORIAL SHOWCASE (WE'RE COMMITTED TO TURNING YOUR VISION INTO REALITY) */}
          {/* =============================================================== */}
          <div className="mb-20 sm:mb-28 p-6 sm:p-10 lg:p-12 rounded-[34px] sm:rounded-[44px] bg-[#F5EFEB] border border-[#2C1E16]/8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
              
              {/* Column 1: Vertical Portrait Interior Visual (Left) */}
              <div className="lg:col-span-4 w-full">
                <div className="relative w-full aspect-[3/3.8] sm:aspect-[4/5] lg:aspect-[3/3.9] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_16px_40px_rgba(44,30,22,0.08)] border border-[#2C1E16]/10 group bg-[#ECE5DE]">
                  <img
                    src="/images/hero/lamp.jpg"
                    alt="Kalyan Design Studio Architectural Brass Sconce Lighting & Fluted Wall Panelling"
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
                    <Link
                      href="/contact"
                      className="text-[#2C1E16] font-semibold underline underline-offset-4 decoration-[#9C5427] hover:text-[#9C5427] transition-colors"
                    >
                      Contact
                    </Link>{' '}
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
          </div>

          {/* =============================================================== */}
          {/* 5. PROVEN 4-STEP METHODOLOGY (EXACT FROM OFFICIAL SITE)          */}
          {/* =============================================================== */}
          <div className="mb-20 sm:mb-28">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-6 h-[1.5px] bg-[#9C5427]" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#9C5427]">
                  EXECUTION BLUEPRINT
                </span>
                <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#2C1E16] tracking-tight">
                OUR PROVEN 4-STEP PROCESS.
              </h2>
              <p className="text-xs sm:text-sm text-[#7D6858] mt-1">
                How we turn raw spaces into works of art across Bhubaneswar, Cuttack &amp; Puri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-7 sm:p-8 rounded-[28px] bg-white border border-[#2C1E16]/8 shadow-[0_10px_35px_rgba(44,30,22,0.04)] relative group hover:shadow-xl transition-all hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-4xl font-black text-[#9C5427] block mb-3 font-sans">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-[#2C1E16] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C534A] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[#2C1E16]/8 text-[11px] font-bold text-[#7D6858] uppercase tracking-wider">
                    Phase {step.step} of 04
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* 6. ANIMATED METRICS ROW (65250+, 23160+, 150+, 20+)              */}
          {/* =============================================================== */}
          <div className="mb-20 sm:mb-28 p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] bg-[#2C1E16] text-white shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 sm:pt-0' : ''}`}>
                  <span className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-white font-sans mb-1.5">
                    <AnimatedStatCounter target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs sm:text-sm text-[#C49B7E] tracking-wider uppercase font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* 7. STUDIO PILLARS OF EXCELLENCE                                  */}
          {/* =============================================================== */}
          <div className="mb-20 sm:mb-28">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest font-bold text-[#9C5427] block mb-2">
                MATERIAL HONESTY &amp; STANDARDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#2C1E16] tracking-tight">
                OUR ARCHITECTURAL PILLARS.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-[26px] bg-white border border-[#2C1E16]/8 shadow-[0_10px_35px_rgba(44,30,22,0.04)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] border border-[#2C1E16]/8 flex items-center justify-center mb-5 text-[#9C5427]">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#2C1E16] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C534A] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* 8. SCHEDULE A CONSULTATION CTA BANNER                            */}
          {/* =============================================================== */}
          <div className="p-8 sm:p-12 lg:p-16 rounded-[34px] sm:rounded-[44px] bg-[#F5EFEB] border border-[#2C1E16]/8 text-[#2C1E16] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#9C5427] block mb-2">
                READY TO BEGIN YOUR JOURNEY?
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
                LET&apos;S CREATE A HOME THAT FEELS INDIVIDUAL TO YOU.
              </h2>
              <p className="text-sm sm:text-base text-[#5C534A] leading-relaxed">
                Connect directly with Debakalyan Mohanty and our principal architectural team. Schedule a complimentary on-site laser measurement and 3D consultation across Bhubaneswar, Cuttack, or Puri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#2C1E16] border border-[#2C1E16]/15 font-bold text-xs uppercase tracking-wider transition-all text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Book Free Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* 9. Global Footer */}
      <Footer />

    </div>
  );
}

