import React, { useState, useEffect, useRef } from 'react';
import { PARALLAX_CUT_STAGES } from '../data/treeServicesData';
import { ParallaxCutStage } from '../types';
import {
  Scissors,
  ShieldCheck,
  Play,
  Pause,
  RefreshCw,
  Zap,
  Sparkles,
  CheckCircle2,
  Trees,
  Volume2,
  VolumeX,
  ArrowDown
} from 'lucide-react';

export const ParallaxTreeCut: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSawingActive, setIsSawingActive] = useState(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [woodChips, setWoodChips] = useState<{ id: number; x: number; y: number; r: number }[]>([]);

  // Web Audio Chainsaw Sound Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startChainsawSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate brown noise for engine roar
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // boost
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);

      // Low pass filter for engine thrum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseNodeRef.current = noise;
      gainNodeRef.current = gain;
    } catch (err) {
      console.warn('Audio synthesis note:', err);
    }
  };

  const stopChainsawSound = () => {
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      } catch (e) {}
      noiseNodeRef.current = null;
    }
  };

  // Scroll listener tracking container height with zero forced reflow
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance available for sticky scroll
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);

      setScrollProgress(progress);

      // Calculate stage index
      let stage = 0;
      if (progress < 0.25) stage = 0;
      else if (progress < 0.50) stage = 1;
      else if (progress < 0.75) stage = 2;
      else stage = 3;

      setActiveStageIndex(stage);

      // Trigger chainsaw particle FX if in cutting stage (stage 1 or 2) and scrolling actively
      if (progress > 0.2 && progress < 0.8) {
        setIsSawingActive(true);
        generateSparksAndChips();
      } else {
        setIsSawingActive(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Particle generators
  const generateSparksAndChips = () => {
    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random() + i,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 50,
      size: Math.random() * 4 + 2,
    }));
    const newChips = Array.from({ length: 6 }).map((_, i) => ({
      id: Math.random() + i,
      x: (Math.random() - 0.5) * 100,
      y: Math.random() * 60 + 20,
      r: Math.random() * 360,
    }));
    setSparks(newSparks);
    setWoodChips(newChips);
  };

  // Auto Play Simulation Effect
  useEffect(() => {
    let interval: any;
    if (isPlayingAuto) {
      startChainsawSound();
      interval = setInterval(() => {
        setScrollProgress((prev) => {
          const next = prev + 0.015;
          if (next >= 1) {
            setIsPlayingAuto(false);
            stopChainsawSound();
            return 1;
          }
          let stage = 0;
          if (next < 0.25) stage = 0;
          else if (next < 0.50) stage = 1;
          else if (next < 0.75) stage = 2;
          else stage = 3;
          setActiveStageIndex(stage);
          generateSparksAndChips();
          return next;
        });
      }, 50);
    } else {
      stopChainsawSound();
    }
    return () => {
      clearInterval(interval);
      stopChainsawSound();
    };
  }, [isPlayingAuto, soundEnabled]);

  const currentStage: ParallaxCutStage = PARALLAX_CUT_STAGES[activeStageIndex];

  // Helper to jump scroll to a stage position
  const jumpToStage = (idx: number) => {
    setActiveStageIndex(idx);
    const targetProgress = idx * 0.28 + 0.05;
    setScrollProgress(targetProgress);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height - windowHeight;
      const targetY = window.scrollY + rect.top + totalDist * targetProgress;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="parallax-cut"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#022c22] text-white select-none"
    >
      {/* Sticky Fullscreen Parallax Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* Parallax Landscape Background Layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Deep Forest Sky Image */}
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fm=webp&fit=crop&w=1600&q=65"
            alt="Forest Background"
            className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 transition-transform duration-300"
            style={{
              transform: `translateY(${-scrollProgress * 60}px) scale(1.08)`,
            }}
            loading="lazy"
            decoding="async"
            width="1600"
            height="900"
          />

          {/* Sunlight Rays Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-amber-400/10 via-emerald-900/40 to-[#022c22] transition-opacity duration-700"
            style={{ opacity: 0.6 + scrollProgress * 0.4 }}
          />

          {/* Ambient Floating Dust / Leaves */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Top Header Controls Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/15 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#A3E635] text-[#064E3B] font-black shadow-lg shadow-[#A3E635]/20">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#A3E635] uppercase tracking-wider">
                  Interactive Parallax Tree Cut
                </span>
                <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Scroll Down To Cut The Tree Step-by-Step
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sound Synthesizer Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'glass text-gray-300 border-white/10 hover:text-white'
              }`}
              title="Toggle Web-Audio Chainsaw Engine Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Chainsaw Sound ON' : 'Sound OFF'}</span>
            </button>

            {/* Auto Play Simulator Button */}
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="px-4 py-2.5 rounded-2xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] font-bold text-xs shadow-lg shadow-[#A3E635]/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlayingAuto ? 'Pause Simulation' : 'Auto Play Demo'}</span>
            </button>
          </div>
        </div>

        {/* Central Graphic Stage: The Interactive Tree Cutting Canvas */}
        <div className="relative z-10 my-auto max-w-6xl mx-auto w-full h-[52vh] sm:h-[58vh] flex items-center justify-center">
          {/* Main Visualizer Frame */}
          <div className="relative w-full h-full glass rounded-[36px] border border-white/20 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Ground & Soil Layer */}
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#021f18] via-emerald-950 to-emerald-900 border-t-2 border-[#A3E635]/40 z-10 flex items-center justify-between px-8">
              <span className="text-[11px] font-mono font-bold text-[#A3E635] uppercase tracking-widest">
                PROPERTY LAWN GRADE
              </span>
              <span className="text-[11px] font-mono text-gray-300">
                STAGE {activeStageIndex + 1} / 4: {currentStage.tagline}
              </span>
            </div>

            {/* --- SVG TREE GRAPHIC & DYNAMIC CUTTING ANIMATION --- */}
            <div className="relative w-full h-full flex items-center justify-center pb-12">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full max-h-[460px] overflow-visible select-none drop-shadow-2xl"
              >
                {/* 1. Root Anchor System */}
                <path
                  d="M 340 540 Q 370 510 390 480 Q 430 510 460 540"
                  fill="none"
                  stroke="#78350f"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* 2. Main Trunk Base (Always present) */}
                <rect
                  x="370"
                  y="400"
                  width="60"
                  height="100"
                  rx="6"
                  fill="url(#barkGradient)"
                  stroke="#451a03"
                  strokeWidth="3"
                />

                {/* 3. Mid Trunk Block (Disappears in Cleared Stage 4) */}
                {scrollProgress < 0.78 && (
                  <g
                    style={{
                      transform: `translateY(${scrollProgress > 0.5 ? (scrollProgress - 0.5) * 80 : 0}px)`,
                      opacity: scrollProgress > 0.72 ? 1 - (scrollProgress - 0.72) * 15 : 1,
                      transition: 'transform 0.1s linear, opacity 0.2s',
                    }}
                  >
                    <rect
                      x="375"
                      y="260"
                      width="50"
                      height="140"
                      rx="4"
                      fill="url(#barkGradient)"
                      stroke="#451a03"
                      strokeWidth="2"
                    />

                    {/* Chainsaw Cut Line & Wedge Notch (Active in Stage 3: 50% - 75%) */}
                    {scrollProgress >= 0.48 && scrollProgress < 0.78 && (
                      <g className="animate-pulse">
                        <polygon points="375,320 410,320 375,335" fill="#f59e0b" />
                        <line x1="370" y1="320" x2="430" y2="320" stroke="#facc15" strokeWidth="4" strokeDasharray="4 2" />
                        <text x="435" y="324" fill="#a3e635" fontSize="12" fontWeight="bold" fontFamily="monospace">
                          SAW CUT
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {/* 4. Upper Branches & Full Canopy (Scales, tilts, & drops on scroll) */}
                {scrollProgress < 0.82 && (
                  <g
                    style={{
                      transform: `translate(${scrollProgress * 40}px, ${scrollProgress * 90}px) rotate(${scrollProgress * 25}deg)`,
                      opacity: Math.max(0, 1 - scrollProgress * 1.15),
                      transformOrigin: '400px 260px',
                      transition: 'transform 0.15s linear, opacity 0.2s',
                    }}
                  >
                    {/* Left & Right Branch Arms */}
                    <path d="M 380 280 Q 320 220 280 180" fill="none" stroke="#78350f" strokeWidth="16" strokeLinecap="round" />
                    <path d="M 420 280 Q 480 220 520 180" fill="none" stroke="#78350f" strokeWidth="16" strokeLinecap="round" />

                    {/* Lush Green Canopy Layers */}
                    {/* Lower Left Cluster */}
                    <circle cx="280" cy="170" r="65" fill="url(#leafGradientDark)" stroke="#4ade80" strokeWidth="2" />
                    {/* Lower Right Cluster */}
                    <circle cx="520" cy="170" r="65" fill="url(#leafGradientDark)" stroke="#4ade80" strokeWidth="2" />
                    {/* Center Mid Cluster */}
                    <circle cx="400" cy="180" r="80" fill="url(#leafGradientMain)" stroke="#a3e635" strokeWidth="3" />
                    {/* Top Crown Peak */}
                    <circle cx="400" cy="100" r="70" fill="url(#leafGradientMain)" stroke="#a3e635" strokeWidth="3" />

                    {/* Leaves & Foliage Detailing */}
                    <Trees className="x-[370] y-[70] w-16 h-16 text-emerald-200/50" />
                  </g>
                )}

                {/* 5. Falling Severed Branch Animation (Appears during Stage 2: 25% - 50%) */}
                {scrollProgress >= 0.25 && scrollProgress < 0.58 && (
                  <g
                    style={{
                      transform: `translate(${ (scrollProgress - 0.25) * 220 }px, ${ (scrollProgress - 0.25) * 380 }px) rotate(${ (scrollProgress - 0.25) * 180 }deg)`,
                      opacity: 1 - (scrollProgress - 0.25) * 2.8,
                    }}
                  >
                    <path d="M 0 0 Q -30 -20 -60 -40" fill="none" stroke="#78350f" strokeWidth="12" />
                    <circle cx="-60" cy="-40" r="35" fill="url(#leafGradientMain)" />
                  </g>
                )}

                {/* 6. Clean Stump & Sapling Re-growth (Stage 4: 75% - 100%) */}
                {scrollProgress >= 0.75 && (
                  <g className="animate-in fade-in duration-500">
                    {/* Ground Stump */}
                    <ellipse cx="400" cy="405" rx="30" ry="10" fill="#d97706" stroke="#78350f" strokeWidth="3" />
                    {/* Growth Rings */}
                    <ellipse cx="400" cy="405" rx="20" ry="6" fill="none" stroke="#92400e" strokeWidth="1.5" />
                    <ellipse cx="400" cy="405" rx="10" ry="3" fill="none" stroke="#92400e" strokeWidth="1.5" />

                    {/* Fresh Sapling Growth Sprout */}
                    <path d="M 400 400 Q 405 370 410 350" fill="none" stroke="#a3e635" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="412" cy="348" r="8" fill="#a3e635" />
                    <text x="425" y="355" fill="#a3e635" fontSize="13" fontWeight="bold">
                      REGENERATED LAWN & SAPLING
                    </text>
                  </g>
                )}

                {/* Arborist Operator & Chainsaw Position */}
                {scrollProgress < 0.8 && (
                  <g
                    style={{
                      transform: `translate(${360 + Math.sin(scrollProgress * Math.PI) * 50}px, ${
                        180 + scrollProgress * 160
                      }px)`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <rect x="-35" y="-18" width="70" height="32" rx="12" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    <text x="-26" y="3" fill="#022c22" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                      ⚡ ARBORIST
                    </text>
                  </g>
                )}

                {/* SVG Color Gradients */}
                <defs>
                  <linearGradient id="barkGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#451a03" />
                    <stop offset="50%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#290f03" />
                  </linearGradient>

                  <radialGradient id="leafGradientMain" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="60%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#065f46" />
                  </radialGradient>

                  <radialGradient id="leafGradientDark" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="70%" stopColor="#047857" />
                    <stop offset="100%" stopColor="#022c22" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Chainsaw Sparks Floating Effect */}
              {isSawingActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {sparks.map((s) => (
                    <span
                      key={s.id}
                      className="absolute rounded-full bg-amber-300 animate-ping shadow-[0_0_12px_#f59e0b]"
                      style={{
                        width: `${s.size * 2}px`,
                        height: `${s.size * 2}px`,
                        transform: `translate(${s.x}px, ${s.y}px)`,
                      }}
                    />
                  ))}
                  {woodChips.map((c) => (
                    <span
                      key={c.id}
                      className="absolute w-2.5 h-1.5 bg-amber-700 rounded-sm animate-bounce"
                      style={{
                        transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg)`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom HUD Bar inside Graphic */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-300">Scroll Depth Progress:</span>
                <span className="font-mono font-extrabold text-[#A3E635] text-sm">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-300">Canopy Volume Remaining:</span>
                <div className="w-28 sm:w-36 h-2.5 bg-white/15 rounded-full overflow-hidden border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#A3E635] to-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.max(0, 100 - scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Step Bar & Stage Information */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-3 bg-black/50 backdrop-blur-md p-4 rounded-3xl border border-white/15 shadow-2xl">
          {PARALLAX_CUT_STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => jumpToStage(idx)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#A3E635] text-[#064E3B] font-bold border-[#A3E635] shadow-lg shadow-[#A3E635]/20 scale-[1.02]'
                    : 'glass text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
                }`}
                id={`parallax-step-btn-${idx}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase ${isActive ? 'text-[#064E3B]' : 'text-[#A3E635]'}`}>
                    STEP 0{stage.id}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />}
                </div>
                <p className="text-xs font-extrabold truncate mt-1">{stage.tagline}</p>
                <p className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? 'text-[#064E3B]/80' : 'text-gray-300'}`}>
                  {stage.arboristNote}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
