'use client';

import React from 'react';
import { AGENCY_STATS } from '@/lib/data';
import { Layers, Sun, ShieldCheck, Gem, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const principles = [
    {
      icon: <Gem className="w-5 h-5 text-[#FF8526]" />,
      title: 'Material Honesty & Craft',
      desc: 'We prioritize natural Khandagiri sandstone, seasoned Indian teakwood, unlacquered brass, and moisture-resistant marine ply engineered for Odisha’s climate.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#FF8526]" />,
      title: 'Tropical Spatial Flow',
      desc: 'Reinterpreting the traditional Odia courtyard (angan) and cross-ventilation with razor-sharp modernist geometry and expansive double-height volumes.',
    },
    {
      icon: <Sun className="w-5 h-5 text-[#FF8526]" />,
      title: 'Circadian Illumination',
      desc: 'Concealed linear architectural lighting calibrated to solar cycles, sculpting serene warmth from morning light until midnight.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#FF8526]" />,
      title: 'Turnkey Rigor in Odisha',
      desc: 'Seamless execution across Bhubaneswar, Cuttack, and Puri — from structural Vastu compliance and custom joinery to guaranteed 45-day handover.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF3E9] border-t border-[#1A1815]/10 select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#FF8526]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Grid: Text + Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#FF8526]/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF8526] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-century font-semibold text-[#FF8526]">
                Studio Ethos &amp; Heritage
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bounce text-black leading-tight tracking-wide">
              Kalyan Design Studio: Delivering Excellence Across <span className="text-[#FF8526]">Odisha</span>.
            </h2>

            <p className="font-century text-base sm:text-lg text-[#5C564E] leading-relaxed">
              With our projects spanning across residential, commercial and corporate architecture, we, at <strong className="text-black font-semibold">Kalyan Design Studio</strong>, aim to deliver excellence and timeless aesthetics. Our skillful interdisciplinary team engages in diverse styles from contemporary and minimalist to classical or Scandinavian.
            </p>

            <p className="font-century text-sm sm:text-base text-[#68625A] leading-relaxed">
              Our residential offering covers every detail of your home — from space planning to custom modular kitchens, gypsum ceilings, custom wardrobes, and photorealistic 3D visualization. We undertake turnkey end-to-end projects with our handpicked master craftsmen, delivering globally-inspired functional works of art with a 5-year warranty.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#packages"
                className="px-6 py-3 rounded-xl bg-[#FF8526] hover:bg-[#e87417] text-white font-courgette text-xl shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-white border border-[#FF8526]/30 text-[#1A1815] hover:text-[#FF8526] font-century font-bold text-sm shadow-xs hover:border-[#FF8526] transition-all"
              >
                Book Free Site Visit
              </a>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 group">
              <img
                src="/images/kalyan/assets/aboutimg-9X_Cc2-O.png"
                alt="About Kalyan Design Studio Living Architecture"
                className="w-full h-[420px] sm:h-[480px] object-cover vivid-image transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#FF8526]/30 animate-float flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF8526] text-white flex items-center justify-center font-bounce text-2xl font-bold shadow-md">
                12+
              </div>
              <div>
                <h4 className="font-bounce text-base sm:text-lg text-black">Years of Mastery</h4>
                <p className="font-century text-xs text-[#5C564E]">Bhubaneswar, Cuttack &amp; Puri</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-[#1A1815]/10 hover:border-[#FF8526]/60 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF3E9] border border-[#FF8526]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#FF8526] transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-bounce text-[#1A1815] mb-2 tracking-wide group-hover:text-[#FF8526] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Kalyan Studio 4-Step Process Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-century font-bold text-[#FF8526] block mb-2">
              Execution Methodology
            </span>
            <h3 className="text-3xl sm:text-5xl font-bounce text-black">
              Our Proven <span className="text-[#FF8526]">4-Step Process</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-2xl bg-white border border-[#1A1815]/10 relative group hover:border-[#FF8526] hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-4xl font-bounce text-[#FF8526]/30 font-bold block mb-2">01</span>
              <h4 className="text-lg font-century font-bold text-[#1A1815] tracking-wide mb-2">BRIEFING</h4>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] leading-relaxed">
                We begin with an exhaustive questionnaire to fully grasp the vision, lifestyle needs and expectations of the client.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#1A1815]/10 relative group hover:border-[#FF8526] hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-4xl font-bounce text-[#FF8526]/30 font-bold block mb-2">02</span>
              <h4 className="text-lg font-century font-bold text-[#1A1815] tracking-wide mb-2">DESIGN</h4>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] leading-relaxed">
                Translating the brief into blueprint: 2D floor layouts followed by photorealistic 3D visualization with material selection.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#1A1815]/10 relative group hover:border-[#FF8526] hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-4xl font-bounce text-[#FF8526]/30 font-bold block mb-2">03</span>
              <h4 className="text-lg font-century font-bold text-[#1A1815] tracking-wide mb-2">EXECUTION</h4>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] leading-relaxed">
                Where design comes to life. Our handpicked master craftsmen and site supervisors deliver precision within 45 days.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#1A1815]/10 relative group hover:border-[#FF8526] hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-4xl font-bounce text-[#FF8526]/30 font-bold block mb-2">04</span>
              <h4 className="text-lg font-century font-bold text-[#1A1815] tracking-wide mb-2">HANDOVER</h4>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] leading-relaxed">
                Key handover with deep cleaning, 5-year warranty certificate, and ongoing aftercare for peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Metrics Banner */}
        <div className="p-8 lg:p-12 rounded-2xl bg-white border border-[#FF8526]/20 shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1815]/10">
            {AGENCY_STATS.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                <span className="text-3xl sm:text-5xl font-bounce text-[#FF8526] mb-2 tracking-wide">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest font-century font-bold text-[#1A1815]">
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
