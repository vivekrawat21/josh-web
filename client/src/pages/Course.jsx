import {
  FaCertificate,
  FaInfinity,
  FaShoppingCart,
  FaRegClock,
  FaClock,
  FaCheckCircle,
  FaLanguage,
  FaDesktop,
} from "react-icons/fa";
import { CheckCircle } from "lucide-react"
import { FaRupeeSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItems } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaYoutube, FaLinkedin } from "react-icons/fa6";

const Course = () => {
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null)
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
    setCourseData(course);
  }, [courses, courseId]);

  const [expandedSections, setExpandedSections] = useState({
    "01": true,
  });

  const addToCart = () => {
    if (courseData) {
      dispatch(addItems(courseData));
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const loadLess = () => {
    setVisibleCount((prev) => prev - 5);
  };

  const cartContainsCourse = cart.cart.some((item) => item._id === courseId);

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
  // console.log("course data is ")
  // console.log(courseData)
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-6">
        {courseData ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {courseData?.title}
                </h1>

                {/* Mobile/tablet course info card - shown only on smaller screens */}
                <div className="lg:hidden mt-6 mb-8">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <img
                        src={courseData?.image}
                        alt="Course Thumbnail"
                        className="w-full h-52 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-bold text-black">
                          {courseData?.title}
                        </h2>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex items-center gap-3">
                            <FaLanguage className="text-xl text-gray-500" />
                            <span>Language - English & Hindi</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <FaDesktop className="text-xl text-gray-500" />
                            {(courseData?.title?.toLowerCase().startsWith("odoo") || courseData?.title?.toLowerCase().startsWith("microsoft")) ? (
  <span className="text-base md:text-lg">
  Offiline
</span>
) : (
  <span className="text-base md:text-lg">
  Use On Desktop, Tablet & Mobile
</span>
)}
                          </li>
                          {/* <li className="flex items-center gap-3">
                            <FaInfinity className="text-xl text-gray-500" />
                            <span>Full Lifetime Access</span>
                          </li> */}
                          <li className="flex items-center gap-3">
                            <FaRegClock className="text-xl text-gray-500" />
                            <span>{courseData?.duration}</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <FaCertificate className="text-xl text-gray-500" />
                            <span>Certificate Of Completion</span>
                          </li>
                          {/* <li className="flex items-center gap-3">
                            <FaClock className="text-xl text-gray-500" />
                            <span>Learn at Your Own Pace</span>
                          </li> */}
                        </ul>
                      </div>
                      <div className="mt-4 space-y-4">
  {/* Buy Now Button */}
  <Link
    to={
      !user
        ? `/signup?courseId=${courseId}&type=course`
        : "/payment"
    }
  >
    <button className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white text-center py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
      <FaRupeeSign />
      {courseData?.price} /- 
    </button>
  </Link>

  {/* GST Notice */}
  <p className="text-sm text-gray-600 italic text-center">
  * 18% GST will be added at checkout.
  </p>

  {/* Add to Cart Button (if not in cart) */}
  {!cartContainsCourse && (
    <button
      className="w-full bg-gray-200 hover:bg-gray-300 text-black text-center py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
      onClick={addToCart}
    >
      <FaShoppingCart />
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
                      courseData?.courseIntrovideo ||
                      "https://www.youtube.com/embed/Dhpb0rz8fjU?si=WYbWv-wXCXmpzhJq"
                    }
                    title={
                      courseData?.videos && courseData.videos[0]
                        ? courseData.videos[0].title
                        : "Course Introduction"
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  ></iframe>
                </div>
              </div>

              <div className="bg-white text-black px-4 md:px-6 pt-6">
                <h2 className="text-2xl font-bold mb-2">Syllabus</h2>
                {!courseData?.whatYouWillLearn ||
                courseData.whatYouWillLearn.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    <p className="text-black">
                      Currently No videos available for this course.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <li
                      key={index}
                      className={`
                        relative flex items-start gap-3 p-4 
                        rounded-lg transition-all duration-300
                        ${
                          hoveredIndex === index
                            ? "bg-gradient-to-r from-orange-50 to-red-50 shadow-md transform -translate-y-1"
                            : "bg-gray-50 shadow-sm"
                        }
                      `}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className={`
                        flex-shrink-0 mt-0.5 
                        ${hoveredIndex === index ? "text-orange-600" : "text-orange-500"}
                      `}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`
                          font-medium leading-relaxed
                          ${hoveredIndex === index ? "text-gray-900" : "text-gray-800"}
                        `}
                        >
                          {item}
                        </p>
                      </div>
                      <div
                        className={`
                        absolute left-0 top-0 bottom-0 w-1 rounded-l-lg
                        ${hoveredIndex === index ? "bg-orange-600" : "bg-orange-400"}
                      `}
                      />
                    </li>
                  ))}
                </ul>
                )}
              </div>

              {/* Enrollment Pop-up */}
              {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                    <h2 className="text-xl font-semibold mb-4">
                      Enroll to Unlock
                    </h2>
                    <p className="text-gray-600 mb-4">
                      You need to enroll in the course to access this module.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Link
                        to={
                          !user
                            ? `/signup?courseId=${courseId}&type=course`
                            : "/payment"
                        }
                      >
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full">
                          BUY COURSE
                        </button>
                      </Link>
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white text-black p-4 md:p-6 lg:px-8 lg:py-4">
                <div className="mb-2">
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-4">
                    {courseData?.courseIntroLine}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    About This Course
                  </h1>
                </div>

                {/* About This Course Section */}
                <section className="py-4">
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
                  {courseData?.whoShouldEnroll &&
                  courseData.whoShouldEnroll.length > 0 ? (
                    <ul className="space-y-4 mb-6">
                      {courseData.whoShouldEnroll.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                          <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-6 text-gray-500">
                      Information not available
                    </p>
                  )}

                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Still Confused?
                  </h3>
                  {/* <span className="mb-4 ">These Points might help you makeup your Mind:</span> */}
                  {courseData?.stillConfused &&
                  courseData.stillConfused.length > 0 ? (
                    <ul className="space-y-4 mb-6">
                      {courseData.stillConfused.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                          <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-6 text-gray-500">
                      Information not available
                    </p>
                  )}

                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                    Reason Why Joshguru
                  </h3>
                  {courseData?.reasonWhyJoshGuru &&
                  courseData.reasonWhyJoshGuru.length > 0 ? (
                    <ul className="space-y-4 mb-6">
                      {courseData.reasonWhyJoshGuru.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                          <span className="ml-2 text-gray-800 text-sm md:text-base lg:text-lg text-justify leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-6 text-gray-500">
                      Information not available
                    </p>
                  )}
                </section>

                {/* Mentor Section */}
                <section className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Mentor
                  </h1>
                  {courseData?.mentor && courseData.mentor.length > 0 ? (
                    <div>
                      {courseData.mentor.map((mentor, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row md:items-center gap-4 mb-4"
                        >
                          <div className="w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 md:mb-0">
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
                            <div className="flex gap-3 mt-2">
                              {mentor?.youtubeId && (
                                <a
                                  href={mentor.youtubeId}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="YouTube"
                                  className="text-black hover:text-red-600"
                                >
                                  <FaYoutube size={20} />
                                </a>
                              )}
                              {mentor?.linkedInId && (
                                <a
                                  href={mentor.linkedInId}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                  className="text-black hover:text-blue-700"
                                >
                                  <FaLinkedin size={20} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed text-justify">
                        {courseData.mentor[0]?.about}
                      </p>
                    </div>
                  ) : (
                    <div>
                    <div className="flex items-center gap-4">
                      <div>
                        <h2 className="text-xl font-semibold">
                          Priya Sharma
                        </h2>
                        <div className="flex gap-3 mt-2">
                          <a
                            href="https://www.youtube.com/@priyasharma"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="text-black hover:text-red-600"
                          >
                            <FaYoutube size={20} />
                          </a>
                          <a
                            href="https://www.linkedin.com/in/priyasharma"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-black hover:text-blue-700"
                          >
                            <FaLinkedin size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-relaxed text-justify mt-4">
                      Priya Sharma is a {courseData?.title}  with over 8 years of experience. She loves teaching modern JavaScript frameworks and has a strong presence on YouTube, where she shares tips on career growth and tech tutorials.
                    </p>
                  </div>
                  

                  )}
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
                    className="w-full h-52 object-cover"
                  />
                  <div className="px-4 pt-2">
                    <h2 className="text-2xl font-bold text-black">
                      {courseData?.title}
                    </h2>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="mb-2">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <FaLanguage className="text-xl text-gray-500" />
                        <span className="text-base md:text-lg">
                          Language - English & Hindi
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaDesktop className="text-xl text-gray-500" />
                        {(courseData?.title?.toLowerCase().startsWith("odoo") || courseData?.title?.toLowerCase().startsWith("microsoft")) ? (
  <span className="text-base md:text-lg">
  Offiline
</span>
) : (
  <span className="text-base md:text-lg">
  Use On Desktop, Tablet & Mobile
</span>
)}

                       
                      </li>
                      {/* <li className="flex items-center gap-3">
                        <FaInfinity className="text-xl text-gray-500" />
                        <span className="text-base md:text-lg">Full Lifetime Access</span>
                      </li> */}
                      <li className="flex items-center gap-3">
                        <FaRegClock className="text-2xl text-gray-500 mb-2" />
                        <span className="text-base md:text-lg">
                          {courseData?.duration}
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCertificate className="text-xl text-gray-500" />
                        <span className="text-base md:text-lg">
                          Certificate Of Completion
                        </span>
                      </li>
                      {/* <li className="flex items-center gap-3">
                        <FaClock className="text-xl text-gray-500" />
                        <span className="text-base md:text-lg">Learn at Your Own Pace</span>
                      </li> */}
                    </ul>
                  </div>
                  <div className="space-y-4 pb-2">
  {/* Buy Now Button */}
  <Link
    to={
      !user
        ? `/signup?courseId=${courseId}&type=course`
        : "/payment"
    }
  >
    <button className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
      <FaRupeeSign />
      {courseData?.price} /-
    </button>
  </Link>

  {/* GST Note */}
  <p className="text-sm text-gray-600 italic text-center">
    * 18% GST will be added at checkout
  </p>

  {/* Add to Cart Button */}
  {!cartContainsCourse && (
    <button
      className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
      onClick={addToCart}
    >
      <FaShoppingCart />
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
