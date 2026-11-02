'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/lib/data';
import { getProjects } from '@/lib/api-client';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Sparkles, 
  Filter,
  Award,
  MessageSquare
} from 'lucide-react';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Smooth Horizontal Carousel State & Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const targetCard = container.children[index] as HTMLElement;
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = container.scrollLeft;
    const card = container.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), projects.length - 1));
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < container.scrollWidth - container.clientWidth - 15);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
    }
  }, [selectedCategory, projects.length]);

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
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9C5427]/10 border border-[#9C5427]/25 text-[#9C5427] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#9C5427]" />
            ATELIER ARCHIVE &amp; PORTFOLIO
          </span>
          <span className="text-xs uppercase tracking-wider text-[#68625A] font-semibold">
            Bhubaneswar • Cuttack • Puri • Koraput
          </span>
        </div>

        {/* Editorial Title & Free Site Assessment Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-[#1A1815]/10 mb-8">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#1A1815] tracking-tight leading-[1.05]">
              CURATED PORTFOLIO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C5427] via-[#B86835] to-[#7A3F1B] italic font-serif lowercase font-normal">
                &amp; completed commissions.
              </span>
            </h2>
            <p className="text-[#5C564E] text-sm sm:text-base max-w-2xl leading-relaxed pt-1">
              Inspect authentic turnkey interior executions crafted with precision joinery, 
              BWR marine ply, Italian statuario marble, and acoustic architectural ceiling systems. 
              Every commission represents 100% on-site completion across Odisha.
            </p>
          </div>

          {/* Quick Consultation Callout */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#9C5427]/20 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9C5427]">Free Site Assessment</span>
                <Award className="w-4 h-4 text-[#9C5427]" />
              </div>
              <p className="text-xs text-[#68625A] mb-4">
                Planning an interior renovation or villa build? Talk directly with our principal interior architect.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="flex-1 text-center py-2.5 px-4 bg-[#9C5427] hover:bg-[#85451D] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Schedule Free Visit
                </Link>
                <a
                  href="https://wa.me/917504041040?text=Hi%20Kalyan%20Design%20Studio%2C%20I%20am%20exploring%20your%20Curated%20Portfolio%20and%20would%20like%20a%20site%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 rounded-full transition-colors"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#1A1815] tracking-tight">46,000+</div>
            <div className="text-xs uppercase tracking-wider text-[#68625A] font-semibold mt-1">Sq. Ft. Transformed</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#9C5427] tracking-tight">100%</div>
            <div className="text-xs uppercase tracking-wider text-[#68625A] font-semibold mt-1">Turnkey Execution</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#1A1815] tracking-tight">10-Year</div>
            <div className="text-xs uppercase tracking-wider text-[#68625A] font-semibold mt-1">Carcass Warranty</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[#1A1815] tracking-tight">45-90</div>
            <div className="text-xs uppercase tracking-wider text-[#68625A] font-semibold mt-1">Days Handover SLA</div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* =================================================================== */}
        {/* SIDE-BY-SIDE SLIDING CAROUSEL WITH SMOOTH SNAP STOP & SIDE ARROW ARCS */}
        {/* =================================================================== */}
        <div className="relative group/slider">

          {/* Left Side Arrow Arc Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className={`absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100`}
            title="Slide to Previous Project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Side Arrow Arc Button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Next project"
            className={`absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100`}
            title="Slide to Next Project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Side-by-Side Sliding Track with Snap Stops */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex items-stretch gap-6 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 sm:px-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj);
                  setActiveGalleryIndex(0);
                }}
                className="snap-start w-[85vw] sm:w-[380px] md:w-[410px] lg:w-[420px] flex-shrink-0 group cursor-pointer rounded-[30px] sm:rounded-[34px] bg-white border border-[#1A1815]/8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-xl flex flex-col justify-between p-4 sm:p-5"
              >
                {/* Image Preview with Hover Zoom */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#1A1815]/5 mb-4">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
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
                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
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

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to ${proj.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx 
                    ? 'w-8 bg-[#9C5427]' 
                    : 'w-2 bg-[#1A1815]/20 hover:bg-[#1A1815]/40'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Explore All Works in Dedicated Gallery Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1A1815] hover:bg-[#9C5427] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all hover:gap-4 cursor-pointer"
          >
            <span>Explore Complete Projects Gallery (36+ Works)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
