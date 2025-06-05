const API_BASE_URL = import.meta.env.VITE_FASTAPI_URL || 'http://127.0.0.1:8000';

export interface ChatMessage {
  query: string;
  chat_history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  user_id?: string; // Add user context for backend
}

export interface ChatResponse {
  answer: string;
  sources?: Array<{
    text: string;
    score: number;
    metadata: {
      source: string;
    };
  }>;
}

export interface TrialData {
  chatsUsedToday: number;
  dailyLimit: number;
  trialDaysRemaining: number;
  isActive: boolean;
  plan: string;
  isUnlimited: boolean;
}

export const sendMessageToChatbot = async (
  query: string, 
  chatHistory: Array<{ sender: string; message: string }>,
  authToken?: string | null,
  userId?: string
): Promise<string> => {
  try {
    // Convert frontend chat history to the format expected by your FastAPI backend
    const formattedHistory = chatHistory
      .slice(1) // Skip the initial welcome message
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.message
      }));

    const requestBody: ChatMessage = {
      query: query,
      chat_history: formattedHistory.slice(0, -1), // Exclude the current message since it's in query
      user_id: userId // Include user ID for backend tracking
    };

    console.log('Sending request to FastAPI:', requestBody);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Include auth token if provided
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    console.log('Received response from FastAPI:', data);
    
    // Extract the answer field from your API response
    return data.answer || 'No response received';
  } catch (error) {
    console.error('Error calling FastAPI chatbot:', error);
    throw error;
  }
};

export const getTrialData = async (authToken: string): Promise<TrialData> => {
  try {
    // Construct the API URL - if FASTAPI_URL already includes /api, use it; otherwise append /api
    const baseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;
    const response = await fetch(`${baseUrl}/user/trial-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trial data');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching trial data:', error);
    throw error;
  }
};

// Test function to check if the API is accessible
export const testConnection = async (authToken?: string | null): Promise<boolean> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers,
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to connect to FastAPI backend:', error);
    return false;
  }
}; 