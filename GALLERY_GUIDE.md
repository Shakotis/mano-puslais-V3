# 3D Gallery Component Usage Guide

## Installation

Before using the 3D Gallery component, you need to install the required dependencies:

```bash
npm install three @types/three gsap
```

### Important Note
The component uses Three.js addon modules for FontLoader and TextGeometry. These are imported separately:
```typescript
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
```

## Features

### Scroll-into-Screen Effect
- **Mouse Wheel**: Scroll up/down to move the camera deeper into or out of the 3D scene
- **Touch Devices**: Swipe up/down to navigate through the scene depth
- **Boundaries**: Camera movement is limited between z-positions of -800 (far) to 100 (close)

### Mouse Interaction
- **Camera Rotation**: Move your mouse to rotate the camera perspective
- **Smooth Animation**: Uses GSAP for smooth camera transitions

### Responsive Design
- **Mobile Support**: Touch controls for mobile devices
- **Adaptive Scrolling**: Different scroll speeds for desktop and mobile
- **Dynamic Sizing**: Automatically adjusts to container size

## Customization

### Changing Images
Update the `sectionsInfo` array in `components/ThreeGallery.tsx`:

```typescript
const sectionsInfo: SectionInfo[] = [
  {
    images: [
      "your-image-1.jpg",
      "your-image-2.jpg",
      // ... more images
    ],
    title: "Your Section Title"
  },
  // ... more sections
];
```

### Adjusting Scroll Speed
Modify the `scrollSpeed` variables in the scroll handlers:

```typescript
// Desktop scroll speed
const scrollSpeed = 2; // Higher = faster scrolling

// Mobile scroll speed  
const scrollSpeed = 1.5; // Lower for better mobile control
```

### Camera Boundaries
Change the min/max Z positions:

```typescript
const minZ = -800; // How far back you can go
const maxZ = 100;   // How close you can get
```

### Section Spacing
Adjust spacing between image groups:

```typescript
gsap.set(sectionGroup.position, {
  z: -sectionIndex * 300 // Increase for more spacing
});
```

### Color Scheme
Update the background color and fog:

```typescript
scene.background = new THREE.Color(0x0f1419); // Dark theme
const fog = new THREE.Fog(0x0f1419, 1, 150);  // Matching fog
```

## Usage

### As a Separate Page
The gallery is available at `/gallery` route.

### Integration
The component is automatically added to your navigation menu as "3D Gallery".

### Direct Usage
```tsx
import ThreeGallery from "@/components/ThreeGallery";

export default function MyPage() {
  return (
    <div className="h-screen">
      <ThreeGallery />
    </div>
  );
}
```

## Performance Notes

- The component automatically cleans up Three.js resources when unmounted
- Images are loaded asynchronously and cached by the browser
- Render loop uses requestAnimationFrame for optimal performance
- Mouse/touch event listeners are properly removed on cleanup

## Troubleshooting

### Gallery Not Loading
1. Ensure Three.js and GSAP are installed
2. Check browser console for any JavaScript errors
3. Verify image URLs are accessible

### Poor Performance
1. Reduce the number of images per section
2. Optimize image file sizes
3. Increase section spacing to reduce visible objects

### Touch Controls Not Working
- Ensure the container has proper touch event listeners
- Check that `{ passive: false }` is set for touch events