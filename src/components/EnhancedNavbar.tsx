import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Map, 
  Volume2, 
  VolumeX, 
  Wand2, 
  Star,
  Menu,
  X,
  Sparkles,
  Castle,
  Scroll
} from 'lucide-react';
import { soundLibrary } from './SoundManager';
import { User as UserType } from '../types';

interface EnhancedNavbarProps {
  user: UserType;
  onSoundToggle: (enabled: boolean) => void;
  soundEnabled: boolean;
}

const houseColors = {
  gryffindor: { 
    primary: 'rgba(116, 0, 1, 0.9)', 
    secondary: 'rgba(211, 166, 37, 0.8)', 
    accent: 'rgba(255, 215, 0, 0.9)',
    glow: 'rgba(212, 175, 55, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(116, 0, 1, 0.2) 0%, rgba(211, 166, 37, 0.1) 100%)'
  },
  hufflepuff: { 
    primary: 'rgba(236, 185, 57, 0.9)', 
    secondary: 'rgba(55, 46, 41, 0.8)', 
    accent: 'rgba(255, 235, 59, 0.9)',
    glow: 'rgba(236, 185, 57, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(236, 185, 57, 0.2) 0%, rgba(55, 46, 41, 0.1) 100%)'
  },
  ravenclaw: { 
    primary: 'rgba(14, 26, 64, 0.9)', 
    secondary: 'rgba(148, 107, 45, 0.8)', 
    accent: 'rgba(33, 150, 243, 0.9)',
    glow: 'rgba(33, 150, 243, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(14, 26, 64, 0.2) 0%, rgba(148, 107, 45, 0.1) 100%)'
  },
  slytherin: { 
    primary: 'rgba(26, 71, 42, 0.9)', 
    secondary: 'rgba(170, 170, 170, 0.8)', 
    accent: 'rgba(76, 175, 80, 0.9)',
    glow: 'rgba(76, 175, 80, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(26, 71, 42, 0.2) 0%, rgba(170, 170, 170, 0.1) 100%)'
  }
};

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ user, onSoundToggle, soundEnabled }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const houseColor = houseColors[user.house];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { 
      to: '/dashboard', 
      icon: Castle, 
      label: 'Great Hall',
      description: 'Your magical learning center',
      particles: '✨'
    },
    { 
      to: '/characters', 
      icon: Users, 
      label: 'Portraits',
      description: 'Meet the wizarding world',
      particles: '👥'
    },
    { 
      to: '/journey', 
      icon: Map, 
      label: 'Marauder\'s Map',
      description: 'Explore magical locations',
      particles: '🗺️'
    },
    { 
      to: '/spellbook', 
      icon: Scroll, 
      label: 'Grimoire',
      description: 'Your collection of mastered spells',
      particles: '📜'
    },
  ];

  const getXPProgress = () => {
    const currentLevelXP = (user.level - 1) * 500;
    const nextLevelXP = user.level * 500;
    const progressXP = user.totalXP - currentLevelXP;
    const levelXPRange = nextLevelXP - currentLevelXP;
    return Math.max(0, Math.min(100, (progressXP / levelXPRange) * 100));
  };

  const handleSoundToggle = () => {
    onSoundToggle(!soundEnabled);
    soundLibrary.play(soundEnabled ? 'buttonHover' : 'spellCast');
  };

  const handleNavClick = () => {
    soundLibrary.play('pageTransition');
    setIsMobileMenuOpen(false);
  };

  const liquidStyle = {
    background: `${houseColor.gradient}`,
    backdropFilter: 'blur(20px) saturate(200%)',
    border: `1px solid ${houseColor.glow}`,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 20px ${houseColor.glow}
    `,
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        style={liquidStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo and Brand */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Wand2 
                  className="w-8 h-8 text-yellow-400" 
                  style={{ filter: `drop-shadow(0 0 10px ${houseColor.accent})` }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1"
                >
                  <Star className="w-3 h-3 text-yellow-300" />
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col">
                <motion.h1 
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent font-serif"
                >
                  Hogwarts Library
                </motion.h1>
                <span className="text-xs text-gray-300 font-medium tracking-wider">
                  House of {user.house.charAt(0).toUpperCase() + user.house.slice(1)}
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <motion.div
                    key={item.to}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => {
                      setHoveredItem(item.to);
                      soundLibrary.play('buttonHover');
                    }}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative"
                  >
                    <Link
                      to={item.to}
                      onClick={() => handleNavClick()}
                      className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 group ${
                        isActive 
                          ? 'text-white shadow-lg' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={{
                        background: isActive ? houseColor.primary : 'transparent',
                        boxShadow: isActive ? `0 0 20px ${houseColor.glow}` : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                      
                      {/* Floating particles */}
                      <AnimatePresence>
                        {hoveredItem === item.to && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: -20 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg"
                          >
                            {item.particles}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredItem === item.to && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap backdrop-blur-sm border border-white/20"
                          >
                            {item.description}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/20"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* User Profile & Controls */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4"
            >
              {/* XP Progress */}
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-white">
                    Level {user.level}
                  </span>
                </div>
                <div className="w-24 h-2 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getXPProgress()}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                    style={{ 
                      boxShadow: `0 0 10px ${houseColor.accent}` 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-300 mt-1">
                  {user.totalXP} XP
                </span>
              </div>

              {/* Sound Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSoundToggle}
                className="p-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                style={{
                  background: `${houseColor.gradient}`,
                  boxShadow: soundEnabled ? `0 0 15px ${houseColor.glow}` : 'none'
                }}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-white" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
                style={{ background: `${houseColor.gradient}` }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 md:hidden"
            style={{
              ...liquidStyle,
              borderTop: 'none',
              borderRadius: '0 0 1rem 1rem'
            }}
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => handleNavClick()}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'text-white shadow-lg' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={{
                        background: isActive ? houseColor.primary : 'transparent',
                        boxShadow: isActive ? `0 0 20px ${houseColor.glow}` : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-400">{item.description}</div>
                      </div>
                      <span className="text-lg">{item.particles}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Mobile XP Display */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-3 rounded-xl border border-white/20 backdrop-blur-sm"
                style={{ background: `${houseColor.gradient}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">Level {user.level}</span>
                  <span className="text-gray-300 text-sm">{user.totalXP} XP</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getXPProgress()}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavbar;
