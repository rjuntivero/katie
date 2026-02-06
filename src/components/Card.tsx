'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  children,
  onClick,
  className = '',
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      duration: 0.3,
      y: -8,
      rotation: 2,
      ease: 'power2.out',
    });

    // Lift image slightly on hover
    const img = cardRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1.05,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      duration: 0.3,
      y: 0,
      rotation: 0,
      ease: 'power2.out',
    });

    // Reset image scale
    const img = cardRef.current?.querySelector('img');
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    // Animate card entrance
    gsap.from(cardRef.current, {
      duration: 0.6,
      opacity: 0,
      y: 30,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className}`}
      style={{
        background: 'var(--cream)',
        border: '2px solid var(--border)',
        boxShadow: '4px 4px 0 var(--kraft)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image src={image} alt={title} fill className="w-full h-full object-cover"/>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{title}</h3>
        {description && <p className="text-sm" style={{ color: 'var(--muted)' }}>{description}</p>}
        {children}
      </div>
    </div>
  );
}
