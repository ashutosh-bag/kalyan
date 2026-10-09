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
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF3E9] border-t border-[#1A1815]/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-[#1A1815]/10 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68953]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">Full Discipline Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1A1815] mb-4">
            Comprehensive Spatial Expertise
          </h2>
          <p className="text-[#5C564E] text-sm sm:text-base font-light">
            From initial concept sketches to technical coordination and final turnkey delivery, we execute with architectural rigor.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 sm:p-10 rounded-sm bg-white border border-[#1A1815]/10 hover:border-[#B68953]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-sm bg-[#F7F3EB] border border-[#1A1815]/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#B68953] transition-all">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#B68953] font-mono border border-[#B68953]/30 px-3 py-1 rounded-full bg-[#FAF7F2]">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#1A1815] font-normal group-hover:text-[#B68953] transition-colors mb-2">
                  {srv.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-[#7A7369] font-light mb-4">
                  {srv.subtitle}
                </h4>

                {srv.image && (
                  <div className="w-full h-44 mb-4 rounded-sm overflow-hidden bg-[#FAF7F2] border border-[#1A1815]/10 relative">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#5C564E] font-light leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Feature items */}
              <div className="border-t border-[#1A1815]/10 pt-6 space-y-2.5">
                {srv.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-[#4A453F] font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B68953] flex-shrink-0" />
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
