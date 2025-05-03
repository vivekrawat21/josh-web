import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Calendar, Clock, Eye, EyeOff } from "lucide-react";

const webinarDatas = [
  {
    title: "Future of Education Tech",
    subtitle: "Innovation Summit 2024",
    date: "March 25, 2024",
    time: "2:00 PM - 4:00 PM EST",
    thumbnail: "../../public/event1.webp",
    speaker: {
      name: "Dr. Emily Rodriguez",
      role: "Chief Innovation Officer at EduTech Global",
      image: "../../public/member1.jpg"
    }
  },
  {
    title: "AI in Modern Classroom",
    subtitle: "Transformative Learning",
    date: "April 2, 2024",
    time: "1:30 PM - 3:00 PM EST",
    thumbnail: "../../public/event2.webp",
    speaker: {
      name: "Prof. James Tanaka",
      role: "AI Education Specialist",
      image: "../../public/member2.jpg"
    }
  }
];

const WebinarBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAdmin] = useState(true);
  const [index, setIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % webinarDatas.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <div className="relative overflow-hidden">

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={bannerVariants}
            transition={{ duration: 0.5 }}
            className="relative p-8 md:p-12 mx-4 md:mx-8 my-6 rounded-3xl overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{
              background: `linear-gradient(45deg, rgba(124, 45, 18, 0.9) 0%, rgba(194, 65, 12, 0.9) 100%), url('${webinarDatas[index].thumbnail}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
            }}
          >
            {/* Toggle Button - Top Right Corner */}
            {isAdmin && (
              <motion.button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute top-4 right-4 z-50 bg-orange-500 p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
                style={{ boxShadow: "0 0 15px rgba(245,158,11,0.3)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isVisible ? (
                  <EyeOff className="text-white w-5 h-5" />
                ) : (
                  <Eye className="text-white w-5 h-5" />
                )}
              </motion.button>
            )}

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, -200],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [1, 0.5, 0],
                  scale: [1, 1.5, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            <motion.div
              className="relative z-10 p-6 md:p-12"
              style={{
                rotateY: useTransform(mouseX, [0, 1], [-3, 3]),
                rotateX: useTransform(mouseY, [0, 1], [3, -3]),
                transformPerspective: 1000
              }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                  <motion.div className="space-y-4">
                    <motion.h1
                      className="text-4xl md:text-5xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {webinarDatas[index].title}
                      <motion.span className="block text-2xl text-orange-200 mt-2">
                        {webinarDatas[index].subtitle}
                      </motion.span>
                    </motion.h1>
                  </motion.div>

                  <motion.div
                    className="p-6 rounded-xl bg-orange-900/30 backdrop-blur-sm border border-orange-500/30 space-y-4"
                    whileHover={{ translateY: -5 }}
                  >
                    <div className="flex items-center gap-4 text-orange-200">
                      <Calendar className="w-8 h-8" />
                      <span className="text-xl">{webinarDatas[index].date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-orange-200">
                      <Clock className="w-8 h-8" />
                      <span className="text-xl">{webinarDatas[index].time}</span>
                    </div>
                  </motion.div>

                  <motion.button
                    className="relative overflow-hidden px-12 py-5 rounded-xl text-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.button>
                </div>

                {/* Right Column - Mentor Section */}
                <motion.div
                  className="flex flex-col items-center gap-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src={webinarDatas[index].speaker.image}
                      alt={webinarDatas[index].speaker.name}
                      className="w-80 h-80 rounded-full border-4 border-orange-400 object-cover shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-ping opacity-20" />
                  </motion.div>

                  {/* Mentor Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-bold text-orange-100">
                      {webinarDatas[index].speaker.name}
                    </h3>
                    <p className="text-orange-200 text-lg">
                      {webinarDatas[index].speaker.role}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-orange-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebinarBanner;