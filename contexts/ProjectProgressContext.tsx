"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  weight: number; // Weight of this milestone in overall progress (0-100)
}

interface ProjectProgressContextType {
  milestones: ProjectMilestone[];
  overallProgress: number;
  updateMilestone: (id: string, completed: boolean) => void;
  addMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;
  removeMilestone: (id: string) => void;
}

const ProjectProgressContext = createContext<ProjectProgressContextType | undefined>(undefined);

export const useProjectProgress = () => {
  const context = useContext(ProjectProgressContext);
  if (context === undefined) {
    throw new Error('useProjectProgress must be used within a ProjectProgressProvider');
  }
  return context;
};

interface ProjectProgressProviderProps {
  children: React.ReactNode;
}

export const ProjectProgressProvider: React.FC<ProjectProgressProviderProps> = ({ children }) => {
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([
    {
      id: "1",
      name: "VR Hardware Setup",
      description: "Complete VR hardware integration and calibration",
      completed: true,
      weight: 15
    },
    {
      id: "2", 
      name: "Head Tracking Implementation",
      description: "Implement real-time head movement detection",
      completed: true,
      weight: 25
    },
    {
      id: "3",
      name: "Camera Control System",
      description: "Develop camera positioning and movement control",
      completed: false,
      weight: 30
    },
    {
      id: "4",
      name: "Robot Integration",
      description: "Integrate camera system with robotic platform",
      completed: false,
      weight: 20
    },
    {
      id: "5",
      name: "Testing & Optimization",
      description: "Complete testing and performance optimization",
      completed: false,
      weight: 10
    }
  ]);

  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const completedWeight = milestones
        .filter(milestone => milestone.completed)
        .reduce((sum, milestone) => sum + milestone.weight, 0);
      
      const totalWeight = milestones.reduce((sum, milestone) => sum + milestone.weight, 0);
      
      return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    };

    setOverallProgress(calculateProgress());
  }, [milestones]);

  const updateMilestone = (id: string, completed: boolean) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === id ? { ...milestone, completed } : milestone
      )
    );
  };

  const addMilestone = (milestone: Omit<ProjectMilestone, 'id'>) => {
    const newMilestone: ProjectMilestone = {
      ...milestone,
      id: Date.now().toString()
    };
    setMilestones(prev => [...prev, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(prev => prev.filter(milestone => milestone.id !== id));
  };

  const value: ProjectProgressContextType = {
    milestones,
    overallProgress,
    updateMilestone,
    addMilestone,
    removeMilestone
  };

  return (
    <ProjectProgressContext.Provider value={value}>
      {children}
    </ProjectProgressContext.Provider>
  );
};