import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaBook, FaClock, FaUsers, FaCertificate } from "react-icons/fa";

const Bundle = () => {
  const { bundleId } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState({});
  const bundles = useSelector((state) => state.bundle.bundles[0]);

  useEffect(() => {
    const selected = bundles?.filter((bundle) => bundle._id === bundleId);
    setBundle(selected?.[0]);
  }, [bundles, bundleId]);

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-6 md:p-12 bg-gradient-to-b from-gray-50 to-white space-y-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bundle Name */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-6">
        {bundle?.bundleName}
      </h1>

      {/* Banner */}
      <motion.div 
        className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-3xl shadow-md"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={bundle?.bundleImage} 
          alt={bundle?.bundleName} 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center py-10">
        <div>
          <FaBook className="text-blue-500 text-4xl mb-2 mx-auto" />
          <p className="text-lg font-semibold">8 Courses</p>
        </div>
        <div>
          <FaClock className="text-blue-500 text-4xl mb-2 mx-auto" />
          <p className="text-lg font-semibold">67+ Hours</p>
        </div>
        <div>
          <FaUsers className="text-blue-500 text-4xl mb-2 mx-auto" />
          <p className="text-lg font-semibold">2 Lakh+ Students</p>
        </div>
        <div>
          <FaCertificate className="text-blue-500 text-4xl mb-2 mx-auto" />
          <p className="text-lg font-semibold">Bizgurukul Certificate</p>
        </div>
      </div>

      {/* Courses */}
      <h2 className="text-4xl font-bold text-center text-gray-800">Courses Included</h2>
      <div className="space-y-20 mt-8">
        {bundle?.courses
          ?.filter(course => course.title !== "Advanced Personality Development")
          .map((course, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`border border-black rounded-2xl bg-white transition-all duration-300 hover:bg-orange-100 flex flex-col md:flex-row ${
                  isEven ? "" : "md:flex-row-reverse"
                } items-center overflow-hidden shadow-lg`}
                whileHover={{ scale: 1.01 }}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img
                    src={course.image || "https://via.placeholder.com/500x300?text=Course+Image"}
                    alt={course.title}
                    className="w-4/5 h-[420px] object-cover rounded-xl m-4"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 text-center space-y-6">
                  <h3 className="text-3xl font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-base text-gray-700 px-4 md:px-10 leading-relaxed tracking-wide">
                    {course.description || "No description available for this course yet. Stay tuned!"}
                  </p>
                  <motion.button
                    className="px-6 py-2 border-2 border-black rounded-lg font-semibold text-black hover:bg-orange-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/course/${course._id}`)}
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Buy Bundle Button */}
      <div className="text-center mt-24">
        <motion.button
          className="px-10 py-3 border-2 border-black text-lg font-semibold rounded-xl text-black hover:bg-orange-500 hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Buy Bundle
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bundle;
