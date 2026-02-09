
import React, { useState, useCallback, useEffect } from 'react';
import { sweetNotes } from './constants';
import GlassCard from './components/GlassCard';
import HeartConfetti from './components/HeartConfetti';
import RelationshipCounter from './components/RelationshipCounter';
import LyricsModal from './components/LyricsModal';

/**
 * Utility to shuffle an array (Fisher-Yates)
 */
const shuffle = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("Click below to find a sweet surprise...");
  const [deck, setDeck] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [triggerConfetti, setTriggerConfetti] = useState<number>(0);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  // Initialize the deck on first load
  useEffect(() => {
    const indices = Array.from({ length: sweetNotes.length }, (_, i) => i);
    setDeck(shuffle(indices));
  }, []);

  const pickNote = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTriggerConfetti(prev => prev + 1);

    // Get the next index from the deck
    let currentDeck = [...deck];
    
    if (currentDeck.length === 0) {
      currentDeck = shuffle(Array.from({ length: sweetNotes.length }, (_, i) => i));
    }

    const nextIndex = currentDeck.pop()!;
    setDeck(currentDeck);

    // Short delay for the "reveal" feel
    setTimeout(() => {
      setCurrentNote(sweetNotes[nextIndex]);
      setIsAnimating(false);
    }, 400);
  }, [deck, isAnimating]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100/10 rounded-full blur-[100px] -z-10"></div>

      <header className="mb-6 text-center animate-fade-in relative">
        <h1 className="dancing-script text-5xl md:text-6xl text-pink-600 mb-2 drop-shadow-sm">
          Sweet Notes Box 
        </h1>
        <p className="text-gray-500 font-light tracking-widest uppercase text-[10px] md:text-xs">
          to open if you feel bad or just want to smile
        </p>
      </header>

      <main className="w-full max-w-md relative flex flex-col items-center">
        <RelationshipCounter />
        
        <div className="w-full relative">
          <GlassCard note={currentNote} isAnimating={isAnimating} />
          
          {/* Lyrics Trigger Button */}
          <button 
            onClick={() => setIsLyricsOpen(true)}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/80 border border-pink-100 shadow-lg flex items-center justify-center text-pink-500 hover:scale-110 hover:bg-pink-50 transition-all duration-300"
            title="Je l'aime à mourir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </button>
        </div>
        
        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            onClick={pickNote}
            disabled={isAnimating}
            className={`
              relative px-10 py-4 rounded-full bg-white/90 border border-pink-200 
              text-pink-600 font-semibold shadow-lg hover:shadow-2xl 
              hover:bg-pink-50 transition-all duration-500 active:scale-90
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-3 group overflow-hidden
              ${!isAnimating ? 'animate-bounce-subtle' : ''}
            `}
          >
            <span className="relative z-10">Pick a sweet note</span>
            <div className="relative z-10 w-6 h-6 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-all duration-500 ${isAnimating ? 'scale-150 rotate-180' : 'group-hover:scale-110'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
          </button>
          
          <p className="text-gray-400 text-sm italic font-light tracking-wide animate-pulse">
            Kilometers apart, but my heart beats your name
          </p>
        </div>
      </main>

      <HeartConfetti trigger={triggerConfetti} />
      <LyricsModal isOpen={isLyricsOpen} onClose={() => setIsLyricsOpen(false)} />

      <footer className="mt-auto pt-8 text-gray-400 text-[9px] uppercase tracking-[0.2em] opacity-60">
        Made with love for you
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
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default App;
