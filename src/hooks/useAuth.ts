'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import {
  User as FirebaseUser,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { createUser, getUser } from '@/lib/firebase/firestore';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // Firebase is not configured (missing/invalid env vars). Avoid crashing the whole app.
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Check if user exists in our database
        let userData = await getUser(firebaseUser.uid);
        
        if (!userData) {
          // Create new user
          userData = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName || 'Anonymous',
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: new Date(),
            preferences: {
              units: 'metric',
              notifications: true,
            },
          };
          await createUser(userData);
        }
        
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Firebase auth is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.');
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
    
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    if (!auth) throw new Error('Firebase auth is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.');
    const provider = new GithubAuthProvider();
    provider.addScope('read:user');
    
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase auth is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.');
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    logout,
  };
};

export { AuthContext };