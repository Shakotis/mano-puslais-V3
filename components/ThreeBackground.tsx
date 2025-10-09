'use client';

import { useEffect, useState } from 'react';
import Galaxy from './Galaxy';

const ThreeBackground: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const aboutSection = document.getElementById('about');
      
      if (!heroSection || !aboutSection) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate the gap between hero and about sections
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const aboutTop = aboutSection.offsetTop;
      const gapBetweenSections = aboutTop - heroBottom;
      const gapMidpoint = heroBottom + (gapBetweenSections / 2);
      
      // Transition spans the entire gap, centered on the midpoint
      const transitionStartPoint = heroBottom;
      const transitionEndPoint = aboutTop-heroSection.offsetHeight;
      const transitionRange = (transitionEndPoint - transitionStartPoint)/2;

      // Calculate smooth progress centered in the gap
      if (scrollY <= transitionStartPoint) {
        setScrollProgress(0);
      } else if (scrollY >= transitionEndPoint) {
        setScrollProgress(1);
      } else {
        const progress = (scrollY - transitionStartPoint) / transitionRange;
        // Apply easing function for ultra-smooth transition
        const easedProgress = progress * progress * (3 - 2 * progress); // Smoothstep
        setScrollProgress(Math.max(0, Math.min(1, easedProgress)));
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Interpolate zoom from 1.0 to 1.2 (20% zoom)
  const zoom = 1.0 + (scrollProgress * 0.2);
  
  // Interpolate speed from 0.5 to 0.15 (3x slower for more dramatic effect)
  const animationSpeed = 0.5 - (scrollProgress * 0.35);

  return (
    <div className="fixed inset-0 -z-10 bg-[#0f0f23]">
      <Galaxy
        mouseInteraction={true}
        mouseRepulsion={true}
        density={1}
        glowIntensity={0.4}
        saturation={0.3}
        hueShift={170}
        twinkleIntensity={1}
        rotationSpeed={0.04}
        repulsionStrength={6}
        autoCenterRepulsion={20}
        starSpeed={1.0}
        speed={animationSpeed}
        transparent={false}
        zoom={zoom}
      />
    </div>
  );
};

export default ThreeBackground;