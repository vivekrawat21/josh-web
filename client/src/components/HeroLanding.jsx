import React from 'react';
import { motion } from 'framer-motion';
import Hero1 from '/Hero1.jpeg';

const HeroLanding = () => {
  return (
    <div className=" relative flex flex-col-reverse items-center justify-between h-auto md:flex-row   md:space-x-12">
      
      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 lg:w-1/3 text-center md:text-left px-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}    
        transition={{ duration: 0.8 }}       
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
          Welcome to JoshGuru
        </h1>
        <p className=" text-lg md:text-base lg:text-lg text-gray-700 leading-relaxed text-justify mb-6">
          JoshGuru is one of the leading education platforms offering a wide range of courses at competitive prices. Learn anytime, anywhere, and explore courses tailored to your needs. We specialize in Web Development and Digital Marketing, empowering you with the skills to excel in the digital world.
        </p>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg px-4  md:px-6 md:py-1 font-semibold text-lg md:text-lg text-white hover:shadow-md my-4">
          Get Started
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center  md:mb-0 h-auto"
        initial={{ opacity: 0, x: 100 }}   // Starting position (right)
        animate={{ opacity: 1, x: 0 }}     // End position (normal)
        transition={{ duration: 0.8 }}       // Animation duration
      >
        <img
          src={Hero1}
          alt="Hero Landing"
          className="max-w-full h-full object-contain rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default HeroLanding;
