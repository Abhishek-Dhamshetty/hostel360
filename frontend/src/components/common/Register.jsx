import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import signupImage from '../../assets/signup.png';

function Register() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Side - Image with Bottom-Aligned Text */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 relative overflow-hidden items-end justify-center text-center pb-16"
      >
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${signupImage})` }} 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Bottom-Aligned Content */}
        <div className="relative z-10 text-white w-full px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Join Hostel360 Today
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg text-gray-300 mt-4"
          >
            Find your perfect hostel or PG. Sign up now to get started!
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Sign Up Form */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white px-6 md:px-10 lg:px-16 dark:bg-gray-900 dark:text-white relative"
      >
        <div className="w-full max-w-md space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-8 space-y-3"
          >
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Create Your Hostel360 Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign up now and start exploring the best hostels and PGs near you.
            </p>
          </motion.div>

          <SignUp />
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
