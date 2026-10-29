'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'packages', 'spatial-showcase', 'testimonials-360', 'about', 'projects', 'blog', 'google-reviews', 'contact'];
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home', hasSubmenu: true },
    { name: 'Shop', href: '#packages', id: 'packages', hasSubmenu: true },
    { name: 'Collections', href: '#spatial-showcase', id: 'spatial-showcase', hasSubmenu: true },
    { name: 'About', href: '#about', id: 'about', hasSubmenu: false },
    { name: 'Contact', href: '#contact', id: 'contact', hasSubmenu: false },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3 shadow-xs border-b border-[#1A1815]/8'
          : 'bg-[#FAF8F5]/90 backdrop-blur-xs py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Minimalist Studio Logo (House Glyph + KALYAN Home Lives Brighter) */}
          <Link
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none flex-shrink-0"
            aria-label="Kalyan Design Studio Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1A1815] flex items-center justify-center text-white shadow-xs group-hover:bg-[#9C5427] transition-colors flex-shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h5v-5h4v5h5v-8h3L12 3z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#1A1815] leading-none uppercase font-sans">
                KALYAN
              </span>
              <span className="text-[10px] text-[#7A7369] font-medium tracking-wide mt-0.5">
                Home Lives Brighter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation items with dropdown chevrons */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#1A1815]"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center gap-1 transition-colors ${
                    isActive
                      ? 'text-[#9C5427] font-semibold'
                      : 'text-[#1A1815]/80 hover:text-[#9C5427]'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasSubmenu && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Profile, Wishlist, Cart/Quote Bag) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 text-[#1A1815] flex-shrink-0">
            <button
              type="button"
              aria-label="Search interiors"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-1.5 hover:text-[#9C5427] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
            <a
              href="#contact"
              aria-label="Contact Studio"
              className="p-1.5 hover:text-[#9C5427] transition-colors"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a
              href="#projects"
              aria-label="Saved Projects"
              className="p-1.5 hover:text-[#9C5427] transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>
            <a
              href="#packages"
              onClick={(e) => {
                if (onOpenConsultation) {
                  e.preventDefault();
                  onOpenConsultation();
                }
              }}
              aria-label="Quote Bag"
              className="relative p-1.5 hover:text-[#9C5427] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#9C5427] text-white text-[9px] font-bold flex items-center justify-center">
                0
              </span>
            </a>

            {/* Mobile Toggle Button (< md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#1A1815] hover:text-[#9C5427] focus:outline-none transition-colors ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#1A1815]/10 mt-3 px-5 py-5 transition-all duration-300 animate-in fade-in slide-in-from-top-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-semibold text-[#1A1815] py-2 border-b border-[#1A1815]/5 hover:text-[#9C5427]"
              >
                <span>{item.name}</span>
                {item.hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 bg-[#9C5427] text-white font-medium text-sm rounded-full shadow-sm"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
