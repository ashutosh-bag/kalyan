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
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      shortName: 'fb',
      href: 'https://facebook.com',
      ariaLabel: 'KYN on Facebook',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      shortName: 'ig',
      href: 'https://instagram.com',
      ariaLabel: 'KYN on Instagram',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      shortName: 'yt',
      href: 'https://youtube.com',
      ariaLabel: 'KYN on YouTube',
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
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-9 h-9 border border-[#c8a47e]/60 rounded-sm bg-neutral-900">
                <span className="font-serif tracking-widest text-base font-bold text-white">K</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-lg font-semibold text-white uppercase">
                  KYN
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                  Architectural Interiors &bull; Odisha
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
              Premier turnkey interior architecture, bespoke teak millwork, and spatial craftsmanship across Bhubaneswar, Cuttack, Puri, and Eastern India.
            </p>

            {/* Social Icons (fb, ig, yt) */}
            <div className="pt-2 flex items-center space-x-3">
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

          {/* Navigation Links (Col 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium mb-4">
              Navigation
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
            </ul>
          </div>

          {/* Newsletter Monograph Subscription (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#e0c8aa] font-medium">
              Odisha Design Monograph
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive updates on regional architecture, material research, and invitations to our Bhubaneswar studio showcases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs rounded-sm flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>You have been subscribed to the KYN Odisha monograph register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-neutral-900 border border-white/15 border-r-0 rounded-l-sm px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c8a47e]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 bg-[#c8a47e] hover:bg-[#e0c8aa] text-neutral-950 text-xs font-semibold rounded-r-sm transition-colors flex items-center justify-center"
                  aria-label="Subscribe to Monograph"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Studio KYN Architecture & Design Pvt. Ltd. Bhubaneswar, Odisha.</p>
          <div className="flex items-center space-x-6">
            <a href="#home" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#home" className="hover:text-neutral-300 transition-colors">Terms of Commission</a>
            <span>&bull;</span>
            <a href="#home" className="hover:text-neutral-300 transition-colors">Council of Architecture (India)</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
