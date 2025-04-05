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
    image:
      "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Expert Digital Marketer",
    image:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Robert Brown",
    role: "AI & ML Specialist",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Maria Johnson",
    role: "Cyber Security Expert",
    image:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Michael Williams",
    role: "Data Scientist",
    image:
      "https://media.istockphoto.com/id/2148494746/photo/portrait-of-young-businesswoman-with-curly-hairstyle.webp",
  },
  {
    id: 6,
    name: "Jennifer Brown",
    role: "UX/UI Designer",
    image:
      "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60",
  },
];

const TopMentor = () => {
  return (
    <section className="mt-8 pb-6 px-4 md:px-8 lg:px-10 w-full mx-auto text-center relative overflow-hidden my-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-8 text-gray-900">
        Meet <span className="text-orange-500">Top Mentors</span>
      </h2>

      <div className="relative w-full">
        <Carousel className="relative flex items-center justify-center w-full">
          <CarouselContent>
            {mentors.map((mentor) => (
              <CarouselItem
                key={mentor.id}
                className="basis-11/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
              >
                <Card className="w-[90%] sm:w-[250px] h-[350px]">
                  <MentorCard mentor={mentor} />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ✅ Responsive and styled carousel buttons */}
          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-200" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-200" />
        </Carousel>
      </div>
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
      <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-[350px]">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent flex items-end p-4 sm:p-6">
          <div className="text-left">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white text-lg sm:text-xl font-bold"
            >
              {mentor.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-300 text-sm sm:text-lg font-medium"
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
