'use client';

import { ReactNode } from 'react';
import { useThemeContext } from '../providers/ThemeProvider';

export function ThemeWrapper({ children }: { children: ReactNode }) {
  const { isDark } = useThemeContext();
  
  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } transition-colors duration-500`}>
      {children}
    </div>
  );
} 