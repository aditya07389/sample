import React from 'react';
import { Sun, Leaf, BarChart3 } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { motion } from 'framer-motion';

const MissionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="inline-block px-4 py-1 mb-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Let Data Illuminate Your <span className="text-blue-600 dark:text-blue-400">Decisions</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                At SolarSite, our mission is to accelerate India's transition to renewable energy by providing data-driven insights for optimal solar energy site selection. We combine cutting-edge data analytics with deep domain expertise to help organizations make informed decisions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                    <Sun size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Renewable Focus</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      We're committed to enhancing solar energy adoption across India by removing guesswork from site selection.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <Leaf size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sustainability</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      We balance energy potential with environmental impact to recommend truly sustainable solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400">
                    <BarChart3 size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data-Driven</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Our recommendations are backed by comprehensive data analysis and scientific methodologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto max-w-md"
              >
                {/* Mission Illustration */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full"
                  aria-label="Illustration of our mission and solar energy analysis"
                >
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="400" rx="20" fill="#f0f9ff" className="dark:fill-gray-800" />
                  
                  {/* Sun */}
                  <motion.circle 
                    cx="300" 
                    cy="100" 
                    r="40" 
                    fill="#FBBF24"
                    animate={{ 
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Sun rays */}
                  {[...Array(8)].map((_, i) => (
                    <motion.line 
                      key={i}
                      x1="300" 
                      y1="100" 
                      x2={300 + 60 * Math.cos(i * Math.PI/4)} 
                      y2={100 + 60 * Math.sin(i * Math.PI/4)} 
                      stroke="#FBBF24"
                      strokeWidth="4"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  
                  {/* India map outline (simplified) */}
                  <path 
                    d="M180,140 C200,130 230,150 240,130 C250,110 270,100 290,110 C310,120 320,150 310,170 C300,190 280,200 270,220 C260,240 250,270 230,280 C210,290 190,280 170,270 C150,260 140,240 150,220 C160,200 170,180 180,160 Z" 
                    fill="#3B82F6" 
                    fillOpacity="0.2"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="dark:fill-blue-800/30 dark:stroke-blue-600"
                  />
                  
                  {/* Solar Panels */}
                  <g transform="translate(120, 200)">
                    <motion.g
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      <rect x="0" y="0" width="50" height="30" fill="#3B82F6" className="dark:fill-blue-700" />
                      <line x1="25" y1="0" x2="25" y2="30" stroke="#1E3A8A" strokeWidth="1" className="dark:stroke-blue-300" />
                      <line x1="0" y1="15" x2="50" y2="15" stroke="#1E3A8A" strokeWidth="1" className="dark:stroke-blue-300" />
                      <rect x="20" y="30" width="10" height="20" fill="#374151" />
                    </motion.g>
                  </g>
                  
                  <g transform="translate(220, 180)">
                    <motion.g
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      <rect x="0" y="0" width="50" height="30" fill="#3B82F6" className="dark:fill-blue-700" />
                      <line x1="25" y1="0" x2="25" y2="30" stroke="#1E3A8A" strokeWidth="1" className="dark:stroke-blue-300" />
                      <line x1="0" y1="15" x2="50" y2="15" stroke="#1E3A8A" strokeWidth="1" className="dark:stroke-blue-300" />
                      <rect x="20" y="30" width="10" height="20" fill="#374151" />
                    </motion.g>
                  </g>
                  
                  {/* Data Points */}
                  {[
                    [150, 170], [190, 150], [230, 160], [270, 190], [250, 230], [210, 210], [180, 240]
                  ].map((point, i) => (
                    <motion.circle 
                      key={i}
                      cx={point[0]} 
                      cy={point[1]} 
                      r="6" 
                      fill="#ef4444"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      className="dark:fill-red-500"
                    />
                  ))}
                  
                  {/* Stick Figure Analysts */}
                  <g transform="translate(80, 320)">
                    {/* Head */}
                    <circle cx="0" cy="0" r="10" fill="#000000" />
                    {/* Body */}
                    <line x1="0" y1="10" x2="0" y2="35" stroke="#000000" strokeWidth="2" />
                    {/* Arms */}
                    <motion.line 
                      x1="0" y1="20" 
                      x2="-15" y2="15" 
                      stroke="#000000" 
                      strokeWidth="2"
                      animate={{ x2: [-15, -20, -15] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.line 
                      x1="0" y1="20" 
                      x2="15" y2="25" 
                      stroke="#000000" 
                      strokeWidth="2"
                      animate={{ y2: [25, 20, 25] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Legs */}
                    <line x1="0" y1="35" x2="-10" y2="55" stroke="#000000" strokeWidth="2" />
                    <line x1="0" y1="35" x2="10" y2="55" stroke="#000000" strokeWidth="2" />
                  </g>
                  
                  <g transform="translate(320, 330)">
                    {/* Head */}
                    <circle cx="0" cy="0" r="10" fill="#000000" />
                    {/* Body */}
                    <line x1="0" y1="10" x2="0" y2="35" stroke="#000000" strokeWidth="2" />
                    {/* Arms */}
                    <motion.line 
                      x1="0" y1="20" 
                      x2="-20" y2="20" 
                      stroke="#000000" 
                      strokeWidth="2"
                      animate={{ x2: [-20, -15, -20] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <line x1="0" y1="20" x2="15" y2="15" stroke="#000000" strokeWidth="2" />
                    {/* Legs */}
                    <motion.line 
                      x1="0" y1="35" 
                      x2="-10" y2="55" 
                      stroke="#000000" 
                      strokeWidth="2"
                      animate={{ x2: [-10, -5, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.line 
                      x1="0" y1="35" 
                      x2="10" y2="55" 
                      stroke="#000000" 
                      strokeWidth="2"
                      animate={{ x2: [10, 5, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </g>
                </svg>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;