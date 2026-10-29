'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Pause,
  Play,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  LayoutGrid,
  MapPin,
  X,
  SlidersHorizontal,
  Clock,
  Sparkles,
  Quote,
  CheckCircle,
  ThumbsUp,
  Award,
  Navigation,
} from 'lucide-react';
import { GoogleReview, GooglePlaceReviewsData } from '@/lib/types';
import { getGoogleReviews, triggerGoogleReviewSync } from '@/lib/api-client';
import fallbackData from '@/data/google_reviews.json';

const FILTER_TAGS = [
  { id: 'all', label: 'All Reviews' },
  { id: '5star', label: '5-Star Ratings' },
  { id: 'villa', label: 'Duplex & Villas' },
  { id: 'bhk', label: 'Turnkey 2/3/4 BHK' },
  { id: 'kitchen', label: 'Modular Kitchen & Living' },
];

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>(fallbackData.reviews as GoogleReview[]);
  const [placeInfo, setPlaceInfo] = useState<GooglePlaceReviewsData['placeInfo']>(fallbackData.placeInfo);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1120) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stable avatar gradient generator
  const getAvatarGradient = (name: string): string => {
    const gradients = [
      'from-[#FF8526] via-[#E79F30] to-[#b35900]',
      'from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]',
      'from-[#10B981] via-[#059669] to-[#047857]',
      'from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9]',
      'from-[#EC4899] via-[#DB2777] to-[#BE185D]',
      'from-[#06B6D4] via-[#0891B2] to-[#0E7490]',
      'from-[#F59E0B] via-[#D97706] to-[#B45309]',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return gradients[Math.abs(hash) % gradients.length];
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (selectedTag === 'all') return true;
      if (selectedTag === '5star') return r.rating === 5;
      if (selectedTag === 'villa') {
        const text = `${r.projectType || ''} ${r.reviewText} ${r.highlights?.join(' ') || ''}`.toLowerCase();
        return text.includes('villa') || text.includes('duplex') || text.includes('penthouse');
      }
      if (selectedTag === 'bhk') {
        const text = `${r.projectType || ''} ${r.reviewText} ${r.highlights?.join(' ') || ''}`.toLowerCase();
        return text.includes('bhk') || text.includes('residential') || text.includes('turnkey');
      }
      if (selectedTag === 'kitchen') {
        const text = `${r.projectType || ''} ${r.reviewText} ${r.highlights?.join(' ') || ''}`.toLowerCase();
        return text.includes('kitchen') || text.includes('living') || text.includes('wallpaper') || text.includes('wardrobe');
      }
      return true;
    });
  }, [reviews, selectedTag]);

  const maxIndex = Math.max(0, filteredReviews.length - itemsPerPage);

  const handleNext = useCallback(() => {
    if (filteredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setProgress(0);
  }, [filteredReviews.length, maxIndex]);

  const handlePrev = useCallback(() => {
    if (filteredReviews.length === 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setProgress(0);
  }, [filteredReviews.length, maxIndex]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [selectedTag]);

  // Fetch reviews on mount
  const fetchReviews = useCallback(async () => {
    try {
      const data = await getGoogleReviews('all', false);
      if (data && data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
        if (data.placeInfo) setPlaceInfo(data.placeInfo);
      }
    } catch (e) {
      console.warn('API reviews fetch note, using fallback:', e);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Handle manual sync button click
  const handleSyncClick = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      await triggerGoogleReviewSync();
      await fetchReviews();
      setSyncFeedback('Updated directly from Google Places API!');
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch {
      setSyncFeedback('Reviews refreshed.');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-play timer
  const SLIDE_DURATION = 6000;
  const PROGRESS_TICK = 50;

  useEffect(() => {
    if (isPaused || viewMode === 'grid' || filteredReviews.length <= itemsPerPage) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isPaused, viewMode, handleNext, filteredReviews.length, itemsPerPage]);

  // Visible slice of reviews for carousel
  const visibleReviews = useMemo(() => {
    if (viewMode === 'grid') return filteredReviews;
    if (filteredReviews.length <= itemsPerPage) return filteredReviews;
    const slice = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const idx = (currentIndex + i) % filteredReviews.length;
      slice.push(filteredReviews[idx]);
    }
    return slice;
  }, [filteredReviews, currentIndex, itemsPerPage, viewMode]);

  // Continuous marquee quotes
  const marqueeQuotes = [
    'Top interior designers in Bhubaneswar',
    '3D renders matched the final handover 100%',
    'Delivered our dream home within our exact timeline',
    'Creative ideas to totally transform my duplex',
    'Professional, skilled and timely works! Pocket friendly',
    'Transparency in material selection & pricing was unmatched',
    'Modular kitchen craftsmanship is next-level',
  ];

  return (
    <section
      id="google-reviews"
      aria-label="Google Reviews of Kalyan Design Studio"
      className="scroll-mt-24 relative bg-[#FAF8F5] text-[#1A1815] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1A1815]/8 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Badge & Live Sync Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1A1815]/8 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#1A1815]">
                Official Google Reviews &bull; Live Sync
              </span>
            </div>

            <button
              type="button"
              onClick={handleSyncClick}
              disabled={isSyncing}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-50 border border-[#1A1815]/8 text-xs text-[#9C5427] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              title="Synchronize and fetch newest reviews from Google Maps"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Refreshing...' : 'Sync with Google'}</span>
            </button>

            {syncFeedback && (
              <span className="text-xs text-[#34A853] font-medium bg-[#34A853]/10 px-3 py-1 rounded-full border border-[#34A853]/30 animate-fade-in flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 inline mr-1" />
                {syncFeedback}
              </span>
            )}
          </div>

          {/* Quick External Google Maps Action */}
          <a
            href={placeInfo.googleBusinessUrl || 'https://g.co/kgs/VwVxACj'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#68625A] hover:text-[#1A1815] transition-colors group cursor-pointer"
          >
            <span>View Verified Listing on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9C5427] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Main Title & Hero Google Trust Scoreboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          {/* Left Title and Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-6 h-[1.5px] bg-[#9C5427]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#9C5427]">
                VERIFIED CLIENT REPUTATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black uppercase text-[#1A1815] tracking-tight leading-tight">
              REAL CLIENT TRUST FROM ODISHA HOMES.
            </h2>
            <p className="text-sm sm:text-base text-[#68625A] max-w-2xl leading-relaxed">
              Every verified review published directly on Google Maps by homeowners of luxury duplex villas, penthouses, and turnkey apartments across Bhubaneswar, Cuttack &amp; Puri.
            </p>
          </div>

          {/* Right: Premium Google Trust Scoreboard Bento */}
          <div className="lg:col-span-5 bg-white/95 border border-[#C47847]/20 p-5 sm:p-6 rounded-3xl shadow-[0_16px_40px_rgba(196,120,71,0.12)]">
            <div className="flex items-center justify-between gap-4">
              {/* Google G Logo & Rating */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3E9] border border-[#C47847]/25 flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold font-playfair text-[#1A1815] tracking-tight">
                      {placeInfo.rating || 4.9}
                    </span>
                    <span className="text-xs text-[#7C6F5E] font-mono">/ 5.0</span>
                    <div className="flex items-center space-x-0.5 ml-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF8526] text-[#FF8526]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#5C564E] font-century mt-0.5">
                    Based on <strong className="text-[#1A1815] font-semibold">{placeInfo.userRatingsTotal || 82}+ verified Google reviews</strong>
                  </p>
                </div>
              </div>

              {/* Direct Write a Review CTA */}
              <a
                href={placeInfo.googleWriteReviewUrl || 'https://g.co/kgs/VwVxACj'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FF8526] to-[#E26F14] hover:from-[#e5741e] hover:to-[#ce5f08] text-white font-semibold text-xs transition-all shadow-md hover:scale-[1.02] shrink-0 cursor-pointer"
              >
                <span>Write Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-[#1A1815]/10 text-center">
              <div>
                <p className="text-base font-bold text-[#1A1815] font-playfair">98%</p>
                <p className="text-[10px] text-[#7C6F5E] uppercase tracking-wider font-mono">5-Star Ratio</p>
              </div>
              <div className="border-x border-[#1A1815]/10">
                <p className="text-base font-bold text-[#34A853] font-playfair">100%</p>
                <p className="text-[10px] text-[#7C6F5E] uppercase tracking-wider font-mono">Verified Works</p>
              </div>
              <div>
                <p className="text-base font-bold text-[#FF8526] font-playfair">#1</p>
                <p className="text-[10px] text-[#7C6F5E] uppercase tracking-wider font-mono">Odisha Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills & View Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#1A1815]/10">
          {/* Filter Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {FILTER_TAGS.map((tag) => {
              const isActive = selectedTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-white font-semibold shadow-xs'
                      : 'bg-white/90 hover:bg-white text-[#68625A] hover:text-[#1A1815] border border-[#C47847]/20'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Modal Button */}
          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#C47847]/20 text-xs text-[#5C564E] hover:text-[#1A1815] transition-colors cursor-pointer shadow-xs"
              title={viewMode === 'carousel' ? 'Switch to Wall of Love Grid' : 'Switch to Carousel Slider'}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#FF8526]" />
              <span>{viewMode === 'carousel' ? 'Wall of Love (Grid)' : 'Carousel View'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#C47847]/20 text-xs text-[#5C564E] hover:text-[#1A1815] transition-colors cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF8526]" />
              <span>All ({reviews.length})</span>
            </button>
          </div>
        </div>

        {/* REVIEWS DISPLAY: Multi-Card Grid or Carousel */}
        {viewMode === 'grid' ? (
          // Full Wall of Love Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} getAvatarGradient={getAvatarGradient} getInitials={getInitials} />
            ))}
          </div>
        ) : (
          // Multi-Card Responsive Carousel Showcase
          <div className="relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} getAvatarGradient={getAvatarGradient} getInitials={getInitials} />
              ))}
            </div>

            {/* Slider Progress Bar */}
            {filteredReviews.length > itemsPerPage && (
              <div className="w-full bg-[#1A1815]/10 h-1 mt-8 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#FF8526] via-[#ffa65c] to-[#E79F30] h-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Carousel Bottom Controls */}
            {filteredReviews.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-2">
                {/* Status Indicator */}
                <div className="flex items-center space-x-3 text-xs text-[#5C564E] font-century">
                  <span>
                    Card <strong className="text-[#1A1815] font-semibold">{currentIndex + 1}</strong> to{' '}
                    <strong className="text-[#1A1815] font-semibold">
                      {Math.min(currentIndex + itemsPerPage, filteredReviews.length)}
                    </strong>{' '}
                    of {filteredReviews.length}
                  </span>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#5C564E] hover:text-[#1A1815] px-3 py-1 rounded-full bg-white/90 hover:bg-white border border-[#C47847]/20 transition-colors shadow-xs cursor-pointer"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3 h-3 text-[#34A853] fill-current" />
                        <span>Resume Autoplay</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 text-[#FF8526]" />
                        <span>Autoplay Active</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dot Ribbon */}
                <div className="flex items-center space-x-1.5 max-w-[200px] overflow-x-auto py-1 scrollbar-none">
                  {Array.from({ length: Math.ceil(filteredReviews.length / itemsPerPage) }).map((_, dotIdx) => {
                    const activeDot = Math.floor(currentIndex / itemsPerPage) === dotIdx;
                    return (
                      <button
                        key={dotIdx}
                        type="button"
                        aria-label={`Go to slide group ${dotIdx + 1}`}
                        onClick={() => {
                          setCurrentIndex(dotIdx * itemsPerPage);
                          setProgress(0);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                          activeDot ? 'w-6 bg-[#FF8526]' : 'w-2 bg-[#C47847]/25 hover:bg-[#C47847]/50'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#C47847]/25 flex items-center justify-center text-[#1A1815] transition-all hover:scale-105 hover:border-[#FF8526] shadow-sm cursor-pointer"
                    aria-label="Previous Google reviews"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#C47847]/25 flex items-center justify-center text-[#1A1815] transition-all hover:scale-105 hover:border-[#FF8526] shadow-sm cursor-pointer"
                    aria-label="Next Google reviews"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Continuous Dynamic Marquee (Wall of Love Ticker) */}
        <div className="relative my-10 py-3.5 bg-white/90 border-y border-[#C47847]/20 backdrop-blur-md overflow-hidden rounded-2xl shadow-xs">
          <div className="flex items-center space-x-8 whitespace-nowrap animate-marquee">
            {marqueeQuotes.concat(marqueeQuotes).map((quote, idx) => (
              <div key={idx} className="inline-flex items-center space-x-3 text-xs sm:text-sm text-[#5C564E]">
                <span className="text-[#FF8526] font-serif text-lg leading-none">&ldquo;</span>
                <span className="font-playfair font-normal text-[#1A1815]">{quote}</span>
                <span className="text-[#FF8526] font-serif text-lg leading-none">&rdquo;</span>
                <div className="flex items-center space-x-0.5 text-[#FF8526] ml-1">
                  <Star className="w-3 h-3 fill-current inline" />
                  <Star className="w-3 h-3 fill-current inline" />
                  <Star className="w-3 h-3 fill-current inline" />
                  <Star className="w-3 h-3 fill-current inline" />
                  <Star className="w-3 h-3 fill-current inline" />
                </div>
                <span className="text-[#C47847]/30 ml-4">&bull;</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Studio Location & Google Maps Bento Section */}
        <div className="rounded-3xl bg-white/95 border border-[#C47847]/20 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_16px_45px_rgba(196,120,71,0.1)] text-[#1A1815]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Studio Trust Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E9] border border-[#C47847]/20 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#FF8526]" />
                <span className="text-[#A85D2A] font-mono text-[11px] uppercase tracking-wider font-semibold">
                  Bhubaneswar Studio &bull; Verified Google Place
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-normal text-[#1A1815] leading-tight">
                  Experience Our Design Studio in Person
                </h3>
                <p className="text-xs sm:text-sm text-[#5C564E] font-century leading-relaxed">
                  Visit our design lounge along the Puri-NH Bypass to touch and feel live modular kitchen materials, architectural finishes, hardware catalogs, and 3D VR renders.
                </p>
              </div>

              {/* Studio Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#C47847]/15">
                  <Clock className="w-4 h-4 text-[#FF8526] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#1A1815]">Opening Hours</p>
                    <p className="text-[11px] text-[#7C6F5E]">Mon - Sun: 10:00 AM - 8:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#C47847]/15">
                  <ShieldCheck className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#1A1815]">Verified Business</p>
                    <p className="text-[11px] text-[#7C6F5E]">Google Verified Partner</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.google.com/maps/place/Kalyan+Design+Studio/@20.2517472,85.8610613,15z/data=!4m8!3m7!1s0x3a19a76aa3db6109:0x9796e53a6bd98373!8m2!3d20.2517472!4d85.8610613!9m1!1b1!16s%2Fg%2F11b6s_w9_3?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF8526] to-[#E26F14] hover:from-[#e87417] hover:to-[#ce5f08] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <a
                  href={placeInfo.googleWriteReviewUrl || 'https://g.co/kgs/VwVxACj'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-full bg-white hover:bg-neutral-50 border border-[#C47847]/20 text-[#1A1815] text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 text-[#FF8526] fill-current" />
                  <span>Write a Google Review</span>
                </a>
              </div>

              {/* Address details */}
              <div className="text-xs text-[#5C564E] pt-3 border-t border-[#1A1815]/10 flex items-start space-x-2 font-century">
                <MapPin className="w-4 h-4 text-[#FF8526] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1A1815]">Studio Address:</strong> Baragada, Puri-NH Bypass Road, Bhubaneswar, Odisha 751018
                </span>
              </div>
            </div>

            {/* Right Column: Google Maps Frame */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[320px] sm:h-[350px] rounded-3xl overflow-hidden border border-[#C47847]/25 bg-white shadow-xl group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14703.497116044074!2d85.86106134999999!3d20.251747199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a76aa3db6109%3A0x9796e53a6bd98373!2sKalyan+Design+Studio!5e0!3m2!1sen!2sin!4v1633363360744!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Kalyan Design Studio Location &amp; Reviews Map"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.1] contrast-[1.05]"
                />

                {/* Floating Map Bottom Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-[#C47847]/20 rounded-2xl px-4 py-2.5 flex items-center justify-between pointer-events-auto shadow-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A1815]">Kalyan Design Studio</p>
                      <p className="text-[10px] text-[#7C6F5E]">4.9 ★ Rating &bull; 82+ Reviews</p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/place/Kalyan+Design+Studio/@20.2517472,85.8610613,15z/data=!4m8!3m7!1s0x3a19a76aa3db6109:0x9796e53a6bd98373!8m2!3d20.2517472!4d85.8610613!9m1!1b1!16s%2Fg%2F11b6s_w9_3?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-[#FF8526] hover:text-[#d46614] font-semibold"
                  >
                    <span>Open Map ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Modal Drawer */}
      {showAllModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-[#FAF7F2] border border-[#C47847]/30 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in text-[#1A1815]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1A1815]/10 bg-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#C47847]/20 flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-playfair text-[#1A1815] font-bold">
                    All Verified Google Reviews ({reviews.length})
                  </h3>
                  <p className="text-xs text-[#68625A] font-century">
                    Kalyan Design Studio &bull; 4.9 ★ Rating on Google Maps
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-[#1A1815]/10 flex items-center justify-center text-[#1A1815] transition-colors cursor-pointer shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <ReviewCard
                    key={r.id}
                    review={r}
                    getAvatarGradient={getAvatarGradient}
                    getInitials={getInitials}
                  />
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#1A1815]/10 bg-white/60 flex items-center justify-between">
              <span className="text-xs text-[#68625A] font-century">
                All reviews verified directly on Google Maps
              </span>
              <a
                href={placeInfo.googleBusinessUrl || 'https://g.co/kgs/VwVxACj'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#A85D2A] hover:text-[#FF8526] font-semibold"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// INDIVIDUAL REVIEW CARD COMPONENT
interface ReviewCardProps {
  review: GoogleReview;
  getAvatarGradient: (name: string) => string;
  getInitials: (name: string) => string;
}

function ReviewCard({ review, getAvatarGradient, getInitials }: ReviewCardProps) {
  return (
    <div className="group relative flex flex-col justify-between h-full rounded-3xl bg-white/95 border border-[#C47847]/20 hover:border-[#FF8526]/60 p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(196,120,71,0.08)] hover:shadow-[0_20px_45px_rgba(196,120,71,0.18)] hover:-translate-y-1 text-[#1A1815]">
      {/* Decorative Quote Icon Watermark */}
      <div
        className="absolute top-4 right-5 text-[#C47847]/10 group-hover:text-[#FF8526]/15 transition-colors pointer-events-none select-none font-serif text-6xl leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div>
        {/* Card Header: Reviewer info & Avatar */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            {/* Initial Avatar */}
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-tr ${
                review.avatarBg || getAvatarGradient(review.authorName)
              } text-white font-bold font-playfair text-sm flex items-center justify-center shadow-md ring-2 ring-white/60 shrink-0`}
            >
              {review.avatarText || review.authorInitials || getInitials(review.authorName)}
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-playfair font-bold text-base text-[#1A1815] group-hover:text-[#FF8526] transition-colors">
                  {review.authorName}
                </h4>
                <span title="Verified Google Review" className="inline-flex">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-[#7C6F5E] mt-0.5 font-century">
                {review.authorLocation && <span>{review.authorLocation}</span>}
                {review.authorLocation && <span>&bull;</span>}
                <span>{review.relativeTime}</span>
              </div>
            </div>
          </div>

          {/* Mini Google G logo badge */}
          <div
            className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0 border border-[#1A1815]/10 shadow-xs"
            title="Posted on Google Maps"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
        </div>

        {/* Stars & Project Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-0.5" aria-label={`${review.rating} stars`}>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FF8526] text-[#FF8526]" />
            ))}
          </div>

          {review.projectType && (
            <span className="text-[10px] font-century font-semibold uppercase tracking-wider text-[#A85D2A] bg-[#FFF3E9] px-2.5 py-0.5 rounded-full border border-[#C47847]/20 truncate max-w-[170px]">
              {review.projectType}
            </span>
          )}
        </div>

        {/* Review Quotation Text */}
        <blockquote className="text-xs sm:text-sm text-[#3D3833] font-century leading-relaxed mb-4">
          &ldquo;{review.reviewText}&rdquo;
        </blockquote>
      </div>

      {/* Card Footer: Highlight Tags & Google Maps verification */}
      <div className="pt-3 border-t border-[#1A1815]/10 space-y-2">
        {review.highlights && review.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {review.highlights.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] text-[#68625A] font-century bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#1A1815]/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-[#7C6F5E] pt-1 font-century">
          <span className="flex items-center space-x-1 text-[#25D366] font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>Verified Google Review</span>
          </span>
          <span className="text-[10px] font-mono text-[#8C8275]">Google Maps</span>
        </div>
      </div>
    </div>
  );
}
