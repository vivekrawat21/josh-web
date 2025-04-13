import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaBook, FaClock, FaUsers, FaCertificate } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      className="max-w-7xl mx-auto px-4 md:px-6 py-4 bg-gradient-to-b te space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Bundle Name */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
        {bundle?.bundleName}
      </h1>

      {/* Banner */}
      <motion.div
        className="w-full h-[160px] sm:h-[240px] md:h-[400px] overflow-hidden rounded-3xl shadow-md"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={bundle?.bundleImage || "https://via.placeholder.com/900x450?text=Bundle+Image"}
          alt={bundle?.bundleName}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center py-6">
        <div>
          <FaBook className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mb-2 mx-auto" />
          <p className="text-xs sm:text-sm md:text-base font-semibold">8 Courses</p>
        </div>
        <div>
          <FaClock className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mb-2 mx-auto" />
          <p className="text-xs sm:text-sm md:text-base font-semibold">67+ Hours</p>
        </div>
        <div>
          <FaUsers className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mb-2 mx-auto" />
          <p className="text-xs sm:text-sm md:text-base font-semibold">2 Lakh+ Students</p>
        </div>
        <div>
          <FaCertificate className="text-blue-500 text-2xl sm:text-3xl md:text-4xl mb-2 mx-auto" />
          <p className="text-xs sm:text-sm md:text-base font-semibold">
            Joshguru  Certificate
          </p>
        </div>
      </div>

      {/* Courses */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-gray-800">Courses Included</h2>
      <div className="space-y-10 mt-6">
        {bundle?.courses
          ?.filter((course) => course.title !== "Advanced Personality Development")
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
                <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                  <img
                    src={course.image || "https://via.placeholder.com/500x300?text=Course+Image"}
                    alt={course.title}
                    className="w-full sm:w-[85%] h-[180px] sm:h-[220px] md:h-[300px] object-cover rounded-xl"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 text-center space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 px-4 sm:px-6 leading-relaxed tracking-wide">
                    {course.description || "No description available for this course yet. Stay tuned!"}
                  </p>
                  <motion.button
                    className="px-4 py-1 sm:px-5 sm:py-2 border border-black rounded-md font-medium text-black hover:bg-orange-500 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base"
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
      <div className="text-center mt-16 mb-10">
        <motion.button
          className="px-6 py-2 sm:px-8 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-black font-semibold rounded-xl text-black hover:bg-orange-500 hover:text-white transition-all duration-300 mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/signup">Buy Bundle</Link>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bundle;
