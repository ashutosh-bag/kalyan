'use client';

import React, { useState } from 'react';
import { submitContactInquiry } from '@/lib/api-client';
import { ContactSubmission } from '@/lib/types';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'Bespoke Residential Villa',
    budgetRange: '₹30 Lakhs – ₹60 Lakhs',
    timeline: '3 - 6 Months',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    submissionId?: string;
  } | null>(null);

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

    // Basic client validation
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setStatusMessage({ type: 'error', text: 'Please provide brief details regarding your space or project in Odisha.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitContactInquiry(formData);
      if (response.success) {
        setStatusMessage({
          type: 'success',
          text: response.message || 'Your inquiry has been logged successfully.',
          submissionId: response.data?.submissionId,
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: 'Bespoke Residential Villa',
          budgetRange: '₹30 Lakhs – ₹60 Lakhs',
          timeline: '3 - 6 Months',
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

  const offices = [
    {
      city: 'Kalyan Design Studio — Bhubaneswar HQ',
      address: '3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018',
      phone: '+91-750404104 / +91 75040 41040',
      email: 'info@kalyandesignstudio.com',
      hours: 'Mon – Sat: 10:00 AM – 8:00 PM',
    },
    {
      city: 'Cuttack Regional Execution Atelier',
      address: 'Serving CDA Sectors, Cantonment Road & Riverfront, Cuttack, Odisha',
      phone: '+91 75040 41040',
      email: 'info@kalyandesignstudio.com',
      hours: 'By Site Appointment',
    },
    {
      city: 'Koraput & Puri Project Operations',
      address: 'Turnkey Residential, Corporate & Hospitality Projects across Odisha',
      phone: '+91 75040 41040',
      email: 'info@kalyandesignstudio.com',
      hours: 'By Site Appointment',
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-[#1A1815]/8 relative select-none">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px] bg-[#9C5427]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
              COMMISSIONS IN ODISHA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black uppercase text-[#1A1815] mb-3 tracking-tight leading-tight">
            BEGIN YOUR ARCHITECTURAL PROJECT.
          </h2>
          <p className="text-[#68625A] text-sm sm:text-base leading-relaxed">
            Schedule your free site measurement and 3D interior design consultation across Bhubaneswar, Cuttack, and Puri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Contact & Consultation Form (Col 1-7) */}
          <div className="lg:col-span-7 bg-white border border-[#1A1815]/8 p-7 sm:p-10 rounded-[32px] sm:rounded-[36px] shadow-[0_10px_35px_rgba(26,24,21,0.04)]">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1815] mb-6 flex items-center justify-between">
              <span>Book Site Visit &amp; Consultation</span>
              <span className="text-xs uppercase tracking-wider text-[#9C5427] font-semibold flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-[#9C5427]" /> Confidential
              </span>
            </h3>

            {/* Alert Status Feedback */}
            {statusMessage && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start space-x-3 text-xs sm:text-sm ${statusMessage.type === 'success'
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
                    <p className="text-xs text-[#5C564E] font-mono mt-1">
                      Tracking Reference: {statusMessage.submissionId}
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
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
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
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
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
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
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                  />
                </div>

                {/* Project Typology */}
                <div>
                  <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
                    Commission Typology
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="TV Cabinet & Media Unit">TV Cabinet &amp; Media Unit</option>
                    <option value="Custom Wardrobe & Closets">Custom Wardrobe &amp; Closets</option>
                    <option value="Gypsum / PVC False Ceiling">Gypsum / PVC False Ceiling</option>
                    <option value="3D Interior Models & Visuals">3D Interior Models &amp; Visuals</option>
                    <option value="Core House Plan & Architecture">Core House Plan &amp; Architecture</option>
                    <option value="Full Turnkey Home Interior Package">Full Turnkey Home Interior Package</option>
                    <option value="Commercial / Office Fit-out">Commercial / Office Fit-out</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Budget Range in INR */}
                <div>
                  <label htmlFor="budgetRange" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
                    Estimated Budget Scale
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="₹2.5L – ₹4.5L (Turnkey 2BHK/3BHK)">₹2.5L – ₹4.5L (Turnkey 2BHK/3BHK)</option>
                    <option value="₹4.5L – ₹8.5L (Executive Duplex)">₹4.5L – ₹8.5L (Executive Duplex)</option>
                    <option value="₹8.5L – ₹15L (Luxury Villa)">₹8.5L – ₹15L (Luxury Villa)</option>
                    <option value="₹15L+ (Estate Masterpiece)">₹15L+ (Estate Masterpiece)</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
                    Target Handover Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors cursor-pointer"
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
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#1A1815] mb-2 font-bold">
                  Project Details &amp; Location in Odisha <span className="text-[#9C5427]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your plot/property location (e.g. Patia, Jaydev Vihar, CDA Cuttack), approximate built-up area, and design goals..."
                  className="w-full bg-[#FAF7F2] border border-[#1A1815]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#1A1815] placeholder-[#8C8275] focus:outline-none focus:border-[#9C5427] focus:bg-white transition-colors"
                ></textarea>
              </div>

              {/* Submit Button: Terracotta Pill matching Hero */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#9C5427] hover:bg-[#85451D] text-white font-medium text-base rounded-full transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-white" />
                    <span>Submit &amp; Get Free 3D Layout Quote</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#7C6F5E] ">
                <Clock className="w-3.5 h-3.5 text-[#9C5427]" />
                <span>Our principal design team will review and contact you within 24 hours.</span>
              </div>
            </form>
          </div>

          {/* Global Presence & Direct Contacts (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Odisha Studios */}
            <div className="bg-white/95 border border-[#9C5427]/20 p-8 rounded-3xl shadow-[0_12px_36px_rgba(196,120,71,0.08)]">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#9C5427] font-bold mb-6">
                Our Studios in Odisha
              </h4>
              <div className="space-y-6">
                {offices.map((off, idx) => (
                  <div key={idx} className="border-b border-[#1A1815]/10 pb-4 last:border-none last:pb-0">
                    <span className="text-base font-playfair text-[#1A1815] font-bold block">
                      {off.city}
                    </span>
                    <div className="flex items-start space-x-2 text-xs text-[#5C564E] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9C5427] shrink-0 mt-0.5" />
                      <span>{off.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-[#5C564E] font-mono mt-1">
                      <Phone className="w-3.5 h-3.5 text-[#9C5427]" />
                      <span>{off.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Channel */}
            <div className="bg-white/95 border border-[#9C5427]/20 p-8 rounded-3xl shadow-[0_12px_36px_rgba(196,120,71,0.08)]">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#9C5427] font-bold mb-4">
                Direct Inquiries
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-[#1A1815]">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#9C5427]" />
                  <span>info@kalyandesignstudio.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#9C5427]" />
                  <span>+91 75040 41040 (Bhubaneswar Studio)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#9C5427]" />
                  <span>+91 75040 41040 (Client Direct Hotline)</span>
                </div>
              </div>
              <p className="text-[11px] text-[#5C564E] mt-4 leading-relaxed">
                For architectural design consultations, structural drawings review, or site evaluation visits across Odisha, please schedule an in-person session at our Bhubaneswar studio.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
