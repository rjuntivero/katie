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

  // Cute scroll/whoosh sound for scroll button
  const playScrollSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Soft descending whoosh with a cute bounce
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.2);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }, []);

  // Correct answer celebration sound - cheerful chime
  const playCorrectSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Happy ascending arpeggio
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      
      gain.gain.setValueAtTime(0, now + i * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.2);
      
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.25);
    });

    // Sparkle on top
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(1568, now + 0.21); // G6
    sparkle.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
    
    sparkleGain.gain.setValueAtTime(0.08, now + 0.21);
    sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    sparkle.start(now + 0.21);
    sparkle.stop(now + 0.45);
  }, []);

  // Wrong answer buzzer - retro hurt sound
  const playWrongSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Two descending tones for "uh-oh" effect
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Second lower tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(150, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 0.25);
    
    gain2.gain.setValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
    
    osc2.start(now + 0.12);
    osc2.stop(now + 0.3);
  }, []);

  // Next clue transition sound - cute page flip/swipe
  const playNextClueSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Quick ascending "flip" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.18);
  }, []);

  // Paper sliding sound - pure airy whoosh with no percussion
  const playPaperSlideSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Pure white noise whoosh with very gentle envelope
    const bufferSize = ctx.sampleRate * 0.6;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Generate smooth noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.8;
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();
    const filter2 = ctx.createBiquadFilter();
    
    noise.buffer = noiseBuffer;
    
    // Highpass to remove low rumble
    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(400, now);
    filter1.Q.setValueAtTime(0.5, now);
    
    // Lowpass for smooth air sound
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(4000, now);
    filter2.frequency.exponentialRampToValueAtTime(1500, now + 0.25);
    filter2.frequency.exponentialRampToValueAtTime(800, now + 0.5);
    filter2.Q.setValueAtTime(0.7, now);
    
    noise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    // Very gentle fade in and out - no sharp attack
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.06, now + 0.15);
    noiseGain.gain.linearRampToValueAtTime(0.055, now + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
    
    noise.start(now);
    noise.stop(now + 0.6);
  }, []);

  // Polaroid drop sound - purely airy with no percussion
  const playPolaroidSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Light airy whoosh - no oscillator/thud
    const bufferSize = ctx.sampleRate * 0.2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.7;
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();
    const filter2 = ctx.createBiquadFilter();
    
    noise.buffer = noiseBuffer;
    
    // Highpass to keep it airy
    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(800, now);
    filter1.Q.setValueAtTime(0.5, now);
    
    // Lowpass for smooth descent
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(3500, now);
    filter2.frequency.exponentialRampToValueAtTime(1500, now + 0.15);
    filter2.Q.setValueAtTime(0.7, now);
    
    noise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    // Gentle envelope
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.05, now + 0.04);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    
    noise.start(now);
    noise.stop(now + 0.2);
  }, []);

  // Tape sticking sound - adhesive peel/stick
  const playTapeSound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Quick sticky "thwip" sound
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noise.buffer = noiseBuffer;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4000, now);
    filter.frequency.exponentialRampToValueAtTime(1500, now + 0.08);
    filter.Q.setValueAtTime(3, now);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    noise.start(now);
    noise.stop(now + 0.12);
    
    // Small impact thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);
    
    oscGain.gain.setValueAtTime(0.08, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    osc.start(now + 0.02);
    osc.stop(now + 0.1);
  }, []);

  // Dreamy wavy sound for page entrance - like getting lost in thoughts
  const playDreamySound = useCallback(() => {
    const ctx = contextRef.current || getAudioContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    // Create wavy, rippling oscillations like a dream sequence
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      filter.type = 'lowpass';
      
      const baseFreq = 200 + i * 150;
      const delay = i * 0.15;
      
      // Wavy frequency modulation
      osc.frequency.setValueAtTime(baseFreq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + delay + 0.4);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + delay + 0.8);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + delay + 1.2);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + delay + 1.8);
      
      // Filter cutoff for dreamy effect
      filter.frequency.setValueAtTime(800, now + delay);
      filter.frequency.exponentialRampToValueAtTime(1200, now + delay + 0.6);
      filter.frequency.exponentialRampToValueAtTime(600, now + delay + 1.5);
      filter.Q.setValueAtTime(1, now + delay);
      
      // Gentle fade in and out
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.08 - i * 0.02, now + delay + 0.3);
      gain.gain.linearRampToValueAtTime(0.06 - i * 0.015, now + delay + 1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 1.8);
      
      osc.start(now + delay);
      osc.stop(now + delay + 2);
    }
    
    // Add ethereal high layer
    const highOsc = ctx.createOscillator();
    const highGain = ctx.createGain();
    
    highOsc.connect(highGain);
    highGain.connect(ctx.destination);
    
    highOsc.type = 'sine';
    highOsc.frequency.setValueAtTime(1400, now + 0.2);
    highOsc.frequency.exponentialRampToValueAtTime(900, now + 1.5);
    
    highGain.gain.setValueAtTime(0, now + 0.2);
    highGain.gain.linearRampToValueAtTime(0.04, now + 0.5);
    highGain.gain.exponentialRampToValueAtTime(0.01, now + 1.6);
    
    highOsc.start(now + 0.2);
    highOsc.stop(now + 1.8);
  }, []);

  return {
    playGearSound,
    playYesSound,
    playNoSound,
    playClickSound,
    playScrollSound,
    playCorrectSound,
    playWrongSound,
    playNextClueSound,
    playPaperSlideSound,
    playPolaroidSound,
    playTapeSound,
    playDreamySound,
  };
}
