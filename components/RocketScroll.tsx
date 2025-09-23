"use client";

import React, { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const RocketScroll: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
                className="fixed bottom-5 left-5 z-50 p-3 rounded-full bg-indigo-600/50 text-white hover:bg-indigo-600 transition-all duration-300 cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaRocket className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default RocketScroll;