'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useThemeContext } from '../providers/ThemeProvider';
import React from 'react'; // Import React

// Helper function to render description with bold text and links based on markdown syntax
const renderDescriptionWithBoldMetrics = (description: string) => {
  // Regex to find **bold text** or [link text](url)
  const regex = /(\*{2}(.*?)\*{2})|(\[(.*?)\]\((.*?)\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(description)) !== null) {
    // Push the text before the match
    if (match.index > lastIndex) {
      parts.push(description.substring(lastIndex, match.index));
    }

    // Check if it's a bold match (group 2) or a link match (group 4 and 5)
    if (match[2] !== undefined) {
      // Bold text
      parts.push(<strong key={lastIndex + '-bold'}>{match[2]}</strong>);
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // Link
      // Ensure URL has a protocol, default to https if missing
      let url = match[5];
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      parts.push(
        <a 
          href={url} 
          key={lastIndex + '-link'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 underline"
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Push any remaining text after the last match
  if (lastIndex < description.length) {
    parts.push(description.substring(lastIndex));
  }

  // Wrap parts in a React Fragment or return the array directly
  // Using a fragment ensures keys are handled correctly if the first/last element is text
  return React.createElement(React.Fragment, {}, ...parts);
};

// Example timeline data - you should replace this with your actual experience
const timelineData = [
  {
    date: '2025.05 - Present',
    title: 'Software Engineering Research Assistant',
    company: 'McMaster University',
    location: 'Hamilton, Canada',
    description: 'Incoming for Summer 2025 to develop VoiceEx under Dr. Bernuy.',
    skills: ['Docker'],
    image: '/experience/mcmaster.jpg', // Add your images to public/experience/
  },
  /*{
    date: '2025.04 ⋅ 2025.05',
    title: 'Software Developer Intern',
    company: 'Skildlabs',
    location: 'Toronto, Canada',
    description: 'Developed Options Strategy Builder to create complex strategies for stock profit analysis and Ledger Dashboard to view holdings and ledgers.',
    skills: ['Next.js', 'TypeScript', 'TailwindCSS'],
    image: '/experience/skildlabs.png',
  },*/
  {
    date: '2025.02 - 2025.03',
    title: 'Full Stack Developer',
    company: 'Zeitdice',
    location: 'Toronto, Canada',
    description: 'Designed a modern user interface while reducing load times by 50% through optimizing fetching algorithms and implementing image prefetching.',
    skills: ['TypeScript', 'Next.js', 'Restful APIs'],
    image: '/experience/zeitdice.jpg',
  },
  {
    date: '2023.05 - 2024.08',
    title: 'Robotics Camp Director and Planning Committee Lead',
    company: 'Markham African Carribean Canadian Association',
    location: 'Markham, Canada',
    description: 'Led FTC/EV3 robotics projects for **100+ young engineers**, designing engaging STEM activities with camp leadership and managing **30+ volunteer registrations** to streamline camp operations and inspire campers towards STEM fields',
    skills: ['Program Instruction', 'Leadership', 'Event Planning'],
    image: '/experience/macca.jpg',
  },
  {
    date: '2023.03 - 2024.06',
    title: 'Head of Business',
    company: 'Titans Robotics (FTC 19446/47)',
    location: 'Markham, Canada',
    description: `Overhauled the team's engineering portfolio and produced a provincially [award-winning promotional video](https://youtu.be/75m2UH_XGmo?si=PfCp5pyd7CbsTltk), securing **11 awards** throughout the season while integrating communications, outreach, and fundraising portfolios to unify a **15-member team**; expanding engagement from **250 to 2150 people**, increasing following by **500%**, and securing over **$10K in funding**.`,
    skills: ['Photoshop', 'Davinci Resolve', 'Canva', 'Leadership', 'Fundraising'],
    image: `/experience/titans.png`,
  },
];

const TimelineItem = ({ item, isLast }: { item: typeof timelineData[0]; isLast: boolean }) => {
  const { isDark } = useThemeContext();
  const [isDarkTrack, setIsDarkTrack] = useState(isDark);
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'center center']
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const x = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  useEffect(() => {
    setTimeout(() => {
      setIsDarkTrack(isDark);
    }, 500);
  }, [isDark]);

  return (
    <div className="mb-24 relative md:translate-x-10">
      {/* Timeline dot - Fixed position */}
      <div className="absolute left-[calc(50%)] -translate-x-2/5 -translate-y-10 md:left-0 md:translate-x-[50px] md:translate-y-0 md:pl-15 xl:pl-0 top-2 z-10">
        <motion.div 
          className={`w-4 h-4 bg-blue-500 rounded-full ring-4 ${isDark ? 'ring-gray-900' : 'ring-white'} transition-colors transition-shadow delay-500`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ 
            delay: 0.2,
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
        />
      </div>

      {/* Date - Fixed position */}
      <motion.div 
        className="absolute w-32 left-1/2 -translate-x-40 -translate-y-9.25 md:left-0 md:-translate-x-25 md:-translate-y-[-2px] md:pl-15 xl:pl-0 flex-shrink-0 text-right whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ 
          delay: 0.2,
          type: "spring", 
          stiffness: 100, 
          damping: 15 
        }}
      >
        <span className="text-sm text-blue-500 font-semibold">{item.date}</span>
      </motion.div>

      {/* Content */}
      <div className="flex items-start gap-6 md:ml-32 md:pl-5 md:pr-10 md:w-[calc(100%-8rem)] xl:pl-0 xl:pr-0">
        {/* Content card - Slides in */}
        <motion.div
          ref={itemRef}
          // Assuming 'x' (slide distance) is defined above using useTransform:
          // const x = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
          style={{
            opacity, // Keep opacity driven by Framer Motion
            // Pass the motion value to a CSS variable, converting number to px string
            // We reuse the existing 'x' motion value for the distance.
            // @ts-ignore Ignore TS error for CSS variable type
            '--slide-distance': useTransform(x, value => `${value}px`)
          }}
          // Apply transform using Tailwind classes and the CSS variable:
          // Default (< xl): slide up from bottom (translate Y)
          // On xl screens: reset Y, slide in from right (translate X)
          className="flex-1 mt-8 md:mt-0 md:pl-8 transform translate-y-[var(--slide-distance)] md:translate-y-0 md:translate-x-[var(--slide-distance)] transition-transform duration-500 ease-in-out"
        >
          {/* Card content remains the same */}
          <div className={`rounded-lg border-1 overflow-hidden ${
              isDarkTrack ? 'bg-gray-800 shadow-md shadow-gray-700 border-gray-700' : 'bg-white shadow-lg shadow-gray-300 border-black'
            }`}>
            {item.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={`${item.company} office or product`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} transition-colors delay-500`}>{item.title}</h3>
                  <h4 className={`text-md ${isDark ? 'text-gray-300' : 'text-gray-600'} transition-colors delay-500`}>{item.company}</h4>
                </div>
                <span className={`text-sm text-right ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors delay-500`}>{item.location}</span>
              </div>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors delay-500`}>
                {renderDescriptionWithBoldMetrics(item.description)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    } transition-colors delay-500`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const { isDark } = useThemeContext();
  const [isDarkTrack, setIsDarkTrack] = useState(isDark);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    setTimeout(() => {
      setIsDarkTrack(isDark);
    }, 500);
  }, [isDark]);

  // Add spring animation for smoother line drawing
  const rawProgress = scrollYProgress; // Get the raw progress from the useScroll above

  // Use useTransform to map the raw progress [0, 1] to an expanded range,
  // for example, [-0.2, 1.2]. This effectively "offsets" the animation
  // range, making the line start drawing slightly before the element
  // enters the viewport and finish slightly after it leaves, relative
  // to the useScroll offset.
  const adjustedProgress = useTransform(rawProgress, [0, 0.85, 0.9], [0, 0.85, 1]);

  const smoothProgress = useSpring(adjustedProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <section 
      id="experience" 
      className={`py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden border-b-3 border-gray-600 ${
        isDarkTrack ? 'bg-gray-900 grid-background-dark' : 'bg-white grid-background-light'
      }`}
    >
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors delay-500`}>
            My Experience
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}  transition-colors delay-500 max-w-2xl mx-auto`}>
            Here's my professional journey and the skills I've developed along the way.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Timeline line container */}
          <div className={`absolute left-1/2 -translate-y-10 md:left-[calc(32px+1.5rem)] md:translate-x-25 md:translate-y-0 xl:translate-x-10 top-2 bottom-0 w-0.75 md:w-1`}>
            {/* Background line */}
            {/* <div className={`h-full rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} transition-colors delay-500`} /> */}
            {/* Animated line overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 via-[80%] to-transparent origin-top"
              style={{
                scaleY: smoothProgress
              }}
              initial={{ scaleY: 0 }}
              transition={{ ease: "easeInOut" }}
            />
          </div>

          {/* Timeline items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={item.date + item.company} 
                item={item} 
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;