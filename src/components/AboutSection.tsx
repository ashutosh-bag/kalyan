'use client';

import React from 'react';
import { AGENCY_STATS } from '@/lib/data';
import { Layers, Sun, ShieldCheck, Gem, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const principles = [
    {
      icon: <Gem className="w-5 h-5 text-[#9C5427]" />,
      title: 'Material Honesty & Craft',
      desc: 'We prioritize natural Khandagiri sandstone, seasoned Indian teakwood, unlacquered brass, and moisture-resistant marine ply engineered for Odisha’s climate.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#9C5427]" />,
      title: 'Tropical Spatial Flow',
      desc: 'Reinterpreting the traditional Odia courtyard (angan) and cross-ventilation with razor-sharp modernist geometry and expansive double-height volumes.',
    },
    {
      icon: <Sun className="w-5 h-5 text-[#9C5427]" />,
      title: 'Circadian Illumination',
      desc: 'Concealed linear architectural lighting calibrated to solar cycles, sculpting serene warmth from morning light until midnight.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#9C5427]" />,
      title: 'Turnkey Rigor in Odisha',
      desc: 'Seamless execution across Bhubaneswar, Cuttack, and Puri — from structural Vastu compliance and custom joinery to guaranteed 45-day handover.',
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Grid: Text + Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20 sm:mb-24">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                STUDIO ETHOS &amp; HERITAGE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] leading-[1.08] tracking-tight">
              KALYAN DESIGN STUDIO: DELIVERING EXCELLENCE ACROSS ODISHA.
            </h2>

            <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed">
              With our projects spanning across residential, commercial and corporate architecture, we, at <strong className="text-black font-semibold">Kalyan Design Studio</strong>, aim to deliver excellence and timeless aesthetics. Our skillful interdisciplinary team engages in diverse styles from contemporary and minimalist to classical or Scandinavian.
            </p>

            <p className="text-sm sm:text-base text-[#68625A] leading-relaxed">
              Our residential offering covers every detail of your home — from space planning to custom modular kitchens, gypsum ceilings, custom wardrobes, and photorealistic 3D visualization. We undertake turnkey end-to-end projects with our handpicked master craftsmen, delivering globally-inspired functional works of art with a 10-year warranty.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-medium text-sm sm:text-base shadow-sm transition-all hover:gap-3 cursor-pointer"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#1A1815] border border-[#1A1815]/15 font-medium text-sm sm:text-base shadow-xs transition-all cursor-pointer"
              >
                <span>Book Free Site Visit</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] sm:rounded-[38px] overflow-hidden shadow-2xl border-2 border-white group aspect-[4/3] sm:aspect-[4/3.5] bg-white">
              <img
                src="/images/kalyan/assets/aboutimg-9X_Cc2-O.png"
                alt="About Kalyan Design Studio Living Architecture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-5 left-4 sm:left-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#1A1815]/8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#9C5427] text-white flex items-center justify-center text-xl font-black shadow-sm">
                12+
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#1A1815]">Years of Mastery</h4>
                <p className="text-xs text-[#7A7369]">Bhubaneswar, Cuttack &amp; Puri</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-20 sm:mb-24">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#1A1815]/8 flex items-center justify-center mb-5 text-[#9C5427] group-hover:scale-105 transition-all">
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#1A1815] mb-2 group-hover:text-[#9C5427] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Kalyan Studio 4-Step Process Section */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                EXECUTION METHODOLOGY
              </span>
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black uppercase text-[#1A1815] tracking-tight">
              OUR PROVEN 4-STEP PROCESS.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] relative group hover:shadow-md transition-all">
              <span className="text-3xl font-black text-[#9C5427] block mb-2">01</span>
              <h4 className="text-base font-bold uppercase tracking-tight text-[#1A1815] mb-2">BRIEFING</h4>
              <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                We begin with an exhaustive questionnaire to fully grasp the vision, lifestyle needs and expectations of the client.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] relative group hover:shadow-md transition-all">
              <span className="text-3xl font-black text-[#9C5427] block mb-2">02</span>
              <h4 className="text-base font-bold uppercase tracking-tight text-[#1A1815] mb-2">DESIGN</h4>
              <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                Translating the brief into blueprint: 2D floor layouts followed by photorealistic 3D visualization with material selection.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] relative group hover:shadow-md transition-all">
              <span className="text-3xl font-black text-[#9C5427] block mb-2">03</span>
              <h4 className="text-base font-bold uppercase tracking-tight text-[#1A1815] mb-2">EXECUTION</h4>
              <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                Where design comes to life. Our handpicked master craftsmen and site supervisors deliver precision within 45 days.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] relative group hover:shadow-md transition-all">
              <span className="text-3xl font-black text-[#9C5427] block mb-2">04</span>
              <h4 className="text-base font-bold uppercase tracking-tight text-[#1A1815] mb-2">HANDOVER</h4>
              <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed">
                Key handover with deep cleaning, 10-year warranty certificate, and ongoing aftercare for peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Metrics Banner */}
        <div className="p-6 sm:p-10 rounded-[30px] sm:rounded-[36px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1815]/8">
            {AGENCY_STATS.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                <span className="text-3xl sm:text-5xl font-black text-[#9C5427] mb-1.5 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1815]">
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
