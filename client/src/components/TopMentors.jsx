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

const mentors = [
  {
    id: 1,
    name: "John Doe",
    role: "Full Stack Developer",
    image: "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Expert Digital Marketer",
    image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Robert Brown",
    role: "AI & ML Specialist",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww",
  }
];

const TopMentor = () => {
  return (
    <section className="mt-8 pb-2 px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-[1.80rem] lg:text-6xl font-semibold my-10 text-gray-900">
        Meet <span className="text-orange-500"> Top Mentors</span>
      </h2>

      <Carousel className="relative flex items-center justify-center w-full">
        <CarouselContent>
          {mentors.map((mentor) => (
            <CarouselItem
              key={mentor.id}
              className="flex justify-center flex-[1_0_33%] min-w-[350px]"
            >
              <Card className="w-[350px] h-[350px]">
                <MentorCard mentor={mentor} />
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
      className="relative flex-shrink-0 group w-full"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg w-[350px] h-[350px]">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
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
