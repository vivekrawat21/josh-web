import React, { useEffect, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { BASE_URL } from "@/utils/utils";

// Fallback testimonials using adminTestimonial fields
const fallbackTestimonials = [
  {
    name: "Aman Sharma",
    course: "Full Stack Development",
    testimonialText: "This course gave me hands-on experience with MERN stack. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Priya Verma",
    course: "Digital Marketing",
    testimonialText: "Great insights into SEO and PPC. Loved the practical approach!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Rahul Mehta",
    course: "UI/UX Design",
    testimonialText: "Loved the Figma exercises and real-world projects. Very well structured!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Sneha Kapoor",
    course: "Data Science",
    testimonialText: "The projects helped me get a job! Very detailed and informative course.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Vikas Tiwari",
    course: "Cyber Security",
    testimonialText: "Practical labs were amazing! Helped me understand vulnerabilities and security threats.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Riya Sen",
    course: "Machine Learning",
    testimonialText: "The AI models and datasets were extremely helpful! Great learning experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Rohan Das",
    course: "Cloud Computing",
    testimonialText: "AWS and Azure concepts were explained really well. Highly recommended!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Neha Khanna",
    course: "Business Analytics",
    testimonialText: "The case studies were super insightful. Great learning experience!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    isVideo: false,
    videoUrl: ""
  },
  {
    name: "Sanjay Raut",
    course: "AI Capstone",
    testimonialText: "",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    isVideo: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Tanvi Batra",
    course: "Web3 Development",
    testimonialText: "",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    isVideo: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Jatin Rawat",
    course: "DevOps Bootcamp",
    testimonialText: "",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    isVideo: true,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "Ayesha Singh",
    course: "Mobile App Development",
    testimonialText: "The Flutter tutorials were hands-on and well-explained. Love the outcome!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    isVideo: false,
    videoUrl: ""
  }
];

// Replace with your actual API endpoint
const API_URL = `${BASE_URL}/studenttestimonials`;

const mapBackendTestimonial = (t) => ({
  name: t.name,
  course: t.course,
  testimonialText: t.testimonialText || "",
  rating: t.rating || 5,
  image: t.image,
  isVideo: t.isVideo || false,
  videoUrl: t.videoUrl || ""
});

const TestimonialBento = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 6;

  // Calculate maxIndex for pagination
  const maxIndex = Math.max(0, Math.ceil(testimonials.length / itemsPerPage) - 1);

  useEffect(() => {
    const fetchBackendTestimonials = async () => {
      try {
        const res = await fetch(API_URL, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        // Detect array from backend (adjust if your API returns differently)
        const arr = data.data?.testimonials || data.testimonials || data;
        if (Array.isArray(arr) && arr.length > 0) {
          setTestimonials(arr.map(mapBackendTestimonial));
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch {
        setTestimonials(fallbackTestimonials);
      }
    };
    fetchBackendTestimonials();
  }, []);

  const nextSlide = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  const prevSlide = () => setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

  // Hide arrows if all testimonials fit on one page
  const showArrows = testimonials.length > itemsPerPage;

  return (
    <div className="pt-2 md:pt-5 px-2 md:px-12 bg-orange-100 shadow-lg pb-3">
      <h2 className="text-2xl md:text-5xl font-bold text-center my-6 text-gray-900">
        Students <span className="text-orange-500">Testimonials</span>
      </h2>

      {/* Mobile View */}
      <div className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide md:hidden h-full  py-4">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className="min-w-[88%] mx-auto px-3 rounded-xl shadow-md  border-l-4 border-orange-500 snap-start   flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.6, delay: i * 0.1 }}
          >
            {!testimonial.isVideo && (
              <div className="flex justify-center py-2  h-32 ">
                <img src={testimonial.image} alt={testimonial.name} className="rounded-full object-cover" />
              </div>
            )}
            {testimonial.isVideo ? (
              <>
                  <iframe
                    src={testimonial.videoUrl}
                    className="h-[260px] w-[95%] rounded-md object-cover mx-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="testimoial video Video"
                  ></iframe>
                  

                <div className="text-center">
                  <h3 className="text-md font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mt-1 ">
                  <h3 className="text-md font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
                <p className="text-gray-700 italic text-sm text-center px-1 mt-1">
                  "{testimonial.testimonialText}"
                </p>
                <div className="flex justify-center pb-2 ">
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
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </div>
              {testimonial.isVideo ? (
                <iframe
                src={testimonial.videoUrl}
                className="w-full h-40 rounded-md object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="testimoial video Video"
              ></iframe>
                
              ) : (
                <>
                  <p className="text-gray-700 italic mt-2">"{testimonial.testimonialText}"</p>
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
        {showArrows && (
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prevSlide} className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialBento;