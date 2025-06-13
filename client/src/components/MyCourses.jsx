import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Zap, Star, BookOpen } from "lucide-react";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

// A more detailed shimmer component that mimics the card layout
const CardShimmer = () => (
  <div className="animate-pulse space-y-4 rounded-xl bg-white p-4 shadow-md">
    <div className="bg-gray-200 aspect-video w-full rounded-lg" />
    <div className="space-y-3">
      <div className="bg-gray-200 h-5 w-3/4 rounded-md" />
      <div className="bg-gray-200 h-10 w-full rounded-lg" />
    </div>
  </div>
);

const MyCourses = () => {
  const user = useSelector((state) => state.user);
  // Note: Assuming bundles are fetched elsewhere and available in Redux state
  const bundles = useSelector((state) => state.bundle.bundles[0]); 
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledBundles, setEnrolledBundles] = useState([]);

  useEffect(() => {
    if (!user?._id) {
        setLoading(false); // If no user, stop loading
        return;
    }

    const fetchEnrolledItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/user/${user._id}/getCourses`, {
          withCredentials: true,
        });
        setEnrolledCourses(response.data?.data?.user?.courses || []);
        setEnrolledBundles(response.data?.data?.user?.bundles || []);
      } catch (error) {
        console.error("Failed to fetch enrolled courses/bundles:", error);
      } finally {
        // A small delay to make the shimmer effect noticeable and prevent flashing
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchEnrolledItems();
  }, [user?._id]);

  // This logic seems intended for a "suggested courses" feature, which isn't implemented in the UI.
  // It's kept here in case you want to add that feature later.
  // const enrolledCourseIds = enrolledCourses.map((course) => course._id);
  // const suggestedBundleId = enrolledCourses[0]?.bundle;
  // const suggestedBundle = bundles?.find((b) => b._id === suggestedBundleId) || bundles?.[0];
  // const suggestedCourses = suggestedBundle?.courses?.filter(
  //   (course) => !enrolledCourseIds.includes(course._id)
  // ) || [];

  const renderContent = () => {
    if (loading) {
      // --- LOADING STATE ---
      return (
        <div className="space-y-12">
          {/* Shimmer for Bundles */}
          <section className="space-y-6">
            <div className="animate-pulse bg-gray-200 h-8 w-1/3 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <CardShimmer key={i} />)}
            </div>
          </section>
          {/* Shimmer for Courses */}
          <section className="space-y-6">
             <div className="animate-pulse bg-gray-200 h-8 w-1/3 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <CardShimmer key={i} />)}
            </div>
          </section>
        </div>
      );
    }
    
    // --- LOADED STATE ---
    return (
      <div className="space-y-12">
        {/* Enrolled Bundles */}
        {enrolledBundles?.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Zap className="text-yellow-500 w-7 h-7" />
              My Bundles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledBundles.map((bundle) => (
                <div key={bundle._id} className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative">
                    <img
                      src={bundle.bundleImage || "/default-course.png"}
                      alt={bundle.bundleName}
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-lg font-bold">
                        {bundle.bundleName}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    {/* Add description or course count if available */}
                    <div className="flex-grow mb-4">
                        <p className="text-gray-600 text-sm line-clamp-2">{bundle.description || 'Access all courses included in this power-packed bundle.'}</p>
                    </div>
                    <Link to={`/bundle/${bundle._id}`} className="mt-auto">
                      <button className="w-full bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
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
        {enrolledCourses?.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <BookOpen className="text-orange-500 w-7 h-7" />
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <img
                    src={course.image || "/default-course.png"}
                    alt={course.title}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4 flex-grow flex flex-col">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex-grow">
                      {course.title}
                    </h4>
                    <Link to={`/course/${course._id}/learn`} className="mt-auto">
                      <button className="w-full bg-orange-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
                        Resume Course
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* No Content Message */}
        {!loading && enrolledCourses.length === 0 && enrolledBundles.length === 0 && (
            <div className="text-center py-16 px-6 bg-white shadow-md rounded-2xl border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800">Your Learning Journey Awaits!</h2>
                <p className="mt-2 text-gray-600">You haven't enrolled in any courses yet.</p>
                <Link to="/courses">
                    <button className="mt-6 bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                        Explore Courses
                    </button>
                </Link>
            </div>
        )}
      </div>
    );
  };

  return (
    <main className="flex-1 bg-orange-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            My Learning
          </h1>
          <p className="mt-2 text-lg text-gray-600">Welcome back! Let's pick up where you left off.</p>
        </div>
        
        {renderContent()}

        {/* Pro Upgrade Banner */}
        <div className="mt-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Star className="text-white w-7 h-7 fill-current" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Unlock Your Full Potential
              </h3>
            </div>
            <p className="text-base text-gray-700 max-w-2xl">
              Upgrade your bundle to gain exclusive access to premium courses, hands-on workshops, and become a pro at a lower price.
            </p>
          </div>
          <Link to={`/dashboard/mycourse/upgrade`}>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 text-base sm:text-lg whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Upgrade Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MyCourses;