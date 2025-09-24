'use client';

import ThreeScrollBackground from "@/components/ThreeScrollBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import CurrentWork from "@/components/CurrentWork";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ScrollProvider } from "@/contexts/ScrollContext";

const sections = [
  { id: 'hero', title: 'Hero', position: 0 },
  { id: 'about', title: 'About', position: -200 },
  { id: 'experience', title: 'Experience', position: -400 },
  { id: 'portfolio', title: 'Portfolio', position: -600 },
  { id: 'current-work', title: 'Current Work', position: -800 },
  { id: 'skills', title: 'Skills', position: -1000 },
  { id: 'contact', title: 'Contact', position: -1200 }
];

export default function Home() {
  return (
    <ScrollProvider>
      <div className="min-h-screen bg-transparent text-gray-100 relative overflow-hidden">
        {/* 3D Scroll Background with Content */}
        <ThreeScrollBackground sections={sections}>
        {/* Content sections positioned for 3D scroll */}
        <section 
          id="hero" 
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 10, pointerEvents: 'none' }}
        >
          <div className="w-full h-full flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
            <Hero />
          </div>
        </section>
        
        <section 
          id="about" 
          className="fixed inset-0 flex items-center justify-center overflow-auto"
          style={{ zIndex: 9, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8 max-h-full" style={{ pointerEvents: 'auto' }}>
            <About />
          </div>
        </section>
        
        <section 
          id="experience" 
          className="fixed inset-0 overflow-auto"
          style={{ zIndex: 8, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8" style={{ pointerEvents: 'auto' }}>
            <Timeline />
          </div>
        </section>
        
        <section 
          id="portfolio" 
          className="fixed inset-0 overflow-auto"
          style={{ zIndex: 7, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8" style={{ pointerEvents: 'auto' }}>
            <Portfolio />
          </div>
        </section>
        
        <section 
          id="current-work" 
          className="fixed inset-0 overflow-auto"
          style={{ zIndex: 6, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8" style={{ pointerEvents: 'auto' }}>
            <CurrentWork />
          </div>
        </section>
        
        <section 
          id="skills" 
          className="fixed inset-0 flex items-center justify-center overflow-auto"
          style={{ zIndex: 5, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8 max-h-full" style={{ pointerEvents: 'auto' }}>
            <Skills />
          </div>
        </section>
        
        <section 
          id="contact" 
          className="fixed inset-0 overflow-auto"
          style={{ zIndex: 4, opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-8" style={{ pointerEvents: 'auto' }}>
            <Contact />
            <Footer />
          </div>
        </section>
        
        {/* Fixed Navigation - moved inside ThreeScrollBackground */}
        <Header />
      </ThreeScrollBackground>
    </div>
    </ScrollProvider>
  );
}
