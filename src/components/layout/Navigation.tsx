'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuthDev';
import { formatCO2Amount } from '@/lib/calculations/carbonFootprint';

interface NavigationProps {
  currentPage: 'dashboard' | 'activities' | 'tips' | 'goals' | 'badges';
  onPageChange: (page: 'dashboard' | 'activities' | 'tips' | 'goals' | 'badges') => void;
  todayFootprint?: number;
}

export default function Navigation({ currentPage, onPageChange, todayFootprint = 0 }: NavigationProps) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', desc: 'Overview & Stats' },
    { id: 'activities', label: 'Activities', icon: '📝', desc: 'Log Daily Actions' },
    { id: 'tips', label: 'Tips', icon: '💡', desc: 'Eco Recommendations' },
    { id: 'goals', label: 'Goals', icon: '🎯', desc: 'Weekly Targets' },
    { id: 'badges', label: 'Badges', icon: '🏆', desc: 'Achievements' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        {/* Logo & Brand */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Carbon Tracker</h1>
              <p className="text-xs text-gray-500">Digital Footprint Monitor</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          
          {/* Today's Footprint */}
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Today's Impact</span>
              <span className="text-sm font-bold text-green-700">
                {formatCO2Amount(todayFootprint)}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Keep tracking to reduce it! 🌍
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as any)}
              className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-green-100 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <span className="text-lg mr-3">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌱</span>
            <div>
              <h1 className="font-bold text-gray-900">Carbon Tracker</h1>
              <p className="text-xs text-gray-500">{formatCO2Amount(todayFootprint)} today</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 py-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <button
                onClick={logout}
                className="w-full flex items-center px-3 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-2"
              >
                <span className="text-lg mr-3">🚪</span>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 lg:hidden">
          <div className="grid grid-cols-5">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as any)}
                className={`flex flex-col items-center py-2 px-1 transition-colors ${
                  currentPage === item.id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="fixed top-4 right-4 z-40 hidden lg:flex flex-col space-y-2">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-lg p-3 text-center min-w-[120px]">
          <div className="text-lg font-bold text-green-600">{formatCO2Amount(todayFootprint)}</div>
          <div className="text-xs text-gray-500">Today's CO₂</div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-green-200 opacity-20 floating-element">
          <span className="text-4xl">🌿</span>
        </div>
        <div className="absolute top-40 right-20 text-green-200 opacity-20 floating-element">
          <span className="text-3xl">🍃</span>
        </div>
        <div className="absolute bottom-40 left-20 text-green-200 opacity-20 floating-element">
          <span className="text-5xl">🌱</span>
        </div>
      </div>
    </>
  );
}