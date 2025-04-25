'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaJava, FaBrain, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiPython, SiOpencv, SiFlask, SiArduino, SiCplusplus, SiHtml5, SiCss3, SiJavascript, SiSpring } from 'react-icons/si';
import { useThemeContext } from '../providers/ThemeProvider';

// Project data based on your GitHub and old website
const projects = [
  {
    title: 'MakeTheCut',
    description: 'A modern, responsive personal portfolio website built with Next.js and TailwindCSS. Features smooth animations, dark mode support, and a clean design.',
    image: '/projects/makethecutvid.mp4',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/nicholasching/Personal-Website',
    demo: 'https://www.nicholasching.ca',
    metrics: [
      {
        type: 'users',
        title: 'Active Users',
        value: '250+',
        icon: '👥'
      }
    ],
    featured: true
  },
  {
    title: 'Perception',
    description: 'An AI-powered code editor that helps developers write better code faster. Built with Electron and React.',
    image: '/projects/perceptionvid.mp4',
    tags: ['React', 'TypeScript', 'Electron', 'AI'],
    github: 'https://github.com/getcursor/cursor',
    demo: 'https://cursor.sh',
    metrics: [
      {
        type: 'award',
        title: 'Product of the Year',
        value: 'Developer Tools Awards',
        icon: '🏆'
      },
      {
        type: 'users',
        title: 'Active Users',
        value: '1M+',
        icon: '👥'
      },
      {
        type: 'downloads',
        title: 'Downloads',
        value: '5M+',
        icon: '📥'
      }
    ],
    featured: true
  },
  {
    title: 'MedID',
    description: 'An AI-powered system enabling first responders to rapidly identify patients and access critical medical history during emergencies, streamlining urgent care.',
    image: '/projects/medidvid.mp4',
    tags: ['Python', 'HTML/CSS/JS', 'Flask', 'AI'],
    github: 'https://github.com/nicholasching/MedID',
    demo: 'https://devpost.com/software/medid-a-faster-way-to-retrieve-critical-information',
    metrics: [
      {
        type: 'award',
        value: 'DeltaHacks 2025',
        icon: '🛠️'
      },
    ],
    featured: true
  },
  {
    title: 'Scam-Mah',
    description: `A tool to detect and respond to potential phone scams by delivering automated, humorous replies to waste scammers' time and protect vulnerable users.`,
    image: '/projects/scammah.png',
    tags: ['Python', 'HTML/CSS/JS', 'Flask', 'AI'],
    github: 'https://github.com/nicholasching/Scam-Mah',
    demo: 'https://devpost.com/software/scam-mah',
    metrics: [
      {
        type: 'award',
        title: '3rd Place Overall',
        value: 'NewHacks 2024',
        icon: '🏆'
      },
    ],
    featured: true
  },
  {
    title: 'Hydrology',
    description: 'An Arduino-powered automatic garden watering device driven by soil moisture and weather forecasting API data.',
    image: '/projects/hydrology.jpg',
    tags: ['C++', 'Arduino', 'API'],
    demo: 'https://projectboard.world/ysc/project/hydrology-the-smarter-way-of-plant-irrigation',
    metrics: [
      {
        type: 'award',
        title: 'Silver Overall + 3 Category Awards',
        value: 'YRSTF 2024',
        icon: '🏆'
      },
    ],
    featured: true
  },
  {
    title: 'LAN Pictionary',
    description: 'A recreation of Pictionary featuring local server discovery, custom themes, real time updates, live chat, and an aesthetic GUI.',
    image: '/projects/lanpictionary.png',
    tags: ['Java', 'Swing', 'Multicast'],
    github: 'https://github.com/nicholasching/LAN-Pictionary',
    metrics: [
      {
        type: 'award',
        title: 'Highest Score within the Cohort',
        value: 'ICS4U',
        icon: '🏆'
      },
    ],
    featured: true
  }
];

