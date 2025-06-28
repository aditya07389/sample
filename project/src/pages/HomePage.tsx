import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CallToAction />
    </motion.div>
  );
};

export default HomePage;