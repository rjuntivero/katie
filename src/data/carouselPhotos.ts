export type CarouselItem = {
  id: string;
  src: string;
  type: 'image' | 'video';
  alt?: string;
};

export const carouselPhotos: CarouselItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=800&fit=crop',
    type: 'image',
    alt: 'Photo 1 - Replace with your memory',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=800&fit=crop',
    type: 'image',
    alt: 'Photo 2 - Replace with your memory',
  },
  {
    id: '3',
    src: '/fifthelem.jpg',
    type: 'image',
    alt: 'Photo 3 - Replace with your memory',
  },
];
