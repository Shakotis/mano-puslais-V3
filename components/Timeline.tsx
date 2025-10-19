"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCube, FaRobot, FaBuilding, FaCode, FaWrench, FaArrowDown } from "react-icons/fa";

interface TimelineEvent {
  date: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  isExternal?: boolean;
  link?: string;
  isProjectLink?: boolean;
  projectId?: string;
}

interface Software {
  name: string;
  src: string;
  experience: string;
  period: string;
  className?: string;
}

const Timeline: React.FC = () => {
  const scrollToProject = (projectId: string) => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(projectId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        
        // Optional: Add focus for accessibility
        element.focus({ preventScroll: true });
      }
    }, 100);
  };

  const events: TimelineEvent[] = [
    {
      date: "2024/10",
      title: "Finished Robot Tank",
      icon: <FaRobot className="w-6 h-6" />,
      description: "after 1 and a half of years finaly finished my big project which taught me invaluable lessons in different fields from planning to building.",
      isProjectLink: true,
      projectId: "tracked-robot-chassis"
    },
    {
      date: "2025/01", 
      title: "Started SOLIDWORKS",
      icon: <FaCode className="w-6 h-6" />,
      description: "After 2 years of FREECAD, I finally decided to switch to SOLIDWORKS. which improved my workflow and design capabilities significantly.",
    },
    {
      date: "2025/06",
      title: "Opened Motorcycle Repair Shop",
      icon: <span className="text-2xl">🏍️</span>,
      description: "In 2 months, my friend and I converted my grandma's garage into a motorcycle repair shop which is now successfully running and providing quality repair services.",
      isExternal: true,
      link: "https://www.instagram.com/rsmoto.lt"
    },
    {
      date: "2025/08",
      title: "Joined THUNDERCLAP Labs",
      icon: <span className="text-2xl">🔧</span>,
      description: "Joined a like-minded engineering collective focused on innovation. Actively participating in various startup programs. Currently in position of aerospace/mechanical engineer.",
      isExternal: true,
      link: "https://thunderclaplabs.com"
    }
  ];

  const software: Software[] = [
    { name: "FreeCAD", src: "/FreeCAD-symbol.svg.png", experience: "2 years", period: "2023 - 2025/01" },
    { name: "SOLIDWORKS", src: "/SolidWorks logo.jpg", experience: "Current - Advanced", period: "2025/01 - Present", className: "w-48 h-16" },
    { name: "OpenMotor", src: "/openMotor logo.png", experience: "Motor Simulation", period: "Since 2025/08" },
    { name: "OpenRocket", src: "/OpenRocket_icon.png", experience: "Rocket Simulation", period: "Since 2025/08" }
  ];

  return (
    <section id="experience" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Journey
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Core Software Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
              {software.map((s, index) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex"
                >
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 rounded-xl flex-1" isPressable radius="lg">
                    <CardBody className="p-8 flex flex-col items-center justify-center text-center h-full min-h-[240px]">
                      <div className={`mb-6 flex-shrink-0 relative ${s.className || 'w-16 h-16'}`}>
                        <Image src={s.src} alt={`${s.name} logo`} layout="fill" objectFit="contain" />
                      </div>
                      <span className="text-2xl font-semibold text-white mb-4 flex-shrink-0">{s.name}</span>
                      <p className="text-base text-gray-300 mb-2 flex-grow flex items-center justify-center text-center">{s.experience}</p>
                      <p className="text-sm text-gray-500 flex-shrink-0">{s.period}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Key Milestones</h3>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-700 hidden md:block"></div>
              {events.map((event, index) => (
                <React.Fragment key={event.date}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    viewport={{ once: true }}
                    className={`flex items-center w-full mb-8 md:justify-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card 
                      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 rounded-xl shadow-lg h-full ${
                        (event.isProjectLink || event.isExternal) ? 'cursor-pointer hover:bg-gray-800/70' : ''
                      }`} 
                      radius="lg"
                      isPressable={event.isProjectLink || event.isExternal}
                      onPress={
                        event.isProjectLink && event.projectId 
                          ? () => scrollToProject(event.projectId!) 
                          : event.isExternal && event.link
                          ? () => window.open(event.link, '_blank', 'noopener,noreferrer')
                          : undefined
                      }
                    >
                      <CardBody className="p-6 flex flex-col min-h-[200px]">
                        <div className="flex items-center space-x-4 mb-3 flex-shrink-0">
                          <div className="text-indigo-400">
                            {event.icon}
                          </div>
                          <span className="text-md font-semibold text-indigo-400">
                            {event.date}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-white flex-shrink-0">
                          {(event.isExternal || event.isProjectLink) ? (
                            <span className="hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                              {event.title}
                              {event.isExternal && (
                                <svg 
                                  className="w-4 h-4" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                  />
                                </svg>
                              )}
                            </span>
                          ) : (
                            event.title
                          )}
                        </h4>
                        <p className="text-gray-400 text-base flex-grow">
                          {event.description}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </motion.div>
                
                {/* Mobile Arrow Separator */}
                {index < events.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 * index + 0.3 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-6 md:hidden"
                  >
                    <div className="bg-indigo-600/20 rounded-full p-3 border border-indigo-500/30">
                      <FaArrowDown className="w-4 h-4 text-indigo-400" />
                    </div>
                  </motion.div>
                )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;