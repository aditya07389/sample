import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

const testimonials = [
  {
    id: 1,
    content: "SolarSite helped us identify the perfect location for our 5MW solar plant. The data-driven approach saved us months of research.",
    author: "Raj Patel",
    position: "Director, GreenEnergy Ltd",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    content: "The ROI predictions were spot on. Our solar farm is performing exactly as the platform predicted, which has been crucial for our investors.",
    author: "Priya Singh",
    position: "CEO, SunPower Solutions",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    content: "As a government agency, we needed comprehensive data across multiple states. SolarSite delivered beyond our expectations.",
    author: "Aditya Sharma",
    position: "Project Lead, MNRE",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our <span className="text-blue-600 dark:text-blue-400">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from organizations that have successfully implemented solar energy projects using our platform.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.1}>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex-grow">
                  <svg className="w-8 h-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.content}</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;