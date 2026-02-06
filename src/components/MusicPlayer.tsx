'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MusicPlayerProps {
  src: string;
  albumArt?: string;
  songTitle?: string;
  artist?: string;
}

export default function MusicPlayer({ 
  src, 
  albumArt = '/album-art.jpg',
  songTitle = 'Always',
  artist = '♡'
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spinAnimation = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Set volume to be quieter
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }

    // Entrance animation
    gsap.from(containerRef.current, {
      duration: 0.8,
      y: 100,
      opacity: 0,
      delay: 1,
      ease: 'power3.out',
    });

    // Setup vinyl spin animation (paused initially)
    if (vinylRef.current) {
      spinAnimation.current = gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: 'none',
        paused: true,
      });
    }

    return () => {
      spinAnimation.current?.kill();
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      spinAnimation.current?.pause();
      
      // Slow down animation
      gsap.to(vinylRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      try {
        await audioRef.current.play();
        spinAnimation.current?.play();
        
        // Pulse animation on play
        gsap.to(vinylRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        });
      } catch (error) {
        console.log('Autoplay prevented by browser');
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      
      <div 
        ref={containerRef}
        className="fixed bottom-6 right-6 z-999999"
      >
        {/* Tooltip
        <div 
          className={`absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 transition-all duration-300 whitespace-nowrap ${hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ 
            background: 'var(--cream)',
            border: '2px solid var(--border)',
            boxShadow: '3px 3px 0 var(--kraft)'
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>🎵 Click to play our song!</p>
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3"
            style={{ background: 'var(--cream)', borderRight: '2px solid var(--border)', borderBottom: '2px solid var(--border)' }}
          />
        </div> */}

        {/* Player button */}
        <button
          onClick={togglePlay}
          className="group relative w-20 h-20 rounded-full transition-all duration-300"
          style={{ 
            boxShadow: '4px 4px 0 var(--primary-dark)',
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Outer ring - solid pink */}
          <div 
            className="absolute inset-0 rounded-full border-4"
            style={{ 
              background: 'var(--primary-light)',
              borderColor: 'var(--primary)'
            }}
          />
          
          {/* Vinyl record */}
          <div 
            ref={vinylRef}
            className="absolute inset-2 rounded-full overflow-hidden"
            style={{ background: '#1a1a1a' }}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-0 rounded-full opacity-40">
              <div className="absolute inset-[15%] rounded-full border border-gray-600"></div>
              <div className="absolute inset-[25%] rounded-full border border-gray-600"></div>
              <div className="absolute inset-[35%] rounded-full border border-gray-600"></div>
              <div className="absolute inset-[45%] rounded-full border border-gray-600"></div>
            </div>
            
            {/* Center label - solid color */}
            <div 
              className="absolute inset-[30%] rounded-full flex items-center justify-center"
              style={{ background: 'var(--primary)' }}
            >
              <span className="text-white text-xs font-bold">♡</span>
            </div>
            
            {/* Subtle shine */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' }}
            />
          </div>

          {/* Play/Pause overlay */}
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className={`text-white transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* Pulsing ring when playing */}
          {isPlaying && (
            <div className="absolute -inset-2 rounded-full border-2 animate-ping opacity-30" style={{ borderColor: 'var(--primary)' }}></div>
          )}
        </button>

        {/* Song info */}
        <div 
          className={`absolute -left-36 top-1/2 -translate-y-1/2 px-4 py-2 transition-all duration-500 ${isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
          style={{ 
            background: 'var(--cream)',
            border: '2px solid var(--border)',
            boxShadow: '3px 3px 0 var(--kraft)'
          }}
        >
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Now Playing</p>
          <p className="text-sm font-medium truncate max-w-30" style={{ color: 'var(--foreground)' }}>{songTitle}</p>
          <p className="text-xs" style={{ color: 'var(--primary)' }}>{artist}</p>
        </div>
      </div>
    </>
  );
}
