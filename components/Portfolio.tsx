"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Progress } from "@heroui/progress";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCube, FaPrint, FaGithub, FaDownload } from "react-icons/fa";
import STLPreview from "./STLPreview";

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Camera Control Platform",
      description: "A camera control platform where a person can wear VR glasses and control the camera's movement by turning their head. This platform will be attached to a robot.",
      link: "#",
      githubLink: "#",
      downloadLink: "#",
      status: "Currently Working",
      progress: 25,
      technologies: [
        { name: "VR Integration", icon: <FaCube className="w-4 h-4" /> },
        { name: "Robotics", icon: <FaCube className="w-4 h-4" /> },
        { name: "Electronics", icon: <FaCube className="w-4 h-4" /> },
      ],
      features: ["VR Control", "Head Tracking", "Robot Integration"],
      stlFile: "/placeholder.stl", // Placeholder STL
      detailedInfo: {
        overview: "This project focuses on creating an intuitive camera control system using VR technology. The goal is to provide a seamless and immersive experience for controlling a robot-mounted camera.",
        challenges: [
          "Achieving low-latency head tracking.",
          "Ensuring smooth and stable camera movement.",
          "Developing a robust communication link between the VR headset and the robot."
        ],
        lessons: [
          "Real-time data processing for robotics applications.",
          "Interfacing with VR hardware and SDKs.",
          "Mechanical design for camera stabilization."
        ],
        specifications: {
          "VR Headset": "TBD",
          "Robot Platform": "TBD",
          "Communication": "Wireless",
          "Status": "Currently Working"
        }
      }
    },
    {
      title: "Camera Head Robot",
      description: "A humanoid robot with a camera for a head. This project is currently on hold, pending further development.",
      link: "#",
      githubLink: "#",
      downloadLink: "#",
      status: "On Hold",
      progress: 25,
      technologies: [
        { name: "CAD Design", icon: <FaCube className="w-4 h-4" /> },
        { name: "Robotics", icon: <FaCube className="w-4 h-4" /> },
        { name: "Electronics", icon: <FaCube className="w-4 h-4" /> },
      ],
      features: ["Humanoid Design", "Camera Head", "Bipedal"],
      stlFile: "/placeholder.stl", // Placeholder STL
      detailedInfo: {
        overview: "This project involves the design and construction of a humanoid robot. The defining feature is a camera integrated into the head, providing a first-person view for remote operation or autonomous navigation. The project is currently paused.",
        challenges: [
          "Designing stable bipedal locomotion.",
          "Integrating camera and video transmission.",
          "Developing control systems for movement."
        ],
        lessons: [
          "Complexities of humanoid robot design.",
          "Balancing aesthetics and functionality.",
          "Planning for modular electronics and components."
        ],
        specifications: {
          "Height": "TBD",
          "Weight": "TBD",
          "Actuators": "Servos/Motors",
          "Status": "On Hold"
        }
      }
    },
    {
      title: "Tracked Robot Chassis",
      description: "A self-designed and fabricated robot chassis, this project highlights my skills in mechanical design and hands-on fabrication. It features a robust tracked system for superior mobility on diverse terrains.",
      link: "https://www.thingiverse.com/thing:6713139/comments",
      githubLink: "#", // Assuming no GitHub link for this one
      downloadLink: "https://www.thingiverse.com/thing:6713139/files",
      status: "Completed",
      progress: 100,
      technologies: [
        { name: "CAD Design", icon: <FaCube className="w-4 h-4" /> },
        { name: "3D Printing", icon: <FaPrint className="w-4 h-4" /> },
        { name: "Mechanical Engineering", icon: <FaCube className="w-4 h-4" /> },
      ],
      features: ["Tracked Drive", "Modular Design", "Open Source"],
      stlFile: "/Chassis_V2.stl",
      detailedInfo: {
        overview: "This tracked robot chassis is a comprehensive mechanical engineering project, from initial concept to final fabrication. It demonstrates proficiency in CAD, 3D printing, and mechanical assembly.",
        challenges: [
          "Designing a durable track tensioning system.",
          "Optimizing weight distribution for stability.",
          "Creating modular mounting points for future upgrades."
        ],
        lessons: [
          "The importance of iterative design and prototyping.",
          "Material selection for 3D-printed mechanical parts.",
          "Best practices for open-source project documentation."
        ],
        specifications: {
          "Dimensions": "300mm x 200mm x 150mm",
          "Weight": "~1.2kg (w/o electronics)",
          "Track Material": "TPU",
          "Chassis Material": "PLA+",
          "Assembly Time": "~4 hours",
          "Print Time": "~18 hours"
        }
      }
    }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full flex"
            >
              <Card 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 w-full flex flex-col rounded-xl"
                isHoverable
                radius="lg"
                shadow="lg"
              >
                <CardHeader className="p-4">
                  <div className="w-full h-56 bg-gray-800/50 border border-gray-700 rounded-lg relative overflow-hidden">
                    <STLPreview stlFile={project.stlFile} />
                  </div>
                </CardHeader>
                
                <CardBody className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      color={
                        project.status === "Completed" ? "success" :
                        project.status === "Currently Working" ? "primary" :
                        "warning"
                      } 
                      className={
                        project.status === "Completed" ? "text-green-300 bg-green-900/50" :
                        project.status === "Currently Working" ? "text-blue-300 bg-blue-900/50" :
                        "text-yellow-300 bg-yellow-900/50"
                      }
                    >
                      {project.status}
                    </Chip>
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300 font-medium">Project Progress</span>
                      <span className="text-sm text-gray-400">{project.progress}%</span>
                    </div>
                    <Progress 
                      aria-label="Project Progress" 
                      value={project.progress} 
                      color={project.status === "Completed" ? "success" : project.status === "Currently Working" ? "primary" : "warning"}
                      className="w-full"
                      size="sm"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech.name}
                        size="sm"
                        variant="shadow"
                        radius="md"
                        startContent={tech.icon}
                        classNames={{
                          base: "bg-indigo-900/40 border-indigo-500/50",
                          content: "text-indigo-300 font-medium"
                        }}
                      >
                        {tech.name}
                      </Chip>
                    ))}
                  </div>

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
                  </Accordion>
                </CardBody>
                
                <CardFooter className="p-4 flex gap-2">
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
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
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full flex"
          >
            <Card className="bg-gray-900/30 border-2 border-dashed border-gray-700 hover:border-indigo-500 transition-all duration-300 w-full flex flex-col items-center justify-center rounded-xl" isPressable radius="lg">
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