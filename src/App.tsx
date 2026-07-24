import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { ThemeMode } from './types';
import { getCache, setCache, THEME_CACHE_KEY } from './utils/cache';
import { NatureBackgroundCanvas } from './components/NatureBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Lazy-load below-fold components
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const BeforeAfterShowcase = lazy(() => import('./components/BeforeAfterShowcase').then(m => ({ default: m.BeforeAfterShowcase })));
const ParallaxTreeCut = lazy(() => import('./components/ParallaxTreeCut').then(m => ({ default: m.ParallaxTreeCut })));
const QuoteCalculator = lazy(() => import('./components/QuoteCalculator').then(m => ({ default: m.QuoteCalculator })));
const ReviewsSection = lazy(() => import('./components/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const GlassContactForm = lazy(() => import('./components/GlassContactForm').then(m => ({ default: m.GlassContactForm })));
const TreeHealthDiagnosis = lazy(() => import('./components/TreeHealthDiagnosis').then(m => ({ default: m.TreeHealthDiagnosis })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

// LazyViewport component: ONLY fetches & renders chunk when user scrolls within 350px of the section.
// Prevents flooding initial load with 15 parallel chunk downloads.
const LazyViewport: React.FC<{ children: React.ReactNode; minHeight?: string }> = ({
  children,
  minHeight = '200px',
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} style={{ minHeight: shouldLoad ? 'auto' : minHeight }}>
      {shouldLoad ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : null}
    </div>
  );
};

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

  // Zero-reflow active section observer using IntersectionObserver (off main thread)
  useEffect(() => {
    const sections = ['hero', 'services', 'gallery', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

      {/* Main Sections — each below-fold section loads strictly on viewport scroll approach */}
      <main className="relative z-10">
        <Hero />
        <LazyViewport minHeight="600px">
          <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />
        </LazyViewport>
        <LazyViewport minHeight="500px">
          <BeforeAfterShowcase />
        </LazyViewport>
        <LazyViewport minHeight="800px">
          <ParallaxTreeCut />
        </LazyViewport>
        <LazyViewport minHeight="400px">
          <QuoteCalculator />
        </LazyViewport>
        <LazyViewport minHeight="400px">
          <ReviewsSection />
        </LazyViewport>
        <LazyViewport minHeight="400px">
          <TreeHealthDiagnosis />
        </LazyViewport>
        <LazyViewport minHeight="500px">
          <AboutSection />
        </LazyViewport>
        <LazyViewport minHeight="500px">
          <GlassContactForm />
        </LazyViewport>
      </main>

      {/* Footer */}
      <LazyViewport minHeight="200px">
        <Footer />
      </LazyViewport>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
