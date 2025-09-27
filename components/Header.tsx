"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
} from "@heroui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map(item => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    console.log('Toggling drawer, current state:', isDrawerOpen);
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <nav 
          className={`transition-all duration-300 h-[72px] ${
            isScrolled 
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
              : "bg-black/20 backdrop-blur-md border-b border-white/5"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
            {/* Brand */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => handleNavClick("#hero")}
              >
                <h1 className="leading-tight text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Dovydas Jusevičius
                </h1>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-end flex-1 max-w-2xl">
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm border border-white/10">
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                          activeSection === item.href
                            ? "text-black font-semibold"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.name}
                        {activeSection === item.href && (
                          <motion.div
                            className="absolute inset-0 bg-white rounded-full -z-10"
                            layoutId="active-pill"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={toggleDrawer}
                  className="relative p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 group active:scale-95"
                >
                  <FaBars className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        placement="right"
        size="sm" 
        className="lg:hidden"
        hideCloseButton
      >
        <DrawerContent className="bg-gradient-to-b from-black/95 via-black/95 to-black/98 backdrop-blur-xl border-l border-white/10">
          <DrawerBody className="p-0 overflow-hidden">
            {/* Custom Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5"
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Menu
              </h2>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDrawerOpen(false)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <FaTimes className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex flex-col py-8 px-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative mx-4 mb-2"
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative w-full text-left py-4 px-6 rounded-2xl transition-all duration-300 group overflow-hidden ${
                      activeSection === item.href 
                        ? "text-black bg-white font-semibold shadow-xl shadow-white/20 border border-white/20" 
                        : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: activeSection === item.href ? 1 : 0,
                          scale: activeSection === item.href ? 1 : 0
                        }}
                        className="w-2 h-2 rounded-full bg-black"
                      />
                    </motion.div>
                    
                    {/* Hover effect line */}
                    {activeSection !== item.href && (
                      <motion.div 
                        className="absolute left-6 bottom-3 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "2rem" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Background glow effect */}
                    {activeSection !== item.href && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="p-6 border-t border-white/10 bg-white/5"
              >
                <p className="text-sm text-gray-400 text-center font-medium">
                  © 2024 Dovydas Jusevičius
                </p>
              </motion.div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;