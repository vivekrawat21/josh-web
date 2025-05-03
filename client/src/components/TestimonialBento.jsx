import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  },
  {
    name: "Rohan Das",
    course: "Cloud Computing",
    feedback: "AWS and Azure concepts were explained really well. Highly recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    name: "Neha Khanna",
    course: "Business Analytics",
    feedback: "The case studies were super insightful. Great learning experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    name: "Sanjay Raut",
    course: "AI Capstone",
    video: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    image: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    name: "Tanvi Batra",
    course: "Web3 Development",
    video: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    image: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    name: "Jatin Rawat",
    course: "DevOps Bootcamp",
    video: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Ayesha Singh",
    course: "Mobile App Development",
    feedback: "The Flutter tutorials were hands-on and well-explained. Love the outcome!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];



const TestimonialBento = () => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 6;
  const maxIndex = Math.floor(testimonials.length / itemsPerPage) - 1;

  const nextSlide = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  const prevSlide = () => setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

  return (
    <div className="pt-2 md:pt-5 px-2 md:px-12 bg-orange-100 shadow-lg pb-3">
      <h2 className="text-2xl md:text-6xl font-bold text-center my-6 text-gray-900">
        Students <span className="text-orange-500">Testimonials</span>
      </h2>

      {/* Mobile View */}
      <div className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide md:hidden pb-4">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className="min-w-[88%] mx-auto p-3 rounded-xl shadow-md bg-white border-l-4 border-orange-500 snap-start h-[370px] flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6, delay: i * 0.1 }}
          >
            { !testimonial.video &&
            <div className="flex justify-center mb-1 ">
              <img src={testimonial.image} alt={testimonial.name} className="rounded-full" />
            </div>
}
            {testimonial.video ? (
              <>
                <video
                  src={testimonial.videoUrl}
                  controls
                  className="h-60 w-[95%] rounded-md object-cover mx-auto"
                />
                <div className="text-center">
                  <h3 className="text-md font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </>
            ) : (
              <>
                 <div className="text-center mt-1">
                  <h3 className="text-md font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
                <p className="text-gray-700 italic text-sm text-center px-1 mt-1 ">"{testimonial.feedback}"</p>
                <div className="flex justify-center ">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`${starIndex < testimonial.rating ? "text-orange-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
             
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(index * itemsPerPage, (index + 1) * itemsPerPage).map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-4 rounded-xl shadow-md bg-white border-l-4 border-orange-500 transition-all hover:scale-[1.02]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </div>
              {testimonial.video ? (
                <video
                  src={testimonial.videoUrl}
                  controls
                  className="w-full h-40 rounded-md object-cover"
                />
              ) : (
                <>
                  <p className="text-gray-700 italic mt-2">"{testimonial.feedback}"</p>
                  <div className="flex justify-center mt-3">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={`w-5 h-5 ${starIndex < testimonial.rating ? "text-orange-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
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
