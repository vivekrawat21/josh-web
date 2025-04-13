import React from "react";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const user = useSelector((state) => state.user);
  const bundles = useSelector((state) => state.bundle.bundles[0]);
  console.log(user);
  const enrolledBundle = user?.bundles;
  console.log("enrolled bundle " , enrolledBundle);
  const enrolledCourses = user?.courses || [];
  const enrolledCourseIds = enrolledCourses.map((course) => course._id);
  const suggestedBundleId = enrolledCourses[0]?.bundle;
  const suggestedBundle = bundles?.find((b) => b._id === suggestedBundleId);

  const suggestedCourses =
    suggestedBundle?.courses?.filter(
      (course) => !enrolledCourseIds.includes(course._id)
    ) || [];

  return (
    <div className="w-full px-4 py-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        My Learning Journey
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          {enrolledBundle &&  enrolledBundle.length > 1  &&  (
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" /> Enrolled Bundles
            </h2>
            <div className="space-y-6">
              {enrolledBundle &&
                enrolledBundle.map((bundle) => (
                  <div
                    key={bundle._id}
                    className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <div className="relative h-64 md:h-56">
                      <img
                        src={bundle.bundleImage || "/default-course.png"}
                        alt={bundle.bundleName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-2xl font-bold">
                          {bundle.bundleName}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {bundle?.completedLessons} of {bundle?.totalLessons}{" "}
                          lessons completed
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
                      <p className="text-sm text-right text-gray-600 mt-1">
                        {bundle?.progress}% Complete
                      </p>
                    </div>
                    <div className="p-6">
                      {/* <Link to={`/course/${course._id}/learn`}>
                       */}
                      <Link to={`/signup}`}>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="relative h-48 sm:h-40">
                    <img
                      src={course.image || "/default-course.png"}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-3">
                      <h3 className="text-white text-lg font-semibold">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {course.completedLessons} of {course.totalLessons}{" "}
                        lessons completed
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pt-3">
                    <div className="w-full h-2 bg-gray-300 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-gray-600 mt-1">
                      {course.progress}% Complete
                    </p>
                  </div>
                  <div className="p-4">
                    <Link to={`/course/${course._id}/learn`}>
                      <button className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-md hover:opacity-90">
                        Continue Learning
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Courses */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" /> Suggested
              Courses
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {suggestedCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-md transition group"
                >
                  <div className="relative h-48 sm:h-40">
                    <img
                      src={course.image || "/https://iili.io/3ugWxII.png"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-0 right-0 p-2">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md flex items-center">
                        <Star className="w-4 h-4 mr-1" /> {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {course.title}
                    </h3>
                    <div className="flex items-baseline justify-end space-x-2 mt-2">
                      <span className="text-sm line-through text-gray-500">
                        {course.oldPrice?.toFixed(2) || " "}
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        ₹{course.price?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link to={`/course/${course._id}`}>
                      <button className="w-full py-2 border border-gray-300 rounded-md group-hover:bg-orange-500 group-hover:text-white transition">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="text-white overflow-hidden rounded-lg">
            <div className="relative h-48">
              <img
                src={suggestedBundle?.bundleImage || ""}
                alt="Upgrade your learning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-indigo-600">
              <div className="p-4">
                <h3 className="text-2xl font-semibold">
                  {suggestedBundle?.bundleName}
                </h3>
                <p className="text-purple-100">
                  Get access to all courses and exclusive content
                </p>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {suggestedBundle?.whyBundle?.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <Link to={`/bundle/${suggestedBundle?._id}`}>
                  <button className="w-full py-2 px-4 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition">
                    Upgrade to Pro
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Progress Box */}
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
              <h3 className="text-lg font-semibold">Your Progress</h3>
            </div>
            <div className="p-4 text-center">
              <span className="text-4xl font-bold text-gray-700">
                {enrolledCourses.length}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                courses in progress
              </span>
              <div className="mt-4">
                <span className="inline-block w-full py-2 px-4 text-blue-600 border border-blue-300 rounded-md">
                  Keep up the good work!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
