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
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0d0f14] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a47e]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">Studio Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
              Rooted in Odia Heritage, Sculpted for Modern Living.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6 text-neutral-300 font-light leading-relaxed text-base sm:text-lg">
            <p>
              Founded with a conviction to elevate interior architecture across Eastern India, <strong className="text-white font-medium">Studio KYN</strong> blends timeless Indian craftsmanship with clean, international architectural restraint. We create private sanctuaries across Bhubaneswar, Cuttack, and Puri that endure generations.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base">
              Whether conceptualizing a 7,000 sq ft contemporary villa in Patia, revitalizing a riverfront bungalow in CDA Cuttack, or executing executive headquarters in Infocity, our studio manages every nuance — from Vastu-aligned layouts and structural coordination to hand-curated regional stone and bespoke Italian joinery.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-sm bg-neutral-900/40 border border-white/10 hover:border-[#c8a47e]/50 hover:bg-neutral-900/80 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#c8a47e] transition-all">
                {item.icon}
              </div>
              <h3 className="text-lg font-serif text-white mb-2 font-medium tracking-wide group-hover:text-[#e0c8aa] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Metrics Banner */}
        <div className="p-8 lg:p-12 rounded-sm bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {AGENCY_STATS.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                <span className="text-3xl sm:text-5xl font-serif font-light text-[#e0c8aa] mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
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
