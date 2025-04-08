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
import { Link } from "react-router-dom";

const TopCourses = () => {
  const { courses, loading, error } = useSelector((state) => state.course);
  const trendingCourses = courses[0]?.filter((course) => course.isTrending) || [];

  return (
    <section className="mt-8 pb-6 px-4 md:px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center my-10 text-gray-900">
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
          <Carousel className="relative flex items-center justify-center">
            <CarouselPrevious className="absolute left-0 z-10 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none">
              &#8592;
            </CarouselPrevious>

            <CarouselContent>
              {trendingCourses.map((course) => (
                <CarouselItem
                  className="md:basis-1/3 lg:basis-1/4 flex justify-center"
                  key={course._id}
                >
                  <Card className="w-[95%] md:w-[85%] lg:w-[80%] h-[450px] flex flex-col">
                    <CourseCard course={course} />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext className="absolute right-2 z-10 p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none">
              &#8594;
            </CarouselNext>
          </Carousel>
        )}
      </div>
    </section>
  );
};

function CourseCard({ course }) {
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
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md py-4 px-3 flex flex-col items-center h-full">
        {/* Image Section */}
        <img
          src={course.image || defaultImage}
          alt={course.title}
          className="h-36 md:h-40 w-full object-cover rounded-lg"
        />

        {/* Content Section */}
        <div className="p-4 md:p-5 flex flex-col text-center flex-grow w-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {course?.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-500 italic h-14 overflow-hidden line-clamp-2">
            {course?.description?.length > 100
              ? `${course?.description.slice(0, 100)}...`
              : course?.description || "No description available"}
          </p>

          {/* Duration Section */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-gray-700 font-medium">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm md:text-base">
              {course.duration || "6 Months"}
            </span>
          </div>

          {/* Button always at the bottom */}
          <div className="mt-auto pt-4 w-full">
            <Link to={`/course/${course._id}`}>
              <Button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md w-full">
                View Program
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TopCourses;
