'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface GridImage {
  id: string;
  src: string;
  alt?: string;
  span?: 'normal' | 'wide' | 'tall' | 'large'; // layout variations
}

interface ImageGridProps {
  images: GridImage[];
  className?: string;
}

export default function ImageGrid({ images, className = '' }: ImageGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const directionsRef = useRef<{ [key: string]: { x: number; y: number; rotate: number } }>({});

  const getSpanClasses = (span?: string) => {
    switch (span) {
      case 'wide':
        return 'md:col-span-2'; // 2 columns wide
      case 'tall':
        return 'md:row-span-2'; // 2 rows tall
      case 'large':
        return 'md:col-span-2 md:row-span-2'; // 2x2 large
      default:
        return ''; // normal 1x1
    }
  };

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    const element = imageRefs.current[id];
    if (!element) return;

    // Get or generate random direction for this image
    if (!directionsRef.current[id]) {
      const directions = [
        { x: -15, y: 0, rotate: -2 }, // flex left
        { x: 15, y: 0, rotate: 2 },   // flex right
        { x: 0, y: -15, rotate: 1 },  // flex up
        { x: 0, y: 15, rotate: -1 },  // flex down
        { x: -10, y: -10, rotate: -3 }, // diagonal top-left
        { x: 10, y: -10, rotate: 3 },   // diagonal top-right
        { x: -10, y: 10, rotate: 2 },   // diagonal bottom-left
        { x: 10, y: 10, rotate: -2 },   // diagonal bottom-right
      ];
      directionsRef.current[id] = directions[Math.floor(Math.random() * directions.length)];
    }

    const randomDirection = directionsRef.current[id];

    gsap.to(element, {
      duration: 0.4,
      x: randomDirection.x,
      y: randomDirection.y,
      rotation: randomDirection.rotate,
      scale: 1.05,
      zIndex: 50,
      boxShadow: '0 5px 50px rgba(168, 85, 247, 0.4)',
      ease: 'power2.out',
    });

    // Animate the image inside
    const img = element.querySelector('img');
    if (img) {
      gsap.to(img, {
        duration: 0.4,
        scale: 1.1,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (id: string) => {
    setHoveredId(null);
    const element = imageRefs.current[id];
    if (!element) return;

    gsap.to(element, {
      duration: 0.4,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      zIndex: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      ease: 'power2.out',
    });

    // Reset image scale
    const img = element.querySelector('img');
    if (img) {
      gsap.to(img, {
        duration: 0.4,
        scale: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 ${className}`}
    >
      {images.map((image) => (
        <div
          key={image.id}
          ref={(el) => {
            imageRefs.current[image.id] = el;
          }}
          onMouseEnter={() => handleMouseEnter(image.id)}
          onMouseLeave={() => handleMouseLeave(image.id)}
          className={`relative overflow-hidden rounded-lg cursor-pointer ${getSpanClasses(
            image.span
          )}`}
          style={{ willChange: 'transform' }}
        >
          <Image fill
            src={image.src}
            alt={image.alt || `Grid image ${image.id}`}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none ${
              hoveredId === image.id ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transition: 'opacity 0.3s ease-out',
            }}
          />
        </div>
      ))}
    </div>
  );
}
