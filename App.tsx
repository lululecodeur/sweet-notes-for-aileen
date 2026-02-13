import React, { useState, useCallback, useEffect } from 'react';
import { sweetNotes } from './constants';
import GlassCard from './components/GlassCard';
import HeartConfetti from './components/HeartConfetti'; // Note: Tu pourras renommer ce composant plus tard
import RelationshipCounter from './components/RelationshipCounter';
import LyricsModal from './components/LyricsModal';

/**
 * Utility to shuffle an array (Fisher-Yates)
 */
const shuffle = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const j_rand = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j_rand]] = [newArray[j_rand], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("Click below to find a sweet surprise...");
  const [deck, setDeck] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [triggerConfetti, setTriggerConfetti] = useState<number>(0);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  useEffect(() => {
    const indices = Array.from({ length: sweetNotes.length }, (_, i) => i);
    setDeck(shuffle(indices));
  }, []);

  const pickNote = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTriggerConfetti(prev => prev + 1);

    let currentDeck = [...deck];
    
    if (currentDeck.length === 0) {
      currentDeck = shuffle(Array.from({ length: sweetNotes.length }, (_, i) => i));
    }

    const nextIndex = currentDeck.pop()!;
    setDeck(currentDeck);

    setTimeout(() => {
      setCurrentNote(sweetNotes[nextIndex]);
      setIsAnimating(false);
    }, 400);
  }, [deck, isAnimating]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative overflow-hidden bg-slate-50">
      {/* Floating Background Elements - Changés en Vert/Menthe/Bleu */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-100/30 rounded-full blur-[100px] -z-10"></div>

      <header className="mb-8 text-center animate-fade-in relative">
        {/* Police Serif élégante au lieu de la police cursive */}
        <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-3 tracking-tight">
          The <span className="text-emerald-600 italic">Sweet</span> Box
        </h1>
        <p className="text-slate-400 font-light tracking-[0.2em] uppercase text-[10px] md:text-xs">
          A collection of thoughts for you
        </p>
      </header>

      <main className="w-full max-w-md relative flex flex-col items-center">
        <RelationshipCounter />
        
        <div className="w-full relative">
          <GlassCard note={currentNote} isAnimating={isAnimating} />
          
          {/* Lyrics Trigger Button - Style neutre */}
          <button 
            onClick={() => setIsLyricsOpen(true)}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center text-emerald-500 hover:scale-110 hover:bg-emerald-50 transition-all duration-300"
            title="Music"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </button>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            onClick={pickNote}
            disabled={isAnimating}
            className={`
              relative px-12 py-4 rounded-xl bg-slate-800
              text-emerald-50 font-medium shadow-xl
              hover:bg-slate-700 transition-all duration-300 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-3 group overflow-hidden
              ${!isAnimating ? 'animate-bounce-subtle' : ''}
            `}
          >
            <span className="relative z-10 tracking-wide">Reveal a note</span>
            <div className="relative z-10 w-5 h-5 flex items-center justify-center">
              {/* Icône Sparkles (Étoiles) au lieu du cœur */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-all duration-500 ${isAnimating ? 'scale-125 rotate-45' : 'group-hover:rotate-12'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.143-6.857L1 12l6.857-2.143L11 3z" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
          </button>
          
          <p className="text-slate-400 text-sm font-light tracking-wide italic">
            Thinking of you, every single day
          </p>
        </div>
      </main>

      <HeartConfetti trigger={triggerConfetti} />
      <LyricsModal isOpen={isLyricsOpen} onClose={() => setIsLyricsOpen(false)} />

      <footer className="mt-auto pt-8 text-slate-300 text-[9px] uppercase tracking-[0.3em]">
        Made with care
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default App;
