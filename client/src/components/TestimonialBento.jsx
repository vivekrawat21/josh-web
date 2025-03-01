import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Aman Sharma", course: "Full Stack Development", feedback: "This course gave me hands-on experience with MERN stack. Highly recommended!", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Priya Verma", course: "Digital Marketing", feedback: "Great insights into SEO and PPC. Loved the practical approach!", rating: 4, image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Rahul Mehta", course: "UI/UX Design", feedback: "Loved the Figma exercises and real-world projects. Very well structured!", rating: 5, image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Sneha Kapoor", course: "Data Science", feedback: "The projects helped me get a job! Very detailed and informative course.", rating: 5, image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Vikas Tiwari", course: "Cyber Security", feedback: "Practical labs were amazing! Helped me understand vulnerabilities and security threats.", rating: 4, image: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Riya Sen", course: "Machine Learning", feedback: "The AI models and datasets were extremely helpful! Great learning experience!", rating: 5, image: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Rohan Das", course: "Cloud Computing", feedback: "AWS and Azure concepts were explained really well. Highly recommended!", rating: 4, image: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "Neha Khanna", course: "Business Analytics", feedback: "The case studies were super insightful. Great learning experience!", rating: 5, image: "https://randomuser.me/api/portraits/women/8.jpg" }
];

const TestimonialBento = () => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 6; // 3x2 grid
  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <div className="p-6 md:p-12 bg-orange-100 rounded-2xl shadow-lg">
      <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center text-gray-900 mb-4">
        Students <span className=" text-orange-500  ">Testimonials</span>
      </h2>

      {/* Mobile - Swipeable single view */}
      <div className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide md:hidden">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className="w-full p-6 mx-auto rounded-2xl shadow-lg bg-white border-l-4 border-orange-500 hover:scale-[1.05] transition-all snap-start"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{ minWidth: "100%", textAlign: "center" }}
          >
            <div className="flex flex-col items-center mb-3">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.course}</p>
            </div>
            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <div className="flex justify-center mt-3">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <FaStar key={starIndex} className={`w-5 h-5 ${starIndex < testimonial.rating ? "text-orange-500" : "text-gray-300"}`} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop - 3x2 Grid layout with navigation */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(index * itemsPerPage, (index + 1) * itemsPerPage).map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl shadow-lg bg-white border-l-4 border-orange-500 hover:scale-[1.05] transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.course}</p>
              <p className="text-gray-700 italic mt-2">"{testimonial.feedback}"</p>
              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar key={starIndex} className={`w-5 h-5 ${starIndex < testimonial.rating ? "text-orange-500" : "text-gray-300"}`} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={prevSlide} className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
            <FaChevronLeft />
          </button>
          <button onClick={nextSlide} className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialBento;
