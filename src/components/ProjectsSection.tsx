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
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F4EE] border-t border-[#1A1815]/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-[#1A1815]/10 mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B68953]"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1A1815]">
              Curated Portfolio
            </h2>
            <p className="text-[#5C564E] text-sm sm:text-base font-light mt-2 max-w-xl">
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
                    ? 'bg-[#B68953] text-white font-semibold shadow-sm'
                    : 'bg-white/90 text-[#68625A] border border-[#1A1815]/10 hover:border-[#B68953]/40 hover:text-[#1A1815]'
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
              className="group cursor-pointer rounded-sm bg-white border border-[#1A1815]/10 hover:border-[#B68953]/60 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-md hover:shadow-xl flex flex-col"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#1A1815]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.2em] font-medium text-[#DFC5A4] rounded-sm">
                    {proj.category}
                  </span>
                </div>

                {/* Inspect Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/90 border border-[#B68953]/60 rounded-full text-[#1A1815] transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <Maximize2 className="w-5 h-5 text-[#B68953]" />
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-[#68625A] font-light mb-1.5">
                    <MapPin className="w-3 h-3 text-[#B68953]" />
                    <span>{proj.location}</span>
                    <span>&bull;</span>
                    <Calendar className="w-3 h-3 text-[#B68953]" />
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="text-xl font-serif font-normal text-[#1A1815] group-hover:text-[#B68953] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#68625A] font-light mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Materials preview */}
                <div className="pt-4 mt-4 border-t border-[#1A1815]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.materials.slice(0, 2).map((m, i) => (
                      <span key={i} className="text-[10px] text-[#5C564E] font-light bg-[#F7F3EB] border border-[#1A1815]/5 px-2 py-0.5 rounded-sm">
                        {m}
                      </span>
                    ))}
                    {proj.materials.length > 2 && (
                      <span className="text-[10px] text-[#5C564E] font-light bg-[#F7F3EB] border border-[#1A1815]/5 px-1.5 py-0.5 rounded-sm">
                        +{proj.materials.length - 2}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#B68953] font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    View Case <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project Detail & Gallery */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#FAF7F2] border border-[#1A1815]/15 rounded-sm shadow-2xl p-6 sm:p-8 lg:p-10 text-[#1A1815]">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/90 border border-[#1A1815]/15 text-[#1A1815] hover:text-white hover:bg-[#B68953] transition-colors focus:outline-none shadow-sm"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Gallery Showcase (Col 1-7) */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[#1A1815]/15 bg-[#1A1815]">
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
                        activeGalleryIndex === 0 ? 'border-[#B68953]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={selectedProject.image} alt="Thumbnail Cover" className="w-full h-full object-cover" />
                    </button>
                    {selectedProject.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i + 1)}
                        className={`relative w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeGalleryIndex === i + 1 ? 'border-[#B68953]' : 'border-transparent opacity-60 hover:opacity-100'
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
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#1A1815] mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-[#B68953] font-medium mt-1">
                      {selectedProject.location} &bull; {selectedProject.year} &bull; {selectedProject.areaSqFt.toLocaleString()} sq ft
                    </p>
                  </div>

                  <div className="space-y-4 text-[#5C564E] text-xs sm:text-sm font-light leading-relaxed border-t border-b border-[#1A1815]/10 py-4">
                    <p>{selectedProject.description}</p>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7369] block mb-1">
                        Commissioning Client:
                      </span>
                      <span className="text-[#1A1815] font-medium">{selectedProject.client}</span>
                    </div>
                  </div>

                  {/* Materials palette */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7A7369] block mb-2">
                      Key Material Specifications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.materials.map((mat, i) => (
                        <span key={i} className="text-xs bg-white border border-[#1A1815]/10 text-[#4A453F] px-3 py-1 rounded-sm">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center justify-center w-full py-3 bg-[#B68953] hover:bg-[#9E7445] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-colors shadow-lg"
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
