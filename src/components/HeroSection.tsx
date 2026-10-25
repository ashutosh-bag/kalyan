'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ArrowDown, Sparkles, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoDuration, setVideoDuration] = useState(10);
  const [activeStoryStage, setActiveStoryStage] = useState('Bare-Shell Luxury Penthouse');

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isAutoPlayingRef = useRef<boolean>(false);

  // Milestone story stages based on scroll
  const getStageTitle = (progress: number) => {
    if (progress < 0.18) return 'Phase 1: Bare-Shell Penthouse with Kalyan Embossed Wall';
    if (progress < 0.45) return 'Phase 2: Custom Ergonomic Sectional & Hardwood Table Arrival';
    if (progress < 0.72) return 'Phase 3: Designer Armchairs, Fluted Planters & Curated Art';
    return 'Phase 4: Warm Circadian Pendants & Turnkey Handover Ready';
  };

  // Determine active video element (desktop vs mobile)
  const getActiveVideo = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const isMobile = window.innerWidth < 768;
    return isMobile ? mobileVideoRef.current : desktopVideoRef.current;
  }, []);

  // Sync scroll position to video scrubbing with smooth 60fps Lerp
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoPlayingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress 0 to 1 through pinned section
      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      targetProgressRef.current = progress;
      setScrollProgress(progress);
      setActiveStoryStage(getStageTitle(progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp animation loop for video scrubbing (Apple-style buttery seek)
  useEffect(() => {
    const renderLoop = () => {
      const activeVideo = getActiveVideo();

      if (activeVideo && activeVideo.readyState >= 2 && !isAutoPlayingRef.current) {
        // Smooth lerp towards target scroll position
        const delta = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(delta) > 0.001) {
          currentProgressRef.current += delta * 0.14;
          const duration = activeVideo.duration || videoDuration;
          const newTime = Math.min(duration, Math.max(0, currentProgressRef.current * duration));

          // Only seek if difference is noticeable to avoid decode stutter
          if (Math.abs(activeVideo.currentTime - newTime) > 0.02) {
            activeVideo.currentTime = newTime;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [getActiveVideo, videoDuration]);

  // Video metadata loading
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && !isNaN(video.duration)) {
      setVideoDuration(video.duration);
    }
  };

  // Auto-play / manual pause toggle
  const togglePlay = () => {
    const activeVideo = getActiveVideo();
    if (!activeVideo) return;

    if (isPlaying) {
      activeVideo.pause();
      isAutoPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      isAutoPlayingRef.current = true;
      activeVideo.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // Reset to initial stage
  const handleReset = () => {
    const activeVideo = getActiveVideo();
    if (!activeVideo) return;
    targetProgressRef.current = 0;
    currentProgressRef.current = 0;
    activeVideo.currentTime = 0;
    setScrollProgress(0);
    setActiveStoryStage(getStageTitle(0));
    window.scrollTo({ top: containerRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  // Scroll down to complete furnishing
  const scrollToComplete = () => {
    if (!containerRef.current) return;
    const target = containerRef.current.offsetTop + (containerRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[280vh] bg-[#141210] select-none"
      aria-label="Kalyan Design Studio Turnkey Transformation Video"
    >
      {/* Pinned Sticky Viewport: Remains fixed on screen while user scrolls through the 280vh track */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-[#141210]">
        
        {/* Subtle Ambient Lighting Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-radial from-transparent via-transparent to-black/40" />

        {/* ========================================================================= */}
        {/* VIDEO DISPLAY CONTAINER: DESKTOP & MOBILE (CLEAN WATERMARK-FREE)          */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Desktop Video (16:9 Landscape - Watermark-Free) */}
          <video
            ref={desktopVideoRef}
            src="/images/kalyan/assets/hero_clean.mp4"
            playsInline
            muted={isMuted}
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden md:block w-full h-full object-cover object-center"
          />

          {/* Mobile Video (9:16 Portrait - Watermark-Free) */}
          <video
            ref={mobileVideoRef}
            src="/images/kalyan/assets/heromobile_clean.mp4"
            playsInline
            muted={isMuted}
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            className="block md:hidden w-full h-full object-cover object-center"
          />
        </div>

        {/* ========================================================================= */}
        {/* 1. TOP CITATION & STAGE BADGE (Clean header since navbar is hidden)       */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full pt-4 sm:pt-6 px-4 sm:px-8 flex flex-col items-center pointer-events-none text-center">
          
          {/* City Citation Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 shadow-lg text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-2 pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8526] animate-ping" />
            <span>Bhubaneswar &bull; Cuttack &bull; Puri &bull; Odisha</span>
          </div>

          {/* Live Progress Stage Notification */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#FF8526]/40 text-[#FF8526] text-xs sm:text-sm font-lato font-semibold shadow-xl transition-all duration-300 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
            <span className="truncate max-w-[85vw] sm:max-w-xl">{activeStoryStage}</span>
          </div>
        </div>

        {/* Center space is left completely OPEN & UNOBSTRUCTED to showcase 3D KALYAN embossed wall */}
        <div className="flex-1 pointer-events-none" />

        {/* ========================================================================= */}
        {/* 2. BOTTOM HUD: CONTROLS, PROGRESS METER & CALL-TO-ACTION                  */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full px-3 sm:px-6 md:px-8 pb-3 sm:pb-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/80 backdrop-blur-xl border border-white/15 p-3 sm:p-4 rounded-2xl shadow-2xl">
            
            {/* Left: Brand Identity & Live Percentage */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF8526] text-white flex items-center justify-center font-playfair font-bold text-lg shadow-md shrink-0">
                K
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-playfair font-bold text-white leading-tight">
                  Kalyan Design Studio &bull; <span className="text-[#FF8526]">Odisha</span>
                </h1>
                <p className="text-[11px] text-[#A8A196] font-lato">
                  Turnkey Penthouse Assembly &bull; <span className="font-semibold text-white">{Math.round(scrollProgress * 100)}% Complete</span>
                </p>
              </div>
            </div>

            {/* Center: Live Scroll Progress Bar & Scroll Cue */}
            <div className="w-full sm:w-64 md:w-80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                {scrollProgress < 0.95 ? (
                  <span className="flex items-center gap-1 text-[#FF8526] font-medium">
                    <ArrowDown className="w-3 h-3 animate-bounce" />
                    <span>Scroll down to furnish</span>
                  </span>
                ) : (
                  <span className="text-[#10B981] font-medium">Ready for Handover</span>
                )}
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E79F30] to-[#FF8526] rounded-full transition-all duration-75"
                  style={{ width: `${Math.max(4, Math.round(scrollProgress * 100))}%` }}
                />
              </div>
            </div>

            {/* Right: Controls & Packages CTA */}
            <div className="flex items-center gap-2">
              {/* Play/Pause Video Auto-Playback */}
              <button
                type="button"
                onClick={togglePlay}
                className={`p-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPlaying
                    ? 'bg-[#FF8526] text-white shadow-md'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
                title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Living Room Assembly'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="hidden md:inline text-xs">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              {/* Reset to Start */}
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                title="Reset to Bare Shell"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* View Turnkey Packages CTA */}
              <a
                href="#packages"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF8526] hover:bg-[#e87417] text-white font-lato font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap ml-1"
              >
                <span>View Packages</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
