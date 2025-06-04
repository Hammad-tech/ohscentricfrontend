import { useState, useEffect, useCallback } from 'react';
import { getTrialData, TrialData } from '../services/chatbotService';
import { useAuth } from '../context/AuthContext';

export const useTrialData = () => {
  const [trialData, setTrialData] = useState<TrialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAuthToken, user } = useAuth();

  const fetchTrialData = useCallback(async () => {
    if (!user) {
      setTrialData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const data = await getTrialData(token);
      setTrialData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trial data');
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, user]);

  useEffect(() => {
    fetchTrialData();
  }, [fetchTrialData]);

  // Function to refresh trial data after sending a message
  const refreshTrialData = useCallback(() => {
    fetchTrialData();
  }, [fetchTrialData]);

  // Auto-refresh every minute when page is visible
  useEffect(() => {
    if (!user) return;
    
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        refreshTrialData();
      }
    }, 60000); // Refresh every minute when page is visible

    return () => clearInterval(interval);
  }, [refreshTrialData, user]);

  return {
    trialData,
    loading,
    error,
    refreshTrialData,
  };
}; 