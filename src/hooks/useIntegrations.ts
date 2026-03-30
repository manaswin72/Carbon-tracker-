'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { GmailAPI } from '@/lib/api/gmail';
import { GitHubAPI } from '@/lib/api/github';

interface IntegrationStatus {
  gmail: {
    connected: boolean;
    lastSync?: Date;
    error?: string;
  };
  github: {
    connected: boolean;
    lastSync?: Date;
    error?: string;
  };
}

interface SyncedData {
  emails: {
    today: number;
    week: number;
  };
  coding: {
    todayHours: number;
    weekCommits: number;
    weekHours: number;
  };
}

export const useIntegrations = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<IntegrationStatus>({
    gmail: { connected: false },
    github: { connected: false },
  });
  const [syncedData, setSyncedData] = useState<SyncedData>({
    emails: { today: 0, week: 0 },
    coding: { todayHours: 0, weekCommits: 0, weekHours: 0 },
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check integration status on mount
  useEffect(() => {
    checkIntegrationStatus();
  }, [user]);

  const checkIntegrationStatus = useCallback(async () => {
    if (!user) return;

    // Check if we have stored tokens and they're still valid
    const gmailToken = localStorage.getItem('gmail_access_token');
    const githubToken = localStorage.getItem('github_access_token');

    const newStatus: IntegrationStatus = {
      gmail: { connected: false },
      github: { connected: false },
    };

    // Check Gmail
    if (gmailToken) {
      try {
        const isValid = await GmailAPI.checkPermissions(gmailToken);
        newStatus.gmail.connected = isValid;
        if (!isValid) {
          localStorage.removeItem('gmail_access_token');
        }
      } catch (error) {
        console.error('Gmail permission check failed:', error);
        newStatus.gmail.error = 'Permission check failed';
      }
    }

    // Check GitHub
    if (githubToken) {
      try {
        const isValid = await GitHubAPI.checkPermissions(githubToken);
        newStatus.github.connected = isValid;
        if (!isValid) {
          localStorage.removeItem('github_access_token');
          localStorage.removeItem('github_username');
        }
      } catch (error) {
        console.error('GitHub permission check failed:', error);
        newStatus.github.error = 'Permission check failed';
      }
    }

    setStatus(newStatus);
  }, [user]);

  const connectGmail = useCallback(async () => {
    // Note: This would typically use Firebase Auth's Google provider
    // to get the access token with Gmail scope
    try {
      // In a real implementation, you'd use the Google Identity Services
      // or Firebase Auth to get the token with Gmail scope
      console.log('Gmail connection would be implemented here');
      
      // For now, simulate a successful connection
      // In production, you'd store the real access token
      // localStorage.setItem('gmail_access_token', accessToken);
      
      setStatus(prev => ({
        ...prev,
        gmail: { connected: true, lastSync: new Date() }
      }));
    } catch (error) {
      console.error('Failed to connect Gmail:', error);
      setStatus(prev => ({
        ...prev,
        gmail: { connected: false, error: 'Connection failed' }
      }));
    }
  }, []);

  const connectGitHub = useCallback(async () => {
    try {
      // In a real implementation, you'd redirect to GitHub OAuth
      // or use Firebase Auth's GitHub provider
      console.log('GitHub connection would be implemented here');
      
      // For now, simulate a successful connection
      setStatus(prev => ({
        ...prev,
        github: { connected: true, lastSync: new Date() }
      }));
    } catch (error) {
      console.error('Failed to connect GitHub:', error);
      setStatus(prev => ({
        ...prev,
        github: { connected: false, error: 'Connection failed' }
      }));
    }
  }, []);

  const syncGmailData = useCallback(async () => {
    const gmailToken = localStorage.getItem('gmail_access_token');
    if (!gmailToken || !status.gmail.connected) return;

    try {
      setIsLoading(true);
      const gmailAPI = new GmailAPI(gmailToken);
      
      const todayEmails = await gmailAPI.getTodaysEmailCount();
      const weeklyStats = await gmailAPI.getWeeklyEmailStats();

      setSyncedData(prev => ({
        ...prev,
        emails: {
          today: todayEmails,
          week: weeklyStats.sentEmails,
        },
      }));

      setStatus(prev => ({
        ...prev,
        gmail: { ...prev.gmail, lastSync: new Date() }
      }));
    } catch (error) {
      console.error('Gmail sync failed:', error);
      setStatus(prev => ({
        ...prev,
        gmail: { ...prev.gmail, error: 'Sync failed' }
      }));
    } finally {
      setIsLoading(false);
    }
  }, [status.gmail.connected]);

  const syncGitHubData = useCallback(async () => {
    const githubToken = localStorage.getItem('github_access_token');
    const githubUsername = localStorage.getItem('github_username');
    
    if (!githubToken || !githubUsername || !status.github.connected) return;

    try {
      setIsLoading(true);
      const githubAPI = new GitHubAPI(githubToken, githubUsername);
      
      const todayStats = await githubAPI.getTodaysCodingStats();
      const weeklyStats = await githubAPI.getWeeklyCodingStats();

      setSyncedData(prev => ({
        ...prev,
        coding: {
          todayHours: todayStats.estimatedHours,
          weekCommits: weeklyStats.totalCommits,
          weekHours: weeklyStats.activeHours,
        },
      }));

      setStatus(prev => ({
        ...prev,
        github: { ...prev.github, lastSync: new Date() }
      }));
    } catch (error) {
      console.error('GitHub sync failed:', error);
      setStatus(prev => ({
        ...prev,
        github: { ...prev.github, error: 'Sync failed' }
      }));
    } finally {
      setIsLoading(false);
    }
  }, [status.github.connected]);

  const syncAllData = useCallback(async () => {
    const promises = [];
    
    if (status.gmail.connected) {
      promises.push(syncGmailData());
    }
    
    if (status.github.connected) {
      promises.push(syncGitHubData());
    }

    await Promise.allSettled(promises);
  }, [status, syncGmailData, syncGitHubData]);

  const disconnectGmail = useCallback(() => {
    localStorage.removeItem('gmail_access_token');
    setStatus(prev => ({
      ...prev,
      gmail: { connected: false }
    }));
    setSyncedData(prev => ({
      ...prev,
      emails: { today: 0, week: 0 }
    }));
  }, []);

  const disconnectGitHub = useCallback(() => {
    localStorage.removeItem('github_access_token');
    localStorage.removeItem('github_username');
    setStatus(prev => ({
      ...prev,
      github: { connected: false }
    }));
    setSyncedData(prev => ({
      ...prev,
      coding: { todayHours: 0, weekCommits: 0, weekHours: 0 }
    }));
  }, []);

  return {
    status,
    syncedData,
    isLoading,
    connectGmail,
    connectGitHub,
    syncGmailData,
    syncGitHubData,
    syncAllData,
    disconnectGmail,
    disconnectGitHub,
    checkIntegrationStatus,
  };
};