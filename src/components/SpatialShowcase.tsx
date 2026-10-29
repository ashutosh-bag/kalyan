'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ArrowLeft,
  Sun, 
  Moon, 
  Layers, 
  Play, 
  Pause, 
  ArrowUpRight,
  Eye,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Building2,
  Lamp,
  Home
} from 'lucide-react';

interface Hotspot {
  x: number;
  y: number;
  title: string;
  desc: string;
}

interface ShowcaseItem {
  id: string;
  title: string;
  category: 'living' | 'kitchen' | 'bedroom' | 'details';
  categoryLabel: string;
  location: string;
  area: string;
  materials: string[];
  image: string;
  description: string;
}

const FURNISHED_HOTSPOTS: Hotspot[] = [
  { 
    x: 42, 
    y: 72, 
    title: 'Custom Curved Bouclé Sectional', 
    desc: 'Ergonomic contours in stain-resistant Belgian bouclé fabric with high-density layered cushioning.' 
  },
  { 
    x: 74, 
    y: 32, 
    title: 'Fluted Acoustic Teak Panelling', 
    desc: 'Solid kiln-dried teak slats with hidden indirect 2700K circadian LED ribbons.' 
  },
  { 
    x: 58, 
    y: 74, 
    title: 'Solid Teak & Glass Coffee Table', 
    desc: 'Handcrafted hardwood centerpiece with soft rounded corners and matte protective finish.' 
  },
  { 
    x: 22, 
    y: 35, 
    title: 'Architectural Brass Floor Arc', 
    desc: 'Brushed champagne brass body with warm diffused downward illumination.' 
  },
  { 
    x: 88, 
    y: 68, 
    title: 'Specimen Fiddle-Leaf Fig Tree', 
    desc: 'Live air-purifying indoor botanical housed in a fluted terracotta clay planter.' 
  },
];

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'patia-grand-living',
    title: 'Double-Height Atrium & Travertine Lounge',
    category: 'living',
    categoryLabel: 'Grand Living',
    location: 'Patia Villa, Bhubaneswar',
    area: '1,450 sq ft',
    materials: ['Khandagiri Sandstone', 'Burma Teak', 'Acoustic Slatting', 'Concealed LED Coves'],
    image: '/images/casa-noir/hero-living.jpg',
    description: 'Sculpted with soaring ceilings, floor-to-ceiling thermal glazing, and an integrated sunken seating pavilion designed for entertaining.',
  },
  {
    id: 'calacatta-kitchen',
    title: 'Monolithic Calacatta Island & Culinary Suite',
    category: 'kitchen',
    categoryLabel: 'Culinary Architecture',
    location: 'Chandrasekharpur Duplex, Bhubaneswar',
    area: '620 sq ft',
    materials: ['Bookmatched Calacatta Gold', 'Smoked Teak', 'Unlacquered Brass', 'Miele Appliances'],
    image: '/images/kalyan/gallery/photo4.png',
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
    image: '/images/kalyan/gallery/photo19.png',
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
    image: '/images/casa-noir/bedroom.jpg',
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
    image: '/images/kalyan/gallery/photo15.png',
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
    image: '/images/kalyan/gallery/photo6.png',
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
    image: '/images/casa-noir/urban-wood.jpg',
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
    image: '/images/kalyan/gallery/photo11.png',
    description: 'A gravity-defying floating stair sculptural element connecting all three residential tiers with integrated riser illumination.',
  }
];

// Marquee Stream Photos (Row 1 and Row 2)
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

