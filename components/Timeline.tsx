"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { FaCube, FaRobot, FaBuilding, FaCode } from "react-icons/fa";

const Timeline: React.FC = () => {
  const events = [
    {
      date: "2024/10",
      title: "Finished Robot Tank",
      icon: <FaRobot className="w-4 h-4" />,
      description: "Completed the design and build of a fully functional robot tank"
    },
    {
      date: "2025/01", 
      title: "Started SOLIDWORKS",
      icon: <FaCode className="w-4 h-4" />,
      description: "Began learning SOLIDWORKS for advanced CAD design"
    },
    {
      date: "2025/08",
      title: "Joined TCL",
      icon: <FaBuilding className="w-4 h-4" />,
      description: "Started working with TCL on exciting new projects"
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            My Experience
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Software Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Core Software Experience</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-2 bg-gray-700 rounded-full w-full max-w-3xl"></div>
              
              {/* FreeCAD Period */}
              <div className="relative flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4 max-w-3xl w-full">
                  <div className="text-right flex-1">
                    <Card className="bg-indigo-900/30 border border-indigo-600">
                      <CardBody className="p-4">
                        <div className="flex items-center justify-end space-x-2">
                          <FaCube className="w-5 h-5 text-indigo-400" />
                          <span className="text-lg font-semibold text-gray-100">FreeCAD</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">2 years experience</p>
                        <p className="text-xs text-gray-400 mt-1">2023 - 2025/01</p>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 bg-indigo-600 rounded-full border-4 border-gray-950 z-10"></div>
                  
                  <div className="flex-1">
                    <Card className="bg-purple-900/30 border border-purple-600">
                      <CardBody className="p-4">
                        <div className="flex items-center space-x-2">
                          <FaCode className="w-5 h-5 text-purple-400" />
                          <span className="text-lg font-semibold text-gray-100">SOLIDWORKS</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Current - Advanced learning</p>
                        <p className="text-xs text-gray-400 mt-1">2025/01 - Present</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Key Milestones</h3>
            
            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <Card className={`bg-gray-900/50 border border-gray-700 hover:border-indigo-600 transition-colors duration-300 max-w-md ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <CardBody className="p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-indigo-400">
                          {event.icon}
                        </div>
                        <span className="text-sm font-medium text-indigo-400">
                          {event.date}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-100 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {event.description}
                      </p>
                    </CardBody>
                  </Card>
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