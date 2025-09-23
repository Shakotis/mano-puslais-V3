"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
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
        {
          name: "FreeCAD",
          experience: "2 years",
          details: "FEA, Python macros, Forest Robot Project",
          icon: <FaCube className="w-4 h-4" />
        },
        {
          name: "SOLIDWORKS",
          experience: "Since 2025/01",
          details: "FEA, CFD, Rocket and Drone Projects",
          icon: <FaCog className="w-4 h-4" />
        },
        {
          name: "AutoCAD Electrical",
          experience: "Basic",
          details: "Electrical system design and documentation",
          icon: <FaBolt className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Electronics",
      icon: <FaMicrochip className="w-6 h-6" />,
      color: "purple",
      skills: [
        {
          name: "Circuit Analysis",
          experience: "Basic",
          details: "Understanding schematics and circuit design",
          icon: <FaBolt className="w-4 h-4" />
        },
        {
          name: "Motor Control",
          experience: "Hands-on",
          details: "Stepper motor and potentiometer control project",
          icon: <FaCog className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Programming",
      icon: <FaCode className="w-6 h-6" />,
      color: "green",
      skills: [
        {
          name: "C++",
          experience: "School course",
          details: "Object-oriented programming fundamentals",
          icon: <FaCode className="w-4 h-4" />
        },
        {
          name: "Python",
          experience: "Basics",
          details: "Raspberry Pi Pico projects, automation scripts",
          icon: <FaPython className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Hands-on Skills",
      icon: <FaTools className="w-6 h-6" />,
      color: "orange",
      skills: [
        {
          name: "3D Printing",
          experience: "Advanced",
          details: "Prototyping and production of mechanical parts",
          icon: <FaPrint className="w-4 h-4" />
        },
        {
          name: "Welding",
          experience: "Stick welding",
          details: "Basic structural welding techniques",
          icon: <FaFire className="w-4 h-4" />
        },
        {
          name: "Machining",
          experience: "Basic",
          details: "Milling, drilling, threading operations",
          icon: <FaTools className="w-4 h-4" />
        },
        {
          name: "Soldering",
          experience: "Proficient",
          details: "Electronic component assembly and repair",
          icon: <FaMicrochip className="w-4 h-4" />
        }
      ]
    },
    {
      title: "Other",
      icon: <FaPlane className="w-6 h-6" />,
      color: "cyan",
      skills: [
        {
          name: "Aerodynamics",
          experience: "Initial understanding",
          details: "Basic principles of fluid dynamics and flight",
          icon: <FaPlane className="w-4 h-4" />
        },
        {
          name: "Project Management",
          experience: "ClickUp",
          details: "Task organization and project tracking",
          icon: <FaTasks className="w-4 h-4" />
        },
        {
          name: "English",
          experience: "B2+ level",
          details: "Technical communication and documentation",
          icon: <FaLanguage className="w-4 h-4" />
        }
      ]
    }
  ];

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      indigo: "bg-indigo-900/40 border-indigo-500/50 text-indigo-300",
      purple: "bg-purple-900/40 border-purple-500/50 text-purple-300",
      green: "bg-green-900/40 border-green-500/50 text-green-300",
      orange: "bg-orange-900/40 border-orange-500/50 text-orange-300",
      cyan: "bg-cyan-900/40 border-cyan-500/50 text-cyan-300"
    };
    return colorMap[color] || "bg-gray-900/40 border-gray-500/50 text-gray-300";
  };

  const getIconColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      indigo: "text-indigo-400",
      purple: "text-purple-400",
      green: "text-green-400",
      orange: "text-orange-400",
      cyan: "text-cyan-400"
    };
    return colorMap[color] || "text-gray-400";
  };

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            My Skills
          </h2>
          <Divider className="w-24 h-1 bg-indigo-600 mx-auto mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card 
                className={`${getColorClass(category.color)} backdrop-blur-sm border transition-all duration-300 h-full`}
                isHoverable
                radius="lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Button
                      isIconOnly
                      className={`${getIconColor(category.color)} bg-gray-900/50`}
                      radius="lg"
                      size="lg"
                      variant="flat"
                    >
                      {category.icon}
                    </Button>
                    <h3 className="text-xl font-bold text-gray-100">
                      {category.title}
                    </h3>
                  </div>
                </CardHeader>
                
                <Divider className="opacity-30" />
                
                <CardBody className="pt-4">
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card
                          className="bg-gray-800/30 border-gray-700/50"
                          radius="lg"
                          shadow="sm"
                        >
                          <CardBody className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-lg">
                                <span className={getIconColor(category.color)}>
                                  {skill.icon}
                                </span>
                                <span className="font-semibold text-gray-100">
                                  {skill.name}
                                </span>
                              </div>
                              <Chip
                                size="lg"
                                variant="shadow"
                                radius="lg"
                                classNames={{
                                  base: `${getColorClass(category.color)} border px-4 py-2`,
                                  content: "font-medium px-2 py-1 text-base",
                                }}
                              >
                                {skill.experience}
                              </Chip>
                            </div>
                            <Divider className="opacity-20 my-2" />
                            <p className="text-gray-400 text-sm">
                              {skill.details}
                            </p>
                          </CardBody>
                        </Card>
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