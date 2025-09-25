"use client";

import React, { useRef, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { FaCube, FaDownload, FaExpand } from "react-icons/fa";

interface STLPreviewProps {
  stlFile: string;
}

const STLPreview: React.FC<STLPreviewProps> = ({ stlFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple 3D cube visualization as placeholder
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCube = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up perspective
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 60;
      
      // Cube faces (simplified isometric view)
      ctx.strokeStyle = "#6366f1";
      ctx.fillStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 2;
      
      // Front face
      ctx.beginPath();
      ctx.rect(centerX - size, centerY - size, size * 2, size * 2);
      ctx.fill();
      ctx.stroke();
      
      // Top face (isometric)
      ctx.beginPath();
      ctx.moveTo(centerX - size, centerY - size);
      ctx.lineTo(centerX - size + 30, centerY - size - 30);
      ctx.lineTo(centerX + size + 30, centerY - size - 30);
      ctx.lineTo(centerX + size, centerY - size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Right face (isometric)
      ctx.beginPath();
      ctx.moveTo(centerX + size, centerY - size);
      ctx.lineTo(centerX + size + 30, centerY - size - 30);
      ctx.lineTo(centerX + size + 30, centerY + size - 30);
      ctx.lineTo(centerX + size, centerY + size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add some detail lines
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 1;
      
      // Vertical lines on front face
      for (let i = 1; i < 4; i++) {
        const x = centerX - size + (size * 2 * i / 4);
        ctx.beginPath();
        ctx.moveTo(x, centerY - size);
        ctx.lineTo(x, centerY + size);
        ctx.stroke();
      }
      
      // Horizontal lines on front face
      for (let i = 1; i < 4; i++) {
        const y = centerY - size + (size * 2 * i / 4);
        ctx.beginPath();
        ctx.moveTo(centerX - size, y);
        ctx.lineTo(centerX + size, y);
        ctx.stroke();
      }
    };

    // Initial draw
    drawCube();
    
    // Add rotation animation
    let rotation = 0;
    const animate = () => {
      rotation += 0.01;
      drawCube();
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  const handleDownload = () => {
    // Placeholder for STL download functionality
    console.log("STL download would be implemented here");
  };

  const handleFullscreen = () => {
    // Placeholder for fullscreen STL viewer
    console.log("Fullscreen STL viewer would be implemented here");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <Card className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden" radius="md">
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600/20 rounded-lg">
                <FaCube className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100">3D Model Preview</h4>
                <p className="text-sm text-gray-400">Camera gimbal housing design</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="flat"
                className="bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                startContent={<FaExpand className="w-3 h-3" />}
                onClick={handleFullscreen}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<FaDownload className="w-3 h-3" />}
                onClick={handleDownload}
              >
                Download STL
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="w-full h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-600"
              style={{ maxWidth: "100%" }}
            />
            <div className="absolute top-2 left-2 text-xs text-gray-500 bg-gray-900/50 px-2 py-1 rounded">
              Interactive 3D Model
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>
              <strong className="text-gray-300">File:</strong> camera-gimbal-housing.stl
            </p>
            <p>
              <strong className="text-gray-300">Size:</strong> 2.4 MB • 
              <strong className="text-gray-300"> Triangles:</strong> 15,420
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default STLPreview;