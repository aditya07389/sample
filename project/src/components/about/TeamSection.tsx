import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { TeamMember } from '../../types';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'K R Aditya Shastry',
    role: 'Web Developer',
    description: 'Designed and developed both the front-end and back-end components of the application, ensuring seamless integration between the user interface and server-side functionality.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'K R Shrivathsan',
    role: 'ML Model Developer',
    description: 'Developed a deep learning model from scratch, including data preprocessing, model architecture design, training, and evaluation. Additionally, created an intuitive user interface to facilitate smooth input of data and clear visualization of model outputs, ensuring an end-to-end functional pipeline.',
    image: 'PHOTO-2025-06-29-15-21-07.jpg'
  },
  {
    id: 3,
    name: 'Karthik B',
    role: 'Solar Energy GIS Specialist',
    description: 'Expert in GIS mapping and solar radiation modeling for optimal site selection.',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 4,
    name: 'Kartik J H',
    role: 'Solar Data Analyst',
    description: 'Data analytics to provide accurate insights for solar site selection and the features needed for it.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Meet Our <span className="text-blue-600 dark:text-blue-400">Team</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our diverse team of experts combines knowledge in renewable energy, data science, and sustainability.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.id} delay={index * 0.1}>
              <motion.div 
                className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                      <Twitter size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                      <Linkedin size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                      <Mail size={18} />
                    </a>
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

export default TeamSection;
