import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Magical Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Floating Magical Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: '#fbbf24',
              borderRadius: '50%',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪄</div>
          <h1 style={{
            fontSize: '32px',
            margin: '0 0 8px 0',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome Back, Wizard!
          </h1>
          <p style={{ 
            color: '#e5e7eb', 
            margin: 0, 
            fontSize: '16px',
            opacity: 0.8 
          }}>
            Sign in to continue your magical journey
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div style={{
          '--cl-colorPrimary': '#fbbf24',
          '--cl-colorBackground': 'transparent',
          '--cl-colorInputBackground': 'rgba(255, 255, 255, 0.1)',
          '--cl-colorInputText': '#ffffff',
          '--cl-colorText': '#ffffff',
          '--cl-colorTextSecondary': '#e5e7eb'
        }}>
          <SignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: {
                  width: '100%'
                },
                card: {
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                },
                headerTitle: {
                  display: 'none'
                },
                headerSubtitle: {
                  display: 'none'
                }
              }
            }}
          />
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', opacity: 0.7 }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            ✨ Enter the world of magical web development ✨
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
              opacity: 0.4;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignInPage;
