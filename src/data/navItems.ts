export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'I have something for you', icon: '🏠' },
  { id: 'love-letter', label: 'Dear Katie', icon: '💌' },
  { id: 'reasons', label: 'U R My Girlfriend For a Reason', icon: '💕' },
  // { id: 'memories', label: 'Our Memories', icon: '📸' },
  { id: 'treasure-hunt', label: 'YOU KNOW ME SO WELL...RIGHT?', icon: '🔮' },
  { id: 'valentine', label: 'so...uhh', icon: '💖' },
];
