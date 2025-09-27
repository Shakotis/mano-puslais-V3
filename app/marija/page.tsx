'use client';

import { useState } from 'react';
import GravityParticles from '@/components/GravityParticles';
import GravityControls from '@/components/GravityControls';

export default function MarijaPage() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [particleCount, setParticleCount] = useState(200);
  const [gravity, setGravity] = useState(0.08);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950">
      {/* Gravity Particles Background */}
      <GravityParticles 
        particleCount={particleCount}
        gravity={gravity}
        backgroundColor="rgba(15, 15, 35, 0.8)"
      />
      
      {/* Gravity Controls */}
      <GravityControls
        particleCount={particleCount}
        gravity={gravity}
        onParticleCountChange={setParticleCount}
        onGravityChange={setGravity}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center pointer-events-none">
        <div className="text-center px-4 pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse gravity-text-glow mb-8 hover:scale-105 transition-transform duration-300 cursor-default">
            STIM SITE
          </h1>
          <div className="text-gray-300 mb-8 space-y-2">
            <p className="text-xl">✨ MIMIMIMIMIMIMI✨</p>
            <p className="text-sm opacity-75">MIMIMIMI</p>
          </div>
          
          {/* Instructions */}
          {showInstructions && (
            <div className="bg-black/30 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-6 max-w-md mx-auto mb-8 gravity-card-glow">
              <h3 className="text-indigo-300 font-semibold mb-3">Interactive Controls</h3>
              <div className="text-sm text-gray-300 space-y-1 text-left">
                <p>🖱️ <strong>Click:</strong> Create gravity points</p>
                <p>🫳 <strong>Drag:</strong> Move gravity points</p>
                <p>🖱️ <strong>Double-click:</strong> Collapse gravity points</p>
                <p>✨ Watch particles dance around your gravity!</p>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Hide Instructions
              </button>
            </div>
          )}
          
          {!showInstructions && (
            <button
              onClick={() => setShowInstructions(true)}
              className="text-sm text-indigo-400/70 hover:text-indigo-300 transition-colors"
            >
              Show Instructions
            </button>
          )}
        </div>
      </div>
      
      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </main>
  );
}