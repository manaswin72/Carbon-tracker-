import { Badge } from '@/types';

export interface BadgeRequirement {
  type: 'total_reduction' | 'streak_days' | 'activity_limit' | 'tips_applied' | 'consistency' | 'milestone';
  threshold: number;
  activity?: string;
  period?: 'daily' | 'weekly' | 'monthly';
}

export interface BadgeTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'environmental' | 'social' | 'consistency' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: BadgeRequirement;
  points: number;
}

export const BADGE_TEMPLATES: BadgeTemplate[] = [
  // Environmental Impact Badges
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Reduce your weekly carbon footprint by 25%',
    icon: '🌿',
    category: 'environmental',
    rarity: 'common',
    requirement: {
      type: 'total_reduction',
      threshold: 25,
      period: 'weekly',
    },
    points: 100,
  },
  {
    id: 'green-champion',
    name: 'Green Champion',
    description: 'Reduce your monthly carbon footprint by 50%',
    icon: '🏆',
    category: 'environmental',
    rarity: 'rare',
    requirement: {
      type: 'total_reduction',
      threshold: 50,
      period: 'monthly',
    },
    points: 500,
  },
  {
    id: 'carbon-crusher',
    name: 'Carbon Crusher',
    description: 'Achieve 75% reduction in monthly emissions',
    icon: '💪',
    category: 'environmental',
    rarity: 'epic',
    requirement: {
      type: 'total_reduction',
      threshold: 75,
      period: 'monthly',
    },
    points: 1000,
  },
  {
    id: 'planet-protector',
    name: 'Planet Protector',
    description: 'Maintain 90% reduction for 3 months',
    icon: '🌍',
    category: 'environmental',
    rarity: 'legendary',
    requirement: {
      type: 'total_reduction',
      threshold: 90,
      period: 'monthly',
    },
    points: 2500,
  },

  // Consistency Badges
  {
    id: 'consistent-tracker',
    name: 'Consistent Tracker',
    description: 'Log activities for 7 consecutive days',
    icon: '📅',
    category: 'consistency',
    rarity: 'common',
    requirement: {
      type: 'streak_days',
      threshold: 7,
    },
    points: 150,
  },
  {
    id: 'habit-master',
    name: 'Habit Master',
    description: 'Log activities for 30 consecutive days',
    icon: '🎯',
    category: 'consistency',
    rarity: 'rare',
    requirement: {
      type: 'streak_days',
      threshold: 30,
    },
    points: 750,
  },
  {
    id: 'dedication-legend',
    name: 'Dedication Legend',
    description: 'Log activities for 100 consecutive days',
    icon: '🏅',
    category: 'consistency',
    rarity: 'legendary',
    requirement: {
      type: 'streak_days',
      threshold: 100,
    },
    points: 3000,
  },

  // Activity-Specific Badges
  {
    id: 'email-minimalist',
    name: 'Email Minimalist',
    description: 'Keep daily emails under 10 for a week',
    icon: '📧',
    category: 'environmental',
    rarity: 'common',
    requirement: {
      type: 'activity_limit',
      threshold: 10,
      activity: 'emails',
      period: 'daily',
    },
    points: 200,
  },
  {
    id: 'streaming-sage',
    name: 'Streaming Sage',
    description: 'Limit streaming to 1 hour per day for a month',
    icon: '📺',
    category: 'environmental',
    rarity: 'rare',
    requirement: {
      type: 'activity_limit',
      threshold: 1,
      activity: 'streaming',
      period: 'daily',
    },
    points: 600,
  },
  {
    id: 'video-call-optimizer',
    name: 'Video Call Optimizer',
    description: 'Keep video calls under 2 hours daily for 2 weeks',
    icon: '📹',
    category: 'environmental',
    rarity: 'common',
    requirement: {
      type: 'activity_limit',
      threshold: 2,
      activity: 'video_calls',
      period: 'daily',
    },
    points: 300,
  },
  {
    id: 'cloud-conscious',
    name: 'Cloud Conscious',
    description: 'Maintain cloud storage under 50GB for a month',
    icon: '☁️',
    category: 'environmental',
    rarity: 'common',
    requirement: {
      type: 'activity_limit',
      threshold: 50,
      activity: 'cloud_storage',
      period: 'daily',
    },
    points: 400,
  },

  // Social Impact Badges
  {
    id: 'tip-explorer',
    name: 'Tip Explorer',
    description: 'Apply 5 eco-friendly tips',
    icon: '💡',
    category: 'social',
    rarity: 'common',
    requirement: {
      type: 'tips_applied',
      threshold: 5,
    },
    points: 100,
  },
  {
    id: 'tip-master',
    name: 'Tip Master',
    description: 'Apply 25 eco-friendly tips',
    icon: '🧠',
    category: 'social',
    rarity: 'rare',
    requirement: {
      type: 'tips_applied',
      threshold: 25,
    },
    points: 500,
  },
  {
    id: 'wisdom-keeper',
    name: 'Wisdom Keeper',
    description: 'Apply 50 eco-friendly tips',
    icon: '🦉',
    category: 'social',
    rarity: 'epic',
    requirement: {
      type: 'tips_applied',
      threshold: 50,
    },
    points: 1200,
  },

  // Milestone Badges
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first day of tracking',
    icon: '👶',
    category: 'milestone',
    rarity: 'common',
    requirement: {
      type: 'milestone',
      threshold: 1,
    },
    points: 50,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Complete your first week of tracking',
    icon: '⚡',
    category: 'milestone',
    rarity: 'common',
    requirement: {
      type: 'milestone',
      threshold: 7,
    },
    points: 200,
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Complete your first month of tracking',
    icon: '🎊',
    category: 'milestone',
    rarity: 'rare',
    requirement: {
      type: 'milestone',
      threshold: 30,
    },
    points: 800,
  },
  {
    id: 'year-champion',
    name: 'Year Champion',
    description: 'Complete a full year of tracking',
    icon: '👑',
    category: 'milestone',
    rarity: 'legendary',
    requirement: {
      type: 'milestone',
      threshold: 365,
    },
    points: 5000,
  },
];

export const RARITY_COLORS = {
  common: 'text-gray-600 bg-gray-100',
  rare: 'text-blue-600 bg-blue-100',
  epic: 'text-purple-600 bg-purple-100',
  legendary: 'text-yellow-600 bg-yellow-100',
};

export const RARITY_LABELS = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export const getBadgesByCategory = (category: string) => {
  return BADGE_TEMPLATES.filter(badge => badge.category === category);
};

export const getBadgesByRarity = (rarity: string) => {
  return BADGE_TEMPLATES.filter(badge => badge.rarity === rarity);
};

export const getBadgeTemplate = (badgeId: string): BadgeTemplate | undefined => {
  return BADGE_TEMPLATES.find(badge => badge.id === badgeId);
};