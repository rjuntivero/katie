"use client";

import { Section } from '@/components';
import Image from 'next/image';
import React, { useRef, useEffect, useCallback } from 'react';
import { ReasonItem } from '@/data/reasons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSounds } from '@/hooks/useSounds';

gsap.registerPlugin(ScrollTrigger);

export default function ReasonsSection({ reasons }: { reasons: ReasonItem[] }) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayedSounds = useRef(false);
  const hasPlayedTransition = useRef(false);
  const { playPolaroidSound, playTapeSound, playPaperSlideSound } = useSounds();

  // Memoize the sound player to avoid recreating on each render
  const playSoundsForCards = useCallback((cardCount: number) => {
    if (hasPlayedSounds.current) return;
    hasPlayedSounds.current = true;
    
    // Play polaroid sounds staggered for first 3 cards
    const soundCount = Math.min(cardCount, 3);
    for (let i = 0; i < soundCount; i++) {
      setTimeout(() => playPolaroidSound(), i * 150 + 100);
    }
    // Play a tape sound at the end
    setTimeout(() => playTapeSound(), soundCount * 150 + 300);
  }, [playPolaroidSound, playTapeSound]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0 || !sectionRef.current) return;

    // Set initial state - invisible and below final position
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      transformOrigin: 'top center',
    });

    // Create the swinging animation for each card sequentially
    cards.forEach((card, idx) => {
      const finalRotation = (idx % 3 - 1) * 2; // Match the static rotation
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (!hasPlayedTransition.current) {
              hasPlayedTransition.current = true;
              playPaperSlideSound();
            }
            playSoundsForCards(cards.length);
          },
        },
        delay: idx * 0.15, // Stagger each card
      });

      // Fade in and rise up
      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      // Swing right
      .to(card, {
        rotation: finalRotation + 12,
        duration: 0.2,
        ease: 'power1.inOut',
      })
      // Swing left
      .to(card, {
        rotation: finalRotation - 8,
        duration: 0.2,
        ease: 'power1.inOut',
      })
      // Swing right smaller
      .to(card, {
        rotation: finalRotation + 5,
        duration: 0.15,
        ease: 'power1.inOut',
      })
      // Swing left smaller
      .to(card, {
        rotation: finalRotation - 3,
        duration: 0.15,
        ease: 'power1.inOut',
      })
      // Settle into final position
      .to(card, {
        rotation: finalRotation,
        duration: 0.2,
        ease: 'power2.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [reasons, playSoundsForCards, playPaperSlideSound]);

  return (
    <Section 
      id="reasons" 
      title=""
      className="paper-dotted"
      show={false}
      style={{ 
        background: 'var(--background)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div ref={sectionRef}>
        {/* Section header with washi tape */}
        <div className="text-center mb-8 md:mb-12 relative z-10">
          <div className="washi-pink inline-block mt-8">THINGS I LOVE ABOUT YOU</div>
          <div className="divider-flowers mt-4" />
        </div>
        
        {/* Scrapbook stickers */}
        <div className="absolute top-16 left-8 text-4xl animate-float">📖</div>
        <div className="absolute top-16 right-12 text-3xl">
          <div className='w-12 h-12 relative'>
            <Image className="animate-wobble" src="/matcha.png" alt='miffy1' fill />
          </div>
        </div>
        <div className="absolute bottom-32 left-12 text-3xl animate-wobble">🦆</div>
        <div className="absolute bottom-24 right-8 text-4xl animate-float" style={{ animationDelay: '1s' }}>🍣</div>
        <div className="absolute top-1/3 left-4 text-2xl animate-sparkle">✨</div>
        
        {/* Photo corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4" style={{ borderColor: 'var(--kraft)' }} />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4" style={{ borderColor: 'var(--kraft)' }} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 p-3">
          {reasons.map((reason, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
              className="polaroid"
            >
              <div className="aspect-4/3 overflow-hidden relative">
                <Image 
                  src={reason.image}
                  alt={reason.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="pt-3 text-center">
                <span className="text-2xl">{reason.emoji}</span>
                <h3 className="font-bold mt-1" style={{ color: 'var(--foreground)' }}>{reason.title}</h3>
                <p className="text-handwritten mt-1" style={{ color: 'var(--muted)' }}>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