export default function SpatialShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'living' | 'kitchen' | 'bedroom' | 'details'>('all');
  
  // Transformation Mode: 'empty-to-furnished' (default) OR 'circadian-day-night'
  const [comparisonMode, setComparisonMode] = useState<'empty-to-furnished' | 'circadian-day-night'>('empty-to-furnished');
  
  // Slider position: 0 = 100% After (Furnished / Night), 100 = 100% Before (Empty / Day)
  // Default at 50% for 50/50 split comparison
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
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

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setCardRotate({ x: rotateX, y: rotateY });
    setHoveredCardId(id);
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
    setHoveredCardId(null);
  };

  // Drag handlers for Before/After Slider
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
    if (marqueeSpeed === 'slow') return '60s';
    if (marqueeSpeed === 'fast') return '28s';
    return '42s';
  };

  // Calculated Kelvin for circadian mode
  const currentKelvin = Math.round(2400 + (sliderPosition / 100) * (5500 - 2400));

  return (
    <section 
      id="spatial-showcase" 
      className="relative w-full bg-[#FAF8F5] text-[#1A1815] py-20 sm:py-28 overflow-hidden border-t border-[#1A1815]/8 select-none"
      aria-label="Interior Spatial Design Architecture Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                SPATIAL ARCHITECTURE SHOWCASE
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] tracking-tight leading-tight">
              BESPOKE SPACES CRAFTED WITH LIVING LIGHT.
            </h2>
            
            <p className="text-sm sm:text-base text-[#68625A] leading-relaxed mt-3">
              Explore our master commissions across Odisha. Touch, inspect, and experience how organic regional stone, custom joinery, and circadian illumination synthesize into extraordinary living environments.
            </p>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="flex items-center gap-6 sm:gap-8 border-l border-[#1A1815]/10 pl-6 sm:pl-8 py-1">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#1A1815]">100%</div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#7A7369]">Bespoke Millwork</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#9C5427]">350+</div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#7A7369]">Odisha Homes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#1A1815]">Vastu</div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#7A7369]">Precision Flow</div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 1. MASTER BEFORE / AFTER: EMPTY ROOM ➔ FILLED WITH INTERIOR DESIGN */}
        {/* ================================================================= */}
        <div className="mb-20 sm:mb-24">
          
          {/* Header Controls: Mode Selector & Description */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            
            {/* Title & Tagline */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#1A1815]/8 flex items-center justify-center text-[#9C5427] shrink-0 shadow-xs">
                {comparisonMode === 'empty-to-furnished' ? (
                  <Home className="w-5 h-5 text-[#9C5427]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#9C5427]" />
                )}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1A1815]">
                  {comparisonMode === 'empty-to-furnished' ? (
                    <>
                      Empty Bare-Shell Flat <span className="text-[#9C5427] font-semibold">➔ Turnkey Interior</span>
                    </>
                  ) : (
                    <>
                      Circadian Natural Daylight <span className="text-[#9C5427] font-semibold">➔ 2400K Evening Glow</span>
                    </>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625A]">
                  {comparisonMode === 'empty-to-furnished' 
                    ? 'Drag slider horizontally to see the empty room transform into a luxury bespoke living room'
                    : 'Drag slider to witness 5500K natural sunlight transition into 2400K evening ambient illumination'
                  }
                </p>
              </div>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#1A1815]/8 shadow-xs self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setComparisonMode('empty-to-furnished')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  comparisonMode === 'empty-to-furnished'
                    ? 'bg-[#9C5427] text-white shadow-xs'
                    : 'bg-transparent text-[#1A1815] hover:bg-neutral-100'
                }`}
              >
                Before &amp; After (Bare-Shell ➔ Furnished)
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode('circadian-day-night')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  comparisonMode === 'circadian-day-night'
                    ? 'bg-[#9C5427] text-white shadow-xs'
                    : 'bg-transparent text-[#1A1815] hover:bg-neutral-100'
                }`}
              >
                Circadian Lighting Mode
              </button>
            </div>
          </div>

          {/* Quick Presets & Real-Time Ratio Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
            
            {/* Real-time Status Badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#9C5427]/20 text-xs text-[#1A1815] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9C5427] animate-pulse" />
                {comparisonMode === 'empty-to-furnished' ? (
                  <>
                    <span className="font-semibold text-[#1A1815]">
                      {sliderPosition > 70 
                        ? '🏗️ Inspecting Empty Bare-Shell Stage' 
                        : sliderPosition < 30 
                        ? '✨ Inspecting Fully Finished Interior' 
                        : '⚖️ 50 / 50 Transformation Split'
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-mono font-bold text-[#9C5427]">{currentKelvin}K</span>
                    <span className="text-[#68625A]">
                      {currentKelvin > 4500 ? 'Daylight Golden Hour' : '2400K Evening Warmth'}
                    </span>
                  </>
                )}
              </div>

              <span className="text-[11px] text-[#7C6F5E] hidden md:inline">
                Before: {Math.round(sliderPosition)}% &bull; After: {Math.round(100 - sliderPosition)}%
              </span>
            </div>

            {/* Preset Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSliderPosition(100)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                  sliderPosition >= 95 
                    ? 'bg-[#1C1917] text-white border-[#1C1917]' 
                    : 'bg-white hover:bg-neutral-100 text-[#68625A] border-[#1A1815]/10'
                }`}
              >
                {comparisonMode === 'empty-to-furnished' ? '🏗️ 100% Empty Room' : '☀️ 100% Day'}
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                  sliderPosition > 40 && sliderPosition < 60 
                    ? 'bg-[#1C1917] text-white border-[#1C1917]' 
                    : 'bg-white hover:bg-neutral-100 text-[#68625A] border-[#1A1815]/10'
                }`}
              >
                50 / 50 Split
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(0)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                  sliderPosition <= 5 
                    ? 'bg-[#1C1917] text-white border-[#1C1917]' 
                    : 'bg-white hover:bg-neutral-100 text-[#68625A] border-[#1A1815]/10'
                }`}
              >
                {comparisonMode === 'empty-to-furnished' ? '✨ 100% Filled Interior' : '🌙 100% Evening'}
              </button>

              {comparisonMode === 'empty-to-furnished' && (
                <button
                  type="button"
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                    showHotspots ? 'bg-[#FFF3E9] text-[#9C5427] border-[#9C5427]/30' : 'bg-white text-[#8C8275] border-[#1A1815]/10'
                  }`}
                  title="Toggle Design Hotspots"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showHotspots ? 'Pins On' : 'Pins Off'}</span>
                </button>
              )}
            </div>

          </div>

          {/* Master Interactive Before / After Canvas */}
          <div 
            ref={sliderContainerRef}
            className="relative w-full h-[460px] sm:h-[560px] lg:h-[640px] rounded-3xl overflow-hidden border border-[#9C5427]/30 select-none cursor-ew-resize group shadow-[0_24px_60px_rgba(196,120,71,0.22)] bg-[#1A1815]"
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
            {/* ============================================================= */}
            {/* LAYER 1: BASE LAYER (AFTER: ROOM FILLED WITH INTERIOR DESIGN)  */}
            {/* ============================================================= */}
            <div className="absolute inset-0 w-full h-full">
              {comparisonMode === 'empty-to-furnished' ? (
                /* MODE 1 AFTER: ROOM FILLED WITH LUXURY INTERIOR DESIGN */
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/images/transformation/furnished-room.jpg"
                    alt="After: Room Filled with Luxury Interior Design"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Soft bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 pointer-events-none" />

                  {/* Top Right AFTER Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#9C5427]/40 text-xs font-semibold text-white flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>AFTER: Filled with Turnkey Interior</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* MODE 2 AFTER: 2400K EVENING AMBIENT LIGHTING */
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/images/casa-noir/hero-living.jpg"
                    alt="Living Room - Evening 2400K Illumination"
                    className="w-full h-full object-cover object-center filter brightness-[0.76] contrast-[1.2] saturate-[1.3] sepia-[0.25]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />
                  <div className="absolute top-[25%] left-[20%] w-[420px] h-[420px] rounded-full bg-[#9C5427]/25 blur-[100px] pointer-events-none" />
                  <div className="absolute top-[30%] right-[25%] w-[460px] h-[460px] rounded-full bg-[#E79F30]/20 blur-[110px] pointer-events-none" />

                  <div className="absolute top-6 right-6 z-20">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#9C5427]/30 text-xs font-medium text-white flex items-center gap-2 shadow-lg">
                      <Moon className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>2400K Circadian Evening Illumination</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================= */}
            {/* LAYER 2: TOP CLIPPED LAYER (BEFORE: EMPTY ROOM)               */}
            {/* ============================================================= */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden transition-[clip-path] duration-75"
              style={{ 
                clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`
              }}
            >
              <div className="relative w-full h-full">
                {comparisonMode === 'empty-to-furnished' ? (
                  /* MODE 1 BEFORE: EMPTY BARE-SHELL ROOM */
                  <>
                    <img
                      src="/images/transformation/empty-room.jpg"
                      alt="Before: Empty Bare-Shell Room"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Subtle blueprint grid overlay on empty room */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-15"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '36px 36px'
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15 pointer-events-none" />

                    {/* Top Left BEFORE Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#1A1815]/15 text-xs font-semibold text-[#1A1815] flex items-center gap-2 shadow-lg">
                        <Building2 className="w-3.5 h-3.5 text-[#9C5427]" />
                        <span>BEFORE: Empty Bare-Shell Room</span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* MODE 2 BEFORE: NATURAL DAYLIGHT */
                  <>
                    <img
                      src="/images/casa-noir/hero-living.jpg"
                      alt="Living Room - Natural Daylight"
                      className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.04] saturate-[1.08]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15 pointer-events-none" />

                    <div className="absolute top-6 left-6 z-20">
                      <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#9C5427]/30 text-xs font-semibold text-[#1A1815] flex items-center gap-2 shadow-lg">
                        <Sun className="w-3.5 h-3.5 text-[#9C5427]" />
                        <span>5500K Natural Daylight &bull; Golden Hour</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ============================================================= */}
            {/* INTERACTIVE HOTSPOTS ANCHORED TO INTERIOR DESIGN CRAFT        */}
            {/* ============================================================= */}
            {showHotspots && comparisonMode === 'empty-to-furnished' && FURNISHED_HOTSPOTS.map((hotspot, idx) => (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === idx ? null : idx);
                  }}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xl transition-all hover:scale-125 cursor-pointer ${
                    activeHotspot === idx 
                      ? 'bg-[#9C5427] text-white ring-4 ring-white/50 scale-110' 
                      : 'bg-white/95 text-[#1A1815] hover:bg-[#9C5427] hover:text-white'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-[#9C5427]/40 animate-ping" />
                  <span className="relative z-10">{activeHotspot === idx ? '✕' : '+'}</span>
                </button>

                {/* Hotspot Floating Tooltip */}
                {activeHotspot === idx && (
                  <div 
                    className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl text-left pointer-events-auto z-30 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-xs font-semibold text-[#FF9E4A] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{hotspot.title}</span>
                    </div>
                    <p className="text-[11px] text-white/85 leading-snug ">
                      {hotspot.desc}
                    </p>
                    <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-[#C49B7E] ">
                      <span>✦ Turnkey Specification</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* ============================================================= */}
            {/* LUXURY METALLIC DRAGGABLE DIVIDER HANDLE                      */}
            {/* ============================================================= */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-white/40 via-white to-white/40 z-20 transition-[left] duration-75 shadow-[0_0_18px_rgba(255,133,38,0.7)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Tactile Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-white via-[#FAF7F2] to-[#EFE2D6] text-[#1A1815] font-bold flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] border-2 border-[#9C5427]/40 transition-transform group-hover:scale-110 active:scale-95">
                <span className="text-[11px] tracking-tight font-mono text-[#9C5427] select-none">
                  ◀▶
                </span>
              </div>
            </div>

            {/* ============================================================= */}
            {/* BOTTOM CAPTION OVERLAY                                        */}
            {/* ============================================================= */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
              <div className="max-w-xl text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#FF9E4A] font-mono block mb-1">
                  PATIA LUXURY PENTHOUSE &bull; 45-DAY TURNKEY HANDOVER
                </span>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-white drop-shadow-md">
                  {comparisonMode === 'empty-to-furnished' 
                    ? 'The 45-Day Architectural Transformation'
                    : 'The Patia Monolithic Villa — Double-Height Atrium'
                  }
                </h4>
                <p className="text-xs sm:text-sm text-white/90 mt-1 line-clamp-2 leading-relaxed drop-shadow">
                  {comparisonMode === 'empty-to-furnished'
                    ? 'Witness the exact transformation from bare walls, raw concrete, and exposed conduits into a fully furnished, warm, circadian-illuminated turnkey home.'
                    : 'Custom travertine hearth, fluted Burma teak acoustic slats, and circadian concealed coves calibrated for dawn-to-dusk wellness.'
                  }
                </p>
              </div>

              <a
                href="#packages"
                className="pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-xs sm:text-sm transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Calculate Your Home&apos;s Budget</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>

        </div>

        {/* ================================================================= */}
        {/* 2. DUAL-TIER CONTINUOUS KINETIC STREAMS (SILKY MARQUEE GALLERIES) */}
        {/* ================================================================= */}
        <div className="mb-28">
          
          {/* Header & Speed Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9C5427] tracking-widest uppercase mb-1">
                <Layers className="w-3.5 h-3.5" /> 
                <span>Kinetic Visual Streams</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-playfair text-[#1A1815] tracking-tight">
                Continuous Stream of <span className="text-copper-gradient">Curated Interiors</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5C564E] mt-0.5">
                Live portfolio filmstrip of turnkey apartments, penthouses, and bespoke villas across Odisha.
              </p>
            </div>

            {/* Marquee Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/95 border border-[#9C5427]/20 rounded-full p-1 text-xs shadow-xs ">
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
                className="w-8 h-8 rounded-full bg-white/95 border border-[#9C5427]/20 flex items-center justify-center text-[#1A1815] hover:bg-[#9C5427] hover:text-white transition-colors shadow-xs cursor-pointer"
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
                  onClick={() => setSelectedItem({
                    id: `stream-1-${index}`,
                    title: img.title,
                    category: 'living',
                    categoryLabel: 'Curated Stream',
                    location: img.loc,
                    area: 'Turnkey Commission',
                    materials: ['Natural Stone', 'Seasoned Teak', 'Circadian Lighting', 'BWP Ply'],
                    image: img.url,
                    description: `${img.title} designed and executed in ${img.loc}, Odisha with bespoke turnkey finishes.`
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
                  onClick={() => setSelectedItem({
                    id: `stream-2-${index}`,
                    title: img.title,
                    category: 'kitchen',
                    categoryLabel: 'Curated Stream',
                    location: img.loc,
                    area: 'Turnkey Commission',
                    materials: ['Artisanal Joinery', 'Calacatta Marble', 'Brushed Brass', 'Fluted Oak'],
                    image: img.url,
                    description: `${img.title} executed with master-grade materials in ${img.loc}, Odisha.`
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

        </div>

        {/* ================================================================= */}
        {/* 3. INTERACTIVE 3D PERSPECTIVE CARDS WITH ROOM CATEGORY FILTER     */}
        {/* ================================================================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9C5427] tracking-widest uppercase mb-1">
                <Compass className="w-3.5 h-3.5" /> 
                <span>Spatial Categories</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-playfair text-[#1A1815] tracking-tight">
                Detailed Interior <span className="text-copper-gradient">Studies &amp; Models</span>
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-white/95 border border-[#9C5427]/20 rounded-full p-1.5 backdrop-blur-lg shadow-sm">
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
                  className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#1C1917] text-white shadow-md font-semibold'
                      : 'text-[#68625A] hover:text-[#1A1815] hover:bg-black/5 font-medium'
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
                    className="relative w-full h-[430px] rounded-2xl overflow-hidden border border-[#9C5427]/20 bg-white transition-transform duration-200 ease-out shadow-lg transform-style-3d group hover:border-[#9C5427]/60 hover:shadow-2xl"
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient & Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#FF9E4A]">
                        {item.categoryLabel}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#9C5427] group-hover:text-white transition-colors shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2">
                      <div className="text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                        <span>{item.location}</span>
                        <span className="text-[#FF9E4A]">{item.area}</span>
                      </div>

                      <h4 className="text-lg font-playfair text-white font-bold leading-snug group-hover:text-[#C49B7E] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Material Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.materials.slice(0, 3).map((mat, mIdx) => (
                          <span
                            key={mIdx}
                            className="px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] text-white "
                          >
                            {mat}
                          </span>
                        ))}
                        {item.materials.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-neutral-300 ">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 lg:p-10 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#FAF7F2] border border-[#1A1815]/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Back Button */}
            <div className="absolute top-4 left-4 z-30">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Back to showcase"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#1A1815]/15 text-[#1A1815] hover:text-[#9C5427] text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#9C5427]" />
                <span>Back</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 border border-[#1A1815]/15 text-[#1A1815] hover:bg-[#9C5427] hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Viewport */}
            <div className="lg:w-3/5 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-[#1A1815]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-[#FF9E4A] font-mono">
                {selectedItem.location}
              </div>
            </div>

            {/* Right Architectural Specifications */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#9C5427]/20 text-xs text-[#9C5427] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#9C5427]" /> 
                  <span>{selectedItem.categoryLabel}</span>
                </div>

                <h3 className="text-2xl font-playfair font-bold text-[#1A1815] leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-[#5C564E] leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="border-t border-[#1A1815]/10 pt-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#7A7369]">Spatial Dimensions</span>
                    <p className="text-sm text-[#1A1815] font-medium ">{selectedItem.area}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#7A7369]">Curated Materials &amp; Finishes</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {selectedItem.materials.map((mat, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#1A1815]/10 text-xs text-[#4A453F] "
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Call to Action */}
              <div className="border-t border-[#1A1815]/10 pt-6 mt-6">
                <a
                  href="#packages"
                  onClick={() => setSelectedItem(null)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-sm transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <span>Get Quote on this Design</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}