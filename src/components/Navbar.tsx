import React, { useState, useEffect, useRef } from 'react';
import { Trees, Phone, Sun, Moon, Menu, X, Home, Image, Scissors, Info, Sparkles, ChevronRight } from 'lucide-react';
import { ThemeMode } from '../types';
import logoIcon from '../assets/images/logo-icon.webp';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeSection: string;
}

type NavStyle = 'curved' | 'dock' | 'radial';

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpenMobile, setIsNavOpenMobile] = useState(false);
  const [navStyle, setNavStyle] = useState<NavStyle>('curved');
  const [isRadialExpanded, setIsRadialExpanded] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isCollapsedOnScroll, setIsCollapsedOnScroll] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Smart auto-collapse on fast scroll down, reveal on scroll up
      if (currentScrollY > lastScrollYRef.current + 12 && currentScrollY > 180) {
        setIsCollapsedOnScroll(true);
      } else if (currentScrollY < lastScrollYRef.current - 12) {
        setIsCollapsedOnScroll(false);
      }
      lastScrollYRef.current = currentScrollY;

      // Dynamic continuous rotation physics based on scroll depth
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(currentScrollY / totalHeight, 0), 1);
        // Map scroll progress (0 to 1) to rotate the arc wheel links smoothly from +60 deg down to -60 deg
        const rotationDegrees = 60 - progress * 120;
        setWheelRotation(rotationDegrees);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'home',
      href: '#hero',
      icon: Home,
      angle: -60,
      eyebrow: 'TREE CARE EXCELLENCE',
      title: 'Northfield Tree Works',
      desc: 'Precision arboriculture, hazard tree inspection & deep root health maintenance.',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=70',
    },
    {
      name: 'service',
      href: '#services',
      icon: Scissors,
      angle: -30,
      eyebrow: 'ARBORIST SERVICES',
      title: 'Professional Tree Care',
      desc: 'Precision pruning, tree removal, stump grinding & emergency response.',
      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=300&q=70',
    },
    {
      name: 'gallery',
      href: '#gallery',
      icon: Image,
      angle: 0,
      eyebrow: 'PROJECT SHOWCASE',
      title: 'Yard Restoration Gallery',
      desc: 'Explore before & after photos of completed arborist & tree care jobs.',
      img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&q=70',
    },
    {
      name: 'about',
      href: '#about',
      icon: Info,
      angle: 30,
      eyebrow: 'LICENSED PROFESSIONALS',
      title: '15+ Years Experience',
      desc: 'Certified arborists committed to zero-damage guarantee & safety.',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=300&q=70',
    },
    {
      name: 'contact',
      href: '#contact',
      icon: Phone,
      angle: 60,
      eyebrow: '24/7 EMERGENCY',
      title: 'Immediate Tree Hotline',
      desc: 'Get fast 24/7 storm damage response & free instant service estimates.',
      img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=300&q=70',
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsNavOpenMobile(false);
    setIsRadialExpanded(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find active link index for dock slider position
  const activeIndex = navLinks.findIndex((link) => {
    const sectionId = link.href.replace('#', '');
    return activeSection === sectionId || (sectionId === 'hero' && activeSection === '');
  });

  return (
    <>
      {/* Top Header Bar for Brand Logo, Nav Style Switcher & Quick Actions */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-2.5 shadow-2xl border-b border-white/10'
            : 'bg-[#064E3B]/80 backdrop-blur-md py-3.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group focus:outline-none rounded-xl shrink-0"
            id="nav-logo"
          >
            <img
              src={logoIcon}
              alt="Northfield Tree Works"
              className="h-11 sm:h-12 w-auto drop-shadow-lg group-hover:scale-105 transition-transform"
              width="48"
              height="48"
              loading="eager"
              decoding="async"
            />
            <span className="hidden sm:block text-[10px] font-bold tracking-widest text-[#A3E635] uppercase">
              Northfield Tree Service
            </span>
          </a>


          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="tel:7164123623"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-[#A3E635] hover:bg-white/15 border border-[#A3E635]/30 transition-all text-xs font-bold shadow-md"
              title="24/7 Emergency Tree Hotline"
              id="nav-call-btn"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A3E635]"></span>
              </span>
              <Phone className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>(716) 412-3623</span>
            </a>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl glass text-white hover:bg-white/15 transition-all cursor-pointer border border-white/15"
              aria-label="Toggle Dark / Light Mode"
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-[#A3E635]" />
              ) : (
                <Moon className="w-5 h-5 text-gray-200" />
              )}
            </button>

            {/* Mobile Navigation Drawer Toggle */}
            <button
              onClick={() => setIsNavOpenMobile(!isNavOpenMobile)}
              className="lg:hidden p-2.5 rounded-xl bg-[#A3E635] text-[#064E3B] font-bold shadow-lg cursor-pointer"
              aria-label="Toggle Mobile Navigation"
              id="mobile-arc-menu-btn"
            >
              {isNavOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- STYLE 1: INTERACTIVE ROTATING WHEEL (Left Side-Arc) - Desktop --- */}
      {navStyle === 'curved' && (
        <aside
          className={`hidden lg:block fixed left-0 top-[calc(50%+40px)] -translate-y-1/2 z-30 transition-all duration-500 ease-out group ${
            isNavOpenMobile
              ? 'translate-x-0 pointer-events-auto'
              : isCollapsedOnScroll
              ? '-translate-x-[78%] hover:translate-x-0 pointer-events-auto'
              : 'translate-x-0 pointer-events-auto'
          }`}
          id="curved-semi-circle-navbar"
        >
          <div className="relative w-[320px] sm:w-[380px] h-[540px] sm:h-[600px] flex items-center">
            {/* Peek Handle Indicator when Collapsed on Scroll */}
            {isCollapsedOnScroll && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-[#A3E635] text-[#064E3B] px-1 py-3 rounded-r-lg font-bold text-[9px] uppercase tracking-tighter flex flex-col items-center gap-1 shadow-lg animate-pulse cursor-pointer group-hover:opacity-0 transition-opacity z-30">
                <ChevronRight className="w-3.5 h-3.5 animate-bounce" />
                <span className="[writing-mode:vertical-lr] text-[8px]">NAV</span>
              </div>
            )}

            {/* Silver Arc Curve SVG (No Background Fill) */}
            <svg
              viewBox="0 0 200 550"
              className="absolute left-0 top-0 w-full h-full pointer-events-none filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
            >
              <defs>
                <linearGradient id="silverArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#E2E8F0" />
                  <stop offset="65%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>

              {/* Thin Silver Arc Line directly flush with screen left */}
              <path
                d="M 0,12 A 265,265 0 0,1 0,540"
                fill="none"
                stroke="url(#silverArcGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Navigation Items positioned directly on the Arc Line */}
            <nav className="relative z-10 w-full h-full flex flex-col justify-center pointer-events-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');

                const effectiveAngle = link.angle + wheelRotation;
                const radius = 248; // Radius matching SVG arc curve
                const radAngle = (effectiveAngle * Math.PI) / 180;
                const xPos = radius * Math.cos(radAngle);
                const yPos = radius * Math.sin(radAngle);

                return (
                  <div
                    key={link.name}
                    className="absolute left-0 flex items-center transition-all duration-300 pointer-events-auto"
                    style={{
                      transform: `translate(${xPos}px, ${yPos}px) translateY(-50%)`,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center gap-2.5 group/item cursor-pointer focus:outline-none"
                      id={`curved-nav-item-${link.name}`}
                    >
                      {/* Circular Badge Sitting Directly On Arc Line */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${
                          isActive
                            ? 'bg-[#064E3B] text-[#A3E635] border-[#A3E635] shadow-[0_0_20px_rgba(163,230,53,0.5)] scale-110 ring-2 ring-white/80'
                            : 'bg-black/80 backdrop-blur-md text-gray-300 border-white/20 group-hover/item:border-[#A3E635] group-hover/item:text-[#A3E635] group-hover/item:scale-105 shadow-md'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Inactive State: Clean, compact label pill (No overlap) */}
                      {!isActive && (
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-bold text-gray-200 border border-white/20 capitalize shadow-sm group-hover/item:text-[#A3E635] group-hover/item:border-[#A3E635]/60 group-hover/item:scale-105 transition-all whitespace-nowrap">
                          {link.name}
                        </span>
                      )}

                      {/* Active State: Rich Floating Preview Card (Exact layout as uploaded reference image) */}
                      {isActive && (
                        <div className="rounded-2xl bg-black/85 backdrop-blur-xl border border-white/25 p-3 sm:p-3.5 w-[230px] sm:w-[270px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left ring-1 ring-[#A3E635]/40 animate-in fade-in zoom-in-95 duration-200">
                          <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#A3E635] block mb-0.5">
                            {link.eyebrow}
                          </span>
                          <h4 className="text-xs sm:text-sm font-extrabold text-white mb-1 leading-tight flex items-center gap-1.5">
                            <span>{link.title}</span>
                            <Sparkles className="w-3 h-3 text-[#A3E635] shrink-0 animate-pulse" />
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-gray-300 mb-2 leading-snug">
                            {link.desc}
                          </p>
                          <div className="w-full h-16 sm:h-20 rounded-xl overflow-hidden border border-white/15 relative">
                            <img
                              src={link.img}
                              alt={link.title}
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                              width="300"
                              height="80"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </div>
                        </div>
                      )}
                    </a>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      {/* --- STYLE 2: FLOATING GLASS PILL DOCK (macOS Style Bottom Dock) --- */}
      {navStyle === 'dock' && (
        <aside
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 animate-in slide-in-from-bottom-8"
          id="floating-glass-dock"
        >
          <div className="glass backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-1 sm:gap-2 relative bg-[#064E3B]/80">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative z-10 flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wider capitalize transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? 'bg-[#A3E635] text-[#064E3B] shadow-xl shadow-[#A3E635]/40 scale-105'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#064E3B]' : 'text-[#A3E635]'}`} />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </aside>
      )}

      {/* --- STYLE 3: RADIAL LEAF FLOATING ACTION MENU (Expandable Bottom-Right Arc) --- */}
      {navStyle === 'radial' && (
        <aside className="fixed bottom-6 right-6 z-50" id="radial-leaf-menu">
          {/* Expanded Fan Buttons */}
          <div className="relative">
            {isRadialExpanded && (
              <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end mb-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass font-extrabold text-xs sm:text-sm tracking-wider capitalize shadow-2xl transition-all hover:scale-105 cursor-pointer border ${
                        isActive
                          ? 'bg-[#A3E635] text-[#064E3B] border-[#A3E635]'
                          : 'text-white border-white/20 hover:border-[#A3E635]/60'
                      }`}
                    >
                      <span>{link.name}</span>
                      <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[#064E3B] text-[#A3E635]' : 'bg-[#A3E635]/20 text-[#A3E635]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Trigger Button */}
            <button
              onClick={() => setIsRadialExpanded(!isRadialExpanded)}
              className="w-14 h-14 rounded-full bg-[#A3E635] text-[#064E3B] flex items-center justify-center shadow-2xl shadow-[#A3E635]/50 hover:scale-110 transition-all cursor-pointer font-extrabold border-2 border-white/40"
              aria-label="Expand Radial Navigation"
            >
              {isRadialExpanded ? (
                <X className="w-7 h-7" />
              ) : (
                <Trees className="w-7 h-7 animate-bounce" />
              )}
            </button>
          </div>
        </aside>
      )}

      {/* Mobile Drawer Menu (When user clicks mobile toggle) */}
      {isNavOpenMobile && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-[#064E3B]/95 backdrop-blur-2xl border-b border-white/15 p-6 z-50 space-y-4 shadow-2xl animate-in slide-in-from-top-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#A3E635] mb-2">
            Select Navigation
          </div>
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-extrabold text-sm capitalize transition-all ${
                    isActive
                      ? 'bg-[#A3E635] text-[#064E3B] shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#A3E635]" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10">
            <span className="text-xs text-gray-300 block mb-2">Switch Nav Style:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setNavStyle('curved'); setIsNavOpenMobile(false); }}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${navStyle === 'curved' ? 'bg-[#A3E635] text-[#064E3B]' : 'glass text-white'}`}
              >
                Curved Dial
              </button>
              <button
                onClick={() => { setNavStyle('dock'); setIsNavOpenMobile(false); }}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${navStyle === 'dock' ? 'bg-[#A3E635] text-[#064E3B]' : 'glass text-white'}`}
              >
                Glass Dock
              </button>
              <button
                onClick={() => { setNavStyle('radial'); setIsNavOpenMobile(false); }}
                className={`py-2 px-2 rounded-xl text-xs font-bold border ${navStyle === 'radial' ? 'bg-[#A3E635] text-[#064E3B]' : 'glass text-white'}`}
              >
                Radial Leaf
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Mobile Bottom Semi-Circle Navigation Arc (Wider and Flatter Height) */}
      <nav
        className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[400px] h-[88px] sm:h-[96px] pointer-events-none flex justify-center items-end pb-0.5"
        id="mobile-bottom-nav-bar"
      >
        {/* Semi-Circle SVG Arc Dome Background */}
        <svg
          viewBox="0 0 400 95"
          className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_-8px_20px_rgba(0,0,0,0.6)]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mobileSilverArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="30%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#A3E635" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="mobileBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 78, 59, 0.96)" />
              <stop offset="100%" stopColor="rgba(2, 44, 34, 0.98)" />
            </linearGradient>
          </defs>

          {/* Wide & Short Semi-Circle Arc Dome */}
          <path
            d="M 10,95 A 190,75 0 0,1 390,95 Z"
            fill="url(#mobileBgGradient)"
            stroke="url(#mobileSilverArcGradient)"
            strokeWidth="3"
            className="backdrop-blur-2xl"
          />

          {/* Inner Accent Dashed Arc */}
          <path
            d="M 30,95 A 170,58 0 0,1 370,95"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        </svg>

        {/* 5 Nav Items Placed Along the Wide Flatter Upward Arc */}
        <div className="relative w-full h-full z-10 pointer-events-none">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId || (sectionId === 'hero' && activeSection === '');

            // Angles along wide upward semi-circle (-152 deg to -28 deg)
            const mobileAngles = [-152, -121, -90, -59, -28];
            const angleDeg = mobileAngles[idx] ?? -90;
            const rx = 152; // Horizontal radius
            const ry = 52;  // Vertical radius (compact height)
            const radAngle = (angleDeg * Math.PI) / 180;
            
            // Center is (200, 95)
            const xPos = 200 + rx * Math.cos(radAngle);
            const yPos = 95 + ry * Math.sin(radAngle);

            const leftPct = (xPos / 400) * 100;
            const topPct = (yPos / 95) * 100;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="absolute flex flex-col items-center pointer-events-auto transition-all duration-300 group/mob"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                id={`mobile-bottom-item-${link.name}`}
              >
                {/* Circular Button Badge */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#A3E635] text-[#064E3B] border-white shadow-[0_0_15px_rgba(163,230,53,0.7)] scale-110 ring-2 ring-[#064E3B]'
                      : 'bg-black/70 backdrop-blur-md text-gray-300 border-white/25 group-hover/mob:border-[#A3E635] group-hover/mob:text-[#A3E635]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#064E3B]' : 'text-[#A3E635]'}`} />
                </div>

                {/* Compact Item Title */}
                <span
                  className={`text-[8px] sm:text-[9px] font-extrabold capitalize tracking-wider mt-0.5 px-1 py-0.2 rounded-full transition-colors whitespace-nowrap drop-shadow-md ${
                    isActive
                      ? 'text-[#A3E635] bg-black/60 font-black'
                      : 'text-gray-300 group-hover/mob:text-white'
                  }`}
                >
                  {link.name}
                </span>

                {isActive && (
                  <span className="absolute -top-1 w-2 h-2 rounded-full bg-[#A3E635] ring-2 ring-white animate-pulse" />
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isNavOpenMobile && (
        <div
          onClick={() => setIsNavOpenMobile(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
};


