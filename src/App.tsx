import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import SpellDashboard from './components/SpellDashboard';
import SpellLesson from './components/SpellLesson';
import Spellbook from './components/Spellbook';
import EnhancedCharacters from './components/EnhancedCharacters';
import Journey from './components/Journey';
import NotFound from './components/NotFound';
import EnhancedNavbar from './components/EnhancedNavbar';
import SimpleLoadingScreen from './components/SimpleLoadingScreen';
import OptimizedMagicalParticles from './components/OptimizedMagicalParticles';
import MagicCursor from './components/MagicCursor';
import SoundManager from './components/SoundManager';
import { User, SpellProgress } from './types';

function App() {
  const { user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<SpellProgress[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    // If user is signed in with Clerk, create or load their SpellAcademia profile
    if (clerkUser) {
      const savedUser = localStorage.getItem(`spellAcademia_${clerkUser.id}`);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Create new SpellAcademia profile for Clerk user
        const newUser: User = {
          id: clerkUser.id,
          name: clerkUser.firstName || clerkUser.username || 'Young Wizard',
          house: 'gryffindor', // Default house, will be changed by sorting hat
          level: 1,
          totalXP: 0,
          joinedAt: new Date(),
          discoveredSpells: [],
          favoriteCharacters: [],
          visitedLocations: [],
        };
        setUser(newUser);
        localStorage.setItem(`spellAcademia_${clerkUser.id}`, JSON.stringify(newUser));
      }

      const savedProgress = localStorage.getItem(`spellAcademiaProgress_${clerkUser.id}`);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    } else {
      // User is signed out
      setUser(null);
      setUserProgress([]);
    }

    const savedSoundPreference = localStorage.getItem('spellAcademiaSoundEnabled');
    if (savedSoundPreference !== null) {
      setSoundEnabled(JSON.parse(savedSoundPreference));
    }

    // Simulate loading time for enhanced experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [clerkUser, isLoaded]);

  const saveUserProgress = (progress: SpellProgress[]) => {
    if (!clerkUser || !user) return;
    
    setUserProgress(progress);
    localStorage.setItem(`spellAcademiaProgress_${clerkUser.id}`, JSON.stringify(progress));
    
    // Update user XP and level
    const totalXP = progress
      .filter(p => p.completed)
      .reduce((sum, p) => sum + (p.xpEarned || 0), 0);
    
    const newLevel = Math.floor(totalXP / 500) + 1;
    const updatedUser = { ...user, totalXP, level: newLevel };
    setUser(updatedUser);
    localStorage.setItem(`spellAcademia_${clerkUser.id}`, JSON.stringify(updatedUser));
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('spellAcademiaSoundEnabled', JSON.stringify(enabled));
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading || !isLoaded) {
    return <SimpleLoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 relative overflow-hidden">
      {/* Magic Cursor - Always visible but optimized */}
      <MagicCursor theme={user?.house || 'default'} />
      
      {/* Ultra-minimal Magical Background for optimal performance */}
      <OptimizedMagicalParticles 
        count={user ? 3 : 5}
        theme={user ? user.house : 'mystical'}
        intensity="light"
      />
      
      {/* Simplified atmospheric elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-black/20"></div>
      </div>

      <SoundManager enabled={soundEnabled} />
      
      <Router>
        {user && (
          <EnhancedNavbar 
            user={user} 
            onSoundToggle={handleSoundToggle} 
            soundEnabled={soundEnabled} 
          />
        )}
        
        <AnimatePresence mode="wait">
          <Routes>
              <Route 
                path="/" 
                element={
                  clerkUser && user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LandingPage 
                      onEnterAcademy={(newUser) => {
                        setUser(newUser);
                        if (clerkUser) {
                          localStorage.setItem(`spellAcademia_${clerkUser.id}`, JSON.stringify(newUser));
                        }
                      }} 
                    />
                  )
                } 
              />
              
              <Route 
                path="/dashboard" 
                element={
                  clerkUser && user ? (
                    <SpellDashboard 
                      user={user} 
                      userProgress={userProgress}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/characters" 
                element={
                  clerkUser && user ? (
                    <EnhancedCharacters />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/journey" 
                element={
                  clerkUser && user ? (
                    <Journey 
                      user={user} 
                      userProgress={userProgress}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/spell/:spellId" 
                element={
                  clerkUser && user ? (
                    <SpellLesson 
                      user={user} 
                      userProgress={userProgress}
                      onUpdateProgress={saveUserProgress}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/spellbook" 
                element={
                  clerkUser && user ? (
                    <Spellbook 
                      user={user} 
                      userProgress={userProgress} 
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* 404 Page with Spell Guessing Game */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Router>
    </div>
  );
}

export default App;