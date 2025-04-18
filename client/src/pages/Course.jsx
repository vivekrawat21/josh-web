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
  FaLanguage,
  FaDesktop, // Added tick icon
} from "react-icons/fa";

import { FaRupeeSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Youtube, Linkedin } from "lucide-react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addItems, removeFromCart, clearCart} from "../features/cart/cartSlice";
import { FaR } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";
const Course = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const { courseId } = useParams();
  const { courses } = useSelector((state) => state.course);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(5);
  const user = useSelector((state) => state.user);

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
  
  const addToCart = () => {
    if(courseData){
      dispatch(addItems(courseData))
    }
  }
  
  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  }
  
  const loadLess = () => {  
    setVisibleCount((prev) => prev - 5);
  }
  
  console.log("cart items")
  console.log(JSON.stringify(cart));
  const cartContainsCourse = cart.cart.some((item) => item._id === courseId);
  console.log(courseData);
  
  const mentors = [
    {
      name: "Josh Guru",
      description:
        "Josh Guru is a passionate educator and web developer with a knack for making complex concepts simple and engaging. With years of experience in the industry, he is dedicated to helping learners unlock their potential in the world of web development.",
      linkedInId: "https://www.linkedin.com/in/josh-guru",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5So9WLEXMlzxzkllW3q0o1pn1GSNO3.png",
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
    <div className="min-h-screen bg-white text-black ">
      <div className="container mx-auto px-4">
        {courseData && Object.keys(courseData).length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {courseData?.title}
                </h1>
                
                {/* Mobile/tablet course info card - shown only on smaller screens */}
                <div className="lg:hidden mt-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <img
                        src={courseData?.image}
                        alt="Course Thumbnail"
                        className="w-full h-48 object-cover"
                      />
                      <div className="md:block p-4">
                        <h2 className="text-xl font-bold text-black">
                          {courseData?.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
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
                        <Link to={!user ? `/signup?courseId=${courseId}&type=course` : '/payment'}>
                          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                            <FaRupeeSign className="inline-block mr-2" />
                            {courseData?.price} /-
                          </button>
                        </Link>
                        {!cartContainsCourse && (
                          <button 
                            className="w-full bg-gray-200 hover:bg-gray-300 text-black text-center py-3 rounded font-medium transition-colors"
                            onClick={addToCart}
                          >
                            <FaShoppingCart className="inline-block mr-2" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Section */}
                <div className="relative pb-[56.25%] w-full h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    src={
                      courseData?.videos[0]?.url ||
                      "https://www.youtube.com/embed/Dhpb0rz8fjU?si=WYbWv-wXCXmpzhJq"
                    }
                    title={courseData?.videos[0]?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white text-black px-6 pt-6">
                <h2 className="text-2xl font-bold mb-6">Syllabus</h2>
                {courseData?.whatYouWillLearn.length <= 0 ? (
                  <div className="text-center text-gray-500">
                    <p className="text-black">
                      Currently No videos available for this course.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4 pl-6 list-disc text-gray-800 text-lg font-medium leading-relaxed">
                    {courseData?.whatYouWillLearn?.map((item, index) => (
                      <li key={index} className="relative">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Enrollment Pop-up */}
              {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                    <h2 className="text-xl font-semibold mb-4">
                      Enroll to Unlock
                    </h2>
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

              <div className="bg-white text-black min-h-screen p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg text-justify">
                    {courseData?.courseIntroLine}
                  </p>
                  About This Course
                </h1>
                {/* About This Course Section */}
                <section className="py-6">
                  {/* Course Description */}
                  <h3 className="text-lg md:text-xl font-semibold mt-2 mb-2 text-black">
                    Course Description:
                  </h3>
                  <p className="mb-4 text-gray-800 text-sm md:text-base lg:text-lg text-justify">
                    {courseData?.description}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Why This Course?
                  </h3>
                  <p className="mb-6 text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed text-justify tracking-normal">
                    {courseData?.whyCourse}
                  </p>

                  {/* Who Should Enroll */}
                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Who Should Enroll:
                  </h3>
                  <ul className="md:pl-6 space-y-4 mb-6">
                    {courseData.whoShouldEnroll.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg lg:text-xl" />
                        <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Still Confused?
                  </h3>
                  <ul className="md:pl-6 space-y-4 mb-6">
                    {courseData.stillConfused.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg lg:text-xl" />
                        <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Reason Why Joshguru
                  </h3>
                  <ul className="md:pl-6 space-y-4 mb-2">
                    {courseData.reasonWhyJoshGuru.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg lg:text-xl" />
                        <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* mentor Section */}
                <section className="mb-4">
                  <h1 className="text-3xl font-bold mb-2">Mentor</h1>
                  {courseData.mentor.map((mentor, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={
                            mentor?.image ||
                            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                          }
                          alt={mentor?.name || "Mentor"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          {mentor?.name || "Mentor"}
                        </h2>
                        <div className="flex gap-2 mt-2">
                          <Link
                            to={mentor.youtubeId || "#"}
                            aria-label="YouTube"
                            className="text-black hover:text-gray-700"
                          >
                            <FaYoutube size={20} />
                          </Link>
                          <Link
                            to={mentor.linkedInId || "#"}
                            aria-label="LinkedIn"
                            className="text-black hover:text-gray-700"
                          >
                            <FaLinkedin size={20} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="mb-6 text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed text-justify tracking-normal">
                    {mentors[0].description}
                  </p>
                </section>
              </div>
            </div>

            {/* Right Section - Desktop Sidebar */}
            <div className="lg:w-1/3 hidden lg:block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
                <div className="relative">
                  <img
                    src={courseData?.image}
                    alt="Course Thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="mx-4 my-2">
                    <h2 className="text-2xl font-bold text-black">
                      {courseData?.title}
                    </h2>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="mb-4">
                    <ul className="space-y-2 mb-3 text-gray-700">
                      <li className="flex items-center gap-4">
                        <FaLanguage className="text-2xl text-gray-500" />
                        <span className="text-lg">Language - English</span>
                      </li>
                      <li className="flex items-center gap-4">
                        <FaDesktop className="text-2xl text-gray-500" />
                        <span className="text-lg">
                          Use On Desktop, Tablet & Mobile
                        </span>
                      </li>
                      <li className="flex items-center gap-4">
                        <FaInfinity className="text-2xl text-gray-500" />
                        <span className="text-lg">Full Lifetime Access</span>
                      </li>
                      <li className="flex items-center gap-4">
                        <FaRegClock className="text-2xl text-gray-500" />
                        <span className="text-lg">{courseData?.duration}</span>
                      </li>
                      <li className="flex items-center gap-4">
                        <FaCertificate className="text-2xl text-gray-500" />
                        <span className="text-lg">
                          Certificate Of Completion
                        </span>
                      </li>
                      <li className="flex items-center gap-4">
                        <FaClock className="text-2xl text-gray-500" />
                        <span className="text-lg">Learn at Your Own Pace</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2 pb-4">
                    <Link to={!user ? `/signup?courseId=${courseId}&type=course` : '/payment'}>
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                        <FaRupeeSign className="inline-block mr-2" />
                        {courseData?.price} /-
                      </button>
                    </Link>
                    {!cartContainsCourse && (
                      <button 
                        className="w-full bg-gray-200 hover:bg-gray-300 text-black text-center py-3 rounded font-medium transition-colors"
                        onClick={addToCart}
                      >
                        <FaShoppingCart className="inline-block mr-2" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading course information...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;