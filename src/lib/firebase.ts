import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Firebase web config is safe to expose client-side — access is governed by
// Firebase Security Rules and API key restrictions, not by hiding these values.
const firebaseConfig = {
  apiKey: 'AIzaSyBk_152huk1H9gMxWW7BZeNi428jAGReJo',
  authDomain: 'north-feild-tree.firebaseapp.com',
  projectId: 'north-feild-tree',
  storageBucket: 'north-feild-tree.firebasestorage.app',
  messagingSenderId: '308831288581',
  appId: '1:308831288581:web:46a20830a269fc0c87cb6c',
  measurementId: 'G-3XMZ2WFKXD',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
