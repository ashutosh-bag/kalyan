'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  Award,
  PhoneCall,
  Star,
  Truck,
  RotateCcw,
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Info,
  CheckCircle2,
  Layers,
  Compass,
  MessageCircle,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';

interface Hotspot {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  spec: string;
  badge: string;
}

interface SpaceShowcase {
  id: string;
  label: string;
  icon: string;
  title: string;
  tagline: string;
  image: string;
  meta: string;
  hotspots: Hotspot[];
}

const SHOWCASE_TABS: SpaceShowcase[] = [
  {
    id: 'living',
    label: 'Living Room',
    icon: '🛋️',
    title: 'Curved Lounge & Greenery',
    tagline: 'Custom bouclé sectional, fiddle-leaf fig tree & warm brass arc floor illumination',
    image: '/images/casa-noir/hero-living.jpg',
    meta: 'Bhubaneswar Villa • 1,450 sq ft',
    hotspots: [
      {
        id: 1,
        x: 38,
        y: 68,
        title: 'Custom Curved Bouclé Sectional',
        spec: 'Belgian woven bouclé upholstery with high-resilience ergonomic core',
        badge: 'Bespoke Joinery',
      },
      {
        id: 2,
        x: 74,
        y: 34,
        title: 'Fluted Acoustic Oak Panelling',
        spec: 'Grade-A natural oak fluting with integrated 2700K ambient LED glow',
        badge: 'Acoustic Wood',
      },
      {
        id: 3,
        x: 22,
        y: 30,
        title: 'Brass Arc Floor Pendant',
        spec: 'Hand-spun brushed brass arc with circadian warm diffused glow',
        badge: 'Architectural Lighting',
      },
      {
        id: 4,
        x: 88,
        y: 70,
        title: 'Specimen Fiddle-Leaf Fig',
        spec: 'Live indoor botanical in hand-thrown artisanal terracotta planter',
        badge: 'Botanical Accent',
      },
    ],
  },
  {
    id: 'bedroom',
    label: 'Master Suite',
    icon: '🛏️',
    title: 'Fluted Acoustic Master Suite',
    tagline: 'Vertical LED timber headboard, linen textures & floor-to-ceiling glass garden view',
    image: '/images/casa-noir/bedroom.jpg',
    meta: 'Patia Duplex • 520 sq ft',
    hotspots: [
      {
        id: 5,
        x: 48,
        y: 56,
        title: 'Vertical LED Timber Headboard',
        spec: 'Solid teak slats with concealed indirect warm circadian backlighting',
        badge: 'Master Suite',
      },
      {
        id: 6,
        x: 76,
        y: 62,
        title: 'Floating Oak Nightstand',
        spec: 'BWP Marine Ply base with German Hafele soft-close concealed runners',
        badge: '10-Yr Warranty',
      },
      {
        id: 7,
        x: 18,
        y: 42,
        title: 'Acoustic Oatmeal Linen Drapes',
        spec: '100% Belgian blackout linen with motorized silent track system',
        badge: 'Thermal Comfort',
      },
    ],
  },
  {
    id: 'dining',
    label: 'Urban Wood',
    icon: '🍷',
    title: 'Solid Oak Dining & Olive Plant',
    tagline: 'Scandinavian handcrafted dining suite, fresh botanical foliage & brass pendant glow',
    image: '/images/casa-noir/urban-wood.jpg',
    meta: 'Cuttack Penthouse • 460 sq ft',
    hotspots: [
      {
        id: 8,
        x: 52,
        y: 64,
        title: 'Handcrafted Oak Dining Ensemble',
        spec: 'Kiln-dried solid oak 6-seater with chamfered edges and rounded corners',
        badge: 'Kiln-Dried Timber',
      },
      {
        id: 9,
        x: 52,
        y: 24,
        title: 'Sculptural Brass Linear Chandelier',
        spec: 'Architectural champagne brass body with warm 3000K diffused downward beam',
        badge: 'Signature Lighting',
      },
      {
        id: 10,
        x: 84,
        y: 52,
        title: 'Mediterranean Olive Botanical',
        spec: 'Specimen indoor olive foliage in matte stoneware ceramic urn',
        badge: 'Biophilic Touch',
      },
    ],
  },
  {
    id: 'lounge',
    label: 'Cozy Nook',
    icon: '🌿',
    title: 'Sunlit Reading Nook',
    tagline: 'Bouclé armchair, arched floor lamp & potted monstera plant in warm limewash finish',
    image: '/images/casa-noir/cozy-living.jpg',
    meta: 'Puri Beachside Residence • 380 sq ft',
    hotspots: [
      {
        id: 11,
        x: 44,
        y: 64,
        title: 'Sculpted Bouclé Lounge Chair',
        spec: 'Deep ergonomic contours with solid ash wood tapered legs',
        badge: 'Comfort Craft',
      },
      {
        id: 12,
        x: 24,
        y: 36,
        title: 'Minimalist Arc Task Lamp',
        spec: 'Precision spun matte brass with directional reading beam',
        badge: 'Ambient Reading',
      },
      {
        id: 13,
        x: 82,
        y: 66,
        title: 'Monstera Deliciosa Accent',
        spec: 'Lush tropical plant in fluted earthenware planter with drainage plate',
        badge: 'Natural Foliage',
      },
    ],
  },
];

