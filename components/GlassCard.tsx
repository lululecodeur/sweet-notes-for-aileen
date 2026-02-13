import React from 'react';

interface GlassCardProps {
  note: string;
  isAnimating: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ note, isAnimating }) => {
  return (
    <div className={`
      relative w-full aspect-[4/3] rounded-[2rem] 
      bg-white/40 backdrop-blur-2xl border border-white/60 
      /* Ombre plus neutre et subtile */
      shadow-[0_20px_50px_rgba(15,23,42,0.08)]
      flex items-center justify-center p-10 md:p-14
      transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
      ${isAnimating ? 'scale-90 opacity-40 blur-sm' : 'scale-100 opacity-100 blur-0'}
    `}>
      {/* Soft inner glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
      
      {/* Bordures décoratives : Changées en Vert Sauge très discret */}
      <div className="absolute inset-6 rounded-[1.5rem] border border-emerald-200/20 pointer-events-none"></div>
      <div className="absolute inset-8 rounded-[1.2rem] border border-emerald-100/10 pointer-events-none"></div>

      <div className="text-center w-full">
        <div className={`
          transition-all duration-700 delay-100
          ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          {/* Police Serif élégante pour le message */}
          <p className="font-serif text-xl md:text-2xl text-slate-700 leading-relaxed italic">
            "{note}"
          </p>
          
          {/* Séparateur décoratif : Étoile au lieu du cœur */}
          <div className="mt-8 flex items-center justify-center gap-4 opacity-20">
             <div className="h-[1px] w-8 bg-slate-400"></div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.143-6.857L1 12l6.857-2.143L11 3z" />
             </svg>
             <div className="h-[1px] w-8 bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
