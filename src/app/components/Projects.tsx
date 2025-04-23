'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useThemeContext } from '../providers/ThemeProvider';

// Project data based on your GitHub and old website
const projects = [
  {
    title: 'Personal Website',
    description: 'A modern, responsive personal portfolio website built with Next.js and TailwindCSS. Features smooth animations, dark mode support, and a clean design.',
    image: '/projects/website.png', // You'll need to add these images
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/nicholasching/Personal-Website',
    demo: 'https://www.nicholasching.ca',
    featured: true
  },
  {
    title: 'Cursor',
    description: 'An AI-powered code editor that helps developers write better code faster. Built with Electron and React.',
    image: '/projects/cursor.png',
    tags: ['React', 'TypeScript', 'Electron', 'AI'],
    github: 'https://github.com/getcursor/cursor',
    demo: 'https://cursor.sh',
    featured: true
  },
  {
    title: 'Vercel AI SDK',
    description: 'The official Vercel AI SDK for building AI-powered user interfaces. Contributed to streaming functionality and documentation.',
    image: '/projects/vercel-ai.png',
    tags: ['TypeScript', 'React', 'AI', 'SDK'],
    github: 'https://github.com/vercel/ai',
    demo: 'https://sdk.vercel.ai',
    featured: true
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const { isDark } = useThemeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } transition-colors delay-500`}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity" />
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300`}
        />
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
        <div className="flex flex-wrap gap-2">
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
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { isDark } = useThemeContext();
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags)));

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
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all delay-500 ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all delay-500 ${
                  filter === tag
                    ? 'bg-blue-500 text-white'
                    : isDark 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
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