import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const webStorage = {
  async getItemAsync(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to get item from localStorage:', error);
      return null;
    }
  },

  async setItemAsync(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to set item in localStorage:', error);
      throw error;
    }
  },

  async deleteItemAsync(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to delete item from localStorage:', error);
      throw error;
    }
  },
};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
          revoke: (email: string, callback: () => void) => void;
        };
      };
    };
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        setIsGoogleLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  useEffect(() => {
    if (isGoogleLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, [isGoogleLoaded]);

  const handleGoogleResponse = async (response: any) => {
    console.log('Google response received:', response);
    try {
      setIsLoading(true);
      console.log('Making API call to:', `${API_URL}/auth/google`);
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      console.log('API response status:', res.status);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.message || 'Google login failed');
      }

      const data = await res.json();
      console.log('API success response:', data);
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      };

      setUser(user);
      console.log('User set in context:', user);
      await webStorage.setItemAsync('user', JSON.stringify(user));
      
      if (data.token) {
        await webStorage.setItemAsync('authToken', data.token);
        console.log('Token stored successfully');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await webStorage.getItemAsync('user');
        const storedToken = await webStorage.getItemAsync('authToken');
        
        if (storedUser && storedToken) {
          try {
            const response = await fetch(`${API_URL || 'http://127.0.0.1:8000/api'}/auth/verify`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              setUser(JSON.parse(storedUser));
            } else {
              await webStorage.deleteItemAsync('user');
              await webStorage.deleteItemAsync('authToken');
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL || 'http://127.0.0.1:8000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      };

      setUser(user);
      await webStorage.setItemAsync('user', JSON.stringify(user));
      
      if (data.token) {
        await webStorage.setItemAsync('authToken', data.token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    if (!isGoogleLoaded || !window.google) {
      throw new Error('Google Sign-In is not loaded');
    }
    
    return new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.prompt();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const signup = async (name: string, email: string, password: string, plan: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL || 'http://127.0.0.1:8000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, plan }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      };

      setUser(user);
      await webStorage.setItemAsync('user', JSON.stringify(user));
      
      if (data.token) {
        await webStorage.setItemAsync('authToken', data.token);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = async (plan: string): Promise<void> => {
    if (!isGoogleLoaded || !window.google) {
      throw new Error('Google Sign-In is not loaded');
    }

    return new Promise((resolve, reject) => {
      const originalCallback = window.google.accounts.id.initialize;
      
      // Temporarily override the callback to include plan
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/auth/google/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                credential: response.credential,
                plan: plan,
              }),
            });

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'Google signup failed');
            }

            const data = await res.json();
            const user: User = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
            };

            setUser(user);
            await webStorage.setItemAsync('user', JSON.stringify(user));
            
            if (data.token) {
              await webStorage.setItemAsync('authToken', data.token);
            }
            
            resolve();
          } catch (error) {
            console.error('Google signup failed:', error);
            reject(error);
          } finally {
            setIsLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      try {
        window.google.accounts.id.prompt();
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async (): Promise<void> => {
    try {
      const token = await webStorage.getItemAsync('authToken');
      if (token) {
        try {
          await fetch(`${API_URL|| 'http://127.0.0.1:8000/api'}/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Server logout failed:', error);
        }
      }

      // Revoke Google access if user logged in with Google
      if (user && isGoogleLoaded && window.google) {
        try {
          window.google.accounts.id.revoke(user.email, () => {
            console.log('Google access revoked');
          });
        } catch (error) {
          console.error('Google revoke failed:', error);
        }
      }

      setUser(null);
      await webStorage.deleteItemAsync('user');
      await webStorage.deleteItemAsync('authToken');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const getAuthToken = async (): Promise<string | null> => {
    return await webStorage.getItemAsync('authToken');
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    signup,
    signupWithGoogle,
    logout,
    getAuthToken,
    isGoogleLoaded,
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};