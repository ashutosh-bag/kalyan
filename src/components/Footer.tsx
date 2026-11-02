'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: '360° View', href: '/#360-view' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#1A1815]/8 pt-12 sm:pt-14 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 text-[#5C564E] select-none">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-[#1A1815]/10">

          {/* Brand & Studio Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-1.5 rounded-2xl bg-white border border-[#9C5427]/30 shadow-md w-fit overflow-hidden">
                <img
                  src="/images/kalyan/branding/logo.gif"
                  alt="Kalyan Design Studio Animated Logo"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-playfair font-bold text-2xl text-[#1A1815]">
                  Kalyan Design Studio
                </span>
                <span className="text-xs tracking-widest uppercase text-[#9C5427] font-bold mt-1">
                  Architecture &bull; Interiors &bull; Odisha
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C564E] leading-relaxed max-w-sm pt-2">
              Best Interior Design Company in Bhubaneswar, transforming spaces with elegant, functional designs across Odisha.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-2 pt-2 text-xs text-[#5C564E] ">
              <div className="flex items-start space-x-2.5">
                <span className="text-[#9C5427] font-mono">📍</span>
                <span>3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#9C5427] font-mono">📞</span>
                <a href="tel:+917504041040" className="hover:text-[#1A1815] transition-colors font-semibold">
                  +91-750404104 / 75040 41040
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#9C5427] font-mono">✉️</span>
                <a href="mailto:info@kalyandesignstudio.com" className="hover:text-[#1A1815] transition-colors font-semibold">
                  info@kalyandesignstudio.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#9C5427] font-mono">🕒</span>
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (Col 6-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#9C5427] font-bold mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm uppercase tracking-wider text-[#68625A] hover:text-[#9C5427] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Maps Embed (Col 8-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#9C5427] font-bold">
              Studio Location
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#9C5427]/25 bg-white shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14703.497116044074!2d85.86106134999999!3d20.251747199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a76aa3db6109%3A0x9796e53a6bd98373!2sKalyan+Design+Studio!5e0!3m2!1sen!2sin!4v1633363360744!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Kalyan Design Studio Location Map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[11px] text-[#7C6F5E] ">
              Baragada, Puri-NH Bypass, Bhubaneswar &bull; Serving all Odisha districts.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7C6F5E] gap-4">
          <p>&copy; {new Date().getFullYear()} Kalyan Design Studio. All rights reserved. Baragada, Bhubaneswar, Odisha 751018.</p>
          <div className="flex items-center space-x-6">
            <a href="tel:+917504041040" className="hover:text-[#1A1815] transition-colors">+91-750404104</a>
            <span>&bull;</span>
            <a href="mailto:info@kalyandesignstudio.com" className="hover:text-[#1A1815] transition-colors">info@kalyandesignstudio.com</a>
            <span>&bull;</span>
            <a href="https://g.co/kgs/VwVxACj" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1815] transition-colors">Verified Google Listing</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
