"use client";

import { Section, Carousel, ImageGrid } from '@/components';
import { FloatingDucks } from '@/components/ScrapbookElements';
import React from 'react';
import { CarouselItem } from '@/data/carouselPhotos';
import { PhotoGridImage } from '@/data/photoGridImages';

export default function MemoriesSection({ items, images }: { items: CarouselItem[]; images: PhotoGridImage[] }) {
  return (
    <Section 
      id="memories" 
      title=""
      className="paper-kraft"
      show={false}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Section header */}
      <div className="text-center mb-8 relative z-10">
        <div className="washi-green inline-block mb-4 z-99999">OUR MEMORIES TOGETHER</div>
        <p className="text-handwritten mt-2" style={{ color: 'var(--muted)' }}>
          📸 moments we&apos;ve shared ✨
        </p>
      </div>
      
      {/* Scrapbook decorations */}
      <div className="absolute top-20 left-8 text-4xl">📷</div>
      <div className="absolute top-16 right-16 text-3xl animate-wobble">🦆</div>
      <div className="absolute bottom-32 right-8 text-3xl">🌿</div>
      
      {/* Washi tape strips */}
      {/* <div className="absolute top-0 left-1/3 w-28 h-5 washi-yellow" style={{ transform: 'rotate(-2deg)' }} /> */}
      <div className="absolute bottom-0 right-1/4 w-24 h-5 washi-pink" style={{ transform: 'rotate(3deg)' }} />
      
      {/* Rotating photo carousel in a frame */}
      <div className="mb-12 relative z-10 max-w-3xl mx-auto">
        <div className="frame-taped">
          <Carousel items={items} autoPlay={true} interval={5000} />
        </div>
      </div>
      
      {/* Interactive photo grid */}
      <div className="mt-8 relative z-10">
        <ImageGrid images={images} />
      </div>
      
      {/* Floating ducks! Katie loves ducks */}
      <FloatingDucks count={3} />
    </Section>
  );
}
