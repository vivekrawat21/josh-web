import { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import { Link } from "react-router-dom";

const bundles = [
  {
    title: "Basic Bundle",
    description: "Start your journey with essential knowledge.",
    link: "/basicBundle",
    bgColor: "bg-gray-200", // Faded look
    textColor: "text-gray-700",
    btnColor: "bg-gradient-to-r from-gray-400 to-gray-500", // Less vibrantp
    headingBg: "bg-gray-300",
    ribbonBg: "bg-gradient-to-r from-yellow-800 to-yellow-600", // Brownish & faded
    ribbonText: "Basic",
    ribbonTextColor: "text-yellow-300",
    direction: "-100%", // Slide from Left
  },
  {
    title: "Intermediate Bundle",
    description: "Take your skills to the next level.",
    link: "/intermediateBundle",
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
    link: "/advanceBundle",
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

const SpecialBundles = () => {
  // const [bookImages, setBookImages] = useState([]);
  // const handleClick = (link)=>{
  //   Navigate(`/${link} `)
  // }
  // useEffect(() => {
  //   fetch("https://www.googleapis.com/books/v1/volumes?q=technology")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const images = data.items.slice(0, 3).map((item) => item.volumeInfo.imageLinks?.thumbnail);
  //       setBookImages(images);
  //     })
  //     .catch((error) => console.error("Error fetching book images:", error));
  // }, []);

  const bookDetails = [
    {
      title: "Freelancing Road To 1 lakhs",
      image: '/specialBundle1.jpg',
      titleColor: "#DAD5DD",
      link: "/basicBundle",
    },
    
    {
      title: "Freelancing Road To 3 Lakhs",
      image: '/specialBundle2.jpg',
      titleColor: "#AAB2D1",
      link: "/intermediateBundle",
    },

    {
      title: "Freelancing Road To 5 Lakhs",
      image: '/specialBundle3.jpg',
      titleColor: "#c7ccce",
      link: "/advanceBundle",
    }
  ];


  return (
    <section className="py-12 px-4">
      <h2 className="text-[1.80rem] lg:text-7xl font-semibold text-center  my-10 text-gray-900">
        Digital <span className="text-orange-500">Learning Bundles</span>
      </h2>

      
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 gap-20 max-w-[95%] mx-auto">
        {bookDetails.map((book, index) => (
          <Link to={book.link} key={index}>
            <div key={index} className="text-center">
              <div className="flex justify-center items-center rounded-t-md mb-1 " style={{ background: book.titleColor }}>
                <h3 className="my-2 text-xl font-semibold text-gray-700">
                  {book.title}
                </h3>
              </div>
              <img src={book.image} alt={book.title} className=" h-[80%] max-w-full object-contain rounded-lg z-10" />
            </div>
          </Link>
        ))}
        {/* {bundles.map((bundle, index) => (
          <Link to={bundle.link} key={index}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: bundle.direction }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }} // Smoother animation
            whileHover={{ scale: 1.08, rotate: 2 }}
            className={`relative p-5 rounded-xl ${bundle.bgColor} shadow-lg transition-all text-center`}
          >
            {/* Stylish Ribbon (Visible in Small Screens Too) */}
            {/* <div
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
                  className="w-[80%] h-80 sm:w-[80%] sm:h-80 rounded-lg shadow-md"
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <div className="w-[80%] h-44 sm:w-[80%] sm:h-80 bg-gray-300 rounded-lg animate-pulse" />
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
          </Link>
        ))} */} 
      </div>
    </section>
  );
};

export default SpecialBundles;
