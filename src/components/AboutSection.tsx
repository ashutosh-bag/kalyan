'use client';

import React from 'react';
import { AGENCY_STATS } from '@/lib/data';
import { Layers, Sun, ShieldCheck, Gem } from 'lucide-react';

export default function AboutSection() {
  const principles = [
    {
      icon: <Gem className="w-5 h-5 text-[#c8a47e]" />,
      title: 'Material Honesty & Craft',
      desc: 'We prioritize natural Khandagiri sandstone, seasoned Indian teakwood, unlacquered brass, and handwoven textiles that age with graceful dignity in Odisha’s climate.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#c8a47e]" />,
      title: 'Tropical Spatial Flow',
      desc: 'Reinterpreting the traditional Odia courtyard (angan) and cross-ventilation with razor-sharp modernist geometry and expansive double-height volumes.',
    },
    {
      icon: <Sun className="w-5 h-5 text-[#c8a47e]" />,
      title: 'Circadian Illumination',
      desc: 'Concealed linear architectural lighting calibrated to solar cycles, sculpting serene warmth from dawn until midnight.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c8a47e]" />,
      title: 'Turnkey Rigor in Odisha',
      desc: 'Seamless execution across Bhubaneswar, Cuttack, and Puri — from structural Vastu compliance and custom joinery to final handover.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FBF8F3] border-t border-[#1A1815]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-[#1A1815]/10 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68953]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">Studio Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1A1815] leading-tight">
              Rooted in Odia Heritage, Sculpted for Modern Living.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6 text-[#5C564E] font-light leading-relaxed text-base sm:text-lg">
            <p>
              Founded with a conviction to elevate interior architecture across Eastern India, <strong className="text-[#1A1815] font-medium">Studio KYN</strong> blends timeless Indian craftsmanship with clean, international architectural restraint. We create private sanctuaries across Bhubaneswar, Cuttack, and Puri that endure generations.
            </p>
            <p className="text-[#68625A] text-sm sm:text-base">
              Whether conceptualizing a 7,000 sq ft contemporary villa in Patia, revitalizing a riverfront bungalow in CDA Cuttack, or executing executive headquarters in Infocity, our studio manages every nuance — from Vastu-aligned layouts and structural coordination to hand-curated regional stone and bespoke Italian joinery.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-sm bg-white border border-[#1A1815]/10 hover:border-[#B68953]/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-sm bg-[#F7F3EB] border border-[#1A1815]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#B68953] transition-all">
                {item.icon}
              </div>
              <h3 className="text-lg font-serif text-[#1A1815] mb-2 font-medium tracking-wide group-hover:text-[#B68953] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#68625A] font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Metrics Banner */}
        <div className="p-8 lg:p-12 rounded-sm bg-[#EFE9DF] border border-[#1A1815]/10 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1815]/10">
            {AGENCY_STATS.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                <span className="text-3xl sm:text-5xl font-serif font-light text-[#9E7445] mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#68625A] font-light">
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
