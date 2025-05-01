'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { ThemeTransition } from '../components/ThemeTransition';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: (e: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType>({ 
  isDark: true,
  toggleTheme: () => {} 
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

  /*
  useEffect(() => {
    // Check if we're in dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Set up a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          setIsDark(isDarkMode);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);
  */


  const toggleTheme = (e: React.MouseEvent) => {
    //const newTheme = isDark ? 'light' : 'dark';
    //document.documentElement.classList.remove(isDark ? 'dark' : 'light');
    //document.documentElement.classList.add(newTheme);
    setIsDark(!isDark);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeTransition isDark={isDark} clickPosition={clickPosition} />
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
      disableTransitionOnChange
    >
      <ThemeContextProvider>
        {children}
      </ThemeContextProvider>
    </ThemeProvider>
  );
} 