"use client";

import React from "react";
import { Progress } from "@heroui/progress";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaTasks } from "react-icons/fa";
import { useProjectProgress } from "@/contexts/ProjectProgressContext";

interface ProjectProgressDisplayProps {
  variant?: "compact" | "detailed" | "mini";
  className?: string;
}

export const ProjectProgressDisplay: React.FC<ProjectProgressDisplayProps> = ({ 
  variant = "detailed", 
  className = "" 
}) => {
  const { milestones, overallProgress } = useProjectProgress();
  
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;

  if (variant === "mini") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <FaTasks className="w-4 h-4 text-indigo-400" />
        <Progress 
          aria-label="Project Progress" 
          size="sm" 
          value={overallProgress} 
          color="primary"
          className="flex-1 max-w-32"
        />
        <span className="text-xs text-gray-300">{overallProgress}%</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={`bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-600/30 ${className}`}>
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FaTasks className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-gray-100">Project Progress</h3>
            </div>
            <Chip 
              size="sm" 
              className="bg-indigo-600/20 text-indigo-300"
              startContent={<FaCheckCircle className="w-3 h-3" />}
            >
              {completedMilestones}/{totalMilestones}
            </Chip>
          </div>
          <Progress 
            aria-label="Overall Project Progress" 
            size="md" 
            value={overallProgress} 
            color="primary"
            className="mb-2"
            showValueLabel={true}
            label="Overall Progress"
          />
          <p className="text-sm text-gray-400">
            {completedMilestones} of {totalMilestones} milestones completed
          </p>
        </CardBody>
      </Card>
    );
  }

  // Detailed variant
  return (
    <Card className={`bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-600/30 ${className}`}>
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600/20 rounded-full">
              <FaTasks className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-100">Project Progress</h3>
              <p className="text-sm text-gray-400">Camera Control Platform Development</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Active Development</span>
          </div>
        </div>

        <div className="mb-6">
          <Progress 
            aria-label="Overall Project Progress" 
            size="lg" 
            value={overallProgress} 
            color="primary"
            className="mb-3"
            showValueLabel={true}
            label={`Overall Progress: ${overallProgress}%`}
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{completedMilestones} of {totalMilestones} milestones completed</span>
            <span>{100 - overallProgress}% remaining</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-100 mb-3">Milestones</h4>
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  milestone.completed ? 'bg-green-500' : 'bg-gray-500'
                }`} />
                <div>
                  <h5 className={`font-medium ${
                    milestone.completed ? 'text-gray-100' : 'text-gray-300'
                  }`}>
                    {milestone.name}
                  </h5>
                  <p className="text-xs text-gray-400">{milestone.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Chip 
                  size="sm" 
                  className={`${
                    milestone.completed 
                      ? 'bg-green-600/20 text-green-300' 
                      : 'bg-yellow-600/20 text-yellow-300'
                  }`}
                  startContent={milestone.completed ? 
                    <FaCheckCircle className="w-3 h-3" /> : 
                    <FaClock className="w-3 h-3" />
                  }
                >
                  {milestone.completed ? 'Completed' : 'In Progress'}
                </Chip>
                <span className="text-xs text-gray-500 min-w-[3rem] text-right">
                  {milestone.weight}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectProgressDisplay;