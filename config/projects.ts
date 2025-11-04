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
  stlFile?: string; // Supports both .stl and .3mf files (optional)
  imageFile?: string; // For projects using images instead of 3D models
  detailedInfo: {
    overview: string;
    challenges: string[];
    lessons: string[];
    specifications: Record<string, string>;
  };
}

export const projectsConfig: ProjectConfig[] = [
  {
    id: "new-project-1",
    title: "homework scraper app",
    description: "App that automaticaly organizes all homework to one google tasks for easy access.",
    link: "#",
    githubLink: "#",
    downloadLink: "https://nd.dovydas.space",
    status: "Currently Working",
    progress: 80,
    technologies: [
      { name: "CAD Design", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "3D Printing", icon: React.createElement(FaPrint, { className: "w-4 h-4" }) },
      { name: "Electronics", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
    ],
    features: ["Modular Design", "Advanced Control", "Open Source"],
    imageFile: "/scraper.png",
    detailedInfo: {
      overview: "after first hearing about vibe-coding i wanted to see its potential, and got carried away by my imagination, so i build this. had to learn a lot of new things along the way. HUGE THANKS to my friend <a href='https://ignuxas.com' target='_blank' rel='noopener noreferrer' class='text-indigo-400 hover:text-indigo-300 underline'>ignuxas.com</a>",
      challenges: [
        "google cloud api integration.",
        "optimizing backend RAM usage.",
        "hosting the application on home server."
      ],
      lessons: [
        "Advanced CAD modeling techniques.",
        "System integration best practices.",
        "Iterative design methodology."
      ],
      specifications: {
        "backend RAM": "1GB",
        "frontend": "node.js and react",
        "backend": "Django REST Framework",
      }
    }
  },
  {
    id: "time-lapse",
    title: "DIY time-lapse flash",
    description: "budget-friendly time-lapse flash build form construction lamp and electronics laying around.",
    link: "#",
    githubLink: "#",
    downloadLink: "#",
    status: "Completed",  
    progress: 100,
    technologies: [
      { name: "CAD Design", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "3D Printing", icon: React.createElement(FaPrint, { className: "w-4 h-4" }) },
      { name: "Electronics", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
    ],
    features: ["Modular Design", "Advanced Control", "Open Source"],
    imageFile: "time-lapse.png",
    detailedInfo: {
      overview: "with few electronic components(Pi pico and a relay) i turned a construction lamp into a time-lapse flash. Signal from camera is detected by Pi pico reading the signal from flash pins.",
      challenges: [
        "reverse engineering camera flash pin-out.",
        "ensuring safety while working with 220V.",
        "making the design compact."
      ],
      lessons: [
        "Advanced CAD modeling techniques.",
        "System integration best practices.",
        "Iterative design methodology."
      ],
      specifications: {
        "microcomputer": "Raspberry Pi Pico",
        "Weight": "200g",
        "Material": "PLA(mounting plate)",
        "Power": "220v AC"
      }
    }
  },
  {
    id: "camera-head-robot",
    title: "project AVATARAS",
    description: "A gimbal systems controled with VR headset for neurobiological research.",
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
    stlFile: "/avataras-Assembly.stl",
    detailedInfo: {
      overview: "after a request from a neurobiology expert I gathered a team and together we started designing a humanoid robot capable of mimicking human head movements.",
      challenges: [
        "Designing stable bipedal locomotion.",
        "Integrating camera and wireless high definition video transmission.",
        "Kinematics."
      ],
      lessons: [
        "Complexities of humanoid robot design.",
        "Balancing compactness and functionality.",
        "Planning for modular electronics and components."
      ],
      specifications: {
        "Height": "200mm",
        "Weight": "2kg",
        "Actuators": "DIY Servos",

      }
    }
  },
  {
    id: "tracked-robot-chassis",
    title: "Tracked Robot Chassis",
    description: "A self-designed and fabricated modular robot chassis. Designed to capture the beauty of our nature through the stealthiness. It features a robust tracked system for superior mobility on diverse terrains.",
    link: "https://www.thingiverse.com/thing:6713139/comments",
    githubLink: "#",
    downloadLink: "https://www.thingiverse.com/thing:6713139/files",
    status: "Completed",
    progress: 100, // Modify this value to change progress
    technologies: [
      { name: "CAD Design", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "3D Printing", icon: React.createElement(FaPrint, { className: "w-4 h-4" }) },
      { name: "Mechanical Engineering", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
      { name: "Electronics", icon: React.createElement(FaCube, { className: "w-4 h-4" }) },
    ],
    features: ["Tracked Drive", "Modular Design", "Open Source"],
    imageFile: "/ROBOT2.png",
    detailedInfo: {
      overview: "This tracked robot chassis project tested my skills from initial concept to final fabrication. from 3D modeling in FREECAD to coding the controls",
      challenges: [
        "Designing a durable track tensioning system.",
        "Part optimization for heavy loadings.",
        "Creating a suitable gearbox design from scrap materials."
      ],
      lessons: [
        "The importance of iterative design and prototyping.",
        "Improvements in 3D modeling for mechanical assemblies.",
        "Importance of creating a good plan for project execution."
      ],
      specifications: {
        "Dimensions": "450mm x 400mm x 150mm",
        "Weight": "~10kg ",
        "Track Material": "PLA",
        "Chassis Material": "metal"
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