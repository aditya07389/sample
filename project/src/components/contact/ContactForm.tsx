import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form data:', data);
    reset();
  };

  return (
    <div>
      {isSubmitSuccessful ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
        >
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Message Sent!</h3>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <Button 
            onClick={() => reset({ name: '', email: '', message: '' }, { keepIsSubmitted: false })}
            variant="outline"
            className="border-green-500 text-green-600 dark:border-green-600 dark:text-green-400"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                  errors.name ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                  errors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Message
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare size={18} className="text-gray-400" />
              </div>
              <textarea
                id="message"
                rows={5}
                {...register('message', { 
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message should be at least 10 characters'
                  }
                })}
                className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                  errors.message ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Send size={18} />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;