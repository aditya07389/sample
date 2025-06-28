import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import AnimatedSection from '../components/common/AnimatedSection';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full">
        <AnimatedSection>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to <span className="text-blue-600 dark:text-blue-400">SolarSite</span>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to your account or create a new one
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium text-sm focus:outline-none ${
                  activeTab === 'signin'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('signin')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium text-sm focus:outline-none ${
                  activeTab === 'signup'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </motion.div>
  );
};

export default AuthPage;