'use client';

import ThreeBackground from "@/components/ThreeBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import CurrentWork from "@/components/CurrentWork";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
      <div className="min-h-screen bg-transparent text-gray-100 relative">
        {/* 3D Scroll Background with Content */}
        {/* 3D Background Component - now just provides visual background */}
        <ThreeBackground />
        
        {/* Fixed Navigation Header */}
        <Header />
        
        {/* Content sections with conventional scrolling */}
        <section id="hero" className="min-h-screen relative">
          <Hero />
        </section>
        
        <section id="about" className="py-20 relative">
          <About />
        </section>
        
        <section id="experience" className="py-20 relative">
          <Timeline />
        </section>
        
        <section id="portfolio" className="py-20 relative">
          <Portfolio />
        </section>
        
        <section id="current-work" className="py-20 relative">
          <CurrentWork />
        </section>
        
        <section id="skills" className="py-20 relative">
          <Skills />
        </section>
        
        <section id="contact" className="py-20 relative">
          <Contact />
          <Footer />
        </section>
      </div>
  );
}