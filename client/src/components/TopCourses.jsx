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
import { Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "Full Stack Development",
    duration: "36 Months",
    description:
      "Master front-end and back-end technologies with real-world projects.",
    image: "https://www.cdmi.in/courses@2x/full-stack.webp",
  },
  
  {
    id: 2,
    title: "Digital Marketing",
    duration: "24 Months",
    description:
      "Learn SEO, social media, and paid advertising to grow businesses online.",
    image:
      "https://theincmagazine.com/wp-content/uploads/2023/11/Digital-Marketing-Strategies-Unlocking-Success-in-the-Online-Realm.jpg",
  },
  {
    id: 3,
    title: "Data Science",
    duration: "30 Months",
    description:
      "Analyze data and build AI models to solve complex business problems.",
    image:
      "https://imgs.search.brave.com/V1rthFn3fU4KL4sh4XldDz5lFenFzq-RfXWJMnvxIfE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kYXRhLXNjaWVu/Y2UtYnVzaW5lc3Mt/aW50ZXJuZXQtdGVj/aG5vbG9neS1jb25j/ZXB0LXNlcnZlci1y/b29tLWJhY2tncm91/bmRfMTYxNDUyLTk3/NTguanBnP3NlbXQ9/YWlzX2h5YnJpZA",
  },
  {
    id: 4,
    title: "Public Speaking",
    duration: "40 Months",
    description:
      "Enhance your communication skills and become a confident speaker.",
    image: "https://www.cdmi.in/courses@2x/full-stack.webp",
  },
  {
    id: 5,
    title: "Digital Marketing",
    duration: "6 Months",
    description:
      "Master Digit Marketing with Social Media, SEO, and Email Marketing.",
    image: "https://www.cdmi.in/courses@2x/full-stack.webp",
  },
];

const TopCourses = () => {
  return (
    <section className="mt-8 pb-6 px-4 md:px-10 w-full mx-auto text-center relative overflow-hidden my-14">
     <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center mb-4 text-gray-900">
        Trending <span className=" text-orange-500  ">Courses</span>
      </h2>

      <div className="relative">
        <Carousel className="relative flex items-center justify-center w-full">
          <CarouselPrevious className="absolute left-0 z-10  p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none">
            &#8592; 
          </CarouselPrevious>

          <CarouselContent>
            {courses.map((course) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                key={course.id}
              >
                <Card className="w-[90%] md:w-[80%] mx-auto mb-8 md:mb-0">
                  <CourseCard key={course.id} course={course} />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute right-2 z-10  p-2 bg-gray-100 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none">
            &#8594; {/* Right arrow */}
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

function CourseCard({ course }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex-shrink-0 group"
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md py-4 px-2">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 md:h-48 object-cover rounded-lg"
        />
        <div className="p-4 md:p-6 flex flex-col items-center text-center">
          <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800">
            {course.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-500 italic">
            {course.description}
          </p>

          {/* Duration Section with Icon */}
          <div className="mt-4 flex items-center space-x-2 text-gray-700 font-medium text-center">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm md:text-base">
              Duration: {course.duration}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center w-full space-x-3">
            <Button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-md">
              View Program
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-3 md:px-4 py-2 rounded-lg shadow-md flex items-center">
              <Download size={16} className="mr-2" /> Syllabus
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TopCourses;
