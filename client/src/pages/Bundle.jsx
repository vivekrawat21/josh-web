import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaBook, FaClock, FaUsers, FaCertificate, FaExclamationCircle } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";

// Animation Variants for orchestration
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Bundle = () => {
  const { bundleId } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Assuming the user's Redux state for bundles is an array containing one array of bundles.
  // A safer approach might be state.bundle.bundles if it's just a flat array.
  const allBundles = useSelector((state) => state.bundle.bundles[0]);
  const user = useSelector((state) => state.user);
  
  const isEnrolled = user?.bundles?.some(b => b._id === bundleId);

  useEffect(() => {
    if (allBundles && allBundles.length > 0) {
      const selected = allBundles.find((b) => b?._id === bundleId);
      setBundle(selected || null);
    }
    // A small delay to prevent flash of loading content
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [allBundles, bundleId]);

  const handleCourseClick = (courseId) => {
    if (!user) {
      navigate(`/course/${courseId}`);
      return;
    }
    const isCourseEnrolled = user?.courses?.some(course => course._id === courseId);
    if (isCourseEnrolled) {
      navigate(`/course/${courseId}/learn`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <LoaderCircle className="animate-spin w-12 h-12 text-orange-500 mb-4" />
        <p className="text-lg font-semibold text-slate-600">Loading Bundle Details...</p>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-center p-4">
        <FaExclamationCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-2xl font-bold text-slate-700">Bundle Not Found</p>
        <p className="text-slate-500 mt-2">The bundle you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="mt-6 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 mt-20">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-slate-800 mb-8"
          variants={itemVariants}
        >
          {bundle?.bundleName}
        </motion.h1>

        <motion.div
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] overflow-hidden rounded-3xl shadow-xl border-4 border-white"
          variants={itemVariants}
        >
          <img
            src={bundle?.bundleImage || "https://via.placeholder.com/1200x500?text=Bundle+Image"}
            alt={bundle?.bundleName}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center py-10 md:py-16"
          variants={itemVariants}
        >
          {[
            { icon: FaBook, value: `${bundle?.courses?.length || 0}`, label: "Courses" },
            { icon: FaClock, value: `${bundle?.duration?.slice(0, 1) || 'N/A'}`, label: "Months" },
            { icon: FaUsers, value: "2 Lakh+", label: "Students" },
            { icon: FaCertificate, value: "Verified", label: "Certificate" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center justify-center">
              <item.icon className="text-orange-500 text-3xl sm:text-4xl mb-2" />
              <p className="text-xl sm:text-2xl font-bold text-slate-800">{item.value}</p>
              <p className="text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-12"
          variants={itemVariants}
        >
          Courses Included
        </motion.h2>
        
        <div className="space-y-12">
          {bundle?.courses
            ?.filter((course) => course.title !== "Advanced Personality Development")
            .map((course, index) => (
              <motion.div
                key={course._id || index}
                className={`bg-white rounded-2xl flex flex-col md:flex-row ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                } items-center overflow-hidden shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                variants={itemVariants}
              >
                <div className="w-full md:w-5/12 p-4">
                  <img
                    src={course.image || "https://via.placeholder.com/500x300?text=Course+Image"}
                    alt={course.title}
                    className="w-full h-auto aspect-video object-cover rounded-xl"
                  />
                </div>

                <div className="w-full md:w-7/12 flex flex-col justify-center p-6 md:p-8 text-center md:text-left space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">
                    {course.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {course.description || "No description available for this course yet. Stay tuned!"}
                  </p>
                  <div className="pt-2">
                    <motion.button
                      className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg shadow-sm hover:bg-orange-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCourseClick(course._id)}
                    >
                      {isEnrolled ? "Resume Course" : "Explore Course"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {!isEnrolled && (
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm shadow-t-lg border-t border-slate-200 py-4">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-center sm:text-left mb-3 sm:mb-0">
                <h3 className="text-xl font-bold text-slate-800">Ready to start learning?</h3>
                <p className="text-slate-500">Get access to all {bundle?.courses?.length} courses.</p>
            </div>
            <Link
              to={!user ? `/signup?courseId=${bundle._id}&type=bundle` : `/payment?type=bundle&courseId=${bundleId}`}
            >
              <motion.button
                className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Bundle Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Bundle;