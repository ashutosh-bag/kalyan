'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Ruler, 
  Compass, 
  PhoneCall, 
  ArrowUpRight 
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  category: 'residential' | 'commercial' | 'rendering' | 'architecture' | 'turnkey';
  line1: string;
  line2: string;
  fullTitle: string;
  image: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  scope: string[];
  materials: string[];
  timeline: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'commercial',
    category: 'commercial',
    line1: 'COMMERCIAL',
    line2: 'INTERIOR DESIGN',
    fullTitle: 'Commercial Interior Design',
    image: '/images/casa-noir/urban-wood.jpg',
    subtitle: 'High-Impact Corporate, Retail & Hospitality Architecture',
    shortDesc: 'Calibrated for optimal employee flow, acoustic serenity, and distinctive corporate brand identity across Odisha.',
    fullDesc: 'We architect modern commercial environments that elevate workplace productivity and brand prestige. From high-energy tech headquarters in Infocity to executive boutique retail lounges, every layout balances ergonomic space planning with durable, high-traffic commercial materials and acoustic ceiling solutions.',
    scope: [
      'Executive cabins & boardrooms with acoustic panelling',
      'Ergonomic open-plan workstations & breakout zones',
      'Commercial lighting systems calibrated for focus',
      'Reception, experiential entrance foyer & brand walls',
      'Fire, HVAC & statutory building code compliance',
    ],
    materials: [
      'Commercial-grade acoustic gypsum tiles',
      'Toughened architectural fluted glass partitions',
      'Heavy-duty commercial carpet & anti-skid porcelain',
      'Custom unlacquered brass and powder-coated steel joinery',
    ],
    timeline: '30 - 60 Days Turnkey Execution',
  },
  {
    id: 'visual-rendering',
    category: 'rendering',
    line1: 'VISUAL DESIGN',
    line2: 'RENDERING',
    fullTitle: 'Visual Design & 3D Rendering',
    image: '/images/casa-noir/decor-pampas.jpg',
    subtitle: 'Photorealistic Raytraced 3D Simulation & Virtual Walkthroughs',
    shortDesc: 'Zero-guesswork architectural previews with daylight studies, realistic material textures, and spatial clarity before execution.',
    fullDesc: 'Eliminate all ambiguity before breaking ground. Our studio renders millimeter-precise photorealistic 3D interior models. You experience natural morning and dusk light simulations, test material combinations, and review custom joinery details in interactive 360-degree virtual space.',
    scope: [
      'Full-room photorealistic 4K architectural renders',
      'Circadian solar angle daylight and nighttime study',
      'Exact material, wood veneer, and paint finish preview',
      'Interactive 360-degree virtual walkthrough tours',
      'Dimensioned 2D execution blueprints aligned to 3D',
    ],
    materials: [
      'High-poly architectural 3D CAD modeling',
      'Physically Based Rendering (PBR) texture mapping',
      'Accurate IES lighting profiles calibrated to real fixtures',
    ],
    timeline: '5 - 10 Business Days Delivery',
  },
  {
    id: 'residential',
    category: 'residential',
    line1: 'RESIDENTIAL',
    line2: 'INTERIOR DESIGN',
    fullTitle: 'Residential Interior Design',
    image: '/images/casa-noir/hero-living.jpg',
    subtitle: 'Bespoke Luxury Living Spaces Tailored to Your Lifestyle',
    shortDesc: 'Refined interiors that balance timeless aesthetic warmth, Vastu spatial harmony, and daily functional ergonomics.',
    fullDesc: 'Our flagship residential design transforms villas, penthouses, and duplex apartments into cohesive sanctuaries of comfort and luxury. We curate every detail from structural civil planning and false ceilings to bespoke furniture, lighting temperature, and hand-selected textiles.',
    scope: [
      'Complete home interior space planning & styling',
      'Master suites, walk-in closets & luxury wardrobes',
      'Living lounges & double-height entertainment zones',
      'Pooja room sanctums with traditional Vastu alignment',
      'Curated art, accessories, and bespoke furnishings',
    ],
    materials: [
      'Seasoned Indian Teakwood & natural wood veneers',
      'Boiling Water Resistant (BWR) marine ply carcasses',
      'Natural Italian marble & Khandagiri sandstone accents',
      'Concealed soft-close Blum & Hettich architectural fittings',
    ],
    timeline: '45-Day Handover Guarantee',
  },
  {
    id: 'space-planning',
    category: 'architecture',
    line1: 'SPACE PLANNING',
    line2: '& ARCHITECTURE',
    fullTitle: 'Space Planning & Architecture',
    image: '/images/kalyan/assets/oo5-D62wu78I.png',
    subtitle: 'Volumetric Flow Optimization & Tropical Cross-Ventilation',
    shortDesc: 'Reinterpreting traditional Odia courtyards with crisp modernist geometry, double-height volumes, and seamless room transitions.',
    fullDesc: 'Great interior design starts with intelligent structural zoning. We eliminate dead square footage, align sightlines with exterior vistas, and introduce natural breeze pathways and double-height architectural volumes that make homes feel expansive, airy, and naturally illuminated.',
    scope: [
      'Structural partition planning & wall removal analysis',
      'Circulation mapping & furniture clearance optimization',
      'Odia climate cross-ventilation & thermal efficiency',
      'MEP (Mechanical, Electrical, Plumbing) master layouts',
      '2D municipal-compliant architectural CAD drawings',
    ],
    materials: [
      'Drywall & moisture-resistant acoustic gypsum dividers',
      'Architectural timber louvers & breeze jalis',
      'Structural steel lintels for open-concept layouts',
    ],
    timeline: '7 - 14 Days Working Blueprints',
  },
  {
    id: 'custom-furniture',
    category: 'residential',
    line1: 'CUSTOM FURNITURE',
    line2: '& JOINERY',
    fullTitle: 'Custom Furniture & Joinery',
    image: '/images/casa-noir/floating-shelf.jpg',
    subtitle: 'Artisan Woodcraft, Fluted Millwork & Tailored Cabinetry',
    shortDesc: 'Handcrafted by master woodworkers using seasoned teakwood, brass inlays, and durable moisture-resistant marine ply.',
    fullDesc: 'Off-the-shelf furniture rarely fits your architecture or your lifestyle. Our in-house joinery unit custom crafts statement dining tables, cantilevered floating media consoles, fluted feature panels, and plush upholstered banquettes built to last generations.',
    scope: [
      'Custom dining tables, bar units & entertainment consoles',
      'Fluted timber accent walls & acoustic feature paneling',
      'Bespoke upholstered sofas, headboards & ottomans',
      'Hidden wire management & integrated ambient LED channels',
      'Factory-finished PU and water-based matte polyurethane coats',
    ],
    materials: [
      'Solid CP Teak & Malaysian Sal wood frameworks',
      'Natural architectural veneers (Burmese Teak, American Walnut)',
      'High-density 40D memory foam & high-martindale fabrics',
      'Solid machined brass edge-banding and hardware',
    ],
    timeline: '20 - 30 Days Factory Fabrication',
  },
  {
    id: 'turnkey',
    category: 'turnkey',
    line1: 'TURNKEY PROJECT',
    line2: 'EXECUTION',
    fullTitle: 'Turnkey Project Execution',
    image: '/images/hero/herobg1.png',
    subtitle: 'Single-Point Accountability from Bare-Shell to Handover',
    shortDesc: 'Zero stress, zero contractor disputes. Guaranteed 45-day handover with dedicated site supervisors and daily digital progress logs.',
    fullDesc: 'We take complete responsibility for your site from bare shell to final deep clean. Civil works, plumbing, wiring, false ceilings, carpentry, painting, and decor are managed by a single Kalyan Studio project lead, backed by our 10-year craft warranty.',
    scope: [
      'Dedicated on-site architectural supervisor every single day',
      'Daily WhatsApp photo & milestone progress reports',
      'Civil modifications, electrical rewiring & plumbing',
      'Precision false ceiling installation & smooth putty finish',
      'Deep cleaning, sanitization & formal key handover',
    ],
    materials: [
      'Certified branded electricals (Polycab / Havells)',
      'Waterproof grade sanitary fittings (Kohler / Jaquar)',
      'Premium zero-VOC emulsion paints (Asian Paints Royale)',
      'Factory-inspected hardware with manufacturer warranties',
    ],
    timeline: 'Guaranteed 45-Day Handover',
  },
  {
    id: 'modular-kitchen',
    category: 'residential',
    line1: 'MODULAR KITCHEN',
    line2: '& WARDROBES',
    fullTitle: 'Modular Kitchen & Storage Systems',
    image: '/images/kalyan/assets/MODULARKITCHEN-DIgipoZG.png',
    subtitle: 'Ergonomic Culinary Centers & Floor-to-Ceiling Wardrobes',
    shortDesc: 'Engineered with 100% boiling-water-resistant (BWR) marine ply, anti-fingerprint acrylic finishes, and smart organizers.',
    fullDesc: 'The kitchen is the culinary heartbeat of the Indian home. Our modular setups withstand daily spice cooking, heavy moisture, and intense usage with heavy-gauge marine ply, quartz countertops, soft-close tandem drawers, and silent chimneys.',
    scope: [
      'Ergonomic golden-triangle cooking workflow optimization',
      'Corner carousels, pull-out pantry & spice organizers',
      'Floor-to-ceiling glass-door walk-in wardrobe suites',
      'Integrated quartz / granite countertops with under-mount sinks',
      'Built-in hob, chimney, microwave & dishwasher cabinetry',
    ],
    materials: [
      'IS:710 Marine Grade Boiling Water Proof (BWP) Plywood',
      'European anti-fingerprint matte acrylic & lacquered glass',
      'Blum Legrabox & Hettich Sensys soft-close hinges',
      'Solid food-safe natural quartz & quartzite slabs',
    ],
    timeline: '15 - 25 Days On-Site Installation',
  },
  {
    id: 'lighting',
    category: 'architecture',
    line1: 'LIGHTING &',
    line2: 'ATMOSPHERIC DESIGN',
    fullTitle: 'Lighting & Atmospheric Design',
    image: '/images/casa-noir/lighting-plant.jpg',
    subtitle: 'Circadian Illumination & Concealed Architectural Schemes',
    shortDesc: 'Sculpting serene warmth from morning clarity until midnight with concealed linear COBs, magnetic tracks, and scene controllers.',
    fullDesc: 'Light shapes how spaces feel and how people thrive. We design multi-layered architectural lighting systems: task lighting for functional clarity, warm concealed indirect coves for relaxed evenings, and dramatic accent spots to showcase art and masonry textures.',
    scope: [
      'Multi-layer lighting plan (Ambient, Task, Accent & Mood)',
      'Circadian warm-dim temperature tuning (2700K - 4000K)',
      'Concealed magnetic architectural tracks & linear COBs',
      'Smart app & switch scene automation (Party, Dining, Relax)',
      'Decorative pendant, wall sconce & landscape illumination',
    ],
    materials: [
      'High-CRI (>95) architectural LED chips for true color rendition',
      'Deep-recessed anti-glare aluminum COB housings',
      'Architectural magnetic track profiles in anodized matte black',
    ],
    timeline: '7 - 14 Days Synchronized with Ceilings',
  },
  {
    id: 'ceilings',
    category: 'architecture',
    line1: 'ACOUSTIC CEILINGS',
    line2: '& GYPSUM SYSTEMS',
    fullTitle: 'Acoustic Ceilings & Gypsum Systems',
    image: '/images/kalyan/assets/GYPSUMCELLING-NNrW8q6e.png',
    subtitle: 'Seamless Modernist Ceilings with Zero Sag & Concealed Coves',
    shortDesc: 'Saint-Gobain moisture-resistant gypsum boards with anti-crack paper tapes, perimeter shadow lines, and integrated AC diffusers.',
    fullDesc: 'Say goodbye to unsightly wiring and bulky beams. Our false ceiling systems provide pristine, flush architectural surfaces, integrate magnetic track lighting, conceal ducted air conditioning vents, and optimize acoustics in living and theater spaces.',
    scope: [
      'Flush minimalist ceiling planes with perimeter shadow lines',
      'Curved cove lighting drops and double-height ceiling styling',
      'Acoustic sound absorption for home theaters & boardrooms',
      'Concealed curtain pelmets with integrated LED channel',
      'Anti-sag galvanised GI channel framing structure',
    ],
    materials: [
      'Saint-Gobain Gyproc moisture-resistant boards',
      'Rust-proof ultra-rigid galvanised steel frameworks',
      'Fiberglass joint tapes & crack-free polymer putties',
    ],
    timeline: '10 - 18 Days Installation',
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  // Form submission state for quick consultation on services page
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Residential Interior Design',
    location: 'Bhubaneswar',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Residential Interior Design',
          location: 'Bhubaneswar',
          message: '',
        });
      }
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1E16] flex flex-col font-sans select-none">
      
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* =============================================================== */}
          {/* 2. SERVICES EDITORIAL HEADER                                     */}
          {/* =============================================================== */}
          <div className="max-w-4xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-8 h-[1.5px] bg-[#9C5427]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold text-[#7D6858]">
                DISCIPLINE &amp; CAPABILITIES
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black uppercase text-[#2C1E16] leading-[1.04] tracking-[-0.03em] mb-5 sm:mb-6">
              EXPERT INTERIOR DISCIPLINES, CRAFTED FOR REFINED LIVING.
            </h1>

            <p className="text-base sm:text-lg text-[#5C534A] leading-relaxed max-w-2xl font-normal">
              From full-turnkey residences and commercial architecture to photorealistic 3D visual rendering — every space is executed with material honesty, tropical climate rigor, and guaranteed 45-day delivery.
            </p>
          </div>

          {/* =============================================================== */}
          {/* 3. CATEGORY FILTER PILLS                                         */}
          {/* =============================================================== */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'rendering', label: 'Visual 3D Rendering' },
              { id: 'architecture', label: 'Architecture & Joinery' },
              { id: 'turnkey', label: 'Turnkey Execution' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2C1E16] text-white shadow-sm'
                      : 'bg-white border border-[#2C1E16]/10 text-[#5C534A] hover:bg-[#F2ECE4] hover:text-[#2C1E16]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* =============================================================== */}
          {/* 4. MAIN EDITORIAL SERVICES GRID (EXACT REFERENCE REPRESENTATION) */}
          {/* =============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveModalService(service)}
                className="group relative rounded-[28px] sm:rounded-[34px] overflow-hidden aspect-[3/4.2] sm:aspect-[3/4.3] bg-[#2C1E16] shadow-[0_12px_36px_rgba(44,30,22,0.08)] border border-[#2C1E16]/10 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Edge-to-Edge High-Resolution Visual Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.fullTitle}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Top Tint for Visual Depth */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Deep Dark Smooth Bottom Gradient for Legible White Typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                </div>

                {/* Floating Top Category Pill */}
                <div className="relative z-20 self-start mb-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase bg-black/40 backdrop-blur-md text-white/90 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C5427]" />
                    {service.category}
                  </span>
                </div>

                {/* Bottom Left Bold Uppercase White Headline (Matching Reference Image) */}
                <div className="relative z-20 w-full">
                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black uppercase text-white tracking-[-0.02em] leading-[1.04] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                    <span className="block">{service.line1}</span>
                    <span className="block">{service.line2}</span>
                  </h2>

                  {/* Subtle Subtitle preview visible on hover */}
                  <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.shortDesc}
                  </p>

                  {/* Interactive Action Pill */}
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20 text-white/90 text-xs font-semibold uppercase tracking-wider">
                    <span>View Specifications</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#9C5427] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* =============================================================== */}
          {/* 5. STUDIO TRUST & TURNKEY GUARANTEES BAR                         */}
          {/* =============================================================== */}
          <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] bg-[#2C1E16] text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C49B7E]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight">45-Day Handover</h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Guaranteed turnaround with contractual penalty clause for total peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C49B7E]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight">10-Year Warranty</h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Full replacement guarantee on modular carcasses, joinery hardware, and civil finishes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C49B7E]">
                  <Ruler className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight">Itemized BOQ</h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Zero surprise costs. Complete brand-specified bill of quantities before work begins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C49B7E]">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight">Vastu &amp; Climate Flow</h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    Customized for Odisha’s tropical climate, natural airflow, and directional harmony.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 6. BOOK A CONSULTATION DIRECTLY ON SERVICES PAGE                 */}
          {/* =============================================================== */}
          <div id="consultation" className="mt-16 sm:mt-24 p-8 sm:p-12 lg:p-16 rounded-[32px] sm:rounded-[40px] bg-white border border-[#2C1E16]/8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1.5px] bg-[#9C5427]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#9C5427]">
                    START YOUR PROJECT
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#2C1E16] tracking-tight leading-tight">
                  SCHEDULE A COMPLIMENTARY SITE VISIT &amp; 3D ESTIMATE.
                </h2>
                <p className="text-sm sm:text-base text-[#5C534A] leading-relaxed">
                  Our principal architects will visit your apartment or villa in Bhubaneswar, Cuttack, or Puri, take precise laser measurements, and present a custom 3D moodboard.
                </p>
                
                <div className="pt-2 space-y-3 text-sm text-[#2C1E16] font-semibold">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9C5427]" />
                    <span>Free on-site measurement &amp; structural assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9C5427]" />
                    <span>Transparent package pricing &amp; 3D conceptual layout</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9C5427]" />
                    <span>Instant consultation via call: +91 75040 41040</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {submitSuccess ? (
                  <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#2C1E16]/10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#9C5427] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-[#2C1E16]">Consultation Request Received!</h3>
                    <p className="text-sm text-[#5C534A] max-w-md mx-auto">
                      Thank you! Our principal architect will contact you within 2 business hours to schedule your site visit.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-[#2C1E16] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#9C5427] transition-colors"
                    >
                      Book Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-[#2C1E16] mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ashutosh Mohanty"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/15 text-sm focus:outline-none focus:border-[#9C5427] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-[#2C1E16] mb-1.5">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/15 text-sm focus:outline-none focus:border-[#9C5427] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-[#2C1E16] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/15 text-sm focus:outline-none focus:border-[#9C5427] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-[#2C1E16] mb-1.5">
                          Discipline / Service Interested In
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/15 text-sm focus:outline-none focus:border-[#9C5427] transition-colors"
                        >
                          {SERVICES_DATA.map((s) => (
                            <option key={s.id} value={s.fullTitle}>
                              {s.fullTitle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-[#2C1E16] mb-1.5">
                        Property Details &amp; Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your 2 BHK / 3 BHK apartment, villa or commercial office in Bhubaneswar, Cuttack or Puri..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/15 text-sm focus:outline-none focus:border-[#9C5427] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Request Free Site Visit &amp; Quote</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* =================================================================== */}
      {/* 7. INTERACTIVE SERVICE DETAIL MODAL                                 */}
      {/* =================================================================== */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[32px] shadow-2xl border border-[#2C1E16]/10 flex flex-col text-[#2C1E16]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Visual */}
            <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-[32px] bg-[#2C1E16]">
              <img
                src={activeModalService.image}
                alt={activeModalService.fullTitle}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 p-2 rounded-full bg-black/50 hover:bg-black text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title on Hero */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#9C5427] text-white mb-2 inline-block">
                  {activeModalService.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {activeModalService.fullTitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  {activeModalService.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-8">
              
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#7D6858] mb-2">
                  ARCHITECTURAL SCOPE &amp; CAPABILITIES
                </h4>
                <p className="text-sm sm:text-base text-[#5C534A] leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#2C1E16]/8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#7D6858] mb-3">
                    WHAT IS INCLUDED
                  </h4>
                  <ul className="space-y-2.5">
                    {activeModalService.scope.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C1E16]">
                        <CheckCircle2 className="w-4 h-4 text-[#9C5427] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#7D6858] mb-3">
                    MATERIALS &amp; ENGINEERING
                  </h4>
                  <ul className="space-y-2.5">
                    {activeModalService.materials.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C534A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9C5427] flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#2C1E16]/8 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7D6858] block">Turnkey Timeline</span>
                      <span className="text-xs sm:text-sm font-bold text-[#2C1E16]">{activeModalService.timeline}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#9C5427]">100% Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Modal CTA Footer */}
              <div className="pt-6 border-t border-[#2C1E16]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="tel:+917504041040"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#2C1E16] hover:text-[#9C5427] transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#9C5427]" />
                  <span>Call Studio: +91 75040 41040</span>
                </a>

                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, service: activeModalService.fullTitle }));
                    setActiveModalService(null);
                    const el = document.getElementById('consultation');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Book Free Site Visit for This Service
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 8. Global Footer */}
      <Footer />

    </div>
  );
}
