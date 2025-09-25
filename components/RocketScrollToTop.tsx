"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const RocketScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: [0, -10, 10, -5, 5, 0],
            y: [0, -5, 0]
          }}
          exit={{ opacity: 0, scale: 0, rotate: 0 }}
          transition={{ 
            duration: 0.3,
            rotate: {
              duration: 0.8,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="fixed bottom-8 right-8 z-50"
          whileHover={{ 
            scale: 1.1,
            rotate: -15,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={scrollToTop}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
            radius="full"
            size="lg"
            isIconOnly
          >
            <FaRocket className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketScrollToTop;