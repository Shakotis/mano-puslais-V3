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
import { useScrollNavigation } from "@/contexts/ScrollContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { navigateToSection } = useScrollNavigation();

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

  const getSectionIndex = (href: string) => {
    const sectionMap: { [key: string]: number } = {
      '#hero': 0,
      '#about': 1,
      '#experience': 2,
      '#portfolio': 3,
      '#current-work': 4,
      '#skills': 5,
      '#contact': 6
    };
    return sectionMap[href] ?? 0;
  };

  const handleNavClick = (href: string, isExternal?: boolean) => {
    setIsMenuOpen(false);
    if (isExternal) {
      window.location.href = href;
    } else {
      try {
        const sectionIndex = getSectionIndex(href);
        console.log(`Navigation clicked: ${href} -> Section ${sectionIndex}`);
        navigateToSection(sectionIndex);
        setActiveSection(href);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to traditional scrolling if context not available
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href);
      }
    }
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="fixed top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-100"
        />
        <NavbarBrand>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-bold text-lg text-gray-100">Dovydas Jusevičius</p>
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
                className={`px-3 py-2 text-sm transition-all duration-300 cursor-pointer ${
                  item.href === '#contact'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-full'
                    : item.external
                    ? 'bg-purple-600 hover:bg-purple-700 text-white rounded-full'
                    : `rounded-md ${
                        activeSection === item.href
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`
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

      <NavbarMenu className="bg-gray-950/95 backdrop-blur-md">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={!item.external && activeSection === item.href ? "primary" : "foreground"}
              className={`w-full transition-colors duration-200 cursor-pointer ${
                item.external 
                  ? "text-purple-400 hover:text-purple-300" 
                  : "text-gray-300 hover:text-indigo-400"
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
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;