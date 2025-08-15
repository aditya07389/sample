import React from 'react';
import { MapPin, SunDim, Wind, TrendingUp, DatabaseIcon, MapIcon } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { Feature } from '../../types';

const features: Feature[] = [
  {
    id: 1,
    title: 'Solar Radiation Analysis',
    description: 'We analyze historical solar radiation data to identify areas with maximum energy potential throughout the year.',
    icon: 'SunDim'
  },
  {
    id: 2,
    title: 'Land Availability Mapping',
    description: 'Our platform identifies suitable land parcels considering factors like size, slope, and proximity to infrastructure.',
    icon: 'MapPin'
  },
  {
    id: 3,
    title: 'Weather Pattern Prediction',
    description: 'We incorporate historical weather patterns to predict future solar energy output with higher accuracy.',
    icon: 'Wind'
  },
  {
    id: 4,
    title: 'ROI Calculation',
    description: 'Estimate the return on investment for different locations based on energy output and infrastructure costs.',
    icon: 'TrendingUp'
  },
  {
    id: 5,
    title: 'Comprehensive Data Collection',
    description: 'We collect and analyze a wide range of data points to provide you with the most accurate recommendations.',
    icon: 'DatabaseIcon'
  },
  {
    id: 6,
    title: 'Interactive Maps',
    description: 'Explore potential locations through our interactive maps with detailed information on each site.',
    icon: 'MapIcon'
  }
];

const getIcon = (iconName: string, size = 24) => {
  switch (iconName) {
    case 'SunDim':
      return <SunDim size={size} />;
    case 'MapPin':
      return <MapPin size={size} />;
    case 'Wind':
      return <Wind size={size} />;
    case 'TrendingUp':
      return <TrendingUp size={size} />;
    case 'DatabaseIcon':
      return <DatabaseIcon size={size} />;
    case 'MapIcon':
      return <MapIcon size={size} />;
    default:
      return <SunDim size={size} />;
  }
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Turn Sunshine Into <span className="text-blue-600 dark:text-blue-400">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform combines advanced data analytics with geographical mapping to identify the most suitable locations for solar energy plants.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.id} delay={index * 0.1}>
              <div className="p-6 bg-blue-50 dark:bg-gray-800 rounded-lg h-full">
                <div className="w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;