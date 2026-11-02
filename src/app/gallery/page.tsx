'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PROJECTS, GALLERY_PHOTOS, STUDIO_INFO } from '@/lib/data';
import { Project, GalleryPhoto } from '@/lib/types';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Filter, 
  MapPin, 
  Calendar, 
  Layers, 
  ArrowUpRight, 
  Search, 
  CheckCircle2, 
  Building2, 
  Eye, 
  Grid3X3, 
  LayoutList, 
  Compass, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Check,
  Award,
  SlidersHorizontal,
  Home,
  Bed,
  UtensilsCrossed,
  Sparkle,
  Play,
  Pause
} from 'lucide-react';

// Enhanced Project representation with curated architectural specifications
interface EnhancedProjectSpecs {
  turnaroundDays: number;
  scope: string[];
  keyHighlights: string[];
}

const PROJECT_EXTENDED_SPECS: Record<string, EnhancedProjectSpecs> = {
  'kyn-proj-01': {
    turnaroundDays: 75,
    scope: ['Full Living & Dining Hall', 'Modular Kitchen with Breakfast Bar', 'Master Suite & Walk-in Wardrobe', 'Acoustic Fluted Ceiling'],
    keyHighlights: ['Italian Statuario Double-Height Niche', 'Circadian 2700K Warm Perimeter Coves', 'Zero-Formaldehyde BWR Marine Ply', 'Custom Teak Dining Console'],
  },
  'kyn-proj-02': {
    turnaroundDays: 60,
    scope: ['Living Room TV Niche', 'Bespoke Bar Counter', 'Kids Bedroom & Study', 'False Ceiling with Magnetic Tracks'],
    keyHighlights: ['Calacatta Gold Quartz Waterfall Island', 'Charcoal Acoustic Fluted Panelling', 'Brushed Brass Joinery Inlays', 'Anti-Glare Architectural Downlights'],
  },
  'kyn-proj-03': {
    turnaroundDays: 45,
    scope: ['Client Reception Lounge', 'Ergonomic Hair & Spa Styling Stations', 'VIP Private Treatment Suites', 'Ambient Mirror Stations'],
    keyHighlights: ['High-Traffic Composite Terrazzo', 'Backlit Fluted Ambient Halo Mirrors', 'Acoustic Perforated Baffles', 'Low-VOC Washable Satin Finish'],
  },
  'kyn-proj-04': {
    turnaroundDays: 90,
    scope: ['Duplex Living & Double-Height Atrium', 'Glass Staircase Wall Joinery', 'Entertainment & Home Cinema Suite', 'Parent Master Bedroom'],
    keyHighlights: ['Floating Media Credenza with Concealed Wiring', 'Burma Teak Handrails & Fluted Louvers', '8-Layer PU Lacquered Finish', 'Vitrified 4x2 Porcelain Slabs'],
  },
  'kyn-proj-05': {
    turnaroundDays: 55,
    scope: ['Minimalist Master Suite', 'Concealed Wardrobe Wall', 'Guest Bedroom Decor', 'Living Room Modular Layout'],
    keyHighlights: ['Floor-to-Ceiling Soft-Close Wardrobes', 'Anti-Fungal Marine Ply Substrate', 'Integrated Headboard Reading Sconces', 'Gypsum Perimeter Floating Coves'],
  },
  'kyn-proj-06': {
    turnaroundDays: 65,
    scope: ['Corporate MD & Boardroom Suite', 'Open-Plan Collaborative Workstations', 'Visitor Reception & Brand Wall', 'Pantry & Breakout Zone'],
    keyHighlights: ['Acoustic Micro-Perforated Mineral Tiles', '12mm Toughened Frameless Glass', 'Modular Ergonomic Power Raceways', 'Commercial Anti-Static Nylon Carpet'],
  },
  'kyn-proj-07': {
    turnaroundDays: 80,
    scope: ['River-Facing Veranda Lounge', 'Traditional Odia Courtyard Lounge', 'Modular Kitchen & Utility', '3 Ensuite Master Bedrooms'],
    keyHighlights: ['Honed Natural Black Granite Accents', 'Seasoned Teak Timber Wall Panelling', 'Cross-Ventilation Louvered Joinery', 'Exterior Weather-Proof Polymer Coating'],
  },
  'kyn-proj-08': {
    turnaroundDays: 70,
    scope: ['Heritage Bungalow Modernization', 'Living Room Restoration', 'Mandir Prayer Sanctum', 'Family Dining & Library'],
    keyHighlights: ['Terracotta Tile Feature Wall', 'Solid Brass Filigree Hardware', 'Concealed LED Warm Halo Lights', 'Custom Cane & Teak Wardrobe Shutters'],
  },
};

