"use client";

import { Section, ValentineProposal } from '@/components';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ValentineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cutoutShapesRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate each letter of the title with stagger
      titleCharsRef.current.forEach((char, i) => {
        if (!char) return;
        gsap.set(char, { 
          opacity: 0, 
          y: 100,
          rotateZ: -20 + Math.random() * 40,
        });
        
        gsap.to(char, {
          opacity: 1,
          y: 0,
          rotateZ: -3 + (i % 2) * 6,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        });
      });

      // Animate cutout shapes
      const shapes = cutoutShapesRef.current?.querySelectorAll('.cutout-shape');
      shapes?.forEach((shape, i) => {
        gsap.set(shape, { scale: 0, rotation: -180 });
        gsap.to(shape, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.3 + i * 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        });
      });

      // Stamp slam animation
      if (stampRef.current) {
        gsap.set(stampRef.current, { scale: 3, opacity: 0, rotation: -30 });
        gsap.to(stampRef.current, {
          scale: 1,
          opacity: 1,
          rotation: -8,
          duration: 0.4,
          delay: 0.8,
          ease: 'power4.in',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const titleText = "VALENTINE?";

  return (
    <Section 
      id="valentine" 
      title=""
      className=""
      show={false}
      style={{ 
        background: 'var(--surface-warm)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
      }}
    >
      <div ref={sectionRef} className="relative w-full min-h-[100dvh] flex flex-col">
        
         {/* Decorative doodles */}
        <div className="absolute bottom-[12%] left-[5%] text-[8vw] md:text-[4vw] animate-wobble z-9999">🦆</div>
        <div className="absolute top-20 md:top-7 left-[2%] text-[6vw] md:text-[3vw] animate-float">🌸</div>
        <div className="absolute top-[60%] right-[3%] text-[7vw] md:text-[3.5vw] animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
        
        {/* Kraft paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='3' type='fractalNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Pop art cutout shapes */}
        <div ref={cutoutShapesRef} className="absolute inset-0 pointer-events-none">
          {/* Big yellow star cutout - top right */}
          <div 
            className="cutout-shape absolute top-[5%] right-[5%] w-[25vw] h-[25vw] max-w-37.5 max-h-37.5"
            style={{ 
              background: 'var(--pop-yellow)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              boxShadow: '4px 4px 0 var(--foreground)',
            }} 
          />
          
          
          {/* Sage green circle - bottom left */}
          <div 
            className="cutout-shape absolute bottom-[15%] left-[8%] w-[18vw] h-[18vw] max-w-[100px] max-h-[100px] rounded-full"
            style={{ 
              background: 'var(--accent)',
              boxShadow: '4px 4px 0 var(--accent-dark)',
            }} 
          />
          
          {/* Orange diamond - bottom right */}
          <div 
            className="cutout-shape absolute bottom-[25%] right-[10%] w-[15vw] h-[15vw] max-w-[90px] max-h-[90px]"
            style={{ 
              background: 'var(--pop-orange)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '3px 3px 0 var(--foreground)',
            }} 
          />
          
          {/* Blue blob - mid right */}
          <div 
            className="cutout-shape absolute top-[45%] right-[2%] w-[12vw] h-[12vw] max-w-[80px] max-h-[80px]"
            style={{ 
              background: 'var(--pop-blue)',
              borderRadius: '60% 40% 50% 50%',
              boxShadow: '3px 3px 0 var(--foreground)',
            }} 
          />
        </div>

        {/* Washi tape strips */}
        <div className="absolute top-0 -left-6 w-[80px] h-[28px] opacity-80" style={{ background: 'var(--primary-light)', transform: 'rotate(-20deg)' }} />
        <div className="absolute top-1 -right-4 w-[60px] h-[24px] opacity-85" style={{ background: 'var(--pop-yellow)', transform: 'rotate(32deg)' }} />

        {/* BIG BOLD LEFT-ALIGNED TITLE */}
        <div className="relative z-[1] pt-[12vh] px-4 md:px-8">
          <p 
            className="font-simple-nathalie text-[7vw] md:text-[3vw] mb-2"
            style={{ color: 'var(--primary-dark)', opacity: 0.7 }}
          >
            so katie...
          </p>
          <h1 className="leading-[0.85] tracking-tight select-none">
            <span 
              className="block font-sunday-charm text-[14vw] md:text-[10vw] relative w-fit"
              style={{ color: 'var(--foreground)', opacity: 0.75 }}
            >
              BE MY          {/* Pink heart cutout - left side */}
          <div className="cutout-shape absolute top-1 -right-9 md:top-5 md:-right-45 md:w-40 md:h-30 w-8 h-8">
            <Image src={'/heart1.png'}  alt='heart'
            fill
          />
          </div>
            </span>
            <span className="flex flex-wrap">
              {titleText.split('').map((char, i) => (
                <span
                  key={i}
                  ref={el => { titleCharsRef.current[i] = el; }}
                  className="font-sunday-charm text-[16vw] md:text-[11vw] inline-block"
                  style={{ 
                    color: i === titleText.length - 1 ? 'var(--primary)' : 'var(--foreground)',
                    textShadow: '4px 4px 0 var(--kraft)',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Postage stamp */}
        <div 
          ref={stampRef}
          className="absolute top-[8%] right-[20%] md:right-[25%] z-2"
        >
          <div 
            className="p-3 md:p-4"
            style={{
              background: 'var(--cream)',
              border: '3px dashed var(--primary)',
              boxShadow: '2px 2px 0 var(--muted)',
            }}
          >
            <span className="text-[6vw] md:text-[2.5vw]">💌</span>
            <p className="text-[2.5vw] md:text-[0.6vw] font-bold" style={{ color: 'var(--primary-dark)' }}>XOXO</p>
          </div>
        </div>

        {/* Main proposal content - offset layout */}
        <div className="relative z-10 flex-1 flex items-start px-4 md:px-8 pb-8">
          <div className="w-full max-w-125 ml-auto mr-0 md:mr-[10%]">
            <ValentineProposal />
          </div>
        </div>

        {/* Torn paper edge at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-7.5 pointer-events-none"
          style={{
            background: 'var(--surface-warm)',
            clipPath: 'polygon(0% 60%, 2% 40%, 5% 55%, 8% 35%, 11% 50%, 14% 40%, 17% 55%, 20% 45%, 23% 60%, 26% 40%, 29% 50%, 32% 35%, 35% 55%, 38% 45%, 41% 60%, 44% 40%, 47% 50%, 50% 35%, 53% 55%, 56% 45%, 59% 60%, 62% 40%, 65% 50%, 68% 35%, 71% 55%, 74% 45%, 77% 60%, 80% 40%, 83% 50%, 86% 35%, 89% 55%, 92% 45%, 95% 60%, 98% 40%, 100% 50%, 100% 100%, 0% 100%)',
          }}
        />
      </div>
    </Section>
  );
}
