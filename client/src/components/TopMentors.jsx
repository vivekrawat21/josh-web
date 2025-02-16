import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const mentors = [
  {
    name: 'John Doe',
    description: 'Senior Full Stack Developer with 10+ years of experience.',
    image: 'https://picsum.photos/400/500?random=1',
  },
  {
    name: 'Jane Smith',
    description: 'Expert Digital Marketer helping brands scale.',
    image: 'https://picsum.photos/400/500?random=2',
  },
  {
    name: 'Robert Brown',
    description: 'AI & ML Specialist working on cutting-edge tech.',
    image: 'https://picsum.photos/400/500?random=3',
  },
  {
    name: 'Emily Davis',
    description: 'Cloud Computing and DevOps expert.',
    image: 'https://picsum.photos/400/500?random=4',
  },
  {
    name: 'Michael Lee',
    description: 'Cybersecurity expert ensuring digital safety.',
    image: 'https://picsum.photos/400/500?random=5',
  },
];

export default function TopMentors() {
  const [current, setCurrent] = useState(0);
  const visibleMentors = 3;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % mentors.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + mentors.length) % mentors.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-10 w-screen mx-auto text-center relative overflow-hidden  my-16">
     <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900">Meet  <span className='text-4xl text-orange-500 font-semibold font-sans'> Top Mentors</span></h2>
      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={prevSlide}
          className="absolute left-5 z-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div className="flex w-full max-w-7xl overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            initial={{ x: 0 }}
            animate={{ x: `-${current * (100 / visibleMentors)}%` }}
            transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut' }}
            style={{ width: `${mentors.length * (100 / visibleMentors)}%` }}
          >
            {mentors.concat(mentors).map((mentor, index) => (
              <div key={index} className="relative flex-shrink-0 w-1/3 px-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 text-black p-4 rounded-lg shadow-md w-5/6">
                  <h3 className="text-lg font-bold">{mentor.name}</h3>
                  <p className="text-sm">{mentor.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-5 z-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700"
        >
          <FaArrowRight className="text-xl" />
        </button>
      </div>
    </section>
  );
}
