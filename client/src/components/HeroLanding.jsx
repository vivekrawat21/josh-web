import React from 'react';
import { motion } from 'framer-motion';
import Hero1 from '/Hero1.jpeg';
import HeroBgLine from '../../public/Hero bg line.svg'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const HeroLanding = () => {
  const user = useSelector(state=>state.user);
  return (
    <div className="relative flex flex-col-reverse items-center justify-between h-auto md:flex-row md:space-x-12  md:px-12 ">  
      <div className="relative w-full h-screen -top-10">
        {/* Background Image */}
        <motion.img
            src="/arrow_pattern1.svg" 
            alt="Arrow Pattern 1"
            className="absolute top-0 left-40 w-[20%] h-[20%] object-contain opacity-20"
            initial={{ x: "-15vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
      
        <motion.img
            src="/arrow_pattern2.svg" 
            alt="Arrow Pattern 2"
            className="absolute top-40 left-0 w-[18%] h-[18%] object-contain opacity-20"
            initial={{ x: "-15vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
                  
        <motion.img
            src="/arrow_pattern3.svg" 
            alt="Arrow Pattern 2"
            className="absolute top-[80%] left-0 w-[18%] h-[18%] object-contain opacity-20"
            initial={{ x: "-15vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
      
        <motion.img
            src="/arrow_pattern4.svg" 
            alt="Arrow Pattern 2"
            className="absolute top-60 right-0 w-[20%] h-[20%] object-contain opacity-20"
            initial={{ x: "5vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
      
        <motion.img
            src="/arrow_pattern5.svg" 
            alt="Arrow Pattern 2"
            className="absolute top-[65%] right-0 w-[20%] h-[20%] object-contain opacity-20"
            initial={{ x: "5vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
      
        <motion.img
            src="/Hero bg line.svg" 
            alt="Hero Background Line"
            className="absolute top-0 -left-32 w-[90%] h-auto object-cover opacity-20 -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.div
          className="flex flex-wrap justify-center text-center mt-[100px]"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black">Learn Today,</h1>

          <motion.span 
            className="relative inline-block mx-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <span className="absolute inset-0 bg-blue-500 rotate-2 -skew-x-6 px-4 py-2"></span>
            <span className="relative text-white text-5xl md:text-6xl font-bold rotate-2 -skew-x-6">Lead</span>
          </motion.span>

          <h1 className="text-5xl md:text-6xl font-bold text-black">Tomorrow</h1>
        </motion.div>

        <motion.div>
          {/* Left Container */}
          <motion.div
            className="absolute bottom left-0 flex flex-col items-start gap-4 p-6 mt-8 w-[70%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-semibold mt-10 mb-5">
              Why JoshGuru?
            </h1>
            <motion.div
              className='flex flex-row items-center gap-6 w-[70%]'
            >
              <motion.img
                src="/trainer_icon.svg"
                alt="Trainer Icon"
                className="w-10 h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
                <span className="text-gray-600 text-lg mt-2 font-semibold">
                  50+ Trainer
                </span>
            </motion.div>
            <motion.div
              
            >
              <motion.img
                src="/curve_right.svg"
                alt="Curve Top Icon"
                className="w-24 h-12 object-contain lett-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            <motion.div
              className='flex flex-row items-center gap-6 pl-12 w-[70%]'
            >
              <motion.img
                src="/student_icon.svg"
                alt="Trainer Icon"
                className="w-10 h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
                <span className="text-gray-600 text-lg mt-2 font-semibold">
                  10,000+ Students
                </span>
            </motion.div>
            <motion.div>
              <motion.img
                src="/curve_right_down.svg"
                alt="Curve Top Icon"
                className="w-24 h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            <motion.div
              className='flex flex-row items-center gap-6 w-[70%]'
            >
              <motion.img
                src="/training_icon.svg"
                alt="Trainer Icon"
                className="w-10 h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
                <span className="text-gray-600 text-lg mt-2 font-semibold">
                  200+ Live Training
                </span>
            </motion.div>
              
          </motion.div>
          {/* Right Container */}
          <motion.div
            className="absolute bottom-0 right-0 flex flex-row items-end gap-6 p-6 w-[70%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Image Container */}
            <motion.div
              className="w-[50%] flex justify-center border-2 border-orange-500 rounded-t-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={Hero1}
                alt="Joshguru Landing Image"
                className="w-full h-auto object-contain rounded-t-2xl"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="w-[50%] flex flex-col justify-between text-gray-600 text-lg gap-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className='gap-3'>
                <h1 className="text-3xl text-gray-500 mb-1 pb-1">
                  Empower Your Future
                </h1>
                <h1 className="text-6xl mt-0 pt-0 font-bold text-gray-700">
                  with <span className="text-orange-500">JoshGuru!</span>
                </h1>
                <p className='my-3'>Discover a new way of learning that adapts to your needs.</p>
                <p className='my-3'>
                  Our platform combines cutting-edge technology with expert instruction
                  to help you achieve your goals.
                </p>
              </div>

              {/* Button at the bottom */}
              {user==null?<motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors w-full"
              >
                <Link to="/login" >Start Learning Today →</Link>
              </motion.button>:null}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Text Section */}
      {/* <motion.div
        className="w-full md:w-1/2 text-center md:text-left px-2"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}    
        transition={{ duration: 0.8 }}
      >
        <h1 className="relative text-xl  lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-snug">
          <motion.span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Learn Today, Lead Tomorrow
          </motion.span>
          <motion.span
            className="block md:mt-2  text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            Empower Your Future with JoshGuru!
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
          <Link to="/login" > Start Learning Now </Link>
        </motion.button>:null}
      </motion.div> */}

      {/* Image Section */}
      {/* <motion.div
        className="w-4/5 sm:w-2/3 md:w-1/2 flex justify-center md:mb-0 h-auto  mt-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={Hero1}
          alt="joshguru Landing image"
          className="w-full max-w-xs sm:max-w-md md:max-w-full h-auto object-contain mb-3 "
        />
      </motion.div> */}
    </div>
  );
};

export default HeroLanding;
