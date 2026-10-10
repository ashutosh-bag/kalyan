'use client';

import React from 'react';
import { SERVICES } from '@/lib/data';
import { Compass, Palette, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#FF8526]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#FF8526]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FF8526]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#FF8526]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FF8526]" />;
    }
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF3E9] border-t border-[#1A1815]/10 relative select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#FF8526]/30 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8526] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-century font-semibold text-[#FF8526]">
              Full Discipline Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bounce text-black mb-4 tracking-wide">
            Our Signature <span className="text-[#FF8526]">Services</span>
          </h2>
          <p className="text-[#5C564E] text-base sm:text-lg font-century leading-relaxed">
            From initial concept sketches to technical coordination and turnkey delivery across Odisha, we execute with perfection.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#1A1815]/10 hover:border-[#FF8526]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#FFF3E9] border border-[#FF8526]/25 flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF8526] transition-all shadow-xs">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#FF8526] font-century font-bold border border-[#FF8526]/30 px-3.5 py-1 rounded-full bg-[#FFF3E9]">
                    {srv.metric}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bounce text-[#1A1815] group-hover:text-[#FF8526] transition-colors mb-1.5">
                  {srv.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider font-century font-bold text-[#7A7369] mb-4">
                  {srv.subtitle}
                </h4>

                {srv.image && (
                  <div className="w-full h-48 mb-5 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#1A1815]/10 relative group/img">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-108 vivid-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <p className="text-sm text-[#5C564E] font-century leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              {/* Feature items & Action */}
              <div className="border-t border-[#1A1815]/10 pt-6">
                <div className="space-y-2.5 mb-6">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm font-century text-[#4A453F]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF8526] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#packages"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#FFF3E9] hover:bg-[#FF8526] text-[#FF8526] hover:text-white font-courgette text-lg transition-all border border-[#FF8526]/30 hover:border-[#FF8526] shadow-xs hover:shadow-md"
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
