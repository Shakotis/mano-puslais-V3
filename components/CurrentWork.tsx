"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { motion } from "framer-motion";
import { FaVrCardboard, FaCamera, FaRobot, FaEye, FaCogs } from "react-icons/fa";
import { useProjectProgress } from "@/contexts/ProjectProgressContext";

const CurrentWork: React.FC = () => {
  const { overallProgress } = useProjectProgress();
  
  const currentProject = {
    title: "Camera Control Platform",
    description: "A camera control platform where a person can wear VR glasses and control the camera's movement by turning their head. This platform will be attached to a robot.",
    technologies: [
      "VR Technology",
      "Camera Control",
      "Robotics",
      "Motion Tracking"
    ],
    features: [
      {
        icon: <FaVrCardboard className="w-5 h-5" />,
        title: "VR Head Tracking",
        description: "Real-time head movement detection through VR glasses"
      },
      {
        icon: <FaCamera className="w-5 h-5" />,
        title: "Camera Control",
        description: "Precise camera positioning and movement control"
      },
      {
        icon: <FaRobot className="w-5 h-5" />,
        title: "Robot Integration",
        description: "Seamless integration with robotic platform"
      },
      {
        icon: <FaEye className="w-5 h-5" />,
        title: "Real-time Feedback",
        description: "Instant visual feedback and response system"
      }
    ]
  };

  return (
    <section id="current-work" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Currently Working On
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-600/30 overflow-hidden rounded-xl" radius="lg">
            <CardHeader className="pb-0">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-indigo-600/20 rounded-full">
                      <FaCogs className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100">
                        {currentProject.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400">In Active Development</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Progress 
                  aria-label="Project Progress" 
                  size="md" 
                  value={overallProgress} 
                  color="primary"
                  className="mt-4"
                  label={`Progress: ${overallProgress}%`}
                  showValueLabel={true}
                />
              </div>
            </CardHeader>

            <CardBody className="pt-4">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {currentProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-100 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      size="md"
                      variant="flat"
                      className="bg-indigo-900/30 text-indigo-300 border border-indigo-600/30"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-gray-800/30 border border-gray-700 rounded-lg" radius="md">
                        <CardBody className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-indigo-400 mt-1">
                              {feature.icon}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-100 mb-1">
                                {feature.title}
                              </h5>
                              <p className="text-gray-400 text-sm">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>


      </div>
    </section>
  );
};

export default CurrentWork;