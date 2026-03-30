import { Badge, User, CarbonFootprint, ActivityType } from '@/types';
import { BADGE_TEMPLATES, BadgeTemplate, BadgeRequirement } from '@/constants/badges';

interface UserProgress {
  userId: string;
  totalDays: number;
  streakDays: number;
  tipsApplied: number;
  weeklyReductions: number[];
  monthlyReductions: number[];
  activityStats: Record<ActivityType, {
    dailyAverages: number[];
    weeklyTotals: number[];
  }>;
}

interface EvaluationContext {
  user: User;
  footprints: CarbonFootprint[];
  currentBadges: Badge[];
  userProgress: UserProgress;
}

export class BadgeEvaluator {
  private context: EvaluationContext;

  constructor(context: EvaluationContext) {
    this.context = context;
  }

  evaluateAllBadges(): Badge[] {
    const newBadges: Badge[] = [];
    const currentBadgeIds = new Set(this.context.currentBadges.map(b => b.id));

    for (const template of BADGE_TEMPLATES) {
      if (!currentBadgeIds.has(template.id)) {
        if (this.evaluateBadgeRequirement(template)) {
          newBadges.push(this.createBadgeFromTemplate(template));
        }
      }
    }

    return newBadges;
  }

  private evaluateBadgeRequirement(template: BadgeTemplate): boolean {
    const { requirement } = template;

    switch (requirement.type) {
      case 'total_reduction':
        return this.checkReductionRequirement(requirement);
      
      case 'streak_days':
        return this.context.userProgress.streakDays >= requirement.threshold;
      
      case 'activity_limit':
        return this.checkActivityLimitRequirement(requirement);
      
      case 'tips_applied':
        return this.context.userProgress.tipsApplied >= requirement.threshold;
      
      case 'consistency':
        return this.checkConsistencyRequirement(requirement);
      
      case 'milestone':
        return this.context.userProgress.totalDays >= requirement.threshold;
      
      default:
        return false;
    }
  }

  private checkReductionRequirement(requirement: BadgeRequirement): boolean {
    const { threshold, period } = requirement;
    
    if (period === 'weekly') {
      const recentWeekReduction = this.context.userProgress.weeklyReductions[0] || 0;
      return recentWeekReduction >= threshold;
    } else if (period === 'monthly') {
      const recentMonthReduction = this.context.userProgress.monthlyReductions[0] || 0;
      return recentMonthReduction >= threshold;
    }
    
    return false;
  }

  private checkActivityLimitRequirement(requirement: BadgeRequirement): boolean {
    const { threshold, activity, period } = requirement;
    
    if (!activity || !period) return false;
    
    const activityData = this.context.userProgress.activityStats[activity as ActivityType];
    if (!activityData) return false;

    if (period === 'daily') {
      // Check if recent daily averages are below threshold
      const recentDays = activityData.dailyAverages.slice(-7); // Last 7 days
      return recentDays.length >= 7 && recentDays.every(value => value <= threshold);
    } else if (period === 'weekly') {
      // Check if recent weekly totals are below threshold
      const recentWeeks = activityData.weeklyTotals.slice(-4); // Last 4 weeks
      return recentWeeks.length >= 4 && recentWeeks.every(value => value <= threshold);
    }

    return false;
  }

  private checkConsistencyRequirement(requirement: BadgeRequirement): boolean {
    // This would check for consistent behavior patterns
    // For now, we'll use streak days as a proxy
    return this.context.userProgress.streakDays >= (requirement.threshold || 7);
  }

  private createBadgeFromTemplate(template: BadgeTemplate): Badge {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      icon: template.icon,
      requirement: `${template.requirement.type}: ${template.requirement.threshold}`,
      achieved: true,
      achievedAt: new Date(),
    };
  }

  static calculateUserProgress(
    userId: string,
    footprints: CarbonFootprint[],
    tipsApplied: number = 0
  ): UserProgress {
    const sortedFootprints = footprints.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Calculate streak days
    let streakDays = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (let i = sortedFootprints.length - 1; i >= 0; i--) {
      const footprintDate = new Date(sortedFootprints[i].date);
      footprintDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - footprintDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streakDays) {
        streakDays++;
        currentDate = new Date(footprintDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }

    // Calculate weekly and monthly reductions
    const weeklyReductions = this.calculateWeeklyReductions(sortedFootprints);
    const monthlyReductions = this.calculateMonthlyReductions(sortedFootprints);

    // Calculate activity statistics
    const activityStats = this.calculateActivityStats(sortedFootprints);

    return {
      userId,
      totalDays: sortedFootprints.length,
      streakDays,
      tipsApplied,
      weeklyReductions,
      monthlyReductions,
      activityStats,
    };
  }

  private static calculateWeeklyReductions(footprints: CarbonFootprint[]): number[] {
    const weeks: Record<string, number[]> = {};
    
    footprints.forEach(fp => {
      const date = new Date(fp.date);
      const weekKey = this.getWeekKey(date);
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = [];
      }
      weeks[weekKey].push(fp.totalCO2);
    });

    const weeklyAverages = Object.values(weeks).map(weekData => {
      return weekData.reduce((sum, co2) => sum + co2, 0) / weekData.length;
    });

    // Calculate reductions compared to first week
    const baseline = weeklyAverages[0] || 0;
    return weeklyAverages.map(avg => baseline > 0 ? ((baseline - avg) / baseline) * 100 : 0);
  }

  private static calculateMonthlyReductions(footprints: CarbonFootprint[]): number[] {
    const months: Record<string, number[]> = {};
    
    footprints.forEach(fp => {
      const date = new Date(fp.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!months[monthKey]) {
        months[monthKey] = [];
      }
      months[monthKey].push(fp.totalCO2);
    });

    const monthlyAverages = Object.values(months).map(monthData => {
      return monthData.reduce((sum, co2) => sum + co2, 0) / monthData.length;
    });

    // Calculate reductions compared to first month
    const baseline = monthlyAverages[0] || 0;
    return monthlyAverages.map(avg => baseline > 0 ? ((baseline - avg) / baseline) * 100 : 0);
  }

  private static calculateActivityStats(footprints: CarbonFootprint[]): Record<ActivityType, {
    dailyAverages: number[];
    weeklyTotals: number[];
  }> {
    const activities: ActivityType[] = ['emails', 'streaming', 'coding', 'video_calls', 'cloud_storage', 'gaming', 'social_media'];
    const stats: Record<ActivityType, { dailyAverages: number[]; weeklyTotals: number[] }> = {} as any;

    activities.forEach(activity => {
      const dailyValues = footprints.map(fp => fp.breakdown[activity] || 0);
      const weeklyTotals: number[] = [];
      
      // Group by weeks
      for (let i = 0; i < dailyValues.length; i += 7) {
        const weekData = dailyValues.slice(i, i + 7);
        const weekTotal = weekData.reduce((sum, val) => sum + val, 0);
        weeklyTotals.push(weekTotal);
      }

      stats[activity] = {
        dailyAverages: dailyValues,
        weeklyTotals,
      };
    });

    return stats;
  }

  private static getWeekKey(date: Date): string {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return `${startOfWeek.getFullYear()}-W${Math.ceil(startOfWeek.getDate() / 7)}`;
  }
}