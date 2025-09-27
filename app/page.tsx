"use client";

import ThreeBackground from "@/components/ThreeBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RocketScrollToTop from "@/components/RocketScrollToTop";

export default function Home() {
  return (
    <div className="bg-transparent text-gray-100 relative">
      <ThreeBackground />
      <Header />
      
      <main>
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="about" className="py-24 relative">
          <About />
        </section>
        
        <section id="experience" className="py-24 relative">
          <Timeline />
        </section>
        
        <section id="portfolio" className="py-24 relative">
          <Portfolio />
        </section>
        
        <section id="skills" className="py-24 relative">
          <Skills />
        </section>
        
        <section id="contact" className="py-24 relative">
          <Contact />
        </section>
      </main>
      
      <Footer />
      <RocketScrollToTop />
    </div>
  );
}