'use client';

import { useState, useEffect } from 'react';
import { getRandomTips } from '@/constants/tips';
import { formatCO2Amount } from '@/lib/calculations/carbonFootprint';

interface QuickTipsProps {
  count?: number;
  className?: string;
}

export default function QuickTips({ count = 3, className = '' }: QuickTipsProps) {
  const [tips, setTips] = useState<any[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const randomTips = getRandomTips(count);
    setTips(randomTips);
  }, [count]);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  if (tips.length === 0) return null;

  const currentTip = tips[currentTipIndex];

  return (
    <div className={`bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">💡 Quick Tip</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevTip}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            disabled={tips.length <= 1}
          >
            ←
          </button>
          <span className="text-sm">
            {currentTipIndex + 1} / {tips.length}
          </span>
          <button
            onClick={nextTip}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            disabled={tips.length <= 1}
          >
            →
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="text-2xl">{currentTip.icon}</div>
        <div className="flex-1">
          <h4 className="font-medium mb-2">{currentTip.title}</h4>
          <p className="text-green-100 text-sm mb-3">{currentTip.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              Save {formatCO2Amount(currentTip.potentialSaving)}
            </span>
            <button className="text-xs bg-white text-green-600 px-3 py-1 rounded-full hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex space-x-1 mt-4">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index === currentTipIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}