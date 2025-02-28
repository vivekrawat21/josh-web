import React from 'react';
import { motion } from 'framer-motion';
import Hero1 from '/Hero1.jpeg';

const HeroLanding = () => {
  return (
    <div className=" relative flex flex-col-reverse items-center justify-between h-auto md:flex-row   md:space-x-12">
      
      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 lg:w-2/3 text-center md:text-left px-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}    
        transition={{ duration: 0.8 }}       
      >
          <h1 className="animate-fade-in-slide-up text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Transform Your Future
              </span>
              <span className="block mt-2 animate-fade-in-slide-up-delay-1">With Expert-Led Courses</span>
            </h1>
            <p className="max-w-md text-lg text-gray-600 animate-fade-in-slide-up-delay-2 text-justify">
              Discover a new way of learning that adapts to your needs. Our platform combines cutting-edge technology
              with expert instruction to help you achieve your goals.
            </p>
        <button className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg px-4  md:px-6 md:py-2 font-semibold text-lg md:text-lg text-white hover:shadow-md my-4 ">
          Get Started
        </button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-1/2 md:w-1/2 flex justify-center  md:mb-0 h-auto"
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
