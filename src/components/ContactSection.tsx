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
        text: 'A connection issue occurred. Please reach our Bhubaneswar office directly at +91 674 297 4100 or email inquiries@kynstudio.in.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: 'Kalyan Design Studio — Bhubaneswar HQ',
      address: '3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018',
      phone: '+91-0750404104 / +91 75040 41040',
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
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0d0f14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a47e]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">Commissions in Odisha</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white mb-4">
            Begin Your Architectural Project
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            We accept select residential and commercial projects across Bhubaneswar, Cuttack, Puri, Rourkela, and Eastern India to maintain obsessive craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact & Consultation Form (Col 1-7) */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 p-8 sm:p-10 rounded-sm shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-serif text-white font-normal mb-6 flex items-center justify-between">
              <span>Project Consultation Form</span>
              <span className="text-xs uppercase tracking-widest text-[#c8a47e] font-mono flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Confidential
              </span>
            </h3>

            {/* Alert Status Feedback */}
            {statusMessage && (
              <div
                className={`p-4 rounded-sm mb-6 flex items-start space-x-3 text-xs sm:text-sm ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{statusMessage.text}</p>
                  {statusMessage.submissionId && (
                    <p className="text-xs text-neutral-400 font-mono mt-1">
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
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Full Name <span className="text-[#c8a47e]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alok Mohanty"
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8a47e] transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Email Address <span className="text-[#c8a47e]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8a47e] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Phone / WhatsApp <span className="text-[#c8a47e]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 94370 00000"
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8a47e] transition-colors"
                  />
                </div>

                {/* Project Typology */}
                <div>
                  <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Commission Typology
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c8a47e] transition-colors"
                  >
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="TV Cabinet & Media Unit">TV Cabinet & Media Unit</option>
                    <option value="Custom Wardrobe & Closets">Custom Wardrobe & Closets</option>
                    <option value="Gypsum / PVC False Ceiling">Gypsum / PVC False Ceiling</option>
                    <option value="3D Interior Models & Visuals">3D Interior Models & Visuals</option>
                    <option value="Core House Plan & Architecture">Core House Plan & Architecture</option>
                    <option value="Full Turnkey Home Interior Package">Full Turnkey Home Interior Package</option>
                    <option value="Commercial / Office Fit-out">Commercial / Office Fit-out</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Budget Range in INR */}
                <div>
                  <label htmlFor="budgetRange" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Estimated Budget Scale
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c8a47e] transition-colors"
                  >
                    <option value="₹20 Lakhs – ₹35 Lakhs">₹20 Lakhs – ₹35 Lakhs</option>
                    <option value="₹35 Lakhs – ₹70 Lakhs">₹35 Lakhs – ₹70 Lakhs</option>
                    <option value="₹70 Lakhs – ₹1.5 Crore">₹70 Lakhs – ₹1.5 Crore</option>
                    <option value="₹1.5 Crore+ (Large Estate)">₹1.5 Crore+ (Bespoke Estate Scale)</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                    Target Handover Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c8a47e] transition-colors"
                  >
                    <option value="Immediate">Immediate (Within 60 Days)</option>
                    <option value="3 - 6 Months">3 – 6 Months</option>
                    <option value="6 - 12 Months">6 – 12 Months</option>
                    <option value="Under Construction / Structure Stage">Under Construction / Structure Stage</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-neutral-300 mb-2 font-medium">
                  Project Details & Location in Odisha <span className="text-[#c8a47e]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your plot/property location (e.g. Patia, Jaydev Vihar, CDA Cuttack), approximate built-up area, and design goals..."
                  className="w-full bg-neutral-950/70 border border-white/10 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8a47e] transition-colors"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#c8a47e] hover:bg-[#e0c8aa] text-neutral-950 text-xs uppercase tracking-[0.25em] font-semibold rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(200,164,126,0.25)] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Inquiry</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-400 font-light">
                <Clock className="w-3.5 h-3.5 text-[#c8a47e]" />
                <span>Our principal design team will review and contact you within 24 hours.</span>
              </div>
            </form>
          </div>

          {/* Global Presence & Direct Contacts (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            
            {/* Odisha Studios */}
            <div className="bg-neutral-900/30 border border-white/10 p-8 rounded-sm">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium mb-6">
                Our Studios in Odisha
              </h4>
              <div className="space-y-6">
                {offices.map((off, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-4 last:border-none last:pb-0">
                    <span className="text-base font-serif text-white font-medium block">
                      {off.city}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c8a47e]" />
                      <span>{off.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#c8a47e]" />
                      <span>{off.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Channel */}
            <div className="bg-neutral-900/30 border border-white/10 p-8 rounded-sm">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium mb-4">
                Direct Inquiries
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#c8a47e]" />
                  <span>inquiries@kynstudio.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#c8a47e]" />
                  <span>+91 674 297 4100 (Bhubaneswar Studio)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#c8a47e]" />
                  <span>+91 9437 120 400 (Client Direct Hotline)</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 font-light mt-4 leading-relaxed">
                For architectural design consultations, structural drawings review, or site evaluation visits across Odisha, please schedule an in-person session at our Bhubaneswar or Cuttack studios.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
