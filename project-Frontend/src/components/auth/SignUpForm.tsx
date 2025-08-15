import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Building, UserPlus } from 'lucide-react';
import Button from '../common/Button';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationId: string;
}

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormData>();
  const password = watch('password');

  const onSubmit = (data: SignUpFormData) => {
    console.log('Sign up data:', data);
    // Here you would typically handle registration logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <input
            id="fullName"
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              errors.fullName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
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
        <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Organization ID
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building size={18} className="text-gray-400" />
          </div>
          <input
            id="organizationId"
            type="text"
            {...register('organizationId', { required: 'Organization ID is required' })}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              errors.organizationId ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {errors.organizationId && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              errors.password ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'The passwords do not match'
            })}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              errors.confirmPassword ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          icon={<UserPlus size={18} />}
        >
          Sign Up
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-0.212 1.2-0.999 3.181-5.445 3.181-3.279 0-5.955-2.616-5.955-5.836 0-3.22 2.676-5.836 5.955-5.836 1.881 0 3.162 0.781 3.852 1.409l2.647-2.471c-1.733-1.595-3.975-2.507-6.499-2.507-5.376 0-9.739 4.203-9.739 9.405 0 5.201 4.363 9.405 9.739 9.405 5.616 0 9.33-3.836 9.33-9.204 0-0.645-0.063-1.126-0.193-1.666h-9.137z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;