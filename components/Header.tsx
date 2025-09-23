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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Currently Working On", href: "#current-work" },
    { name: "Contact", href: "#contact" },
  ];

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

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href);
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
          <NavbarItem key={item.name} isActive={activeSection === item.href}>
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
                    : `rounded-md ${
                        activeSection === item.href
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`
                }`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.name}
              </Link>
              {activeSection === item.href && (
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
              color={activeSection === item.href ? "primary" : "foreground"}
              className="w-full text-gray-300 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
              href={item.href}
              size="lg"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleNavClick(item.href);
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