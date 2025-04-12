import {
  FaCertificate,
  FaInfinity,
  FaShoppingCart,
  FaBook,
  FaLaptopCode,
  FaRegClock,
  FaRegArrowAltCircleRight,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaClock,
  FaFileAlt,
  FaAccessibleIcon,
  FaLock,
  FaCheckCircle,
  FaLanguage, FaDesktop // Added tick icon
} from "react-icons/fa";

import { FaRupeeSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Youtube, Linkedin } from "lucide-react"
import { useSelector } from "react-redux";
import { FaR } from "react-icons/fa6";

const Course = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    if (!courses || courses.length === 0) return;
    if (courses?.[0]?.length === 0) return;
    const course = courses[0].find((course) => course._id === courseId);
    console.log(course);
    setCourseData(course);
  }, [courses, courseId]);

  const [expandedSections, setExpandedSections] = useState({
    "01": true,
  });

  const authors = [
    {
      name: "Josh Guru",
      description:
        "Josh Guru is a passionate educator and web developer with a knack for making complex concepts simple and engaging. With years of experience in the industry, he is dedicated to helping learners unlock their potential in the world of web development.",
      linkedInId: "https://www.linkedin.com/in/josh-guru",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5So9WLEXMlzxzkllW3q0o1pn1GSNO3.png",
      youtubeId: "https://www.youtube.com/@JoshGuru",
    },
  ];

  const toggleSection = (video) => {
    if (!video.isPreview) {
      setShowModal(true);
    } else {
      setExpandedSections((prev) => ({
        ...prev,
        [video._id]: !prev[video._id],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4">
        {courseData && Object.keys(courseData).length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {courseData?.title}
                </h1>
                <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                <div className="md:block sm:block lg:hidden mt-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                    <div className="relative">
                      <img
                        src={courseData?.image}
                        alt="Course Thumbnail"
                        className="w-full h-48 object-cover"
                      />
                      <div className="md:block hidden">
                        <h2 className="text-3xl font-bold text-black">
                          {courseData?.title}
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <ul className="space-y-4 mb-3 text-gray-700">
                          <li className="flex items-center gap-4">
                            <FaLanguage className="text-2xl text-gray-500" />
                            <span>Language - English</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaDesktop className="text-2xl text-gray-500" />
                            <span>Use On Desktop, Tablet & Mobile</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaInfinity className="text-2xl text-gray-500" />
                            <span>Full Lifetime Access</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaRegClock className="text-2xl text-gray-500" />
                            <span>{courseData?.duration}</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaCertificate className="text-2xl text-gray-500" />
                            <span>Certificate Of Completion</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaClock className="text-2xl text-gray-500" />
                            <span>Learn at Your Own Pace</span>
                          </li>
                        </ul>

                      </div>
                      <div className="mt-3 space-y-3">
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                          <FaRupeeSign className="inline-block mr-2" />
                          {courseData?.price} /-
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Video Section */}
                <div className="mt-4 w-full">
                  <iframe
                    width="560"
                    height="315"
                    src={courseData?.videos[0]?.url || "//www.youtube.com/embed/VIDEO_ID"}
                    title={courseData?.videos[0]?.title}
                    className="w-full rounded-lg shadow-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white text-black px-6 pt-6">
                <h2 className="text-2xl font-bold mb-6">Syllabus</h2>
                <div className="space-y-4">
                  {courseData?.videos.map((video) => (
                    <div
                      key={video._id}
                      className="bg-white rounded-md shadow-md overflow-hidden"
                      onClick={() => toggleSection(video)}
                    >
                      <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{video.title}</h3>
                          </div>
                          {!video.isPreview && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                              <FaLock /> Locked
                            </span>
                          )}
                        </div>
                        <div>
                          {expandedSections[video._id] ? (
                            <FaChevronUp className="text-gray-600" />
                          ) : (
                            <FaChevronDown className="text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enrollment Pop-up */}
                {showModal && (
                  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                      <h2 className="text-xl font-semibold mb-4">Enroll to Unlock</h2>
                      <p className="text-gray-600 mb-4">
                        You need to enroll in the course to access this module.
                      </p>
                      <button
                        onClick={() => {
                          setIsEnrolled(true);
                          setShowModal(false);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mr-2"
                      >
                        BUY COURSE
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 py-2 px-4 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white text-black min-h-screen p-6 md:p-8">
                {/* About This Course Section */}
                <section>
                  <h1 className="text-3xl font-bold mb-6">About This Course</h1>
                  <p className="mb-4">{courseData?.courseIntroLine}</p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Course Description:</h3>
                  <p className="mb-4">{courseData?.description}</p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">What You'll Learn:</h3>
                  <ul className="pl-6 space-y-2 mb-6">
                    {courseData.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheckCircle className=" text-sm md:text-xl text-green-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Course Highlights:</h3>
                  <ul className="pl-6 space-y-2 mb-6">
                    {courseData.courseHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheckCircle className=" text-sm md:text-lg text-green-500 mr-2" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Who Should Enroll:</h3>
                  <p className="mb-6">{courseData?.whoShouldEnroll}</p>

                  <h3 className="text-xl font-semibold mt-6 mb-2">Why This Course?</h3>
                  <p className="mb-6">{courseData?.whyCourse}</p>
                </section>

                {/* Author Section */}
                <section className="mb-12">
                  <h1 className="text-3xl font-bold mb-6">Author</h1>
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={author?.image}
                          alt={author?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{author?.name}</h2>
                        <div className="flex gap-2 mt-2">
                          <a
                            href={author.youtubeId}
                            aria-label="YouTube"
                            className="text-black hover:text-gray-700"
                          >
                            <Youtube size={20} />
                          </a>
                          <a
                            href={author.linkedInId}
                            aria-label="LinkedIn"
                            className="text-black hover:text-gray-700"
                          >
                            <Linkedin size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="mt-4">{authors[0].description}</p>
                </section>
              </div>
            </div>

            <div className="lg:w-1/3 hidden sm:hidden lg:block md:hidden">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                <div className="relative">
                  <img
                    src={courseData?.image}
                    alt="Course Thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="m-4">
                    <h2 className="text-3xl font-bold text-black">
                      {courseData?.title}
                    </h2>
                    <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                  <ul className="space-y-4 mb-3 text-gray-700">
                          <li className="flex items-center gap-4">
                            <FaLanguage className="text-3xl text-gray-500" />
                            <span  className="text-lg">Language - English</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaDesktop className="text-3xl text-gray-500" />
                            <span className="text-lg">Use On Desktop, Tablet & Mobile</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaInfinity className="text-3xl text-gray-500" />
                            <span className="text-lg">Full Lifetime Access</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaRegClock className="text-3xl text-gray-500" />
                            <span className="text-lg">{courseData?.duration}</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaCertificate className="text-3xl text-gray-500" />
                            <span className="text-lg">Certificate Of Completion</span>
                          </li>
                          <li className="flex items-center gap-4">
                            <FaClock className="text-3xl text-gray-500" />
                            <span className="text-lg">Learn at Your Own Pace</span>
                          </li>
                        </ul>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                    <FaRupeeSign className="inline-block mr-2" />
                      {courseData?.price} /-
                    </button>
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-black text-center py-3 rounded font-medium transition-colors">
                      <FaShoppingCart className="inline-block mr-2" />
                      Add to Cart
                    </button>

                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
};

export default Course;
