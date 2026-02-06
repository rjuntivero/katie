'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useSounds } from '@/hooks/useSounds';

gsap.registerPlugin(ScrollToPlugin);

interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

interface NavbarProps {
  items: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const diamondsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  
  // Track which section is currently in view
  const [activeSection, setActiveSection] = useState(items[0].id);
  const [isNavHidden, setIsNavHidden] = useState(false);
  
  const { playGearSound, playClickSound } = useSounds();

  // Toggle navbar visibility with smooth animation
  const toggleNav = () => {
    if (!navItemsRef.current) return;
    
    playGearSound();
    
    if (isNavHidden) {
      // Show nav - slide in from left
      gsap.to(navItemsRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      // Hide nav - slide out to left
      gsap.to(navItemsRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
    setIsNavHidden(!isNavHidden);
  };

  // Scroll to section smoothly
  const handleScroll = (sectionId: string) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 0,
        scrollTo: {
          y: element,
          autoKill: false,
        },
        ease: 'power2.inOut',
      });
    }
  };

  // Entrance animations (once, on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { x: -40, opacity: 0 },
          {
            duration: 0.6,
            x: 0,
            opacity: 1,
            ease: 'power2.out',
            immediateRender: false,
            onComplete: () => {
              if (navRef.current) {
                gsap.set(navRef.current, { clearProps: 'transform,opacity' });
              }
            },
          }
        );
      }

      gsap.fromTo(
        '.nav-sticker-btn',
        { y: -10, opacity: 0 },
        {
          duration: 0.5,
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.15,
          ease: 'power2.out',
          immediateRender: false,
          onComplete: () => { gsap.set('.nav-sticker-btn', { clearProps: 'transform,opacity' }); },
        }
      );

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: -8 },
          {
            duration: 0.4,
            opacity: 1,
            y: 0,
            delay: 0.2,
            ease: 'power2.out',
            immediateRender: false,
            onComplete: () => {
              if (labelRef.current) {
                gsap.set(labelRef.current, { clearProps: 'transform,opacity' });
              }
            },
          }
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Track which section is in view using IntersectionObserver
  useEffect(() => {
    const observers = items.map(item => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { root: null, threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, [items]);

  // Animate label change when active section changes
  useEffect(() => {
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        duration: 0.3,
        opacity: 0,
        y: 10,
        ease: 'power2.out',
        onComplete: () => {
          const activeItem = items.find(item => item.id === activeSection);
          if (labelRef.current && activeItem) {
            labelRef.current.textContent = activeItem.label;
            gsap.fromTo(labelRef.current,
              { opacity: 0, y: -10 },
              { duration: 0.3, opacity: 1, y: 0, ease: 'power2.out' }
            );
          }
        },
      });
    }
  }, [activeSection, items]);

  return (
    <nav
      ref={navRef}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-3 py-4 z-999999"
    >
      {/* Cute toggle button - always visible */}
      <button
        onClick={toggleNav}
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: isNavHidden ? '#fce4ec' : '#e8a4b8',
          border: '3px solid #c97d94',
          boxShadow: '3px 3px 0 #c97d94',
        }}
        title={isNavHidden ? 'Show navigation' : 'Hide navigation'}
      >
        <span 
          className="transition-transform duration-300"
          style={{ transform: isNavHidden ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          {isNavHidden ? '🐰' : '✿'}
        </span>
      </button>

      {/* Nav items container - slides in/out */}
      <div ref={navItemsRef} className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="flex items-center gap-3">
              {/* Sticker button */}
              <button
                ref={(el) => {
                  if (el) diamondsRef.current[idx] = el;
                }}
                onClick={() => handleScroll(item.id)}
                className="nav-sticker-btn relative w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all cursor-pointer"
                style={{
                  opacity: 1,
                  willChange: 'transform, opacity',
                  backgroundColor: isActive ? '#e8a4b8' : '#fdfcf8',
                  border: isActive ? '3px solid #c97d94' : '2px solid #d4c4b0',
                  boxShadow: isActive ? '3px 3px 0 #c97d94' : '2px 2px 0 #c9b896',
                  transform: isActive ? 'translate(-1px, -1px) scale(1.1)' : 'none',
                }}
                title={item.label}
              >
                <span>{item.icon || '●'}</span>
              </button>
              
              {/* Label - only show for active */}
              {/* {isActive && (
                <div
                  ref={labelRef}
                  className="text-xs font-bold uppercase tracking-wide whitespace-nowrap px-3 py-1.5"
                  style={{ 
                    color: '#c97d94',
                    backgroundColor: '#fce4ec',
                    border: '2px solid #e8a4b8',
                    boxShadow: '2px 2px 0 #e8a4b8',
                  }}
                >
                  {item.label}
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
