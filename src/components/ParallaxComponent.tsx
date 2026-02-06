'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxComponentProps {
  children: React.ReactNode;
  speed?: number; // Negative = moves slower (further back), positive = moves faster (closer)
  className?: string;
}

export default function ParallaxComponent({
  children,
  speed = -0.5,
  className = '',
}: ParallaxComponentProps) {
  const ComponentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ComponentRef.current) return;

    const element = ComponentRef.current;

    // Use GSAP with yPercent based on scroll speed
    // Negative speed = slower movement (appears further away)
    gsap.to(element, {
      yPercent: speed * 100, // Will move slower than scroll
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Smooth sync with scrollbar
      },
    });

    return () => {
      gsap.killTweensOf(element);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={ComponentRef} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
}
