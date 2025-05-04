import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Zap,
  Star,
} from "lucide-react";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

const Shimmer = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-300 h-36 sm:h-48 w-full rounded-lg"></div>
    <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
    <div className="bg-gray-300 h-5 w-1/3 rounded"></div>
    <div className="bg-gray-300 h-8 w-full rounded"></div>
  </div>
);

const MyCourses = () => {
  const user = useSelector((state) => state.user);
  const bundles = useSelector((state) => state.bundle.bundles[0]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledBundle, setEnrolledBundle] = useState([]);

  useEffect(() => {
    if (!user?._id) return;
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${user._id}/getCourses`, {
          withCredentials: true,
        });
        setEnrolledCourses(response.data?.data?.user?.courses || []);
        setEnrolledBundle(response.data?.data?.user?.bundles || []);
      } catch (error) {
        // Optionally handle error UI here
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [user]);

  const enrolledCourseIds = enrolledCourses.map((course) => course._id);
  const suggestedBundleId = enrolledCourses[0]?.bundle;
  const suggestedBundle = bundles?.find((b) => b._id === suggestedBundleId) || bundles?.[0];
  const suggestedCourses =
    suggestedBundle?.courses?.filter(
      (course) => !enrolledCourseIds.includes(course._id)
    ) || [];

  return (
    <main className="flex-1 px-2 sm:px-4 md:px-8 py-4 sm:py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900">
            My Learning Journey
          </h1>
        </div>

        {/* Enrolled Bundles */}
        {enrolledBundle && enrolledBundle.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500" />
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
                My Enrolled Bundles
              </h3>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
                : enrolledBundle.map((bundle) => (
                    <div
                      key={bundle._id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border w-full"
                    >
                      <div className="relative h-40 xs:h-52 sm:h-64 md:h-72">
                        <img
                          src={bundle.bundleImage || "/default-course.png"}
                          alt={bundle.bundleName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                          <h3 className="text-white text-lg sm:text-2xl font-bold">
                            {bundle.bundleName}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-200">
                            {bundle?.completedLessons} of {bundle?.totalLessons} lessons completed
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Enrolled Courses */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700 flex items-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2 text-yellow-500" /> Enrolled Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
              : enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="w-full max-w-xs sm:max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={course.image || "/default-course.png"}
                        alt={course.name}
                        className="w-full h-32 xs:h-40 sm:h-48 object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-900">
                        {course.title}
                      </h4>
                      <div className="space-y-2 sm:space-y-4">
                        <Link to={`/course/${course._id}/learn`}>
                          <button className="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors font-medium text-base sm:text-lg">
                            Resume Course
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Pro Upgrade Banner */}
        {suggestedBundle && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-4 flex-1">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                <h3 className="text-lg sm:text-2xl font-bold">
                  {suggestedBundle?.bundleName}
                </h3>
              </div>
              <p className="text-base sm:text-lg text-indigo-100">
                {suggestedBundle?.description ||
                  "Get unlimited access to all premium content and lessons"}
              </p>
              <div className="relative h-40 sm:h-64 w-full rounded-xl overflow-hidden">
                <img
                  src={suggestedBundle?.bundleImage || "/default-bundle-image.png"}
                  alt={suggestedBundle?.bundleName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-base">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></div>
                  <span>Access to {suggestedBundle?.totalLessons} lessons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></div>
                  <span>
                    Progress: {suggestedBundle?.completedLessons} of {suggestedBundle?.totalLessons} lessons
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></div>
                  <span>
                    {suggestedBundle?.workshops
                      ? "Exclusive workshops available"
                      : "Workshops unavailable"}
                  </span>
                </li>
              </ul>
            </div>
            <Link to="/dashboard/mycourse/upgrade">
              <button className="bg-white text-orange-600 px-6 sm:px-8 py-2 sm:py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap text-base sm:text-lg">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyCourses;
