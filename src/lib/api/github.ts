interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
    };
  };
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  size: number; // in KB
  language: string;
  updated_at: string;
  pushed_at: string;
}

interface CodingStats {
  totalCommits: number;
  totalRepositories: number;
  linesChanged: number;
  activeHours: number; // Estimated coding hours
  languages: Record<string, number>; // Language usage count
  dateRange: {
    start: Date;
    end: Date;
  };
}

export class GitHubAPI {
  private accessToken: string;
  private username: string;

  constructor(accessToken: string, username: string) {
    this.accessToken = accessToken;
    this.username = username;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`https://api.github.com${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `token ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Carbon-Tracker-App',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserRepositories(): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await this.makeRequest('/user/repos', {
        page: page.toString(),
        per_page: perPage.toString(),
        sort: 'updated',
        direction: 'desc',
      });

      if (response.length === 0) break;
      repos.push(...response);
      if (response.length < perPage) break;
      page++;
    }

    return repos;
  }

  async getCommitsForPeriod(startDate: Date, endDate: Date): Promise<CodingStats> {
    const repos = await this.getUserRepositories();
    let totalCommits = 0;
    let totalLinesChanged = 0;
    const languages: Record<string, number> = {};
    const commitTimes: Date[] = [];

    // Limit to recent repositories to avoid rate limiting
    const recentRepos = repos
      .filter(repo => new Date(repo.updated_at) >= startDate)
      .slice(0, 20); // Limit to 20 most recent repos

    for (const repo of recentRepos) {
      try {
        // Get commits for this repository in the date range
        const commits = await this.makeRequest(`/repos/${repo.full_name}/commits`, {
          author: this.username,
          since: startDate.toISOString(),
          until: endDate.toISOString(),
          per_page: '100',
        });

        totalCommits += commits.length;

        // Count language usage
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + commits.length;
        }

        // Track commit times for activity estimation
        commits.forEach((commit: GitHubCommit) => {
          commitTimes.push(new Date(commit.commit.author.date));
        });

        // Get detailed stats for recent commits (to avoid rate limiting)
        const recentCommits = commits.slice(0, 10);
        for (const commit of recentCommits) {
          try {
            const commitDetails = await this.makeRequest(`/repos/${repo.full_name}/commits/${commit.sha}`);
            if (commitDetails.stats) {
              totalLinesChanged += commitDetails.stats.total || 0;
            }
          } catch (error) {
            console.warn(`Failed to get commit details for ${commit.sha}:`, error);
          }
        }
      } catch (error) {
        console.warn(`Failed to get commits for repo ${repo.full_name}:`, error);
      }
    }

    // Estimate active coding hours based on commit patterns
    const activeHours = this.estimateActiveHours(commitTimes);

    return {
      totalCommits,
      totalRepositories: recentRepos.length,
      linesChanged: totalLinesChanged,
      activeHours,
      languages,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    };
  }

  private estimateActiveHours(commitTimes: Date[]): number {
    if (commitTimes.length === 0) return 0;

    // Group commits by hour and day
    const activityMap = new Map<string, number>();

    commitTimes.forEach(time => {
      const dayHour = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}`;
      activityMap.set(dayHour, (activityMap.get(dayHour) || 0) + 1);
    });

    // Estimate 1 hour of coding per active hour with commits
    // Multiple commits in the same hour still count as 1 hour
    return activityMap.size;
  }

  async getTodaysCodingStats(): Promise<{ commits: number; estimatedHours: number }> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const stats = await this.getCommitsForPeriod(startOfDay, endOfDay);
    
    return {
      commits: stats.totalCommits,
      estimatedHours: Math.max(stats.activeHours, stats.totalCommits > 0 ? 0.5 : 0), // Minimum 30 min if any commits
    };
  }

  async getWeeklyCodingStats(): Promise<CodingStats> {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return this.getCommitsForPeriod(weekAgo, today);
  }

  // Get user's GitHub activity events
  async getRecentActivity(): Promise<any[]> {
    try {
      return await this.makeRequest(`/users/${this.username}/events/public`, {
        per_page: '30',
      });
    } catch (error) {
      console.warn('Failed to get GitHub activity:', error);
      return [];
    }
  }

  // Check if the user has granted necessary GitHub permissions
  static async checkPermissions(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error checking GitHub permissions:', error);
      return false;
    }
  }

  // Get user's GitHub profile information
  async getUserProfile(): Promise<any> {
    return this.makeRequest('/user');
  }

  // Calculate repository storage usage
  async getStorageUsage(): Promise<{ totalSize: number; publicRepos: number; privateRepos: number }> {
    const repos = await this.getUserRepositories();
    
    let totalSize = 0;
    let publicRepos = 0;
    let privateRepos = 0;

    repos.forEach(repo => {
      totalSize += repo.size; // Size in KB
      if (repo.private) {
        privateRepos++;
      } else {
        publicRepos++;
      }
    });

    return {
      totalSize: totalSize / 1024, // Convert to MB
      publicRepos,
      privateRepos,
    };
  }
}