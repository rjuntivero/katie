'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MiffyBunnyProps {
  size?: 'sm' | 'md' | 'lg';    // Size of the Miffy
  className?: string;
  animate?: boolean;            // Enable idle animation
  mood?: 'happy' | 'love' | 'sleepy'; // Different expressions
}

// A cute Miffy-inspired bunny using pure CSS/SVG
// Katie loves Miffy, so this adds that personal touch! 🐰
export default function MiffyBunny({ 
  size = 'md', 
  className = '',
  animate = true,
  mood = 'happy'
}: MiffyBunnyProps) {
  const bunnyRef = useRef<HTMLDivElement>(null);
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-36 h-44',
  };
  
  // Ear size based on main size
  const earSizes = {
    sm: { width: '10px', height: '24px' },
    md: { width: '16px', height: '36px' },
    lg: { width: '22px', height: '50px' },
  };
  
  // Eye size
  const eyeSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  // Idle bouncing animation
  useEffect(() => {
    if (!animate || !bunnyRef.current) return;
    
    const bunny = bunnyRef.current;
    
    // Gentle floating animation
    const floatAnimation = gsap.to(bunny, {
      y: -8,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    
    // Ear wiggle on hover
    const ears = bunny.querySelectorAll('.miffy-ear');
    bunny.addEventListener('mouseenter', () => {
      gsap.to(ears, {
        rotation: (i) => i === 0 ? -10 : 10,
        duration: 0.3,
        ease: 'back.out(3)',
      });
    });
    bunny.addEventListener('mouseleave', () => {
      gsap.to(ears, {
        rotation: 0,
        duration: 0.3,
      });
    });
    
    return () => {
      floatAnimation.kill();
    };
  }, [animate]);

  // Render different mouth based on mood
  const renderMouth = () => {
    switch (mood) {
      case 'love':
        return (
          // X mouth but with hearts nearby
          <div className="absolute text-md" style={{ bottom: '15%', left: '50%', transform: 'translateX(-50%)'}}>
            <span style={{ color: '#3d3d3d', fontWeight: 'bold' }}>×</span>
          </div>
        );
      case 'sleepy':
        return (
          // Peaceful X
          <div className="absolute" style={{ bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ color: '#3d3d3d', fontWeight: 'bold', opacity: 0.7 }}>×</span>
          </div>
        );
      default:
        // Classic Miffy X mouth
        return (
          <div className="absolute" style={{ bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ color: '#3d3d3d', fontWeight: 'bold' }}>×</span>
          </div>
        );
    }
  };

  return (
    <div 
      ref={bunnyRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{ cursor: 'pointer' }}
    >
      {/* Left Ear */}
      <div 
        className="miffy-ear absolute rounded-full"
        style={{
          width: earSizes[size].width,
          height: earSizes[size].height,
          background: '#fffef9',
          border: '2px solid var(--border)',
          top: '0',
          left: '25%',
          transform: 'translateX(-50%)',
          transformOrigin: 'bottom center',
        }}
      />
      
      {/* Right Ear */}
      <div 
        className="miffy-ear absolute rounded-full"
        style={{
          width: earSizes[size].width,
          height: earSizes[size].height,
          background: '#fffef9',
          border: '2px solid var(--border)',
          top: '0',
          right: '25%',
          transform: 'translateX(50%)',
          transformOrigin: 'bottom center',
        }}
      />
      
      {/* Face */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '100%',
          height: '75%',
          bottom: '0',
          background: '#fffef9',
          border: '2px solid var(--border)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left Eye */}
        <div 
          className={`absolute ${eyeSizes[size]} rounded-full`}
          style={{
            background: '#3d3d3d',
            top: '55%',
            left: '25%',
            transform: 'translateX(-50%)',
          }}
        />
        
        {/* Right Eye */}
        <div 
          className={`absolute ${eyeSizes[size]} rounded-full`}
          style={{
            background: '#3d3d3d',
            top: '55%',
            right: '25%',
            transform: 'translateX(50%)',
          }}
        />
        
        {/* X Mouth - Miffy's signature! */}
        {renderMouth()}
        
        {/* Optional blush for love mood */}
        {mood === 'love' && (
          <>
            <div 
              className="absolute w-3 h-2 rounded-full"
              style={{ background: 'var(--primary-light)', opacity: 0.7, top: '65%', left: '15%' }}
            />
            <div 
              className="absolute w-3 h-2 rounded-full"
              style={{ background: 'var(--primary-light)', opacity: 0.7, top: '65%', right: '15%' }}
            />
          </>
        )}
      </div>
      
      {/* Hearts floating if mood is love */}
      {mood === 'love' && (
        <div className="absolute -top-2 -right-2 text-lg animate-pulse">💕</div>
      )}
    </div>
  );
}
