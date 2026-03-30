"use client";

import { Skeleton, CircularSkeleton } from "@/components/ui/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-5 space-y-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col space-y-2 flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="p-3 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-36" />
        </div>

        <div className="flex flex-col space-y-3 pt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-lg" />
          ))}
        </div>

        <div className="mt-auto">
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 p-8 space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-7 w-72 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-xl shadow-sm flex justify-between items-center"
            >
              <div>
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Skeleton className="h-5 w-48 mb-6" />
            <div className="flex justify-center">
              <CircularSkeleton size={200} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-28" />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Skeleton className="h-5 w-40 mb-6" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
