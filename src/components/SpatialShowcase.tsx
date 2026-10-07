'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  Sun, 
  Moon, 
  Layers, 
  Play, 
  Pause, 
  ArrowUpRight,
  Eye,
  Sliders,
  Compass
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  category: 'living' | 'kitchen' | 'bedroom' | 'details';
  categoryLabel: string;
  location: string;
  area: string;
  materials: string[];
  image: string;
  nightImage?: string;
  description: string;
  hotspots?: { x: number; y: number; title: string; desc: string }[];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'patia-grand-living',
    title: 'Double-Height Atrium & Travertine Lounge',
    category: 'living',
    categoryLabel: 'Grand Living',
    location: 'Patia Villa, Bhubaneswar',
    area: '1,450 sq ft',
    materials: ['Khandagiri Sandstone', 'Burma Teak', 'Acoustic Slatting', 'Concealed LED Coves'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    nightImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    description: 'Sculpted with soaring ceilings, floor-to-ceiling thermal glazing, and an integrated sunken seating pavilion designed for entertaining.',
    hotspots: [
      { x: 26, y: 48, title: 'Khandagiri Sandstone Wall', desc: 'Hand-chiselled local stone with dry joint cladding that captures morning sunlight.' },
      { x: 55, y: 28, title: 'Circadian Linear Coves', desc: 'Calibrated 2400K-3000K continuous LEDs recessed into acoustical ceiling channels.' },
      { x: 74, y: 72, title: 'Burma Teak Joinery', desc: 'Hand-rubbed natural matte oil finish with hidden push-latch storage and brass reveals.' },
    ],
  },
  {
    id: 'calacatta-kitchen',
    title: 'Monolithic Calacatta Island & Culinary Suite',
    category: 'kitchen',
    categoryLabel: 'Culinary Architecture',
    location: 'Chandrasekharpur Duplex, Bhubaneswar',
    area: '620 sq ft',
    materials: ['Bookmatched Calacatta Gold', 'Smoked Teak', 'Unlacquered Brass', 'Miele Appliances'],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    description: 'A monolithic 4.2-meter bookmatched marble island serving as the architectural centerpiece of the open-plan residence.',
  },
  {
    id: 'mahanadi-riverfront-salon',
    title: 'Riverfront Panoramic Salon & Terrazzo Floor',
    category: 'living',
    categoryLabel: 'Grand Living',
    location: 'CDA Sector 9, Cuttack',
    area: '1,100 sq ft',
    materials: ['Honed River Basalt', 'Custom Brass Filigree', 'Cast Terrazzo', 'Warm Cedar'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'Designed to capture prevailing Mahanadi river breezes with motorized glass pocket doors that dissolve indoor-outdoor thresholds.',
  },
  {
    id: 'master-sanctuary',
    title: 'Minimalist Master Suite & Courtyard View',
    category: 'bedroom',
    categoryLabel: 'Private Sanctuaries',
    location: 'Infocity Penthouse, Bhubaneswar',
    area: '880 sq ft',
    materials: ['Textured Lime Plaster', 'Fluted Teak Headboard', 'Bouclé Upholstery', 'Bronze Glazing'],
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
    description: 'A serene haven featuring acoustic plaster walls, ambient perimeter floor washes, and automated linen solar drapery.',
  },
  {
    id: 'courtyard-spa-bath',
    title: 'Open-Air Tropical Spa Bath with Laterite Tub',
    category: 'bedroom',
    categoryLabel: 'Private Sanctuaries',
    location: 'Puri Coastal Villa, Marine Drive',
    area: '480 sq ft',
    materials: ['Laterite Stone', 'Raw Basalt Slates', 'Brushed Gunmetal', 'Living Fern Wall'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    description: 'An indoor-outdoor wellness retreat illuminated by an internal bamboo lightwell and rain shower system.',
  },
  {
    id: 'bespoke-library-salon',
    title: 'The Brass & Rosewood Private Study',
    category: 'details',
    categoryLabel: 'Bespoke Joinery',
    location: 'Saheed Nagar Estate, Bhubaneswar',
    area: '540 sq ft',
    materials: ['Indian Rosewood', 'Solid Brass Framing', 'Cognac Saddle Leather', 'Acoustic Felt'],
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80',
    description: 'Custom millwork library wall with integrated rolling ladder, discreet humidor, and architectural task lighting.',
  },
  {
    id: 'artisanal-dining',
    title: 'Artisanal Dining Pavilion & Chandelier Atrium',
    category: 'kitchen',
    categoryLabel: 'Culinary Architecture',
    location: 'Jaydev Vihar Residence, Bhubaneswar',
    area: '720 sq ft',
    materials: ['Solid Monolithic Oak', 'Brushed Champagne Brass', 'Handwoven Odia Silk', 'Fluted Glass'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    description: 'Seating for twelve surrounded by bespoke fluted cabinetry, custom temperature-controlled wine display, and botanical reflections.',
  },
  {
    id: 'sculptural-staircase',
    title: 'Floating Cantilevered Staircase & Glass Void',
    category: 'details',
    categoryLabel: 'Bespoke Joinery',
    location: 'Patia Luxury Villa, Bhubaneswar',
    area: 'Central Void',
    materials: ['Structural Glass', 'Engineered Teak Treads', 'Concealed Steel Core', 'Micro-cement'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    description: 'A gravity-defying floating stair sculptural element connecting all three residential tiers with integrated riser illumination.',
  }
];

// Marquee Stream Photos (Row 1 and Row 2)
const STREAM_ROW_1 = [
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', title: 'Patia Monolithic Villa Living', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', title: 'Calacatta Marble Culinary Island', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Mahanadi Riverfront Living Room', loc: 'Cuttack' },
  { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', title: 'Infocity Master Bedroom Sanctuary', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', title: 'Courtyard Minimalist Pavilion', loc: 'Cuttack' },
  { url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80', title: 'Sky Duplex Mezzanine Lounge', loc: 'Cuttack' },
];

const STREAM_ROW_2 = [
  { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', title: 'Sculpted Artisanal Dining Hall', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'Laterite Stone Spa Bath', loc: 'Puri' },
  { url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80', title: 'Private Executive Library & Joinery', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', title: 'Cantilevered Teak Staircase', loc: 'Bhubaneswar' },
  { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', title: 'Warm Teak Guest Suite', loc: 'Puri' },
  { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', title: 'Executive Penthouse Study', loc: 'Rourkela' },
];

export default function SpatialShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'living' | 'kitchen' | 'bedroom' | 'details'>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Card state
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardRotate, setCardRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setCardRotate({ x: rotateX, y: rotateY });
    setHoveredCardId(id);
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
    setHoveredCardId(null);
  };

  // Day vs Night Slider drag handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPosition(pos);
  };

  const filteredItems = activeCategory === 'all' 
    ? SHOWCASE_ITEMS 
    : SHOWCASE_ITEMS.filter(item => item.category === activeCategory);

  const getMarqueeDuration = () => {
    if (marqueeSpeed === 'slow') return '65s';
    if (marqueeSpeed === 'fast') return '30s';
    return '45s';
  };

  return (
    <section 
      id="spatial-showcase" 
      className="relative w-full bg-[#07080a] text-white py-24 sm:py-32 overflow-hidden border-t border-white/10"
      aria-label="Interior Spatial Design Architecture Showcase"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#c8a47e]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-[#222834]/20 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* HEADER: CLIENT-FOCUSED ARCHITECTURAL SHOWCASE TITLE               */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c8a47e] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6cfb8] font-medium">
                Spatial Architecture Showcase
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              Bespoke Spaces Crafted with <span className="italic text-[#c8a47e] font-normal">Living Light</span> & Texture
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Explore our master commissions across Odisha. Touch, inspect, and experience how organic regional stone, custom joinery, and circadian illumination synthesize into extraordinary living environments.
            </p>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="flex items-center gap-6 sm:gap-10 border-l border-white/10 pl-6 sm:pl-8 py-2">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-white font-light">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-400">Bespoke Millwork</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#c8a47e] font-light">45+</div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-400">Odisha Villas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-white font-light">Vastu</div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-400">Precision Flow</div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 1. INTERACTIVE DAY / NIGHT LIGHTING ATMOSPHERE MORPH SLIDER       */}
        {/* ================================================================= */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c8a47e]/15 border border-[#c8a47e]/30 flex items-center justify-center text-[#c8a47e]">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Circadian Lighting & Atmosphere Morph</h3>
                <p className="text-xs text-neutral-400">Drag slider to experience Natural Daylight vs. 2400K Evening Illumination</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-neutral-900/80 border border-white/10 rounded-full px-3 py-1 text-xs text-neutral-300">
              <span className={`flex items-center gap-1.5 transition-colors ${sliderPosition > 50 ? 'text-[#c8a47e] font-medium' : 'text-neutral-500'}`}>
                <Sun className="w-3.5 h-3.5" /> Day View ({Math.round(sliderPosition)}%)
              </span>
              <span className="text-white/20">|</span>
              <span className={`flex items-center gap-1.5 transition-colors ${sliderPosition <= 50 ? 'text-[#c8a47e] font-medium' : 'text-neutral-500'}`}>
                <Moon className="w-3.5 h-3.5" /> Night View ({Math.round(100 - sliderPosition)}%)
              </span>
            </div>
          </div>

          {/* Interactive Split-Screen Comparison Container */}
          <div 
            ref={sliderContainerRef}
            className="relative w-full h-[460px] sm:h-[560px] lg:h-[640px] rounded-xl overflow-hidden border border-white/15 select-none cursor-ew-resize group shadow-2xl shadow-black/80"
            onMouseMove={(e) => {
              if (isDraggingSlider || e.buttons === 1) handleSliderMove(e.clientX);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
            }}
            onMouseDown={() => setIsDraggingSlider(true)}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
          >
            {/* Night View (Base Layer) */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${SHOWCASE_ITEMS[0].nightImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-neutral-300 flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-[#c8a47e]" /> Circadian Ambient Evening
              </div>
            </div>

            {/* Day View (Clipped Top Layer) */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden transition-[clip-path] duration-75"
              style={{ 
                backgroundImage: `url(${SHOWCASE_ITEMS[0].image})`,
                clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-neutral-300 flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#e6cfb8]" /> Natural Daylight Golden Hour
              </div>
            </div>

            {/* Interactive Hotspots on Featured Master Living Space */}
            {SHOWCASE_ITEMS[0].hotspots?.map((hotspot, idx) => (
              <div
                key={idx}
                className="absolute z-20"
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                onMouseEnter={() => setActiveHotspot(idx)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <button
                  type="button"
                  aria-label={`View hotspot ${hotspot.title}`}
                  className="relative w-8 h-8 rounded-full bg-[#c8a47e] text-neutral-950 font-bold flex items-center justify-center text-xs shadow-lg shadow-black/60 transition-transform hover:scale-125 animate-hotspot"
                >
                  +
                </button>

                {/* Hotspot Floating Tooltip */}
                {activeHotspot === idx && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-lg bg-neutral-950/95 backdrop-blur-xl border border-[#c8a47e]/40 shadow-2xl text-left pointer-events-none z-30 transition-all">
                    <div className="text-xs font-semibold text-[#e6cfb8] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#c8a47e]" />
                      {hotspot.title}
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug font-light">
                      {hotspot.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Draggable Divider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white/90 z-20 transition-[left] duration-75 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-neutral-950 font-bold flex items-center justify-center shadow-xl border-2 border-neutral-900 transition-transform group-hover:scale-110">
                <span className="text-[10px] tracking-tighter font-mono">◀▶</span>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-widest text-[#c8a47e] font-semibold">Featured Masterwork</span>
                <h4 className="text-xl sm:text-2xl font-serif text-white font-medium drop-shadow-md">
                  The Patia Monolithic Villa — Double-Height Atrium
                </h4>
                <p className="text-xs text-neutral-300 font-light mt-1 drop-shadow">
                  Custom travertine hearth, fluted Burma teak acoustic slats, and circadian concealed coves calibrated for dawn-to-dusk wellness.
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(SHOWCASE_ITEMS[0]);
                }}
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#c8a47e] hover:text-neutral-950 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" /> Inspect Full Space
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. DUAL-TIER CONTINUOUS KINETIC STREAMS (SILKY MARQUEE GALLERIES) */}
        {/* ================================================================= */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c8a47e] tracking-widest uppercase mb-1">
                <Layers className="w-3.5 h-3.5" /> Kinetic Visual Streams
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Continuous Stream of Curated Interiors
              </h3>
            </div>

            {/* Marquee Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-full p-1 text-xs">
                {(['slow', 'normal', 'fast'] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setMarqueeSpeed(spd)}
                    className={`px-3 py-1 rounded-full capitalize transition-colors ${
                      marqueeSpeed === spd ? 'bg-[#c8a47e] text-neutral-950 font-medium' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                aria-label={isMarqueePaused ? 'Play stream' : 'Pause stream'}
                className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#c8a47e] hover:text-neutral-950 transition-colors"
              >
                {isMarqueePaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Marquee Row 1 (Sliding Left) */}
          <div className="relative w-full overflow-hidden mb-4">
            <div 
              className="animate-marquee-left gap-4"
              style={{ 
                animationDuration: getMarqueeDuration(),
                animationPlayState: isMarqueePaused ? 'paused' : 'running'
              }}
            >
              {[...STREAM_ROW_1, ...STREAM_ROW_1].map((img, index) => (
                <div
                  key={`r1-${index}`}
                  onClick={() => setSelectedItem({
                    id: `stream-1-${index}`,
                    title: img.title,
                    category: 'living',
                    categoryLabel: 'Curated Stream',
                    location: img.loc,
                    area: 'Architectural Commission',
                    materials: ['Natural Stone', 'Seasoned Teak', 'Architectural Lighting'],
                    image: img.url,
                    description: `${img.title} designed and executed in ${img.loc}, Odisha by Studio KYN.`
                  })}
                  className="group relative w-72 sm:w-80 md:w-96 h-56 sm:h-64 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-[#c8a47e]/60"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#c8a47e] uppercase tracking-wider">{img.loc}</span>
                    <h5 className="text-sm font-medium text-white truncate drop-shadow">{img.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Sliding Right) */}
          <div className="relative w-full overflow-hidden">
            <div 
              className="animate-marquee-right gap-4"
              style={{ 
                animationDuration: getMarqueeDuration(),
                animationPlayState: isMarqueePaused ? 'paused' : 'running'
              }}
            >
              {[...STREAM_ROW_2, ...STREAM_ROW_2].map((img, index) => (
                <div
                  key={`r2-${index}`}
                  onClick={() => setSelectedItem({
                    id: `stream-2-${index}`,
                    title: img.title,
                    category: 'kitchen',
                    categoryLabel: 'Curated Stream',
                    location: img.loc,
                    area: 'Architectural Commission',
                    materials: ['Artisanal Joinery', 'Calacatta Marble', 'Brushed Brass'],
                    image: img.url,
                    description: `${img.title} designed and executed in ${img.loc}, Odisha by Studio KYN.`
                  })}
                  className="group relative w-72 sm:w-80 md:w-96 h-56 sm:h-64 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:border-[#c8a47e]/60"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#c8a47e] uppercase tracking-wider">{img.loc}</span>
                    <h5 className="text-sm font-medium text-white truncate drop-shadow">{img.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. INTERACTIVE 3D PERSPECTIVE CARDS WITH ROOM CATEGORY FILTER     */}
        {/* ================================================================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c8a47e] tracking-widest uppercase mb-1">
                <Compass className="w-3.5 h-3.5" /> Spatial Categories
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Detailed Architectural Studies
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-neutral-900/90 border border-white/10 rounded-full p-1.5 backdrop-blur-lg">
              {[
                { id: 'all', label: 'All Sanctuaries' },
                { id: 'living', label: 'Grand Living' },
                { id: 'kitchen', label: 'Culinary' },
                { id: 'bedroom', label: 'Private Suites' },
                { id: 'details', label: 'Joinery & Stairs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === tab.id
                      ? 'bg-[#c8a47e] text-neutral-950 shadow-md font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Responsive 3D Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isHovered = hoveredCardId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseMove={(e) => handleCardMouseMove(e, item.id)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setSelectedItem(item)}
                  className="perspective-1000 cursor-pointer"
                >
                  <div
                    className="relative w-full h-[420px] rounded-xl overflow-hidden border border-white/10 bg-[#0d0f14] transition-transform duration-200 ease-out shadow-xl transform-style-3d group hover:border-[#c8a47e]/60"
                    style={{
                      transform: isHovered
                        ? `rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg) scale3d(1.02, 1.02, 1.02)`
                        : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    }}
                  >
                    {/* Background Interior Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient & Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#c8a47e]">
                        {item.categoryLabel}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#c8a47e] group-hover:text-neutral-950 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2.5">
                      <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                        <span>{item.location}</span>
                        <span className="text-[#e6cfb8]">{item.area}</span>
                      </div>

                      <h4 className="text-lg font-serif text-white font-medium leading-snug group-hover:text-[#c8a47e] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Material Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.materials.slice(0, 3).map((mat, mIdx) => (
                          <span
                            key={mIdx}
                            className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] text-neutral-300 font-light"
                          >
                            {mat}
                          </span>
                        ))}
                        {item.materials.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] text-neutral-400">
                            +{item.materials.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* 4. CINEMATIC HIGH-RES MODAL INSPECTOR                               */}
      {/* =================================================================== */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-10 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#0c0e12] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#c8a47e] hover:text-neutral-950 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Viewport */}
            <div className="lg:w-3/5 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-[#c8a47e] font-mono">
                {selectedItem.location}
              </div>
            </div>

            {/* Right Architectural Specifications */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#c8a47e]">
                  <Sparkles className="w-3.5 h-3.5" /> {selectedItem.categoryLabel}
                </div>

                <h3 className="text-2xl font-serif text-white font-medium leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Spatial Dimensions</span>
                    <p className="text-sm text-white font-medium">{selectedItem.area}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400">Curated Materials & Finishes</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selectedItem.materials.map((mat, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-xs text-neutral-200"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Call to Action */}
              <div className="border-t border-white/10 pt-6 mt-6">
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#c8a47e] hover:bg-[#d9b894] text-neutral-950 font-medium text-sm transition-colors shadow-lg"
                >
                  Commission a Similar Space <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
