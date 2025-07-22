import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SpellDashboard from './components/SpellDashboard';
import SpellLesson from './components/SpellLesson';
import Spellbook from './components/Spellbook';
import Characters from './components/Characters';
import Journey from './components/Journey';
import NotFound from './components/NotFound';
import EnhancedNavbar from './components/EnhancedNavbar';
import EnhancedLoadingScreen from './components/EnhancedLoadingScreen';
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

  const getHouseTheme = (): 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | 'mystical' => {
    return user?.house || 'mystical';
  };

  if (isLoading) {
    return <EnhancedLoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Magic Cursor */}
      <MagicCursor theme={getHouseTheme()} />
      
      {/* Optimized Magical Background */}
      <OptimizedMagicalParticles 
        count={user ? 15 : 25}
        theme={getHouseTheme()}
        intensity="light"
      />
      
      {/* Harry Potter themed background gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 ${getHouseTheme()}-theme opacity-95`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        <div className="absolute inset-0 bg-[url('/images/hogwarts-silhouette.svg')] bg-bottom bg-no-repeat bg-contain opacity-10"></div>
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
                    <Characters />
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
