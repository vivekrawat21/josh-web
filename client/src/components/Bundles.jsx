import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bundles = [
  {
    title: "Basic Bundle",
    description: "Start your journey with essential knowledge.",
    link: "/basic-bundle",
    bgColor: "bg-gray-200", // Faded look
    textColor: "text-gray-700",
    btnColor: "bg-gradient-to-r from-gray-400 to-gray-500", // Less vibrant
    headingBg: "bg-gray-300",
    ribbonBg: "bg-gradient-to-r from-yellow-800 to-yellow-600", // Brownish & faded
    ribbonText: "Basic",
    ribbonTextColor: "text-yellow-300",
    direction: "-100%", // Slide from Left
  },
  {
    title: "Intermediate Bundle",
    description: "Take your skills to the next level.",
    link: "/intermediate-bundle",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
    btnColor: "bg-gradient-to-r from-orange-500 to-orange-700",
    headingBg: "bg-orange-200",
    ribbonBg: "bg-gray-200", // Brighter Silver
    ribbonText: "Intermediate",
    ribbonTextColor: "text-gray-900",
    direction: "100%", // Slide from Right
  },
  {
    title: "Pro Bundle",
    description: "Master your craft with expert insights.",
    link: "/pro-bundle",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    btnColor: "bg-gradient-to-r from-yellow-400 to-yellow-600", // Gold Gradient
    headingBg: "bg-blue-200",
    ribbonBg: "bg-gradient-to-r from-yellow-300 to-yellow-500", // Shiny gold
    ribbonText: "Pro",
    ribbonTextColor: "text-yellow-900",
    direction: "-100%", // Slide from Left
  },
];

const Bundles = () => {
  const [bookImages, setBookImages] = useState([]);

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=technology")
      .then((response) => response.json())
      .then((data) => {
        const images = data.items.slice(0, 3).map((item) => item.volumeInfo.imageLinks?.thumbnail);
        setBookImages(images);
      })
      .catch((error) => console.error("Error fetching book images:", error));
  }, []);

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Digital <span className="text-orange-500">Learning Bundles</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bundles.map((bundle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: bundle.direction }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }} // Smoother animation
            whileHover={{ scale: 1.08, rotate: 2 }}
            className={`relative p-5 rounded-xl ${bundle.bgColor} shadow-lg transition-all text-center`}
          >
            {/* Stylish Ribbon (Visible in Small Screens Too) */}
            <div
              className={`absolute -top-2 right-2 px-5 py-2 ${bundle.ribbonBg} ${bundle.ribbonTextColor} text-xs sm:text-sm font-bold rounded-tl-lg rounded-br-lg shadow-md`}
            >
              {bundle.ribbonText}
            </div>

            <div className={`p-2 rounded-lg ${bundle.headingBg}`}>
              <h3 className={`text-xl font-bold ${bundle.textColor}`}>{bundle.title}</h3>
              <p className={`text-sm mt-1 ${bundle.textColor} opacity-80`}>{bundle.description}</p>
            </div>

            <div className="flex justify-center mt-3">
              {bookImages[index] ? (
                <motion.img
                  src={bookImages[index]}
                  alt={bundle.title}
                  className="w-32 h-44 sm:w-40 sm:h-56 rounded-lg shadow-md"
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <div className="w-32 h-44 sm:w-40 sm:h-56 bg-gray-300 rounded-lg animate-pulse" />
              )}
            </div>

            <div className="flex justify-center mt-4">
              <motion.a
                href={bundle.link}
                className={`px-6 py-3 text-sm sm:text-base rounded-lg text-white ${bundle.btnColor} shadow-lg transform transition-all`}
                whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)" }}
              >
                Explore
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Bundles;
