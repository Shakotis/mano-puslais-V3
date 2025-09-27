'use client';

import { useState } from 'react';

interface GravityControlsProps {
  onParticleCountChange: (count: number) => void;
  onGravityChange: (gravity: number) => void;
  particleCount: number;
  gravity: number;
}

export default function GravityControls({
  onParticleCountChange,
  onGravityChange,
  particleCount,
  gravity
}: GravityControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/40 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-3 text-indigo-300 hover:text-indigo-200 transition-all gravity-card-glow"
        title="Gravity Controls"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/60 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4 w-64 gravity-card-glow">
          <h3 className="text-indigo-300 font-semibold mb-4">Gravity Controls</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Particle Count: {particleCount}
              </label>
              <input
                type="range"
                min="50"
                max="500"
                value={particleCount}
                onChange={(e) => onParticleCountChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Gravity Strength: {gravity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={gravity}
                onChange={(e) => onGravityChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-indigo-500/20">
            <p className="text-xs text-gray-400 mb-2">Quick Actions:</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onParticleCountChange(100);
                  onGravityChange(0.05);
                }}
                className="text-xs px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600/50 rounded transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  onParticleCountChange(300);
                  onGravityChange(0.1);
                }}
                className="text-xs px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded transition-colors"
              >
                Intense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}