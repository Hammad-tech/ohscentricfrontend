import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/context/AuthContext';

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

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

  if (user) {
    return <Navigate to="/chatbot" replace />;
  }

  return <>{children}</>;
};