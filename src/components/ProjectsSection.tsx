'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/lib/data';
import { getProjects } from '@/lib/api-client';
import { X, ArrowRight, MapPin, Calendar, Maximize2, Sparkles, Filter } from 'lucide-react';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFiltered() {
      setLoading(true);
      try {
        const data = await getProjects(selectedCategory);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFiltered();
  }, [selectedCategory]);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Penthouses', value: 'penthouse' },
    { label: 'Commercial & Gallery', value: 'commercial' },
    { label: 'Hospitality', value: 'hospitality' },
  ];

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0b0d] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a47e]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white">
              Curated Portfolio
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light mt-2 max-w-xl">
              An international collection of bespoke private sanctuaries and monumental corporate environments.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-[#c8a47e] text-neutral-950 font-semibold shadow-[0_0_15px_rgba(200,164,126,0.3)]'
                    : 'bg-neutral-900/60 text-neutral-400 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                setActiveGalleryIndex(0);
              }}
              className="group cursor-pointer rounded-sm bg-neutral-900/50 border border-white/10 hover:border-[#c8a47e]/60 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden bg-neutral-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.2em] font-medium text-[#e0c8aa] rounded-sm">
                    {proj.category}
                  </span>
                </div>

                {/* Inspect Overlay */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-neutral-900/90 border border-[#c8a47e]/60 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                    <Maximize2 className="w-5 h-5 text-[#c8a47e]" />
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-light mb-1.5">
                    <MapPin className="w-3 h-3 text-[#c8a47e]" />
                    <span>{proj.location}</span>
                    <span>&bull;</span>
                    <Calendar className="w-3 h-3 text-[#c8a47e]" />
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-white group-hover:text-[#e0c8aa] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Materials preview */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.materials.slice(0, 2).map((m, i) => (
                      <span key={i} className="text-[10px] text-neutral-400 font-light bg-white/5 px-2 py-0.5 rounded-sm">
                        {m}
                      </span>
                    ))}
                    {proj.materials.length > 2 && (
                      <span className="text-[10px] text-neutral-400 font-light bg-white/5 px-1.5 py-0.5 rounded-sm">
                        +{proj.materials.length - 2}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#c8a47e] font-light flex items-center group-hover:translate-x-1 transition-transform">
                    View Case <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project Detail & Gallery */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-white/20 rounded-sm shadow-2xl p-6 sm:p-8 lg:p-10">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-[#c8a47e] transition-colors focus:outline-none"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Gallery Showcase (Col 1-7) */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-neutral-900">
                    <img
                      src={
                        activeGalleryIndex === 0
                          ? selectedProject.image
                          : selectedProject.gallery[activeGalleryIndex - 1] || selectedProject.image
                      }
                      alt={selectedProject.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveGalleryIndex(0)}
                      className={`relative w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeGalleryIndex === 0 ? 'border-[#c8a47e]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={selectedProject.image} alt="Thumbnail Cover" className="w-full h-full object-cover" />
                    </button>
                    {selectedProject.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i + 1)}
                        className={`relative w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeGalleryIndex === i + 1 ? 'border-[#c8a47e]' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Specs (Col 8-12) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-white mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-[#c8a47e] font-light mt-1">
                      {selectedProject.location} &bull; {selectedProject.year} &bull; {selectedProject.areaSqFt.toLocaleString()} sq ft
                    </p>
                  </div>

                  <div className="space-y-4 text-neutral-300 text-xs sm:text-sm font-light leading-relaxed border-t border-b border-white/10 py-4">
                    <p>{selectedProject.description}</p>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                        Commissioning Client:
                      </span>
                      <span className="text-white font-medium">{selectedProject.client}</span>
                    </div>
                  </div>

                  {/* Materials palette */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-2">
                      Key Material Specifications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.materials.map((mat, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 text-neutral-200 px-3 py-1 rounded-sm">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center justify-center w-full py-3 bg-[#c8a47e] hover:bg-[#e0c8aa] text-neutral-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors shadow-lg"
                    >
                      Inquire About Similar Commission
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
