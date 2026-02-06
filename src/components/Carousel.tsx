'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface CarouselItem {
  id: string;
  src: string;
  type: 'image' | 'video';
  alt?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ items, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const goToSlide = (targetIndex: number) => {
    const newIndex = (targetIndex + items.length) % items.length;
    const oldIndex = currentIndexRef.current;
    
    if (newIndex === oldIndex) return;

    if (itemsContainerRef.current) {
      const children = itemsContainerRef.current.children as HTMLCollectionOf<HTMLElement>;
      
      // Both at same z-index, crossfade simultaneously
      children[newIndex].style.zIndex = '1';
      children[oldIndex].style.zIndex = '1';
      
      // Fade in new slide
      gsap.fromTo(children[newIndex], 
        { opacity: 0 },
        { duration: 0.6, opacity: 1, ease: 'power2.inOut' }
      );
      
      // Fade out old slide
      gsap.to(children[oldIndex], {
        duration: 0.6,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          children[oldIndex].style.zIndex = '0';
        }
      });
    }

    currentIndexRef.current = newIndex;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => goToSlide(currentIndexRef.current + 1);
  const prevSlide = () => goToSlide(currentIndexRef.current - 1);

  useEffect(() => {
    if (!autoPlay) return;

    autoPlayRef.current = setInterval(() => {
      const newIndex = (currentIndexRef.current + 1) % items.length;
      const oldIndex = currentIndexRef.current;

      if (itemsContainerRef.current) {
        const children = itemsContainerRef.current.children as HTMLCollectionOf<HTMLElement>;
        
        // Both at same z-index, crossfade simultaneously
        children[newIndex].style.zIndex = '1';
        children[oldIndex].style.zIndex = '1';
        
        // Fade in new slide
        gsap.fromTo(children[newIndex], 
          { opacity: 0 },
          { duration: 0.6, opacity: 1, ease: 'power2.inOut' }
        );
        
        // Fade out old slide
        gsap.to(children[oldIndex], {
          duration: 0.6,
          opacity: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            children[oldIndex].style.zIndex = '0';
          }
        });
      }

      currentIndexRef.current = newIndex;
      setCurrentIndex(newIndex);
    }, interval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, interval, items.length]);

  useEffect(() => {
    // Initialize: first slide visible, others hidden
    if (itemsContainerRef.current) {
      const children = itemsContainerRef.current.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < children.length; i++) {
        if (i === 0) {
          gsap.set(children[i], { opacity: 1 });
          children[i].style.zIndex = '1';
        } else {
          gsap.set(children[i], { opacity: 0 });
          children[i].style.zIndex = '0';
        }
      }
    }
  }, []);

  useEffect(() => {
    // Animate carousel entrance
    gsap.from(carouselRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 50,
      ease: 'power2.out',
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <div ref={carouselRef} className="relative w-full overflow-hidden rounded-2xl">
      {/* Carousel container */}
      <div className="relative w-full h-96 bg-black/20">
        <div
          ref={itemsContainerRef}
          className="relative w-full h-full"
        >
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className="absolute w-full h-full inset-0"
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt || 'Carousel item'}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-100 btn btn-sm bg-background text-black rounded-full shadow-lg"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-100 btn btn-sm bg-background text-black rounded-full shadow-lg"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
