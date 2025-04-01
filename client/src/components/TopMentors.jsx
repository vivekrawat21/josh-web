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
import { motion } from "framer-motion";

// import React from "react";

// import { Card } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";

const mentors = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Full Stack Developer",
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZ1bGwgc3RhY2t8ZW58MHx8fHwxNjg4ODg4MTg5&ixlib=rb-1.2.1&q=80&w=400&h=500",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Expert Digital Marketer",
    image: "https://images.unsplash.com/photo-1521747116042-5e5c6e80bcf7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vYmlsZSUyMHBlcnNvbmFsaXR5fGVufDB8fHx8fDE2ODg4ODg0MjM&ixlib=rb-1.2.1&q=80&w=400&h=500",
  },
  {
    id: 3,
    name: "Robert Brown",
    role: "AI & ML Specialist",
    image: "https://images.unsplash.com/photo-1581091012186-5c2b0c8d2eeb?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vYmlsZSUyMHBlcnNvbmFsaXR5fGVufDB8fHx8fDE2ODg4ODg1NTI&ixlib=rb-1.2.1&q=80&w=400&h=500",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Cloud & DevOps Engineer",
    image: "https://images.unsplash.com/photo-1519700972151-b2e9eb7d57f9?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDkwfHxlbnZpcnVvcywgdGVjaG5vbG9neXxlbnZpcnVvcywgdGVjaG5vbG9neXxlbnZpcnVvcywgdGVjaG5vbG9neXxlbnZpcnVvcywgdGVjaG5vbG9n&ixid=MnwzNjUyOXwwfDF8c2VhcmNofD90fDxlbnZpcnVvcywgdGVjaG5vbG9n&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZyZW5jeXxib2JsdXx1eWUgfHk7eWxm1bkxdybmXX-323ccxx93tqceiddegg"
  }
]

const TopMentor = () => {
  return (
    <section className="mt-8 pb-2 px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-[1.80rem] lg:text-6xl font-semibold my-10 text-gray-900">
        Top <span className="text-orange-500"> Mentors</span>
      </h2>

      <Carousel className="relative flex items-center justify-center w-full min-h-[450px]">
        <CarouselContent>
          {mentors.map((mentor) => (
            <CarouselItem
              key={mentor.id}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Card className="w-[300px] md:w-[350px] lg:w-[400px] h-[450px]">
                <MentorCard key={mentor.id} mentor={mentor} />
              </Card>
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
      className="relative flex-shrink-0 group w-full h-full"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-[60%] object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
          <div className="text-left">
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
