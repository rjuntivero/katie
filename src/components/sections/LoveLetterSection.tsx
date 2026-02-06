"use client";

import { Section } from '@/components';
import { MiffyBunny } from '@/components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LoveLetterSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Set initial state
    gsap.set(card, {
      x: -2000,
      rotateZ: 40,
      opacity: 0,
      y: 0
    });

    // Create scroll-triggered animation
    gsap.to(card, {
      delay:0.25,
      duration: 1.25,
      x: 0,
      rotateZ: 0,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  return (
    <Section 
      id="love-letter" 
      title="" 
      className="paper-grid"
      show={false}
      style={{ background: 'var(--surface)' }}
    >
      {/* Scrapbook decorations */}
      <div className="absolute top-8 left-8 text-3xl animate-wobble">📚</div>
      <div className="absolute top-12 right-12 text-3xl animate-float">🦆</div>
      <div className="absolute bottom-20 left-16 text-2xl">🍦</div>
      <div className="absolute bottom-16 right-20 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🌸</div>

      <div className="max-w-2xl mx-auto relative z-10" ref={cardRef}>
              
        {/* Washi tape decorations */}
        <div className="absolute top-1 -left-3 w-24 h-5 washi-pink z-9999" style={{ transform: 'rotate(-21deg)' }} />
        <div className="absolute -top-2 right-0 w-20 h-5 washi-green hidden lg:block z-9999 " style={{ transform: 'rotate(20deg)' }} />
      
        {/* Polaroid-style love letter */}
        <div 
          className="relative bg-white p-8 mx-4"
          style={{ 
            boxShadow: '6px 6px 0 var(--kraft)',
            transform: 'rotate(-1deg)'
          }}
        >
          {/* Tape on top */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5"
            style={{ background: 'var(--pop-yellow)', opacity: 0.9, transform: 'rotate(1deg)' }} 
          />
          
          {/* Stamp */}
          {/* <div className="absolute -top-2 -right-2 z-99999">
            <div className="stamp z-99999">FROM: RJ 💌</div>
          </div> */}
          
          <div className="text-center pt-4">
            {/* Decorative Miffy bunny */}
            <div className="flex justify-center mb-4">
              <MiffyBunny size="md" mood="love" />
            </div>
            
            <h2 
              className="heading-section mb-2 doodle-underline inline-block"
              style={{ color: 'var(--foreground)' }}
            >
              Dear Katie,
            </h2>
            
            <div className="divider-hearts my-4" />
            
            {/* Love letter content - torn paper style */}
            <div 
              className="p-6 my-6 torn-top torn-bottom text-left"
              style={{ background: 'var(--surface-warm)' }}
            >
              <p 
                className="text-handwritten leading-relaxed mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                Horses are red, Bananas are pink, when you look at me, you say I stink 🐴🍌
              </p>
              <p 
                className="text-handwritten leading-relaxed mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                But I don{`'`}t care, for the stench we will share, cause together, whenever, we{`'ll`} go as a pair 👫❤️
              </p>
              <p 
                className="text-handwritten leading-relaxed mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                I don{`'`}t know what i{`'`}m saying, honestly its quite bizarre, but don{`'`}t worry, the end is not far 🤔💫 {`(chat was that a bar)`}
              </p>
              <p 
                className="text-handwritten leading-relaxed mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                Okay now i{`'`}m just playing, I should really stay mute, but before I do, I just want to say, that I think you are really cute 😊💖
              </p>
            </div>
            
            <p 
              className="text-handwritten"
              style={{ color: 'var(--primary-dark)' }}
            >
              - RJ 🐰
            </p>
          </div>
          
          {/* Bottom corner decoration */}
          <div className="absolute -bottom-3 -left-3 text-2xl">🦆</div>
        </div>
      </div>
    </Section>
  );
}
