'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  MessageSquare,
  Box,
  Eye,
  Building2,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<'interior' | '3d'>('interior');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [cardViewMode, setCardViewMode] = useState<Record<string, '3d' | 'interior'>>({});
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

  // Gallery images for active modal tab
  const activeModalImages = useMemo(() => {
    if (!selectedProject) return [];
    if (modalTab === '3d') {
      return selectedProject.gallery3D && selectedProject.gallery3D.length > 0
        ? selectedProject.gallery3D
        : [selectedProject.exterior3D || selectedProject.image];
    }
    return selectedProject.galleryInteriors && selectedProject.galleryInteriors.length > 0
      ? selectedProject.galleryInteriors
      : selectedProject.gallery;
  }, [selectedProject, modalTab]);

  const nextModalImage = () => {
    if (activeModalImages.length <= 1) return;
    setActiveGalleryIndex((prev) => (prev + 1) % activeModalImages.length);
  };

  const prevModalImage = () => {
    if (activeModalImages.length <= 1) return;
    setActiveGalleryIndex((prev) => (prev - 1 + activeModalImages.length) % activeModalImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight') {
        nextModalImage();
      } else if (e.key === 'ArrowLeft') {
        prevModalImage();
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
  }, [selectedProject, activeModalImages.length]);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Residential', value: 'residential' },
    { label: 'Penthouses', value: 'penthouse' },
    { label: 'Commercial & Gallery', value: 'commercial' },
  ];

  return (
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none scroll-mt-24">
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
              OUR PROJECTS
            </h2>
            <p className="text-[#5C564E] text-sm sm:text-base max-w-2xl leading-relaxed pt-1">
              Explore our architectural commissions across Odisha. Each project features authentic <strong>3D building models</strong> on the exterior alongside complete <strong>turnkey interior executions</strong> crafted inside with Italian statuario marble, acoustic millwork, and master joinery.
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
                  href="https://wa.me/917504041040?text=Hi%20Kalyan%20Design%20Studio%2C%20I%20am%20exploring%20your%20projects%20and%20would%20like%20a%20site%20consultation."
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
            <div className="text-2xl sm:text-3xl font-black text-[#9C5427] tracking-tight">45-90</div>
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
        {/* SIDE-BY-SIDE SLIDING CAROUSEL WITH 3D EXTERIOR & INSIDE INTERIORS */}
        {/* =================================================================== */}
        <div className="relative group/slider">

          {/* Left Side Arrow Arc Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100"
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
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100"
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
            {projects.map((proj) => {
              const currentMode = cardViewMode[proj.id] || '3d';
              const displayImage = currentMode === '3d' 
                ? (proj.exterior3D || proj.image) 
                : (proj.interiorHero || proj.image);
              const insideCount = proj.galleryInteriors ? proj.galleryInteriors.length : proj.gallery.length;

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setModalTab('interior');
                    setActiveGalleryIndex(0);
                  }}
                  className="snap-start w-[85vw] sm:w-[380px] md:w-[410px] lg:w-[420px] flex-shrink-0 group cursor-pointer rounded-[30px] sm:rounded-[34px] bg-white border border-[#1A1815]/8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:shadow-xl flex flex-col justify-between p-4 sm:p-5"
                >
                  {/* Image Preview with 3D/Interior Flip */}
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#1A1815]/5 mb-4 group/img">
                    <img
                      src={displayImage}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Mode Tag (Top Left) */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-md border border-[#1A1815]/10 text-[10px] uppercase tracking-wider font-bold text-[#1A1815] rounded-full shadow-xs flex items-center gap-1.5">
                        {currentMode === '3d' ? (
                          <>
                            <Box className="w-3 h-3 text-[#9C5427]" />
                            <span>3D Structure</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-[#9C5427]" />
                            <span>Inside Work</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Quick Flip Toggle (Top Right) */}
                    <div className="absolute top-3 right-3 z-20 flex items-center bg-black/65 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-md">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCardViewMode(prev => ({ ...prev, [proj.id]: '3d' }));
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                          currentMode === '3d'
                            ? 'bg-[#9C5427] text-white shadow-xs'
                            : 'text-white/75 hover:text-white'
                        }`}
                        title="Show 3D Exterior Elevation"
                      >
                        <Box className="w-2.5 h-2.5" />
                        <span>3D</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCardViewMode(prev => ({ ...prev, [proj.id]: 'interior' }));
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                          currentMode === 'interior'
                            ? 'bg-[#9C5427] text-white shadow-xs'
                            : 'text-white/75 hover:text-white'
                        }`}
                        title="Show Real Executed Interiors"
                      >
                        <Eye className="w-2.5 h-2.5" />
                        <span>Inside ({insideCount})</span>
                      </button>
                    </div>

                    {/* Inspect Overlay Trigger */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-md border border-[#9C5427]/40 rounded-full text-[#1A1815] text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl transform scale-95 group-hover/img:scale-100 transition-transform duration-300">
                        <Eye className="w-4 h-4 text-[#9C5427]" />
                        <span>See Inside Work ({insideCount} Photos)</span>
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

                    {/* Structure Badge & Direct Inside CTA */}
                    <div className="pt-4 mt-4 border-t border-[#1A1815]/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8B7355] truncate">
                        <Building2 className="w-3.5 h-3.5 text-[#9C5427] flex-shrink-0" />
                        <span className="truncate">{proj.structureType || proj.category}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                          setModalTab('interior');
                          setActiveGalleryIndex(0);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#9C5427] bg-[#9C5427]/10 hover:bg-[#9C5427] hover:text-white transition-all cursor-pointer flex-shrink-0"
                      >
                        <span>See Inside</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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

        {/* =================================================================== */}
        {/* MODAL: 3D STRUCTURE & EXECUTED INTERIOR WORK SHOWCASE               */}
        {/* =================================================================== */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-[#FAF7F2] border border-[#1A1815]/15 rounded-3xl shadow-2xl overflow-hidden text-[#1A1815]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Header Bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1A1815]/10 shadow-xs gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1A1815]/15 text-[#1A1815] hover:text-[#9C5427] hover:border-[#9C5427]/50 transition-colors text-xs sm:text-sm font-medium shadow-xs cursor-pointer active:scale-95 flex-shrink-0"
                  aria-label="Back to projects"
                >
                  <ArrowLeft className="w-4 h-4 text-[#9C5427]" />
                  <span>Back</span>
                </button>

                {/* 3D vs Interior Tab Switcher in Modal */}
                <div className="flex items-center bg-white border border-[#1A1815]/12 rounded-full p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setModalTab('3d');
                      setActiveGalleryIndex(0);
                    }}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      modalTab === '3d'
                        ? 'bg-[#9C5427] text-white shadow-xs'
                        : 'text-[#68625A] hover:text-[#1A1815]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Model ({selectedProject.gallery3D ? selectedProject.gallery3D.length : 1})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalTab('interior');
                      setActiveGalleryIndex(0);
                    }}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      modalTab === 'interior'
                        ? 'bg-[#9C5427] text-white shadow-xs'
                        : 'text-[#68625A] hover:text-[#1A1815]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inside Work ({selectedProject.galleryInteriors ? selectedProject.galleryInteriors.length : selectedProject.gallery.length})</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-full bg-white border border-[#1A1815]/15 text-[#1A1815] hover:text-white hover:bg-[#9C5427] flex items-center justify-center transition-colors focus:outline-none shadow-xs cursor-pointer flex-shrink-0"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-8 lg:p-10 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Photo Viewer (Col 1-7) */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#1A1815]/15 bg-[#1A1815] shadow-md group">
                      <img
                        src={activeModalImages[activeGalleryIndex] || selectedProject.image}
                        alt={`${selectedProject.title} ${modalTab === '3d' ? '3D Render' : 'Interior'}`}
                        className="w-full h-full object-cover transition-all duration-300"
                      />

                      {/* Photo Counter Pill */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full border border-white/20">
                        {modalTab === '3d' ? '3D ARCHITECTURE' : 'INTERIOR EXECUTION'} • {activeGalleryIndex + 1} / {activeModalImages.length}
                      </div>

                      {/* Navigation Arrows */}
                      {activeModalImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={prevModalImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#9C5427] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                            title="Previous Image (Left Arrow)"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={nextModalImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#9C5427] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                            title="Next Image (Right Arrow)"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Strip */}
                    {activeModalImages.length > 1 && (
                      <div className="flex space-x-2.5 overflow-x-auto pb-2 no-scrollbar">
                        {activeModalImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveGalleryIndex(i)}
                            className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                              activeGalleryIndex === i 
                                ? 'border-[#9C5427] scale-102 shadow-md ring-2 ring-[#9C5427]/30' 
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="text-[11px] text-[#7A7369] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{modalTab === '3d' ? '3D Exterior Render modeled before on-site construction' : 'Authentic on-site executed interior photography across Odisha'}</span>
                    </div>
                  </div>

                  {/* Project Specs (Col 8-12) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9C5427] font-bold">
                          {selectedProject.category}
                        </span>
                        <span>&bull;</span>
                        <span className="text-xs text-[#7A7369] font-semibold">
                          {selectedProject.structureType || 'Architectural Structure'}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bounce text-[#1A1815]">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9C5427] font-semibold mt-1">
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
                        <span className="text-[11px] uppercase tracking-wider text-[#7A7369] font-semibold block mb-2">
                          Key Material Specifications:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject.materials || []).map((mat, i) => (
                            <span key={i} className="text-xs bg-white border border-[#1A1815]/10 text-[#4A453F] px-3 py-1 rounded-lg">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/contact"
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 inline-flex items-center justify-center py-3.5 bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-sm rounded-full transition-all shadow-md hover:scale-[1.01] cursor-pointer text-center"
                      >
                        Schedule Free Assessment
                      </Link>
                      <a
                        href={`https://wa.me/917504041040?text=Hi%20Kalyan%20Design%20Studio%2C%20I%20am%20inquiring%20about%20your%20project%20${encodeURIComponent(selectedProject.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center py-3.5 px-5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-semibold text-sm rounded-full transition-all text-center"
                      >
                        Chat on WhatsApp
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
