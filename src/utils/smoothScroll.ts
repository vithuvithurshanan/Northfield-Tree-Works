// Eased, header-aware smooth scrolling.
// Feels noticeably smoother than native `scroll-behavior: smooth` because it
// uses a longer, gentler easing curve and offsets the fixed navbar so section
// headings never land hidden underneath it.

// Approximate height of the fixed top header (see Navbar). Kept a touch larger
// than the collapsed bar so headings get a little breathing room.
const HEADER_OFFSET = 88;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// easeInOutCubic — slow start, quick middle, gentle stop.
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeScroll: number | null = null;

/**
 * Smoothly scroll to an element (by CSS selector or element), landing just
 * below the fixed header. Cancels any in-flight scroll first so rapid clicks
 * never fight each other.
 */
export function smoothScrollTo(target: string | Element | null, offset = HEADER_OFFSET): void {
  if (typeof window === 'undefined') return;

  const el =
    typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const destination = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - offset
  );

  // Respect users who ask for reduced motion — jump instantly.
  if (prefersReducedMotion()) {
    window.scrollTo(0, destination);
    return;
  }

  if (activeScroll !== null) cancelAnimationFrame(activeScroll);

  const start = window.scrollY;
  const distance = destination - start;
  if (Math.abs(distance) < 2) return;

  // Duration scales with distance so short hops stay snappy and long jumps
  // don't feel sluggish — clamped to a comfortable 450–900ms window.
  const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.5));
  let startTime: number | null = null;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      activeScroll = requestAnimationFrame(step);
    } else {
      activeScroll = null;
    }
  };

  activeScroll = requestAnimationFrame(step);
}
