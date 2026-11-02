'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Filter, 
  ArrowUpRight, 
  Eye, 
  Grid3X3, 
  LayoutGrid,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

interface ProjectImage {
  id: string;
  title: string;
  category: 'living' | 'bedroom' | 'kitchen' | 'villa' | 'commercial';
  categoryLabel: string;
  location: string;
  year: string;
  src: string;
  aspect: 'portrait' | 'landscape' | 'square' | 'wide';
  dimensions: string;
}

const PROJECT_GALLERY: ProjectImage[] = [
  {
    id: 'proj-01',
    title: 'The Grand Living Salon',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Falcon Crest, Patia',
    year: '2024',
    src: '/images/hero/herobg1.png',
    aspect: 'wide',
    dimensions: '3,800 Sq. Ft.',
  },
  {
    id: 'proj-02',
    title: 'Teak Fluted Master Suite',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Tata Ariana, Shankarpur',
    year: '2024',
    src: '/images/kalyan/gallery/photo1.png',
    aspect: 'portrait',
    dimensions: '2,450 Sq. Ft.',
  },
  {
    id: 'proj-03',
    title: 'Minimalist Monolith Living Room',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Utkal Kanika Galleria, Kalpana',
    year: '2024',
    src: '/images/hero/after.png',
    aspect: 'landscape',
    dimensions: '2,900 Sq. Ft.',
  },
  {
    id: 'proj-04',
    title: 'German Quartz Island Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Trident Galaxy, Kalinga Nagar',
    year: '2023',
    src: '/images/kalyan/assets/MODULARKITCHEN-DIgipoZG.png',
    aspect: 'landscape',
    dimensions: '650 Sq. Ft.',
  },
  {
    id: 'proj-05',
    title: 'Sculptural Marble Lounge & Bar',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Khandagiri Enclave',
    year: '2024',
    src: '/images/kalyan/gallery/photo2.png',
    aspect: 'portrait',
    dimensions: '3,100 Sq. Ft.',
  },
  {
    id: 'proj-06',
    title: 'Scandinavian Warm Oak Bedroom',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Assotech Pride, Rudrapur',
    year: '2024',
    src: '/images/casa-noir/bedroom.jpg',
    aspect: 'square',
    dimensions: '1,850 Sq. Ft.',
  },
  {
    id: 'proj-07',
    title: 'Khandagiri Stone Villa Foyer',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'Private Villa, Khandagiri',
    year: '2024',
    src: '/images/hero/herobg2.png',
    aspect: 'wide',
    dimensions: '5,200 Sq. Ft.',
  },
  {
    id: 'proj-08',
    title: 'Boutique Corporate Executive Lounge',
    category: 'commercial',
    categoryLabel: 'Commercial & Retail',
    location: 'Infocity IT Hub, Chandaka',
    year: '2024',
    src: '/images/casa-noir/urban-wood.jpg',
    aspect: 'portrait',
    dimensions: '4,500 Sq. Ft.',
  },
  {
    id: 'proj-09',
    title: 'Curved Architectural TV Wall & Salon',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Z1 Estate, Nandankanan Rd',
    year: '2023',
    src: '/images/kalyan/gallery/photo3.png',
    aspect: 'landscape',
    dimensions: '2,600 Sq. Ft.',
  },
  {
    id: 'proj-10',
    title: 'Acoustic Fluted Reception Foyer',
    category: 'commercial',
    categoryLabel: 'Commercial & Retail',
    location: 'Corporate HQ, Janpath',
    year: '2024',
    src: '/images/kalyan/assets/oo5-D62wu78I.png',
    aspect: 'square',
    dimensions: '2,200 Sq. Ft.',
  },
  {
    id: 'proj-11',
    title: 'Velvet Horizon Master Retreat',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Shuvam Meadows, Patia',
    year: '2024',
    src: '/images/kalyan/gallery/photo4.png',
    aspect: 'portrait',
    dimensions: '2,100 Sq. Ft.',
  },
  {
    id: 'proj-12',
    title: 'Matte Charcoal & Brass Modular Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Royal Lagoon, Raghunathpur',
    year: '2024',
    src: '/images/kalyan/gallery/photo5.png',
    aspect: 'landscape',
    dimensions: '580 Sq. Ft.',
  },
  {
    id: 'proj-13',
    title: 'Double-Height Architectural Villa Salon',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'VIP Area, Nayapalli',
    year: '2024',
    src: '/images/kalyan/gallery/photo6.png',
    aspect: 'wide',
    dimensions: '4,800 Sq. Ft.',
  },
  {
    id: 'proj-14',
    title: 'Japandi Harmony Living Lounge',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Cosmopolis, Dumduma',
    year: '2023',
    src: '/images/casa-noir/hero-living.jpg',
    aspect: 'portrait',
    dimensions: '2,350 Sq. Ft.',
  },
  {
    id: 'proj-15',
    title: 'Earthy Warmth Guest Haven',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Netaji Subhash Enclave, Cuttack',
    year: '2023',
    src: '/images/kalyan/gallery/photo7.png',
    aspect: 'square',
    dimensions: '1,650 Sq. Ft.',
  },
  {
    id: 'proj-16',
    title: 'Linear Ambient Dining & Pantry',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Symphony Mall Residencies',
    year: '2024',
    src: '/images/kalyan/gallery/photo8.png',
    aspect: 'portrait',
    dimensions: '720 Sq. Ft.',
  },
  {
    id: 'proj-17',
    title: 'Skyline Duplex Lounge & Balcony',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'Tata Ariana Sky Villa',
    year: '2024',
    src: '/images/kalyan/gallery/photo9.png',
    aspect: 'wide',
    dimensions: '5,600 Sq. Ft.',
  },
  {
    id: 'proj-18',
    title: 'Warm Walnut Media Room & Library',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Saheed Nagar Residence',
    year: '2023',
    src: '/images/casa-noir/cozy-living.jpg',
    aspect: 'landscape',
    dimensions: '2,050 Sq. Ft.',
  },
  {
    id: 'proj-19',
    title: 'Regal Gold & Onyx Master Sanctuary',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Metro Satellite City',
    year: '2024',
    src: '/images/kalyan/gallery/photo10.png',
    aspect: 'portrait',
    dimensions: '2,800 Sq. Ft.',
  },
  {
    id: 'proj-20',
    title: 'Concealed Handle Minimal Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Utkal Royal Residency',
    year: '2024',
    src: '/images/kalyan/gallery/photo11.png',
    aspect: 'square',
    dimensions: '600 Sq. Ft.',
  },
  {
    id: 'proj-21',
    title: 'Floating Joinery & Architectural Credenza',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Jayadev Vihar',
    year: '2024',
    src: '/images/casa-noir/floating-shelf.jpg',
    aspect: 'portrait',
    dimensions: '1,950 Sq. Ft.',
  },
  {
    id: 'proj-22',
    title: 'Modern Heritage Penthouse Salon',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'Falcon Crest Tower A',
    year: '2024',
    src: '/images/kalyan/gallery/photo12.png',
    aspect: 'wide',
    dimensions: '4,200 Sq. Ft.',
  },
  {
    id: 'proj-23',
    title: 'Sunlit Zen Master Chamber',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Kalarahanga Villa Enclave',
    year: '2023',
    src: '/images/kalyan/gallery/photo13.png',
    aspect: 'landscape',
    dimensions: '2,250 Sq. Ft.',
  },
  {
    id: 'proj-24',
    title: 'Bespoke Wine Cellar & Bar Counter',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Bhubaneswar Golf Club Villa',
    year: '2024',
    src: '/images/kalyan/gallery/photo14.png',
    aspect: 'portrait',
    dimensions: '480 Sq. Ft.',
  },
  {
    id: 'proj-25',
    title: 'Modernist Tech Sanctuary Workstation',
    category: 'commercial',
    categoryLabel: 'Commercial & Retail',
    location: 'DLF Cybercity, Patia',
    year: '2024',
    src: '/images/kalyan/gallery/photo15.png',
    aspect: 'landscape',
    dimensions: '3,600 Sq. Ft.',
  },
  {
    id: 'proj-26',
    title: 'Luxe Champagne Living Pavilion',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Kharvel Nagar Manor',
    year: '2024',
    src: '/images/kalyan/gallery/photo16.png',
    aspect: 'portrait',
    dimensions: '3,300 Sq. Ft.',
  },
  {
    id: 'proj-27',
    title: 'Sculptural Headboard Master Bedroom',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Arya Surya Heights',
    year: '2023',
    src: '/images/kalyan/gallery/photo17.png',
    aspect: 'square',
    dimensions: '2,150 Sq. Ft.',
  },
  {
    id: 'proj-28',
    title: 'European Breakfast Nook & Island',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Pokhariput Enclave',
    year: '2024',
    src: '/images/kalyan/gallery/photo18.png',
    aspect: 'wide',
    dimensions: '680 Sq. Ft.',
  },
  {
    id: 'proj-29',
    title: 'Bespoke Biophilic Penthouse Lounge',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'Trident Grand Sky Villa',
    year: '2024',
    src: '/images/kalyan/gallery/photo19.png',
    aspect: 'portrait',
    dimensions: '5,000 Sq. Ft.',
  },
  {
    id: 'proj-30',
    title: 'Minimalist Monolith Architecture',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Old Town Heritage Quarter',
    year: '2023',
    src: '/images/kalyan/gallery/photo20.png',
    aspect: 'landscape',
    dimensions: '2,750 Sq. Ft.',
  },
  {
    id: 'proj-31',
    title: 'Hotel-Grade Master Suite & Dressing',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Grand Residence, Cuttack',
    year: '2024',
    src: '/images/kalyan/gallery/photo21.png',
    aspect: 'portrait',
    dimensions: '2,600 Sq. Ft.',
  },
  {
    id: 'proj-32',
    title: 'Warm Amber Atmospheric Foyer',
    category: 'living',
    categoryLabel: 'Living & Lounges',
    location: 'Khandagiri Hills',
    year: '2024',
    src: '/images/casa-noir/lighting-plant.jpg',
    aspect: 'square',
    dimensions: '1,700 Sq. Ft.',
  },
  {
    id: 'proj-33',
    title: 'Modern Villa Staircase & Double-Height Atrium',
    category: 'villa',
    categoryLabel: 'Villas & Penthouses',
    location: 'Chandaka Forest Villa',
    year: '2024',
    src: '/images/kalyan/gallery/photo22.png',
    aspect: 'wide',
    dimensions: '6,400 Sq. Ft.',
  },
  {
    id: 'proj-34',
    title: 'Minimalist Dining & Open Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchens',
    location: 'Sailashree Vihar',
    year: '2023',
    src: '/images/kalyan/gallery/photo23.png',
    aspect: 'landscape',
    dimensions: '750 Sq. Ft.',
  },
  {
    id: 'proj-35',
    title: 'Executive Boardroom & Meeting Gallery',
    category: 'commercial',
    categoryLabel: 'Commercial & Retail',
    location: 'Technology Corridor, Infocity',
    year: '2024',
    src: '/images/kalyan/gallery/photo24.png',
    aspect: 'portrait',
    dimensions: '4,100 Sq. Ft.',
  },
  {
    id: 'proj-36',
    title: 'Sleek Master Suite with Cove Illumination',
    category: 'bedroom',
    categoryLabel: 'Master Suites',
    location: 'Bhubaneswar Central',
    year: '2024',
    src: '/images/kalyan/gallery/photo25.png',
    aspect: 'wide',
    dimensions: '2,300 Sq. Ft.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'living', label: 'Living & Lounges' },
  { id: 'bedroom', label: 'Master Suites' },
  { id: 'kitchen', label: 'Modular Kitchens' },
  { id: 'villa', label: 'Villas & Penthouses' },
  { id: 'commercial', label: 'Commercial' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeColumns, setActiveColumns] = useState<3 | 4>(3);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>({});
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 50) {
      showPrev();
    } else if (diff < -50) {
      showNext();
    }
    touchStartXRef.current = null;
  };

  // Filtered projects
  const filteredProjects = activeCategory === 'all' 
    ? PROJECT_GALLERY 
    : PROJECT_GALLERY.filter((p) => p.category === activeCategory);

  // Open lightbox
  const openLightbox = (index: number) => {
    setSelectedProjectIndex(index);
    setIsPlaying(false);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedProjectIndex(null);
    setIsPlaying(false);
  };

  // Next image in lightbox
  const showNext = useCallback(() => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) => 
      prev !== null ? (prev + 1) % filteredProjects.length : 0
    );
  }, [selectedProjectIndex, filteredProjects.length]);

  // Previous image in lightbox
  const showPrev = useCallback(() => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) => 
      prev !== null ? (prev - 1 + filteredProjects.length) % filteredProjects.length : 0
    );
  }, [selectedProjectIndex, filteredProjects.length]);

  // Auto slideshow player
  useEffect(() => {
    if (!isPlaying || selectedProjectIndex === null) return;
    const interval = setInterval(() => {
      showNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, selectedProjectIndex, showNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    if (selectedProjectIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProjectIndex, showNext, showPrev]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (selectedProjectIndex !== null && thumbnailStripRef.current) {
      const activeEl = thumbnailStripRef.current.children[selectedProjectIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedProjectIndex]);

  const currentProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1E16] flex flex-col font-sans selection:bg-[#9C5427]/20 selection:text-[#2C1E16]">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Visual Portfolio Container */}
      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        
        {/* Top Minimalist Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C1E16]/10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-[#9C5427]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#9C5427]">
                  EXCLUSIVE VISUAL MONOGRAPH
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#2C1E16] tracking-tight leading-none uppercase">
                CURATED <span className="font-semibold italic font-serif">PROJECTS</span>
              </h1>
              <p className="mt-3 text-[#5C534A] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                Pure interior photography from our completed residences, luxury villas, and boutique spaces across Odisha.
              </p>
            </div>

            {/* Quick Actions & View Controls */}
            <div className="flex items-center gap-3 self-start md:self-end">
              
              {/* Slideshow Trigger Button */}
              <button
                onClick={() => {
                  setSelectedProjectIndex(0);
                  setIsPlaying(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2C1E16] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#9C5427] transition-all shadow-sm group"
                title="Launch Fullscreen Cinematic Tour"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#FAF7F2] group-hover:scale-110 transition-transform" />
                <span>Play Slideshow</span>
              </button>

              {/* Grid Column Selector */}
              <div className="hidden sm:flex items-center bg-white p-1 rounded-full border border-[#2C1E16]/10 shadow-sm">
                <button
                  onClick={() => setActiveColumns(3)}
                  className={`p-2 rounded-full transition-all ${
                    activeColumns === 3 
                      ? 'bg-[#2C1E16] text-white shadow-sm' 
                      : 'text-[#5C534A] hover:text-[#2C1E16]'
                  }`}
                  title="3 Columns Expanded"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveColumns(4)}
                  className={`p-2 rounded-full transition-all ${
                    activeColumns === 4 
                      ? 'bg-[#2C1E16] text-white shadow-sm' 
                      : 'text-[#5C534A] hover:text-[#2C1E16]'
                  }`}
                  title="4 Columns Compact"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Total Count Badge */}
              <div className="px-3.5 py-2 rounded-full bg-[#2C1E16]/5 border border-[#2C1E16]/10 text-xs font-semibold text-[#2C1E16]">
                <span className="text-[#9C5427] font-bold">{filteredProjects.length}</span> Works
              </div>

            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? PROJECT_GALLERY.length 
                : PROJECT_GALLERY.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 flex-shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#9C5427] text-white shadow-md shadow-[#9C5427]/20 font-semibold'
                      : 'bg-white text-[#5C534A] hover:bg-[#2C1E16]/5 border border-[#2C1E16]/10 hover:text-[#2C1E16]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#2C1E16]/5 text-[#5C534A]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 3. Mesmerizing Visual Grid of Pure Photography */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`grid gap-4 sm:gap-6 ${
              activeColumns === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProjects.map((project, idx) => {
              // Varied heights for organic masonry sensation
              const aspectClasses = {
                portrait: 'aspect-[3/4]',
                landscape: 'aspect-[4/3]',
                square: 'aspect-square',
                wide: 'aspect-[16/10]',
              }[project.aspect] || 'aspect-[4/5]';

              const isLoaded = imageLoadedMap[project.id];

              return (
                <div
                  key={project.id}
                  onClick={() => openLightbox(idx)}
                  className={`group relative overflow-hidden rounded-2xl bg-[#EBE5DC] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${aspectClasses}`}
                >
                  {/* Image with Mesmerizing Ken-Burns Hover Zoom */}
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover object-center transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoadingComplete={() => {
                        setImageLoadedMap((prev) => ({ ...prev, [project.id]: true }));
                      }}
                      loading="lazy"
                    />

                    {/* Placeholder Shimmer skeleton while loading */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#EBE5DC] via-[#FAF7F2] to-[#EBE5DC] animate-pulse" />
                    )}
                  </div>

                  {/* Dark Cinematic Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-white/90 border border-white/15">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Top Right Expand Icon */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#2C1E16] shadow-lg group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4 text-[#2C1E16]" />
                    </div>
                  </div>

                  {/* Bottom Metadata Reveal on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out flex flex-col justify-end text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/80 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{project.location}</span>
                      <span className="mx-1">•</span>
                      <span>{project.dimensions}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-tight drop-shadow-sm line-clamp-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Subtle Shimmer Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Bottom Floating Consultation Banner */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2C1E16] to-[#1C130D] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#9C5427]/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9C5427]">
                  BESPOKE COMMISSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                  Envisioning a space of your own?
                </h3>
                <p className="text-sm text-white/70 max-w-lg mt-2 leading-relaxed">
                  Every photograph in this monograph was conceived, drafted in 3D, and constructed turnkey by Kalyan Design Studio. Let’s create yours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link
                  href="/services"
                  className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-center transition-all"
                >
                  Explore Services
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white text-xs font-semibold uppercase tracking-wider text-center shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 4. Mesmerizing Fullscreen Cinema Lightbox Modal */}
      {selectedProjectIndex !== null && currentProject && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-300 select-none">
          
          {/* Top Cinema Bar */}
          <div className="p-3 sm:px-8 sm:py-5 flex items-center justify-between z-20 border-b border-white/10 gap-2">
            {/* Left: Project title & count */}
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-white/80 text-[10px] sm:text-xs font-mono flex-shrink-0">
                {String(selectedProjectIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h2 className="text-white text-xs sm:text-base font-medium tracking-tight truncate max-w-[130px] xs:max-w-[180px] sm:max-w-md">
                  {currentProject.title}
                </h2>
                <p className="text-[10px] sm:text-xs text-white/50 flex items-center gap-1.5 sm:gap-2 truncate">
                  <span>{currentProject.categoryLabel}</span>
                  <span>•</span>
                  <span>{currentProject.location}</span>
                </p>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Slideshow Play / Pause */}
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                  isPlaying 
                    ? 'bg-[#9C5427] text-white shadow-lg shadow-[#9C5427]/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isPlaying ? 'Pause Slideshow (Space)' : 'Play Slideshow (Space)'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Auto-Play</span>
                  </>
                )}
              </button>

              {/* Inquire Button */}
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
              >
                <span>Inquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9C5427]" />
              </Link>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all ml-1 sm:ml-2"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: The Cinema Viewer with Swipe Navigation */}
          <div 
            className="flex-1 relative flex items-center justify-center p-2 sm:p-8 overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            
            {/* Previous Navigation Button */}
            <button
              onClick={showPrev}
              className="absolute left-2 sm:left-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/15 group shadow-lg"
              title="Previous (Left Arrow or Swipe Right)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={showNext}
              className="absolute right-2 sm:right-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/15 group shadow-lg"
              title="Next (Right Arrow or Swipe Left)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Main Picture with Smooth Scaling */}
            <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  key={currentProject.src}
                  src={currentProject.src}
                  alt={currentProject.title}
                  fill
                  className="object-contain animate-in fade-in zoom-in-95 duration-400 drop-shadow-2xl"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Slideshow Progress Bar indicator when active */}
            {isPlaying && (
              <div className="absolute top-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
                <div className="h-full bg-[#9C5427] animate-[pulse_3.8s_ease-in-out_infinite] w-full origin-left" />
              </div>
            )}
          </div>

          {/* Bottom Filmstrip Carousel */}
          <div className="p-4 sm:px-8 border-t border-white/10 bg-black/50 backdrop-blur-md z-20">
            <div 
              ref={thumbnailStripRef}
              className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none max-w-4xl mx-auto"
            >
              {filteredProjects.map((p, idx) => {
                const isActive = idx === selectedProjectIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      isActive 
                        ? 'ring-2 ring-[#9C5427] scale-105 opacity-100' 
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt={p.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 5. Global Footer */}
      <Footer />
    </div>
  );
}
