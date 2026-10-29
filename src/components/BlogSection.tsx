'use client';

import React from 'react';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                STUDIO JOURNAL &amp; INSIGHTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] tracking-tight leading-tight">
              INTERIOR DESIGN PERSPECTIVES.
            </h2>
            <p className="text-[#68625A] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Insights on color psychology, spatial harmony, and contemporary living by Kalyan Design Studio.
            </p>
          </div>
          
          <div className="text-xs uppercase tracking-widest text-[#7A7369] font-semibold">
            Kalyan Design Studio Journal
          </div>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-[30px] sm:rounded-[34px] bg-white border border-[#1A1815]/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-xl p-4 sm:p-5"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#1A1815]/5 mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-md border border-[#1A1815]/5 text-[10px] uppercase tracking-wider font-bold text-[#1A1815] rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="px-2">
                  <div className="flex items-center space-x-3 text-xs text-[#7A7369] mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{post.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1A1815] group-hover:text-[#9C5427] transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#68625A] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action */}
              <div className="px-2 pt-2 border-t border-[#1A1815]/6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9C5427] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#9C5427] group-hover:text-white flex items-center justify-center text-[#1A1815] transition-colors text-xs shadow-xs">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
