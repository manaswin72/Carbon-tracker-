'use client';

import { ReactNode } from 'react';
import { AuthContext, useAuthProvider } from '@/hooks/useAuthDev';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProviderDev({ children }: AuthProviderProps) {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}