"use client";

import React, { useState, useEffect } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Skills", href: "#skills" },
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

  return (
    <>
      <Navbar 
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800/50"
        maxWidth="full"
        height="120px"
      >
        <NavbarContent>
          <NavbarBrand>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-bold text-2xl text-white">Dovydas Jusevičius</p>
            </motion.div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden xl:flex gap-8" justify="center">
          {navItems.map((item, index) => (
            <NavbarItem key={item.name} isActive={activeSection === item.href}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`px-6 py-3 text-lg transition-colors duration-300 rounded-md ${
                    activeSection === item.href
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    layoutId="underline"
                  />
                )}
              </motion.div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="xl:hidden">
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-100 hover:text-indigo-400 transition-colors"
            >
              <FaBars className="w-6 h-6" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Drawer 
        isOpen={isDrawerOpen} 
        size="full" 
        onClose={() => setIsDrawerOpen(false)}
        className="xl:hidden"
      >
        <DrawerContent className="bg-black/90 text-gray-100">
          <DrawerHeader className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white">Navigation</h2>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes className="w-6 h-6" />
            </Button>
          </DrawerHeader>
          <DrawerBody className="p-6">
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left text-2xl font-semibold transition-colors duration-300 ${
                    activeSection === item.href 
                      ? "text-indigo-400" 
                      : "text-gray-300 hover:text-indigo-400"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;