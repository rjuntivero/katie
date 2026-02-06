"use client";

import { Section, TreasureHunt } from '@/components';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSounds } from '@/hooks/useSounds';

gsap.registerPlugin(ScrollTrigger);

export default function TreasureHuntSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayedTransition = useRef(false);
  const { playPaperSlideSound } = useSounds();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        if (!hasPlayedTransition.current) {
          hasPlayedTransition.current = true;
          playPaperSlideSound();
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [playPaperSlideSound]);
  return (
    <Section 
      id="treasure-hunt" 
      title=""
      className="paper-lined"
      show={false}
      style={{ 
        background: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div ref={sectionRef}>
        {/* Section header */}
        <div className="text-center mb-6 relative z-10">
        <div className="washi-striped inline-block mb-4 font-bold">🔮 NOW, I WAS GONNA ASK YOU SOMETHING...BUT BEFORE THAT</div>
      </div>
      
      {/* Mystery decorations */}
      {/* <div className="absolute top-20 left-12 text-4xl animate-wobble">🔍</div> */}
      {/* <div className="absolute top-16 right-16 text-3xl">📺</div> */}
      <div className="absolute bottom-24 left-8 text-4xl animate-float">🦆</div>
      <div className="absolute bottom-32 right-12 text-3xl animate-sparkle">✨</div>
      <div className="absolute top-1/3 right-8 text-2xl">🍵</div>
      
      {/* Ariana Grande reference - her fave artist! */}
      <div className="absolute bottom-16 -right-10 sparkle-text text-sm" style={{ color: 'var(--pop-lavender)' }}>
        ✧ thank u, next ✧
      </div>
      
      <p 
        className="text-center mb-8 max-w-md mx-auto relative z-10 font-simple-nathalie"
        style={{ color: 'var(--muted)', fontSize: '1.7rem' }}
      >
        You gotta make sure I&apos;m the right one for you :o
        <br />
        If I don&apos;t get these right you have <strong>permission </strong> to leave... <br/>{`(I made these questions)`} 🕵️‍♀️
      </p>
      <div className="relative z-10 max-w-xl mx-auto">
        {/* Notepad style frame */}
        <div 
          className="bg-white p-6"
          style={{ 
            boxShadow: '4px 4px 0 var(--accent)',
            border: '2px solid var(--border)'
          }}
        >
          <TreasureHunt />
        </div>
      </div>
      </div>
    </Section>
  );
}
