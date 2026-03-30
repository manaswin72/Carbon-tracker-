import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Provide these via `.env.local` using real Firebase project values.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredEnvKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
] as const;

export const firebaseEnabled = requiredEnvKeys.every((key) => {
  const value = firebaseConfig[key];
  return typeof value === 'string' && value.trim().length > 0;
});

// IMPORTANT:
// - Avoid initializing Firebase when env vars are missing.
// - Also guard against "invalid config" scenarios on CI/Vercel where env vars
//   may exist but be incorrect/placeholder, which can otherwise crash the build.
let app = null as ReturnType<typeof initializeApp> | null;
let auth = null as ReturnType<typeof getAuth> | null;
let db = null as ReturnType<typeof getFirestore> | null;

if (firebaseEnabled) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.error('[firebase] initialization failed; disabling firebase client:', err);
    app = null;
    auth = null;
    db = null;
  }
}

export { app, auth, db };