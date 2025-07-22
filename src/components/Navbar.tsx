import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Users, 
  Map, 
  Volume2, 
  VolumeX, 
  Wand2, 
  Star,
  Trophy,
  Menu,
  X
} from 'lucide-react';
import { soundLibrary } from './SoundManager';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType;
  onSoundToggle: (enabled: boolean) => void;
  soundEnabled: boolean;
}

const houseColors = {
  gryffindor: { 
    primary: '#740001', 
    secondary: '#D3A625', 
    accent: '#FFD700',
    glow: 'rgba(212, 175, 55, 0.6)'
  },
  hufflepuff: { 
    primary: '#ECB939', 
    secondary: '#372E29', 
    accent: '#FFEB3B',
    glow: 'rgba(236, 185, 57, 0.6)'
  },
  ravenclaw: { 
    primary: '#0E1A40', 
    secondary: '#946B2D', 
    accent: '#2196F3',
    glow: 'rgba(33, 150, 243, 0.6)'
  },
  slytherin: { 
    primary: '#1A472A', 
    secondary: '#AAAAAA', 
    accent: '#4CAF50',
    glow: 'rgba(76, 175, 80, 0.6)'
  }
};

const Navbar: React.FC<NavbarProps> = ({ user, onSoundToggle, soundEnabled }) => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      to: '/dashboard', 
      icon: Home, 
      label: 'Spell Dashboard',
      description: 'Your magical learning center'
    },
    { 
      to: '/characters', 
      icon: Users, 
      label: 'Characters',
      description: 'Meet the wizarding world'
    },
    { 
      to: '/journey', 
      icon: Map, 
      label: 'Journey',
      description: 'Explore magical locations'
    },
    { 
      to: '/spellbook', 
      icon: BookOpen, 
      label: 'My Spellbook',
      description: 'Your collection of mastered spells'
    },
  ];

  const getXPProgress = () => {
    const currentLevelXP = (user.level - 1) * 500;
    const nextLevelXP = user.level * 500;
    const progressXP = user.totalXP - currentLevelXP;
    const levelXPRange = nextLevelXP - currentLevelXP;
    return (progressXP / levelXPRange) * 100;
  };

  return (
    <>
      {/* Completely Transparent Glass Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-black/10 backdrop-blur-[2px]' 
            : 'bg-transparent'
        }`}
        style={{
          background: isScrolled 
            ? `linear-gradient(135deg, 
                rgba(0, 0, 0, 0.05) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0.05) 100%)`
            : 'transparent'
        }}
      >
        {/* Magical glass effect overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                `linear-gradient(45deg, ${houseColor.glow} 0%, transparent 50%, ${houseColor.glow} 100%)`,
                `linear-gradient(135deg, transparent 0%, ${houseColor.glow} 50%, transparent 100%)`,
                `linear-gradient(225deg, ${houseColor.glow} 0%, transparent 50%, ${houseColor.glow} 100%)`
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Liquid glass ripples */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${houseColor.accent}, transparent)`
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ 
                  rotate: [0, 10, -10, 0], 
                  scale: 1.1,
                  filter: `drop-shadow(0 0 20px ${houseColor.accent})`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="relative p-3 rounded-full"
                style={{ 
                  background: `linear-gradient(135deg, ${houseColor.primary}99, ${houseColor.secondary}99)`,
                  border: `2px solid ${houseColor.accent}66`,
                  boxShadow: `0 0 30px ${houseColor.glow}`
                }}
              >
                <Wand2 className="w-6 h-6 text-white relative z-10" />
                
                {/* Magical sparkles around logo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0 0'
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: i * 45,
                        x: 25,
                        y: -2
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
              
              <div>
                <motion.span 
                  className="text-xl font-bold font-serif bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent"
                  whileHover={{ 
                    textShadow: `0 0 20px ${houseColor.accent}`,
                    scale: 1.05
                  }}
                  style={{
                    filter: `drop-shadow(0 0 10px ${houseColor.glow})`
                  }}
                >
                  Wizarding World
                </motion.span>
                <p className="text-xs capitalize" style={{ color: houseColor.accent }}>
                  {user.house} House
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative group"
                  onMouseEnter={() => {
                    setHoveredItem(item.to);
                    soundLibrary.play('hover');
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: location.pathname === item.to 
                        ? `linear-gradient(135deg, ${houseColor.primary}66, ${houseColor.secondary}66)`
                        : 'transparent',
                      border: location.pathname === item.to 
                        ? `1px solid ${houseColor.accent}66`
                        : '1px solid transparent',
                      boxShadow: location.pathname === item.to 
                        ? `0 0 20px ${houseColor.glow}`
                        : 'none'
                    }}
                  >
                    <item.icon 
                      className="w-5 h-5 transition-colors duration-300"
                      style={{
                        color: location.pathname === item.to 
                          ? houseColor.accent 
                          : '#e5e7eb'
                      }}
                    />
                    <span 
                      className="text-sm font-medium transition-colors duration-300"
                      style={{
                        color: location.pathname === item.to 
                          ? 'white' 
                          : '#e5e7eb'
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>

                  {/* Active indicator */}
                  {location.pathname === item.to && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${houseColor.accent}, ${houseColor.secondary}, ${houseColor.accent})`
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === item.to && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50"
                        style={{
                          background: `linear-gradient(135deg, ${houseColor.primary}CC, ${houseColor.secondary}CC)`,
                          border: `1px solid ${houseColor.accent}66`,
                          boxShadow: `0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px ${houseColor.glow}`
                        }}
                      >
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-gray-300 text-xs">{item.description}</p>
                        
                        {/* Tooltip arrow */}
                        <div 
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                          style={{ backgroundColor: houseColor.primary }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>

            {/* User Profile & Controls */}
            <div className="flex items-center space-x-4">
              {/* Sound Toggle */}
              <motion.button
                onClick={() => {
                  onSoundToggle(!soundEnabled);
                  soundLibrary.play('wand');
                }}
                onMouseEnter={() => soundLibrary.play('hover')}
                className="p-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: `linear-gradient(135deg, ${houseColor.primary}66, ${houseColor.secondary}66)`,
                  border: `1px solid ${houseColor.accent}66`,
                  boxShadow: `0 0 15px ${houseColor.glow}`
                }}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-white" />
                ) : (
                  <VolumeX className="w-5 h-5 text-red-400" />
                )}
              </motion.button>

              {/* User Profile */}
              <motion.div 
                className="flex items-center space-x-3 px-4 py-3 rounded-xl"
                whileHover={{ scale: 1.02 }}
                style={{
                  background: `linear-gradient(135deg, ${houseColor.primary}66, ${houseColor.secondary}66)`,
                  border: `1px solid ${houseColor.accent}66`,
                  boxShadow: `0 0 20px ${houseColor.glow}`
                }}
              >
                {/* Avatar */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${houseColor.accent}, ${houseColor.secondary})`
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="hidden sm:block">
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <Star className="w-3 h-3" style={{ color: houseColor.accent }} />
                    <span className="text-xs text-gray-300">Level {user.level}</span>
                    <Trophy className="w-3 h-3" style={{ color: houseColor.accent }} />
                    <span className="text-xs text-gray-300">{user.totalXP} XP</span>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="hidden md:block w-16">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${houseColor.accent}, ${houseColor.secondary})`
                      }}
                      animate={{ width: `${getXPProgress()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.round(getXPProgress())}%
                  </p>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg"
                style={{ color: houseColor.accent }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t"
              style={{ 
                borderColor: `${houseColor.accent}33`,
                background: `linear-gradient(135deg, ${houseColor.primary}CC, ${houseColor.secondary}CC)`
              }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      background: location.pathname === item.to 
                        ? `${houseColor.accent}33`
                        : 'transparent'
                    }}
                  >
                    <item.icon 
                      className="w-5 h-5"
                      style={{ color: houseColor.accent }}
                    />
                    <span className="text-white font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
