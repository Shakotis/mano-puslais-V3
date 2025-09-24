'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    let viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f23); // Deep space color
    sceneRef.current = scene;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(viewport.width, viewport.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera setup - static position for background effect
    const camera = new THREE.PerspectiveCamera(75, viewport.aspectRatio, 0.1, 2000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // Create enhanced starfield with multiple layers
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Positions
      starPositions[i3] = (Math.random() - 0.5) * 2000;     // x
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2000; // y
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2000; // z
      
      // Colors (varying whites and blues)
      const colorIntensity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
      starColors[i3] = colorIntensity;     // r
      starColors[i3 + 1] = colorIntensity; // g
      starColors[i3 + 2] = Math.random() < 0.3 ? 1 : colorIntensity; // b (some blue tint)
      
      // Sizes
      starSizes[i] = Math.random() * 3 + 1;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add ambient lighting for better material rendering
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 1000);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Add floating geometric shapes for depth with enhanced materials
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.SphereGeometry(2, 12, 12),
      new THREE.ConeGeometry(1.5, 3, 8),
      new THREE.OctahedronGeometry(2),
      new THREE.TetrahedronGeometry(2),
      new THREE.IcosahedronGeometry(1.5)
    ];

    for (let i = 0; i < 30; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const hue = Math.random();
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(hue, 0.7, 0.5),
        transparent: true,
        opacity: 0.2,
        wireframe: Math.random() > 0.5,
        emissive: new THREE.Color().setHSL(hue, 0.5, 0.1),
        shininess: 100
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        Math.random() * -1200 - 100
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Store initial rotation speeds
      (mesh as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Mouse tracking for subtle camera movement
    let mousePerspective = { x: 0, y: 0 };
    let targetPerspective = { x: 0, y: 0 };
    let isOverInteractiveElement = false;
    
    const onMouseMove = (event: MouseEvent) => {
      // Check if mouse is over a card element or any interactive component
      const target = event.target as Element;
      const wasOverInteractiveElement = isOverInteractiveElement;
      isOverInteractiveElement = !!(target?.closest('[data-slot="base"]') || // HeroUI Card components
                                    target?.closest('.card') || // Custom card classes
                                    target?.closest('button') || // Button elements
                                    target?.closest('a') || // Link elements
                                    target?.closest('input') || // Input elements
                                    target?.closest('textarea')); // Textarea elements
      
      // Update target perspective based on mouse position
      if (!isOverInteractiveElement) {
        targetPerspective.x = (event.clientX / window.innerWidth - 0.5) * 0.1;
        targetPerspective.y = (event.clientY / window.innerHeight - 0.5) * 0.1;
      }
    };

    // Resize handler
    const onResize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.aspectRatio = viewport.width / viewport.height;

      camera.aspect = viewport.aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(viewport.width, viewport.height);
    };

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Animate shapes with individual rotation speeds and floating motion
      shapes.forEach((shape, index) => {
        const speed = (shape as any).rotationSpeed;
        shape.rotation.x += speed.x;
        shape.rotation.y += speed.y;
        shape.rotation.z += speed.z;
        
        // Add subtle floating motion
        const floatOffset = index * 2;
        shape.position.y += Math.sin(time + floatOffset) * 0.02;
        shape.position.x += Math.cos(time * 0.5 + floatOffset) * 0.01;
      });

      // Animate stars with parallax effect
      stars.rotation.y += 0.0001;
      stars.rotation.z += 0.0001;
      
      // Make stars twinkle by adjusting material opacity
      const starMat = stars.material as THREE.PointsMaterial;
      starMat.opacity = 0.6 + Math.sin(time * 2) * 0.2;

      // Smooth camera rotation interpolation
      const lerpFactor = isOverInteractiveElement ? 0.02 : 0.05; // Slower when over interactive elements
      mousePerspective.x += (targetPerspective.x - mousePerspective.x) * lerpFactor;
      mousePerspective.y += (targetPerspective.y - mousePerspective.y) * lerpFactor;
      
      camera.rotation.x = -mousePerspective.y;
      camera.rotation.y = mousePerspective.x;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" />
  );
};

export default ThreeBackground;