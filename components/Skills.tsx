"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { motion } from "framer-motion";
import { 
  FaCube, 
  FaCode, 
  FaMicrochip, 
  FaTools, 
  FaPlane,
  FaTasks,
  FaLanguage,
  FaPython,
  FaPrint,
  FaCog,
  FaFire,
  FaBolt
} from "react-icons/fa";

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "CAD/CAM",
      icon: <FaCube className="w-6 h-6" />,
      color: "indigo",
      skills: [
        { name: "FreeCAD", details: "FEA, Python macros, Forest Robot Project" },
        { name: "SOLIDWORKS", details: "FEA, CFD, Rocket and Drone Projects" },
        { name: "AutoCAD Electrical", details: "Electrical system design and documentation" }
      ]
    },
    {
      title: "Electronics",
      icon: <FaMicrochip className="w-6 h-6" />,
      color: "purple",
      skills: [
        { name: "Circuit Analysis", details: "Schematics and circuit design" },
        { name: "Motor Control", details: "Stepper and potentiometer control" }
      ]
    },
    {
      title: "Programming",
      icon: <FaCode className="w-6 h-6" />,
      color: "green",
      skills: [
        { name: "C++", details: "Object-oriented programming" },
        { name: "Python", details: "Raspberry Pi Pico, automation scripts" }
      ]
    },
    {
      title: "Hands-on Skills",
      icon: <FaTools className="w-6 h-6" />,
      color: "orange",
      skills: [
        { name: "3D Printing", details: "Prototyping and mechanical parts" },
        { name: "Welding", details: "Stick welding techniques" },
        { name: "Machining", details: "Milling, drilling, threading" },
        { name: "Soldering", details: "Component assembly and repair" }
      ]
    },
    {
      title: "Other",
      icon: <FaPlane className="w-6 h-6" />,
      color: "cyan",
      skills: [
        { name: "Aerodynamics", details: "Fluid dynamics and flight" },
        { name: "Project Management", details: "ClickUp for task organization" },
        { name: "English", details: "B2+ technical communication" }
      ]
    }
  ];

  const getColorClass = (color: string) => ({
    indigo: "border-indigo-500/50",
    purple: "border-purple-500/50",
    green: "border-green-500/50",
    orange: "border-orange-500/50",
    cyan: "border-cyan-500/50"
  }[color] || "border-gray-500/50");

  const getIconColor = (color: string) => ({
    indigo: "text-indigo-400",
    purple: "text-purple-400",
    green: "text-green-400",
    orange: "text-orange-400",
    cyan: "text-cyan-400"
  }[color] || "text-gray-400");

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Card 
                className={`bg-gray-900/50 backdrop-blur-sm border ${getColorClass(category.color)} transition-all duration-300 w-full flex flex-col rounded-xl h-full`}
                isHoverable
                radius="lg"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-800/50 ${getIconColor(category.color)}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </CardHeader>
                
                <Divider className="opacity-20" />
                
                <CardBody className="p-6 flex-1">
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.15 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                          <p className="font-semibold text-white mb-1">{skill.name}</p>
                          <p className="text-gray-400 text-sm">{skill.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;