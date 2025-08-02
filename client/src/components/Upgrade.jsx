import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { Loader, CheckCircle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const Upgrade = () => {
  const allBundles = useSelector((state) => state.bundle.bundles[0]) || [];
  const user = useSelector((state) => state.user);
  const bundleCount = user?.bundles?.length || 0;

  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const [loading, setLoading] = useState(true);
  let enrolledBundleId = null;

  if (user && bundleCount > 0) {
    enrolledBundleId = user.bundles[bundleCount - 1]?._id;
  }

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchEnrolledBundles = async () => {
      try {
        await axios.get(`${BASE_URL}/user/${user._id}/getBundles`);
      } catch (error) {
        console.error("Failed to fetch enrolled bundles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledBundles();
  }, [user]);

  const handleSelect = (bundleId) => {
    setSelectedBundleId(bundleId === selectedBundleId ? null : bundleId);
  };

  // === Determine Upgrades ===
  const enrolledBundle = bundleCount > 0
    ? allBundles.find(bundle => bundle._id.toString() === enrolledBundleId?.toString())
    : null;

  let availableUpgrades = [];

  if (bundleCount === 0) {
    availableUpgrades = allBundles;
  } else if (enrolledBundle) {
    availableUpgrades = allBundles.filter(
      (bundle) =>
        bundle._id.toString() !== enrolledBundleId.toString() &&
        bundle.price > enrolledBundle.price
    );
  }

  const sortedUpgrades = [...availableUpgrades].sort((a, b) => a.price - b.price);

  // === UI States ===
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">Finding Available Upgrades...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
              <div className="h-44 bg-gray-300 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
              <div className="h-10 bg-gray-300 rounded-lg w-1/2 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (user && !loading && bundleCount > 0 && sortedUpgrades.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-lg"
        >
          <Star className="mx-auto text-yellow-400 text-6xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">You Are Fully Upgraded!</h2>
          <p className="text-gray-600 mt-4">
            Congratulations! You have access to all our current bundles.
          </p>
          <Link
            to="/courses"
            className="mt-8 inline-block px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-transform hover:scale-105"
          >
            Explore More Courses
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Choose Your Next Level
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Select a bundle to unlock more courses and features. Your journey to mastery continues here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedUpgrades.map((bundle) => (
            <motion.div
              key={bundle._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 flex flex-col cursor-pointer transition-all duration-300 ${
                selectedBundleId === bundle._id
                  ? "border-orange-500 ring-4 ring-orange-500/20 transform scale-105"
                  : "border-transparent hover:border-orange-300"
              }`}
              onClick={() => handleSelect(bundle._id)}
            >
              <div className="relative">
                <img
                  src={bundle.bundleImage || "/placeholder.jpg"}
                  alt={bundle.bundleName}
                  className="h-48 w-full object-cover"
                />
                {selectedBundleId === bundle._id && (
                  <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
                    <CheckCircle className="text-orange-500" size={24} />
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                  {bundle.bundleName}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                  {bundle.description || "Unlock a new set of exclusive courses and learning materials."}
                </p>
                <div className="mt-5 text-right">
                  <span className="text-2xl font-extrabold text-orange-600">
                    {bundleCount > 0
                      ? formatPrice(bundle.price - enrolledBundle?.price)
                      : formatPrice(bundle.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedBundleId && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky bottom-0 left-0 right-0 py-4 mt-12 bg-white/80 backdrop-blur-sm border-t border-gray-200"
          >
            <div className="max-w-md mx-auto flex justify-center">
              <Link
                to={`/payment?type=bundle&courseId=${selectedBundleId}`}
                className="w-full sm:w-auto bg-orange-500 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-orange-600 transition flex items-center justify-center gap-3"
              >
                <span>Upgrade Now</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Upgrade;