const STREAM_ROW_1 = [
  { url: '/images/casa-noir/hero-living.jpg', title: 'Curved Lounge & Greenery', loc: 'Bhubaneswar Villa' },
  { url: '/images/casa-noir/bedroom.jpg', title: 'Fluted Acoustic Bed Suite', loc: 'Patia Duplex' },
  { url: '/images/kalyan/gallery/photo4.png', title: 'Monolithic Calacatta Chef Kitchen', loc: 'Chandrasekharpur' },
  { url: '/images/casa-noir/urban-wood.jpg', title: 'Solid Oak Dining & Olive Foliage', loc: 'Cuttack Penthouse' },
  { url: '/images/kalyan/gallery/photo19.png', title: 'Mahanadi Riverfront Living Room', loc: 'CDA Cuttack' },
  { url: '/images/casa-noir/cozy-living.jpg', title: 'Sunlit Reading Nook & Monstera', loc: 'Puri Beachside' },
];

const STREAM_ROW_2 = [
  { url: '/images/casa-noir/floating-shelf.jpg', title: 'Artisanal Ceramic & Oak Console', loc: 'Kalyan Craft Archive' },
  { url: '/images/kalyan/gallery/photo15.png', title: 'Open-Air Coastal Spa Bath', loc: 'Puri Marine Drive' },
  { url: '/images/casa-noir/decor-pampas.jpg', title: 'Pampas Botanical Console Corner', loc: 'Saheed Nagar' },
  { url: '/images/kalyan/gallery/photo6.png', title: 'Fluted Teak Wall & Library Niche', loc: 'Bhubaneswar' },
  { url: '/images/casa-noir/lighting-plant.jpg', title: 'Circadian Pendant & Foliage Studio', loc: 'Jaydev Vihar' },
  { url: '/images/kalyan/gallery/photo11.png', title: 'Cantilevered Teak & Glass Staircase', loc: 'Patia Duplex' },
];

