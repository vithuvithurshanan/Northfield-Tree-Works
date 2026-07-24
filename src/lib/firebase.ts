// Dynamic Firebase initialization — keeps firebase 100% off the critical path
const firebaseConfig = {
  apiKey: 'AIzaSyBk_152huk1H9gMxWW7BZeNi428jAGReJo',
  authDomain: 'north-feild-tree.firebaseapp.com',
  projectId: 'north-feild-tree',
  storageBucket: 'north-feild-tree.firebasestorage.app',
  messagingSenderId: '308831288581',
  appId: '1:308831288581:web:46a20830a269fc0c87cb6c',
  measurementId: 'G-3XMZ2WFKXD',
};

export let firebaseApp: any = null;
export let analytics: any = null;

export const initFirebase = async () => {
  if (firebaseApp) return { firebaseApp, analytics };
  try {
    const { initializeApp } = await import('firebase/app');
    firebaseApp = initializeApp(firebaseConfig);

    const { getAnalytics } = await import('firebase/analytics');
    analytics = getAnalytics(firebaseApp);
  } catch (err) {
    console.warn('Firebase lazy init note:', err);
  }
  return { firebaseApp, analytics };
};

// Firebase init helper for dynamic on-demand loading

