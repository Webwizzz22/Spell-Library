import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
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
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '16px',
              opacity: 0.3,
              animation: `sparkle ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)]}
          </div>
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧙‍♂️</div>
          <h1 style={{
            fontSize: '32px',
            margin: '0 0 8px 0',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Join SpellAcademia!
          </h1>
          <p style={{ 
            color: '#e5e7eb', 
            margin: 0, 
            fontSize: '16px',
            opacity: 0.8 
          }}>
            Begin your magical journey into web development
          </p>
        </div>

        {/* House Selection Hint */}
        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '24px'
        }}>
          <p style={{ fontSize: '14px', margin: 0, color: '#fbbf24' }}>
            🏰 After signing up, you'll be sorted into your Hogwarts house!
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div style={{
          '--cl-colorPrimary': '#fbbf24',
          '--cl-colorBackground': 'transparent',
          '--cl-colorInputBackground': 'rgba(255, 255, 255, 0.1)',
          '--cl-colorInputText': '#ffffff',
          '--cl-colorText': '#ffffff',
          '--cl-colorTextSecondary': '#e5e7eb'
        }}>
          <SignUp 
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
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
            🎓 Ready to become a web development wizard? 🎓
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { 
              transform: scale(0.8) rotate(0deg);
              opacity: 0.2;
            }
            50% { 
              transform: scale(1.2) rotate(180deg);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignUpPage;
