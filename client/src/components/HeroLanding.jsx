import React from 'react';
import { motion } from 'framer-motion';
import HeroLandingImage from '/HeroLanding.jpeg';

const HeroLanding = () => {
  return (
    <div className="my-12 relative flex  flex-col-reverse items-center justify-between h-[600px] w-full mx-auto md:flex-row md:p-8 space-x-12">
      
      {/* Text Section */}
      <motion.div
        className=" p-6   w-6/12 md:w-1/2 lg:w-1/3 text-center md:text-left"
        initial={{ opacity: 0, x: -100 }} // Starting position (left)
        animate={{ opacity: 1, x: 0 }} // End position (normal)
        transition={{ duration: 1 }} // Animation duration
      >
        <h1 className="text-2xl font-bold mb-4">Welcome to JoshGuru</h1>
        <p className="text-gray-600 mb-6">
          JoshGuru is one of the leading education platforms offering various courses at reasonable prices. You can learn anytime, anywhere, and anything. Specializing in Web Development and Digital Marketing courses.
        </p>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg px-6 py-3 font-semibold text-lg text-white hover:shadow-md">
          Get Started
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className=" h-full md:w-full flex justify-center mb-6 md:mb-0"
        initial={{ opacity: 0, x: 100 }} // Starting position (right)
        animate={{ opacity: 1, x: 0 }} // End position (normal)
        transition={{ duration: 1 }} // Animation duration
      >
        <img
          src={HeroLandingImage}
          alt="Hero Landing"
          className="object-contain w-full h-64 md:h-full lg:h-full md:w-full "
        />
      </motion.div>
    </div>
  );
};

export default HeroLanding;
