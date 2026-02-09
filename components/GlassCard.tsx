
import React from 'react';

interface GlassCardProps {
  note: string;
  isAnimating: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ note, isAnimating }) => {
  return (
    <div className={`
      relative w-full aspect-[4/3] rounded-[3rem] 
      bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(255,182,193,0.3)]
      flex items-center justify-center p-10 md:p-14
      transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
      ${isAnimating ? 'scale-90 opacity-40 blur-sm' : 'scale-100 opacity-100 blur-0'}
    `}>
      {/* Soft inner glow */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
      
      {/* Inner decorative double border */}
      <div className="absolute inset-6 rounded-[2.2rem] border border-pink-200/20 pointer-events-none"></div>
      <div className="absolute inset-8 rounded-[1.8rem] border border-pink-100/10 pointer-events-none"></div>

      <div className="text-center w-full">
        <div className={`
          transition-all duration-700 delay-100
          ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          <p className="dancing-script text-2xl md:text-3xl text-gray-700 leading-relaxed drop-shadow-sm">
            {note}
          </p>
          
          {/* Decorative icons */}
          <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
             <div className="h-[1px] w-8 bg-pink-300"></div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
             <div className="h-[1px] w-8 bg-pink-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
