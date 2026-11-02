'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Clock, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  X, 
  Phone, 
  User, 
  Mail, 
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';

interface PackageData {
  id: string;
  category: 'apartment' | 'luxury' | 'compact';
  bhk: string;
  title: string;
  price: string;
  rawPrice: number;
  image: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  breakdown: string[];
}

const PACKAGES: PackageData[] = [
  {
    id: 'studio-smart',
    category: 'compact',
    bhk: 'STUDIO / 1 RK INTERIOR',
    title: 'Studio & Compact Smart Interior',
    price: 'RS. 1.8 LAKH',
    rawPrice: 180000,
    badge: 'QUICK 30-DAY',
    image: '/images/casa-noir/urban-wood.jpg',
    features: [
      'Upto 5 years warranty',
      'Rapid 30-Day handover',
      'Multifunctional space-saving engineering',
    ],
    breakdown: [
      'Compact modular straight kitchen with chimney ducting & stainless sink',
      'Murphy wall fold-down bed or smart hydraulic storage bed base',
      'Minimalist floating TV unit & work-from-home desk combo',
      'Full-length 2-door wardrobe with sliding mirror panel',
      'Circadian cove false ceiling with warm anti-glare downlights',
      'Premium Asian Paints Royale luxury emulsion with putty primer',
    ],
  },
  {
    id: '1-bhk',
    category: 'apartment',
    bhk: '1 BHK INTERIOR',
    title: '1 BHK Complete Interior',
    price: 'RS. 2.5 LAKH',
    rawPrice: 250000,
    image: '/images/kalyan/assets/newimg10-DwGVxI1Z.png',
    features: [
      'Upto 5 years warranty',
      '45 Days delivery',
      'Get Free estimate site visit consultancy',
    ],
    breakdown: [
      'Marine Plywood Modular Kitchen with soft-close tandem drawers',
      'Gypsum false ceiling in living room with warm LED cove profiles',
      'Master bedroom sliding wardrobe (7x7 ft) with inner dressing vanity',
      'Designer TV unit console with concealed wire management',
      'Shoe rack entry console & foyer lighting accent point',
      'Premium Asian Paints Royale luxury emulsion wash-resistant finish',
    ],
  },
  {
    id: '2-bhk',
    category: 'apartment',
    bhk: '2 BHK INTERIOR',
    title: '2 BHK Luxury Interior',
    price: 'RS. 3.5 LAKH',
    rawPrice: 350000,
    popular: true,
    badge: 'MOST POPULAR',
    image: '/images/kalyan/assets/newimg9-XV0W4WBw.png',
    features: [
      'Upto 5 years warranty',
      '45 Days delivery',
      'Get Free estimate site visit consultancy',
    ],
    breakdown: [
      'L-Shape / Parallel BWR Modular Kitchen with corner tandem carousels',
      'Living & Dining designer false ceiling with dual warm coves',
      'Two full-height master wardrobes with built-in dresser & mirrors',
      'Modern floating TV entertainment wall with fluted louvers',
      'Shoe rack foyer console & breakfast counter bar extension',
      'Full branded electrical fittings & chandelier suspension points',
    ],
  },
  {
    id: '3-bhk',
    category: 'apartment',
    bhk: '3 BHK INTERIOR',
    title: '3 BHK Royal Interior',
    price: 'RS. 4.5 LAKH',
    rawPrice: 450000,
    badge: 'BEST VALUE',
    image: '/images/kalyan/assets/newimg8-BqfkerF6.png',
    features: [
      'Upto 5 years warranty',
      '45 Days delivery',
      'Get Free estimate site visit consultancy',
    ],
    breakdown: [
      'Island / Luxury Modular Kitchen with quartz countertop & tall pantry',
      'Full architectural false ceiling across all 3 bedrooms, hall & dining',
      'Three master bedroom floor-to-ceiling wardrobes with sensor LEDs',
      'Grand arched / fluted TV feature wall with vertical acrylic accents',
      'Puja room wooden mandir unit with CNC laser architectural carving',
      'Dedicated foyer partition divider & luxury bar cabinet console',
    ],
  },
  {
    id: '4-bhk-penthouse',
    category: 'luxury',
    bhk: '4 BHK / PENTHOUSE',
    title: '4 BHK Imperial Penthouse',
    price: 'RS. 6.5 LAKH',
    rawPrice: 650000,
    badge: 'PREMIUM LUXURY',
    image: '/images/kalyan/assets/oo5-D62wu78I.png',
    features: [
      'Upto 10 years warranty',
      '50 Days delivery guarantee',
      'Complete 3D VR walkthrough & Vastu site alignment',
    ],
    breakdown: [
      'Grand double-height acrylic & natural veneer feature entertainment wall',
      'Four master bedroom sliding & walk-in wardrobe suites with profile LEDs',
      'Designer island culinary kitchen with imported quartz & built-in appliance tall unit',
      'Architectural acoustic false ceilings with magnetic linear tracks & COBs',
      'Handcrafted wooden temple sanctum with backlit brass jaali lattice',
      'Private executive lounge bar counter & customized study library shelves',
    ],
  },
  {
    id: 'villa-duplex',
    category: 'luxury',
    bhk: 'DUPLEX & VILLA',
    title: 'Villa & Duplex Signature',
    price: 'RS. 8.5 LAKH',
    rawPrice: 850000,
    badge: 'ARCHITECTURAL',
    image: '/images/hero/herobg2.png',
    features: [
      '10-Year Comprehensive Carcass Warranty',
      'Turnkey 60-Day Handover with Penalty Clause',
      'Dedicated Project Architect & Daily Site Logs',
    ],
    breakdown: [
      'Bespoke floating staircase railing & vertical architectural wooden louvers',
      'Full double-story living foyer ceiling with custom chandelier suspension',
      'Italian marble floor crystal polish & Khandagiri natural stone wall cladding',
      '5 custom wardrobe suites with tinted lacquered glass & integrated profile LEDs',
      'Smart home automation ready: lighting scene controllers & motorized curtains',
      'Outdoor terrace sit-out pergolas & vertical green botanical accent wall',
    ],
  },
];

