"use client";

import React, { useRef, useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { FaCube, FaDownload, FaExpand, FaExclamationTriangle } from "react-icons/fa";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface STLPreviewProps {
  stlFile: string; // Supports both .stl and .3mf files
}

const STLPreview: React.FC<STLPreviewProps> = ({ stlFile }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Reset states
    setLoading(true);
    setError(null);
    
    // Get file extension
    const fileExtension = stlFile.split('.').pop()?.toLowerCase();
    const is3MF = fileExtension === '3mf';
    const isSTL = fileExtension === 'stl';

    // Handle 3MF files - show message that they need to be downloaded
    if (is3MF) {
      setLoading(false);
      setError("3MF files can be downloaded but cannot be previewed in the browser. Download to view in 3D software.");
      return;
    }

    // Handle STL files with Three.js
    if (isSTL) {
      const container = mountRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(containerWidth, containerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      container.appendChild(renderer.domElement);

      // SOLIDWORKS-style default lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      // Main directional light (like SOLIDWORKS default)
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
      mainLight.position.set(1, 1, 1);
      mainLight.castShadow = false; // SOLIDWORKS typically doesn't use shadows in default mode
      scene.add(mainLight);
      
      // Fill light to reduce harsh shadows
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
      fillLight.position.set(-1, -1, -0.5);
      scene.add(fillLight);
      
      // Soft hemisphere light for even illumination
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.2);
      scene.add(hemisphereLight);

      // Load STL file
      const loader = new STLLoader();
      loader.load(
        stlFile,
        (geometry) => {
          const material = new THREE.MeshPhongMaterial({ 
            color: 0x888888, // Neutral gray like SOLIDWORKS default
            shininess: 30,   // Lower shininess for more matte finish
            specular: 0x222222 // Subtle specular highlights
          });
          const mesh = new THREE.Mesh(geometry, material);
          
          // Center and scale the geometry
          geometry.computeBoundingBox();
          const box = geometry.boundingBox!;
          const center = box.getCenter(new THREE.Vector3());
          geometry.translate(-center.x, -center.y, -center.z);
          
          // Make model bigger by using a larger scale
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3.5 / maxDim; // Increased from 2 to 3.5 for bigger model
          mesh.scale.setScalar(scale);
          
          scene.add(mesh);
          camera.position.z = 2.5; // Moved camera closer for bigger appearance
          
          setLoading(false);
          
          // Enhanced interaction variables
          let isMouseDown = false;
          let isRightMouseDown = false;
          let mouseX = 0;
          let mouseY = 0;
          let targetRotationX = 0;
          let targetRotationY = 0;
          let currentRotationX = 0;
          let currentRotationY = 0;
          let targetZoom = 2.5;
          let currentZoom = 2.5;
          
          // Mouse event handlers
          const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            if (event.button === 0) { // Left mouse button
              isMouseDown = true;
            } else if (event.button === 2) { // Right mouse button
              isRightMouseDown = true;
            }
            mouseX = event.clientX;
            mouseY = event.clientY;
          };
          
          const handleMouseUp = (event: MouseEvent) => {
            if (event.button === 0) {
              isMouseDown = false;
            } else if (event.button === 2) {
              isRightMouseDown = false;
            }
          };
          
          const handleMouseMove = (event: MouseEvent) => {
            if (!isMouseDown && !isRightMouseDown) return;
            
            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;
            
            if (isMouseDown) {
              // SOLIDWORKS-style rotation: horizontal mouse = Y-axis rotation, vertical mouse = X-axis rotation
              targetRotationY += deltaX * 0.008; // Horizontal mouse movement rotates around Y-axis (left-right)
              targetRotationX += deltaY * 0.008; // Vertical mouse movement rotates around X-axis (up-down)
            }
            
            mouseX = event.clientX;
            mouseY = event.clientY;
          };
          
          // Zoom with mouse wheel
          const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const zoomSpeed = 0.1;
            targetZoom += event.deltaY * zoomSpeed * 0.01;
            targetZoom = Math.max(1.0, Math.min(6.0, targetZoom)); // Limit zoom range
          };
          
          // Disable context menu on right click
          const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
          };
          
          // Touch event handlers for mobile
          let isTouching = false;
          let touchX = 0;
          let touchY = 0;
          
          const handleTouchStart = (event: TouchEvent) => {
            event.preventDefault();
            if (event.touches.length === 1) {
              isTouching = true;
              touchX = event.touches[0].clientX;
              touchY = event.touches[0].clientY;
            }
          };
          
          const handleTouchMove = (event: TouchEvent) => {
            if (!isTouching || event.touches.length !== 1) return;
            event.preventDefault();
            
            const touch = event.touches[0];
            const deltaX = touch.clientX - touchX;
            const deltaY = touch.clientY - touchY;
            
            // SOLIDWORKS-style rotation for touch
            targetRotationY += deltaX * 0.012; // Slightly higher sensitivity for touch
            targetRotationX += deltaY * 0.012;
            
            touchX = touch.clientX;
            touchY = touch.clientY;
          };
          
          const handleTouchEnd = (event: TouchEvent) => {
            isTouching = false;
          };
          
          // Pinch to zoom for mobile
          let lastTouchDistance = 0;
          
          const getTouchDistance = (touches: TouchList) => {
            const touch1 = touches[0];
            const touch2 = touches[1];
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
          };
          
          const handleTouchStartPinch = (event: TouchEvent) => {
            if (event.touches.length === 2) {
              lastTouchDistance = getTouchDistance(event.touches);
            }
          };
          
          const handleTouchMovePinch = (event: TouchEvent) => {
            if (event.touches.length === 2) {
              event.preventDefault();
              const currentDistance = getTouchDistance(event.touches);
              const deltaDistance = currentDistance - lastTouchDistance;
              
              const zoomSpeed = 0.01;
              targetZoom -= deltaDistance * zoomSpeed;
              targetZoom = Math.max(1.0, Math.min(6.0, targetZoom));
              
              lastTouchDistance = currentDistance;
            }
          };
          
          // Add event listeners for mouse and touch
          renderer.domElement.addEventListener('mousedown', handleMouseDown);
          renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });
          renderer.domElement.addEventListener('contextmenu', handleContextMenu);
          document.addEventListener('mouseup', handleMouseUp);
          document.addEventListener('mousemove', handleMouseMove);
          
          // Touch event listeners for mobile
          renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
          renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
          renderer.domElement.addEventListener('touchend', handleTouchEnd);
          
          // Combined touch handlers for pinch zoom
          renderer.domElement.addEventListener('touchstart', handleTouchStartPinch);
          renderer.domElement.addEventListener('touchmove', handleTouchMovePinch, { passive: false });
          
          // Enhanced animation loop
          const animate = () => {
            requestAnimationFrame(animate);
            
            // Smooth rotation interpolation
            currentRotationX += (targetRotationX - currentRotationX) * 0.15;
            currentRotationY += (targetRotationY - currentRotationY) * 0.15;
            currentZoom += (targetZoom - currentZoom) * 0.15;
            
            mesh.rotation.x = currentRotationX;
            mesh.rotation.y = currentRotationY;
            
            // Update camera position for zoom
            camera.position.z = currentZoom;
            
            // Auto-rotation around Y-axis when not interacting (mouse or touch)
            if (!isMouseDown && !isRightMouseDown && !isTouching) {
              targetRotationY += 0.003; // Rotates around Y-axis (vertical axis) like SOLIDWORKS
            }
            
            renderer.render(scene, camera);
          };
          animate();
          
          // Cleanup function for all event listeners
          const cleanup = () => {
            // Mouse events
            renderer.domElement.removeEventListener('mousedown', handleMouseDown);
            renderer.domElement.removeEventListener('wheel', handleWheel);
            renderer.domElement.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            
            // Touch events
            renderer.domElement.removeEventListener('touchstart', handleTouchStart);
            renderer.domElement.removeEventListener('touchmove', handleTouchMove);
            renderer.domElement.removeEventListener('touchend', handleTouchEnd);
            renderer.domElement.removeEventListener('touchstart', handleTouchStartPinch);
            renderer.domElement.removeEventListener('touchmove', handleTouchMovePinch);
          };
          
          // Handle window resize
          const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            
            renderer.setSize(newWidth, newHeight);
          };
          
          window.addEventListener('resize', handleResize);
          
          // Store cleanup function for later use
          (renderer as any).cleanup = () => {
            cleanup();
            window.removeEventListener('resize', handleResize);
          };
        },
        (progress) => {
          // Loading progress
          console.log('Loading progress:', progress);
        },
        (error) => {
          console.error('Error loading STL:', error);
          setError("Failed to load STL file. File may not exist or be corrupted.");
          setLoading(false);
        }
      );

      // Cleanup
      return () => {
        if ((renderer as any).cleanup) {
          (renderer as any).cleanup();
        }
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } else {
      // Unsupported format
      setLoading(false);
      setError("Unsupported file format. Only STL files can be previewed.");
    }
  }, [stlFile]);

  const handleDownload = () => {
    // Download the 3D file (STL or 3MF)
    const link = document.createElement('a');
    link.href = stlFile;
    link.download = stlFile.split('/').pop() || 'model';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = () => {
    const fileExtension = stlFile.split('.').pop()?.toLowerCase();
    const is3MF = fileExtension === '3mf';
    
    if (is3MF) {
      alert("3MF files cannot be previewed in browser. Please download the file and open it with 3D software like FreeCAD, SOLIDWORKS, or 3D Builder.");
      return;
    }
    // For STL files, make the current viewer fullscreen
    if (mountRef.current) {
      if (mountRef.current.requestFullscreen) {
        mountRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      >
        {loading && (
          <div className="text-gray-400 flex items-center gap-2">
            <div className="animate-spin w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full"></div>
            Loading...
          </div>
        )}
        {error && (
          <div className="text-yellow-400 flex items-center gap-2 p-4 text-center text-sm">
            <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Cannot preview this file type</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default STLPreview;