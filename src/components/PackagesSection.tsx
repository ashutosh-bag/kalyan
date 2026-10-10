'use client';

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Shield, Clock, Calculator, ArrowRight, X, Phone, User, Mail, MessageSquare } from 'lucide-react';

interface PackageData {
  id: string;
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
    id: '1-bhk',
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
      'Marine Plywood Modular Kitchen with soft-close drawers',
      'Gypsum false ceiling in hall with warm LED cove profiles',
      'Master bedroom sliding wardrobe (7x7 ft)',
      'Designer TV unit console with concealed wiring',
      'Premium Asian Paints Royale luxury emulsion',
    ],
  },
  {
    id: '2-bhk',
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
      'L-Shape / Parallel BWR Modular Kitchen + Tandem carousels',
      'Living & Dining designer false ceiling with dual warm coves',
      'Two full-height master wardrobes with inner vanity',
      'Modern floating TV entertainment wall with fluted louvers',
      'Shoe rack foyer console & breakfast counter bar',
      'Full electrical fittings & chandelier points setup',
    ],
  },
  {
    id: '3-bhk',
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
      'Island / Luxury Modular Kitchen with Quartz top & tall pantry',
      'Full architectural false ceiling across all 3 bedrooms & living',
      'Three master bedroom floor-to-ceiling wardrobes with sensor lights',
      'Grand arched / fluted TV feature wall with vertical acrylic tubes',
      'Puja room wooden mandir unit with CNC laser carving',
      'Dedicated foyer partition & bar cabinet console',
    ],
  },
];

