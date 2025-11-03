"use client";

import React from 'react';
import Particles from './Particles';

const ParticlesBackground: React.FC = () => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #1a1a2e 100%)'
      }}
    >
      <Particles
        particleColors={['#ffffff', '#8b9dc3', '#a8b8d8']}
        particleCount={300}
        particleSpread={8}
        speed={0.15}
        particleBaseSize={120}
        moveParticlesOnHover={true}
        particleHoverFactor={0.8}
        alphaParticles={true}
        sizeRandomness={1.2}
        cameraDistance={18}
        disableRotation={false}
      />
    </div>
  );
};

export default ParticlesBackground;
