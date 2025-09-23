"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCube, FaPrint } from "react-icons/fa";

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Tracked Robot Chassis",
      description: "I designed and built this robot chassis entirely by myself. This project showcases my mechanical design skills and hands-on fabrication experience. The chassis features a robust tracked system for excellent mobility and stability across various terrains.",
      link: "https://www.thingiverse.com/thing:6713139/comments",
      technologies: [
        { name: "CAD Design", icon: <FaCube className="w-3 h-3" /> },
        { name: "Additive Manufacturing", icon: <FaPrint className="w-3 h-3" /> }
      ],
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-600 transition-all duration-300 h-full">
                <CardBody className="p-0">
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 flex items-center justify-center">
                    <FaCube className="w-16 h-16 text-indigo-400" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-100 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech.name}
                          size="sm"
                          variant="flat"
                          className="bg-indigo-900/30 text-indigo-300 border border-indigo-600/30"
                          startContent={tech.icon}
                        >
                          {tech.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardBody>
                
                <CardFooter className="pt-0 px-6 pb-6">
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    endContent={<FaExternalLinkAlt className="w-4 h-4" />}
                  >
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="bg-gray-900/30 border border-gray-700 border-dashed">
            <CardBody className="p-8">
              <div className="text-gray-500 mb-4">
                <FaCube className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                More Projects Coming Soon
              </h3>
              <p className="text-gray-500 text-sm">
                I'm continuously working on new exciting projects. Stay tuned for updates!
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;