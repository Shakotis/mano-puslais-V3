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
      icon: <FaCog className="w-8 h-8" />,
      title: "Engineering Design",
      description: "Passionate about integrating mechanical and electronic components to create seamless and functional products."
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Constantly exploring new technologies and methodologies to push the boundaries of what's possible."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Leadership",
      description: "A natural leader who thrives in challenging environments and inspires teams to achieve their best work."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Project Management",
      description: "Experienced in managing projects from initial concept to final delivery, ensuring on-time and on-budget completion."
    },
    {
      icon: <FaTools className="w-8 h-8" />,
      title: "Hands-on Experience",
      description: "Practical, real-world experience with a wide range of engineering projects and fabrication techniques."
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Continuous Growth",
      description: "Committed to lifelong learning and continuous improvement, always seeking new skills and knowledge."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg" isPressable radius="lg">
            <CardBody className="p-10">
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                I am a high school student at Kauno &lsquo;Saulės&rsquo; Gimnazija with a
                deep-seated passion for design and engineering. I thrive on
                challenges and am a natural leader, always pushing myself to
                grow. My personal projects have taught me invaluable lessons in
                project management and a commitment to continuous improvement. I
                specialize in integrating mechanical and electronic components,
                with hands-on experience from project conception to completion.
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
          <h3 className="text-3xl font-bold text-white mb-12 text-center">My Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-indigo-500 transition-all duration-300 rounded-xl h-full" isPressable radius="lg">
                  <CardBody className="p-8 text-center flex flex-col items-center">
                    <div className="text-indigo-400 mb-6">
                      {skill.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {skill.title}
                    </h4>
                    <p className="text-gray-400 text-base">
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