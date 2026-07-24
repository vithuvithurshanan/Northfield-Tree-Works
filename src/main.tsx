import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Lazy-load Firebase off the critical path after initial page interactive state
if (typeof window !== 'undefined') {
  const loadFirebase = () => import('./lib/firebase');
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(loadFirebase);
  } else {
    setTimeout(loadFirebase, 3000);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
