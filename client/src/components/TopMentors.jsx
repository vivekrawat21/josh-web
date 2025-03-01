import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const mentors = [
  {
    name: 'John Doe',
    role: 'Senior Full Stack Developer',
    image: 'https://picsum.photos/400/500?random=1',
  },
  {
    name: 'Jane Smith',
    role: 'Expert Digital Marketer',
    image: 'https://picsum.photos/400/500?random=2',
  },
  {
    name: 'Robert Brown',
    role: 'AI & ML Specialist',
    image: 'https://picsum.photos/400/500?random=3',
  },
  {
    name: 'Emily Davis',
    role: 'Cloud & DevOps Engineer',
    image: 'https://picsum.photos/400/500?random=4',
  },
  {
    name: 'Michael Lee',
    role: 'Cybersecurity Expert',
    image: 'https://picsum.photos/400/500?random=5',
  },
];

export default function TopMentors() {
  const [current, setCurrent] = useState(0);
  const visibleMentors = 3;

  // Duplicate slides to create the infinite loop effect
  const extendedMentors = [...mentors, ...mentors];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % mentors.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-10 pb-2 px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center mb-4 text-gray-900">
        Meet <span className=" text-orange-500 font-semibold font-sans">Top Mentors</span>
      </h2>
      <div className="relative flex items-center justify-center w-full">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute -left-10 lg:left-10 z-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700  "
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="flex w-full max-w-6xl overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: `-${current * (100 / visibleMentors)}%` }}
            transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut' }}
            style={{
              width: `${extendedMentors.length * (100 / visibleMentors)}%`,
              display: 'flex',
            }}
          >
            {extendedMentors.map((mentor, index) => (
              <MentorCard key={index} mentor={mentor} />
            ))}
          </motion.div>
        </div>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute -right-10  lg:right-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700  md:block"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>
    </section>
  );
}

function MentorCard({ mentor }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex-shrink-0 w-1/3 px-4 group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg ">
        {/* Image */}
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-96 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 group-hover:from-black/95 flex items-end p-6">
          {/* Name & Role */}
          <div className="w-full text-left">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white text-xl font-bold"
            >
              {mentor.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-lg font-medium"
            >
              {mentor.role}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
