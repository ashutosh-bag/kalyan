'use client';

import React from 'react';
import { SERVICES } from '@/lib/data';
import { Compass, Palette, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#c8a47e]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#c8a47e]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#c8a47e]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#c8a47e]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#c8a47e]" />;
    }
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0d0f14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a47e]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">Full Discipline Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white mb-4">
            Comprehensive Spatial Expertise
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            From initial concept sketches to technical coordination and final turnkey delivery, we execute with architectural rigor.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 sm:p-10 rounded-sm bg-neutral-900/40 border border-white/10 hover:border-[#c8a47e]/50 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#c8a47e] transition-all">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#c8a47e] font-mono border border-[#c8a47e]/30 px-3 py-1 rounded-full">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white font-normal group-hover:text-[#e0c8aa] transition-colors mb-2">
                  {srv.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-light mb-4">
                  {srv.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Feature items */}
              <div className="border-t border-white/10 pt-6 space-y-2.5">
                {srv.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c8a47e] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
