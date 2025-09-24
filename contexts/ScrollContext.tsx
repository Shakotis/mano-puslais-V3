'use client';

import { createContext, useContext, useRef, ReactNode } from 'react';

interface ScrollContextType {
  registerNavigation: (navFunction: (sectionIndex: number) => void) => void;
  navigateToSection: (sectionIndex: number) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollNavigation = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollNavigation must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigationRef = useRef<((sectionIndex: number) => void) | null>(null);

  const registerNavigation = (navFunction: (sectionIndex: number) => void) => {
    navigationRef.current = navFunction;
  };

  const navigateToSection = (sectionIndex: number) => {
    if (navigationRef.current) {
      navigationRef.current(sectionIndex);
    }
  };

  return (
    <ScrollContext.Provider value={{ registerNavigation, navigateToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};