import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Completely decouple Firebase from initial navigation & LCP render.
// Loads 10 seconds after window load or on first user interaction.
if (typeof window !== 'undefined') {
  let loaded = false;
  const loadFirebase = () => {
    if (loaded) return;
    loaded = true;
    import('./lib/firebase').then((m) => m.initFirebase?.());
  };

  window.addEventListener('load', () => {
    setTimeout(loadFirebase, 10000);
  });

  ['pointerdown', 'scroll', 'keydown', 'touchstart'].forEach((event) => {
    window.addEventListener(event, loadFirebase, { once: true, passive: true });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
