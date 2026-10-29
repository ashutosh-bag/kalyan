'use client';

import React from 'react';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Packages', href: '#packages' },
    { name: 'Showcase', href: '#spatial-showcase' },
    { name: '360° Tours', href: '#testimonials-360' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/kalyandesignstudio',
      ariaLabel: 'Follow Kalyan Design Studio on Instagram',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/kalyandesignstudio',
      ariaLabel: 'Follow Kalyan Design Studio on Facebook',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@kalyandesignstudio',
      ariaLabel: 'Subscribe to Kalyan Design Studio YouTube channel',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com/kalyandesignstudio',
      ariaLabel: 'Find interior design inspiration on Pinterest',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#1A1815]/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#5C564E] select-none">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1A1815]/10">

          {/* Brand & Studio Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-1.5 rounded-2xl bg-white border border-[#C47847]/30 shadow-md w-fit overflow-hidden">
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
                <span className="text-xs tracking-widest font-century uppercase text-[#A85D2A] font-bold mt-1">
                  Architecture &bull; Interiors &bull; Odisha
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C564E] font-century leading-relaxed max-w-sm pt-2">
              Best Interior Design Company in Bhubaneswar, transforming spaces with elegant, functional designs across Odisha.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-2 pt-2 text-xs text-[#5C564E] font-century">
              <div className="flex items-start space-x-2.5">
                <span className="text-[#C47847] font-mono">📍</span>
                <span>3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#C47847] font-mono">📞</span>
                <a href="tel:+917504041040" className="hover:text-[#1A1815] transition-colors font-semibold">
                  +91-750404104 / 75040 41040
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#C47847] font-mono">✉️</span>
                <a href="mailto:info@kalyandesignstudio.com" className="hover:text-[#1A1815] transition-colors font-semibold">
                  info@kalyandesignstudio.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#C47847] font-mono">🕒</span>
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center space-x-3">
              <span className="text-[11px] uppercase tracking-wider text-[#8C8275] mr-1 font-century font-semibold">Follow:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-2 text-[#68625A] hover:text-white bg-white hover:bg-[#FF8526] border border-[#C47847]/20 rounded-full transition-all shadow-xs"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links (Col 6-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#A85D2A] font-century font-bold mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm uppercase tracking-wider text-[#68625A] hover:text-[#FF8526] transition-colors font-century"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://kalyandesignstudio.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm uppercase tracking-wider text-[#A85D2A] hover:text-[#FF8526] transition-colors font-century font-semibold"
                >
                  WordPress Blog ↗
                </a>
              </li>
              <li>
                <a
                  href="https://g.co/kgs/VwVxACj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm uppercase tracking-wider text-[#68625A] hover:text-[#FF8526] transition-colors font-century"
                >
                  Google Reviews (4.9 ★) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Google Maps Embed (Col 8-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#A85D2A] font-century font-bold">
              Studio Location
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-[#C47847]/25 bg-white shadow-md">
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
            <p className="text-[11px] text-[#7C6F5E] font-century">
              Baragada, Puri-NH Bypass, Bhubaneswar &bull; Serving all Odisha districts.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7C6F5E] font-century gap-4">
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
