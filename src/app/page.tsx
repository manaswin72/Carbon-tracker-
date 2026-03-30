"use client";

import { useAuth } from "@/hooks/useAuthDev";
import LoginForm from "@/components/auth/LoginForm";
import AppLayout from "@/components/layout/AppLayout";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <DashboardSkeleton />;
  if (!user) return <LoginForm />;
  return <AppLayout />;
}
