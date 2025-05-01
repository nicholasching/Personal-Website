'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaJava, FaReact, FaNetworkWired } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiPython, SiOpencv, SiFlask, SiArduino, SiCplusplus, SiHtml5, SiCss3, SiJavascript, SiSpring, SiGooglegemini, SiAppwrite, SiExpo } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { useThemeContext } from '../providers/ThemeProvider';

// Project data based on your GitHub and old website
const projects = [
  {
    title: 'MakeTheCut',
    description: 'Full-stack web platform crowdsourcing first-year engineering student grades and stream preferences to predict specialization cutoffs.',
    image: '/projects/makethecutvid.mp4',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Appwrite'],
    demo: 'https://www.makethecut.ca/',
    metrics: [
      {
        type: 'views',
        title: 'Visits',
        value: '15K+',
        icon: '👁️'
      },
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
    description: 'Assistive mobile app created to empower visually impaired users; automatically converts camera images into spoken descriptions with intuitive voice command activation and prompting.',
    image: '/projects/perceptionvid.mp4',
    tags: ['React Native', 'TypeScript', 'Expo', 'Gemini AI SDK'],
    github: 'https://github.com/nicholasching/Perception',
    metrics: [
      {
        type: 'award',
        title: 'of 1000+ Engineering Students',
        value: `Top 6 Finalist`,
        icon: '🏆'
      },
    ],
    featured: true
  },
  {
    title: 'MedID',
    description: 'Vision-based system enabling first responders to rapidly identify patients and access critical medical history during emergencies, streamlining urgent care.',
    image: '/projects/medidvid.mp4',
    tags: ['Python', 'OpenCV', 'HTML/CSS/JS', 'Flask', 'Gemini AI SDK'],
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
    description: `Tool to detect and respond to potential phone scams by delivering automated, humorous replies to waste scammers' time and protect vulnerable users.`,
    image: '/projects/scammah.png',
    tags: ['Python', 'HTML/CSS/JS', 'Flask', 'Gemini AI SDK'],
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
    description: 'Arduino-powered automatic garden watering device driven by soil moisture and weather forecasting API data.',
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
    description: 'Recreation of Pictionary featuring local server discovery, custom themes, real time updates, live chat, and an aesthetic GUI.',
    image: '/projects/pictionary.png',
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
  'Appwrite': <SiAppwrite className="w-4 h-4" />,
  'Next.js': <SiNextdotjs className="w-4 h-4" />,
  'TypeScript': <SiTypescript className="w-4 h-4" />,
  'React': <FaReact className="w-4 h-4" />,
  'React Native': <FaReact className="w-4 h-4" />,
  'Expo': <SiExpo className="w-4 h-4" />,
  'Tailwind CSS': <SiTailwindcss className="w-4 h-4" />,
  'Framer Motion': <SiFramer className="w-4 h-4" />,
  'Python': <SiPython className="w-4 h-4" />,
  'OpenCV': <SiOpencv className="w-4 h-4" />,
  'Flask': <SiFlask className="w-4 h-4" />,
  'Machine Learning': <SiPython className="w-4 h-4" />,
  'HTML/CSS/JS': <><SiHtml5 className="w-4 h-4" /><SiCss3 className="w-4 h-4" /><SiJavascript className="w-4 h-4" /></>,
  'Gemini AI SDK': <SiGooglegemini className="w-4 h-4" />,
  'C++': <SiCplusplus className="w-4 h-4" />,
  'Arduino': <SiArduino className="w-4 h-4" />,
  'API': <TbApi className="w-4 h-4" />,
  'Circuit Design': <SiArduino className="w-4 h-4" />,
  'Java': <FaJava className="w-4 h-4" />,
  'Swing': <FaJava className="w-4 h-4" />,
  'Multicast': <FaNetworkWired className="w-4 h-4" />,
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const { isDark } = useThemeContext();
  const [isDarkTrack, setIsDarkTrack] = useState(isDark);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDarkTrack(isDark);
    }, 500);
  }, [isDark]);

  // Handle video autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVideoVisible(entry.isIntersecting);
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

  // Handle video playback based on visibility and hover
  useEffect(() => {
    if (!videoRef.current) return;

    if (isVideoVisible || isMediaHovered) {
      videoRef.current.play().catch(() => {
        // Handle any autoplay restrictions gracefully
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVideoVisible, isMediaHovered]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden border-1 ${
        isDarkTrack ? 'bg-gray-800 shadow-md shadow-gray-700 border-gray-700' : 'bg-white shadow-lg shadow-gray-300 border-black'
      }`}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsMediaHovered(false);
        setMousePosition({ x: 50, y: 50 });
      }}
    >
      {/* Animated border */}
      {isCardHovered && (
        <>
          <div className="absolute inset-0 z-20 rounded-xl pointer-events-none">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              {/* Top line */}
              <div className="absolute -left-full top-0 h-[3px] w-[200%] bg-gradient-to-r from-transparent via-blue-400/90 to-transparent animate-[shimmer_1.5s_linear_infinite] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              {/* Right line */}
              <div className="absolute -top-full right-0 h-[200%] w-[3px] bg-gradient-to-b from-transparent via-blue-400/90 to-transparent animate-[shimmer_1.5s_linear_infinite_375ms] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              {/* Bottom line */}
              <div className="absolute -right-full bottom-0 h-[3px] w-[200%] bg-gradient-to-l from-transparent via-blue-400/90 to-transparent animate-[shimmer_1.5s_linear_infinite_750ms] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              {/* Left line */}
              <div className="absolute -bottom-full left-0 h-[200%] w-[3px] bg-gradient-to-t from-transparent via-blue-400/90 to-transparent animate-[shimmer_1.5s_linear_infinite_1125ms] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </div>
          {/* Additional glow effect - only for images */}
          {(!project.image.endsWith('.mp4') && (isMediaHovered || isCardHovered)) && (
            <div className="absolute inset-0 z-10 rounded-xl opacity-15 bg-gradient-to-br from-blue-500/0 via-blue-500/40 to-blue-500/0 animate-pulse" />
          )}
        </>
      )}

      {/* Project Media */}
      <div 
        className={`relative overflow-hidden transition-all duration-300 ease-in-out ${project.image.endsWith('.mp4') && isMediaHovered ? 'h-full absolute inset-0' : 'h-48'}`}
        onMouseEnter={(e) => {
          setIsMediaHovered(true);
          setIsCardHovered(true);
        }}
        onMouseLeave={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const isLeavingCard = 
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom + 50;

          setIsMediaHovered(false);
          if (isLeavingCard) {
            setIsCardHovered(false);
          }
          setMousePosition({ x: 50, y: 50 });
        }}
        onMouseMove={(e) => {
          if (!containerRef.current) return;
          
          const rect = containerRef.current.getBoundingClientRect();
          const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
          const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
          
          setMousePosition({ x, y });
        }}
      >
        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-0 transition-opacity z-10" />
        {project.image.endsWith('.mp4') ? (
          <div className="relative w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              className="absolute w-full h-full"
              style={{
                objectFit: 'cover',
                objectPosition: isMediaHovered ? `${mousePosition.x}% ${mousePosition.y}%` : '50% 50%'
              }}
              loop
              muted={!isMediaHovered} // Unmute when hovered
              playsInline
              preload="metadata"
            >
              <source src={project.image} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover object-center transition-transform duration-300 ease-in-out ${
              isCardHovered || isMediaHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        )}
      </div>

      {/* Project Info */}
      <div className={`relative z-20 transition-opacity duration-300 ${project.image.endsWith('.mp4') && isMediaHovered ? 'opacity-0' : 'opacity-100'}`}>
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
      </div>
    </motion.div>
  );
};

// Update the shimmer animation
const shimmerAnimation = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  25% {
    opacity: 0.9;
  }
  75% {
    opacity: 0.9;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
`;

// Add the style tag to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerAnimation;
  document.head.appendChild(style);
}

const Projects = () => {
  const { isDark } = useThemeContext();
  const [isDarkTrack, setIsDarkTrack] = useState(isDark);
  const [filter, setFilter] = useState<string>('all');
  const [showAllTags, setShowAllTags] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsDarkTrack(isDark);
    }, 500);
  }, [isDark]);

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
    <section 
      id="projects" 
      className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDarkTrack ? 'bg-gray-900 grid-background-dark' : 'bg-white grid-background-light'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ease-in-out ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : isDarkTrack 
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ease-in-out ${
                    filter === tag
                      ? 'bg-blue-500 text-white'
                      : isDarkTrack 
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ease-in-out ${
                    isDarkTrack 
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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-250 ease-in-out ${
                      filter === tag
                        ? 'bg-blue-500 text-white'
                        : isDarkTrack 
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