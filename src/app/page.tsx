'use client';

import { 
  Hero, 
  Navbar, 
  MusicPlayer
} from '@/components';
import { BunnyOnBike } from '@/components/ScrapbookElements';
import LoveLetterSection from '@/components/sections/LoveLetterSection';
import ReasonsSection from '@/components/sections/ReasonsSection';
import MemoriesSection from '@/components/sections/MemoriesSection';
import TreasureHuntSection from '@/components/sections/TreasureHuntSection';
import ValentineSection from '@/components/sections/ValentineSection';
import { navItems } from '@/data/navItems';
import { carouselPhotos } from '@/data/carouselPhotos';
import { reasonsILoveKatie } from '@/data/reasons';
import { photoGridImages } from '@/data/photoGridImages';

export default function Home() {

  return (
    <div 
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Background music player - vinyl style */}
      <MusicPlayer 
        src="/song.mp3"
        songTitle="Always"
        artist="By: Daniel Caesar"
      />

      {/* Bunny on bike that rides across screen as you scroll! */}
      <BunnyOnBike />

      {/* Sidebar navigation */}
      <Navbar items={navItems} />

      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* Love Letter */}
      <LoveLetterSection />

      {/* Reasons */}
      <ReasonsSection reasons={reasonsILoveKatie} />

      {/* Memories */}
      {/* <MemoriesSection items={carouselPhotos} images={photoGridImages} /> */}

      {/* Treasure Hunt */}
      <TreasureHuntSection />

      {/* Valentine Proposal */}
      <ValentineSection />

      {/* ===== FOOTER ===== */}
      <footer 
        className="py-12 text-center relative paper-grid"
        style={{ background: 'var(--surface)', color: 'var(--muted)' }}
      >
        {/* Washi tape top border */}
        <div className="absolute top-0 left-0 right-0 h-6 flex justify-center gap-4 -translate-y-1/2">
          <div className="w-16 h-5 washi-pink" style={{ transform: 'rotate(-2deg)' }} />
          <div className="w-12 h-5 washi-green" style={{ transform: 'rotate(1deg)' }} />
          <div className="w-14 h-5 washi-yellow" style={{ transform: 'rotate(-1deg)' }} />
        </div>
{/*         
        <div className="flex justify-center gap-4 mb-4 text-2xl">
          <span className="animate-wobble">🐰</span>
          <span className="duck-float">🦆</span>
          <span>🍵</span>
          <span>🌸</span>
          <span className="animate-sparkle">💖</span>
        </div> */}
        <p className="mb-2 text-handwritten" style={{ fontSize: '1.1rem' }}>For my beautiful Girlfriend Katelyn</p>
        <p className="text-sm">RJ {`<3`}</p>
        
        {/* Corner stickers */}
        <div className="absolute bottom-4 left-4 text-xl">🍦</div>
        <div className="absolute bottom-4 right-4 text-xl">📚</div>
      </footer>
    </div>
  );
}
