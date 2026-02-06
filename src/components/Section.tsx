'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  style?: React.CSSProperties;  // Allow inline styles
}

export default function Section({ id, title, children, className = '', show = true, style }: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate section entrance when it comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !titleRef.current?.classList.contains('animated')) {
          gsap.from(titleRef.current, {
            duration: 0.8,
            opacity: 0,
            x: -50,
            ease: 'power2.out',
          });

          gsap.from(contentRef.current, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: 'power2.out',
            delay: 0.2,
          });

          titleRef.current?.classList.add('animated');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className}`}
      style={style}
    >
      <div className="content-container">
        <h2 ref={titleRef} className={`heading-section mb-12 text-center ${show ? '' : 'hidden'}`}>
          {title}
        </h2>
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
}
