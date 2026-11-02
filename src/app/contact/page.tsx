'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitContactInquiry } from '@/lib/api-client';
import { ContactSubmission } from '@/lib/types';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Ruler,
  Sparkles,
  Award,
  Building2,
  Calendar,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Full Turnkey Home Interior Package',
    budgetRange: '₹4.5L – ₹8.5L (Executive Duplex)',
    timeline: 'Immediate (45-Day Turnkey Guarantee)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    submissionId?: string;
  } | null>(null);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the free site measurement & consultation work?',
      a: 'Once you submit your project details, our senior architect connects with you within 24 hours. We then schedule an on-site visit to your apartment, villa, or commercial site anywhere in Bhubaneswar, Cuttack, or Puri with digital laser meters to capture exact millimeter measurements, daylight angles, and spatial layout at zero cost and zero obligation.',
    },
    {
      q: 'What is included in Kalyan Design Studio’s 45-day turnkey guarantee?',
      a: 'For our standardized and turnkey interior packages, our modular factory pre-fabricates all cabinetry, wardrobes, and modular kitchen carcasses in high-precision factory conditions. Once civil and false ceiling work completes on-site, modular installation is executed and handed over within 45 calendar days, backed by a written project timeline contract.',
    },
    {
      q: 'Can we customize materials, veneers, and hardware for our budget?',
      a: 'Absolutely. Every commission is 100% bespoke. You can choose from IS:710 Marine Grade BWP plywood, high-gloss or super-matte acrylics, seasoned Indian Teakwood, natural Khandagiri sandstone, Italian marble, and international hardware mechanisms from Blum, Hettich, or Hafele based on your exact budget tier.',
    },
    {
      q: 'Do you undertake architectural house plans and commercial office fit-outs?',
      a: 'Yes. Beyond residential villas and duplexes, our in-house architects design full structural house plans, MEP layouts, and execute high-energy commercial office interiors, retail showrooms, and clinics across Odisha with acoustic panelling and statutory fire & municipal compliance.',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // Basic client-side validation
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name (minimum 2 characters).' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.phone?.trim() || formData.phone.trim().length < 8) {
      setStatusMessage({ type: 'error', text: 'Please provide a valid phone number for site visit coordination.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setStatusMessage({ type: 'error', text: 'Please provide brief details regarding your space or project in Odisha (min 10 characters).' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitContactInquiry(formData);
      if (response.success) {
        setStatusMessage({
          type: 'success',
          text: response.message || 'Your consultation inquiry has been logged successfully.',
          submissionId: response.data?.submissionId,
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: 'Full Turnkey Home Interior Package',
          budgetRange: '₹4.5L – ₹8.5L (Executive Duplex)',
          timeline: 'Immediate (45-Day Turnkey Guarantee)',
          message: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: response.error || 'Submission could not be completed. Please try again.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'A connection issue occurred. Please reach our Bhubaneswar office directly at +91 75040 41040 or email info@kalyandesignstudio.com.',
      });
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
          {/* 2. BREADCRUMBS & EDITORIAL HEADER                               */}
          {/* =============================================================== */}
          <div className="mb-4">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#7A7369]">
              <Link href="/#home" className="hover:text-[#9C5427] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#9C5427] font-bold">Contact &amp; Site Visit</span>
            </nav>
          </div>

          <div className="max-w-4xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-8 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#9C5427]">
                COMMISSIONS IN ODISHA
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#2C1E16] mb-4 sm:mb-5 tracking-tight leading-[1.08]">
              BEGIN YOUR ARCHITECTURAL PROJECT.
            </h1>
            <p className="text-[#5C534A] text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
              Schedule your free site measurement and 3D interior design consultation across Bhubaneswar, Cuttack, and Puri. Or visit our studio headquarters on Puri-NH Bypass to inspect real wood veneers, finishes, and sample joinery.
            </p>
          </div>

          {/* =============================================================== */}
          {/* 3. FOUR VALUE PILLARS STRIP                                     */}
          {/* =============================================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
            <div className="bg-white border border-[#2C1E16]/8 p-4 sm:p-5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9C5427]/10 flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2C1E16] uppercase tracking-wide">Free Laser Visit</span>
                <span className="text-[11px] text-[#7A7369]">Millimeter-precise on site</span>
              </div>
            </div>

            <div className="bg-white border border-[#2C1E16]/8 p-4 sm:p-5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9C5427]/10 flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2C1E16] uppercase tracking-wide">Photoreal 3D Models</span>
                <span className="text-[11px] text-[#7A7369]">Visualize before you build</span>
              </div>
            </div>

            <div className="bg-white border border-[#2C1E16]/8 p-4 sm:p-5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9C5427]/10 flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2C1E16] uppercase tracking-wide">45-Day Handover</span>
                <span className="text-[11px] text-[#7A7369]">Guaranteed move-in SLA</span>
              </div>
            </div>

            <div className="bg-white border border-[#2C1E16]/8 p-4 sm:p-5 rounded-2xl shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9C5427]/10 flex items-center justify-center flex-shrink-0 text-[#9C5427]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2C1E16] uppercase tracking-wide">10-Year Warranty</span>
                <span className="text-[11px] text-[#7A7369]">BWP marine ply &amp; hardware</span>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 4. MAIN INTERACTIVE GRID: FORM + STUDIO HEADQUARTERS & MAP     */}
          {/* =============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-24">

            {/* Left: Consultation Form (Col 1-7) */}
            <div className="lg:col-span-7 bg-white border border-[#2C1E16]/8 p-7 sm:p-10 rounded-[32px] sm:rounded-[36px] shadow-[0_10px_35px_rgba(44,30,22,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-[#2C1E16]/8 gap-2">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#9C5427] block mb-1">
                    EXPRESS CONSULTATION
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2C1E16]">
                    Book Site Visit &amp; 3D Estimate
                  </h2>
                </div>
                <span className="inline-flex items-center text-xs uppercase tracking-wider text-[#9C5427] font-semibold bg-[#9C5427]/10 px-3 py-1.5 rounded-full w-fit">
                  <ShieldCheck className="w-4 h-4 mr-1 text-[#9C5427]" /> 100% Confidential
                </span>
              </div>

              {/* Alert Status Feedback */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl mb-6 flex items-start space-x-3 text-xs sm:text-sm ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-500/40 text-emerald-900'
                      : 'bg-rose-50 border border-rose-500/40 text-rose-900'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{statusMessage.text}</p>
                    {statusMessage.submissionId && (
                      <p className="text-xs text-[#5C534A] font-mono mt-1">
                        Tracking Reference: {statusMessage.submissionId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Full Name <span className="text-[#9C5427]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Alok Mohanty"
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Email Address <span className="text-[#9C5427]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Phone / WhatsApp <span className="text-[#9C5427]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94370 00000"
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Commission Typology */}
                  <div>
                    <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Commission Typology
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Full Turnkey Home Interior Package">Full Turnkey Home Interior Package</option>
                      <option value="Modular Kitchen">Modular Kitchen</option>
                      <option value="TV Cabinet & Media Unit">TV Cabinet &amp; Media Unit</option>
                      <option value="Custom Wardrobe & Closets">Custom Wardrobe &amp; Closets</option>
                      <option value="Gypsum / PVC False Ceiling">Gypsum / PVC False Ceiling</option>
                      <option value="3D Interior Models & Visuals">3D Interior Models &amp; Visuals</option>
                      <option value="Core House Plan & Architecture">Core House Plan &amp; Architecture</option>
                      <option value="Commercial / Office Fit-out">Commercial / Office Fit-out</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Budget Range in INR */}
                  <div>
                    <label htmlFor="budgetRange" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Estimated Budget Scale
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="₹2.5L – ₹4.5L (Turnkey 2BHK/3BHK)">₹2.5L – ₹4.5L (Turnkey 2BHK/3BHK)</option>
                      <option value="₹4.5L – ₹8.5L (Executive Duplex)">₹4.5L – ₹8.5L (Executive Duplex)</option>
                      <option value="₹8.5L – ₹15L (Luxury Villa)">₹8.5L – ₹15L (Luxury Villa)</option>
                      <option value="₹15L+ (Estate Masterpiece)">₹15L+ (Estate Masterpiece)</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                      Target Handover Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Immediate (45-Day Turnkey Guarantee)">Immediate (45-Day Turnkey Guarantee)</option>
                      <option value="3 - 6 Months">3 – 6 Months</option>
                      <option value="6 - 12 Months">6 – 12 Months</option>
                      <option value="Under Construction / Structure Stage">Under Construction / Structure Stage</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#2C1E16] mb-2 font-bold">
                    Project Details &amp; Location in Odisha <span className="text-[#9C5427]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your plot/property location (e.g. Patia, Jaydev Vihar, CDA Cuttack, Puri Marine Drive), approximate built-up area (sq ft), and design goals..."
                    className="w-full bg-[#FAF7F2] border border-[#2C1E16]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2C1E16] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-sm sm:text-base rounded-full transition-all duration-300 shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Submission...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-white" />
                      <span>Submit &amp; Schedule Free Site Visit</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] sm:text-xs text-[#7A7369]">
                  <Clock className="w-4 h-4 text-[#9C5427] flex-shrink-0" />
                  <span>Our principal design architect will review your project and contact you within 24 hours.</span>
                </div>
              </form>
            </div>

            {/* Right: Studio Headquarters & Interactive Map (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">

              {/* Studio Headquarters Card */}
              <div className="bg-white border border-[#2C1E16]/8 p-7 sm:p-8 rounded-[32px] sm:rounded-[36px] shadow-[0_10px_35px_rgba(44,30,22,0.04)] space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#9C5427] font-bold block mb-2">
                    STUDIO HEADQUARTERS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#2C1E16]">
                    Kalyan Design Studio
                  </h3>
                  <p className="text-xs text-[#5C534A] mt-1 leading-relaxed">
                    Premier interior architecture, bespoke joinery &amp; turnkey execution across Odisha.
                  </p>
                </div>

                {/* Contact Details List */}
                <div className="space-y-4 text-xs sm:text-sm text-[#2C1E16] pt-2 border-t border-[#2C1E16]/8">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#9C5427]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Visit Our Studio</span>
                      <span className="text-xs sm:text-sm text-[#2C1E16] font-medium leading-relaxed">
                        3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-[#9C5427]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Direct Consultation Hotline</span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <a href="tel:+917504041040" className="text-xs sm:text-sm text-[#2C1E16] hover:text-[#9C5427] font-bold transition-colors">
                          +91 75040 41040
                        </a>
                        <span className="hidden sm:inline text-[#8A847C]">/</span>
                        <a href="tel:07504041040" className="text-xs sm:text-sm text-[#2C1E16] hover:text-[#9C5427] font-bold transition-colors">
                          075040 41040
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-[#9C5427]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Email Us</span>
                      <a href="mailto:info@kalyandesignstudio.com" className="text-xs sm:text-sm text-[#2C1E16] hover:text-[#9C5427] font-bold transition-colors">
                        info@kalyandesignstudio.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#9C5427]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Studio Timings</span>
                      <span className="text-xs sm:text-sm text-[#2C1E16] font-medium block">
                        Monday – Saturday: 10:00 AM – 8:00 PM
                      </span>
                      <span className="text-[11px] text-[#7A7369]">Sunday by appointment only</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick Chat Button */}
                <div className="pt-2 border-t border-[#2C1E16]/8">
                  <a
                    href="https://wa.me/917504041040?text=Hello%20Kalyan%20Design%20Studio%2C%20I%20am%20interested%20in%20an%20interior%20design%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Chat on WhatsApp: 075040 41040</span>
                  </a>
                </div>
              </div>

              {/* Google Maps Embed Card */}
              <div className="bg-white border border-[#2C1E16]/8 p-5 sm:p-6 rounded-[32px] sm:rounded-[36px] shadow-[0_10px_35px_rgba(44,30,22,0.04)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#9C5427] font-bold">
                      STUDIO LOCATION
                    </span>
                  </div>
                  <a
                    href="https://g.co/kgs/VwVxACj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase font-bold tracking-wider text-[#9C5427] hover:text-[#85451D] flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#9C5427]/25 bg-[#FAF7F2] shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14703.497116044074!2d85.86106134999999!3d20.251747199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a76aa3db6109%3A0x9796e53a6bd98373!2sKalyan+Design+Studio!5e0!3m2!1sen!2sin!4v1633363360744!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Kalyan Design Studio Location Map"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="text-[11px] sm:text-xs text-[#7A7369] leading-relaxed">
                  Located along Puri-NH Bypass, Baragada, Bhubaneswar. Free client parking available directly at our studio entrance.
                </p>
              </div>

              {/* Service Areas Badge Card */}
              <div className="bg-[#FAF7F2] border border-[#2C1E16]/8 p-5 sm:p-6 rounded-[28px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9C5427] block mb-2">
                  AREAS SERVICED ACROSS ODISHA
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Bhubaneswar',
                    'Cuttack',
                    'Puri',
                    'Khordha',
                    'Jatni',
                    'Sambalpur',
                    'Rourkela',
                    'Berhampur',
                    'Angul',
                    'Balasore',
                  ].map((city) => (
                    <span
                      key={city}
                      className="px-2.5 py-1 bg-white border border-[#2C1E16]/10 rounded-full text-[11px] font-medium text-[#2C1E16]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* =============================================================== */}
          {/* 5. FREQUENTLY ASKED QUESTIONS ACCORDION                         */}
          {/* =============================================================== */}
          <div className="max-w-4xl mx-auto pt-8 border-t border-[#2C1E16]/10">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#9C5427] block mb-2">
                HAVE QUESTIONS?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#2C1E16]">
                Consultation &amp; Project Process FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#2C1E16]/8 rounded-2xl overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#2C1E16] hover:text-[#9C5427] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="p-1 rounded-full bg-[#FAF7F2] text-[#9C5427] flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C534A] leading-relaxed border-t border-[#2C1E16]/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =============================================================== */}
          {/* 6. DIRECT CALL / URGENT INQUIRY BANNER                          */}
          {/* =============================================================== */}
          <div className="mt-16 sm:mt-20 bg-[#2C1E16] text-[#FAF7F2] p-8 sm:p-12 rounded-[32px] sm:rounded-[36px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D88D58] font-bold block">
                PREFER TO DISCUSS DIRECTLY?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Speak With Our Chief Architect Today.
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-xl">
                Call our direct Bhubaneswar hotline or drop by our studio for an immediate review of your architectural floor plan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="tel:+917504041040"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#9C5427] hover:bg-[#85451D] text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 75040 41040</span>
              </a>
              <a
                href="https://wa.me/917504041040?text=Hello%20Kalyan%20Design%20Studio%2C%20I%20am%20calling%20regarding%20an%20urgent%20interior%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/20"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* 7. Global Footer */}
      <Footer />

    </div>
  );
}
