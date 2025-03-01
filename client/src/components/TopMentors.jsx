import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInView } from "react-intersection-observer";

import { motion } from "framer-motion";
const mentors = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Full Stack Developer",
    image: "https://picsum.photos/400/500?random=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Expert Digital Marketer",
    image: "https://picsum.photos/400/500?random=2",
  },
  {
    id: 3,
    name: "Robert Brown",
    role: "AI & ML Specialist",
    image: "https://picsum.photos/400/500?random=3",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Cloud & DevOps Engineer",
    image: "https://picsum.photos/400/500?random=4",
  },
  {
    id: 5,
    name: "Michael Lee",
    role: "Cybersecurity Expert",
    image: "https://picsum.photos/400/500?random=5",
  },
];

const TopMentor = () => {
  
  return (
    <section className="mt-8 pb-2 px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className=" text-[1.80rem] lg:text[2.20rem] font-bold text-center  mb-4 text-gray-900">
        Meet{" "}
        <span className="text-[1.70rem] sm:text-[2.70rem] text-orange-500 font-semibold font-sans">
          Top Mentors
        </span>
      </h2>

      <Carousel className="relative flex items-center justify-center w-full">
        <CarouselContent>
          {mentors.map((mentor) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={mentor.id}>
            
                <Card className="w-[80%] h-[70%] md:w-[80%] mx-auto">
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                    <MentorCard key={mentor.id} mentor={mentor} />
                  {/* </CardContent> */}
                </Card>
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
function MentorCard({ mentor }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex-shrink-0  group" // Changed to w-full
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg ">
        {/* Image */}
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-[80%] object-cover transform transition-transform duration-300 group-hover:scale-105" // Ensure full width and height
        />
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 group-hover:from-black/95 flex items-end p-6">
          {/* Name & Role */}
          <div className=" text-left">
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

export default TopMentor; 