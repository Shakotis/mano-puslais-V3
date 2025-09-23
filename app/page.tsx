import SpaceBackground from "@/components/SpaceBackground";
import RocketScroll from "@/components/RocketScroll";
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
    <div className="min-h-screen bg-gray-950 text-gray-100 relative">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Fixed Navigation */}
      <Header />
      
      {/* Scroll to Top Rocket */}
      <RocketScroll />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Timeline />
        <Portfolio />
        <CurrentWork />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
