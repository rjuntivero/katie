'use client';

import { useRef } from 'react';
import gsap from 'gsap';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: 'bg-gradient-brand text-white hover:shadow-lg',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      duration: 0.3,
      scale: 1.05,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      duration: 0.3,
      scale: 1,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    // Ripple effect
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        duration: 0.6,
        boxShadow: `0 0 20px rgba(168, 85, 247, 0.6)`,
        ease: 'power2.out',
      });

      gsap.to(buttonRef.current, {
        duration: 0.6,
        boxShadow: `0 0 0px rgba(168, 85, 247, 0)`,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`btn ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
