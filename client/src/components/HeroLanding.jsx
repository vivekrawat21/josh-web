"use client"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Users, Calendar, Award, BookOpen, HeadphonesIcon } from "lucide-react"

const HeroLanding = () => {
  const user = useSelector((state) => state.user)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      title: "40+ Courses",
      icon: (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0 0C10.832 19.319 8.992 20 7 20c-2.761 0-5-1.79-5-4V7c0-2.21 2.239-4 5-4 1.992 0 3.832.68 5 2m0 0c1.168-1.32 3.008-2 5-2 2.761 0 5 1.79 5 4v12c0 2.21-2.239 4-5 4-1.992 0-3.832-.68-5-2"
          />
        </svg>
      ),
      position: "left",
      delay: 0.2,
    },
    {
      title: "50+ Placement Partners",
      icon: (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      position: "right",
      delay: 0.4,
    },
    {
      title: "10,000+ Students",
      icon: (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      position: "left",
      delay: 0.6,
    },
    {
      title: "50+ Trainers",
      icon: (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      position: "right",
      delay: 0.8,
    },
    {
      title: "200+ Live Trainings",
      icon: (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      position: "left",
      delay: 1,
    },
  ];

  // Calculate rocket position based on scroll
  const rocketYPosition = Math.min(100, scrollPosition / 5)

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen w-full px-4 md:flex-row md:space-x-12 md:px-12">
      <div className="relative w-full h-auto pt-10 pb-5 md:h-screen md:-top-14">
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
          className="absolute -top-10 md:-top-2 left-0 sm:-left-72 md:-left-28 w-full sm:w-[85%] h-auto object-cover opacity-20 -z-10"
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
          {/* <motion.div
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
          </motion.div> */}

          <div className="relative lg:top-12 w-full sm:mx-auto lg:w-[49.5%] flex flex-col items-start gap-0 mt-2 mb-0 md:hidden lg:block sm:hidden px-2 sm:px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-center w-full"
            >
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">
                Why JoshGuru?
              </h2>
            </motion.div>

            <div className="relative mt-0 pt-0 min-h-[250px] md:min-h-[350px] w-full">
              {/* Rocket */}
              <motion.div
                className="absolute left-1/2 md:left-[12.75rem] top-11 -translate-x-1/2 z-20"
                style={{
                  bottom: `${20 + rocketYPosition}%`,
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  y: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="relative hidden lg:block">
                  {/* Rocket body */}
                  <div className="w-12 h-44 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full relative">
                    {/* Cockpit */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full border-2 border-gray-300">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-orange-200 rounded-full opacity-80"></div>
                    </div>

                    {/* Windows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-200 rounded-full border border-gray-400"></div>
                    <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-200 rounded-full border border-gray-400"></div>

                    {/* Wings */}
                    <div className="absolute top-1/3 -left-8 w-8 h-12 bg-gradient-to-r from-orange-500 to-orange-600 skew-y-[30deg] rounded-l-lg"></div>
                    <div className="absolute top-1/3 -right-8 w-8 h-12 bg-gradient-to-l from-orange-500 to-orange-600 skew-y-[-30deg] rounded-r-lg"></div>

                    {/* Engines */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-16 h-5 flex justify-center space-x-1">
                      <div className="w-4 h-8 bg-gray-700 rounded-b-lg relative">
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-orange-600 via-yellow-400 to-orange-500 rounded-b-lg"
                          animate={{ height: ["60%", "80%", "60%"] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                        ></motion.div>
                      </div>
                      <div className="w-4 h-8 bg-gray-700 rounded-b-lg relative">
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-orange-600 via-yellow-400 to-orange-500 rounded-b-lg"
                          animate={{ height: ["70%", "90%", "70%"] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                        ></motion.div>
                      </div>
                      <div className="w-4 h-8 bg-gray-700 rounded-b-lg relative">
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-orange-600 via-yellow-400 to-orange-500 rounded-b-lg"
                          animate={{ height: ["65%", "85%", "65%"] }}
                          transition={{ duration: 0.55, repeat: Number.POSITIVE_INFINITY }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Smoke trail */}
                  <motion.div
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-24 h-24"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-transparent via-orange-100/30 to-transparent rounded-full blur-xl"></div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Features */}
              {features.map((feature, index) => {
                let positionClasses = ""
                let lineStyles = {}

                if (feature.position === "left") {
                  positionClasses = "left-2 sm:left-0 md:left-4"
                  lineStyles = {
                    top: `${25 + 2 * 15}%`,
                    right: "-20px",
                    width: "30px",
                    height: "2px",
                  }
                } else if (feature.position === "right") {
                  positionClasses = "right-2 sm:right-0 md:right-4"
                  lineStyles = {
                    top: `${20 + 2 * 15}%`,
                    left: "-20px",
                    width: "30px",
                    height: "2px",
                  }
                }

                return (
                  <motion.div
                    key={index}
                    className={`absolute ${positionClasses} max-w-[130px]`}
                    style={{ top: `${feature.position === "bottom" ? "auto" : 20 + index * 15}%` }}
                    initial={{
                      opacity: 0,
                      x: feature.position === "left" ? -50 : feature.position === "right" ? 50 : 0,
                    }}
                    animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: feature.delay }}
                  >
                    <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-lg shadow-orange-100 relative">
                      <div className="absolute bg-gradient-to-r from-orange-400 to-orange-500" style={lineStyles}></div>

                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1.5 bg-orange-100 shrink-0">{feature.icon}</div>
                        <h3 className="text-sm font-bold text-gray-800">{feature.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/*left container for md device*/}
          <motion.div
            className="flex flex-col md:items-center md:justify-center py-10 md:w-full lg:hidden hidden sm:block md:block"
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

              {/* Placement Partners */}
              {/* <motion.div
                className="flex items-center text-center gap-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600 text-lg mt-2 font-semibold">50+ Placement Partners</span>
              </motion.div>

              {/* Courses */}
              {/*<motion.div
                className="flex items-center text-center gap-4"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <svg
                  className="w-12 h-12 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0 0C10.832 19.319 8.992 20 7 20c-2.761 0-5-1.79-5-4V7c0-2.21 2.239-4 5-4 1.992 0 3.832.68 5 2m0 0c1.168-1.32 3.008-2 5-2 2.761 0 5 1.79 5 4v12c0 2.21-2.239 4-5 4-1.992 0-3.832-.68-5-2"
                  />
                </svg>
                <span className="text-gray-600 text-lg mt-2 font-semibold">40+ Courses</span>
              </motion.div> */}

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
                  <Link to="/signup" className="block w-full">
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