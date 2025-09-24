'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { gsap } from 'gsap';

interface SectionInfo {
  images: string[];
  title: string;
}

const ThreeGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Shader code
  const vertexShader = `
    varying vec2 vUv;

    void main() {
        vUv = uv;

        gl_Position = projectionMatrix * 
                      modelViewMatrix * 
                      vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D image;
    uniform sampler2D displacement;
    uniform float u_time;
    uniform float u_progress;
    uniform float u_mouse;

    varying vec2 vUv;

    void main() {
        vec4 displace = texture2D(displacement, vUv);
        vec2 displacedUV = vec2(vUv.x + u_progress * 0.1 * sin(vUv.y * 4.0 + u_time), vUv.y);
        
        vec4 color = texture2D(image, displacedUV);
        
        color.r = texture2D(image, displacedUV + vec2(0., 10.0 * 0.005) * (u_progress * 5.)).r;
        color.g = texture2D(image, displacedUV + vec2(0., 10.0 * 0.007) * (u_progress * 2.)).g;
        color.b = texture2D(image, displacedUV + vec2(0., 10.0 * 0.008) * (u_progress * 3.0)).b;
        
        gl_FragColor = color;
    }
  `;

  const sectionsInfo: SectionInfo[] = [
    {
      images: [
        "https://assets.codepen.io/2479807/grid-photo-4.jpg",
        "https://assets.codepen.io/2479807/grid-photo-3.jpg",
        "https://assets.codepen.io/2479807/grid-photo-2.jpg",
        "https://assets.codepen.io/2479807/grid-photo-1.jpg"
      ],
      title: "Januar"
    },
    {
      images: [
        "https://assets.codepen.io/2479807/scroll-1.jpg",
        "https://assets.codepen.io/2479807/scroll-2.jpg",
        "https://assets.codepen.io/2479807/scroll-3.jpg"
      ],
      title: "Februar"
    },
    {
      images: [
        "https://assets.codepen.io/2479807/img-5.jpg",
        "https://assets.codepen.io/2479807/img-6.jpg",
        "https://assets.codepen.io/2479807/img-7.jpg",
        "https://assets.codepen.io/2479807/img-8.jpg"
      ],
      title: "Mars"
    },
    {
      images: [
        "https://assets.codepen.io/2479807/bike-1.jpg",
        "https://assets.codepen.io/2479807/bike-2.jpg",
        "https://assets.codepen.io/2479807/bike-3.jpg",
        "https://assets.codepen.io/2479807/grid-photo-1.jpg"
      ],
      title: "April"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    let viewport = {
      width: container.clientWidth,
      height: container.clientHeight,
      aspectRatio: container.clientWidth / container.clientHeight
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1419); // Dark theme to match your site
    sceneRef.current = scene;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    renderer.setSize(viewport.width, viewport.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera setup
    const FOV = 50;
    const CAMERA_NEAR = 0.1;
    const CAMERA_FAR = 160;
    const camera = new THREE.PerspectiveCamera(
      FOV,
      viewport.aspectRatio,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Fog for depth perception
    const fog = new THREE.Fog(0x0f1419, 1, 150);
    scene.fog = fog;

    // Raycaster for mouse interactions
    const raycaster = new THREE.Raycaster();
    const intersections: THREE.Mesh[] = [];
    const textureLoader = new THREE.TextureLoader();
    const fontLoader = new FontLoader();
    const fontUrl = "https://assets.codepen.io/2479807/silk-json.json";

    // Create plane geometry function
    const makePlane = (width: number, height: number, image: THREE.Texture) => {
      const geometry = new THREE.PlaneGeometry(width, height, 1);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: image
      });
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    };

    // Set image positions in groups
    const setImagesPositions = (position: THREE.Vector3, index: number) => {
      if (index === 0) {
        // Top left
        gsap.set(position, { x: -20, y: 20, z: -20 });
      } else if (index === 1) {
        // Bottom left
        gsap.set(position, { x: -20, y: -20, z: -80 });
      } else if (index === 2) {
        // Top right
        gsap.set(position, { x: 20, y: 20, z: -40 });
      } else if (index === 3) {
        // Bottom right
        gsap.set(position, { x: 20, y: -20, z: -120 });
      }
    };

    const months: THREE.Group[] = [];

    // Create sections
    sectionsInfo.forEach((section, sectionIndex) => {
      const sectionGroup = new THREE.Group();

      // Load font and create title
      fontLoader.load(fontUrl, (font: any) => {
        const geometry = new TextGeometry(section.title, {
          font: font,
          size: 6,
          depth: 0,
          curveSegments: 4
        });
        geometry.center();

        const material = new THREE.MeshBasicMaterial({
          color: 0x00a1d7 // Blue accent color
        });

        const mesh = new THREE.Mesh(geometry, material);
        sectionGroup.add(mesh);
      });

      // Create image planes
      section.images.forEach((imageUrl, imageIndex) => {
        const plane = makePlane(20, 20, new THREE.Texture());
        
        textureLoader.load(imageUrl, (texture) => {
          plane.material.map = texture;
          plane.scale.set(
            1.0,
            texture.image.height / texture.image.width,
            1.0
          );
          plane.material.needsUpdate = true;
        });

        intersections.push(plane);
        setImagesPositions(plane.position, imageIndex);
        sectionGroup.add(plane);
      });

      // Position section groups with more spacing for scroll effect
      gsap.set(sectionGroup.position, {
        z: -sectionIndex * 300 // Increased spacing for better scroll feel
      });

      months.push(sectionGroup);
      scene.add(sectionGroup);
    });

    // Mouse tracking
    const mouse = new THREE.Vector2();
    let mousePerspective = { x: 0, y: 0 };

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      // Update mouse perspective for camera rotation
      mousePerspective.x = event.clientX / window.innerWidth - 0.5;
      mousePerspective.y = event.clientY / window.innerHeight - 0.5;

      // Smooth camera rotation based on mouse position
      gsap.to(camera.rotation, {
        duration: 4,
        x: -mousePerspective.y * 0.3, // Reduced intensity
        y: -mousePerspective.x * 0.3,
        ease: "power4.out"
      });
    };

    // Scroll handler for moving into the screen
    const onScroll = (event: WheelEvent) => {
      event.preventDefault();
      
      // Move camera deeper into the scene based on scroll
      const scrollSpeed = viewport.width < 768 ? 1.5 : 2; // Slower on mobile
      const newZ = camera.position.z - (event.deltaY / 100) * scrollSpeed;
      
      // Set boundaries to prevent going too far or too close
      const minZ = -800; // How far back you can go
      const maxZ = 100;   // How close you can get
      
      camera.position.z = Math.max(minZ, Math.min(maxZ, newZ));
    };

    // Touch handlers for mobile scroll-into-screen
    let lastTouchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const currentTouchY = event.touches[0].clientY;
      const deltaY = lastTouchY - currentTouchY;
      
      const scrollSpeed = 1;
      const newZ = camera.position.z - (deltaY / 50) * scrollSpeed;
      
      const minZ = -800;
      const maxZ = 100;
      
      camera.position.z = Math.max(minZ, Math.min(maxZ, newZ));
      lastTouchY = currentTouchY;
    };

    // Resize handler
    const onWindowResize = () => {
      viewport.width = container.clientWidth;
      viewport.height = container.clientHeight;
      viewport.aspectRatio = container.clientWidth / container.clientHeight;

      camera.aspect = viewport.aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(viewport.width, viewport.height);
    };

    // Render loop
    const render = () => {
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouse, camera);

      animationIdRef.current = requestAnimationFrame(render);
    };

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('wheel', onScroll, { passive: false });
    window.addEventListener('resize', onWindowResize);
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });

    // Start render loop
    render();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Dispose of Three.js resources
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
    <div 
      ref={containerRef} 
      className="w-full h-screen relative"
      style={{ 
        background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)',
        cursor: 'grab'
      }}
    />
  );
};

export default ThreeGallery;