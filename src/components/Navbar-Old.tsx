import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Home, User, Wand2, Volume2, VolumeX } from 'lucide-react';
import { User as UserType } from '../types';
import { soundLibrary } from './SoundManager';

interface NavbarProps {
  user: UserType;
  onSoundToggle: (enabled: boolean) => void;
  soundEnabled: boolean;
}

const houseColors = {
  gryffindor: { primary: '#740001', secondary: '#D3A625', accent: '#FFD700' },
  hufflepuff: { primary: '#ECB939', secondary: '#372E29', accent: '#FFEB3B' },
  ravenclaw: { primary: '#0E1A40', secondary: '#946B2D', accent: '#2196F3' },
  slytherin: { primary: '#1A472A', secondary: '#AAAAAA', accent: '#4CAF50' }
};

const Navbar: React.FC<NavbarProps> = ({ user, onSoundToggle, soundEnabled }) => {
  const location = useLocation();
  const houseColor = houseColors[user.house];

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Spell Dashboard' },
    { to: '/spellbook', icon: BookOpen, label: 'My Spellbook' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b-2 border-amber-400/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              className="p-3 rounded-full border-2 relative overflow-hidden"
              style={{ 
                backgroundColor: houseColor.primary,
                borderColor: houseColor.secondary
              }}
            >
              <Wand2 className="w-6 h-6 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div>
              <motion.span 
                className="text-xl font-bold text-amber-300 font-serif"
                whileHover={{ textShadow: '0 0 10px #fbbf24' }}
              >
                SpellAcademia
              </motion.span>
              <p className="text-xs text-purple-300 capitalize">
                {user.house} House
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group"
                onMouseEnter={() => soundLibrary.play('hover')}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 border-2 ${
                    location.pathname === item.to
                      ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 text-amber-300 border-amber-400/50 shadow-lg shadow-purple-500/20'
                      : 'text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-700/30 hover:to-indigo-700/30 border-transparent hover:border-purple-500/30'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:inline font-serif">{item.label}</span>
                </motion.div>
                
                {location.pathname === item.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Sound Toggle */}
            <motion.button
              onClick={() => onSoundToggle(!soundEnabled)}
              onMouseEnter={() => soundLibrary.play('hover')}
              className="p-3 rounded-lg bg-purple-700/30 border-2 border-purple-500/30 text-purple-200 hover:text-white hover:bg-purple-600/40 hover:border-purple-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>

            {/* User Profile */}
            <motion.div 
              className="flex items-center space-x-3 px-4 py-3 bg-black/30 rounded-full border-2 relative overflow-hidden"
              style={{ borderColor: houseColor.secondary }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 relative"
                style={{ 
                  backgroundColor: houseColor.primary,
                  borderColor: houseColor.accent
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <User className="w-5 h-5 text-white" />
                {/* Level indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {user.level}
                </motion.div>
              </motion.div>
              
              <div className="hidden sm:block">
                <p className="text-sm text-white font-bold font-serif">{user.name}</p>
                <div className="flex items-center gap-2">
                  <p 
                    className="text-xs capitalize font-serif"
                    style={{ color: houseColor.secondary }}
                  >
                    {user.house}
                  </p>
                  <span className="text-xs text-amber-400">•</span>
                  <p className="text-xs text-amber-400 font-bold">
                    {user.totalXP} XP
                  </p>
                </div>
              </div>

              {/* Magical glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-20"
                style={{ backgroundColor: houseColor.accent }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;