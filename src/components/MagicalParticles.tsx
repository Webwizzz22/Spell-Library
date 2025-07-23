'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MagicalParticles: React.FC = () => {
  const particles = Array.from({ length: 60 }, (_, i) => i);
  const magicalSymbols = ['✨', '⭐', '🌟', '💫', '✦', '✧', '⚡', '🔮'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
            opacity: 0
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: -10,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20
          }}
          style={{
            boxShadow: '0 0 6px currentColor'
          }}
        />
      ))}
      
      {/* Floating magical symbols */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-yellow-300 text-lg"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: 0,
            rotate: 0
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) - 100,
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            ]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        >
          {magicalSymbols[Math.floor(Math.random() * magicalSymbols.length)]}
        </motion.div>
      ))}

      {/* Magical aurora effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Twinkling stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default MagicalParticles;