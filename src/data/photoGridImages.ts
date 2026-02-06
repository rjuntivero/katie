export type PhotoGridSpan = 'large' | 'wide' | 'tall' | 'normal';
export interface PhotoGridImage {
  id: string;
  src: string;
  span: PhotoGridSpan;
}

export const photoGridImages: PhotoGridImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop', span: 'large' },
  { id: '2', src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop', span: 'normal' },
  { id: '3', src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop', span: 'normal' },
  { id: '4', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=400&fit=crop', span: 'wide' },
  { id: '5', src: 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400&h=800&fit=crop', span: 'tall' },
  { id: '6', src: 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400&h=800&fit=crop', span: 'wide' },
  { id: '7', src: 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400&h=800&fit=crop', span: 'tall' },
  { id: '8', src: 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400&h=800&fit=crop', span: 'normal' },
  { id: '9', src: 'https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400&h=800&fit=crop', span: 'normal' },
];
