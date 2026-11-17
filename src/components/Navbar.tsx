'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';
  const isAboutPage = pathname === '/about';
  const isProjectsPage = pathname === '/projects';
  const isGalleryPage = pathname === '/gallery';
  const isContactPage = pathname === '/contact';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const effectiveScrolled = isScrolled || isServicesPage || isAboutPage || isProjectsPage || isGalleryPage || isContactPage;

  useEffect(() => {
    if (isContactPage) {
      setActiveSection('contact');
      return;
    }

    if (isGalleryPage) {
      setActiveSection('gallery');
      return;
    }

    if (isProjectsPage) {
      setActiveSection('projects');
      return;
    }

    if (isAboutPage) {
      setActiveSection('about');
      return;
    }

    if (isServicesPage) {
      setActiveSection('services');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // Check if user is scrolled near bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('360-view');
        return;
      }

      // Ordered list of section IDs in page flow and their target navbar item id
      const sectionFlow: { id: string; navId: string }[] = [
        { id: '360-view', navId: '360-view' },
        { id: 'testimonials-360', navId: '360-view' },
        { id: 'spatial-showcase', navId: 'projects' },
        { id: 'projects', navId: 'projects' },
        { id: 'packages', navId: 'services' },
        { id: 'services', navId: 'services' },
        { id: 'about', navId: 'about' },
        { id: 'home', navId: 'home' },
      ];

      // Trigger line in viewport: 260px from top (comfortably below navbar)
      const triggerY = 260;
      let matchedNav: string | null = null;

      for (const item of sectionFlow) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            matchedNav = item.navId;
            break;
          }
        }
      }

      if (matchedNav) {
        setActiveSection(matchedNav);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isServicesPage, isAboutPage, isProjectsPage, isGalleryPage, isContactPage]);

  // Primary navigation items
  const navItems = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'Projects', href: '/projects', id: 'projects' },
    { name: 'Gallery', href: '/gallery', id: 'gallery' },
    { name: '360° View', href: '/#360-view', id: '360-view' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        effectiveScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3 sm:py-3.5 shadow-sm border-b border-[#1A1815]/8'
          : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo: Kalyan Design Studio (Footer's Official Animated Logo) */}
          <Link
            href="/#home"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none flex-shrink-0"
            aria-label="Kalyan Design Studio Home"
          >
            <div className="p-1.5 rounded-xl bg-white border border-[#9C5427]/30 shadow-xs overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/images/kalyan/branding/logo.gif"
                alt="Kalyan Design Studio Animated Logo"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-black text-lg sm:text-xl lg:text-[22px] tracking-tight uppercase leading-none font-sans transition-colors ${
                effectiveScrolled ? 'text-[#1A1815]' : 'text-white'
              }`}>
                KALYAN
              </span>
              <span className={`text-xs sm:text-[13px] font-bold tracking-wider mt-0.5 sm:mt-1 uppercase transition-colors ${
                effectiveScrolled ? 'text-[#68625A]' : 'text-white/80'
              }`}>
                Design Studio
              </span>
            </div>
          </Link>

          {/* Center Navigation Links: Home, Services, Projects, Blog, Contact */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-7 lg:space-x-9 text-xs sm:text-sm font-semibold tracking-wide uppercase"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-1 transition-all duration-200 ${
                    effectiveScrolled
                      ? isActive
                        ? 'text-[#9C5427] font-bold'
                        : 'text-[#1A1815]/80 hover:text-[#9C5427]'
                      : isActive
                      ? 'text-white font-bold drop-shadow-sm'
                      : 'text-white/85 hover:text-white hover:drop-shadow-sm'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all ${
                      effectiveScrolled ? 'bg-[#9C5427]' : 'bg-white'
                    }`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Quick Site Visit CTA + Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            
            {/* Quick Contact / Schedule Free Site Visit Pill CTA */}
            <Link
              href="/contact"
              onClick={(e) => {
                if (onOpenConsultation) {
                  e.preventDefault();
                  onOpenConsultation();
                }
              }}
              className={`hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer ${
                effectiveScrolled
                  ? 'bg-[#9C5427] hover:bg-[#85451D] text-white'
                  : 'bg-white/90 hover:bg-white text-[#1A1815] backdrop-blur-sm'
              }`}
            >
              <span>Schedule Free Site Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Toggle Button (< md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors focus:outline-none ${
                effectiveScrolled 
                  ? 'text-[#1A1815] hover:text-[#9C5427]' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#1A1815]/10 mt-3 px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-bold text-[#1A1815] py-2.5 border-b border-[#1A1815]/6 hover:text-[#9C5427] uppercase tracking-wide"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}

            {/* Mobile Estimate Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#9C5427] hover:bg-[#85451D] text-white font-semibold text-sm rounded-full shadow-sm uppercase tracking-wider"
              >
                <span>Schedule Free Site Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
