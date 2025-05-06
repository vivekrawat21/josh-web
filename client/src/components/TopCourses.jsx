import React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const TopCourses = () => {
  const { courses, loading, error } = useSelector((state) => state.course);
  const trendingCourses = courses[0]?.filter((course) => course.isTrending) || [];

  const user = useSelector((state) => state.user);
 
  const navigate = useNavigate();

  // Check if the user is enrolled
 
  const handleClick = (course) => {
    // const isEnrolled = user?.courses?.includes(course._id);
    const isEnrolled = user?.courses?.some(c => c._id.toString() === course._id.toString()
  );

   
    if(isEnrolled){
      navigate(`/course/${course._id}/learn`);
    }
    else {
 navigate(`/course/${course._id}`);
    }
  }
  return (
    <section className=" pb-6 px-4 md:px-10 w-full mx-auto text-center relative overflow-hidden mb-4  ">
      <h2 className="text-[1.80rem] lg:text-7xl font-semibold text-center  my-6 text-gray-900">
        Trending <span className="text-orange-500">Courses</span>
      </h2>

      <div className="relative">
        {loading ? (
          <p className="text-center text-gray-500 w-full">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500 w-full">Error: {error}</p>
        ) : trendingCourses.length === 0 ? (
          <p className="text-center text-gray-500 w-full">No trending courses available.</p>
        ) : (
          <Carousel className="relative flex items-center justify-center w-full">

          <CarouselPrevious
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none p-2 md:left-[-1rem]"
          >
            &#8592;
          </CarouselPrevious>
        
          <CarouselContent>
            {trendingCourses.map((course) => (
              <CarouselItem
                className="md:basis-1/3 lg:basis-1/4 flex justify-center "
                key={course._id}
              >
                <Card className="w-[95%] md:w-[85%] lg:w-[90%] flex flex-col ">
                  <CourseCard course={course} handleClick = {handleClick} />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        
          <CarouselNext
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none p-2 md:right-[-1rem]"
          >
            &#8594;
          </CarouselNext>
        
        </Carousel>
        
        )}
      </div>
    </section>
  );
};

function CourseCard({ course, handleClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const defaultImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex-shrink-0 w-full flex flex-col h-full"
    >
      <div className="relative overflow-hidden rounded-lg shadow-md flex flex-col items-center h-full px-2 py-2">
        {/* Image */}
        <img
          src={course.image || defaultImage}
          alt={course.title}
          className="h-36 md:h-40 w-full object-cover rounded-lg"
        />

        {/* Content Section */}
        <div className="p-4 md:px-3 flex flex-col text-center w-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {course?.title}
          </h3>

          <p className="mt-2 text-sm md:text-base text-gray-600 italic line-clamp-3">
            {course?.description  || "No description available"}
          </p>

          {/* Duration and Button (moved here) */}
          <div className="mt-4 flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-gray-700 font-medium">
              <Clock size={18} className="text-orange-500" />
              <span className="text-sm md:text-base">
              {course?.duration
  ? `${course.duration.charAt(0)} Months`
  : "No description available"}

              </span>
            </div>

            {/* <Link to={courseLink} className="w-full"> */}
              <Button onClick={() => handleClick(course)}
className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 rounded-lg shadow-md">
                View Program
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default TopCourses;
