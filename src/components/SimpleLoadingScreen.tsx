'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SimpleLoadingScreenProps {
  onLoadingComplete: () => void;
}

const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-950 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-8"
        >
          🪄
        </motion.div>
        
        <h1 className="text-4xl font-bold text-amber-300 mb-4 font-serif">
          SpellAcademia
        </h1>
        
        <p className="text-xl text-purple-200 mb-8">
          Loading your magical journey...
        </p>
        
        <div className="w-64 bg-purple-900/50 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <p className="text-purple-300 text-sm">
          {progress}% Complete
        </p>
      </div>
    </div>
  );
};

export default SimpleLoadingScreen;
