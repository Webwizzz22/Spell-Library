import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SpellDashboard from './components/SpellDashboard';
import SpellLesson from './components/SpellLesson';
import Spellbook from './components/Spellbook';
import Characters from './components/Characters';
import EnhancedCharacters from './components/EnhancedCharacters';
import Journey from './components/Journey';
import NotFound from './components/NotFound';
import EnhancedNavbar from './components/EnhancedNavbar';
import EnhancedLoadingScreen from './components/EnhancedLoadingScreen';
import SimpleLoadingScreen from './components/SimpleLoadingScreen';
import OptimizedMagicalParticles from './components/OptimizedMagicalParticles';
import MagicCursor from './components/MagicCursor';
import PageTransition from './components/PageTransition';
import SoundManager from './components/SoundManager';
import { User, SpellProgress } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<SpellProgress[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('spellAcademiaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedProgress = localStorage.getItem('spellAcademiaProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedSoundPreference = localStorage.getItem('spellAcademiaSoundEnabled');
    if (savedSoundPreference !== null) {
      setSoundEnabled(JSON.parse(savedSoundPreference));
    }

    // Simulate loading time for enhanced experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const saveUserProgress = (progress: SpellProgress[]) => {
    setUserProgress(progress);
    localStorage.setItem('spellAcademiaProgress', JSON.stringify(progress));
    
    // Update user XP and level
    if (user) {
      const totalXP = progress
        .filter(p => p.completed)
        .reduce((sum, p) => sum + (p.xpEarned || 0), 0);
      
      const newLevel = Math.floor(totalXP / 500) + 1;
      const updatedUser = { ...user, totalXP, level: newLevel };
      setUser(updatedUser);
      localStorage.setItem('spellAcademiaUser', JSON.stringify(updatedUser));
    }
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('spellAcademiaSoundEnabled', JSON.stringify(enabled));
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const getHouseColors = () => {
    if (!user) return undefined;
    
    const houseColorMap = {
      gryffindor: {
        primary: '#740001',
        secondary: '#D3A625',
        accent: '#FFD700'
      },
      hufflepuff: {
        primary: '#ECB939',
        secondary: '#372E29',
        accent: '#FFEB3B'
      },
      ravenclaw: {
        primary: '#0E1A40',
        secondary: '#946B2D',
        accent: '#2196F3'
      },
      slytherin: {
        primary: '#1A472A',
        secondary: '#AAAAAA',
        accent: '#4CAF50'
      }
    };

    return houseColorMap[user.house];
  };

  if (isLoading) {
    return <SimpleLoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 relative overflow-hidden">
      {/* Magic Cursor - Always visible */}
      <MagicCursor theme={user?.house || 'default'} />
      
      {/* Enhanced Magical Background */}
      <OptimizedMagicalParticles 
        count={user ? 20 : 30}
        theme={user ? user.house : 'mystical'}
        intensity="light"
      />
      
      {/* Additional atmospheric elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/images/hogwarts-silhouette.svg')] bg-bottom bg-no-repeat bg-contain opacity-5"></div>
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
        
        <PageTransition>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LandingPage 
                      onEnterAcademy={(newUser) => {
                        setUser(newUser);
                        localStorage.setItem('spellAcademiaUser', JSON.stringify(newUser));
                      }} 
                    />
                  )
                } 
              />
              
              <Route 
                path="/dashboard" 
                element={
                  user ? (
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
                  user ? (
                    <EnhancedCharacters />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/journey" 
                element={
                  user ? (
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
                  user ? (
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
                  user ? (
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
        </PageTransition>
      </Router>
    </div>
  );
}

export default App;