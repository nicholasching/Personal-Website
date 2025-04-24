'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useThemeContext } from '../providers/ThemeProvider';

// Example timeline data - you should replace this with your actual experience
const timelineData = [
  {
    date: '2023 - Present',
    title: 'Software Engineer',
    company: 'Bloomberg LP',
    location: 'New York',
    description: 'Developed WYSIWYG editor enabling designers to create and deploy custom paywalls to Bloomberg.com without code, reducing engineering overhead by 80% and eliminating 5+ feedback cycles between teams.',
    skills: ['React', 'TypeScript', 'Node.js'],
    image: '/experience/bloomberg.png', // Add your images to public/experience/
  },
  {
    date: '2023 - Present',
    title: 'Frontend Developer',
    company: 'WatStreet',
    location: 'Waterloo',
    description: 'Developed Options Strategy Builder to create complex strategies for stock profit analysis and Ledger Dashboard to view holdings and ledgers.',
    skills: ['Next.js', 'TypeScript', 'TailwindCSS'],
    image: '/experience/watstreet.png',
  },
  {
    date: '2022 - 2023',
    title: 'Software Engineer',
    company: 'Vercel AI',
    location: 'Toronto',
    description: 'Building at the intersection of design engineering and AI.',
    skills: ['React', 'Python', 'Machine Learning'],
    image: '/experience/vercel.png',
  },
];

const TimelineItem = ({ item, isLast }: { item: typeof timelineData[0]; isLast: boolean }) => {
  const { isDark } = useThemeContext();
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'center center']
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const x = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

  return (
    <div className="mb-24 relative">
      {/* Timeline dot - Fixed position */}
      <div className="absolute left-[calc(50%)] -translate-x-2/5 -translate-y-10 xl:left-0 xl:translate-x-[50px] xl:translate-y-0 top-2 z-10">
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
        className="absolute w-32 left-1/2 -translate-x-40 -translate-y-9.25 xl:left-0 xl:-translate-x-25 xl:-translate-y-[-2px] flex-shrink-0 text-right"
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
      <div className="flex items-start gap-6 xl:ml-32">
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
          className="flex-1 mt-8 xl:mt-0 xl:pl-8 transform translate-y-[var(--slide-distance)] xl:translate-y-0 xl:translate-x-[var(--slide-distance)]"
        >
          {/* Card content remains the same */}
          <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors delay-500`}>
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
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-colors delay-500`}>{item.location}</span>
              </div>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors delay-500`}>{item.description}</p>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Add spring animation for smoother line drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <section id="experience" className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors delay-500`}>
      <div className="max-w-5xl mx-auto">
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
          <div className={`absolute left-1/2 -translate-y-10 xl:left-[calc(32px+1.5rem)] xl:translate-x-0 xl:translate-y-0 top-2 bottom-0 w-0.75`}>
            {/* Background line */}
            {/* <div className={`h-full rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} transition-colors delay-500`} /> */}
            {/* Animated line overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
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