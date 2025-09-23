"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter, 
  FaEnvelope,
  FaHeart 
} from "react-icons/fa";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/dovydas",
      label: "GitHub",
      color: "hover:text-gray-300"
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/dovydas-jusevicius",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://instagram.com/dovydas",
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      href: "https://twitter.com/dovydas",
      label: "Twitter",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <footer className="relative z-10 bg-gray-950/80 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 bg-gray-800/50 rounded-full text-gray-400 ${link.color} transition-all duration-200 hover:bg-gray-700/50`}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Email Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href="mailto:dovydasjusevicius@gmail.com"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
              <FaEnvelope className="w-4 h-4" />
              <span className="text-lg">dovydasjusevicius@gmail.com</span>
            </a>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-px bg-gray-700 mx-auto mb-8"
          ></motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
              <span>Made with</span>
              <FaHeart className="w-3 h-3 text-red-500" />
              <span>using Next.js & HeroUI</span>
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Dovydas Jusevičius. All rights reserved.
            </p>
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 text-sm"
            >
              ↑ Back to Top
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;