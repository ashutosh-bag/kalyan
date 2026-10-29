'use client';

import React from 'react';
import { SERVICES } from '@/lib/data';
import { Compass, Palette, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#9C5427]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#9C5427]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#9C5427]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#9C5427]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#9C5427]" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px] bg-[#9C5427]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
              FULL DISCIPLINE CAPABILITIES
            </span>
            <span className="w-6 h-[1.5px] bg-[#9C5427]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] mb-3 tracking-tight">
            OUR SIGNATURE SERVICES.
          </h2>
          <p className="text-[#68625A] text-sm sm:text-base leading-relaxed">
            From initial concept sketches to technical coordination and turnkey delivery across Odisha, we execute with perfection.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-7 sm:p-9 rounded-[30px] sm:rounded-[36px] bg-white border border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#1A1815]/8 flex items-center justify-center text-[#9C5427] group-hover:scale-105 transition-all shadow-xs">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#9C5427] font-bold border border-[#1A1815]/8 px-3.5 py-1 rounded-full bg-[#FAF8F5]">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1815] group-hover:text-[#9C5427] transition-colors mb-1">
                  {srv.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#7A7369] mb-4">
                  {srv.subtitle}
                </h4>

                {srv.image && (
                  <div className="w-full h-48 mb-5 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#1A1815]/8 relative group/img">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <p className="text-sm text-[#68625A] leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Feature items & Action */}
              <div className="border-t border-[#1A1815]/8 pt-5">
                <div className="space-y-2 mb-6">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm text-[#1A1815]">
                      <CheckCircle2 className="w-4 h-4 text-[#9C5427] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#packages"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FAF8F5] hover:bg-[#9C5427] text-[#1A1815] hover:text-white font-medium text-sm transition-all border border-[#1A1815]/8 shadow-xs hover:shadow-sm"
                >
                  <span>Get Quote on {srv.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
