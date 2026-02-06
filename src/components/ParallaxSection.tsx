'use client';

import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  layers?: Array<{
    content: React.ReactNode;
    depth: number;
    className?: string;
  }>;
}

export default function ParallaxSection({
  id,
  title,
  subtitle,
  children,
  className = '',
  layers = [],
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This component uses CSS 3D transforms with perspective
    // The perspective is set via CSS, and each layer uses translateZ
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{
        perspective: '1px',
      }}
    >
      {/* Multiple layers with different depths */}
      {layers.length > 0 ? (
        layers.map((layer, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex items-center justify-center ${layer.className || ''}`}
            style={{
              transform: `translateZ(${layer.depth}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {layer.content}
          </div>
        ))
      ) : (
        <>
          {/* Default single layer with content */}
          <div
            className="absolute inset-0 bg-linear-to-b from-purple-900 via-gray-900 to-black opacity-80"
            style={{
              transform: 'translateZ(-2px)',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* Content layer closer to viewer */}
          <div
            className="relative z-10 text-center px-4 max-w-4xl"
            style={{
              transform: 'translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">{title}</h2>
            {subtitle && <p className="text-xl md:text-2xl text-gray-300 mb-8">{subtitle}</p>}
            {children}
          </div>
        </>
      )}
    </section>
  );
}
