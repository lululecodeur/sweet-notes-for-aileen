import React from 'react';
import { LYRICS } from '../constants';

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LyricsModal: React.FC<LyricsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay - Changé en Slate (Gris-Bleu) très léger */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-2xl p-8 md:p-12 max-h-[85vh] flex flex-col animate-scale-in">
        {/* Bouton Fermer - Changé en Slate/Emerald */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          {/* Titre avec la nouvelle police Serif */}
          <h2 className="font-serif italic text-3xl text-slate-800 tracking-tight">Je l'aime à mourir</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600/60 font-medium mt-2">A melody that speaks of you</p>
        </div>

        <div className="overflow-y-auto pr-4 custom-scrollbar text-center">
          <pre className="whitespace-pre-wrap font-sans text-slate-600 leading-relaxed text-sm md:text-base italic opacity-90">
            {LYRICS}
          </pre>
        </div>
        
        {/* Icône finale - Changée en Étoile (Sparkle) */}
        <div className="mt-8 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-200 mx-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.143-6.857L1 12l6.857-2.143L11 3z" />
          </svg>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2); /* Emerald translucide */
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default LyricsModal;
