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

    // Nouvelle palette : Verts pastels, Émeraude et une touche d'Or
    const colors = ['#a7f3d0', '#6ee7b7', '#34d399', '#fef3c7', '#059669'];
    
    const newParticles: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 10, // Un peu plus petit pour faire plus "poussière d'étoile"
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 1.5,
      rotation: Math.random() * 360
    }));

    setParticles(prev => [...prev, ...newParticles]);

    const timer = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 3500);

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
            color: p.color,
            position: 'fixed',
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          {/* SVG d'étoile (Sparkle) au lieu du cœur */}
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ 
              transform: `rotate(${p.rotation}deg)`,
              filter: 'drop-shadow(0 0 5px currentColor)' // Petit effet brillant
            }}
          >
            <path d="M12 1L14.39 8.26L22 9.27L16.45 14.46L18.18 22L12 17.77L5.82 22L7.55 14.46L2 9.27L9.61 8.26L12 1Z" />
          </svg>
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        .heart-particle {
          animation: fall linear forwards;
        }
      `}} />
    </>
  );
};

export default HeartConfetti;
