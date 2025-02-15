import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aman Sharma",
    course: "Full Stack Development",
    feedback: "This course gave me hands-on experience with MERN stack. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Priya Verma",
    course: "Digital Marketing",
    feedback: "Great insights into SEO and PPC. Loved the practical approach!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Rahul Mehta",
    course: "UI/UX Design",
    feedback: "Loved the Figma exercises and real-world projects. Very well structured!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Sneha Kapoor",
    course: "Data Science",
    feedback: "The projects helped me get a job! Very detailed and informative course.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Vikas Tiwari",
    course: "Cyber Security",
    feedback: "Practical labs were amazing! Helped me understand vulnerabilities and security threats.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Riya Sen",
    course: "Machine Learning",
    feedback: "The AI models and datasets were extremely helpful! Great learning experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

const TestimonialBento = () => {
  return (
    <div className="p-6 md:p-10 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">Testimonials</h2>
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl shadow-lg bg-white border-l-4 border-orange-500 hover:scale-[1.05] transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: [0, 2, -2, 0] }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.course}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <div className="flex mt-3">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <FaStar
                  key={starIndex}
                  className={`w-5 h-5 ${
                    starIndex < testimonial.rating ? "text-orange-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialBento;