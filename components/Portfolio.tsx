"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Progress } from "@heroui/progress";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCube, FaPrint, FaGithub, FaDownload } from "react-icons/fa";
import STLPreview from "./STLPreview";
import { projectsConfig, getProgressColor, getProgressGradient } from "../config/projects";

const Portfolio: React.FC = () => {
  const projects = projectsConfig;

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

  return (
    <section id="portfolio" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              id={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full flex min-h-[800px]"
            >
              <Card 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 w-full flex flex-col rounded-xl"
                isHoverable
                radius="lg"
                shadow="lg"
              >
                <CardHeader className="p-4">
                  <div className="w-full h-80 bg-gray-800/50 border border-gray-700 rounded-lg relative overflow-hidden">
                    <STLPreview stlFile={project.stlFile} />
                  </div>
                </CardHeader>
                
                <CardBody className="p-4 flex-1 flex flex-col h-full">
                  {/* Top content - fixed height for alignment */}
                  <div className="flex-grow-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <Chip 
                        color={
                          project.status === "Completed" ? "success" :
                          project.status === "Currently Working" ? "primary" :
                          "warning"
                        } 
                        className={
                          project.status === "Completed" ? "text-green-300 bg-green-900/50 px-3" :
                          project.status === "Currently Working" ? "text-blue-300 bg-blue-900/50 px-3" :
                          "text-yellow-300 bg-yellow-900/50 px-3"
                        }
                      >
                        {project.status}
                      </Chip>
                    </div>
                    <div className="min-h-24 mb-4">
                      <p className="text-gray-400 text-base leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar - aligned position */}
                  <div className="mb-4 h-16 flex-grow-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Project Progress</span>
                      <span className="text-sm text-gray-400">{project.progress}%</span>
                    </div>
                    <Progress 
                      aria-label={`${project.title} Progress`} 
                      size="lg" 
                      value={project.progress} 
                      color={getProgressColor(project.status)}
                      className="w-full"
                      classNames={{
                        track: "drop-shadow-md border border-gray-600/30 bg-gray-800/50",
                        indicator: getProgressGradient(project.status)
                      }}
                    />
                  </div>
                  
                  {/* Technologies - flexible height */}
                  <div className="flex flex-wrap gap-2 mb-4 flex-grow-0 min-h-12">
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech.name}
                        size="sm"
                        variant="shadow"
                        startContent={tech.icon}
                        classNames={{
                          base: "bg-indigo-900/40 border-indigo-500/50 px-3",
                          content: "text-indigo-300 font-medium pl-3"
                        }}
                      >
                        {tech.name}
                      </Chip>
                    ))}
                  </div>

                  {/* Accordion - flexible area that can expand */}
                  <div className="flex-grow">
                    <Accordion variant="splitted" className="px-0">
                    <AccordionItem
                      key="overview"
                      aria-label="Project Overview"
                      title={<span className="text-gray-300 font-medium">Overview</span>}
                      className="bg-gray-800/30 border-none"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed pb-2">
                        {project.detailedInfo.overview}
                      </p>
                    </AccordionItem>
                    <AccordionItem
                      key="challenges"
                      aria-label="Challenges"
                      title={<span className="text-gray-300 font-medium">Challenges</span>}
                      className="bg-gray-800/30 border-none"
                    >
                      <ul className="space-y-2 pb-2">
                        {project.detailedInfo.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-indigo-400 mt-1">•</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                    <AccordionItem
                      key="specifications"
                      aria-label="Specifications"
                      title={<span className="text-gray-300 font-medium">Specifications</span>}
                      className="bg-gray-800/30 border-none"
                    >
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        {Object.entries(project.detailedInfo.specifications).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="text-gray-400 font-medium">{key}: </span>
                            <span className="text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                    <AccordionItem
                      key="downloads"
                      aria-label="Downloads & Links"
                      title={<span className="text-gray-300 font-medium">Downloads & Links</span>}
                      className="bg-gray-800/30 border-none"
                    >
                      <div className="space-y-3 pb-2">
                        {project.id === "camera-head-robot" ? (
                          // project AVATARAS: No files available yet
                          <div className="text-center py-4">
                            <p className="text-gray-500 text-sm">Empty yet</p>
                          </div>
                        ) : project.id === "tracked-robot-chassis" ? (
                          // Tracked Robot Chassis: Only project page
                          <Button
                            as="a"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                            radius="full"
                            startContent={<FaExternalLinkAlt className="w-4 h-4" />}
                          >
                            View Project Page
                          </Button>
                        ) : (
                          // Other projects: Default options
                          <div className="space-y-2">
                            <Button
                              as="a"
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                              radius="full"
                              startContent={<FaExternalLinkAlt className="w-4 h-4" />}
                            >
                              View Project
                            </Button>
                            <Button
                              as="a"
                              href={project.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="bordered"
                              className="w-full border-2 border-indigo-500/50 text-indigo-300 hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20 hover:border-indigo-400 shadow-md"
                              radius="full"
                              startContent={<FaDownload className="w-4 h-4" />}
                            >
                              Download Files
                            </Button>
                          </div>
                        )}
                      </div>
                    </AccordionItem>
                    </Accordion>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex"
          >
            <Card className="bg-gray-900/30 border-2 border-dashed border-gray-700 w-full h-[800px] flex flex-col items-center justify-center rounded-xl" radius="lg">
              <div className="text-center p-8">
                <div className="text-gray-500 mb-4">
                  <FaCube className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">
                  More Projects Coming Soon
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  I'm always working on something new. Stay tuned for more exciting projects!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;