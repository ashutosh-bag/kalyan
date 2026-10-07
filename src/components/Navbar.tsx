'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'spatial-showcase', 'about', 'projects', 'blog', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Showcase', href: '#spatial-showcase', id: 'spatial-showcase' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      shortName: 'fb',
      href: 'https://facebook.com',
      ariaLabel: 'KYN on Facebook',
      svg: (
        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav-scrolled py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo: KYN */}
          <Link
            href="#home"
            className="group flex items-center space-x-3 focus:outline-none"
            aria-label="KYN Interior Design Agency Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 border border-white/20 rounded-sm bg-neutral-900/60 backdrop-blur-md transition-all duration-300 group-hover:border-[#c8a47e] group-hover:shadow-[0_0_20px_rgba(200,164,126,0.3)]">
              <span className="font-serif tracking-widest text-lg font-bold text-white group-hover:text-[#c8a47e] transition-colors">
                K
              </span>
              <div className="absolute -bottom-0.5 w-4 h-[1px] bg-[#c8a47e] opacity-70 group-hover:w-6 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-lg font-semibold text-white uppercase group-hover:text-[#c8a47e] transition-colors">
                KYN
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-sans">
                Studio Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation items serialized: home, about, projects, blog, contact */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-neutral-900/40 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full shadow-lg"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-[#e0c8aa] bg-white/5 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c8a47e]"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Social Icons (fb, ig, yt) + Consultation Button */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Social media icons next to navigation */}
            <div
              className="flex items-center space-x-1.5 border-r border-white/15 pr-4 text-neutral-300"
              aria-label="Social media channels"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group relative p-2 text-neutral-400 hover:text-[#c8a47e] hover:bg-white/5 rounded-full transition-all duration-300"
                  title={social.name}
                >
                  {social.svg}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Corporate CTA */}
            <a
              href="#contact"
              onClick={onOpenConsultation}
              className="group inline-flex items-center space-x-2 px-4 py-2 border border-[#c8a47e]/60 bg-[#c8a47e]/10 hover:bg-[#c8a47e] text-xs uppercase tracking-[0.2em] font-medium text-[#e0c8aa] hover:text-neutral-950 transition-all duration-300 rounded-sm shadow-[0_0_15px_rgba(200,164,126,0.15)] hover:shadow-[0_0_25px_rgba(200,164,126,0.4)]"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <a
              href="#contact"
              className="px-2.5 py-1.5 border border-[#c8a47e]/50 bg-[#c8a47e]/10 text-[10px] uppercase tracking-wider text-[#e0c8aa] rounded-sm"
            >
              Inquire
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900/60 border border-white/10 rounded-sm focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 mt-3 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] font-medium text-neutral-300 hover:text-[#c8a47e] py-1 border-b border-white/5 transition-colors"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Social Links */}
            <div className="pt-3 flex items-center justify-between border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-neutral-400">Connect with KYN:</span>
              <div className="flex items-center space-x-3 text-neutral-300">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="p-2 text-neutral-300 hover:text-[#c8a47e] bg-white/5 rounded-full"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
