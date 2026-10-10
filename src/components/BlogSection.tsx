'use client';

import React from 'react';
import { BLOG_POSTS } from '@/lib/data';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export default function BlogSection() {
  return (
    <section id="blog" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0b0d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8526] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF8526] font-century font-bold">Studio Journal &amp; Insights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bounce text-white tracking-wide">
              Interior Design <span className="text-[#FF8526]">Perspectives</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-century mt-2 max-w-xl leading-relaxed">
              Insights on color psychology, spatial harmony, and contemporary living by Kalyan Design Studio.
            </p>
          </div>
          
          <div className="text-xs uppercase tracking-widest text-[#FF8526] font-century font-bold">
            Kalyan Design Studio Journal
          </div>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-[#FF8526]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_12px_35px_rgba(255,133,38,0.15)]"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 vivid-image"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider font-century font-bold text-[#FF8526] rounded-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-neutral-400 font-century mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FF8526]" />
                      <span>{post.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF8526]" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bounce text-white group-hover:text-[#FF8526] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-century leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read Link */}
              <div className="p-6 pt-0 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#FF8526]/40"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-white font-medium">{post.author.name}</span>
                    <span className="text-[10px] text-neutral-400 font-light">{post.author.role}</span>
                  </div>
                </div>

                <div className="p-2 text-neutral-400 group-hover:text-[#FF8526] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
