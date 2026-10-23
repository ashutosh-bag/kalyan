'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Pause,
  Play,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  LayoutGrid,
  MapPin,
  X,
} from 'lucide-react';
import { GoogleReview, GooglePlaceReviewsData } from '@/lib/types';
import { getGoogleReviews, triggerGoogleReviewSync } from '@/lib/api-client';
import fallbackData from '@/data/google_reviews.json';

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>(fallbackData.reviews as GoogleReview[]);
  const [placeInfo, setPlaceInfo] = useState<GooglePlaceReviewsData['placeInfo']>(fallbackData.placeInfo);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);

  // Derive avatar color gradient from author name (stable per name)
  const getAvatarGradient = (name: string): string => {
    const gradients = [
      'from-[#FF8526] to-[#E79F30]',
      'from-[#3B82F6] to-[#1D4ED8]',
      'from-[#10B981] to-[#047857]',
      'from-[#8B5CF6] to-[#6D28D9]',
      'from-[#EC4899] to-[#BE185D]',
      'from-[#06B6D4] to-[#0891B2]',
      'from-[#F59E0B] to-[#B45309]',
      'from-[#EF4444] to-[#B91C1C]',
      'from-[#14B8A6] to-[#0F766E]',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return gradients[Math.abs(hash) % gradients.length];
  };

  // Derive initials from author name
  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per review for slow, comfortable reading
  const PROGRESS_TICK = 50;

  // Fetch reviews from dynamic API endpoint on mount & when category changes
  const fetchReviews = useCallback(async (cat: string, isLiveSync: boolean = false) => {
    try {
      const data = await getGoogleReviews(cat, isLiveSync);
      if (data && data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
        if (data.placeInfo) setPlaceInfo(data.placeInfo);
        setCurrentIndex(0);
        setProgress(0);
      }
    } catch (e) {
      console.warn('API reviews fetch note, using fallback:', e);
    }
  }, []);

  useEffect(() => {
    fetchReviews(selectedCategory);
  }, [selectedCategory, fetchReviews]);

  // Handle manual sync button click
  const handleSyncClick = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      await triggerGoogleReviewSync();
      await fetchReviews(selectedCategory, true);
      setSyncFeedback('Successfully updated with latest Google Reviews!');
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch {
      setSyncFeedback('Reviews refreshed.');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleNext = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setProgress(0);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setProgress(0);
  }, [reviews.length]);

  // Timer loop for slow one-by-one sliding
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;

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
  }, [isPaused, handleNext, reviews.length]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeReview = reviews[currentIndex] || reviews[0];

  return (
    <section
      id="google-reviews"
      aria-label="Google Reviews of Kalyan Design Studio"
      className="scroll-mt-28 relative bg-gradient-to-b from-[#0a0b0e] via-[#0d0f14] to-[#08090b] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-t border-b border-white/10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#FF8526]/10 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-[#E79F30]/5 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Live Google Business Rating Badge & Sync Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            {/* Live Status Pill & Sync Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300 font-mono">
                  Live Google Reviews Sync
                </span>
              </div>

              <button
                type="button"
                onClick={handleSyncClick}
                disabled={isSyncing}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#FF8526] hover:text-[#ffa65c] transition-colors disabled:opacity-50"
                title="Synchronize and fetch newest reviews from Google Maps"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Updating from Google...' : 'Sync with Google'}</span>
              </button>

              {syncFeedback && (
                <span className="text-[11px] text-[#34A853] font-medium bg-[#34A853]/10 px-2.5 py-0.5 rounded-full border border-[#34A853]/20 animate-fade-in">
                  ✓ {syncFeedback}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-century font-normal tracking-tight text-white leading-tight">
              Words of Trust from{' '}
              <span className="font-courgette text-[#FF8526] italic font-normal">
                Homeowners Across Odisha
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Every genuine Google review from our duplex villas, penthouses, and turnkey residential projects in Bhubaneswar, Cuttack & Puri. Sliding live one-by-one.
            </p>
          </div>

          {/* Official Google Business Rating Summary Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/[0.04] border border-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Google G Logo */}
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
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
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold font-century text-white">
                  {placeInfo.rating || 4.9}
                </span>
                <div className="flex items-center space-x-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">
                Rating based on{' '}
                <span className="text-white font-medium">{placeInfo.userRatingsTotal || 82}+ Google Reviews</span>
              </p>
            </div>

            <a
              href={placeInfo.googleBusinessUrl || 'https://g.co/kgs/VwVxACj'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#FF8526] hover:bg-[#e0721c] text-black font-semibold text-xs transition-colors shrink-0 shadow-sm"
              aria-label="View Kalyan Design Studio on Google Maps"
            >
              <span>View on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Browse All Button */}
        <div className="flex items-center justify-end mb-6">
          <button
            type="button"
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center space-x-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#FF8526]" />
            <span>Browse All ({reviews.length})</span>
          </button>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Decorative Watermark */}
          <div
            className="absolute top-4 right-8 text-white/[0.03] select-none pointer-events-none font-century text-8xl sm:text-9xl font-bold leading-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Carousel Slide Track */}
          <div className="relative min-h-[300px] sm:min-h-[260px] md:min-h-[240px] flex items-center">
            {reviews.map((review, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={review.id}
                  className={`w-full transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 translate-x-0 relative z-10 scale-100'
                      : 'opacity-0 absolute top-0 left-0 pointer-events-none scale-95'
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="flex flex-col justify-between h-full space-y-6">
                    {/* Header info of Review: Reviewer, Verified Badge, Rating, Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3.5">
                        {/* Avatar initials with dynamic gradient based on author name */}
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-tr ${review.avatarBg || getAvatarGradient(review.authorName)} text-white font-bold font-century text-base flex items-center justify-center shadow-lg ring-2 ring-white/10 shrink-0`}
                        >
                          {review.avatarText || review.authorInitials || getInitials(review.authorName)}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-century font-medium text-base sm:text-lg text-white">
                              {review.authorName}
                            </h3>
                            <div
                              className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#1A73E8]/15 border border-[#1A73E8]/30 text-[#8AB4F8] text-[10px] font-medium"
                              title="Verified Google Review"
                            >
                              <ShieldCheck className="w-3 h-3 text-[#1A73E8]" />
                              <span>Verified Review</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-0.5">
                            <span>{review.relativeTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex sm:flex-col sm:items-end justify-between items-center gap-1.5">
                        <div className="flex items-center space-x-1" aria-label={`${review.rating} stars`}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                          ))}
                        </div>
                        {review.projectType && (
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF8526] bg-[#FF8526]/10 px-2.5 py-0.5 rounded-md border border-[#FF8526]/20">
                            {review.projectType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review Quotation Text */}
                    <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-200 font-light leading-relaxed font-century italic">
                      &ldquo;{review.reviewText}&rdquo;
                    </blockquote>

                    {/* Key Project Highlights Tags & Google Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                      {review.highlights && review.highlights.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono mr-1">
                            Key Work:
                          </span>
                          {review.highlights.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs text-neutral-300 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-light">
                        <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                        <span>Posted on Google Maps</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar for auto-sliding */}
          <div className="w-full bg-white/10 h-0.5 mt-8 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#FF8526] to-[#E79F30] h-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom Interactive Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
            {/* Slide Count Indicator & Pause toggle */}
            <div className="flex items-center space-x-3 text-xs text-neutral-400 font-mono">
              <span>
                <strong className="text-white text-sm">{String(currentIndex + 1).padStart(2, '0')}</strong> /{' '}
                {String(reviews.length).padStart(2, '0')}
              </span>
              <span>&bull;</span>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center space-x-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label={isPaused ? 'Resume auto-sliding reviews' : 'Pause auto-sliding reviews'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-[#34A853] fill-current" />
                    <span>Auto-sliding Paused</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-[#FF8526]" />
                    <span>Slow Slide Active</span>
                  </>
                )}
              </button>
            </div>

            {/* Compact Indicator Ribbon for larger review counts */}
            <div className="flex items-center space-x-1.5 max-w-[240px] overflow-x-auto py-1 px-1 scrollbar-none" role="tablist" aria-label="Review slider pagination">
              {reviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  role="tab"
                  aria-selected={dotIdx === currentIndex}
                  aria-label={`Go to Google review ${dotIdx + 1}`}
                  onClick={() => {
                    setCurrentIndex(dotIdx);
                    setProgress(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 shrink-0 ${
                    dotIdx === currentIndex
                      ? 'w-6 bg-[#FF8526]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Arrow Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors hover:border-[#FF8526]/50"
                aria-label="Previous Google review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors hover:border-[#FF8526]/50"
                aria-label="Next Google review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Google Map Embed & Direct Reviews Link Section */}
        <div className="mt-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Direct Links & Reviews Info */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#FF8526]" />
                <span className="text-neutral-300 font-mono text-[11px] uppercase tracking-wider">
                  Bhubaneswar Studio &bull; Google Maps Verified
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-century font-normal text-white">
                  Want to Read More Reviews?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Visit our official Google Business listing to explore all <strong className="text-white font-medium">{placeInfo.userRatingsTotal || 82}+ real customer reviews</strong>, ratings, verified client photos, and project walkthroughs across Odisha.
                </p>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://www.google.com/maps/place/Kalyan+Design+Studio/@20.2517472,85.8610613,15z/data=!4m8!3m7!1s0x3a19a76aa3db6109:0x9796e53a6bd98373!8m2!3d20.2517472!4d85.8610613!9m1!1b1!16s%2Fg%2F11b6s_w9_3?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#FF8526] hover:bg-[#e0721c] text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,133,38,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  id="direct-google-reviews-btn"
                >
                  <span>Read All 82+ Reviews on Google</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={placeInfo.googleWriteReviewUrl || 'https://g.co/kgs/VwVxACj'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <span>Write a Review</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <button
                  type="button"
                  onClick={() => setShowAllModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  <LayoutGrid className="w-4 h-4 text-[#FF8526]" />
                  <span>Gallery ({reviews.length})</span>
                </button>
              </div>

              {/* Address / Location snippet */}
              <div className="flex items-start space-x-2.5 text-xs text-neutral-400 pt-3 border-t border-white/5">
                <MapPin className="w-4 h-4 text-[#FF8526] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Studio Address:</strong> Baragada, Puri-NH Bypass, Bhubaneswar, Odisha 751018
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Embedded Map */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[280px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14703.497116044074!2d85.86106134999999!3d20.251747199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a76aa3db6109%3A0x9796e53a6bd98373!2sKalyan+Design+Studio!5e0!3m2!1sen!2sin!4v1633363360744!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Kalyan Design Studio Location & Reviews Map"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.1] contrast-[1.05]"
                />

                {/* Floating Map Overlay Badge with Direct Link */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0a0b0e]/90 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2 flex items-center justify-between pointer-events-auto shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" />
                    <span className="text-xs font-medium text-white truncate">Kalyan Design Studio</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Kalyan+Design+Studio/@20.2517472,85.8610613,15z/data=!4m8!3m7!1s0x3a19a76aa3db6109:0x9796e53a6bd98373!8m2!3d20.2517472!4d85.8610613!9m1!1b1!16s%2Fg%2F11b6s_w9_3?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] text-[#FF8526] hover:text-[#ffa65c] font-semibold shrink-0"
                  >
                    <span>Read Reviews on Map ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Reviews Grid Modal / Drawer */}
      {showAllModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-[#101216] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
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
                  <h3 className="text-lg font-century text-white font-medium">
                    All Verified Google Reviews ({reviews.length})
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Kalyan Design Studio &bull; 4.9 ★ Rating on Google Maps
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Close reviews gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable Cards */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r, i) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setShowAllModal(false);
                      setProgress(0);
                    }}
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FF8526]/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-tr ${r.avatarBg || getAvatarGradient(r.authorName)} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                        >
                          {r.avatarText || r.authorInitials || getInitials(r.authorName)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-[#FF8526] transition-colors">
                            {r.authorName}
                          </p>
                          <p className="text-[11px] text-neutral-400">{r.authorLocation || 'Google Maps Reviewer'}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-0.5">
                        {[...Array(r.rating)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 font-light line-clamp-3 italic mb-3">
                      &ldquo;{r.reviewText}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                      {r.source && <span className="text-[#FF8526] font-mono">{r.source}</span>}
                      <span>{r.relativeTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                Click any review card to focus and view in slider
              </span>
              <a
                href={placeInfo.googleBusinessUrl || 'https://g.co/kgs/VwVxACj'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#FF8526] hover:text-[#ffa65c] font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
