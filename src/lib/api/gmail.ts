interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  historyId: string;
  internalDate: string;
  sizeEstimate: number;
}

interface GmailResponse {
  messages: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

interface EmailStats {
  totalEmails: number;
  sentEmails: number;
  receivedEmails: number;
  avgEmailSize: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export class GmailAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`https://www.googleapis.com/gmail/v1/users/me/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gmail API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getEmailsForPeriod(startDate: Date, endDate: Date): Promise<EmailStats> {
    const startTimestamp = Math.floor(startDate.getTime() / 1000);
    const endTimestamp = Math.floor(endDate.getTime() / 1000);

    // Query for sent emails
    const sentQuery = `in:sent after:${startTimestamp} before:${endTimestamp}`;
    const sentEmails = await this.makeRequest('messages', {
      q: sentQuery,
      maxResults: '500',
    });

    // Query for received emails
    const receivedQuery = `in:inbox after:${startTimestamp} before:${endTimestamp}`;
    const receivedEmails = await this.makeRequest('messages', {
      q: receivedQuery,
      maxResults: '500',
    });

    // Get detailed info for a sample of emails to estimate average size
    const sampleEmails = sentEmails.messages?.slice(0, 10) || [];
    let totalSize = 0;
    
    for (const email of sampleEmails) {
      try {
        const details = await this.makeRequest(`messages/${email.id}`);
        totalSize += details.sizeEstimate || 0;
      } catch (error) {
        console.warn('Failed to get email details:', error);
      }
    }

    const avgEmailSize = sampleEmails.length > 0 ? totalSize / sampleEmails.length : 10000; // Default 10KB

    return {
      totalEmails: (sentEmails.resultSizeEstimate || 0) + (receivedEmails.resultSizeEstimate || 0),
      sentEmails: sentEmails.resultSizeEstimate || 0,
      receivedEmails: receivedEmails.resultSizeEstimate || 0,
      avgEmailSize,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    };
  }

  async getTodaysEmailCount(): Promise<number> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const stats = await this.getEmailsForPeriod(startOfDay, endOfDay);
    return stats.sentEmails; // Only count sent emails for carbon calculation
  }

  async getWeeklyEmailStats(): Promise<EmailStats> {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return this.getEmailsForPeriod(weekAgo, today);
  }

  // Check if the user has granted Gmail permissions
  static async checkPermissions(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      const tokenInfo = await response.json();
      return tokenInfo.scope?.includes('https://www.googleapis.com/auth/gmail.readonly') || false;
    } catch (error) {
      console.error('Error checking Gmail permissions:', error);
      return false;
    }
  }

  // Get additional Gmail quota information
  async getQuotaInfo(): Promise<{ quotaUsed: number; quotaLimit: number }> {
    try {
      const profile = await this.makeRequest('profile');
      return {
        quotaUsed: profile.messagesTotal || 0,
        quotaLimit: profile.threadsTotal || 0,
      };
    } catch (error) {
      console.warn('Could not fetch Gmail quota info:', error);
      return { quotaUsed: 0, quotaLimit: 0 };
    }
  }
}