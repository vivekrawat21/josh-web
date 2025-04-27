import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  HelpCircle,
  LogOut,
  Share2,
  User,
  Zap,
  Star,
  Clock,
  Award,
} from "lucide-react";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

const Shimmer = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-300 h-48 w-full rounded-lg"></div>
    <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
    <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
    <div className="bg-gray-300 h-10 w-full rounded"></div>
  </div>
);

const MyCourses = () => {
  const user = useSelector((state) => state.user);
  const bundles = useSelector((state) => state.bundle.bundles[0]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrolledBundle = user?.bundles;

  useEffect(() => {
    if (!user?._id) return;

    const fetchEnrolledCourses = async () => {
      try {
        console.log("📡 Fetching courses for user:", user._id);

        const response = await axios.get(`${BASE_URL}/user/${user._id}/getCourses`, {
          withCredentials: true,
        });

        const courses = response.data?.data?.user?.courses || [];
        console.log("✅ Courses fetched:", courses);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("❌ Error fetching courses:", error.response?.data || error.message);
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
    <main className="flex-1 px-8 py-6 bg-gray-100 ">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            My Learning Journey
          </h1>
        </div>

        {/* Enrolled Courses */}
        <section>
          {enrolledBundle && enrolledBundle.length > 1 && (
            <section>
              <div className="flex items-center space-x-3 mb-8">
                <Zap className="w-7 h-7 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Continue Learning
                </h3>
              </div>
              <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
                {loading
                  ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
                  : enrolledBundle.map((bundle) => (
                      <div
                        key={bundle._id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border w-full"
                      >
                        <div className="relative h-52 sm:h-64 md:h-72">
                          <img
                            src={bundle.bundleImage || "/default-course.png"}
                            alt={bundle.bundleName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-white text-xl sm:text-2xl font-bold">
                              {bundle.bundleName}
                            </h3>
                            <p className="text-sm text-gray-200">
                              {bundle?.completedLessons} of{" "}
                              {bundle?.totalLessons} lessons completed
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pt-4">
                          <div className="w-full h-3 bg-gray-300 rounded-full">
                            <div
                              className="h-3 bg-green-500 rounded-full transition-all"
                              style={{ width: `${bundle?.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-6">
                          <Link to={`/signup`}>
                            <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg font-medium hover:opacity-90 transition">
                              Continue Learning
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" /> Enrolled Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <Shimmer key={i} />)
                : enrolledCourses.map((course) => (
                    <div
                      key={course._id}
                      className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        <img
                          src={course.image || "/default-course.png"}
                          alt={course.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-2 text-gray-900">
                          {course.title}
                        </h4>

                        <div className="space-y-4">
                          <Link to={`/course/${course._id}/learn`}>
                            <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors font-medium">
                              Resume Course
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        </section>

        {/* Pro Upgrade Banner */}
        {suggestedBundle && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-300" />
                <h3 className="text-2xl font-bold">
                  {suggestedBundle?.bundleName}
                </h3>
              </div>
              <p className="text-lg text-indigo-100">
                {suggestedBundle?.description ||
                  "Get unlimited access to all premium content and lessons"}
              </p>

              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <img
                  src={
                    suggestedBundle?.bundleImage || "/default-bundle-image.png"
                  }
                  alt={suggestedBundle?.bundleName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></div>
                  <span>Access to {suggestedBundle?.totalLessons} lessons</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full"></div>
                  <span>
                    Progress: {suggestedBundle?.completedLessons} of{" "}
                    {suggestedBundle?.totalLessons} lessons
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
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap">
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
