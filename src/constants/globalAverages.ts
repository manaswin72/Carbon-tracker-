// Global average carbon footprint data for digital activities
// Based on research from various environmental studies and carbon footprint calculators
// Values are in grams of CO2 equivalent

export interface GlobalAverageData {
  total: number; // Total daily CO2 in grams
  breakdown: {
    emails: number;
    streaming: number;
    coding: number;
    video_calls: number;
    cloud_storage: number;
    gaming: number;
    social_media: number;
  };
}

export const GLOBAL_AVERAGES = {
  daily: {
    total: 350, // grams of CO2 per day
    breakdown: {
      emails: 45,        // ~20 emails per day
      streaming: 120,    // ~2 hours streaming
      coding: 80,        // ~4 hours coding
      video_calls: 60,   // ~1 hour video calls
      cloud_storage: 15, // ~5GB usage
      gaming: 25,        // ~0.5 hours gaming
      social_media: 5,   // ~1 hour social media
    },
  },
  weekly: {
    total: 2450, // 7 * 350
    breakdown: {
      emails: 315,      // 7 * 45
      streaming: 840,   // 7 * 120
      coding: 560,      // 7 * 80
      video_calls: 420, // 7 * 60
      cloud_storage: 105, // 7 * 15
      gaming: 175,      // 7 * 25
      social_media: 35, // 7 * 5
    },
  },
  monthly: {
    total: 10500, // 30 * 350
    breakdown: {
      emails: 1350,      // 30 * 45
      streaming: 3600,   // 30 * 120
      coding: 2400,      // 30 * 80
      video_calls: 1800, // 30 * 60
      cloud_storage: 450, // 30 * 15
      gaming: 750,       // 30 * 25
      social_media: 150, // 30 * 5
    },
  },
} as const;

// Target goals (20% reduction from global average)
export const TARGET_GOALS = {
  daily: {
    total: Math.round(GLOBAL_AVERAGES.daily.total * 0.8), // 280g
    breakdown: Object.fromEntries(
      Object.entries(GLOBAL_AVERAGES.daily.breakdown).map(([key, value]) => [
        key,
        Math.round(value * 0.8),
      ])
    ),
  },
  weekly: {
    total: Math.round(GLOBAL_AVERAGES.weekly.total * 0.8), // 1960g
    breakdown: Object.fromEntries(
      Object.entries(GLOBAL_AVERAGES.weekly.breakdown).map(([key, value]) => [
        key,
        Math.round(value * 0.8),
      ])
    ),
  },
  monthly: {
    total: Math.round(GLOBAL_AVERAGES.monthly.total * 0.8), // 8400g
    breakdown: Object.fromEntries(
      Object.entries(GLOBAL_AVERAGES.monthly.breakdown).map(([key, value]) => [
        key,
        Math.round(value * 0.8),
      ])
    ),
  },
} as const;

export type ComparisonPeriod = 'daily' | 'weekly' | 'monthly';

// Helper function to get comparison data for a specific period
export function getComparisonData(period: ComparisonPeriod) {
  return {
    average: GLOBAL_AVERAGES[period],
    target: TARGET_GOALS[period],
  };
}