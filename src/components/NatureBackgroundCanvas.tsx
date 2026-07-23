import React, { useEffect, useRef } from 'react';

interface NatureBackgroundCanvasProps {
  isDarkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'leaf' | 'pollen' | 'seed';
  color: string;
}

export const NatureBackgroundCanvas: React.FC<NatureBackgroundCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool setup
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 45);
    const particles: Particle[] = [];

    const lightColors = ['rgba(34, 197, 94, 0.45)', 'rgba(16, 185, 129, 0.5)', 'rgba(132, 204, 22, 0.4)', 'rgba(234, 179, 8, 0.35)'];
    const darkColors = ['rgba(52, 211, 153, 0.35)', 'rgba(74, 222, 128, 0.3)', 'rgba(163, 230, 53, 0.25)', 'rgba(250, 204, 21, 0.25)'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.3) * 0.8,
        speedY: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.2,
        type: Math.random() > 0.3 ? 'leaf' : 'pollen',
        color: isDarkMode
          ? darkColors[Math.floor(Math.random() * darkColors.length)]
          : lightColors[Math.floor(Math.random() * lightColors.length)],
      });
    }

    let windOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      windOffset += 0.005;
      const windForce = Math.sin(windOffset) * 0.4;

      particles.forEach((p) => {
        p.x += p.speedX + windForce;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'leaf') {
          // Draw leaf shape
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size, 0, 0, -p.size);
          ctx.fill();
          // Stem line
          ctx.beginPath();
          ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
          ctx.lineWidth = 0.8;
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size * 1.2);
          ctx.stroke();
        } else {
          // Pollen / glowing particle
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