export default function PackagesSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'apartment' | 'luxury' | 'compact'>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedPkg, setSelectedPkg] = useState<PackageData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Bhubaneswar',
    notes: '',
  });

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
    setActiveIndex(Math.min(Math.max(newIndex, 0), filteredPackages.length - 1));
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < container.scrollWidth - container.clientWidth - 15);
  };

  const filteredPackages = selectedCategory === 'all'
    ? PACKAGES
    : PACKAGES.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setActiveIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
    }
  }, [selectedCategory, filteredPackages.length]);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenQuote = (pkg: PackageData) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
    setFormSubmitted(false);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: `Package: ${selectedPkg?.bhk} - ${selectedPkg?.price}`,
          location: formData.city,
          message: formData.notes || `Inquiry for ${selectedPkg?.title} (${selectedPkg?.price}) in ${formData.city}`,
        }),
      });
    } catch (err) {
      console.error('Quote submission error', err);
    }
    setFormSubmitted(true);
  };

  return (
    <section id="packages" className="pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] relative overflow-hidden select-none border-t border-[#1A1815]/8">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* =================================================================== */}
        {/* 1. SECTION HEADER                                                   */}
        {/* =================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                TRANSPARENT TURNKEY PRICING
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] tracking-tight leading-tight">
              FULL INTERIOR PACKAGES.
            </h2>
            <p className="mt-3 text-[#68625A] text-sm sm:text-base max-w-2xl leading-relaxed">
              Tailored residential turnkey packages engineered for Odisha homes with 100% material transparency, zero hidden fees, and contractual 45-day on-time handover.
            </p>
          </div>

          {/* Floating Trust Badges with Subtle Pulse */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs hover:border-[#9C5427]/40 transition-colors">
              <Shield className="w-4 h-4 text-[#9C5427]" />
              <span className="text-xs font-semibold text-[#1A1815]">10-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#1A1815]/8 shadow-xs hover:border-[#9C5427]/40 transition-colors">
              <Clock className="w-4 h-4 text-[#9C5427]" />
              <span className="text-xs font-semibold text-[#1A1815]">45-Day Handover</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. CATEGORY FILTER TABS WITH ANIMATED PILL SELECTION                */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {[
            { id: 'all', label: 'All Packages (6)' },
            { id: 'apartment', label: 'Apartments (1, 2, 3 BHK)' },
            { id: 'luxury', label: 'Penthouses & Villas' },
            { id: 'compact', label: 'Studio & Compact (1 RK)' },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1815] text-white shadow-md scale-102'
                    : 'bg-white border border-[#1A1815]/10 text-[#68625A] hover:bg-[#F2ECE4] hover:text-[#1A1815]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-[#9C5427]" />
                )}
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 3. SIDE-BY-SIDE SLIDING CAROUSEL WITH SMOOTH SNAP STOP & SIDE ARROW ARCS */}
        {/* =================================================================== */}
        <div className="relative group/slider">

          {/* Left Side Arrow Arc Button */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous package"
            className={`absolute -left-3 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100`}
            title="Slide to Previous Package"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Side Arrow Arc Button */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Next package"
            className={`absolute -right-3 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#9C5427] text-[#1A1815] hover:text-white shadow-[0_12px_36px_rgba(44,30,22,0.22)] border border-[#1A1815]/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group disabled:opacity-20 disabled:pointer-events-none disabled:hover:scale-100`}
            title="Slide to Next Package"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Side-by-Side Sliding Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex items-stretch gap-6 sm:gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 sm:px-3 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredPackages.map((pkg, idx) => {
              const isPop = pkg.popular;
              const isExpanded = !!expandedCards[pkg.id];

              return (
                <div
                  key={pkg.id}
                  className={`snap-start w-[85vw] sm:w-[380px] md:w-[410px] lg:w-[420px] flex-shrink-0 group relative bg-white rounded-[32px] sm:rounded-[38px] overflow-hidden border transition-all duration-500 ease-out flex flex-col justify-between p-5 sm:p-6 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(156,84,39,0.14)] ${
                    isPop
                      ? 'border-[#9C5427]/50 shadow-[0_16px_45px_rgba(156,84,39,0.12)]'
                      : 'border-[#1A1815]/8 shadow-[0_10px_35px_rgba(26,24,21,0.04)] hover:border-[#9C5427]/40'
                  }`}
                >
                  {/* Diagonal Light Shimmer Sweep Animation on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20" />

                  {/* Popular / Best Value Ribbon with Glowing Pulse */}
                  {pkg.badge && (
                    <div className="absolute top-8 right-8 z-20">
                      <span className="relative inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#9C5427] text-white shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Image Container with Smooth 700ms Scale Animation */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#1A1815]/5 mb-5">
                      <img
                        src={pkg.image}
                        alt={pkg.bhk}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* BHK Pill Tag */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs border border-[#1A1815]/5">
                        <span className="text-xs font-bold tracking-wide text-[#1A1815] uppercase">
                          {pkg.bhk}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div>
                      {/* Title & Price Header */}
                      <h3 className="font-bold text-lg text-[#1A1815] group-hover:text-[#9C5427] transition-colors mb-2">
                        {pkg.title}
                      </h3>

                      {/* Price Line */}
                      <div className="mb-4 pb-3 border-b border-[#1A1815]/8 flex items-baseline justify-between">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#7A7369]">
                          Turnkey Starting From
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-[#9C5427] tracking-tight">
                          {pkg.price}
                        </span>
                      </div>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-2.5 mb-5">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start text-xs sm:text-sm text-[#1A1815] leading-relaxed">
                            <span className="text-[#9C5427] text-sm mr-2 font-bold leading-none select-none">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Interactive Expandable Scope Drawer with Smooth Accordion Animation */}
                      <div className="mb-6 rounded-2xl bg-[#FAF8F5] border border-[#1A1815]/6 overflow-hidden transition-all duration-300">
                        <button
                          type="button"
                          onClick={() => toggleExpand(pkg.id)}
                          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F2ECE4] transition-colors cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          <div className="font-semibold text-[#1A1815] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9C5427]" />
                            <span>Included Scope ({pkg.breakdown.length} Items)</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#9C5427]">
                            <span>{isExpanded ? 'Hide' : 'View All'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        <div className={`px-3.5 pb-3.5 text-xs text-[#68625A] space-y-1.5 transition-all duration-300 ${
                          isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-24 opacity-90'
                        }`}>
                          {(isExpanded ? pkg.breakdown : pkg.breakdown.slice(0, 3)).map((item, i) => (
                            <p key={i} className="leading-snug flex items-start gap-1.5">
                              <span className="text-[#9C5427] font-bold">✓</span>
                              <span>{item}</span>
                            </p>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Button: Terracotta Pill with Animated Hover Arrow Slide */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenQuote(pkg)}
                      className="group/btn w-full rounded-full py-3.5 px-6 bg-[#9C5427] hover:bg-[#85451D] active:scale-98 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Free Estimate</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Pagination Indicators & Slide Counter */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {filteredPackages.map((pkg, idx) => (
              <button
                key={pkg.id}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to ${pkg.bhk}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx 
                    ? 'w-8 bg-[#9C5427]' 
                    : 'w-2 bg-[#1A1815]/20 hover:bg-[#1A1815]/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE QUOTE MODAL (ANIMATED POPUP)                                */}
      {/* ========================================================================= */}
      {modalOpen && selectedPkg && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#FFF3E9] rounded-3xl shadow-2xl border border-[#9C5427]/30 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-[#9C5427] p-5 sm:p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-medium text-white/90">
                  Instant Cost Calculation
                </span>
                <h3 className="font-sans font-black uppercase text-2xl sm:text-3xl text-white tracking-tight">
                  Get Quote: {selectedPkg.bhk}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                  Package starting from <span className="font-bold underline">{selectedPkg.price}</span> (Turnkey All-Inclusive)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#9C5427]/20 text-[#9C5427] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#9C5427]" />
                  </div>
                  <h4 className="font-sans font-black uppercase text-2xl text-black">
                    Quote Request Received!
                  </h4>
                  <p className="text-sm text-[#5C564E] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-black">{formData.name || 'valued client'}</strong>. Our senior designer is preparing the itemized estimate for your {selectedPkg.bhk} and will call you on <strong className="text-black">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mt-6 px-7 py-3 bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  {/* Included Scope Summary */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#1A1815]/10 text-xs space-y-1">
                    <div className="font-bold text-[#1A1815]">What is included in {selectedPkg.bhk}:</div>
                    <ul className="text-[#5C564E] list-disc list-inside space-y-0.5 max-h-32 overflow-y-auto">
                      {selectedPkg.breakdown.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#8A847C]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Soumya Ranjan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#9C5427] focus:ring-2 focus:ring-[#9C5427]/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#8A847C]" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#9C5427] focus:ring-2 focus:ring-[#9C5427]/20 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#8A847C]" />
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#9C5427] focus:ring-2 focus:ring-[#9C5427]/20 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                      Project Location (Odisha)
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#9C5427] text-sm outline-none"
                    >
                      <option value="Bhubaneswar">Bhubaneswar (Patia, Chandrasekharpur, Khandagiri, etc.)</option>
                      <option value="Cuttack">Cuttack (CDA, Link Road, Cantonment)</option>
                      <option value="Puri">Puri (Marine Drive, VIP Road)</option>
                      <option value="Other">Other parts of Odisha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                      Specific Requirements or Move-in Date
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for modular kitchen + false ceiling in living room within 45 days..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#9C5427] text-sm outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer mt-2"
                  >
                    Submit &amp; Download Free Estimate
                  </button>
                  <p className="text-[11px] text-center text-[#7A7369]">
                    🔒 No spam. Our team will contact you within 2 business hours.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
