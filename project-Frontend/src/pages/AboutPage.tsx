import React from 'react';
import { motion } from 'framer-motion';
import MissionSection from '../components/about/MissionSection';
import TeamSection from '../components/about/TeamSection';
import AnimatedSection from '../components/common/AnimatedSection';

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About SolarSite
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're on a mission to accelerate the adoption of solar energy across India through data-driven site selection.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <MissionSection />

      {/* Journey Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our <span className="text-blue-600 dark:text-blue-400">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From a small research project to a comprehensive platform helping organizations across India.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                      Apr
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ideation & Dataset Gathering</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      The project began as a collaborative initiative to identify optimal locations for solar power plants across India. Initial efforts focused on collecting diverse geospatial datasets — including solar irradiance, elevation, rainfall, land use, and population density — from various national and global sources.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                      May
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Harmonization & Feature Augmentation</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Raw datasets were cleaned, normalized, and harmonized into a unified geospatial grid. APIs were integrated to fetch additional real-world attributes like temperature, humidity, and satellite-based elevation and land cover values, enriching the dataset with meaningful features.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                      Jun
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Criteria Decision Analysis (MCDA) & Suitability Scoring</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      The project transitioned into its analytical phase, leveraging AHP (Analytic Hierarchy Process) to compute weighted suitability scores. Each location was evaluated based on its environmental and infrastructural viability. Suitability was classified into "High", "Medium", or "Low", enabling actionable insights for site prioritization.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-32 flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                      Now
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Deployment-Ready Insights</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      The project now offers a ready-to-use CSV of solar site suitability across thousands of geolocations in India — complete with API-verified environmental metrics, infrastructure overlays, and a robust MCDA-based ranking system. It is primed for use by government agencies, energy planners, and solar investors to guide data-driven decision-making.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Why Solar Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why <span className="text-blue-600 dark:text-blue-400">Solar?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Solar energy is transforming India's energy landscape and helping create a sustainable future.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg h-full">
                <div className="w-12 h-12 mb-4 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Abundant Resource
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  India receives an average of 300 sunny days per year, with an energy potential of 5,000 trillion kWh/year - far exceeding the country's total energy needs.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg h-full">
                <div className="w-12 h-12 mb-4 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Clean Energy
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Solar power produces no air or water pollution, no greenhouse gas emissions, and has minimal environmental impact compared to conventional energy sources.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg h-full">
                <div className="w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Economic Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  India's solar industry has created over 100,000 jobs and is projected to create millions more as the sector continues to expand rapidly.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;