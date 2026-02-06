# 💕 Katie - Quick Start Guide

Your site is live and ready to customize! Here's everything you need to know to make it uniquely yours.

## 🚀 What You Have

A fully functional, beautifully animated site with:
- **Vertical navbar** with smooth scroll navigation
- **Image/video carousel** with auto-play
- **Reusable components** (Cards, Buttons, Sections)
- **GSAP animations** for smooth, professional motion
- **Mobile responsive** design

## 🎨 Your Site is Running!

The dev server is already running at **http://localhost:3000**

## 📝 How to Customize

### 1. Replace Placeholder Images
Edit `src/app/page.tsx` and replace the image URLs:

```tsx
const carouselItems = [
  {
    id: '1',
    src: '/your-photo.jpg',  // Place files in public/ folder
    type: 'image' as const,
  },
  // Add more...
];

const memories = [
  {
    title: 'Your Memory',
    description: 'Your description',
    image: '/your-image.jpg',
  },
];
```

### 2. Update Navigation Labels
In the same file, change navbar items:

```tsx
const navItems = [
  { id: 'home', label: 'Home', icon: '❤️' },
  { id: 'gallery', label: 'Gallery', icon: '📸' },
  // Customize as needed
];
```

### 3. Add Your Photos/Videos
1. Place files in `public/` folder
2. Reference them as `/filename.ext` in your code
3. Use `type: 'image'` or `type: 'video'` accordingly

### 4. Edit Content
Change section titles, descriptions, and text directly in `page.tsx`.

## 🎬 Component Examples

### Adding a New Section
```tsx
<Section id="special" title="Our Special Day">
  <p className="text-white text-center">Your content here</p>
</Section>
```

### More Card Examples
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <Card 
    title="Memory 1"
    description="This was amazing"
    image="/photo1.jpg"
  />
</div>
```

### Button Variants
```tsx
<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="ghost" size="sm">Ghost</Button>
```

## 🌐 Deploying to Vercel (FREE)

### Quick Deploy (Recommended - 1 minute)
```bash
npm i -g vercel
vercel
```
Just follow the prompts!

### Or via GitHub
1. Push code to GitHub
2. Go to vercel.com/new
3. Import your GitHub repo
4. Done! Auto-deploys on every push

### Get a Custom Domain (Optional)
In Vercel dashboard → Project Settings → Domains → Add custom domain

## 📁 File Structure
```
katie/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← Edit content here!
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/           ← Pre-built components
│       ├── Navbar.tsx
│       ├── Carousel.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Section.tsx
│       └── Hero.tsx
├── public/                   ← Put images/videos here!
└── package.json
```

## 🎯 Common Tasks

**Change colors (purple/pink)?**
- Edit `globals.css` - search for hex codes like `#a855f7`

**Adjust animation speed?**
- In components, change `duration: 0.8` to a different value (higher = slower)

**Add more carousel slides?**
- Add items to `carouselItems` array in `page.tsx`

**Make carousel not auto-play?**
- Change `<Carousel autoPlay={true}` to `autoPlay={false}`

**Increase section heights?**
- Change `min-h-screen` to `h-screen` or other Tailwind heights

## ⚡ Performance Tips

- Keep videos under 5MB
- Optimize images before uploading
- Don't animate too many things at once
- Use modern formats (WebP for images, MP4 for video)

## 🐛 Troubleshooting

**Dev server crashes?**
```bash
npm run dev
# If still broken, restart VS Code terminal
```

**Images not showing?**
- Make sure they're in the `public/` folder
- Use `/filename.jpg` not `./filename.jpg`

**Animations look jerky?**
- Enable hardware acceleration in your browser
- Reduce animation duration values
- Limit simultaneous animations

## 📖 More Help

- GSAP (animations): https://gsap.com
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel (hosting): https://vercel.com/docs

## ✨ Next Steps

1. Add your photos to `public/` folder
2. Update image URLs in `page.tsx`
3. Change text and titles
4. Test on mobile (your phone)
5. Deploy to Vercel
6. Share the link! 💕

---

**Everything is ready to go. Just customize and deploy!**
