import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user, isLoaded } = useUser();

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
          <p>Loading your magical profile...</p>
        </div>
      </div>
    );
  }

  const houses = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];
  const userHouse = houses[Math.floor(Math.random() * houses.length)];

  const houseColors = {
    gryffindor: { bg: '#dc2626', secondary: '#fbbf24' },
    hufflepuff: { bg: '#fbbf24', secondary: '#1a1a2e' },
    ravenclaw: { bg: '#2563eb', secondary: '#e5e7eb' },
    slytherin: { bg: '#059669', secondary: '#e5e7eb' }
  };

  const houseEmojis = {
    gryffindor: '🦁',
    hufflepuff: '🦡',
    ravenclaw: '🦅',
    slytherin: '🐍'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)',
      color: 'white'
    }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🪄</span>
            <h1 style={{ margin: 0, fontSize: '20px', color: '#fbbf24' }}>
              SpellAcademia
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', opacity: 0.8 }}>
              Welcome, {user?.firstName || 'Wizard'}!
            </span>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: {
                    width: '40px',
                    height: '40px'
                  }
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Welcome Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '48px',
            margin: '0 0 16px 0',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to your magical journey! ⚡
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.8, margin: 0 }}>
            You've been sorted into <strong style={{ color: houseColors[userHouse].bg }}>
              {userHouse.charAt(0).toUpperCase() + userHouse.slice(1)}
            </strong> house! {houseEmojis[userHouse]}
          </p>
        </div>

        {/* House Card */}
        <div style={{
          background: `linear-gradient(135deg, ${houseColors[userHouse].bg}20, ${houseColors[userHouse].bg}10)`,
          border: `2px solid ${houseColors[userHouse].bg}50`,
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>
            {houseEmojis[userHouse]}
          </div>
          <h2 style={{
            fontSize: '32px',
            margin: '0 0 16px 0',
            color: houseColors[userHouse].bg
          }}>
            House {userHouse.charAt(0).toUpperCase() + userHouse.slice(1)}
          </h2>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
            Your magical learning journey begins here. Start with your first spell below!
          </p>
        </div>

        {/* Spells Grid */}
        <div>
          <h2 style={{
            fontSize: '24px',
            margin: '0 0 24px 0',
            color: '#fbbf24'
          }}>
            Available Spells
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              { name: 'Alohomora', topic: 'HTML Basics', icon: '🔓', description: 'Unlock the structure of the web' },
              { name: 'Lumos', topic: 'CSS Styling', icon: '💡', description: 'Illuminate your pages with style' },
              { name: 'Expecto Patronum', topic: 'JavaScript Magic', icon: '⚡', description: 'Defend against bugs with logic' }
            ].map((spell, index) => (
              <div
                key={spell.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.borderColor = 'rgba(251, 191, 36, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {spell.icon}
                </div>
                <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>
                  {spell.name}
                </h3>
                <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>
                  {spell.topic}
                </p>
                <p style={{ fontSize: '14px', margin: '0 0 16px 0', opacity: 0.9 }}>
                  {spell.description}
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                  color: '#1a1a2e',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}>
                  {index === 0 ? 'Start Learning' : 'Coming Soon'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
