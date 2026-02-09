
import React, { useEffect, useState } from 'react';

interface HeartConfettiProps {
  trigger: number;
}

interface Particle {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: number;
  rotation: number;
}

const HeartConfetti: React.FC<HeartConfettiProps> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = ['#ff8fab', '#fb6f92', '#ffc2d1', '#ffe5ec', '#ffb3c1'];
    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 2,
      rotation: Math.random() * 360
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup old particles
    const timer = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 4000);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="heart-particle"
          style={{
            left: p.left,
            bottom: '-50px',
            animationDuration: `${p.duration}s`,
            color: p.color
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default HeartConfetti;