const ESTIMATE_CONFIGS: Record<string, { price: string; time: string; desc: string }> = {
  '3-bhk': {
    price: '₹4.50 Lakhs',
    time: '45 Days Handover',
    desc: 'Full Living, 3 Bedrooms, Modular Kitchen, Wardrobes & Concealed Warm LED Lighting',
  },
  '2-bhk': {
    price: '₹3.50 Lakhs',
    time: '40 Days Handover',
    desc: 'Turnkey Living, 2 Designer Bedrooms, Acrylic Modular Kitchen & Premium Soft-Close',
  },
  '1-bhk': {
    price: '₹2.50 Lakhs',
    time: '35 Days Handover',
    desc: 'Smart Compact Living, Master Suite, Functional Kitchen & Space-saving Storage',
  },
  'villa': {
    price: '₹7.50L - ₹15L',
    time: '60 Days Handover',
    desc: 'Architect-led Bespoke Villa / Duplex with Custom Joinery, Italian Marbles & Landscaping',
  },
  'custom': {
    price: 'Bespoke Quote',
    time: 'Tailored Schedule',
    desc: 'Specialized Single Room, Acoustic Home Theatre, or Luxury Teak Woodwork Overhaul',
  },
};

const CATEGORIES = [
  {
    id: 'living-room',
    name: 'Living Room',
    subtitle: 'Sofas, Consoles & Wall Media',
    projectsCount: '140+ Delivered',
    image: '/images/casa-noir/hero-living.jpg',
    href: '#spatial-showcase',
    tag: 'Signature Space',
  },
  {
    id: 'bedroom',
    name: 'Master Suite',
    subtitle: 'Beds, Fluted Walls & Wardrobes',
    projectsCount: '95+ Suites',
    image: '/images/casa-noir/bedroom.jpg',
    href: '#projects',
    tag: 'Turnkey Suite',
  },
  {
    id: 'decor',
    name: 'Décor & Plants',
    subtitle: 'Ceramic Urns & Botanical Accents',
    projectsCount: '80+ Homes Styled',
    image: '/images/casa-noir/decor-pampas.jpg',
    href: '#packages',
    tag: 'Artisanal Clay',
  },
  {
    id: 'lighting',
    name: 'Architectural Lighting',
    subtitle: 'Circadian Pendants & Concealed LEDs',
    projectsCount: '110+ Schemes',
    image: '/images/casa-noir/lighting-plant.jpg',
    href: '#spatial-showcase',
    tag: 'Circadian Warmth',
  },
];

const FEATURED_COLLECTIONS = [
  {
    id: 'modern-minimal',
    title: 'Modern Minimal',
    subtitle: 'Modular Serenity & Plant Accents',
    material: 'Natural Teak & Linen',
    startingPrice: 'From ₹2.8L',
    category: 'minimal',
    image: '/images/casa-noir/hero-living.jpg',
    href: '#projects',
  },
  {
    id: 'urban-wood',
    title: 'Urban Wood',
    subtitle: 'Solid Teak, Oak & Olive Greens',
    material: 'European Kiln-Dried Oak',
    startingPrice: 'From ₹3.4L',
    category: 'wood',
    image: '/images/casa-noir/urban-wood.jpg',
    href: '#packages',
  },
  {
    id: 'neutral-decor',
    title: 'Neutral Décor',
    subtitle: 'Curved Consoles & Dried Pampas',
    material: 'Belgian Bouclé & Pampas',
    startingPrice: 'From ₹2.2L',
    category: 'neutral',
    image: '/images/casa-noir/neutral-decor.jpg',
    href: '#spatial-showcase',
  },
  {
    id: 'cozy-living',
    title: 'Cozy Living',
    subtitle: 'Lounge Comfort & Monstera Foliage',
    material: 'Limewash & Clay Urns',
    startingPrice: 'From ₹3.1L',
    category: 'cozy',
    image: '/images/casa-noir/cozy-living.jpg',
    href: '#contact',
  },
];

