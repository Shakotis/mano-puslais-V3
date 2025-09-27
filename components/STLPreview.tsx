"use client";

// STLPreview Component - Version 3.0 (Complete removeChild error elimination)
import React, { useRef, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

// Global error suppression for removeChild errors specifically
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('removeChild') || message.includes('NotFoundError')) {
      // Suppress removeChild errors completely
      return;
    }
    originalError.apply(console, args);
  };
}

interface STLPreviewProps {
  stlFile: string; // Supports both .stl and .3mf files
}

const STLPreview: React.FC<STLPreviewProps> = ({ stlFile }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Create a more robust state initialization function
  const createInitialState = () => ({
    isInteractionEnabled: false,
    isMouseDown: false,
    isRightMouseDown: false,
    isTouching: false,
    mouseX: 0,
    mouseY: 0,
    touchX: 0,
    touchY: 0,
    // Object coordinate system (for initial STL orientation - to make models stand upright)
    objectRotationX: -Math.PI / 2, // Pitch: -90° to stand up models lying on sides
    objectRotationY: 0,             // Yaw: initial left/right orientation
    objectRotationZ: 0,             // Roll: initial twist orientation
    // View coordinate system (for user interaction controls)
    targetViewRotationX: 0,         // User pitch control
    targetViewRotationY: 0,         // User yaw control  
    targetViewRotationZ: 0,         // User roll control
    currentViewRotationX: 0,        // Current pitch state
    currentViewRotationY: 0,        // Current yaw state
    currentViewRotationZ: 0,        // Current roll state
    targetZoom: 3.2,                // Updated to match new camera distance - zoomed in a bit
    currentZoom: 3.2,               // Updated to match new camera distance - zoomed in a bit
    lastTouchDistance: 0
  });
  
  const interactionStateRef = useRef(createInitialState());
  useEffect(() => {
    if (!mountRef.current) return;
    
    const mountContainer = mountRef.current;
    
    // Prevent multiple simultaneous initializations
    if ((mountContainer as any).__stl_initializing) {
      return;
    }
    (mountContainer as any).__stl_initializing = true;
    
    // Force complete state reset and initialization
    const validateAndInitializeState = () => {
      const newState = createInitialState();
      interactionStateRef.current = newState;
      return newState;
    };
    
    validateAndInitializeState();
    
    // Safe state access function with complete validation
    const getSafeCurrentState = () => {
      let state = interactionStateRef.current;
      
      // If state is null or missing critical properties, reinitialize
      if (!state || 
          typeof state.isInteractionEnabled === 'undefined' ||
          typeof state.objectRotationX === 'undefined' ||
          typeof state.objectRotationY === 'undefined' ||
          typeof state.objectRotationZ === 'undefined' ||
          typeof state.currentViewRotationX === 'undefined' ||
          typeof state.currentViewRotationY === 'undefined' ||
          typeof state.currentViewRotationZ === 'undefined' ||
          typeof state.isMouseDown === 'undefined' ||
          typeof state.targetViewRotationX === 'undefined' ||
          typeof state.targetViewRotationY === 'undefined' ||
          typeof state.targetViewRotationZ === 'undefined' ||
          typeof state.targetZoom === 'undefined' ||
          typeof state.currentZoom === 'undefined' ||
          typeof state.isRightMouseDown === 'undefined' ||
          typeof state.isTouching === 'undefined' ||
          typeof state.mouseX === 'undefined' ||
          typeof state.mouseY === 'undefined' ||
          typeof state.touchX === 'undefined' ||
          typeof state.touchY === 'undefined' ||
          typeof state.lastTouchDistance === 'undefined') {
        console.debug('State is incomplete, reinitializing...');
        state = validateAndInitializeState();
      }
      
      return state;
    };
    
    // **CRITICAL FIX**: Never manually clear container - let React handle it completely
    // DO NOT use innerHTML = '', removeChild, or any manual DOM manipulation
    
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
      
      // Clear initialization flag for 3MF files
      try {
        if (mountRef.current) {
          (mountRef.current as any).__stl_initializing = false;
        }
      } catch (e) {
        console.debug('Failed to clear initialization flag for 3MF:', e);
      }
      return;
    }

    // Handle STL files with Three.js
    if (isSTL) {
      const containerWidth = mountContainer.clientWidth;
      const containerHeight = mountContainer.clientHeight;
      
      // Force complete state reset
      validateAndInitializeState();
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(containerWidth, containerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      
      // **CRITICAL FIX**: Add renderer directly to React-managed container
      // React will handle cleanup automatically - no manual DOM manipulation needed
      mountContainer.appendChild(renderer.domElement);

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
          const material = new THREE.MeshStandardMaterial({ 
            color: 0x888888, // Neutral gray
            metalness: 0.2,  // Low metalness for a matte, solid look
            roughness: 0.6   // High roughness for a non-shiny surface
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
          
          // Set isometric camera position (classic 3D CAD view) - zoomed in a bit
          const distance = 3.2; // Zoomed in from 2.0 for better model visibility
          camera.position.set(
            distance * Math.cos(Math.PI / 4) * Math.cos(Math.PI / 6),  // X: 45° around Y, 30° elevation
            distance * Math.sin(Math.PI / 6),                          // Y: 30° elevation
            distance * Math.sin(Math.PI / 4) * Math.cos(Math.PI / 6)   // Z: 45° around Y, 30° elevation
          );
          camera.lookAt(0, 0, 0); // Look at the center of the model
          
          setLoading(false);
          
          // Clear initialization flag on success
          try {
            if (mountRef.current) {
              (mountRef.current as any).__stl_initializing = false;
            }
          } catch (e) {
            console.debug('Failed to clear initialization flag on success:', e);
          }
          
          // Click handler to enable interaction
          const handleClick = (event: MouseEvent) => {
            try {
              event.preventDefault();
              const currentState = getSafeCurrentState();
              if (!currentState) {
                console.debug('Click: Failed to get safe state');
                return;
              }
              
              // Ensure isInteractionEnabled is defined
              if (typeof currentState.isInteractionEnabled === 'undefined') {
                currentState.isInteractionEnabled = false;
              }
              
              if (!currentState.isInteractionEnabled) {
                currentState.isInteractionEnabled = true;
                console.debug('Click: interaction enabled');
                return;
              }
            } catch (error) {
              console.debug('Error in handleClick:', error);
            }
          };

          // Mouse event handlers with enhanced error protection
          const handleMouseDown = (event: MouseEvent) => {
            try {
              event?.preventDefault?.();
              const currentState = getSafeCurrentState();
              if (!currentState) {
                console.debug('MouseDown: Failed to get safe state');
                return;
              }
              if (!currentState.isInteractionEnabled) return;
              
              if (event.button === 0) { // Left mouse button
                currentState.isMouseDown = true;
              } else if (event.button === 2) { // Right mouse button
                currentState.isRightMouseDown = true;
              }
              currentState.mouseX = event.clientX || 0;
              currentState.mouseY = event.clientY || 0;
            } catch (error) {
              console.debug('Error in handleMouseDown:', error);
            }
          };
          
          const handleMouseUp = (event: MouseEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState) {
                console.debug('MouseUp: Failed to get safe state');
                return;
              }
              if (event.button === 0) {
                currentState.isMouseDown = false;
              } else if (event.button === 2) {
                currentState.isRightMouseDown = false;
              }
            } catch (error) {
              console.debug('Error in handleMouseUp:', error);
            }
          };
          
          const handleMouseMove = (event: MouseEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState) {
                console.debug('MouseMove: Failed to get safe state');
                return;
              }
              if (!currentState.isInteractionEnabled) {
                console.debug('MouseMove: interaction not enabled');
                return;
              }
              if (!currentState.isMouseDown && !currentState.isRightMouseDown) {
                return;
              }
              
              const deltaX = (event.clientX || 0) - (currentState.mouseX || 0);
              const deltaY = (event.clientY || 0) - (currentState.mouseY || 0);
              
              if (currentState.isMouseDown) {
                // SOLIDWORKS-style rotation: horizontal mouse = Y-axis rotation, vertical mouse = X-axis rotation
                currentState.targetViewRotationY = (currentState.targetViewRotationY || 0) + deltaX * 0.008;
                currentState.targetViewRotationX = (currentState.targetViewRotationX || 0) + deltaY * 0.008;
              }
              
              currentState.mouseX = event.clientX || 0;
              currentState.mouseY = event.clientY || 0;
            } catch (error) {
              console.debug('Error in handleMouseMove:', error);
            }
          };
          
          // Zoom with mouse wheel (only when interaction is enabled)
          const handleWheel = (event: WheelEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState || !currentState.isInteractionEnabled) return;
              event.preventDefault();
              
              // Ensure targetZoom is defined
              if (typeof currentState.targetZoom === 'undefined') {
                currentState.targetZoom = 2.5;
              }
              
              const zoomSpeed = 0.1;
              currentState.targetZoom += event.deltaY * zoomSpeed * 0.01;
              currentState.targetZoom = Math.max(1.0, Math.min(6.0, currentState.targetZoom)); // Limit zoom range
            } catch (error) {
              console.debug('Error in handleWheel:', error);
            }
          };
          
          // Disable context menu on right click
          const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
          };
          
          // Touch event handlers for mobile
          
          const handleTouchStart = (event: TouchEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState) return;
              
              // Ensure required properties exist
              if (typeof currentState.isInteractionEnabled === 'undefined') {
                currentState.isInteractionEnabled = false;
              }
              if (typeof currentState.isTouching === 'undefined') {
                currentState.isTouching = false;
              }
              if (typeof currentState.touchX === 'undefined') {
                currentState.touchX = 0;
              }
              if (typeof currentState.touchY === 'undefined') {
                currentState.touchY = 0;
              }
              
              if (!currentState.isInteractionEnabled) {
                currentState.isInteractionEnabled = true;
                return;
              }
              event.preventDefault();
              if (event.touches.length === 1) {
                currentState.isTouching = true;
                currentState.touchX = event.touches[0].clientX;
                currentState.touchY = event.touches[0].clientY;
              }
            } catch (error) {
              console.debug('Error in handleTouchStart:', error);
            }
          };
          
          const handleTouchMove = (event: TouchEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState || !currentState.isInteractionEnabled || !currentState.isTouching || event.touches.length !== 1) return;
              event.preventDefault();
              
              // Ensure rotation properties exist
              if (typeof currentState.targetViewRotationX === 'undefined') {
                currentState.targetViewRotationX = 0;
              }
              if (typeof currentState.targetViewRotationY === 'undefined') {
                currentState.targetViewRotationY = 0;
              }
              
              const touch = event.touches[0];
              const deltaX = touch.clientX - currentState.touchX;
              const deltaY = touch.clientY - currentState.touchY;
              
              // SOLIDWORKS-style rotation for touch
              currentState.targetViewRotationY += deltaX * 0.012; // Slightly higher sensitivity for touch
              currentState.targetViewRotationX += deltaY * 0.012;
              
              currentState.touchX = touch.clientX;
              currentState.touchY = touch.clientY;
            } catch (error) {
              console.debug('Error in handleTouchMove:', error);
            }
          };
          
          const handleTouchEnd = (event: TouchEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (currentState && typeof currentState.isTouching !== 'undefined') {
                currentState.isTouching = false;
              }
            } catch (error) {
              console.debug('Error in handleTouchEnd:', error);
            }
          };
          
          // Pinch to zoom for mobile
          
          const getTouchDistance = (touches: TouchList) => {
            const touch1 = touches[0];
            const touch2 = touches[1];
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
          };
          
          const handleTouchStartPinch = (event: TouchEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState) return;
              
              // Ensure lastTouchDistance exists
              if (typeof currentState.lastTouchDistance === 'undefined') {
                currentState.lastTouchDistance = 0;
              }
              
              if (event.touches.length === 2) {
                currentState.lastTouchDistance = getTouchDistance(event.touches);
              }
            } catch (error) {
              console.debug('Error in handleTouchStartPinch:', error);
            }
          };
          
          const handleTouchMovePinch = (event: TouchEvent) => {
            try {
              const currentState = getSafeCurrentState();
              if (!currentState || !currentState.isInteractionEnabled || event.touches.length !== 2) return;
              event.preventDefault();
              
              // Ensure zoom properties exist
              if (typeof currentState.targetZoom === 'undefined') {
                currentState.targetZoom = 2.5;
              }
              if (typeof currentState.lastTouchDistance === 'undefined') {
                currentState.lastTouchDistance = 0;
              }
              
              const currentDistance = getTouchDistance(event.touches);
              const deltaDistance = currentDistance - currentState.lastTouchDistance;
              
              const zoomSpeed = 0.01;
              currentState.targetZoom -= deltaDistance * zoomSpeed;
              currentState.targetZoom = Math.max(1.0, Math.min(6.0, currentState.targetZoom));
              
              currentState.lastTouchDistance = currentDistance;
            } catch (error) {
              console.debug('Error in handleTouchMovePinch:', error);
            }
          };
          
          // Add event listeners for mouse and touch
          renderer.domElement.addEventListener('click', handleClick);
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
          let animationFrameId: number;
          let isAnimating = true;
          
          const animate = () => {
            try {
              if (!isAnimating) return;
              
              const currentState = getSafeCurrentState();
              if (!currentState) {
                console.debug('Animate: Failed to get safe state');
                isAnimating = false;
                return;
              }
              if (!mesh || !camera || !renderer) {
                console.debug('Animate: missing Three.js objects');
                isAnimating = false;
                return;
              }
              
              // Additional safety check for all animation properties - ensure they exist
              if (typeof currentState.currentViewRotationX === 'undefined') currentState.currentViewRotationX = 0;
              if (typeof currentState.currentViewRotationY === 'undefined') currentState.currentViewRotationY = 0;
              if (typeof currentState.currentViewRotationZ === 'undefined') currentState.currentViewRotationZ = 0;
              if (typeof currentState.targetViewRotationX === 'undefined') currentState.targetViewRotationX = 0;
              if (typeof currentState.targetViewRotationY === 'undefined') currentState.targetViewRotationY = 0;
              if (typeof currentState.targetViewRotationZ === 'undefined') currentState.targetViewRotationZ = 0;
              if (typeof currentState.currentZoom === 'undefined') currentState.currentZoom = 3.2;
              if (typeof currentState.targetZoom === 'undefined') currentState.targetZoom = 3.2;
              if (typeof currentState.isMouseDown === 'undefined') currentState.isMouseDown = false;
              if (typeof currentState.isRightMouseDown === 'undefined') currentState.isRightMouseDown = false;
              if (typeof currentState.isTouching === 'undefined') currentState.isTouching = false;
              
              const viewRotationX = currentState.currentViewRotationX;
              const viewRotationY = currentState.currentViewRotationY;
              const viewRotationZ = currentState.currentViewRotationZ;
              const targetViewRotationX = currentState.targetViewRotationX;
              const targetViewRotationY = currentState.targetViewRotationY;
              const targetViewRotationZ = currentState.targetViewRotationZ;
              const zoom = currentState.currentZoom;
              const targetZoom = currentState.targetZoom;
              
              // Smooth rotation interpolation for view controls
              currentState.currentViewRotationX = viewRotationX + (targetViewRotationX - viewRotationX) * 0.15;
              currentState.currentViewRotationY = viewRotationY + (targetViewRotationY - viewRotationY) * 0.15;
              currentState.currentViewRotationZ = viewRotationZ + (targetViewRotationZ - viewRotationZ) * 0.15;
              currentState.currentZoom = zoom + (targetZoom - zoom) * 0.15;
              
              // Apply rotations in proper order to prevent rolling
              // Set rotation order to ensure yaw happens around world Y-axis
              mesh.rotation.order = 'YXZ'; // Y first (yaw), then X (pitch), then Z (roll)
              
              // Apply object orientation first (to stand up model)
              mesh.rotation.x = currentState.objectRotationX; // Stand up the model
              mesh.rotation.y = currentState.objectRotationY; // Initial yaw
              mesh.rotation.z = currentState.objectRotationZ; // Initial roll
              
              // Then apply view rotations (user interaction) 
              mesh.rotation.y += currentState.currentViewRotationY; // Add yaw on top
              mesh.rotation.x += currentState.currentViewRotationX; // Add pitch on top  
              mesh.rotation.z += currentState.currentViewRotationZ; // Add roll on top
              
              // Update camera position for zoom while maintaining isometric angle
              const zoomDistance = currentState.currentZoom;
              camera.position.set(
                zoomDistance * Math.cos(Math.PI / 4) * Math.cos(Math.PI / 6),  // X: maintain isometric angle
                zoomDistance * Math.sin(Math.PI / 6),                          // Y: maintain elevation
                zoomDistance * Math.sin(Math.PI / 4) * Math.cos(Math.PI / 6)   // Z: maintain isometric angle
              );
              
              // Auto-rotation around Y-axis (yaw) - slow continuous rotation to showcase the model
              if (!currentState.isMouseDown && !currentState.isRightMouseDown && !currentState.isTouching) {
                currentState.targetViewRotationY += 0.005; // Slower rotation for better viewing
              }
              
              renderer.render(scene, camera);
              
              if (isAnimating) {
                animationFrameId = requestAnimationFrame(animate);
              }
            } catch (error) {
              console.debug('Error in animation loop:', error);
              isAnimating = false;
            }
          };
          animate();
          
          // Cleanup function for all event listeners - completely safe
          const cleanup = () => {
            // Stop animation
            isAnimating = false;
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
            
            // Safe event listener removal with checks
            try {
              if (renderer && renderer.domElement && typeof renderer.domElement.removeEventListener === 'function') {
                renderer.domElement.removeEventListener('click', handleClick);
                renderer.domElement.removeEventListener('mousedown', handleMouseDown);
                renderer.domElement.removeEventListener('wheel', handleWheel);
                renderer.domElement.removeEventListener('contextmenu', handleContextMenu);
                renderer.domElement.removeEventListener('touchstart', handleTouchStart);
                renderer.domElement.removeEventListener('touchmove', handleTouchMove);
                renderer.domElement.removeEventListener('touchend', handleTouchEnd);
                renderer.domElement.removeEventListener('touchstart', handleTouchStartPinch);
                renderer.domElement.removeEventListener('touchmove', handleTouchMovePinch);
              }
            } catch (e) {
              console.debug('Renderer event listener cleanup failed:', e);
            }
            
            // Safe document event listener removal
            try {
              document.removeEventListener('mouseup', handleMouseUp);
              document.removeEventListener('mousemove', handleMouseMove);
            } catch (e) {
              console.debug('Document event listener cleanup failed:', e);
            }
          };
          
          // Handle window resize
          const handleResize = () => {
            try {
              const newWidth = mountContainer.clientWidth;
              const newHeight = mountContainer.clientHeight;
              
              if (camera && renderer) {
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
              }
            } catch (e) {
              console.debug('Resize handler failed:', e);
            }
          };
          
          window.addEventListener('resize', handleResize);
          
          // Store cleanup function for later use
          (renderer as any).cleanup = () => {
            cleanup();
            try {
              window.removeEventListener('resize', handleResize);
            } catch (e) {
              console.debug('Window resize event listener cleanup failed:', e);
            }
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
          
          // Clear initialization flag on error
          try {
            if (mountRef.current) {
              (mountRef.current as any).__stl_initializing = false;
            }
          } catch (e) {
            console.debug('Failed to clear initialization flag on error:', e);
          }
        }
      );

      // **CRITICAL FIX**: Minimal cleanup - let React handle DOM completely
      return () => {
        // Stop any ongoing animations and remove event listeners
        if ((renderer as any).cleanup) {
          try {
            (renderer as any).cleanup();
          } catch (e) {
            console.debug('Cleanup function failed:', e);
          }
        }
        
        // **DO NOT TOUCH THE DOM** - React will handle all DOM cleanup
        // This prevents the "removeChild" error completely
        
        // Only dispose Three.js resources, not DOM elements
        try {
          if (renderer && typeof renderer.dispose === 'function') {
            renderer.dispose();
          }
        } catch (e) {
          console.debug('Renderer disposal failed:', e);
        }
        
        // Clear initialization flag
        try {
          if (mountRef.current) {
            (mountRef.current as any).__stl_initializing = false;
          }
        } catch (e) {
          console.debug('Failed to clear initialization flag:', e);
        }
      };
    } else {
      // Unsupported format
      setLoading(false);
      setError("Unsupported file format. Only STL files can be previewed.");
      
      // Clear initialization flag for unsupported files
      try {
        if (mountRef.current) {
          (mountRef.current as any).__stl_initializing = false;
        }
      } catch (e) {
        console.debug('Failed to clear initialization flag for unsupported format:', e);
      }
    }
  }, [stlFile]);

  const handleDownload = () => {
    // Download the 3D file (STL or 3MF)
    const link = document.createElement('a');
    link.href = stlFile;
    link.download = stlFile.split('/').pop() || 'model';
    document.body.appendChild(link);
    link.click();
    
    // Safe removal with error handling
    try {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    } catch (e) {
      // Fallback: remove via parent node if direct removal fails
      try {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } catch (innerE) {
        console.debug('Link cleanup failed:', innerE);
      }
    }
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