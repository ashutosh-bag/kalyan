'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/lib/data';
import { getProjects } from '@/lib/api-client';
import { X, ArrowRight, ArrowLeft, MapPin, Calendar, Maximize2, Sparkles, Filter } from 'lucide-react';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Penthouses', value: 'penthouse' },
    { label: 'Commercial & Gallery', value: 'commercial' },
    { label: 'Hospitality', value: 'hospitality' },
  ];

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                SELECTED COMMISSIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] tracking-tight leading-tight">
              CURATED PORTFOLIO.
            </h2>
            <p className="text-[#68625A] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Real turnkey commissions executed across Bhubaneswar, Cuttack, and Puri with bespoke joinery and flawless finish.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#9C5427] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#68625A] border border-[#1A1815]/8 hover:border-[#9C5427]/40 hover:text-[#9C5427] font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProject(proj);
                setActiveGalleryIndex(0);
              }}
              className="group cursor-pointer rounded-[30px] sm:rounded-[34px] bg-white border border-[#1A1815]/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-xl flex flex-col p-4 sm:p-5"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#1A1815]/5 mb-4">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md border border-[#1A1815]/5 text-[10px] uppercase tracking-wider font-bold text-[#1A1815] rounded-full shadow-xs">
                    {proj.category}
                  </span>
                </div>

                {/* Inspect Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3.5 bg-white/95 border border-[#9C5427] rounded-full text-[#1A1815] transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <Maximize2 className="w-5 h-5 text-[#9C5427]" />
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-[#68625A] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9C5427]" />
                    <span>{proj.location}</span>
                    <span>&bull;</span>
                    <Calendar className="w-3.5 h-3.5 text-[#9C5427]" />
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="text-xl font-bounce text-[#1A1815] group-hover:text-[#9C5427] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C564E] mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Materials preview */}
                <div className="pt-4 mt-4 border-t border-[#1A1815]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {(proj.materials || []).slice(0, 2).map((m, i) => (
                      <span key={i} className="text-[11px] text-[#5C564E] bg-[#FFF3E9] border border-[#9C5427]/15 px-2.5 py-0.5 rounded-lg">
                        {m}
                      </span>
                    ))}
                    {(proj.materials || []).length > 2 && (
                      <span className="text-[11px] text-[#5C564E] bg-[#FFF3E9] border border-[#9C5427]/15 px-2 py-0.5 rounded-lg">
                        +{(proj.materials || []).length - 2}
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-[#9C5427] flex items-center group-hover:translate-x-1 transition-transform">
                    View Case <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project Detail & Gallery */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FAF7F2] border border-[#1A1815]/15 rounded-2xl shadow-2xl overflow-hidden text-[#1A1815]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Header Bar with Back Button & Close */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1A1815]/10 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1A1815]/15 text-[#1A1815] hover:text-[#9C5427] hover:border-[#9C5427]/50 transition-colors text-xs sm:text-sm font-medium shadow-xs cursor-pointer active:scale-95"
                  aria-label="Back to projects"
                >
                  <ArrowLeft className="w-4 h-4 text-[#9C5427]" />
                  <span>Back to Projects</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-[#8B7355] font-semibold bg-white/80 px-2.5 py-1 rounded-md border border-[#1A1815]/10">
                    {selectedProject.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="w-9 h-9 rounded-full bg-white border border-[#1A1815]/15 text-[#1A1815] hover:text-white hover:bg-[#9C5427] flex items-center justify-center transition-colors focus:outline-none shadow-xs cursor-pointer"
                    aria-label="Close project modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-8 lg:p-10 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Gallery Showcase (Col 1-7) */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#1A1815]/15 bg-[#1A1815]">
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
                        className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                          activeGalleryIndex === 0 ? 'border-[#9C5427] scale-102 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={selectedProject.image} alt="Thumbnail Cover" className="w-full h-full object-cover" />
                      </button>
                      {selectedProject.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveGalleryIndex(i + 1)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                            activeGalleryIndex === i + 1 ? 'border-[#9C5427] scale-102 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
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
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#9C5427] font-semibold ">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bounce text-[#1A1815] mt-1">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9C5427] font-medium mt-1">
                        {selectedProject.location} {selectedProject.year ? `• ${selectedProject.year}` : ''} {selectedProject.areaSqFt ? `• ${selectedProject.areaSqFt.toLocaleString()} sq ft` : ''}
                      </p>
                    </div>

                    <div className="space-y-4 text-[#5C564E] text-xs sm:text-sm leading-relaxed border-t border-b border-[#1A1815]/10 py-4">
                      <p>{selectedProject.description}</p>
                      {selectedProject.client && (
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-[#7A7369] font-semibold block mb-1">
                            Commissioning Client:
                          </span>
                          <span className="text-[#1A1815] font-medium">{selectedProject.client}</span>
                        </div>
                      )}
                    </div>

                    {/* Materials palette */}
                    {(selectedProject.materials || []).length > 0 && (
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#7A7369] font-semibold block mb-2 ">
                          Key Material Specifications:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.materials || []).map((mat, i) => (
                            <span key={i} className="text-xs bg-white border border-[#1A1815]/10 text-[#4A453F] px-3 py-1 rounded-lg ">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="inline-flex items-center justify-center py-3 px-4 bg-white border border-[#1A1815]/15 hover:bg-[#1A1815]/5 text-[#1A1815] font-medium text-sm rounded-xl transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2 text-[#9C5427]" />
                        Back to Projects
                      </button>
                      <a
                        href="#packages"
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 inline-flex items-center justify-center py-3.5 bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-base rounded-xl transition-all shadow-lg hover:scale-[1.01] cursor-pointer text-center"
                      >
                        Get Quote on this Project
                      </a>
                    </div>
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
