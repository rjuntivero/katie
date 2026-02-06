'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import { useSounds } from '@/hooks/useSounds';

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const { playScrollSound } = useSounds();

  useEffect(() => {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero-cta');
    const decorations = document.querySelectorAll('.hero-decoration');
    const tape = document.querySelectorAll('.hero-tape');

    // Set initial visible states
    if (cta) {
      gsap.set(cta, { opacity: 1, scale: 1 });
    }

    if (title) {
      gsap.from(title, {
        duration: 1.2,
        opacity: 0,
        y: -30,
        ease: 'power2.out',
      });
    }

    if (subtitle) {
      gsap.from(subtitle, {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.3,
      });
    }

    if (cta) {
      gsap.from(cta, {
        duration: 1,
        opacity: 0,
        scale: 0.9,
        ease: 'back.out(1.5)',
        delay: 0.6,
      });
    }

    // Stagger in decorative elements
    if (decorations.length) {
      gsap.from(decorations, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        ease: 'back.out(2)',
        delay: 0.5,
      });
    }

    // Washi tape animations
    if (tape.length) {
      gsap.from(tape, {
        duration: 0.6,
        scaleX: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.8,
      });
    }
  }, []);

  const scrollToContent = () => {
    playScrollSound();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: '#love-letter', offsetY: 50 },
      ease: 'power2.inOut',
    });
  };

  return (
    <div 
      id="hero" 
      className="hero relative w-full min-h-screen flex items-center justify-center overflow-hidden paper-dotted"
      style={{ background: 'var(--background)' }}
    >
      {/* Scrapbook decorations - stickers & tape */}
      
      {/* Top left corner - washi tape */}
      <div className="hero-tape absolute top-0 left-20 w-32 h-6 washi-pink origin-left" style={{ transform: 'rotate(-5deg)' }} />
      <div className="hero-tape absolute top-8 left-8 w-24 h-5 washi-green origin-left" style={{ transform: 'rotate(3deg)' }} />
      
      {/* Top right - stickers */}
      <div className="hero-decoration absolute top-16 right-6 text-4xl">
        <div className='w-15 h-15 relative'>
          <Image className="animate-wobble" src="/duck1.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-decoration absolute top-24 right-19 text-3xl">
        <div className='w-9 h-9 relative rotate-y-180'>
          <Image className="animate-wobble" src="/cherry-blossom.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-decoration absolute top-13 right-19 text-2xl animate-sparkle">
         <div className='w-10 h-10 relative rotate-y-180 opacity-75'>
          <Image className="animate-wobble" src="/moon1.png" alt='miffy1' fill />
        </div>
      </div>
      
      {/* Bottom left - Katie's faves */}
      <div className="hero-decoration absolute bottom-24 md:bottom-32 left-2 md:left-16 text-3xl">
        <div className='w-14 h-14 relative rotate-y-180 -rotate-z-15 opacity-75'>
          <Image className="animate-wobble" src="/book2.png" alt='miffy1' fill />
        </div>  
      </div>
      <div className="hero-decoration absolute bottom-10 md:bottom-20 left-8 md:left-28 text-4xl">
         <div className='w-15 h-15 relative rotate-y-180 opacity-75'>
          <Image className="animate-wobble" src="/icecream.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-decoration absolute bottom-24 md:bottom-36 left-16 md:left-32 text-2xl">
        <div className='w-15 h-15 relative rotate-y-180'>
          <Image className="animate-wobble" src="/sushi1.png" alt='miffy1' fill />
        </div>
      </div>
      
      {/* Bottom right - more stickers */}
      <div className="hero-decoration absolute bottom-24 right-20 text-4xl">
        <div className='w-15 h-15 relative rotate-y-180'>
          <Image className="animate-wobble" src="/duck2.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-decoration absolute bottom-30 right-6 md:bottom-38 md:right-12 text-3xl">
        <div className='w-13 h-12 relative rotate-y-180 opacity-75'>
          <Image className="animate-wobble" src="/heart1.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-tape absolute bottom-0 right-16 w-28 h-5 washi-yellow origin-right" style={{ transform: 'rotate(4deg)' }} />
      
      {/* Floating elements */}
      <div className="hero-decoration absolute top-1/4 left-8 text-2xl animate-float z-99">
        <div className='w-14 h-14 relative rotate-y-180 opacity-75 '>
          <Image className="animate-wobble" src="/plant1.png" alt='plant icon' fill />
        </div>      
      </div>
      <div className="hero-decoration absolute top-107 right-0 md:right-8 text-2xl animate-float z-99999" style={{ animationDelay: '0.5s' }}> 
        <div className='w-17 h-20 relative'>
          <Image className="animate-wobble" src="/plant2.png" alt='miffy1' fill />
        </div>
      </div>
      <div className="hero-decoration absolute top-1/3 right-1/4 text-xl" style={{ animationDelay: '0.3s' }}>
         <div className='w-14 h-14 relative'>
          <Image className="animate-wobble" src="/star1.png" alt='miffy1' fill />
        </div>
      </div>

      {/* Main content card - like a scrapbook page */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Polaroid-style main content */}
        <div 
          className="relative bg-white p-8 pb-16 mx-auto max-w-md"
          style={{ 
            boxShadow: '4px 4px 0 var(--kraft), 8px 8px 20px rgba(0,0,0,0.1)',
            transform: 'rotate(-1deg)'
          }}
        >
          {/* Tape on top of polaroid */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5"
            style={{ 
              background: 'var(--pop-yellow)', 
              opacity: 0.85,
              transform: 'rotate(2deg)'
            }} 
          />
          
          {/* Duck and bunny header */}
          <div className="flex justify-center align-center gap-4 text-5xl mb-4">
            <div className='w-18 h-21 relative'>
              <Image className="animate-wobble" src="/miffy1.png" alt='miffy1' fill />
            </div>
            <div className='w-9 h-17 relative'>
              <Image className="duck-float aspect-square" src="/miffy2.png" alt='miffy1' fill />
            </div>
          </div>
          
          <h1 
            className="hero-title heading-display mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            My Dep Gai
          </h1>
          
          {/* Doodle underline */}
          <div className="divider-hearts mb-4" />

          <p 
            className="hero-subtitle mb-6"
            style={{ color: 'var(--muted)', fontSize: '1rem' }}
          >
            And all the lovely little things about her..
          </p>

          {/* Decorative stamp */}
          <div className="stamp absolute -bottom-4 -right-4">
            FROM RJ 💌
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={scrollToContent}
          onTouchEnd={(e) => { e.preventDefault(); scrollToContent(); }}
          className="hero-cta btn btn-lg btn-primary mt-8"
          style={{ touchAction: 'manipulation' }}
        >
          Scroll down!
        </button>
        
        {/* Arrow doodle */}
        <div className="mt-4 text-2xl animate-bounce" style={{ color: 'var(--primary)' }}>
          ↓
        </div>
      </div>

      {/* Corner decorations - like photo corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4" style={{ borderColor: 'var(--kraft)' }} />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4" style={{ borderColor: 'var(--kraft)' }} />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4" style={{ borderColor: 'var(--kraft)' }} />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4" style={{ borderColor: 'var(--kraft)' }} />
    </div>
  );
}
