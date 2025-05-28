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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    signup,
    logout,
    getAuthToken,
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