export default function GalleryPage() {
  // Kinetic Marquee Filmstrip State
  const [marqueeSpeed, setMarqueeSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const getMarqueeDuration = () => {
    if (marqueeSpeed === 'slow') return '60s';
    if (marqueeSpeed === 'fast') return '28s';
    return '42s';
  };

  // Category Filtering for Curated Projects
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'editorial' | 'masonry'>('editorial');

  // Interactive Card Multi-Angle Preview State (map of project.id -> active image url)
  const [activeCardImage, setActiveCardImage] = useState<Record<string, string>>({});

  // Expandable Architectural Specs Drawer (project.id -> boolean)
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});

  // Cinema Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProjectForModal, setActiveProjectForModal] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [lightboxImagesList, setLightboxImagesList] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [lightboxSubtitle, setLightboxSubtitle] = useState<string>('');

  // Continuous Stream Room Filter
  const [streamCategory, setStreamCategory] = useState<string>('all');

  // Categories config
  const categories = [
    { label: 'All Commissions', value: 'all', count: PROJECTS.length },
    { label: 'Residential Residences', value: 'residential', count: PROJECTS.filter(p => p.category === 'residential').length },
    { label: 'Penthouses & Duplexes', value: 'penthouse', count: PROJECTS.filter(p => p.category === 'penthouse').length },
    { label: 'Commercial & Retail', value: 'commercial', count: PROJECTS.filter(p => p.category === 'commercial').length },
  ];

  // Filtered Curated Projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        (proj.client && proj.client.toLowerCase().includes(q)) ||
        (proj.materials && proj.materials.some(m => m.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle switching angle on a card
  const handleAngleSelect = (projectId: string, imageUrl: string) => {
    setActiveCardImage(prev => ({ ...prev, [projectId]: imageUrl }));
  };

  // Toggle specs accordion
  const toggleSpecs = (projectId: string) => {
    setExpandedSpecs(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  // Open Cinema Lightbox for a Curated Project
  const openProjectLightbox = (project: Project, initialIndex = 0) => {
    const allImages = [project.image, ...(project.gallery || [])];
    setActiveProjectForModal(project);
    setLightboxImagesList(allImages);
    setModalImageIndex(initialIndex);
    setLightboxTitle(project.title);
    setLightboxSubtitle(`${project.location} • ${project.areaSqFt ? `${project.areaSqFt.toLocaleString()} Sq. Ft.` : ''} • Turnkey Interior`);
    setLightboxOpen(true);
  };

  // Open Cinema Lightbox for a generic stream photo
  const openPhotoLightbox = (photo: GalleryPhoto) => {
    setActiveProjectForModal(null);
    setLightboxImagesList([photo.image]);
    setModalImageIndex(0);
    setLightboxTitle(photo.title);
    setLightboxSubtitle('Curated Interior Photography • Kalyan Design Studio');
    setLightboxOpen(true);
  };

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, modalImageIndex, lightboxImagesList.length]);

  const nextLightboxImage = () => {
    if (lightboxImagesList.length <= 1) return;
    setModalImageIndex((prev) => (prev + 1) % lightboxImagesList.length);
  };

  const prevLightboxImage = () => {
    if (lightboxImagesList.length <= 1) return;
    setModalImageIndex((prev) => (prev - 1 + lightboxImagesList.length) % lightboxImagesList.length);
  };

  // Categorized stream photos
  const filteredStreamPhotos = useMemo(() => {
    if (streamCategory === 'all') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter(p => p.category === streamCategory);
  }, [streamCategory]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1815] selection:bg-[#9C5427] selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      <main className="relative pt-28 sm:pt-36 pb-24">
        
        {/* =================================================================== */}
        {/* 1. KINETIC PORTFOLIO STREAM SHOWCASE (GALLERY)                      */}
        {/* =================================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
          
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

          {/* Header & Speed Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#1A1815]/10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-6 h-[1.5px] bg-[#9C5427]" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                  KINETIC PORTFOLIO STREAM
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#1A1815] tracking-tight leading-tight">
                GALLERY
              </h1>
              <p className="text-xs sm:text-sm text-[#5C564E] mt-1.5 max-w-xl">
                Live portfolio filmstrip of turnkey apartments, penthouses, and bespoke villas across Odisha.
              </p>
            </div>

            {/* Marquee Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-[#9C5427]/20 rounded-full p-1 text-xs shadow-xs">
                {(['slow', 'normal', 'fast'] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setMarqueeSpeed(spd)}
                    className={`px-3 py-1 rounded-full capitalize transition-colors cursor-pointer ${
                      marqueeSpeed === spd 
                        ? 'bg-[#1C1917] text-white font-medium shadow-xs' 
                        : 'text-[#68625A] hover:text-[#1A1815]'
                    }`}
                  >
                    {spd === 'slow' ? '0.6x' : spd === 'normal' ? '1.0x' : '1.4x'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                aria-label={isMarqueePaused ? 'Play stream' : 'Pause stream'}
                className="w-8 h-8 rounded-full bg-white border border-[#9C5427]/20 flex items-center justify-center text-[#1A1815] hover:bg-[#9C5427] hover:text-white transition-colors shadow-xs cursor-pointer"
                title={isMarqueePaused ? 'Play Stream' : 'Pause Stream'}
              >
                {isMarqueePaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Marquee Row 1 (Sliding Left) with Soft Edge Vignette Masks */}
          <div className="relative w-full overflow-hidden mb-5">
            {/* Side Fade Gradient Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

            <div 
              className="animate-marquee-left gap-5"
              style={{ 
                animationDuration: getMarqueeDuration(),
                animationPlayState: isMarqueePaused ? 'paused' : 'running'
              }}
            >
              {[...STREAM_ROW_1, ...STREAM_ROW_1].map((img, index) => (
                <div
                  key={`r1-${index}`}
                  onClick={() => openPhotoLightbox({
                    id: 1000 + index,
                    title: `${img.title} (${img.loc})`,
                    image: img.url,
                    category: 'living',
                  })}
                  className="group relative w-72 sm:w-80 md:w-96 h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#9C5427]/20 flex-shrink-0 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[#9C5427]/60 hover:shadow-xl"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Floating Eye Inspect Pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#1A1815] flex items-center justify-center shadow-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Text Pill */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#FF9E4A] uppercase tracking-wider block mb-0.5">
                      {img.loc}
                    </span>
                    <h5 className="text-sm font-playfair font-bold text-white truncate drop-shadow">
                      {img.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Sliding Right) with Soft Edge Vignette Masks */}
          <div className="relative w-full overflow-hidden">
            {/* Side Fade Gradient Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

            <div 
              className="animate-marquee-right gap-5"
              style={{ 
                animationDuration: getMarqueeDuration(),
                animationPlayState: isMarqueePaused ? 'paused' : 'running'
              }}
            >
              {[...STREAM_ROW_2, ...STREAM_ROW_2].map((img, index) => (
                <div
                  key={`r2-${index}`}
                  onClick={() => openPhotoLightbox({
                    id: 2000 + index,
                    title: `${img.title} (${img.loc})`,
                    image: img.url,
                    category: 'kitchen',
                  })}
                  className="group relative w-72 sm:w-80 md:w-96 h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#9C5427]/20 flex-shrink-0 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[#9C5427]/60 hover:shadow-xl"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Floating Eye Inspect Pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#1A1815] flex items-center justify-center shadow-md">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Text Pill */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#FF9E4A] uppercase tracking-wider block mb-0.5">
                      {img.loc}
                    </span>
                    <h5 className="text-sm font-playfair font-bold text-white truncate drop-shadow">
                      {img.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* =================================================================== */}
        {/* INTERACTIVE CONTROL BAR: Filters, Search, View Mode */}
        {/* =================================================================== */}
        <section className="sticky top-20 z-30 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
          <div className="p-3 sm:p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#1A1815]/10 shadow-[0_10px_35px_rgba(26,24,21,0.06)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    selectedCategory === cat.value
                      ? 'bg-[#9C5427] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#68625A] hover:bg-[#FAF7F2]/80 hover:text-[#9C5427] border border-[#1A1815]/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.value ? 'bg-white/25 text-white' : 'bg-[#1A1815]/10 text-[#68625A]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input & View Switcher */}
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#7A7369] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city, marble, teak..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[#FAF7F2] border border-[#1A1815]/10 text-[#1A1815] placeholder-[#7A7369] focus:outline-none focus:border-[#9C5427]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7369] hover:text-[#1A1815]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-[#FAF7F2] border border-[#1A1815]/10 p-1 rounded-full">
                <button
                  onClick={() => setViewMode('editorial')}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === 'editorial' ? 'bg-[#9C5427] text-white shadow-xs' : 'text-[#68625A] hover:text-[#1A1815]'
                  }`}
                  title="Editorial Monograph View"
                  aria-label="Editorial Monograph View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    viewMode === 'masonry' ? 'bg-[#9C5427] text-white shadow-xs' : 'text-[#68625A] hover:text-[#1A1815]'
                  }`}
                  title="Masonry Photo Grid View"
                  aria-label="Masonry Photo Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* =================================================================== */}
        {/* CURATED PORTFOLIO SHOWCASE: EDITORIAL MONOGRAPH VIEW */}
        {/* =================================================================== */}
        {viewMode === 'editorial' ? (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-[#1A1815]/8 p-8">
                <Sparkles className="w-10 h-10 text-[#9C5427] mx-auto mb-3 opacity-60" />
                <h3 className="text-xl font-bold text-[#1A1815]">No commissions matched your search</h3>
                <p className="text-sm text-[#68625A] mt-1 max-w-md mx-auto">
                  Try adjusting your search terms or select "All Commissions" to view all 8 curated turnkey projects.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 px-5 py-2 bg-[#9C5427] text-white text-xs font-bold uppercase rounded-full tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project, index) => {
                const currentDisplayedImage = activeCardImage[project.id] || project.image;
                const specs = PROJECT_EXTENDED_SPECS[project.id];
                const allPhotos = [project.image, ...(project.gallery || [])];
                const isEven = index % 2 === 1;

                return (
                  <article
                    key={project.id}
                    id={project.slug}
                    className="rounded-[36px] bg-white border border-[#1A1815]/10 shadow-[0_16px_50px_rgba(26,24,21,0.05)] overflow-hidden transition-all duration-300 hover:shadow-[0_24px_70px_rgba(156,84,39,0.12)] p-6 sm:p-8 lg:p-10"
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}>
                      
                      {/* Left: Dynamic Multi-Angle Image Viewer */}
                      <div className="lg:col-span-7 flex flex-col space-y-4">
                        
                        {/* Main Stage Image with Cinema Zoom CTA */}
                        <div className="relative aspect-[16/10] sm:aspect-[16/10.5] rounded-3xl overflow-hidden bg-[#1A1815]/5 group cursor-pointer shadow-md">
                          <img
                            src={currentDisplayedImage}
                            alt={`${project.title} - Kalyan Design Studio`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                            <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#1A1815]/10 text-xs font-bold uppercase tracking-wider text-[#1A1815] shadow-xs">
                              {project.category}
                            </span>
                            {project.year && (
                              <span className="px-3 py-1.5 rounded-full bg-[#1A1815]/80 backdrop-blur-md text-white text-xs font-semibold tracking-wider">
                                {project.year}
                              </span>
                            )}
                          </div>

                          {/* Hover Overlay with Lightbox Inspect CTA */}
                          <div 
                            onClick={() => openProjectLightbox(project, allPhotos.indexOf(currentDisplayedImage))}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6"
                          >
                            <div className="text-white">
                              <p className="text-xs uppercase tracking-widest font-semibold text-[#B86835]">Verified Execution</p>
                              <p className="text-sm font-bold text-white">Click to Inspect in 4K Cinema Lightbox</p>
                            </div>
                            <div className="p-3 bg-white text-[#9C5427] rounded-full shadow-lg group-hover:scale-110 transition-transform">
                              <Maximize2 className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Interactive Multi-Angle Photo Strip: Switch Angle Instantly! */}
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                          {allPhotos.map((imgUrl, photoIdx) => {
                            const isSelected = imgUrl === currentDisplayedImage;
                            return (
                              <button
                                key={photoIdx}
                                type="button"
                                onClick={() => handleAngleSelect(project.id, imgUrl)}
                                className={`relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0 group ${
                                  isSelected 
                                    ? 'border-[#9C5427] shadow-md ring-2 ring-[#9C5427]/30 scale-102' 
                                    : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`${project.title} Angle ${photoIdx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white">
                                  0{photoIdx + 1}
                                </span>
                              </button>
                            );
                          })}

                          {/* "View All Photos" trigger button */}
                          <button
                            type="button"
                            onClick={() => openProjectLightbox(project, 0)}
                            className="h-full px-4 py-3 aspect-[16/10] rounded-xl border border-[#9C5427]/30 bg-[#9C5427]/5 hover:bg-[#9C5427] text-[#9C5427] hover:text-white transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer flex-shrink-0"
                            title="Launch Fullscreen Lightbox"
                          >
                            <Eye className="w-4 h-4 mb-0.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                              All {allPhotos.length}
                            </span>
                          </button>
                        </div>

                      </div>

                      {/* Right: Architectural Narrative & Material Swatches */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        
                        <div className="space-y-4">
                          {/* Location & Dimension Meta Bar */}
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-[#68625A]">
                            <span className="flex items-center gap-1.5 text-[#9C5427]">
                              <MapPin className="w-3.5 h-3.5" />
                              {project.location}
                            </span>
                            {project.areaSqFt && (
                              <span className="flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-[#9C5427]" />
                                {project.areaSqFt.toLocaleString()} Sq. Ft.
                              </span>
                            )}
                            {project.client && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#1A1815]/10 text-[11px] text-[#5C564E]">
                                {project.client}
                              </span>
                            )}
                          </div>

                          {/* Project Title */}
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1815] uppercase tracking-tight leading-tight hover:text-[#9C5427] transition-colors">
                            {project.title}
                          </h2>

                          {/* Narrative Description */}
                          <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed">
                            {project.description}
                          </p>

                          {/* Genuine Architectural Materials Pill Tray */}
                          {project.materials && project.materials.length > 0 && (
                            <div className="pt-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9C5427] mb-2.5 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                Selected Finishes &amp; Specifications
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.materials.map((mat, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#1A1815]/10 text-xs font-medium text-[#1A1815] hover:border-[#9C5427]/40 transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C5427]" />
                                    {mat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Expandable Technical Scope & Specs Drawer */}
                          {specs && (
                            <div className="pt-2 border-t border-[#1A1815]/10">
                              <button
                                type="button"
                                onClick={() => toggleSpecs(project.id)}
                                className="flex items-center justify-between w-full py-2 text-xs font-bold uppercase tracking-wider text-[#1A1815] hover:text-[#9C5427] transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-2">
                                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#9C5427]" />
                                  Turnkey Scope &amp; Craft Details
                                </span>
                                <span className="text-sm font-semibold">{expandedSpecs[project.id] ? '−' : '+'}</span>
                              </button>

                              {expandedSpecs[project.id] && (
                                <div className="mt-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#1A1815]/10 space-y-3 text-xs animate-in fade-in duration-200">
                                  <div className="flex items-center justify-between pb-2 border-b border-[#1A1815]/10 text-[#68625A]">
                                    <span>Handover Duration:</span>
                                    <span className="font-bold text-[#1A1815]">{specs.turnaroundDays} Calendar Days</span>
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#1A1815] mb-1.5">Executed Scope:</p>
                                    <ul className="grid grid-cols-1 gap-1 text-[#5C564E]">
                                      {specs.scope.map((s, sIdx) => (
                                        <li key={sIdx} className="flex items-center gap-2">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9C5427] flex-shrink-0" />
                                          <span>{s}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action CTAs */}
                        <div className="pt-4 border-t border-[#1A1815]/10 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openProjectLightbox(project, 0)}
                            className="px-5 py-3 rounded-full bg-[#1A1815] hover:bg-[#9C5427] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Inspect 4K Gallery ({allPhotos.length} Views)</span>
                          </button>

                          <Link
                            href="/contact"
                            className="px-5 py-3 rounded-full bg-[#FAF7F2] hover:bg-white text-[#9C5427] border border-[#9C5427]/30 hover:border-[#9C5427] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span>Consult Similar Design</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>

                    </div>
                  </article>
                );
              })
            )}
          </section>
        ) : (
          /* =================================================================== */
          /* MASONRY PHOTO WALL VIEW: High-Impact Visual Grid */
          /* =================================================================== */
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredProjects.flatMap(proj => 
                [proj.image, ...(proj.gallery || [])].map((img, i) => ({
                  project: proj,
                  image: img,
                  index: i,
                }))
              ).map((item, idx) => (
                <div
                  key={`${item.project.id}-${idx}`}
                  onClick={() => openProjectLightbox(item.project, item.index)}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden bg-white border border-[#1A1815]/10 shadow-sm group cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={`${item.project.title} detail`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#B86835]">
                      {item.project.category} • {item.project.location}
                    </span>
                    <h4 className="text-base font-black leading-snug mt-1">{item.project.title}</h4>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">{item.project.materials?.slice(0, 2).join(' • ')}</p>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-white">
                      <span>Angle 0{item.index + 1}</span>
                      <Maximize2 className="w-4 h-4 text-[#9C5427]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* CONTINUOUS STREAM OF CURATED INTERIORS (28 Photos Archive) */}
        {/* =================================================================== */}
        <section id="continuous-stream" className="mt-28 pt-20 border-t border-[#1A1815]/10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1.5px] bg-[#9C5427]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#9C5427]">
                  FULL PHOTOGRAPHIC ARCHIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#1A1815] tracking-tight">
                CONTINUOUS STREAM OF CURATED INTERIORS.
              </h2>
              <p className="text-[#68625A] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                28+ Verified high-resolution snapshots capturing bespoke TV units, acoustic coves, modular kitchens, 
                and master suites finished to luxury standards across Odisha.
              </p>
            </div>

            {/* Quick Room Type Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStreamCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  streamCategory === 'all'
                    ? 'bg-[#9C5427] text-white shadow-xs'
                    : 'bg-white text-[#68625A] border border-[#1A1815]/10 hover:text-[#9C5427]'
                }`}
              >
                All 28 Photos
              </button>
              <button
                onClick={() => setStreamCategory('residential')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  streamCategory === 'residential'
                    ? 'bg-[#9C5427] text-white shadow-xs'
                    : 'bg-white text-[#68625A] border border-[#1A1815]/10 hover:text-[#9C5427]'
                }`}
              >
                Residences &amp; Suites
              </button>
            </div>
          </div>

          {/* 4-Column Responsive Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredStreamPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => openPhotoLightbox(photo)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#1A1815]/10 shadow-xs cursor-pointer"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-[#B86835]">
                    Photo #{photo.id}
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                    {photo.title}
                  </h5>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-white/80">
                    <span>Click to zoom</span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#9C5427]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* =================================================================== */}
        {/* STUDIO CONSULTATION BANNER */}
        {/* =================================================================== */}
        <section className="mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-[36px] bg-[#2C1E16] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            {/* Background Texture & Glow */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#9C5427]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#B86835]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#B86835]">
                <ShieldCheck className="w-4 h-4 text-[#B86835]" />
                100% Turnkey Interior Delivery Guarantee
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                READY TO BRING THIS LEVEL OF CRAFT TO YOUR HOME?
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Schedule a complimentary on-site measurement and 3D architectural feasibility session with Kalyan Design Studio. 
                We visit your apartment, duplex, or villa in Bhubaneswar, Cuttack, or Puri with zero obligation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:scale-105"
                >
                  Schedule Free Site Visit
                </Link>

                <a
                  href="https://wa.me/917504041040?text=Hello%20Kalyan%20Design%20Studio%2C%20I%20would%20like%20to%20schedule%20a%20free%20site%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp: 075040 41040</span>
                </a>

                <a
                  href="tel:+917504041040"
                  className="px-6 py-4 rounded-full bg-white text-[#1A1815] hover:bg-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#9C5427]" />
                  <span>Call 075040 41040</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =================================================================== */}
      {/* CINEMA LIGHTBOX MODAL: Fullscreen Image Inspection */}
      {/* =================================================================== */}
      {lightboxOpen && lightboxImagesList.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A0908]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Modal Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base sm:text-xl font-bold tracking-tight text-white">
                {lightboxTitle}
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                {lightboxSubtitle} • Photo {modalImageIndex + 1} of {lightboxImagesList.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Stage: High-Resolution Viewport with Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            
            {/* Previous Image Button */}
            {lightboxImagesList.length > 1 && (
              <button
                type="button"
                onClick={prevLightboxImage}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#9C5427] text-white backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Displayed Image */}
            <div className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center">
              <img
                src={lightboxImagesList[modalImageIndex]}
                alt={`${lightboxTitle} view ${modalImageIndex + 1}`}
                className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Image Button */}
            {lightboxImagesList.length > 1 && (
              <button
                type="button"
                onClick={nextLightboxImage}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#9C5427] text-white backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip & Quick Action Bar */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-xl py-1">
              {lightboxImagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setModalImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    idx === modalImageIndex
                      ? 'border-[#9C5427] ring-2 ring-[#9C5427]/40 scale-105'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* CTA in Modal */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                onClick={() => setLightboxOpen(false)}
                className="px-5 py-2.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Book Free Site Visit
              </Link>
              <a
                href="https://wa.me/917504041040"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

