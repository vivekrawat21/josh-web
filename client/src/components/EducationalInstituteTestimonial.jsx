import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Users,
  School,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Westfield High School",
    representative: "Dr. James Anderson",
    representativeImage: "/freelancing_2lakh.png",
    title: "Principal",
    location: "Chicago, Illinois",
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumbnail: "/freelancing_2lakh.png",
    quote:
      "Implementing this LMS content in our curriculum has transformed our teaching approach. The well-structured courses allowed our teachers to deliver complex subjects with confidence, resulting in a 28% improvement in student test scores.",
    studentsImpacted: 1250,
    teachersUsing: 45,
    subjectsImplemented: 8,
    improvementMetric: "28% higher test scores",
  },
  {
    id: 2,
    name: "Oakridge Academy",
    representative: "Prof. Lisa Chen",
    representativeImage: "/freelancing_2lakh.png",
    title: "Head of Digital Learning",
    location: "Boston, Massachusetts",
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    quote:
      "The quality and structure of the content exceeded our expectations. Our teachers were able to seamlessly integrate it into their existing curriculum. The interactive elements particularly engaged our students who previously struggled with traditional learning methods.",
    studentsImpacted: 850,
    teachersUsing: 32,
    subjectsImplemented: 6,
    improvementMetric: "41% increase in student engagement",
  },
  {
    id: 3,
    name: "Riverside School District",
    representative: "Maria Gonzalez",
    representativeImage: "/freelancing_2lakh.png",
    title: "Curriculum Director",
    location: "Austin, Texas",
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    quote:
      "Adopting this platform across our district has standardized the quality of education across all our schools. The structured content made it easy to train teachers and ensure consistent learning outcomes. Parents have noticed the difference in how engaged their children are with the material.",
    studentsImpacted: 3200,
    teachersUsing: 115,
    subjectsImplemented: 12,
    improvementMetric: "35% reduction in achievement gap",
  },
];

const EducationalInstituteTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIframe, setShowIframe] = useState(false);

  const current = testimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setShowIframe(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setShowIframe(false);
  };

  return (
    <div className=" bg-gradient-to-br from-orange-200 to-orange-50  mb-10
    p-6 md:p-12   shadow-lg mx-4
    ">
      <div className="text-center mb-12">
        <h2 className="text-2xl lg:text-6xl font-semibold text-black bg-clip-text">
          Trusted by Leading <span className="text-orange-500">Educational Institutions</span>
        </h2>
        <p className="text-gray-600 mx-auto mt-2 hidden lg:block">
          See how schools and educational institutions are using our content to transform their classrooms
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Video Section */}
        <div className="relative w-full lg:w-2/3 lg:h-[29.5rem] aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
          {!showIframe ? (
            <>
              <img
                src={current.thumbnail}
                alt={`${current.name} thumbnail`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity"
              />
              <button
                onClick={() => setShowIframe(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition"
                aria-label="Play video"
              >
                <Play className="text-white w-10 h-10" />
              </button>
            </>
          ) : (
            <iframe
              src={current.videoUrl + "?autoplay=1"}
              allow="autoplay; encrypted-media"
              title={current.name}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
            />
          )}

          {/* Badge */}
          <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium text-orange-700 shadow">
            <School size={16} />
            <span>{current.name}</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/3 space-y-4">
          <span className="inline-block text-xs font-semibold text-orange-600 uppercase bg-orange-100  py-1 rounded-full">
            Success Story
          </span>
          <blockquote className="text-gray-700 text-lg">{current.quote}</blockquote>

          <div>
            <div className="flex gap-2 items-center">
              <img src={current.representativeImage} alt="representativeImage" width={40} height={40} className=" border-2 rounded-full border-orange-600"/>
              <h3 className="text-lg font-bold">{current.representative}</h3>
            </div>
            <p className="text-sm text-gray-500">{current.title}</p>
            <p className="text-sm text-gray-500">{current.name}</p>
          </div>

          <div className="gap-4 mt-4 hidden lg:grid lg:grid-cols-2">
            <div className="flex gap-2 items-start">
              <Users size={20} className="text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Students Impacted</p>
                <p className="text-lg font-semibold">{current.studentsImpacted.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <BookOpen size={20} className="text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Teachers Using</p>
                <p className="text-lg font-semibold">{current.teachersUsing}</p>
              </div>
            </div>
          </div>

          <div className="items-center gap-3 mt-4 p-4 bg-orange-50 rounded-lg shadow-sm hidden lg:flex">
            <TrendingUp size={24} className="text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Measured Improvement</p>
              <p className="font-semibold text-orange-700">{current.improvementMetric}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {testimonials.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-orange-600" : "bg-orange-200"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setShowIframe(false);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EducationalInstituteTestimonial;
