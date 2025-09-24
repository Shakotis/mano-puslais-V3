"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { 
  FaCog, 
  FaLightbulb, 
  FaUsers, 
  FaChartLine, 
  FaTools, 
  FaRocket 
} from "react-icons/fa";

const About: React.FC = () => {
  const skills = [
    {
      icon: <FaCog className="w-6 h-6" />,
      title: "Engineering Design",
      description: "Passion for mechanical and electronic component integration"
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "Always pushing boundaries and exploring new solutions"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Leadership",
      description: "Natural leader who thrives in challenging situations"
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Project Management",
      description: "Experience managing projects from conception to completion"
    },
    {
      icon: <FaTools className="w-6 h-6" />,
      title: "Hands-on Experience",
      description: "Practical experience with real-world engineering projects"
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Continuous Growth",
      description: "Committed to continuous improvement and learning"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl" isPressable radius="lg">
            <CardBody className="p-8">
              <p className="text-lg text-gray-300 leading-loose">
                I am a high school student at Kauno 'Saulės' Gimnazija with a strong passion for design and engineering. 
                <br /><br />
                I am a natural leader, constantly pushing myself into uncomfortable situations to grow. Through my personal 
                projects, I've learned about project management and I am committed to continuous improvement.
                <br /><br />
                I believe in integrating mechanical and electronic components and I have experience with hands-on projects from start to finish.
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Key Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-600 transition-colors duration-300 rounded-xl" isPressable radius="lg">
                  <CardBody className="p-6 text-center">
                    <div className="text-indigo-400 mb-4 flex justify-center">
                      {skill.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {skill.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;