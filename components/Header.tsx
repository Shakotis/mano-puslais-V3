"use client";

import React, { useState, useEffect } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem 
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { ProjectProgressDisplay } from "@/components/ProjectProgressDisplay";
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const navItems: Array<{name: string; href: string; external?: boolean}> = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "3D Gallery", href: "/gallery", external: true },
    { name: "Currently Working On", href: "#current-work" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Filter out external links and only observe internal anchor links
    const internalNavItems = navItems.filter(item => !item.external);
    const sections = internalNavItems.map(item => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
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

  const handleNavClick = (href: string, isExternal?: boolean) => {
    setIsMenuOpen(false);
    if (isExternal) {
      window.location.href = href;
    } else {
      // Use conventional scrolling
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="fixed top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50"
      maxWidth="xl"
      shouldHideOnScroll
      height="4rem"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-100 hover:text-indigo-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/50"
        />
        <NavbarBrand>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 sm:space-x-4"
          >
            <p className="font-bold text-base sm:text-lg text-gray-100 truncate">Dovydas Jusevičius</p>
            <div className="hidden lg:block">
              <ProjectProgressDisplay variant="mini" />
            </div>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={item.name} isActive={!item.external && activeSection === item.href}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Link
                color="foreground"
                href={item.href}
                className={`px-3 py-2 text-sm transition-all duration-300 cursor-pointer rounded-md ${
                  activeSection === item.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={(e: React.MouseEvent) => {
                  if (!item.external) {
                    e.preventDefault();
                    handleNavClick(item.href, false);
                  } else {
                    handleNavClick(item.href, true);
                  }
                }}
              >
                {item.name}
              </Link>
              {!item.external && activeSection === item.href && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                  layoutId="underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="bg-gray-950/95 backdrop-blur-md pt-6">
        <div className="flex flex-col space-y-1">
          {/* Mobile Progress Display */}
          <div className="px-4 pb-4 mb-4 border-b border-gray-800">
            <div className="md:hidden">
              <ProjectProgressDisplay variant="mini" className="justify-center" />
            </div>
          </div>
          
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`} className="px-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <Link
                  color={!item.external && activeSection === item.href ? "primary" : "foreground"}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    !item.external && activeSection === item.href 
                      ? "bg-indigo-600/20 text-indigo-300 border-l-4 border-indigo-500" 
                      : item.external
                      ? "text-purple-400 hover:text-purple-300 hover:bg-purple-600/10" 
                      : "text-gray-300 hover:text-indigo-400 hover:bg-indigo-600/10"
                  }`}
                  href={item.href}
                  size="lg"
                  onClick={(e: React.MouseEvent) => {
                    if (!item.external) {
                      e.preventDefault();
                      handleNavClick(item.href, false);
                    } else {
                      handleNavClick(item.href, true);
                    }
                  }}
                >
                  <span className="font-medium">{item.name}</span>
                  {item.external && (
                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                  {!item.external && activeSection === item.href && (
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  )}
                </Link>
              </motion.div>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;