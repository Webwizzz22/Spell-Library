import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while auth state is being determined
  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🪄</div>
          <p>Checking your magical credentials...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;
