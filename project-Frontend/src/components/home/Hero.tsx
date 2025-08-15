import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-yellow-300 dark:bg-yellow-600 opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-600 opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 pt-16">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-block px-4 py-1 mb-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                Solar Energy Site Suitability Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Power the Future,{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  One Ray at a Time
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Find optimal locations for solar energy plants across India with our data-driven platform that analyzes solar radiation, land availability, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={<SunIcon size={20} />}
                >
                  <Link to="/locations">Explore Locations</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  icon={<ArrowRight size={20} />}
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Solar Panel Animation */}
              <div className="aspect-video bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 flex items-center justify-center">
                <SolarAnimation />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Solar Animation Component
const SolarAnimation: React.FC = () => {
  return (
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-full max-w-md mx-auto"
      aria-label="Animated illustration of solar panels tracking the sun"
    >
      {/* Sky */}
      <rect x="0" y="0" width="400" height="200" fill="#c5e8ff" className="dark:fill-gray-700" />
      
      {/* Sun */}
      <motion.circle 
        cx="320" 
        cy="70" 
        r="30" 
        fill="#FBBF24"
        animate={{ 
          cx: [320, 270, 220, 170, 120, 70], 
          cy: [70, 50, 40, 50, 70, 100] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse"
        }}
      />
      
      {/* Ground */}
      <rect x="0" y="200" width="400" height="100" fill="#9dc183" className="dark:fill-gray-800" />
      
      {/* Solar Panel Frame */}
      <motion.g
        animate={{ 
          rotate: [-10, 0, 10, 20, 30, 40],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse"
        }}
        style={{ transformOrigin: '200px 240px' }}
      >
        {/* Stand */}
        <rect x="195" y="240" width="10" height="40" fill="#666" />
        
        {/* Panel Base */}
        <rect x="150" y="230" width="100" height="10" fill="#444" />
        
        {/* Solar Panels */}
        <rect x="155" y="180" width="90" height="50" fill="#3B82F6" className="dark:fill-blue-700" />
        <line x1="185" y1="180" x2="185" y2="230" stroke="#444" strokeWidth="1" />
        <line x1="215" y1="180" x2="215" y2="230" stroke="#444" strokeWidth="1" />
        <line x1="155" y1="195" x2="245" y2="195" stroke="#444" strokeWidth="1" />
        <line x1="155" y1="215" x2="245" y2="215" stroke="#444" strokeWidth="1" />
      </motion.g>
      
      {/* Stick Figure */}
      <g>
        <motion.g 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Head */}
          <circle cx="100" cy="180" r="10" fill="#000" />
          
          {/* Body */}
          <line x1="100" y1="190" x2="100" y2="220" stroke="#000" strokeWidth="2" />
          
          {/* Arms */}
          <motion.line 
            x1="100" y1="200" 
            x2="80" y2="210" 
            stroke="#000" 
            strokeWidth="2"
            animate={{ x2: [80, 75, 80] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line 
            x1="100" y1="200" 
            x2="120" y2="205" 
            stroke="#000" 
            strokeWidth="2"
            animate={{ x2: [120, 125, 120] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
          
          {/* Legs */}
          <line x1="100" y1="220" x2="90" y2="250" stroke="#000" strokeWidth="2" />
          <line x1="100" y1="220" x2="110" y2="250" stroke="#000" strokeWidth="2" />
        </motion.g>
      </g>
    </svg>
  );
};

export default Hero;