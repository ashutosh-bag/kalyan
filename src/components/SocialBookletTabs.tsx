'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/data';

interface SocialTab {
  name: string;
  href: string;
  ariaLabel: string;
  // Signature colors for light background when expanded
  hoverBg: string;
  hoverBorder: string;
  hoverText: string;
  iconColor: string;
  svg: React.ReactNode;
}

const SOCIAL_TABS: SocialTab[] = [
  {
    name: 'Instagram',
    href: STUDIO_INFO.contact.socialLinks.instagram,
    ariaLabel: 'Follow Kalyan Design Studio on Instagram',
    hoverBg: 'hover:bg-gradient-to-r hover:from-[#FFF0F5] hover:to-[#FFF5F8]',
    hoverBorder: 'hover:border-[#E1306C]/35',
    hoverText: 'group-hover:text-[#E1306C]',
    iconColor: 'group-hover:text-[#E1306C]',
    svg: (
      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: STUDIO_INFO.contact.socialLinks.facebook,
    ariaLabel: 'Follow Kalyan Design Studio on Facebook',
    hoverBg: 'hover:bg-[#F0F7FF]',
    hoverBorder: 'hover:border-[#1877F2]/35',
    hoverText: 'group-hover:text-[#1877F2]',
    iconColor: 'group-hover:text-[#1877F2]',
    svg: (
      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: STUDIO_INFO.contact.socialLinks.youtube,
    ariaLabel: 'Subscribe to Kalyan Design Studio YouTube channel',
    hoverBg: 'hover:bg-[#FFF2F2]',
    hoverBorder: 'hover:border-[#FF0000]/35',
    hoverText: 'group-hover:text-[#FF0000]',
    iconColor: 'group-hover:text-[#FF0000]',
    svg: (
      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/kalyandesignstudio',
    ariaLabel: 'Find interior design inspiration on Pinterest',
    hoverBg: 'hover:bg-[#FFF1F2]',
    hoverBorder: 'hover:border-[#BD081C]/35',
    hoverText: 'group-hover:text-[#BD081C]',
    iconColor: 'group-hover:text-[#BD081C]',
    svg: (
      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/917504041040?text=Hello%20Kalyan%20Design%20Studio%2C%20I%20am%20interested%20in%20an%20interior%20design%20consultation.',
    ariaLabel: 'Message Kalyan Design Studio on WhatsApp (075040 41040)',
    hoverBg: 'hover:bg-[#F0FDF4]',
    hoverBorder: 'hover:border-[#25D366]/35',
    hoverText: 'group-hover:text-[#15803D]',
    iconColor: 'group-hover:text-[#25D366]',
    svg: (
      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    ),
  },
];

export default function SocialBookletTabs() {
  return (
    <aside 
      aria-label="Studio Social Media Channels" 
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-start gap-1.5 select-none pointer-events-auto"
    >
      {SOCIAL_TABS.map((tab) => (
        <a
          key={tab.name}
          href={tab.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tab.ariaLabel}
          className={`group relative flex items-center h-10 sm:h-11 rounded-r-2xl bg-white/95 backdrop-blur-md border-y border-r border-[#1A1815]/10 text-[#2C1E16]/75 shadow-[0_4px_14px_rgba(26,24,21,0.06)] hover:shadow-[0_8px_25px_rgba(44,30,22,0.18)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:z-10 cursor-pointer overflow-hidden ${tab.hoverBg} ${tab.hoverBorder}`}
        >
          {/* Edge Bookmark Notch Indicator */}
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A1815]/15 group-hover:bg-current transition-colors" />

          {/* Fixed-Width Icon Anchor (Keeps unhovered tabs perfectly compact and identical) */}
          <div className="w-10 sm:w-11 h-full flex items-center justify-center flex-shrink-0">
            <span className={`transition-colors duration-200 ${tab.iconColor}`}>
              {tab.svg}
            </span>
          </div>

          {/* Expandable Tab Label (ONLY this hovered tab pops out to reveal name) */}
          <div className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:opacity-100 group-hover:pr-3.5 transition-all duration-300 ease-out flex items-center gap-1.5">
            <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${tab.hoverText}`}>
              {tab.name}
            </span>
            <ArrowUpRight className={`w-3 h-3 opacity-60 transition-colors ${tab.hoverText}`} />
          </div>
        </a>
      ))}
    </aside>
  );
}

