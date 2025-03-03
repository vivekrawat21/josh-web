import React from 'react';
import { motion } from 'framer-motion';
import Hero1 from '/Hero1.jpeg';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const HeroLanding = () => {
  const user = useSelector(state=>state.user);
  return (
    <div className="relative flex flex-col-reverse items-center justify-between h-auto md:flex-row md:space-x-12  md:px-12 ">
      
      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left px-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}    
        transition={{ duration: 0.8 }}
      >
        <h1 className="relative text-xl  md:text-5xl font-extrabold tracking-tight text-gray-900 leading-snug">
          <motion.span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Transform Your Future
          </motion.span>
          <motion.span
            className="block md:mt-2  text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            With Expert-Led Courses
          </motion.span>
        </h1>

        <p className="max-w-md text-sm sm:text-base text-gray-500 mt-2 mx-auto md:mx-0 italic">
          Discover a new way of learning that adapts to your needs. Our platform combines cutting-edge technology
          with expert instruction to help you achieve your goals.
        </p>

       {user==null? <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg px-5 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-lg text-white transition-transform duration-200 mt-6 md:mb-0 mb-4"
        >
          <Link to="/login" >Get Started </Link>
        </motion.button>:null}
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-4/5 sm:w-2/3 md:w-1/2 flex justify-center md:mb-0 h-auto  mt-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={Hero1}
          alt="Hero Landing"
          className="w-full max-w-xs sm:max-w-md md:max-w-full h-auto object-contain mb-3 "
        />
      </motion.div>
    </div>
  );
};

export default HeroLanding;
