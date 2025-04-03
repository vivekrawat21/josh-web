"use client"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HeroLanding = () => {
  const user = useSelector((state) => state.user)

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen w-full px-4 md:flex-row md:space-x-12 md:px-12">
      <div className="relative w-full h-auto py-10 md:h-screen md:-top-10">
        {/* Background Images - Responsive positioning */}
        <motion.img
          src="/arrow_pattern1.svg"
          alt="Arrow Pattern 1"
          className="absolute top-0 left-10 md:left-40 w-[20%] h-[20%] object-contain opacity-20"
          initial={{ x: "-15vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.img
          src="/arrow_pattern2.svg"
          alt="Arrow Pattern 2"
          className="absolute top-20 md:top-40 left-0 w-[18%] h-[18%] object-contain opacity-20"
          initial={{ x: "-15vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.img
          src="/arrow_pattern3.svg"
          alt="Arrow Pattern 3"
          className="absolute top-[60%] md:top-[80%] left-0 w-[18%] h-[18%] object-contain opacity-20"
          initial={{ x: "-15vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.img
          src="/arrow_pattern4.svg"
          alt="Arrow Pattern 4"
          className="absolute top-40 md:top-60 right-0 w-[20%] h-[20%] object-contain opacity-20"
          initial={{ x: "5vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.img
          src="/arrow_pattern5.svg"
          alt="Arrow Pattern 5"
          className="absolute top-[50%] md:top-[65%] right-0 w-[20%] h-[20%] object-contain opacity-20"
          initial={{ x: "5vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.img
          src="/Hero bg line.svg"
          alt="Hero Background Line"
          className="absolute -top-10 left-0 sm:-left-72 md:-left-28 w-full sm:w-[85%] h-auto object-cover opacity-20 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />


        {/* Main Heading - Responsive text sizes */}
        <motion.div
          className="flex flex-wrap justify-center text-center lg:mt-20 md:mt-8"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">Learn Today,</h1>

          <motion.span
            className="relative inline-block mx-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <span className="absolute inset-0 bg-blue-500 rotate-2 -skew-x-6 px-4 py-2"></span>
            <span className="relative text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold rotate-2 -skew-x-6">
              Lead
            </span>
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">Tomorrow</h1>
        </motion.div>

        <motion.div className="flex flex-col-reverse lg:flex-row mt-10 md:mt-0">
          {/* Left Container - Why JoshGuru section */}
          <motion.div
            className="relative lg:top-12 w-full lg:w-[45%] flex flex-col items-start gap-4 p-4 md:p-6 mt-8 md:hidden lg:block sm:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-xl md:text-2xl font-semibold mt-5 md:mt-10 mb-3 md:mb-5">Why JoshGuru?</h1>
            <motion.div className="flex flex-row items-center gap-3 md:gap-6 w-full md:w-[70%]">
              <motion.img
                src="/trainer_icon.svg"
                alt="Trainer Icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="text-gray-600 text-base md:text-lg font-semibold">50+ Trainer</span>
            </motion.div>
            <motion.div>
              <motion.img
                src="/curve_right.svg"
                alt="Curve Top Icon"
                className="w-16 h-8 md:w-24 md:h-12 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            <motion.div className="flex flex-row items-center gap-3 md:gap-6 pl-6 md:pl-12 w-full md:w-[70%]">
              <motion.img
                src="/student_icon.svg"
                alt="Student Icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="text-gray-600 text-base md:text-lg font-semibold">10,000+ Students</span>
            </motion.div>
            <motion.div>
              <motion.img
                src="/curve_right_down.svg"
                alt="Curve Down Icon"
                className="w-16 h-8 md:w-24 md:h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.div>
            <motion.div className="flex flex-row items-center gap-3 md:gap-6 w-full md:w-[70%]">
              <motion.img
                src="/training_icon.svg"
                alt="Training Icon"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <span className="text-gray-600 text-base md:text-lg font-semibold">200+ Live Training</span>
            </motion.div>
          </motion.div>

          {/*left container for md device*/}
          <motion.div
            className="flex flex-col md:items-center md:justify-center py-10 md:w-full lg:hidden hidden md:block"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Heading */}
            <h1 className="text-2xl font-semibold mb-6 text-center">Why JoshGuru?</h1>

            {/* Stats Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full">
              
              {/* Trainers */}
              <motion.div
                className="flex items-center text-center gap-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img src="/trainer_icon.svg" alt="Trainer Icon" className="w-12 h-12" />
                <span className="text-gray-600 text-lg mt-2 font-semibold">50+ Trainers</span>
              </motion.div>

              {/* Students */}
              <motion.div
                className="flex items-center text-center gap-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <img src="/student_icon.svg" alt="Students Icon" className="w-12 h-12" />
                <span className="text-gray-600 text-lg mt-2 font-semibold">10,000+ Students</span>
              </motion.div>

              {/* Live Trainings */}
              <motion.div
                className="flex items-center text-center gap-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <img src="/training_icon.svg" alt="Training Icon" className="w-12 h-12" />
                <span className="text-gray-600 text-lg mt-2 font-semibold">200+ Live Trainings</span>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Container - Image and CTA */}
          <motion.div
            className="w-full flex flex-col md:flex-row items-center lg:items-end gap-6 p-4 md:p-6 mt-8 lg:mt-14"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Image Container */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center border-2 border-orange-500 rounded-t-2xl mb-6 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src="/Hero1.jpeg"
                alt="Joshguru Landing Image"
                className="w-full h-auto object-contain rounded-t-2xl"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-between text-gray-600 text-base md:text-lg gap-3 md:gap-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="gap-2 md:gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-500 mb-1 pb-1">Empower Your Future</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-0 pt-0 font-bold text-gray-700">
                  with <span className="text-orange-500">JoshGuru!</span>
                </h1>
                <p className="my-2 md:my-3">Discover a new way of learning that adapts to your needs.</p>
                <p className="my-2 md:my-3">
                  Our platform combines cutting-edge technology with expert instruction to help you achieve your goals.
                </p>
              </div>

              {/* Button at the bottom */}
              {user == null ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-orange-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-orange-700 transition-colors w-full"
                >
                  <Link to="/login" className="block w-full">
                    Start Learning Today →
                  </Link>
                </motion.button>
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroLanding