'use client';

import { useCallback, useRef, useEffect } from 'react';

// Audio context singleton
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
};

export function useSounds() {
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    contextRef.current = getAudioContext();
  }, []);

  // Gear/mechanical click sound for nav toggle
  const playGearSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Create two quick clicks for gear effect
    for (let i = 0; i < 2; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(800 - i * 200, now + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(400, now + i * 0.05 + 0.03);
      
      gain.gain.setValueAtTime(0.15, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.05);
      
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.06);
    }
  }, []);

  // Joyous pop sound for Yes button
  const playYesSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Ascending cheerful notes
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });

    // Add a final sparkle
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(2093, now + 0.32); // High C
    sparkle.frequency.exponentialRampToValueAtTime(1500, now + 0.45);
    
    sparkleGain.gain.setValueAtTime(0.1, now + 0.32);
    sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    sparkle.start(now + 0.32);
    sparkle.stop(now + 0.55);
  }, []);

  // Retro damage/hit sound for No button
  const playNoSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Descending "oof" sound like retro game damage
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.25);

    // Add noise burst for impact
    const bufferSize = ctx.sampleRate * 0.1;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noise.buffer = noiseBuffer;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    noise.start(now);
    noise.stop(now + 0.15);
  }, []);

  // Generic retro click for other buttons
  const playClickSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Quick blip sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.1);
  }, []);

  return {
    playGearSound,
    playYesSound,
    playNoSound,
    playClickSound,
  };
}
