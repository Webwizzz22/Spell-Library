import React, { useEffect, useRef, useCallback } from 'react';

interface OptimizedMagicalParticlesProps {
  count?: number;
  theme?: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | 'mystical';
  intensity?: 'light' | 'medium' | 'heavy';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'wand' | 'snitch' | 'feather' | 'hogwarts-letter' | 'lightning' | 'potion-bubble';
  rotation: number;
  rotationSpeed: number;
}

const OptimizedMagicalParticles: React.FC<OptimizedMagicalParticlesProps> = ({
  count = 20,
  theme = 'mystical',
  intensity = 'light'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);

  const getThemeConfig = useCallback(() => {
    switch (theme) {
      case 'gryffindor':
        return {
          colors: ['#DC143C', '#D4AF37', '#FFFF00', '#FF6B35'],
          particles: ['wand', 'lightning', 'feather', 'snitch'],
          background: 'transparent'
        };
      case 'slytherin':
        return {
          colors: ['#50C878', '#C0C0C0', '#2F4F2F', '#1A472A'],
          particles: ['wand', 'potion-bubble', 'snitch', 'lightning'],
          background: 'transparent'
        };
      case 'hufflepuff':
        return {
          colors: ['#FFDB00', '#000000', '#F0C75E', '#FFE135'],
          particles: ['wand', 'feather', 'potion-bubble', 'hogwarts-letter'],
          background: 'transparent'
        };
      case 'ravenclaw':
        return {
          colors: ['#0F52BA', '#946B2D', '#5D5D5D', '#4169E1'],
          particles: ['wand', 'feather', 'hogwarts-letter', 'snitch'],
          background: 'transparent'
        };
      default:
        return {
          colors: ['#D4AF37', '#FFD700', '#9370DB', '#4B0082'],
          particles: ['wand', 'lightning', 'feather', 'snitch'],
          background: 'transparent'
        };
    }
  }, [theme]);

  const getIntensitySettings = useCallback(() => {
    switch (intensity) {
      case 'light':
        return { speed: 0.2, size: 1.2, opacity: 0.3, fps: 30 };
      case 'medium':
        return { speed: 0.4, size: 1.8, opacity: 0.5, fps: 45 };
      case 'heavy':
        return { speed: 0.6, size: 2.2, opacity: 0.7, fps: 60 };
      default:
        return { speed: 0.2, size: 1.2, opacity: 0.3, fps: 30 };
    }
  }, [intensity]);

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const themeConfig = getThemeConfig();
    const intensitySettings = getIntensitySettings();
    const particleTypes = themeConfig.particles;
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: (Math.random() * 1.5 + 0.8) * intensitySettings.size,
      speedX: (Math.random() - 0.5) * intensitySettings.speed,
      speedY: (Math.random() - 0.5) * intensitySettings.speed,
      opacity: Math.random() * intensitySettings.opacity,
      color: themeConfig.colors[Math.floor(Math.random() * themeConfig.colors.length)],
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)] as any,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5
    };
  }, [getThemeConfig, getIntensitySettings]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 1;
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);

    switch (particle.type) {
      case 'wand':
        // Draw magic wand
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-particle.size * 0.1, -particle.size * 0.8, particle.size * 0.2, particle.size * 1.2);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, -particle.size * 0.6, particle.size * 0.3, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case 'snitch':
        // Draw golden snitch
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.4, 0, 2 * Math.PI);
        ctx.fill();
        // Wings
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * 0.7;
        ctx.beginPath();
        ctx.ellipse(-particle.size * 0.4, 0, particle.size * 0.25, particle.size * 0.08, -Math.PI / 6, 0, 2 * Math.PI);
        ctx.ellipse(particle.size * 0.4, 0, particle.size * 0.25, particle.size * 0.08, Math.PI / 6, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case 'feather':
        // Draw phoenix feather
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size * 0.15, particle.size * 0.8, 0, 0, 2 * Math.PI);
        ctx.fill();
        // Feather spine
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -particle.size * 0.7);
        ctx.lineTo(0, particle.size * 0.7);
        ctx.stroke();
        // Feather details
        for (let i = -3; i <= 3; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * particle.size * 0.2);
          ctx.lineTo(particle.size * 0.1 * (1 - Math.abs(i) * 0.2), i * particle.size * 0.2);
          ctx.stroke();
        }
        break;

      case 'hogwarts-letter':
        // Draw Hogwarts letter
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(-particle.size * 0.3, -particle.size * 0.4, particle.size * 0.6, particle.size * 0.8);
        ctx.fillStyle = particle.color;
        ctx.font = `${particle.size * 0.4}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText('H', 0, particle.size * 0.1);
        break;

      case 'lightning':
        // Draw lightning bolt (Harry's scar)
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.15;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -particle.size * 0.6);
        ctx.lineTo(particle.size * 0.2, -particle.size * 0.2);
        ctx.lineTo(-particle.size * 0.1, -particle.size * 0.1);
        ctx.lineTo(particle.size * 0.1, particle.size * 0.2);
        ctx.lineTo(0, particle.size * 0.6);
        ctx.stroke();
        break;

      case 'potion-bubble':
        // Draw magical potion bubble
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity * 0.6;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        // Inner highlight
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(-particle.size * 0.1, -particle.size * 0.1, particle.size * 0.2, 0, 2 * Math.PI);
        ctx.fill();
        break;

      default:
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.restore();
  }, []);

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement, deltaTime: number) => {
    particle.x += particle.speedX * deltaTime * 60;
    particle.y += particle.speedY * deltaTime * 60;
    particle.rotation += particle.rotationSpeed * deltaTime * 60;

    // Wrap around screen
    if (particle.x < -50) particle.x = canvas.width + 50;
    if (particle.x > canvas.width + 50) particle.x = -50;
    if (particle.y < -50) particle.y = canvas.height + 50;
    if (particle.y > canvas.height + 50) particle.y = -50;

    // Subtle opacity breathing
    particle.opacity += Math.sin(Date.now() * 0.002 + particle.x * 0.01) * 0.005;
    particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 1/20); // Cap at 20fps minimum for performance
    lastTimeRef.current = currentTime;

    const intensitySettings = getIntensitySettings();
    const targetFPS = intensitySettings.fps;
    const frameInterval = 1000 / targetFPS;

    // Only render if enough time has passed (FPS throttling)
    if (deltaTime * 1000 < frameInterval) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas, deltaTime);
      drawParticle(ctx, particle);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticle, getIntensitySettings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    
    const handleResize = () => {
      resizeCanvas();
      // Recreate particles on resize to maintain density
      particlesRef.current = Array.from({ length: count }, () => createParticle(canvas));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => createParticle(canvas));

    // Start animation
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, createParticle, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default OptimizedMagicalParticles;
