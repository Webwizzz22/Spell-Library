import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MagicalParticlesProps {
  count?: number;
  colors?: string[];
  theme?: 'golden' | 'mystical' | 'dark' | 'rainbow' | 'house';
  intensity?: 'light' | 'medium' | 'heavy';
  houseColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const MagicalParticles: React.FC<MagicalParticlesProps> = ({
  count = 50,
  colors = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'],
  theme = 'mystical',
  intensity = 'medium',
  houseColors
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  const getThemeColors = () => {
    switch (theme) {
      case 'golden':
        return ['#FFD700', '#FFA500', '#FFEB3B', '#FF8F00', '#FFC107'];
      case 'mystical':
        return ['#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4'];
      case 'dark':
        return ['#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD'];
      case 'rainbow':
        return ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
      case 'house':
        return houseColors ? [houseColors.primary, houseColors.secondary, houseColors.accent] : colors;
      default:
        return colors;
    }
  };

  const getIntensitySettings = () => {
    switch (intensity) {
      case 'light':
        return { speed: 0.5, size: 2, opacity: 0.3 };
      case 'medium':
        return { speed: 1, size: 3, opacity: 0.5 };
      case 'heavy':
        return { speed: 1.5, size: 4, opacity: 0.7 };
      default:
        return { speed: 1, size: 3, opacity: 0.5 };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const themeColors = getThemeColors();
    const settings = getIntensitySettings();

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * settings.speed,
          vy: (Math.random() - 0.5) * settings.speed,
          size: Math.random() * settings.size + 1,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
          opacity: Math.random() * settings.opacity + 0.1,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life and twinkle
        particle.life++;
        particle.twinkle += particle.twinkleSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate dynamic opacity with twinkling effect
        const lifeFactor = 1 - (particle.life / particle.maxLife);
        const twinkleFactor = (Math.sin(particle.twinkle) + 1) * 0.5;
        const currentOpacity = particle.opacity * lifeFactor * (0.5 + twinkleFactor * 0.5);

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.globalAlpha = currentOpacity * 1.5;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Reset particle if life exceeded
        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
          particle.maxLife = 100 + Math.random() * 100;
          particle.vx = (Math.random() - 0.5) * settings.speed;
          particle.vy = (Math.random() - 0.5) * settings.speed;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, colors, theme, intensity, houseColors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />
      
      {/* Additional floating elements for extra magic */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
          >
            ✨
          </motion.div>
        ))}
        
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-2xl opacity-30"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [0, -180],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
            style={{
              right: `${10 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
          >
            ⭐
          </motion.div>
        ))}

        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`spell-${i}`}
            className="absolute text-3xl opacity-25"
            animate={{
              x: [0, 60, -60, 0],
              y: [0, -40, 40, 0],
              rotate: [0, 180, 360],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 4,
            }}
            style={{
              left: `${50 + Math.sin(i) * 30}%`,
              top: `${60 + Math.cos(i) * 20}%`,
            }}
          >
            🌟
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MagicalParticles;
