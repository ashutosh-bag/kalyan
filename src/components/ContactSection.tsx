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

          {/* Direct Studio Inquiries & Contact Channels (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Direct Studio Inquiries Card */}
            <div className="bg-white border border-[#1A1815]/8 p-7 sm:p-8 rounded-[32px] sm:rounded-[36px] shadow-[0_10px_35px_rgba(26,24,21,0.04)] space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#9C5427] font-bold block mb-2">
                  STUDIO HEADQUARTERS
                </span>
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1A1815]">
                  Kalyan Design Studio
                </h4>
                <p className="text-xs text-[#68625A] mt-1">
                  Premier interior architecture &amp; turnkey execution across Odisha.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4 text-xs sm:text-sm text-[#1A1815] pt-2 border-t border-[#1A1815]/8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#9C5427]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Visit Our Studio</span>
                    <span className="text-xs sm:text-sm text-[#1A1815] font-medium leading-relaxed">
                      3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#9C5427]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Direct Consultation Hotline</span>
                    <a href="tel:+917504041040" className="text-xs sm:text-sm text-[#1A1815] hover:text-[#9C5427] font-bold transition-colors">
                      +91 75040 41040 / 075040 41040
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#9C5427]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Email Us</span>
                    <a href="mailto:info@kalyandesignstudio.com" className="text-xs sm:text-sm text-[#1A1815] hover:text-[#9C5427] font-bold transition-colors">
                      info@kalyandesignstudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#9C5427]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#9C5427]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A847C] block">Studio Timings</span>
                    <span className="text-xs sm:text-sm text-[#1A1815] font-medium">
                      Monday – Saturday: 10:00 AM – 8:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat Button */}
              <div className="pt-2 border-t border-[#1A1815]/8">
                <a
                  href="https://wa.me/917504041040?text=Hello%20Kalyan%20Design%20Studio%2C%20I%20am%20interested%20in%20an%20interior%20design%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp: 075040 41040</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
