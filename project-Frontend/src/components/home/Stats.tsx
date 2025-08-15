import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const stats = [
  { id: 1, value: '15,000+', label: 'Locations Analyzed' },
  { id: 2, value: '500+', label: 'Optimized Sites' },
  { id: 3, value: '28+', label: 'States Covered' },
  { id: 4, value: '95%', label: 'Accuracy Rate' },
];

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-800">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-blue-100">{stat.label}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Stats;