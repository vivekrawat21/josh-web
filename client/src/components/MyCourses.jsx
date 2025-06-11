import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Zap, Star } from "lucide-react";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

const Shimmer = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-300 h-36 sm:h-48 w-full rounded-lg" />
    <div className="bg-gray-300 h-4 w-2/3 rounded" />
    <div className="bg-gray-300 h-4 w-1/3 rounded" />
    <div className="bg-gray-300 h-8 w-full rounded" />
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [user]);

  const enrolledCourseIds = enrolledCourses.map((course) => course._id);
  const suggestedBundleId = enrolledCourses[0]?.bundle;
  const suggestedBundle = bundles?.find((b) => b._id === suggestedBundleId) || bundles?.[0];
  const suggestedCourses = suggestedBundle?.courses?.filter(
    (course) => !enrolledCourseIds.includes(course._id)
  ) || [];

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            My Learning Journey
          </h1>
        </div>

        {/* Enrolled Bundles */}
        {enrolledBundle?.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Zap className="text-yellow-500 w-6 h-6" />
              My Enrolled Bundles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
                : enrolledBundle.map((bundle) => (
                    <div
                      key={bundle._id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border"
                    >
                      <div className="relative h-48 sm:h-60 md:h-72">
                        <img
                          src={bundle.bundleImage || "/default-course.png"}
                          alt={bundle.bundleName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-white text-lg sm:text-xl font-bold">
                            {bundle.bundleName}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <Link to={`/bundle/${bundle._id}`}>
                          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors text-base font-medium">
                            View Bundle
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Enrolled Courses */}
        {enrolledCourses?.length > 0 ? (
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="text-yellow-500 w-5 h-5" />
              Enrolled Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
                : enrolledCourses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border"
                    >
                      <img
                        src={course.image || "/default-course.png"}
                        alt={course.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                          {course.title}
                        </h4>
                        <Link to={`/course/${course._id}/learn`}>
                          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-base font-medium">
                            Resume Course
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center h-48 bg-white shadow rounded-xl p-6 text-center">
            <p className="text-gray-700 text-lg sm:text-xl font-medium">
              Not enrolled in any course right now
            </p>
          </div>
        )}

        {/* Pro Upgrade Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-300 w-6 h-6" />
              <h3 className="text-xl sm:text-2xl font-bold">Upgrade to Pro</h3>
            </div>
            <p className="text-sm sm:text-base text-indigo-100">
              Get unlimited access to all premium content and lessons
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-200 rounded-full" />
                Access to lower priced courses
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-200 rounded-full" />
                All lower priced courses are free
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-200 rounded-full" />
                Exclusive workshops and content
              </li>
            </ul>
          </div>
          <Link to={`/dashboard/mycourse/upgrade`}>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors text-base sm:text-lg whitespace-nowrap">
              Upgrade Your Bundle
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MyCourses;
