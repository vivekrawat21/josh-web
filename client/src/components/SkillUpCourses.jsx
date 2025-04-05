import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const mockCourses = [
  { id: 1, title: 'Design', image: 'https://via.placeholder.com/300x200.png?text=Design' },
  { id: 2, title: 'Marketing', image: 'https://via.placeholder.com/300x200.png?text=Marketing' },
  { id: 3, title: 'Lifestyle', image: 'https://via.placeholder.com/300x200.png?text=Lifestyle' },
  { id: 4, title: 'Health & Fitness', image: 'https://via.placeholder.com/300x200.png?text=Health+&+Fitness' },
  { id: 5, title: 'Business', image: 'https://via.placeholder.com/300x200.png?text=Business' },
  { id: 6, title: 'Technology', image: 'https://via.placeholder.com/300x200.png?text=Technology' },
  { id: 7, title: 'Photography', image: 'https://via.placeholder.com/300x200.png?text=Photography' },
  { id: 8, title: 'Personal Development', image: 'https://via.placeholder.com/300x200.png?text=Personal+Development' }
];

const SkillUpCourses = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const cours = useSelector((state) => state.course);



  const courses = cours?.courses[0]?.map((course) => {

    return {id: course?._id,
    title: course?.title,
    image: course?.image || 'https://media.istockphoto.com/id/1361705523/vector/online-education-flat-illustration-concept-e-learning-online-courses-concept.jpg?s=612x612&w=is&k=20&c=GaaLffPw2ySxzT_FZxjosn1G9N0QFGEGI2gKz2-x2dc='
  }

  });  

  // Dynamically set how many items to show based on screen width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerSlide(4);
      } else if (width >= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const slideCount = Math.ceil(courses?.length / itemsPerSlide);

  const getVisibleCourses = () => {
    const start = index * itemsPerSlide;
    console.log(courses)
    return courses?.slice(start, start + itemsPerSlide);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1 < slideCount ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : slideCount - 1));
  };

  // ✅ Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [itemsPerSlide, slideCount]);

  return (
    <section className="mt-8 pb-6 px-4 md:px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-[1.80rem] lg:text-7xl font-semibold text-center my-3 text-gray-900">
        Choose Your <span className="text-orange-500">Course</span>
      </h2>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
        Invest in your future with our dynamic upskilling courses.
      </p>

      <div className="relative w-full mx-auto mt-10 overflow-hidden" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ duration: 0.6 }}
            className={`grid gap-6 grid-cols-${itemsPerSlide}`}
          >
            {getVisibleCourses()?.map((course) => (
              <div 
                key={course.id}
                className="bg-gray-100 shadow-sm flex flex-col items-center rounded-sm"
              >
                <Link to={`/course/${course.id}`}>
                <div className="w-5/6 h-60 overflow-hidden bg-gray-100 rounded-r-full rounded-l-[30px] mt-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-r-full"
                  />
                </div>
                </Link>
                <h3 className="text-xl  font-extrabold from-neutral-900 text-gray-900 mt-8">
              {course.title}
                </h3>
              </div>
              
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex lg:justify-end justify-center space-x-4 mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-full shadow-lg hover:bg-orange-300 hover:text-white transition flex items-center"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-full shadow-lg hover:bg-orange-300 hover:text-white transition flex items-center"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    
      <div className="flex justify-center mt-6">
      <Link to={"/courses"}>  <button className="px-6 py-2 border-2 border-orange-300 text-orange-500 rounded-sm shadow-lg hover:bg-orange-50 transition ">
          Explore All Courses
        </button>
        </Link>
      </div>
    </section>
  );
};

export default SkillUpCourses;
