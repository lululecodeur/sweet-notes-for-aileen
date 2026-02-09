
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
      <div 
        className="absolute inset-0 bg-pink-100/40 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-h-[85vh] flex flex-col animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-pink-100/50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <h2 className="dancing-script text-3xl text-pink-600">Je l'aime à mourir</h2>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">This song reminds me of you</p>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar text-center">
          <pre className="whitespace-pre-wrap font-sans text-gray-600 leading-relaxed text-sm md:text-base italic">
            {LYRICS}
          </pre>
        </div>
        
        <div className="mt-8 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300 mx-auto animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 182, 193, 0.5);
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default LyricsModal;