const VALUE_PILLARS = [
  {
    num: '01',
    icon: <Truck className="w-5 h-5 text-[#C47847]" />,
    title: 'Guaranteed 45-Day Handover',
    desc: 'Contractual penalty-backed delivery promise with daily WhatsApp photo logs',
  },
  {
    num: '02',
    icon: <Award className="w-5 h-5 text-[#C47847]" />,
    title: 'BWP Marine Ply & Teak',
    desc: '100% boiling water-proof, termite-resistant calibrated ply & solid teak joinery',
  },
  {
    num: '03',
    icon: <ShieldCheck className="w-5 h-5 text-[#C47847]" />,
    title: '10-Year Comprehensive Warranty',
    desc: 'Certified German Hafele & Hettich soft-close runner systems and hinges',
  },
  {
    num: '04',
    icon: <Headphones className="w-5 h-5 text-[#C47847]" />,
    title: 'Direct Senior Architect Lead',
    desc: 'Personalized site management by licensed architects from concept to keys',
  },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>('living');
  const [selectedSpace, setSelectedSpace] = useState<string>('living-room');
  const [selectedCategory, setSelectedCategory] = useState<string>('3-bhk');
  const [selectedStyle, setSelectedStyle] = useState<string>('modern-minimal');
  
  // Interactive Hotspot & Media state
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [activeCollectionFilter, setActiveCollectionFilter] = useState<string>('all');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentShowcase = SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0];
  const isVideoTab = activeTab === 'video';

  // Auto-cycle through photo rooms when not on video tab and not hovered
  useEffect(() => {
    if (isVideoTab || isHovered) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = SHOWCASE_TABS.findIndex((t) => t.id === prev);
        if (currentIndex === -1 || currentIndex === SHOWCASE_TABS.length - 1) {
          return SHOWCASE_TABS[0].id;
        }
        return SHOWCASE_TABS[currentIndex + 1].id;
      });
      setActiveHotspot(null);
    }, 7000);

    return () => clearInterval(timer);
  }, [isVideoTab, isHovered]);

  // Video play/pause toggle handler
  const handleTogglePlayVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleToggleMuteVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  const handleRestartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  const handleEstimateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEl = document.getElementById('packages');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentEstimate = ESTIMATE_CONFIGS[selectedCategory] || ESTIMATE_CONFIGS['3-bhk'];

  const filteredCollections = activeCollectionFilter === 'all'
    ? FEATURED_COLLECTIONS
    : FEATURED_COLLECTIONS.filter((c) => c.category === activeCollectionFilter);

  return (
    <section 
      id="home" 
      className="relative w-full bg-[#FAF7F2] text-[#1C1917] overflow-hidden select-none"
      aria-label="Kalyan Design Studio Turnkey Interiors & Decor"
    >
      {/* ========================================================================= */}
      {/* 1. DYNAMIC AMBIENT LIGHTING, ARCHITECTURAL CONTOURS & GOLDEN RIBBONS     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Warm Ambient Spotlights with Breathing Animation */}
        <div className="absolute -top-24 right-[-10%] w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#FF8526]/14 via-[#E79F30]/10 to-transparent blur-[130px] animate-ambient-pulse" />
        <div className="absolute top-[32%] left-[-15%] w-[780px] h-[780px] rounded-full bg-gradient-to-tr from-[#C47847]/12 via-[#F5D5B8]/35 to-transparent blur-[140px]" />
        <div className="absolute bottom-16 right-[-8%] w-[840px] h-[640px] rounded-full bg-gradient-to-tl from-[#FF8526]/12 via-[#FAF0E6]/50 to-transparent blur-[130px]" />

        {/* Delicate Architectural Coordinates & Crosshairs */}
        <div className="absolute top-28 left-6 sm:left-12 opacity-30 text-[10px] font-mono tracking-widest text-[#8C8275] hidden md:block">
          <span>LAT 20.2961° N • LONG 85.8245° E • BHUBANESWAR</span>
        </div>
        <div className="absolute top-28 right-8 sm:right-16 opacity-30 text-[10px] font-mono tracking-widest text-[#8C8275] hidden md:block">
          <span>PROJECT ARCHIVE // TURNKEY 2026</span>
        </div>

        {/* Dynamic Multi-layered Flowing Golden Curves SVG */}
        <svg 
          viewBox="0 0 1600 1800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="goldRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C47847" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#FF8526" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#E79F30" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5D5B8" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="goldRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9E4A" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#C47847" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="sandWash" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F4EAE0" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#EFE3D5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Golden Sand Wave 1: Swirls under Hero Headline and behind showcase card */}
          <path 
            d="M-100,280 C320,160 580,480 1100,340 C1420,250 1650,420 1750,380" 
            stroke="url(#goldRibbon1)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="filter drop-shadow-[0_8px_16px_rgba(196,120,71,0.22)]"
          />
          <path 
            d="M-80,310 C340,190 600,510 1120,370 C1440,280 1670,450 1770,410" 
            stroke="url(#goldRibbon2)" 
            strokeWidth="1.5" 
            strokeDasharray="6 8"
            opacity="0.75"
          />

          {/* Golden Wave 2: Sweeping sand dunes beneath Category Cards */}
          <path 
            d="M-200,860 C260,780 640,1020 1180,880 C1460,810 1700,940 1850,910" 
            stroke="url(#goldRibbon1)" 
            strokeWidth="3" 
            className="filter drop-shadow-[0_10px_20px_rgba(255,133,38,0.18)]"
          />
          <path 
            d="M-200,900 C280,820 660,1060 1200,920 C1480,850 1720,980 1870,950" 
            stroke="url(#goldRibbon2)" 
            strokeWidth="1.5" 
            opacity="0.65"
          />

          {/* Organic Sand Silhouette Wash */}
          <path 
            d="M-100,920 C320,840 700,1080 1250,940 C1540,860 1750,1000 1850,970 L1850,1180 L-100,1180 Z" 
            fill="url(#sandWash)" 
            opacity="0.4"
          />

          {/* Golden Wave 3: Ribbon towards the botanical wooden shelf */}
          <path 
            d="M-150,1420 C300,1320 720,1540 1200,1400 C1500,1310 1750,1460 1850,1430" 
            stroke="url(#goldRibbon1)" 
            strokeWidth="3.5" 
            className="filter drop-shadow-[0_12px_24px_rgba(196,120,71,0.25)]"
          />
        </svg>

        {/* Botanical Sprigs (Natural Biophilic Framing) */}
        <div className="absolute top-20 right-4 sm:right-12 w-36 h-48 sm:w-48 sm:h-64 opacity-30 pointer-events-none transform rotate-12">
          <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60,170 C60,120 58,60 62,10" stroke="#4A6B43" strokeWidth="2" strokeLinecap="round" />
            <path d="M60,140 C45,135 35,120 40,110 C45,100 60,120 60,140 Z" fill="#5F8257" opacity="0.8" />
            <path d="M60,115 C75,110 85,95 80,85 C75,75 60,95 60,115 Z" fill="#5F8257" opacity="0.8" />
            <path d="M60,85 C42,80 32,65 38,55 C44,45 60,65 60,85 Z" fill="#5F8257" opacity="0.8" />
            <path d="M60,60 C78,55 88,40 82,30 C76,20 60,40 60,60 Z" fill="#5F8257" opacity="0.8" />
            <path d="M62,30 C50,22 46,12 52,6 C58,0 62,18 62,30 Z" fill="#5F8257" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO MAIN EDITORIAL BANNER & INTERACTIVE SHOWCASE                      */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Editorial Headline, Estimator & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Studio Badge with Pulsing Live Indicator */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-1.5 rounded-full bg-white/95 border border-[#C47847]/30 shadow-xs backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF8526] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-century font-semibold uppercase tracking-[0.2em] text-[#A85D2A]">
                Odisha&apos;s Premier Turnkey Studio &bull; 45-Day Handover
              </span>
            </div>

            {/* Editorial Headline with Playfair Display & Clean Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[70px] font-playfair font-normal text-[#1A1815] leading-[1.05] tracking-tight">
                Redefine Your Space <br />
                <span className="text-copper-gradient block text-4xl sm:text-5xl md:text-6xl lg:text-[68px] mt-1 font-normal tracking-normal drop-shadow-xs">
                  with Timeless Elegance
                </span>
              </h1>

              {/* Subtitle with Vertical Copper Accent Line */}
              <div className="flex items-start gap-3 pt-2">
                <div className="w-1.5 h-12 sm:h-10 bg-gradient-to-b from-[#FF8526] to-[#C47847] rounded-full shrink-0 mt-1" />
                <p className="text-[#5C564E] font-century text-base sm:text-lg leading-relaxed max-w-2xl">
                  From bare-shell apartments in Patia to luxury villas in Puri — we sculpt serene living spaces with curved bouclé furniture, solid teak joinery, circadian lighting, and a contractual 45-day handover guarantee.
                </p>
              </div>
            </div>

            {/* Social Proof Facepile & Google Rating */}
            <div className="flex flex-wrap items-center gap-4 py-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  src="/images/kalyan/testimonials/client1.jpg" 
                  alt="Verified Homeowner" 
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client2.jpg" 
                  alt="Verified Homeowner" 
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" 
                />
                <img 
                  src="/images/kalyan/testimonials/client3.jpg" 
                  alt="Verified Homeowner" 
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover" 
                />
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex text-[#FF8526]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF8526] text-[#FF8526]" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-century font-bold text-[#1A1815]">4.9/5.0</span>
                <span className="text-xs text-[#7C6F5E] font-century">
                  (250+ Verified Odisha Homeowners)
                </span>
              </div>

              <a 
                href="#google-reviews" 
                className="text-xs font-century font-semibold text-[#C47847] hover:text-[#9A4B1F] transition-colors underline decoration-dotted underline-offset-4 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Real Reviews</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* CASA NOIR SIGNATURE INTERACTIVE ESTIMATOR & SPACE SELECTOR */}
            <div className="p-3 sm:p-4 rounded-3xl bg-white/95 border border-[#C47847]/25 shadow-[0_16px_40px_rgba(196,120,71,0.12)] backdrop-blur-md space-y-3">
              
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C47847]" />
                  <span className="text-xs font-century font-bold uppercase tracking-wider text-[#1A1815]">
                    Interactive Turnkey Space Planner
                  </span>
                </div>
                <span className="text-[11px] font-century font-medium text-[#FF8526] bg-[#FFF3E9] px-2.5 py-0.5 rounded-full border border-[#FF8526]/20">
                  Instant Budget Calculation
                </span>
              </div>

              {/* 3 Config Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Space Selector */}
                <div className="px-3 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#1A1815]/10 hover:border-[#C47847]/40 transition-colors">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8C8275] mb-0.5">
                    1. Focus Space
                  </span>
                  <div className="relative flex items-center justify-between">
                    <select 
                      value={selectedSpace} 
                      onChange={(e) => setSelectedSpace(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-century font-medium text-[#1A1815] focus:outline-none appearance-none cursor-pointer pr-4"
                    >
                      <option value="living-room">Living Room (Sofas &amp; Consoles)</option>
                      <option value="bedroom">Master Suite (Beds &amp; Storage)</option>
                      <option value="modular-kitchen">Modular Kitchen (Hafele Fitted)</option>
                      <option value="full-home">Complete Full Home</option>
                      <option value="lighting">Lighting &amp; Wall Art</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8C8275] pointer-events-none -ml-3" />
                  </div>
                </div>

                {/* Scope & Size Selector */}
                <div className="px-3 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#1A1815]/10 hover:border-[#C47847]/40 transition-colors">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8C8275] mb-0.5">
                    2. Scope &amp; Size
                  </span>
                  <div className="relative flex items-center justify-between">
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-century font-medium text-[#1A1815] focus:outline-none appearance-none cursor-pointer pr-4"
                    >
                      <option value="3-bhk">Turnkey 3 BHK Package</option>
                      <option value="2-bhk">Turnkey 2 BHK Package</option>
                      <option value="1-bhk">Turnkey 1 BHK Package</option>
                      <option value="villa">Luxury Villa / Duplex</option>
                      <option value="custom">Bespoke Single Space</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8C8275] pointer-events-none -ml-3" />
                  </div>
                </div>

                {/* Aesthetic Style Selector */}
                <div className="px-3 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#1A1815]/10 hover:border-[#C47847]/40 transition-colors">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8C8275] mb-0.5">
                    3. Aesthetic Style
                  </span>
                  <div className="relative flex items-center justify-between">
                    <select 
                      value={selectedStyle} 
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-century font-medium text-[#1A1815] focus:outline-none appearance-none cursor-pointer pr-4"
                    >
                      <option value="modern-minimal">Modern Minimal Japandi</option>
                      <option value="urban-wood">Urban Wood &amp; Solid Teak</option>
                      <option value="neutral-decor">Neutral Décor &amp; Bouclé</option>
                      <option value="cozy-living">Cozy Living &amp; Botanicals</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8C8275] pointer-events-none -ml-3" />
                  </div>
                </div>

              </div>

              {/* Dynamic Instant Calculation Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FFF3E9] via-[#FAF2E8] to-[#FFF3E9] border border-[#C47847]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-playfair font-bold text-lg sm:text-xl text-[#1A1815]">
                      {currentEstimate.price}
                    </span>
                    <span className="text-[11px] font-century font-semibold text-[#A85D2A] bg-white/80 px-2 py-0.5 rounded-md border border-[#C47847]/20">
                      ⚡ {currentEstimate.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68625A] font-century line-clamp-1">
                    {currentEstimate.desc}
                  </p>
                </div>

                <a
                  href="#packages"
                  onClick={handleEstimateClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#C47847] text-white text-xs font-century font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Inclusions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Dual Primary CTAs with WhatsApp Consultation Link */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF8526] to-[#E26F14] hover:from-[#e87417] hover:to-[#ce5f08] text-white text-sm font-century font-semibold tracking-wide shadow-[0_8px_25px_rgba(255,133,38,0.35)] hover:shadow-[0_12px_32px_rgba(255,133,38,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>View Full Turnkey Packages</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917894561230?text=Hi%20Kalyan%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20turnkey%20interior%20estimate%20for%20my%20home."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#1A1815] border border-[#1A1815]/15 text-sm font-century font-medium hover:border-[#25D366] hover:text-[#128C7E] shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Design Lead</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-century font-semibold text-[#8C8275] hover:text-[#1A1815] transition-colors py-2 px-1 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C47847]" />
                <span>Or Request Free Callback</span>
              </a>
            </div>

            {/* Social Proof & Trust Metrics Bar */}
            <div className="pt-4 border-t border-[#1A1815]/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="block font-playfair font-bold text-2xl sm:text-3xl text-[#1A1815]">15+</span>
                <span className="text-xs text-[#68625A] font-century">Years Mastery</span>
              </div>
              <div>
                <span className="block font-playfair font-bold text-2xl sm:text-3xl text-[#1A1815]">500+</span>
                <span className="text-xs text-[#68625A] font-century">Homes Handed Over</span>
              </div>
              <div>
                <div className="flex items-center gap-1 font-playfair font-bold text-2xl sm:text-3xl text-[#1A1815]">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-[#FF8526] text-[#FF8526]" />
                </div>
                <span className="text-xs text-[#68625A] font-century">Verified Google Reviews</span>
              </div>
              <div>
                <span className="block font-playfair font-bold text-2xl sm:text-3xl text-[#1A1815]">45</span>
                <span className="text-xs text-[#68625A] font-century">Days Contractual Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Showcase with Interactive Hotspots & 3D Tour Mode */}
          <div 
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Top Room Selector & 3D Tour Mode Tabs */}
            <div className="flex items-center justify-between gap-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#C47847]/20 mb-3 shadow-xs">
              
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {SHOWCASE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setActiveHotspot(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-century font-medium transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#68625A] hover:text-[#1A1815] hover:bg-black/5'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}

                {/* 3D Walkthrough Cinematic Tour Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('video');
                    setActiveHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-century font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'video'
                      ? 'bg-gradient-to-r from-[#FF8526] to-[#E26F14] text-white shadow-sm'
                      : 'text-[#C47847] hover:bg-[#FFF3E9]'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>3D Tour Reel</span>
                </button>
              </div>

              {/* Hotspot Toggle (Only shown on photo tabs) */}
              {!isVideoTab && (
                <button
                  type="button"
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-century font-medium transition-colors cursor-pointer shrink-0 ${
                    showHotspots ? 'text-[#A85D2A] bg-[#FFF3E9]' : 'text-[#8C8275] hover:bg-black/5'
                  }`}
                  title="Toggle Interactive Design Hotspots"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showHotspots ? 'Pins On' : 'Pins Off'}</span>
                </button>
              )}

            </div>

            {/* Main Showcase Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-[#C47847]/30 bg-white shadow-[0_24px_55px_rgba(196,120,71,0.22)] group">
              
              {/* Aspect Ratio Container */}
              <div className="relative aspect-[4/4.9] w-full overflow-hidden bg-[#1A1815]">
                
                {/* MODE A: 3D TRANSFORMATION VIDEO TOUR */}
                {isVideoTab ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src="/images/kalyan/assets/hero_clean.mp4"
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Video Controls */}
                    <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleTogglePlayVideo}
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/20 shadow-lg cursor-pointer"
                        title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                      >
                        {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleMuteVideo}
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/20 shadow-lg cursor-pointer"
                        title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                      >
                        {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleRestartVideo}
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/20 shadow-lg cursor-pointer"
                        title="Restart 3D Walkthrough"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Video Narrative Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 text-white pointer-events-none">
                      <span className="text-[11px] uppercase tracking-widest text-[#FF9E4A] font-mono block mb-1">
                        ✦ CINEMATIC ARCHITECTURAL TIMELAPSE
                      </span>
                      <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-1.5">
                        Bare-Shell to Turnkey Handover
                      </h3>
                      <p className="text-xs sm:text-sm font-century text-white/90 leading-relaxed">
                        Watch an empty apartment shell transform into a fully furnished, warmly illuminated luxury residence in 45 guaranteed days.
                      </p>
                    </div>

                  </div>
                ) : (
                  /* MODE B: HIGH-RESOLUTION PHOTO WITH INTERACTIVE HOTSPOTS */
                  <div className="relative w-full h-full">
                    <img
                      src={currentShowcase.image}
                      alt={currentShowcase.title}
                      className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                    />

                    {/* Soft Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* INTERACTIVE HOTSPOTS */}
                    {showHotspots && currentShowcase.hotspots.map((hs) => {
                      const isActive = activeHotspot === hs.id;
                      return (
                        <div
                          key={hs.id}
                          className="absolute z-30"
                          style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                        >
                          {/* Pulsing Hotspot Pin */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(isActive ? null : hs.id);
                            }}
                            className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                              isActive 
                                ? 'bg-[#FF8526] scale-110 ring-4 ring-white/60' 
                                : 'bg-white/90 hover:bg-[#FF8526] hover:scale-110 text-[#1A1815] hover:text-white'
                            }`}
                            aria-label={hs.title}
                          >
                            <span className="absolute inset-0 rounded-full bg-[#FF8526]/40 animate-ping" />
                            <span className="text-xs font-bold leading-none select-none">
                              {isActive ? '✕' : '+'}
                            </span>
                          </button>

                          {/* Frosted Glass Specification Popup */}
                          {isActive && (
                            <div 
                              className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl text-white z-40 animate-in fade-in zoom-in-95 duration-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-century font-semibold uppercase tracking-wider text-[#FF9E4A] bg-white/10 px-2 py-0.5 rounded-full">
                                  {hs.badge}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setActiveHotspot(null)}
                                  className="text-white/60 hover:text-white text-xs cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                              <h4 className="font-playfair font-bold text-sm text-white">
                                {hs.title}
                              </h4>
                              <p className="text-[11px] font-century text-white/80 mt-1 leading-snug">
                                {hs.spec}
                              </p>
                              <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-century text-[#FFA65C]">
                                <span>✦ Turnkey Specification</span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Top Left Floating Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/50 shadow-lg text-[11px] font-century font-semibold text-[#1A1815] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8526]" />
                        <span>Kalyan Turnkey Portfolio</span>
                      </div>
                    </div>

                    {/* Top Right Floating Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg text-[11px] font-century font-medium text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF8526]" />
                        <span>45-Day Delivery Promise</span>
                      </div>
                    </div>

                    {/* Bottom Photo Narrative & Controls */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 text-white">
                      
                      {/* Meta location */}
                      <span className="text-[11px] uppercase tracking-widest text-[#FF9E4A] font-mono block mb-1">
                        {currentShowcase.meta}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white mb-1">
                        {currentShowcase.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm font-century text-white/90 line-clamp-2 leading-relaxed mb-3">
                        {currentShowcase.tagline}
                      </p>

                      {/* Room Quick Switcher Dots */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/15">
                        <div className="flex items-center gap-1.5">
                          {SHOWCASE_TABS.map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => {
                                setActiveTab(tab.id);
                                setActiveHotspot(null);
                              }}
                              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                activeTab === tab.id ? 'w-6 bg-[#FF8526]' : 'w-2 bg-white/40 hover:bg-white/70'
                              }`}
                              aria-label={`Switch to ${tab.label}`}
                            />
                          ))}
                        </div>

                        <span className="text-[11px] font-century text-white/70">
                          {showHotspots ? 'Click pins to inspect craft' : 'Turnkey Residence'}
                        </span>
                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* Floating Glass Pill Callout (Bottom-Left overlap) */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-6 z-30 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#C47847]/25 shadow-xl max-w-xs animate-float">
              <div className="w-10 h-10 rounded-xl bg-[#FFF3E9] border border-[#FF8526]/30 flex items-center justify-center text-[#FF8526] shrink-0 font-bold font-playfair">
                10Y
              </div>
              <div>
                <p className="text-xs font-century font-semibold text-[#1A1815]">10-Year Plywood Warranty</p>
                <p className="text-[11px] text-[#68625A]">BWP Marine Ply &amp; German Soft-Close Fittings</p>
              </div>
            </div>

            {/* Floating Glass Pill Callout (Top-Right overlap) */}
            <div className="hidden sm:flex items-center gap-2.5 absolute -top-4 -right-4 z-30 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-[#C47847]/25 shadow-lg animate-float-reverse">
              <Star className="w-4 h-4 fill-[#FF8526] text-[#FF8526]" />
              <span className="text-xs font-century font-semibold text-[#1A1815]">4.9 / 5.0 Rating</span>
              <span className="text-[10px] text-[#8C8275]">(250+ Reviews)</span>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SHOP BY CATEGORY WITH ARCHITECTURAL DETAIL BADGES                     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        
        {/* Section Header with Decorative Golden Lines */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C47847]/40" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-[#1A1815] tracking-tight">
              Shop by <span className="text-copper-gradient">Category</span>
            </h2>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C47847]/40" />
          </div>
          <p className="text-sm sm:text-base text-[#68625A] font-century mt-2">
            Explore dedicated turnkey interior specializations sculpted with warmth, natural greenery, and handcrafted precision.
          </p>
        </div>

        {/* 4-Card Responsive Grid with Signature Circular Arrow Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#C47847]/20 shadow-[0_10px_30px_rgba(196,120,71,0.08)] hover:shadow-[0_22px_50px_rgba(196,120,71,0.22)] transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-2"
            >
              {/* Category Card Image Container */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-[#EFE9DF]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Top Category Tag & Project Count */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-century font-semibold uppercase tracking-wider text-[#1A1815] shadow-xs">
                    {cat.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-century font-medium text-white/90">
                    {cat.projectsCount}
                  </span>
                </div>

                {/* Floating Content: Name & Subtitle at Top/Middle */}
                <div className="absolute top-14 inset-x-0 px-5 text-left z-10 text-white">
                  <h3 className="text-2xl font-playfair font-bold text-white group-hover:text-[#FFA65C] transition-colors drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-century text-white/85 mt-0.5 tracking-wide">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Signature Floating Circular Arrow Button at Bottom Center */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full bg-white text-[#1A1815] group-hover:bg-[#FF8526] group-hover:text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <span className="text-[10px] font-century font-semibold text-white/80 group-hover:text-white transition-colors">
                    Explore Style
                  </span>
                </div>

              </div>
            </a>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. SIGNATURE VALUE PILLARS PILL BAR (Refined Luxury Card with Numbers)     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#C47847]/20 shadow-[0_16px_45px_rgba(196,120,71,0.12)] backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#1A1815]/10">
            {VALUE_PILLARS.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3.5 px-3 lg:px-6 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3E9] group-hover:bg-[#FF8526]/15 border border-[#C47847]/20 flex items-center justify-center shrink-0 shadow-xs transition-colors">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF8526]">
                      {item.num}
                    </span>
                    <h4 className="text-sm font-century font-bold text-[#1A1815] group-hover:text-[#A85D2A] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#68625A] font-century leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FEATURED COLLECTIONS SECTION WITH FILTER CHIPS                         */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        
        {/* Header with Title, Filter Chips & View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-century font-bold uppercase tracking-[0.25em] text-[#C47847] block mb-1">
              Curated Monograph
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair text-[#1A1815] tracking-tight">
              Featured Collections
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'minimal', label: 'Minimalist' },
              { id: 'wood', label: 'Urban Teak' },
              { id: 'neutral', label: 'Neutral Décor' },
              { id: 'cozy', label: 'Cozy Botanicals' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveCollectionFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-century font-medium transition-all duration-300 cursor-pointer ${
                  activeCollectionFilter === f.id
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#68625A] hover:text-[#1A1815] border border-[#1A1815]/10'
                }`}
              >
                {f.label}
              </button>
            ))}

            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A85D2A] hover:bg-[#8F4E22] text-white text-xs font-century font-semibold tracking-wide shadow-md transition-all duration-300 cursor-pointer ml-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4-Card Responsive Grid with Clean White Floating Caption Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredCollections.map((col) => (
            <a
              key={col.id}
              href={col.href}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#C47847]/20 shadow-[0_10px_30px_rgba(196,120,71,0.08)] hover:shadow-[0_20px_45px_rgba(196,120,71,0.22)] transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-2"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-[#EFE9DF]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Soft gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Material Tag Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-century font-medium text-white/90">
                    ✦ {col.material}
                  </span>
                </div>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-century font-bold text-[#1A1815] shadow-sm">
                    {col.startingPrice}
                  </span>
                </div>
              </div>

              {/* White Floating Bottom Caption Pill */}
              <div className="p-3.5 bg-white border-t border-[#1A1815]/5 text-center">
                <h4 className="text-base sm:text-lg font-playfair font-bold text-[#1A1815] group-hover:text-[#FF8526] transition-colors">
                  {col.title}
                </h4>
                <p className="text-[11px] text-[#7C6F5E] font-century mt-0.5">
                  {col.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 6. FLOATING WOODEN SHELF WITH CERAMIC POTS & BOTANICAL PLANTS             */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-[#C47847]/30 shadow-[0_20px_50px_rgba(196,120,71,0.18)] bg-gradient-to-r from-[#F4E9DC] via-[#FAF5EE] to-[#F1E5D7]">
          
          {/* Golden Sand Ribbon SVG Accent Across Banner */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg viewBox="0 0 1200 200" fill="none" className="w-full h-full object-cover">
              <path d="M0,100 C300,40 600,160 1200,80" stroke="#FF8526" strokeWidth="2.5" opacity="0.4" />
              <path d="M0,130 C320,70 620,190 1200,110" stroke="#C47847" strokeWidth="1.5" opacity="0.3" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-6 sm:p-8">
            
            {/* Left: Plant & Ceramic Pottery Still Life */}
            <div className="md:col-span-4 flex items-center justify-center md:justify-start">
              <div className="relative w-full max-w-[280px] h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-white/60">
                <img 
                  src="/images/casa-noir/floating-shelf.jpg" 
                  alt="Ceramic Vases & Eucalyptus Plant on Oak Shelf"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-century font-semibold text-[#1A1815]">
                  ✦ Botanical Craft
                </span>
              </div>
            </div>

            {/* Center: Editorial Headline & Subtitle */}
            <div className="md:col-span-5 text-center md:text-left space-y-1.5">
              <span className="text-[11px] font-century font-bold uppercase tracking-[0.25em] text-[#A85D2A] block">
                Turnkey Living
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-[#1A1815] leading-tight">
                Transform Your Space{' '}
                <span className="text-copper-gradient inline-block font-normal">
                  Today
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5C564E] font-century max-w-md">
                Discover furniture &amp; turnkey architectural spaces that inspire comfort, warmth and everyday style. Zero consultation fee &amp; free 3D layout.
              </p>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col items-center justify-center md:justify-end gap-2.5">
              <a
                href="#packages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#C47847] text-white text-xs sm:text-sm font-century font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917894561230?text=Hi%20Kalyan%20Studio%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#1A1815] border border-[#1A1815]/15 text-xs font-century font-semibold hover:border-[#25D366] hover:text-[#128C7E] transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Instant WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Solid Wooden Shelf Baseline Edge */}
          <div className="w-full h-3 sm:h-4 bg-gradient-to-r from-[#633919] via-[#854E25] to-[#5C3214] shadow-inner" />

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. SOFT ORGANIC WAVE DIVIDER TRANSITIONING INTO PACKAGES SECTION          */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mb-[1px]">
        <svg 
          viewBox="0 0 1440 72" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 lg:h-16 text-[#FFF3E9] preserve-3d"
        >
          <path 
            d="M0,32 C280,64 540,8 840,40 C1140,72 1320,16 1440,32 L1440,72 L0,72 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
}