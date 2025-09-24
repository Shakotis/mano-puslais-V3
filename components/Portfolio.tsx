"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCube, FaPrint, FaGithub, FaDownload } from "react-icons/fa";

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Tracked Robot Chassis",
      description: "I designed and built this robot chassis entirely by myself. This project showcases my mechanical design skills and hands-on fabrication experience. The chassis features a robust tracked system for excellent mobility and stability across various terrains.",
      link: "https://www.thingiverse.com/thing:6713139/comments",
      downloadLink: "https://www.thingiverse.com/thing:6713139/files",
      status: "Completed",
      technologies: [
        { name: "CAD Design", icon: <FaCube className="w-3 h-3" />, color: "primary" },
        { name: "Additive Manufacturing", icon: <FaPrint className="w-3 h-3" />, color: "secondary" },
        { name: "Mechanical Engineering", icon: <FaCube className="w-3 h-3" />, color: "success" },
        { name: "3D Printing", icon: <FaPrint className="w-3 h-3" />, color: "warning" }
      ],
      features: ["Tracked Drive System", "Modular Design", "Open Source"],
      image: "/api/placeholder/400/250",
      detailedInfo: {
        overview: "This tracked robot chassis represents a complete mechanical engineering project from conceptual design to final fabrication. The project demonstrates proficiency in CAD design, 3D printing, and mechanical assembly.",
        challenges: [
          "Designing a robust track tensioning system",
          "Ensuring proper weight distribution for stability",
          "Creating modular mounting points for future expansions"
        ],
        lessons: [
          "Importance of iterative design and prototyping",
          "Material selection for 3D printed mechanical parts",
          "Documentation and open-source project management"
        ],
        specifications: {
          "Dimensions": "300mm x 200mm x 150mm",
          "Weight": "~1.2kg (without electronics)",
          "Track Material": "TPU flexible filament",
          "Chassis Material": "PLA+ reinforced plastic",
          "Assembly Time": "~4 hours",
          "Print Time": "~18 hours total"
        }
      }
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
          <Divider className="w-24 h-1 bg-indigo-600 mx-auto mb-8" />
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
              <Card 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-600 transition-all duration-300 h-full rounded-xl"
                isHoverable
                radius="lg"
                shadow="lg"
              >
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center w-full">
                    <Chip
                      size="sm"
                      variant="flat"
                      color="success"
                      className="text-green-300"
                    >
                      {project.status}
                    </Chip>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaGithub className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardBody className="pt-2">
                  {/* Project Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 flex items-center justify-center rounded-lg mb-4">
                    <FaCube className="w-16 h-16 text-indigo-400" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-100 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <Divider className="opacity-30" />
                    
                    {/* Accordion for Detailed Information */}
                    <Accordion
                      variant="splitted"
                      className="px-0"
                      motionProps={{
                        variants: {
                          enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            transition: {
                              height: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                duration: 1,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 1,
                              },
                            },
                          },
                          exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: {
                                easings: "ease",
                                duration: 0.25,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 0.3,
                              },
                            },
                          },
                        },
                      }}
                    >
                      <AccordionItem
                        key="technologies"
                        aria-label="Technologies Used"
                        title={<span className="text-gray-300 font-medium">Technologies Used</span>}
                        className="bg-gray-800/30 border border-gray-700/50"
                      >
                        <div className="flex flex-wrap gap-2 pb-2">
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech.name}
                              size="md"
                              variant="shadow"
                              radius="lg"
                              startContent={tech.icon}
                              classNames={{
                                base: "bg-indigo-900/40 border-indigo-500/50",
                                content: "text-indigo-300 font-medium px-1"
                              }}
                            >
                              {tech.name}
                            </Chip>
                          ))}
                        </div>
                      </AccordionItem>

                      <AccordionItem
                        key="overview"
                        aria-label="Project Overview"
                        title={<span className="text-gray-300 font-medium">Project Overview</span>}
                        className="bg-gray-800/30 border border-gray-700/50"
                      >
                        <p className="text-gray-400 text-sm leading-relaxed pb-2">
                          {project.detailedInfo.overview}
                        </p>
                      </AccordionItem>

                      <AccordionItem
                        key="challenges"
                        aria-label="Challenges & Solutions"
                        title={<span className="text-gray-300 font-medium">Challenges & Solutions</span>}
                        className="bg-gray-800/30 border border-gray-700/50"
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
                        aria-label="Technical Specifications"
                        title={<span className="text-gray-300 font-medium">Technical Specifications</span>}
                        className="bg-gray-800/30 border border-gray-700/50"
                      >
                        <div className="grid grid-cols-1 gap-2 pb-2">
                          {Object.entries(project.detailedInfo.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-400 font-medium">{key}:</span>
                              <span className="text-gray-300">{value}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionItem>
                    </Accordion>

                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature) => (
                          <Chip
                            key={feature}
                            size="sm"
                            variant="bordered"
                            className="text-gray-400 border-gray-600"
                          >
                            {feature}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
                
                <CardFooter className="pt-0 flex gap-2">
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                    radius="lg"
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
                    className="border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white"
                    radius="lg"
                    isIconOnly
                  >
                    <FaDownload className="w-4 h-4" />
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
          <Card className="bg-gray-900/30 border border-gray-700 border-dashed rounded-xl" isPressable radius="lg">
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