// Add icon mapping for tags
const tagIcons: Record<string, React.ReactNode> = {
  'Next.js': <SiNextdotjs className="w-4 h-4" />,
  'TypeScript': <SiTypescript className="w-4 h-4" />,
  'React': <FaReact className="w-4 h-4" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4" />,
  'Framer Motion': <SiFramer className="w-4 h-4" />,
  'Python': <SiPython className="w-4 h-4" />,
  'OpenCV': <SiOpencv className="w-4 h-4" />,
  'Flask': <SiFlask className="w-4 h-4" />,
  'Machine Learning': <SiPython className="w-4 h-4" />,
  'HTML/CSS/JS': <><SiHtml5 className="w-4 h-4" /><SiCss3 className="w-4 h-4" /><SiJavascript className="w-4 h-4" /></>,
  'AI': <FaBrain className="w-4 h-4" />,
  'C++': <SiCplusplus className="w-4 h-4" />,
  'Arduino': <SiArduino className="w-4 h-4" />,
  'API': <SiPython className="w-4 h-4" />,
  'Circuit Design': <SiArduino className="w-4 h-4" />,
  'Java': <FaJava className="w-4 h-4" />,
  'Swing': <SiSpring className="w-4 h-4" />,
  'Multicast': <SiSpring className="w-4 h-4" />,
  'Networking': <SiSpring className="w-4 h-4" />
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const { isDark } = useThemeContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } transition-colors delay-500`}
    >
      {/* Project Media */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity z-10" />
        {project.image.endsWith('.mp4') ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={project.image} type="video/mp4" />
          </video>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          } transition-colors delay-500`}>{project.title}</h3>
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors delay-500`}
                aria-label={`View ${project.title} source code`}
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
                } transition-colors delay-500`}
                aria-label={`View ${project.title} demo`}
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <p className={`${
          isDark ? 'text-gray-300' : 'text-gray-600'
        } mb-4 transition-colors delay-500`}>{project.description}</p>

        {/* Skills/Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                isDark 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-100 text-gray-700'
              } transition-colors delay-500`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.metrics.map((metric, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full text-xs ${
                  isDark 
                    ? 'bg-gray-700/30 text-gray-300' 
                    : 'bg-gray-100/80 text-gray-600'
                } transition-colors delay-500`}
              >
                <span className="text-sm">{metric.icon}</span>
                <div className="flex flex-wrap items-center min-w-0 gap-x-1">
                  <span className="font-medium whitespace-nowrap">{metric.value}</span>
                  {'title' in metric && (
                    <span className="opacity-75 overflow-hidden text-ellipsis">{metric.title}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { isDark } = useThemeContext();
  const [filter, setFilter] = useState<string>('all');
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Calculate tag popularity
  const tagCounts = projects.reduce((acc, project) => {
    project.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort tags by popularity and get top 5
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);

  const topTags = sortedTags.slice(0, 5);
  const otherTags = sortedTags.slice(5);
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } transition-colors delay-500`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          } transition-colors delay-500`}>
            Featured Projects
          </h2>
          <p className={`${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto mb-12 transition-colors delay-500`}>
            Here are some of my recent projects that showcase my skills and experience.
          </p>

          {/* Filter Tags */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors delay-500 hover:delay-0 ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : isDark 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors delay-500 hover:delay-0 ${
                    filter === tag
                      ? 'bg-blue-500 text-white'
                      : isDark 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tagIcons[tag]}
                    <span>{tag}</span>
                  </div>
                </button>
              ))}
              {otherTags.length > 0 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all delay-500 duration-300 ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                      : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                  }`}
                >
                  {showAllTags ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Additional Tags with Animation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: showAllTags ? 1 : 0,
                y: showAllTags ? 0 : -10,
                height: showAllTags ? 'auto' : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2">
                {otherTags.map((tag) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ 
                      opacity: showAllTags ? 1 : 0,
                      y: showAllTags ? 0 : 25
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    onClick={() => setFilter(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors delay-500 hover:delay-0 ${
                      filter === tag
                        ? 'bg-blue-500 text-white'
                        : isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tagIcons[tag]}
                      <span>{tag}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 