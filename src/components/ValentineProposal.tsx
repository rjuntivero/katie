'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useSounds } from '@/hooks/useSounds';

interface ValentineProposalProps {
  onAccept?: () => void;
}

export default function ValentineProposal({ onAccept }: ValentineProposalProps) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const { playYesSound, playNoSound } = useSounds();

  const MAX_NO_ATTEMPTS = 5;

  // Handle YES click - polaroid animation
  const handleYesClick = useCallback(() => {
    if (isAnimating || showErrorModal || isExploding) return;
    
    const question = questionRef.current;
    const polaroid = polaroidRef.current;
    const yesBtn = yesButtonRef.current;
    const noBtn = noButtonRef.current;
    const celebration = celebrationRef.current;
    const buttons = buttonsRef.current;

    if (!question || !polaroid || !yesBtn || !buttons) return;

    setIsAnimating(true);
    playYesSound();

    // Disable buttons
    yesBtn.disabled = true;
    if (noBtn) noBtn.disabled = true;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onAccept) onAccept();
      }
    });

    // Shrink and fade question
    tl.to(question, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Buttons fly away
    tl.to(buttons, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.2');

    // Hide question and buttons from layout
    tl.set([question, buttons], { display: 'none' });

    // Show polaroid and animate it in
    tl.set(polaroid, { display: 'block', opacity: 1, y: '-100vh', rotation: -15 });
    tl.to(polaroid, {
      y: 0, 
      rotation: 0, 
      duration: 0.7, 
      ease: 'power2.out',
    });

    // Gentle settle wobble
    tl.to(polaroid, { rotation: 3, duration: 0.12, ease: 'power1.out' });
    tl.to(polaroid, { rotation: -2, duration: 0.1, ease: 'power1.inOut' });
    tl.to(polaroid, { rotation: 1, duration: 0.08, ease: 'power1.inOut' });
    tl.to(polaroid, { rotation: 0, duration: 0.15, ease: 'power2.out' });

    // Show and animate celebration stickers
    if (celebration) {
      tl.set(celebration, { display: 'flex', opacity: 1 });
      const stickers = celebration.querySelectorAll('.celebration-sticker');
      tl.fromTo(stickers, 
        { scale: 0, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 0.4, 
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      );
    }

  }, [isAnimating, showErrorModal, isExploding, onAccept, playYesSound]);

  // Handle NO click - shake, grow, explode
  const handleNoClick = useCallback(() => {
    const noBtn = noButtonRef.current;
    const yesBtn = yesButtonRef.current;
    if (!noBtn || isExploding) return;

    playNoSound();

    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);

    if (newAttempts >= MAX_NO_ATTEMPTS) {
      // EXPLOSION TIME!
      setIsExploding(true);
      
      const tl = gsap.timeline();

      // Button shakes violently
      tl.to(noBtn, {
        x: 'random(-20, 20)',
        y: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 0.05,
        repeat: 15,
        ease: 'none',
      });

      // Button grows and turns red
      tl.to(noBtn, {
        scale: 2,
        backgroundColor: '#ff4444',
        borderColor: '#cc0000',
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.3');

      // EXPLODE!
      tl.to(noBtn, {
        scale: 0,
        opacity: 0,
        rotation: 720,
        duration: 0.3,
        ease: 'power4.in',
      });

      // Create explosion particles
      if (explosionRef.current) {
        tl.set(explosionRef.current, { display: 'block' }, '-=0.2');
        const particles = explosionRef.current.querySelectorAll('.particle');
        tl.fromTo(particles, 
          { scale: 0, opacity: 1 },
          {
            scale: 'random(0.5, 2)',
            x: 'random(-150, 150)',
            y: 'random(-150, 150)',
            rotation: 'random(-360, 360)',
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      // Yes button gets HUGE
      if (yesBtn) {
        tl.to(yesBtn, {
          scale: 1.5,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }, '-=0.4');
      }

      // Show modal after all animations
      tl.call(() => {
        setShowErrorModal(true);
      }, [], '+=0.3');

      return;
    }

    // Regular shake + grow animation
    const tl = gsap.timeline();

    // Shake
    tl.to(noBtn, {
      x: 'random(-15, 15)',
      rotation: 'random(-10, 10)',
      duration: 0.05,
      repeat: 6,
      ease: 'none',
    });

    // Reset position but grow
    tl.to(noBtn, {
      x: 0,
      rotation: 0,
      scale: 1 + newAttempts * 0.15,
      duration: 0.2,
      ease: 'back.out(2)',
    });

    // Make yes button more appealing
    if (yesBtn) {
      gsap.to(yesBtn, {
        scale: 1 + newAttempts * 0.1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, [noAttempts, isExploding, playNoSound]);

  // Close error modal and trigger yes animation
  const handleModalClose = useCallback(() => {
    if (modalRef.current) {
      playYesSound();
      
      gsap.to(modalRef.current, {
        scale: 0,
        rotation: -10,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(2)',
        onComplete: () => {
          setShowErrorModal(false);
          setTimeout(() => {
            const question = questionRef.current;
            const polaroid = polaroidRef.current;
            const buttons = buttonsRef.current;
            const celebration = celebrationRef.current;

            if (!question || !polaroid || !buttons) return;

            setIsAnimating(true);

            const tl = gsap.timeline({
              onComplete: () => {
                if (onAccept) onAccept();
              }
            });

            // Shrink and fade question
            tl.to(question, {
              scale: 0.8,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            });

            // Buttons fly away
            tl.to(buttons, {
              y: 50,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
            }, '-=0.2');

            // Hide question and buttons from layout
            tl.set([question, buttons], { display: 'none' });

            // Show polaroid and animate it in
            tl.set(polaroid, { display: 'block', opacity: 1, y: '-100vh', rotation: -15 });
            tl.to(polaroid, {
              y: 0,
              rotation: 0,
              duration: 0.7,
              ease: 'power2.out',
            });

            // Gentle settle wobble
            tl.to(polaroid, { rotation: 3, duration: 0.12, ease: 'power1.out' });
            tl.to(polaroid, { rotation: -2, duration: 0.1, ease: 'power1.inOut' });
            tl.to(polaroid, { rotation: 1, duration: 0.08, ease: 'power1.inOut' });
            tl.to(polaroid, { rotation: 0, duration: 0.15, ease: 'power2.out' });

            // Show and animate celebration stickers
            if (celebration) {
              tl.set(celebration, { display: 'flex', opacity: 1 });
              const stickers = celebration.querySelectorAll('.celebration-sticker');
              tl.fromTo(stickers, 
                { scale: 0, opacity: 0, y: 20 },
                { 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  duration: 0.4, 
                  stagger: 0.1,
                  ease: 'back.out(1.7)',
                }
              );
            }
          }, 50);
        }
      });
    }
  }, [onAccept, playYesSound]);

  // Animate modal entrance
  useEffect(() => {
    if (showErrorModal && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0, rotation: 10, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [showErrorModal]);

  const playfulMessages = [
    "hmm... try again? 🤔",
    "u sure about that? 🥺",
    "wait...really...? 😰",
    "alr now im mad 😤",
  ];

  return (
    <div ref={containerRef} className="relative py-4" style={{ minHeight: '350px' }}>
      {/* Polaroid for animation - starts hidden, GSAP shows it */}
      <div 
        ref={polaroidRef}
        className="relative mx-auto p-3 pb-14 max-w-[280px] hidden"
        style={{
          background: 'white',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2), 4px 4px 0 var(--kraft)',
        }}
      >
        {/* Photo area */}
        <div 
          className="aspect-square w-full"
          style={{ backgroundImage: 'url(/katie5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        
        {/* Text area - below photo in the white space */}
        <div className="pt-3 text-center">
          <p 
            className="font-simple-nathalie text-[5vw] md:text-[1.2rem]"
            style={{ color: 'var(--muted)' }}
          >
            :{`))`} It&apos;s Me and You 💕
          </p>
        </div>
        
        {/* Tape decoration */}
        <div 
          className="absolute -top-3 left-1/2 w-16 h-5"
          style={{ background: 'var(--pop-yellow)', opacity: 0.9, transform: 'translateX(-50%) rotate(2deg)' }}
        />
      </div>

      {/* Celebration elements - always in DOM, start hidden, GSAP animates in */}
      <div 
        ref={celebrationRef}
        className="justify-center gap-6 mt-6 text-[8vw] md:text-[3rem] hidden"
      >
        <span className="celebration-sticker animate-wobble">🐰</span>
        <span className="celebration-sticker duck-float">🦆</span>
        <span className="celebration-sticker animate-float" style={{ animationDelay: '0.2s' }}>🌸</span>
        <span className="celebration-sticker animate-sparkle">✨</span>
      </div>

      {/* Question card - kraft paper style - always in DOM, GSAP hides it */}
      <div 
        ref={questionRef}
        className="relative p-6 mb-6"
        style={{
          background: 'var(--cream)',
          border: '3px solid var(--kraft)',
          boxShadow: '6px 6px 0 var(--primary-dark)',
        }}
      >
        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 text-2xl">✿</div>
        <div className="absolute -bottom-2 -right-2 text-2xl">✿</div>
        
        {/* Tape */}
        <div 
          className="absolute -top-3 right-[20%] w-14 h-5"
          style={{ background: 'var(--pop-yellow)', opacity: 0.85, transform: 'rotate(-3deg)' }}
        />
        
        <div className="text-center">
          <div className="flex justify-center gap-4 text-[10vw] md:text-[3rem] mb-3">
            <span className="animate-wobble">🐰</span>
            <span className="duck-float">🦆</span>
          </div>
          
          <p 
            className="font-simple-nathalie text-[6vw] md:text-[1.5rem] mb-2"
            style={{ color: 'var(--muted)' }}
          >
            so... what do you say?
          </p>
          
          <h3 
            className="font-sunday-charm text-[9vw] md:text-[2.5rem] leading-tight"
            style={{ color: 'var(--foreground)' }}
          >
            Will you be my Valentine?
          </h3>

          {noAttempts > 0 && noAttempts < MAX_NO_ATTEMPTS && (
            <p 
              className="font-simple-nathalie text-[5vw] md:text-[1.1rem] mt-3"
              style={{ color: 'var(--accent-dark)' }}
            >
              {playfulMessages[Math.min(noAttempts - 1, playfulMessages.length - 1)]}
            </p>
          )}
        </div>
      </div>

      {/* Buttons - always in DOM, GSAP hides them */}
      <div ref={buttonsRef} className="flex justify-center gap-4 relative" style={{ minHeight: '80px' }}>
        {/* YES button */}
        <button
          ref={yesButtonRef}
          onClick={handleYesClick}
          className="relative z-10 px-8 py-4 font-bold text-[5vw] md:text-[1.2rem] active:scale-95 transition-transform"
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: '3px solid var(--primary-dark)',
            boxShadow: '4px 4px 0 var(--primary-dark)',
            borderRadius: '4px',
            pointerEvents: isExploding ? 'none' : 'auto',
          }}
        >
          Yes! 💕
        </button>
        
        {/* NO button - stays in DOM for animation but hidden via pointer-events after explosion starts */}
        <button
          ref={noButtonRef}
          onClick={handleNoClick}
          className="relative z-10 px-6 py-4 font-bold text-[5vw] md:text-[1.2rem] active:scale-95 transition-transform"
          style={{
            background: 'var(--surface)',
            color: 'var(--foreground)',
            border: '3px solid var(--border)',
            boxShadow: '4px 4px 0 var(--border)',
            borderRadius: '4px',
            pointerEvents: isExploding ? 'none' : 'auto',
          }}
        >
          No 😢
        </button>

        {/* Explosion particles */}
        <div ref={explosionRef} className="absolute top-1/2 right-[25%] -translate-y-1/2 hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-3 h-3"
              style={{
                background: ['var(--primary)', 'var(--pop-yellow)', 'var(--accent)', 'var(--pop-orange)'][i % 4],
                borderRadius: i % 2 === 0 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      </div>

      {/* 404 Error Modal - Rendered via Portal to escape parent containment */}
      {showErrorModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div 
            ref={modalRef}
            className="relative max-w-[90vw] w-[400px] p-6 text-center"
            style={{
              background: 'var(--cream)',
              border: '4px solid var(--foreground)',
              boxShadow: '8px 8px 0 var(--primary)',
            }}
          >
            {/* Torn paper top edge */}
            <div 
              className="absolute -top-4 left-0 right-0 h-8"
              style={{
                background: 'var(--cream)',
                clipPath: 'polygon(0% 100%, 3% 60%, 6% 80%, 9% 50%, 12% 70%, 15% 55%, 18% 75%, 21% 60%, 24% 80%, 27% 55%, 30% 70%, 33% 50%, 36% 75%, 39% 60%, 42% 80%, 45% 55%, 48% 70%, 51% 50%, 54% 75%, 57% 60%, 60% 80%, 63% 55%, 66% 70%, 69% 50%, 72% 75%, 75% 60%, 78% 80%, 81% 55%, 84% 70%, 87% 50%, 90% 75%, 93% 60%, 96% 80%, 100% 55%, 100% 100%)',
              }}
            />

            {/* Stamp */}
            <div 
              className="absolute -top-6 -right-4 p-2"
              style={{
                background: 'var(--primary)',
                border: '2px dashed white',
                transform: 'rotate(12deg)',
              }}
            >
              <span className="text-white font-bold text-[3vw] md:text-xs">ERROR!</span>
            </div>

            <div className="text-[20vw] md:text-[6rem] mb-2">🚫</div>
            
            <h3 
              className="font-sunday-charm text-[10vw] md:text-[2.5rem] mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              404
            </h3>
            
            <p 
              className="font-bold text-[5vw] md:text-[1.2rem] mb-3"
              style={{ color: 'var(--primary-dark)' }}
            >
              &quot;No&quot; Not Found
            </p>
            
            <p 
              className="font-simple-nathalie text-[6.5vw] md:text-[1.1rem] mb-4 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              Oops! Looks like you made a mistake somewhere... 
              Seems like you accidentally pressed No like...10 times! :O 
              <br/><br/>
              Did you mean: <strong style={{ color: 'var(--primary)' }}>YES</strong>? 💕
            </p>

            <button
              onClick={handleModalClose}
              className="px-8 py-4 font-bold text-[5vw] md:text-[1.2rem] active:scale-95 transition-transform"
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: '3px solid var(--primary-dark)',
                boxShadow: '4px 4px 0 var(--primary-dark)',
                borderRadius: '4px',
              }}
            >
              I meant YES! 🥰
            </button>

            {/* Corner stickers */}
            <div className="absolute -bottom-3 -left-3 text-3xl animate-wobble">🐰</div>
            <div className="absolute -bottom-3 -right-3 text-3xl duck-float">🦆</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
