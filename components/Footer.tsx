"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaHeart 
} from "react-icons/fa";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/dovydas",
      label: "GitHub",
      color: "hover:text-white"
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/dovydas-jusevicius",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://instagram.com/dovydas",
      label: "Instagram",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <footer className="relative z-10 bg-black/50 backdrop-blur-lg border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8 mb-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`text-gray-400 ${link.color} transition-colors duration-300`}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href="mailto:dovydasjusevicius@gmail.com"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-lg"
            >
              <FaEnvelope className="w-5 h-5" />
              <span>dovydasjusevicius@gmail.com</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Dovydas Jusevičius. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;