'use client';

import { useState, useEffect, createContext, useContext } from 'react';
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
    // Instant access for easy demo
    const timer = setTimeout(() => {
      const devUser: User = {
        id: 'demo-user-123',
        email: 'demo@carbontracker.app',
        name: 'Demo User',
        photoURL: undefined,
        createdAt: new Date(),
        preferences: {
          units: 'metric',
          notifications: true,
        },
      };
      setUser(devUser);
      setLoading(false);
    }, 300); // Much faster loading

    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    // Simulate Google sign in with realistic delay
    setTimeout(() => {
      const googleUser: User = {
        id: 'google-user-456',
        email: 'user@gmail.com',
        name: 'Google User',
        photoURL: 'https://via.placeholder.com/40',
        createdAt: new Date(),
        preferences: {
          units: 'metric',
          notifications: true,
        },
      };
      setUser(googleUser);
      localStorage.setItem('carbon_tracker_user', JSON.stringify(googleUser));
      setLoading(false);
    }, 1500);
  };

  const signInWithGithub = async () => {
    setLoading(true);
    // Simulate GitHub sign in with realistic delay
    setTimeout(() => {
      const githubUser: User = {
        id: 'github-user-789',
        email: 'user@github.com',
        name: 'GitHub User',
        photoURL: 'https://via.placeholder.com/40',
        createdAt: new Date(),
        preferences: {
          units: 'metric',
          notifications: true,
        },
      };
      setUser(githubUser);
      localStorage.setItem('carbon_tracker_user', JSON.stringify(githubUser));
      setLoading(false);
    }, 1500);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('carbon_tracker_user');
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