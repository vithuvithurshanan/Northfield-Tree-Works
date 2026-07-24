import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeMode } from './types';
import { getCache, setCache, THEME_CACHE_KEY } from './utils/cache';
import { NatureBackgroundCanvas } from './components/NatureBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Lazy-load all below-fold components to reduce initial JS bundle parse time
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const BeforeAfterShowcase = lazy(() => import('./components/BeforeAfterShowcase').then(m => ({ default: m.BeforeAfterShowcase })));
const ParallaxTreeCut = lazy(() => import('./components/ParallaxTreeCut').then(m => ({ default: m.ParallaxTreeCut })));
const QuoteCalculator = lazy(() => import('./components/QuoteCalculator').then(m => ({ default: m.QuoteCalculator })));
const ReviewsSection = lazy(() => import('./components/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const GlassContactForm = lazy(() => import('./components/GlassContactForm').then(m => ({ default: m.GlassContactForm })));
const TreeHealthDiagnosis = lazy(() => import('./components/TreeHealthDiagnosis').then(m => ({ default: m.TreeHealthDiagnosis })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return getCache<ThemeMode>(THEME_CACHE_KEY, 'dark');
  });

  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle dark mode class on HTML document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setCache(THEME_CACHE_KEY, theme);
  }, [theme]);

  // Scroll active section observer
  useEffect(() => {
    const sections = ['hero', 'services', 'gallery', 'about', 'contact'];
    let ticking = false;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectServiceForQuote = (_serviceTitle: string) => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#064E3B] text-slate-100 transition-colors duration-500 relative font-sans selection:bg-[#A3E635] selection:text-[#064E3B] overflow-x-hidden">
      {/* Mesh Background Overlay */}
      <div className="mesh-bg pointer-events-none fixed inset-0 z-0" />

      {/* Animated Nature Canvas with Leaves & Wind Particles */}
      <NatureBackgroundCanvas isDarkMode={theme === 'dark'} />

      {/* Sticky Glassmorphism Navigation Header */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      {/* Main Sections — below-fold components are lazy-loaded */}
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<div />}>
          <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />
          <BeforeAfterShowcase />
          <ParallaxTreeCut />
          <QuoteCalculator />
          <ReviewsSection />
          <TreeHealthDiagnosis />
          <AboutSection />
          <GlassContactForm />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
