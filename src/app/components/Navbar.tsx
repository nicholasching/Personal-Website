'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useThemeContext } from '../providers/ThemeProvider';

// Navigation items
const navItems = [
  { name: 'Home', href: '#home' },
  // { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  // { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all delay-500 ${
        scrolled 
          ? isDark 
            ? 'bg-gray-900/40 shadow-lg backdrop-blur-md'
            : 'bg-white/40 shadow-lg backdrop-blur-md'
          : isDark
            ? 'bg-transparent'
            : 'bg-white/95'
      } transition-all delay-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className={`font-bold text-xl ${
              isDark ? 'text-white' : 'text-gray-900'
            } hover:text-blue-500 transition-all delay-500`}
          >
            Nicholas Ching
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`${
                  isDark 
                    ? 'text-gray-200 hover:text-blue-400' 
                    : 'text-gray-700 hover:text-blue-600'
                } transition-all delay-500`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark 
                  ? 'text-gray-200 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-all delay-500`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'text-gray-200 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-all delay-500`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-md shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } transition-all delay-500`}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md ${
                    isDark 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition-all delay-500`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <button
                onClick={(e) => {
                  toggleTheme(e);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  isDark 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                } transition-all delay-500`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 