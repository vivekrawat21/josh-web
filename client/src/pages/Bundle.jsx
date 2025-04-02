import { useParams } from "react-router-dom";
import { FaCertificate, FaUsers, FaClock, FaBookOpen, FaTag } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const dummyStudents = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg"
];

const Bundle = () => {
  let { bundleId } = useParams();
 
  const [bundle, setBundle] = useState({});
  const bundles = useSelector((state) => state.bundle.bundles[0]);

  useEffect(() => {
    const selected = bundles?.filter((bundle) => bundle._id === bundleId);
    setBundle(selected[0]);
  }, [bundles]);

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner Section */}
      <motion.div 
        className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={bundle?.bundleImage} alt={bundle?.bundleName} className="w-full h-full object-cover" />
      </motion.div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900">{bundle?.bundleName}</h1>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <motion.div className="p-5 bg-gray-100 rounded-xl shadow flex flex-col items-center" whileHover={{ scale: 1.05 }}>
          <FaBookOpen size={24} className="text-blue-500" />
          <p className="text-xl font-semibold text-gray-800">{bundle?.courses?.length || 0}</p>
          <p className="text-sm capitalize text-gray-600">Courses</p>
        </motion.div>
        
        <motion.div className="p-5 bg-gray-100 rounded-xl shadow flex flex-col items-center" whileHover={{ scale: 1.05 }}>
          <FaClock size={24} className="text-green-500" />
          <p className="text-xl font-semibold text-gray-800">67+</p>
          <p className="text-sm capitalize text-gray-600">Hours</p>
        </motion.div>
        
        <motion.div className="p-5 bg-gray-100 rounded-xl shadow flex flex-col items-center" whileHover={{ scale: 1.05 }}>
          <FaUsers size={24} className="text-orange-500" />
          <p className="text-xl font-semibold text-gray-800">2 Lakh+</p>
          <p className="text-sm capitalize text-gray-600">Students</p>
        </motion.div>
        
        <motion.div className="p-5 bg-gray-100 rounded-xl shadow flex flex-col items-center" whileHover={{ scale: 1.05 }}>
          <FaCertificate size={24} className="text-purple-500" />
          <p className="text-xl font-semibold text-gray-800">Joshguru Certificate</p>
        </motion.div>
      </div>

      {/* Courses Section */}
      <h2 className="text-3xl font-semibold text-gray-800">Courses in this Bundle</h2>
      <div className="grid gap-6">
        {bundle?.courses?.map((course, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex items-center space-x-6"
            whileHover={{ scale: 1.02 }}
          >
            <img src={course.image || "https://via.placeholder.com/150"} alt={course.title} className="w-32 h-32 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
              <p className="text-gray-700">By {course.courseMentorName || "Unknown"}</p>
              <p className="text-gray-600 mt-2">{course.description || "No description available."}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="flex flex-col items-center mt-8 bg-gray-100 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-900">Special Offer</h3>
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-3xl font-bold text-green-600">{bundle?.price}</p>
        </div>
        <motion.button 
          className="px-8 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md mt-4"
          whileHover={{ scale: 1.05 }}
        >
          Buy this bundle
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Bundle;