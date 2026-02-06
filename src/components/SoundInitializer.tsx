'use client';

import { useEffect, useRef } from 'react';
import { useSounds } from '@/hooks/useSounds';

export default function SoundInitializer() {
  const { playDreamySound } = useSounds();
  const hasPlayed = useRef(false);

  useEffect(() => {
    // Play dreamy sound only once on initial mount
    if (!hasPlayed.current) {
      hasPlayed.current = true;
      const timer = setTimeout(() => {
        playDreamySound();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [playDreamySound]);

  return null; // This component doesn't render anything
}
