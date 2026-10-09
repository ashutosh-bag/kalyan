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
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF3E9] border-t border-[#1A1815]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-[#1A1815]/10 mb-4 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68953]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">Studio Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1A1815] leading-tight">
              Kalyan Design Studio: Delivering Excellence Across Odisha.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6 text-[#5C564E] font-light leading-relaxed text-base sm:text-lg">
            <p>
              With our projects spanning over the spheres of residential, commercial and corporate construction, we, at <strong className="text-[#1A1815] font-medium">Kalyan Design Studio</strong>, aim to deliver excellence and timeless aesthetics. Our skillful interdisciplinary team works closely with our clients and engages in a diverse array of design styles from contemporary, modern, and classical to Scandinavian or baroque — truly a one-of-its-kind service in Bhubaneswar and across Odisha.
            </p>
            <p className="text-[#68625A] text-sm sm:text-base">
              Our full service, residential offering covers every detail of your house's interior designs — from space planning to custom modular kitchens, gypsum false ceilings, bespoke wardrobes, and photorealistic 3D visualization. We undertake turnkey end-to-end projects with our handpicked team of master craftsmen and vendors to deliver globally-inspired, functional works of art.
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

        {/* Kalyan Studio 4-Step Process Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-medium block mb-2">
              Execution Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1815]">
              Our Proven 4-Step Process
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm bg-white/70 border border-[#1A1815]/10 relative group hover:border-[#B68953] transition-all">
              <span className="text-3xl font-serif text-[#B68953]/30 font-bold block mb-2">01</span>
              <h4 className="text-lg font-bold text-[#1A1815] tracking-wide mb-2">BRIEFING</h4>
              <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                We begin with an exhaustive questionnaire to fully grasp the vision, needs and expectations of the Client. Getting the brief right is key to success of the project.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white/70 border border-[#1A1815]/10 relative group hover:border-[#B68953] transition-all">
              <span className="text-3xl font-serif text-[#B68953]/30 font-bold block mb-2">02</span>
              <h4 className="text-lg font-bold text-[#1A1815] tracking-wide mb-2">DESIGN</h4>
              <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                Translating the brief into the design blueprint is the next step. We start with a 2-D floor plan followed by 3-D visualisation of the space to paint a vivid picture of the interiors.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white/70 border border-[#1A1815]/10 relative group hover:border-[#B68953] transition-all">
              <span className="text-3xl font-serif text-[#B68953]/30 font-bold block mb-2">03</span>
              <h4 className="text-lg font-bold text-[#1A1815] tracking-wide mb-2">EXECUTION</h4>
              <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                This is where the design comes to life. We undertake end-to-end projects with our handpicked team of craftsmen and vendors, delivering a globally-inspired functional work of art.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white/70 border border-[#1A1815]/10 relative group hover:border-[#B68953] transition-all">
              <span className="text-3xl font-serif text-[#B68953]/30 font-bold block mb-2">04</span>
              <h4 className="text-lg font-bold text-[#1A1815] tracking-wide mb-2">HANDOVER</h4>
              <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed">
                This marks the culmination of an exciting journey as we handover the keys to their new home. A space set to delight the occupants for years to come.
              </p>
            </div>
          </div>
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
