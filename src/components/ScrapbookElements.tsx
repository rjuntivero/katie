'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Miffy on bicycle that rides across screen as you scroll
export function BunnyOnBike() {
  const bunnyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bunnyRef.current) return;

    gsap.fromTo(bunnyRef.current, 
      { x: '-100%', rotate: -5 },
      {
        x: '100vw',
        rotate: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={bunnyRef}
      className="fixed top-1/3 left-0 z-30 pointer-events-none"
    >
      <div className="relative">
        {/* Miffy */}
        <div className="animate-wobble inline-block w-16 h-16 relative">
          <Image src="/miffy1.png" alt="Miffy" fill className="object-contain" />
        </div>
        {/* Bicycle */}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">🚲</span>
      </div>
    </div>
  );
}

// Floating ducks for the duck pond effect
export function FloatingDucks({ count = 3 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute duck-float"
          style={{
            left: `${20 + i * 30}%`,
            top: `${60 + (i % 2) * 10}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: '2rem',
          }}
        >
          🦆
        </div>
      ))}
    </div>
  );
}

// Parallax trees that move at different speeds
export function ParallaxTrees() {
  const treesRef = useRef<HTMLDivElement>(null);
  const trees2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!treesRef.current || !trees2Ref.current) return;

    // Front trees - slower
    gsap.to(treesRef.current, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: treesRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Back trees - faster
    gsap.to(trees2Ref.current, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: trees2Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  return (
    <>
      {/* Background trees */}
      <div 
        ref={trees2Ref}
        className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-30 text-4xl flex justify-around"
      >
        🌳 🌲 🌳 🌲 🌳
      </div>
      {/* Foreground trees */}
      <div 
        ref={treesRef}
        className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-50 text-5xl flex justify-around"
      >
        🌲 🌳 🌲
      </div>
    </>
  );
}

// Falling leaves effect
export function FallingLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {['🍃', '🌸', '🍂', '🌿', '🌸'].map((leaf, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${10 + i * 20}%`,
            top: `${-10 - i * 5}%`,
            animationDuration: `${3 + i}s`,
            animationDelay: `${i * 0.7}s`,
            fontSize: '1.5rem',
            opacity: 0.7,
          }}
        >
          {leaf}
        </div>
      ))}
    </div>
  );
}

// Sticker decorations
export function StickerDecoration({ 
  emoji, 
  position, 
  rotate = 0,
  size = '2rem' 
}: { 
  emoji: string; 
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotate?: number;
  size?: string;
}) {
  return (
    <div 
      className="absolute pointer-events-none animate-float"
      style={{
        ...position,
        transform: `rotate(${rotate}deg)`,
        fontSize: size,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
      }}
    >
      {emoji}
    </div>
  );
}

// Washi tape decoration
export function WashiTape({ 
  color = 'pink',
  rotation = -3,
  children,
  className = ''
}: { 
  color?: 'pink' | 'green' | 'yellow' | 'striped';
  rotation?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const colorClass = {
    pink: 'washi-pink',
    green: 'washi-green',
    yellow: 'washi-yellow',
    striped: 'washi-striped',
  }[color];

  return (
    <div 
      className={`washi-tape ${colorClass} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}

// Polaroid photo frame
export function PolaroidFrame({ 
  children, 
  caption,
  rotation = -2 
}: { 
  children: React.ReactNode;
  caption?: string;
  rotation?: number;
}) {
  return (
    <div 
      className="polaroid"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="overflow-hidden">
        {children}
      </div>
      {caption && (
        <p className="polaroid-caption">{caption}</p>
      )}
    </div>
  );
}

// Doodle arrow pointing to something
export function DoodleArrow({ direction = 'down' }: { direction?: 'up' | 'down' | 'left' | 'right' }) {
  const arrows = {
    down: '↓',
    up: '↑',
    left: '←',
    right: '→',
  };
  
  return (
    <span className="arrow-doodle">{arrows[direction]}</span>
  );
}

// Sparkle decoration (Ariana Grande vibes!)
export function Sparkles({ around }: { around: React.ReactNode }) {
  return (
    <span className="sparkle-text relative inline-block">
      {around}
    </span>
  );
}

// Book stack decoration
export function BookStack() {
  return (
    <div className="flex flex-col items-center text-3xl">
      <span style={{ transform: 'rotate(5deg)' }}>📕</span>
      <span style={{ transform: 'rotate(-3deg)', marginTop: '-8px' }}>📗</span>
      <span style={{ transform: 'rotate(2deg)', marginTop: '-8px' }}>📘</span>
    </div>
  );
}

// Soft serve decoration
export function SoftServe({ flavor = 'pink' }: { flavor?: 'pink' | 'green' | 'swirl' }) {
  return (
    <div className="text-4xl animate-wobble">
      🍦
    </div>
  );
}

// Blind box / mystery box decoration
export function BlindBox() {
  return (
    <div className="relative inline-block text-3xl">
      <span className="animate-wobble inline-block">📦</span>
      <span className="absolute -top-2 -right-2 text-lg animate-sparkle">✨</span>
    </div>
  );
}

// Sushi decoration
export function SushiRoll() {
  return (
    <div className="flex gap-1 text-2xl">
      <span className="animate-float" style={{ animationDelay: '0s' }}>🍣</span>
      <span className="animate-float" style={{ animationDelay: '0.2s' }}>🍱</span>
      <span className="animate-float" style={{ animationDelay: '0.4s' }}>🍙</span>
    </div>
  );
}
