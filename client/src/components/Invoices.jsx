import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { Book, Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// A responsive shimmer component for a better loading experience
const CoursesShimmer = () => (
  <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg bg-white p-6 sm:p-8 animate-pulse">
    <div className="h-8 w-1/3 bg-gray-300 rounded-md mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-8"></div>
    
    {/* Shimmer for mobile (Card view) */}
    <div className="space-y-4 md:hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-lg space-y-3">
            <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
        </div>
      ))}
    </div>

    {/* Shimmer for desktop (Table view) */}
    <div className="hidden md:block">
      <div className="bg-gray-200 h-12 w-full rounded-t-lg"></div>
      <div className="space-y-2 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-100 h-14 w-full rounded-md"></div>
        ))}
      </div>
    </div>
  </div>
);

const ITEMS_PER_PAGE = 5;

const Invoices = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?._id) {
        setLoading(false);
        return;
    }
    const fetchUserItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/user/${user._id}/getCourses`,
          { withCredentials: true }
        );
        const courses = response.data?.data?.user?.courses || [];
        const bundles = response.data?.data?.user?.bundles || [];
        const combinedItems = [
          ...courses.map(item => ({ ...item, type: 'Course', name: item.title, price: item.price })),
          ...bundles.map(item => ({ ...item, type: 'Bundle', name: item.bundleName, price: item.price })),
        ];
        setPurchasedItems(combinedItems);
      } catch (error) {
        console.error("Failed to fetch user courses:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchUserItems();
  }, [user?._id]);

  // Reset visibleCount if purchasedItems changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [purchasedItems.length]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  const handleLoadLess = () => setVisibleCount(ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50/50 p-4 sm:p-6 lg:p-8 flex justify-center">
        <CoursesShimmer />
      </div>
    );
  }

  const hasMore = purchasedItems.length > visibleCount;

  return (
    <div className="min-h-screen bg-orange-50/50 p-4 sm:p-6 lg:p-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-4xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Purchases</h1>
        <p className="text-gray-600 mb-8">
          A history of all your purchased courses and bundles.
        </p>

        {purchasedItems.length === 0 ? (
          <div className="text-center py-16 px-6 border-2 border-dashed border-gray-200 rounded-xl">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">No Purchases Yet</h3>
            <p className="mt-1 text-gray-500">Looks like you haven't bought any courses or bundles.</p>
            <Link to="/courses">
              <button className="mt-6 bg-orange-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                Explore Courses
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {/* ---- Cards for Mobile View ---- */}
            <div className="space-y-4 md:hidden">
              {purchasedItems.slice(0, visibleCount).map((item, index) => (
                <motion.div
                  key={item._id + item.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="font-bold text-gray-800 text-lg">{item.name}</div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full font-medium ${
                        item.type === 'Course' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type === 'Course' ? <Book size={14} /> : <Package size={14} />}
                      {item.type}
                    </span>
                    <span className="font-semibold text-lg text-orange-600">
                      ₹{item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* ---- Table for Desktop View ---- */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-orange-800 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-orange-800 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-orange-800 uppercase tracking-wider">
                      Price (INR)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchasedItems.slice(0, visibleCount).map((item, index) => (
                    <motion.tr
                      key={item._id + item.type}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-sm font-medium ${
                            item.type === 'Course' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.type === 'Course' ? <Book size={14} /> : <Package size={14} />}
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-orange-600">
                        ₹{item.price}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ---- Load More / Load Less Buttons ---- */}
            {purchasedItems.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-6 gap-3">
                {hasMore ? (
                  <button
                    onClick={handleLoadMore}
                    className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition"
                  >
                    Load More
                  </button>
                ) : (
                  <button
                    onClick={handleLoadLess}
                    className="bg-orange-100 text-orange-700 font-semibold py-2 px-6 rounded-lg hover:bg-orange-200 transition"
                  >
                    Load Less
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Invoices;