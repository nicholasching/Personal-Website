'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useThemeContext } from '../providers/ThemeProvider';
import { useEffect, useState } from 'react';
import { useSectionTracking } from '@/hooks/useSectionTracking';

const Hero = () => {
  const { isDark } = useThemeContext();
  const [isDarkTrack, setIsDarkTrack] = useState(isDark);
  const sectionRef = useSectionTracking('hero');

  useEffect(() => {
    setTimeout(() => {
      setIsDarkTrack(isDark);
    }, 500);
  }, [isDark]);

  return (
    <section 
      ref={sectionRef}
      id='home' 
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b-3 border-gray-600 ${
        isDarkTrack ? 'bg-gray-900 grid-background-dark' : 'bg-white grid-background-light'
      }`}
    >
      <div className="max-w-7xl mx-auto text-center relative z-10 pb-[15vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          } transition-colors delay-500`}>
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Nicholas Ching
            </span>
          </h1>
          
          <h2 className={`text-xl sm:text-2xl md:text-3xl mb-8 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          } transition-colors delay-500`}>
            Computer Engineering Student
          </h2>

          <p className={`text-lg max-w-2xl mx-auto mb-12 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          } transition-colors delay-500`}>
            I create impactful, solution-oriented technology with a focus on user-centered design and meaningful innovation.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            {[
              { Icon: FiGithub, href: 'https://github.com/nicholasching', label: 'GitHub' },
              { Icon: FiLinkedin, href: 'https://linkedin.com/in/n-ching', label: 'LinkedIn' },
              { Icon: FiMail, href: 'mailto:nicholasching@gmail.com', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${
                  isDarkTrack 
                    ? 'text-gray-200 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-8 py-3 rounded-full text-lg font-medium ${
                isDarkTrack
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              My Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-8 py-3 rounded-full text-lg font-medium ${
                isDarkTrack
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Explore My Projects
            </a>
          </motion.div>
        </motion.div>

        
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg
            className={`w-6 h-6 ${
              isDarkTrack ? 'text-gray-200' : 'text-gray-600'
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
    
  );
};

export default Hero; 