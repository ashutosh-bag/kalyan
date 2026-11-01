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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const effectiveScrolled = isScrolled || isServicesPage || isAboutPage || isProjectsPage || isGalleryPage;

  useEffect(() => {
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

      // Track active section for indicator
      const sections = ['home', 'about', 'packages', 'spatial-showcase', 'gallery', '360-view', 'testimonials-360', 'projects', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isServicesPage, isAboutPage, isProjectsPage, isGalleryPage]);

  // Primary navigation items
  const navItems = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'Projects', href: '/projects', id: 'projects' },
    { name: 'Gallery', href: '/gallery', id: 'gallery' },
    { name: '360° View', href: '/#360-view', id: '360-view' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  // Requested social media icons with official links
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
      name: 'Pinterest',
      href: 'https://pinterest.com/kalyandesignstudio',
      ariaLabel: 'Find interior design inspiration on Pinterest',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
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
      ariaLabel: 'Subscribe to Kalyan Design Studio on YouTube',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/917504041040',
      ariaLabel: 'Message Kalyan Design Studio on WhatsApp (075040 41040)',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
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
            className="group flex items-center gap-2 sm:gap-2.5 focus:outline-none flex-shrink-0"
            aria-label="Kalyan Design Studio Home"
          >
            <div className="p-1 rounded-xl bg-white border border-[#9C5427]/30 shadow-xs overflow-hidden flex items-center justify-center">
              <img
                src="/images/kalyan/branding/logo.gif"
                alt="Kalyan Design Studio Animated Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-sm sm:text-base tracking-tight uppercase leading-none font-sans transition-colors ${
                effectiveScrolled ? 'text-[#1A1815]' : 'text-white'
              }`}>
                KALYAN
              </span>
              <span className={`text-[9px] sm:text-[10px] font-medium tracking-wider mt-0.5 uppercase transition-colors ${
                effectiveScrolled ? 'text-[#7A7369]' : 'text-white/75'
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

          {/* Right Action: Social Media Icons + Quick Site Visit CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            
            {/* Social Media Icons row (hidden on very small screens, visible from sm) */}
            <div className={`hidden sm:flex items-center space-x-2.5 transition-colors ${
              effectiveScrolled ? 'text-[#1A1815]/75' : 'text-white/90'
            }`}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={`p-1.5 rounded-full transition-all duration-200 hover:scale-115 cursor-pointer ${
                    effectiveScrolled
                      ? 'hover:text-[#9C5427] hover:bg-[#FAF8F5]'
                      : 'hover:text-white hover:bg-white/15 backdrop-blur-xs'
                  }`}
                >
                  {social.svg}
                </a>
              ))}
            </div>

            {/* Quick Contact / Schedule Free Site Visit Pill CTA */}
            <Link
              href="/#contact"
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

            {/* Social Icons row in mobile drawer */}
            <div className="pt-3 pb-2 flex items-center justify-start space-x-4 text-[#1A1815]/80">
              <span className="text-xs uppercase tracking-wider text-[#7A7369] font-medium mr-1">Follow Us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="p-2 rounded-full bg-white border border-[#1A1815]/10 hover:text-[#9C5427] transition-all"
                >
                  {social.svg}
                </a>
              ))}
            </div>

            {/* Mobile Estimate Button */}
            <div className="pt-2">
              <Link
                href="/#contact"
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
