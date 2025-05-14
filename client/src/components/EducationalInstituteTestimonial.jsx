import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
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
      "Implementing this LMS content in our curriculum has transformed our teaching approach...",
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
      "The quality and structure of the content exceeded our expectations...",
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
      "Adopting this platform across our district has standardized the quality of education...",
    studentsImpacted: 3200,
    teachersUsing: 115,
    subjectsImplemented: 12,
    improvementMetric: "35% reduction in achievement gap",
  },
];

const EducationalInstituteTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeVisible, setIframeVisible] = useState({});

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
    <div className="bg-gradient-to-br from-orange-200 to-orange-50 p-6 md:p-12 shadow-lg mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-black">
          Trusted by Leading{" "}
          <span className="text-orange-500">Educational Institutions</span>
        </h2>
        <p className="text-gray-600 mt-2 hidden lg:block">
          See how schools and educational institutions are using our content to transform their classrooms
        </p>
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="lg:hidden overflow-x-auto">
        <div className="flex gap-6 snap-x snap-mandatory scroll-smooth overflow-x-auto pb-4 px-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="snap-center shrink-0 bg-white rounded-xl shadow-xl w-full flex flex-col gap-4 p-4"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                {!iframeVisible[index] ? (
                  <>
                    <img
                      src={testimonial.thumbnail}
                      alt="thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setIframeVisible((prev) => ({
                          ...prev,
                          [index]: true,
                        }))
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition"
                    >
                      <Play className="text-white w-8 h-8" />
                    </button>
                  </>
                ) : (
                  <iframe
                    src={`${testimonial.videoUrl}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    title={testimonial.name}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                  />
                )}
                <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-orange-700 shadow">
                  <School size={14} />
                  <span>{testimonial.name}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <span className="inline-block text-xs font-semibold text-orange-600 uppercase bg-orange-100 py-0.5 px-2 rounded-full">
                  Success Story
                </span>
                <blockquote className="text-gray-700 text-base">{testimonial.quote}</blockquote>
                <div className="flex gap-2 items-center">
                  <img
                    src={testimonial.representativeImage}
                    alt="representative"
                    width={32}
                    height={32}
                    className="border-2 rounded-full border-orange-600"
                  />
                  <div>
                    <h3 className="text-base font-bold">{testimonial.representative}</h3>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                    <p className="text-xs text-gray-500">{testimonial.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="flex gap-1 items-start">
                    <Users size={16} className="text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Students</p>
                      <p className="text-base font-semibold">{testimonial.studentsImpacted.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-start">
                    <BookOpen size={16} className="text-orange-600" />
                    <div>
                      <p className="text-xs text-gray-500">Teachers</p>
                      <p className="text-base font-semibold">{testimonial.teachersUsing}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 p-3 bg-orange-50 rounded-lg shadow-sm">
                  <TrendingUp size={18} className="text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Improvement</p>
                    <p className="font-semibold text-orange-700 text-sm">{testimonial.improvementMetric}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Static View */}
      <div className="hidden lg:flex flex-col items-center gap-6">
        <div className="flex gap-6 w-full">
          {/* Video Section */}
          <div className="relative w-2/3 aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            {!showIframe ? (
              <>
                <img
                  src={current.thumbnail}
                  alt={`${current.name} thumbnail`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowIframe(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition"
                >
                  <Play className="text-white w-10 h-10" />
                </button>
              </>
            ) : (
              <iframe
                src={`${current.videoUrl}?autoplay=1`}
                allow="autoplay; encrypted-media"
                title={current.name}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
              />
            )}
            <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium text-orange-700 shadow">
              <School size={16} />
              <span>{current.name}</span>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-1/3 space-y-4">
            <span className="inline-block text-xs font-semibold text-orange-600 uppercase bg-orange-100 py-1 px-2 rounded-full">
              Success Story
            </span>
            <blockquote className="text-gray-700 text-lg">{current.quote}</blockquote>
            <div className="flex gap-2 items-center">
              <img src={current.representativeImage} alt="rep" width={40} height={40} className="border-2 rounded-full border-orange-600" />
              <div>
                <h3 className="text-lg font-bold">{current.representative}</h3>
                <p className="text-sm text-gray-500">{current.title}</p>
                <p className="text-sm text-gray-500">{current.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
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

            <div className="flex items-center gap-2 mt-3 p-4 bg-orange-50 rounded-lg shadow-sm">
              <TrendingUp size={20} className="text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Improvement</p>
                <p className="font-semibold text-orange-700 text-base">{current.improvementMetric}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handlePrevious}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalInstituteTestimonial;