export default function PackagesSection() {
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

  const handleOpenQuote = (pkg: PackageData) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
    setFormSubmitted(false);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // In real scenario this syncs to API
    }, 500);
  };

  return (
    <section id="packages" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF3E9] relative overflow-hidden select-none">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF8526]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#FFA65C]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header matching exact client title typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#FF8526]/20 shadow-xs mb-3">
              <Sparkles className="w-4 h-4 text-[#FF8526] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-century font-semibold text-[#FF8526]">
                Transparent Turnkey Pricing
              </span>
            </div>
            
            {/* EXACT FONT: Bounce Dash for "Full Interior Packages" */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bounce text-black tracking-wide leading-tight">
              Full Interior <span className="text-[#FF8526]">Packages</span>
            </h2>
            <p className="mt-3 text-[#5C564E] font-century text-base sm:text-lg max-w-2xl leading-relaxed">
              Tailored residential turnkey packages engineered for Odisha homes with 100% material transparency, no hidden charges, and assured 45-day on-time handover.
            </p>
          </div>

          {/* Floating Trust Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-[#1A1815]/10 shadow-xs animate-float">
              <Shield className="w-4 h-4 text-[#FF8526]" />
              <span className="text-xs font-century font-medium text-[#1A1815]">5-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-[#1A1815]/10 shadow-xs animate-float-reverse">
              <Clock className="w-4 h-4 text-[#FF8526]" />
              <span className="text-xs font-century font-medium text-[#1A1815]">45 Days Delivery</span>
            </div>
          </div>
        </div>

        {/* 3 Package Cards matching exact design in screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {PACKAGES.map((pkg) => {
            const isPop = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                  isPop
                    ? 'border-[#FF8526] shadow-[0_12px_40px_rgba(255,133,38,0.18)] hover:shadow-[0_20px_50px_rgba(255,133,38,0.28)]'
                    : 'border-[#1A1815]/10 hover:border-[#FF8526]/50 shadow-md hover:shadow-2xl'
                }`}
              >
                {/* Popular / Best Value Ribbon */}
                {pkg.badge && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 rounded-full text-[10px] font-century uppercase font-bold tracking-wider bg-[#FF8526] text-white shadow-md animate-pulse">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Image Container with Exact Bottom-Right Tag Overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1815]/5">
                    <img
                      src={pkg.image}
                      alt={pkg.bhk}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 vivid-image"
                    />

                    {/* Gradient Overlay for Crisp Pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                    {/* EXACT OVERLAY TAG: White Box at bottom-right of image */}
                    <div className="absolute bottom-0 right-0 bg-white px-5 py-2.5 shadow-lg border-t border-l border-[#1A1815]/10 z-10 transition-transform duration-300 group-hover:translate-x-0">
                      <span className="font-century text-base sm:text-lg font-bold tracking-wider text-[#1A1815] uppercase">
                        {pkg.bhk}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    {/* Price Line matching exact text in screenshot */}
                    <div className="mb-5 pb-4 border-b border-[#1A1815]/10">
                      <div className="font-century text-sm uppercase tracking-wider font-semibold text-[#1A1815]">
                        PRICE STARTING{' '}
                        <span className="text-[#FF8526] text-lg sm:text-xl font-bold ml-1 font-century">
                          {pkg.price}
                        </span>
                      </div>
                    </div>

                    {/* Feature Bullet Points matching screenshot */}
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm font-century text-[#1A1815] leading-relaxed">
                          <span className="text-black text-sm mr-2.5 font-bold leading-none select-none">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Detailed Specifications Preview Drawer */}
                    <div className="p-3.5 rounded-xl bg-[#FFF3E9]/60 border border-[#FF8526]/15 space-y-1.5 mb-6 text-xs font-century text-[#5C564E]">
                      <div className="font-semibold text-[#1A1815] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8526]" />
                        <span>Included Scope of Work:</span>
                      </div>
                      {pkg.breakdown.slice(0, 3).map((item, i) => (
                        <p key={i} className="line-clamp-1 leading-snug">
                          ✓ {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EXACT BUTTON: Orange Pill/Rounded Button with Courgette Font */}
                <div className="px-6 pb-7">
                  <button
                    type="button"
                    onClick={() => handleOpenQuote(pkg)}
                    className="w-full relative group/btn overflow-hidden bg-[#FF8526] hover:bg-[#f27412] active:scale-95 text-white font-courgette text-xl sm:text-2xl py-3 px-6 rounded-xl shadow-md hover:shadow-[0_8px_25px_rgba(255,133,38,0.4)] transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <span className="relative z-10 tracking-wide text-white drop-shadow-sm">
                      Get Quote
                    </span>
                    {/* Shimmer sweep effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Decorative Flourish */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#FF8526]/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFF3E9] border border-[#FF8526]/30 flex items-center justify-center flex-shrink-0 animate-glow-pulse">
              <Calculator className="w-7 h-7 text-[#FF8526]" />
            </div>
            <div>
              <h3 className="font-bounce text-xl sm:text-2xl text-black">
                Need a Custom Duplex or Villa Quotation?
              </h3>
              <p className="text-xs sm:text-sm font-century text-[#5C564E] mt-0.5">
                Our principal architects visit your Bhubaneswar/Cuttack site for free measurement and 3D concept layout.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleOpenQuote(PACKAGES[1])}
            className="px-6 py-3 rounded-xl bg-[#1A1815] hover:bg-[#FF8526] text-white font-courgette text-lg transition-all duration-300 shadow-md whitespace-nowrap cursor-pointer hover:scale-105"
          >
            Schedule Free Site Visit
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE QUOTE MODAL                                                    */}
      {/* ========================================================================= */}
      {modalOpen && selectedPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#FFF3E9] rounded-2xl shadow-2xl border border-[#FF8526]/30 overflow-hidden my-8">
            
            {/* Header */}
            <div className="bg-[#FF8526] p-5 sm:p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-century font-medium text-white/90">
                  Instant Cost Calculation
                </span>
                <h3 className="font-bounce text-2xl sm:text-3xl text-white">
                  Get Quote: {selectedPkg.bhk}
                </h3>
                <p className="font-century text-xs sm:text-sm text-white/90 mt-0.5">
                  Package starting from <span className="font-bold">{selectedPkg.price}</span> (Turnkey All-Inclusive)
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#FF8526]/20 text-[#FF8526] mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#FF8526]" />
                  </div>
                  <h4 className="font-bounce text-2xl text-black mb-2">
                    Quote Request Received!
                  </h4>
                  <p className="font-century text-sm text-[#5C564E] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-black">{formData.name || 'valued client'}</strong>. Our senior designer is preparing the itemized estimate for your {selectedPkg.bhk} and will call you on <strong className="text-black">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-[#FF8526] text-white font-courgette text-lg rounded-xl shadow-md hover:bg-[#e87417]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  {/* Included Scope Summary */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#1A1815]/10 text-xs font-century space-y-1">
                    <div className="font-bold text-[#1A1815]">What is included in {selectedPkg.bhk}:</div>
                    <ul className="text-[#5C564E] list-disc list-inside space-y-0.5">
                      {selectedPkg.breakdown.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-century font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#FF8526] focus:ring-2 focus:ring-[#FF8526]/20 font-century text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-century font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
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
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#FF8526] focus:ring-2 focus:ring-[#FF8526]/20 font-century text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-century font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#8A847C]" />
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#FF8526] focus:ring-2 focus:ring-[#FF8526]/20 font-century text-sm outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-century font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                      Project Location (Odisha)
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#FF8526] font-century text-sm outline-none"
                    >
                      <option value="Bhubaneswar">Bhubaneswar (Patia, Chandrasekharpur, Khandagiri, etc.)</option>
                      <option value="Cuttack">Cuttack (CDA, Link Road, Cantonment)</option>
                      <option value="Puri">Puri (Marine Drive, VIP Road)</option>
                      <option value="Other">Other parts of Odisha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-century font-bold text-[#1A1815] mb-1 uppercase tracking-wider">
                      Specific Requirements or Move-in Date
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for modular kitchen + false ceiling in living room within 45 days..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#1A1815]/15 focus:border-[#FF8526] font-century text-sm outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF8526] hover:bg-[#e87417] text-white font-courgette text-2xl rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer mt-2"
                  >
                    Submit & Download Free Estimate
                  </button>
                  <p className="text-[11px] text-center font-century text-[#7A7369]">
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
