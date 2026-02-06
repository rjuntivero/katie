'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Each clue in the treasure hunt
interface TreasureClue {
  id: number;
  hint: string;           // The riddle/hint for this clue
  answer: string;         // Correct answer (lowercase)
  revealText: string;     // What shows after solving
  emoji: string;          // Fun emoji for this clue
}

interface TreasureHuntProps {
  onComplete?: () => void;
}

export default function TreasureHunt({ onComplete }: TreasureHuntProps) {
  // Track which clue Katie is on (0-indexed)
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  // Track if hunt is complete
  const [isComplete, setIsComplete] = useState(false);
  // User's current guess
  const [userGuess, setUserGuess] = useState('');
  // Show wrong answer feedback
  const [showWrong, setShowWrong] = useState(false);
  // Show correct celebration
  const [showCorrect, setShowCorrect] = useState(false);
  
  // Refs for animations
  const clueCardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // All the clues - customize these for Katie!
  const treasureClues: TreasureClue[] = [
    {
      id: 1,
      hint: "Snack/Food that I ALWAYS want but is always out of stock.",
      answer: "salt bread",
      revealText: "omg whattt you got it right?? woaw thas crazy man 🐰",
      emoji: "🍞",
    },
    {
      id: 2,
      hint: "Green and frothy, whisked with care, a Japanese drink beyond compare! ☕",
      answer: "matcha",
      revealText: "Matcha! Or that probiotic drink but this one is right cause I said so 🍵",
      emoji: "🍵",
    },
    {
      id: 3,
      hint: "Bet you can't guess my...favorite TV show!?! 📺",
      answer: "law and order",
      revealText: "DUN DUN! 🔊 Man we should totally snuggle up and cuddle and watch it tgt or something idk... 💕",
      emoji: "👮‍♀️",
    },
    {
      id: 4,
      hint: "My favorite flowers are ALLEGEDLY ____ 🌸",
      answer: "lillies",
      revealText: "You sir, are on fire! 🔥 Lillies are my fave flower 🌸",
      emoji: "🌸",
    },
    {
      id: 5,
      hint: "hmm ok final question. what is the name of the handsome 5'8 filipino guy that I have a crush on 💖",
      answer: "Manny Pacquiao",
      revealText: "Oh wow....that sure is awkward :(. It's okay I'd choose manny too </3",
      emoji: "🥊",
    },
  ];

  const currentClue = treasureClues[currentClueIndex];
  const totalClues = treasureClues.length;

  // Animate clue card entrance
  useEffect(() => {
    if (clueCardRef.current && !isComplete) {
      gsap.fromTo(clueCardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );
    }
  }, [currentClueIndex, isComplete]);

  // Check if the guess is correct
  const handleSubmitGuess = () => {
    // Normalize both strings for comparison
    const normalizedGuess = userGuess.toLowerCase().trim();
    const normalizedAnswer = currentClue.answer.toLowerCase();
    
    // Check for match (also accept without spaces)
    const isCorrect = normalizedGuess === normalizedAnswer || 
                      normalizedGuess === normalizedAnswer.replace(/\s/g, '');
    
    if (isCorrect) {
      // Correct answer!
      setShowCorrect(true);
      setShowWrong(false);
      
      // Celebration animation
      if (clueCardRef.current) {
        gsap.to(clueCardRef.current, {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      }
      
      // After delay, move to next clue or complete
      setTimeout(() => {
        setShowCorrect(false);
        setUserGuess('');
        
        if (currentClueIndex < totalClues - 1) {
          setCurrentClueIndex(prev => prev + 1);
        } else {
          // Hunt complete!
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, 2000);
      
    } else {
      // Wrong answer - shake animation
      setShowWrong(true);
      
      if (inputRef.current) {
        // Shake animation for wrong answer
        gsap.to(inputRef.current, {
          keyframes: [
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: 0, duration: 0.1 },
          ],
        });
      }
      
      setTimeout(() => setShowWrong(false), 1500);
    }
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitGuess();
    }
  };

  // Completion view - she found the treasure!
  if (isComplete) {
    return (
      <div className="text-center py-8 px-4">
        {/* Treasure chest */}
        <div className="text-6xl mb-4 animate-float">🎁</div>
        
        <h3 className="heading-section text-2xl mb-4 doodle-underline inline-block">
          Huh, I guess I know you pretty well after all... 🕵️‍♀️
        </h3>
        
        <div className="max-w-md mx-auto p-6 torn-top torn-bottom my-6" 
          style={{ background: 'var(--surface-warm)' }}>
          <p className="text-xl mb-3 text-handwritten" style={{ color: 'var(--primary-dark)' }}>
            Welp, the reward for completing this quiz is...
          </p>
          <p className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            An asian stud dance cover challenge! 💕 That we have to post 💕
          </p>
          <p style={{ color: 'var(--muted)' }}>
            If you don&apos; want to though babe ig that&apos; fine too :{`[`}. 💖
          </p>
        </div>
        
        {/* Celebration emojis */}
        <div className="flex justify-center gap-3 text-2xl">
          {treasureClues.map(clue => (
            <span key={clue.id} className="animate-float" style={{ animationDelay: `${clue.id * 0.1}s` }}>{clue.emoji}</span>
          ))}
        </div>
      </div>
    );
  }

  // Main treasure hunt view
  return (
    <div className="py-8 px-4">
      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {treasureClues.map((_, idx) => (
          <div
            key={idx}
            className="w-3 h-3 rounded-full transition-all"
            style={{
              background: idx < currentClueIndex ? 'var(--accent)' : 
                         idx === currentClueIndex ? 'var(--primary)' : 'var(--border)',
              transform: idx === currentClueIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
      
      {/* Current clue card */}
      <div 
        ref={clueCardRef}
        className="max-w-lg mx-auto p-6 text-center"
        style={{ 
          background: 'var(--surface-warm)', 
          border: '2px solid var(--border)',
          boxShadow: '4px 4px 0 var(--accent)',
        }}
      >
        {/* Clue number */}
        <div className="washi-green inline-block mb-4 text-xs">
          CLUE {currentClueIndex + 1} OF {totalClues}
        </div>
        
        {/* Clue emoji */}
        <div className="text-4xl mb-4">{currentClue.emoji}</div>
        
        {/* The riddle */}
        <p className="text-lg mb-6 leading-relaxed text-handwritten" style={{ color: 'var(--foreground)' }}>
          {currentClue.hint}
        </p>
        
        {/* Show correct answer reveal */}
        {showCorrect ? (
          <div 
            className="p-4 mb-4"
            style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}
          >
            ✨ {currentClue.revealText}
          </div>
        ) : (
          <>
            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your answer..."
              className="w-full p-3 text-center text-lg mb-4 outline-none"
              style={{
                background: 'white',
                border: `2px solid ${showWrong ? '#e57373' : 'var(--border)'}`,
                color: 'var(--foreground)',
                transition: 'border-color 0.3s',
                boxShadow: '2px 2px 0 var(--border)',
              }}
            />
            
            {/* Wrong answer feedback */}
            {showWrong && (
              <p className="text-sm mb-4" style={{ color: '#e57373' }}>
                Not quite! Try again 💭
              </p>
            )}
            
            {/* Submit button */}
            <button
              onClick={handleSubmitGuess}
              className="btn btn-md btn-accent"
              disabled={!userGuess.trim()}
            >
              Check Answer 🔍
            </button>
          </>
        )}
      </div>
      
      {/* Hint text */}
      <p className="text-center mt-6 text-sm" style={{ color: 'var(--muted)' }}>
        🔮 Solve all the answers for a little reward..
      </p>
    </div>
  );
}
