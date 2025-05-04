import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [userBundles, setUserBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserCourses = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/${user._id}/getCourses`,
          { withCredentials: true }
        );
        setUserCourses(response.data?.data?.user?.courses || []);
        setUserBundles(response.data?.data?.user?.bundles || []);
      } catch (error) {
        // Optionally handle error UI here
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [user]);
  console.log("this is user")
console.log(user)
console.log("user courses", userCourses)

console.log("user bundles", userBundles)
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-4">Courses</h1>
        <p className="text-gray-600 mb-4">
          Here are your purchased courses and bundles.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-lg shadow-sm"
        >
          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading...</div>
          ) : userCourses.length === 0 && userBundles.length === 0 ? (
            <div className="py-10 text-center text-gray-500">No courses or bundles found.</div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="p-3 md:p-4 text-left">Course/Bundle Name</th>
                  <th className="p-3 md:p-4 text-left">Type</th>
                  <th className="p-3 md:p-4 text-left">Total (INR)</th>
                </tr>
              </thead>
              <tbody>
                {userCourses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3 md:p-4 text-gray-700 font-medium">
                      {course?.title}
                    </td>
                    <td className="p-3 md:p-4 text-gray-600">Course</td>
                    <td className="p-3 md:p-4 font-semibold text-orange-600">
                      {course?.price}
                    </td>
                  </motion.tr>
                ))}
                {userBundles.map((bundle, index) => (
                  <motion.tr
                    key={bundle._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (userCourses.length + index) * 0.1 }}
                    className="border-b bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3 md:p-4 text-gray-700 font-medium">
                      {bundle?.bundleName}
                    </td>
                    <td className="p-3 md:p-4 text-gray-600">Bundle</td>
                    <td className="p-3 md:p-4 font-semibold text-orange-600">
                      {bundle?.price}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Courses;
