"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";
import { FaCube, FaRobot, FaBuilding, FaCode } from "react-icons/fa";

const Timeline: React.FC = () => {
  const events = [
    {
      date: "2024/10",
      title: "Finished Robot Tank",
      icon: <FaRobot className="w-6 h-6" />,
      description: "Completed the design, fabrication, and programming of a fully autonomous robot tank, showcasing skills in mechanical and electronic integration."
    },
    {
      date: "2025/01", 
      title: "Started SOLIDWORKS",
      icon: <FaCode className="w-6 h-6" />,
      description: "Began mastering SOLIDWORKS for advanced 3D modeling, simulation, and computer-aided design."
    },
    {
      date: "2025/08",
      title: "Joined THUNDERCLAP Labs",
      icon: <FaBuilding className="w-6 h-6" />,
      description: "Started a position at THUNDERCLAP Labs, contributing to cutting-edge research and development projects.",
      isExternal: true,
      link: "https://thunderclaplabs.com"
    }
  ];

  const software = [
    { name: "FreeCAD", icon: <FaCube className="w-6 h-6 text-indigo-400" />, experience: "2 years", period: "2023 - 2025/01" },
    { name: "SOLIDWORKS", icon: <FaCode className="w-6 h-6 text-indigo-400" />, experience: "Current - Advanced", period: "2025/01 - Present" },
    { name: "OpenMotor", icon: <FaRobot className="w-6 h-6 text-indigo-400" />, experience: "Motor Simulation", period: "Since 2025/08" },
    { name: "OpenRocket", icon: <FaRobot className="w-6 h-6 text-indigo-400" />, experience: "Rocket Simulation", period: "Since 2025/08" }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {software.map((s, index) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 rounded-xl h-full" radius="lg">
                    <CardBody className="p-6 flex flex-col items-center justify-center text-center h-full">
                      {s.icon}
                      <span className="text-xl font-semibold text-white mt-4 mb-2">{s.name}</span>
                      <p className="text-sm text-gray-300">{s.experience}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.period}</p>
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
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-700"></div>
              {events.map((event, index) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 rounded-xl shadow-lg" radius="lg">
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="text-indigo-400">
                            {event.isExternal ? (
                              <Avatar
                                src="https://thunderclaplabs.com/favicon.ico"
                                alt="Thunderclap Labs"
                                size="md"
                                fallback={<FaBuilding className="w-6 h-6" />}
                              />
                            ) : (
                              event.icon
                            )}
                          </div>
                          <span className="text-md font-semibold text-indigo-400">
                            {event.date}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold mb-2 text-white">
                          {event.link ? (
                            <Link
                              href={event.link}
                              isExternal
                              className="hover:text-indigo-400 transition-colors duration-200"
                              showAnchorIcon
                            >
                              {event.title}
                            </Link>
                          ) : (
                            event.title
                          )}
                        </h4>
                        <p className="text-gray-400 text-base">
                          {event.description}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;