'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscribeNewsletter } from '@/lib/api-client';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setLoading(true);
    try {
      const res = await subscribeNewsletter(newsletterEmail);
      if (res.success) {
        setSubscribed(true);
        setNewsletterEmail('');
      }
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Packages', href: '#packages' },
    { name: 'Showcase', href: '#spatial-showcase' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      shortName: 'fb',
      href: 'https://www.facebook.com/kalyandesignstudio?mibextid=qi2Omg&rdid=MHLyk3ZtVcuF1RKv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FrkDRD6iso3sg4iDR%2F%3Fmibextid%3Dqi2Omg',
      ariaLabel: 'Kalyan Design Studio on Facebook',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      shortName: 'ig',
      href: 'https://www.instagram.com/kalyan_design_studio?igsh=N2U3ZmJ1N210Mmhs',
      ariaLabel: 'Kalyan Design Studio on Instagram',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      shortName: 'yt',
      href: 'https://www.youtube.com/watch?si=yv5otNwI-2c43qK8&v=ACrraXQOfuQ&feature=youtu.be',
      ariaLabel: 'Kalyan Design Studio on YouTube',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#08090b] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Studio Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-1.5 rounded-2xl bg-black border-2 border-[#FF8526] shadow-[0_4px_28px_rgba(255,133,38,0.4)] w-fit overflow-hidden">
                <img
                  src="/images/kalyan/branding/logo.gif"
                  alt="Kalyan Design Studio Animated Logo"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bounce text-2xl text-white">
                  Kalyan Design Studio
                </span>
                <span className="text-xs tracking-widest font-century uppercase text-[#FF8526] font-bold mt-1">
                  Architecture &bull; Interiors &bull; Odisha
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
              Best Interior Design Company in Bhubaneswar, transforming spaces with elegant, functional designs across Odisha.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-2 pt-2 text-xs text-neutral-300">
              <div className="flex items-start space-x-2.5">
                <span className="text-[#c8a47e] font-mono">📍</span>
                <span>3181/5466, Puri-NH Bypass, Baragada, Bhubaneswar, Odisha 751018</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#c8a47e] font-mono">📞</span>
                <a href="tel:+910750404104" className="hover:text-white transition-colors">
                  +91-0750404104 / 075040 41040
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#c8a47e] font-mono">✉️</span>
                <a href="mailto:info@kalyandesignstudio.com" className="hover:text-white transition-colors">
                  info@kalyandesignstudio.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[#c8a47e] font-mono">🕒</span>
                <span>Mon – Sat: 10:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center space-x-3">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mr-1">Follow:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-2 text-neutral-300 hover:text-[#c8a47e] bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links (Col 6-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
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
                  className="text-xs sm:text-sm uppercase tracking-wider text-[#c8a47e] hover:text-white transition-colors"
                >
                  WordPress Blog ↗
                </a>
              </li>
              <li>
                <a
                  href="https://g.co/kgs/VwVxACj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  Google Reviews (4.9 ★) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Google Maps Embed (Col 8-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">
              Studio Location
            </h4>
            <div className="w-full h-44 rounded-sm overflow-hidden border border-white/15 bg-neutral-900 shadow-md">
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
            <p className="text-[11px] text-neutral-400">
              Baragada, Puri-NH Bypass, Bhubaneswar &bull; Serving all Odisha districts.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Kalyan Design Studio. All rights reserved. Baragada, Bhubaneswar, Odisha 751018.</p>
          <div className="flex items-center space-x-6">
            <a href="tel:+910750404104" className="hover:text-neutral-300 transition-colors">+91-0750404104</a>
            <span>&bull;</span>
            <a href="mailto:info@kalyandesignstudio.com" className="hover:text-neutral-300 transition-colors">info@kalyandesignstudio.com</a>
            <span>&bull;</span>
            <a href="https://g.co/kgs/VwVxACj" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">Verified Google Listing</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
