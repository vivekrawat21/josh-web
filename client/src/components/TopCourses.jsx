import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    title: "Full Stack Development",
    duration: "36 Months",
    description: "Master front-end and back-end technologies with real-world projects.",
    image: 'https://www.cdmi.in/courses@2x/full-stack.webp',
  },
  {
    title: "Digital Marketing",
    duration: "24 Months",
    description: "Learn SEO, social media, and paid advertising to grow businesses online.",
    image: 'https://theincmagazine.com/wp-content/uploads/2023/11/Digital-Marketing-Strategies-Unlocking-Success-in-the-Online-Realm.jpg',
  },
  {
    title: "Data Science",
    duration: "30 Months",
    description: "Analyze data and build AI models to solve complex business problems.",
    image: "https://imgs.search.brave.com/V1rthFn3fU4KL4sh4XldDz5lFenFzq-RfXWJMnvxIfE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kYXRhLXNjaWVu/Y2UtYnVzaW5lc3Mt/aW50ZXJuZXQtdGVj/aG5vbG9neS1jb25j/ZXB0LXNlcnZlci1y/b29tLWJhY2tncm91/bmRfMTYxNDUyLTk3/NTguanBnP3NlbXQ9/YWlzX2h5YnJpZA"
  }
];

export default function TopCoursesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % courses.length);
  };

  return (
    <div className="w-full mb-10">
      <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center text-gray-900  mb-4 ">Top <span className=' text-orange-500 font-semibold font-sans'>Courses</span></h2>
      <div className="relative flex items-center justify-center overflow-hidden">
        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full">
          <ChevronLeft size={24} />
        </button>

        <div className="flex space-x-4 overflow-hidden">
          <AnimatePresence initial={false} custom={currentIndex}>
            {courses.slice(currentIndex, currentIndex + itemsPerPage).map((course) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center transform hover:scale-105 transition-transform"
              >
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="mt-4 text-xl font-semibold">{course.title}</h3>
                <p className="mt-1 text-sm italic text-gray-500">{course.description}</p>
                
                {/* Duration Section with Icon */}
                <div className="mt-3 flex items-center space-x-2 text-gray-700 font-medium">
                  <Clock size={18} className="text-orange-500" />
                  <span>Duration: {course.duration}</span>
                </div>

                {/* Buttons - Adjusted spacing */}
                <div className="mt-6 flex justify-center w-full space-x-3">
                  <Button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md">View Program</Button>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
                    <Download size={16} className="mr-2" /> Syllabus
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
