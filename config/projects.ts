import React from "react";
import { FaCube, FaPrint } from "react-icons/fa";

export interface ProjectConfig {
  id: string;
  title: string;
  description: string;
  link: string;
  githubLink: string;
  downloadLink: string;
  status: "Currently Working" | "On Hold" | "Completed";
  progress: number; // 0-100
  technologies: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  features: string[];
  stlFile: string; // Supports both .stl and .3mf files
  detailedInfo: {
    overview: string;
    challenges: string[];
    lessons: string[];
    specifications: Record<string, string>;
  };
}

export const projectsConfig: ProjectConfig[] = [
  {
    id: "camera-head-robot",
    title: "Camera Head Robot",
    description: "A humanoid robot with a camera for a head. This project is currently on hold, pending further development.",
    link: "#",
    githubLink: "#",
    downloadLink: "#",
    status: "On Hold",
    progress: 25, // Modify this value to change progress
    technologies: [
      { name: "CAD Design", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "Robotics", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "Electronics", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
    ],
    features: ["Humanoid Design", "Camera Head", "Bipedal"],
    stlFile: "/Remas.stl",
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
    id: "tracked-robot-chassis",
    title: "Tracked Robot Chassis",
    description: "A self-designed and fabricated robot chassis, this project highlights my skills in mechanical design and hands-on fabrication. It features a robust tracked system for superior mobility on diverse terrains.",
    link: "https://www.thingiverse.com/thing:6713139/comments",
    githubLink: "#",
    downloadLink: "https://www.thingiverse.com/thing:6713139/files",
    status: "Completed",
    progress: 100, // Modify this value to change progress
    technologies: [
      { name: "CAD Design", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "3D Printing", icon: React.createElement(FaPrint, { className: "w-4 h-4" }) },
      { name: "Mechanical Engineering", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
    ],
    features: ["Tracked Drive", "Modular Design", "Open Source"],
    stlFile: "/Remas.stl",
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

// Utility function to get progress bar color based on project status
export const getProgressColor = (status: "Currently Working" | "On Hold" | "Completed"): "success" | "warning" => {
  if (status === "Currently Working") return "success";  // Green for currently working
  if (status === "On Hold") return "warning";           // Yellow for on hold
  return "success";                                      // Green for completed
};

// Utility function to get progress bar gradient classes based on project status
export const getProgressGradient = (status: "Currently Working" | "On Hold" | "Completed"): string => {
  if (status === "Currently Working") return "bg-gradient-to-r from-green-400 to-emerald-500";
  if (status === "On Hold") return "bg-gradient-to-r from-amber-400 to-orange-500";
  return "bg-gradient-to-r from-green-400 to-emerald-500";  // Green for completed
};