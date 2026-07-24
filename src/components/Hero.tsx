import React from 'react';
import { Trees, ShieldCheck, Zap, Phone, Calculator, ArrowDownCircle, Award, Star } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import heroImg from '../assets/images/hero_tree_nature_1784729516064.webp';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Hero Background Backdrop with Parallax Layering */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Majestic Oak Tree Nature Background"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          width="1920"
          height="1080"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Soft gradient mask for text readability in light and dark modes */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90 dark:from-slate-950/85 dark:via-slate-950/75 dark:to-slate-950/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Floating Certification Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-xl animate-fade-in border border-white/20">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-[#A3E635]" />
            <span>ISA Certified Arborists &bull; 100% Fully Insured & Licensed</span>
            <span className="flex items-center gap-1 text-amber-300 ml-1">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>4.9 / 5</span>
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto drop-shadow-2xl">
          Precision{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#86efac]">
            Tree Cutting
          </span>{' '}
          & Safe Removal.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
          Elite arborist services utilizing advanced laser-guided techniques for safe, seamless tree management, hazardous branch trimming, and emergency storm clearance.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('#contact')}
            className="bg-[#A3E635] text-[#064E3B] px-8 py-4 rounded-xl font-extrabold text-base hover:scale-105 transition-all shadow-xl shadow-[#A3E635]/20 flex items-center gap-2.5 cursor-pointer"
            id="hero-contact-btn"
          >
            <ShieldCheck className="w-5 h-5 text-[#064E3B]" />
            <span>Request Free Estimate</span>
          </button>

          <button
            onClick={() => scrollToSection('#services')}
            className="glass text-white px-8 py-4 rounded-xl font-extrabold text-base hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
            id="hero-services-btn"
          >
            <Trees className="w-5 h-5 text-[#A3E635]" />
            <span>Explore Services</span>
          </button>

          <a
            href="tel:7164123623"
            className="glass text-red-300 border border-red-500/30 hover:bg-red-500/20 px-6 py-4 rounded-xl font-bold text-base hover:scale-105 transition-all flex items-center gap-2"
            id="hero-emergency-call"
          >
            <Zap className="w-5 h-5 text-[#A3E635] animate-bounce" />
            <span>24/7 Hotline</span>
          </a>
        </div>

        {/* Key Highlight Badges */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass p-5 rounded-2xl text-center border border-white/15 text-white shadow-lg">
            <p className="text-3xl font-extrabold text-[#A3E635]">15+ Yrs</p>
            <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">Licensed Experience</p>
          </div>
          <div className="glass p-5 rounded-2xl text-center border border-white/15 text-white shadow-lg">
            <p className="text-3xl font-extrabold text-[#86efac]">4,800+</p>
            <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">Trees Cut & Trimmed</p>
          </div>
          <div className="glass p-5 rounded-2xl text-center border border-white/15 text-white shadow-lg">
            <p className="text-3xl font-extrabold text-[#A3E635]">100%</p>
            <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">Zero-Damage Guarantee</p>
          </div>
          <div className="glass p-5 rounded-2xl text-center border border-white/15 text-white shadow-lg">
            <p className="text-3xl font-extrabold text-amber-300">&lt; 60 Min</p>
            <p className="text-xs text-gray-300 font-medium uppercase tracking-wider mt-1">Emergency Response</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => scrollToSection('#services')}
            className="flex flex-col items-center gap-1 text-gray-300 hover:text-[#A3E635] transition-colors text-xs font-medium cursor-pointer"
            aria-label="Scroll down"
          >
            <span>Scroll down to explore services</span>
            <ArrowDownCircle className="w-6 h-6 animate-bounce text-[#A3E635]" />
          </button>
        </div>
      </div>
    </section>
  );
};
