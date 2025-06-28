import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { TeamMember } from '../../types';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    description: 'Solar energy enthusiast with 15+ years of experience in renewable energy projects across India.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Chief Data Scientist',
    description: 'Leading our data analytics team to provide accurate insights for solar site selection.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Head of Engineering',
    description: 'Expert in GIS mapping and solar radiation modeling for optimal site selection.',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 4,
    name: 'Aisha Patel',
    role: 'Sustainability Director',
    description: 'Environmental scientist ensuring our recommendations align with ecological sustainability.',
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