import {
  FaCertificate,
  FaShoppingCart,
  FaRegClock,
  FaCheckCircle,
  FaLanguage,
  FaDesktop,
  FaLock,
} from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItems } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { FaYoutube, FaLinkedin } from "react-icons/fa6";
import { useRef } from "react";
import { MdDownload } from "react-icons/md";
import { FiMaximize } from "react-icons/fi";

const Course = () => {
const [showModal, setShowModal] = useState(false);
const [courseData, setCourseData] = useState(null);
const [hoveredIndex, setHoveredIndex] = useState(null);
const { courseId } = useParams();
const { courses } = useSelector((state) => state.course);
const cart = useSelector((state) => state.cart);
const dispatch = useDispatch();
const [visibleCount, setVisibleCount] = useState(5);
const user = useSelector((state) => state.user);
const certificateRef = useRef(null);
const [certificatePath, setCertificatePath] = useState("/certificate.png");
const [selectedVideo, setSelectedVideo] = useState(null);
const [currentLessonTitle, setCurrentLessonTitle] = useState("");
const [showTitle, setShowTitle] = useState(false);
const [showSidebar, setShowSidebar] = useState(false);

useEffect(() => {
  if (!courses || courses.length === 0) return;
  if (courses?.[0]?.length === 0) return;
  const course = courses[0].find((course) => course._id === courseId);
  setCourseData(course);
}, [courses, courseId]);

// FIXED: Add dependency array to prevent running on every render
useEffect(() => {
  // Only set the initial video when courseData first loads or changes
  if (courseData?.courseIntrovideo?.videoPath && !selectedVideo) {
    setSelectedVideo(courseData.courseIntrovideo.videoPath);
  }
}, [courseData, selectedVideo]);

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

const toggleSection = (sectionId) => {
  setExpandedSections((prev) => ({
    ...prev,
    [sectionId]: !prev[sectionId],
  }));
};
const toggleModule = (videoId) => {
  setOpenModule(openModule === videoId ? -1 : videoId);
};
const playLesson = (videoLink, title) => {
  setSelectedVideo(videoLink);
  setCurrentLessonTitle(title);
  setShowTitle(true);
  setTimeout(() => {
    setShowTitle(false);
  }, 3000);
};

useEffect(() => {
  if (courseData?.certificatePath?.trim()) {
    console.log("Certificate path is set to:", courseData.certificatePath);
    setCertificatePath(courseData?.certificatePath);
  }
}, [courseData]);

const toggleFullScreen = () => {
  if (certificateRef.current) {
    if (!document.fullscreenElement) {
      certificateRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
};

// Unified video handling function
const handleVideoSelection = (video) => {
  console.log("Video selected:", video);
  
  // Convert isPreview to a strict boolean value regardless of its original type
  const videoWithFixedTypes = {
    ...video,
    isPreview: Boolean(video.isPreview)
  };
  
  if (videoWithFixedTypes.isPreview) {
    setSelectedVideo(videoWithFixedTypes);
    setCurrentLessonTitle(video.title);
    setShowTitle(true);
    // setTimeout(() => setShowTitle(false), 3000);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  } else {
    setSelectedVideo(videoWithFixedTypes);
    setShowModal(true);
  }
};
  return (
    <div className="min-h-screen bg-white text-black mt-16">
      <div className="container mx-auto px-4 py-6">
        {courseData ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="lg:w-2/3">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-5">
                  {courseData?.title}
                </h1>

                {/* Mobile/tablet course info card - shown only on smaller screens */}
                <div className="lg:hidden mt-6 mb-8 ">
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
                            {courseData?.title
                              ?.toLowerCase()
                              .startsWith("odoo") ||
                            courseData?.title
                              ?.toLowerCase()
                              .startsWith("microsoft") ? (
                              <span className="text-base md:text-lg">
                                Offline
                              </span>
                            ) : (
                              <span className="text-base md:text-lg">
                                Use On Desktop, Tablet & Mobile
                              </span>
                           ) }
                          </li>
                          {/* <li className="flex items-center gap-3">
                            <FaInfinity className="text-xl text-gray-500" />
                            <span>Full Lifetime Access</span>
                          </li> */}
                          <li className="flex items-center gap-3">
                            <FaRegClock className="text-2xl text-gray-500" />
                            <span>{courseData?.duration}</span>
                          </li>
                          <li className="flex items-center gap-3 ">
                            <MdDownload
                              className="text-2xl text-gray-500 animate-bounce  mt-[0.32rem] 
                            "
                            />
                            <a href={courseData?.pdfPath} download>
                              <span className="hover:border-b-2 hover:border-orange-200">
                                {" "}
                                Download Brochure
                              </span>
                            </a>
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
                      <div className="flex flex-row items-center justify-center gap-4 pb-2 w-full mt-2 ">
                        {/* Buy Now Button */}
                        <Link
                          to={
                            !user
                              ? `/signup?courseId=${courseId}&type=course`
                              : `/payment?type=course&courseId=${courseId}`
                          }
                          className={`${
                            cartContainsCourse ? "w-full" : "w-full sm:w-1/2"
                          }`}
                        >
                          <button className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
                            <FaRupeeSign />
                            {courseData?.price} /-
                          </button>
                        </Link>

                        {/* Add to Cart Button */}
                        {!cartContainsCourse && (
                          <button
                            className="w-11/12 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
                            onClick={addToCart}
                          >
                            <FaShoppingCart />
                            Add to Cart
                          </button>
                        )}
                      </div>

                      {/* GST Notice */}
                      <p className="text-sm text-gray-600 italic text-center">
                        * 18% GST will be added at checkout.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                <div className="relative pb-[56.25%] w-full h-0">
  <iframe
    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
    src={
      selectedVideo && Boolean(selectedVideo.isPreview)
        ? selectedVideo.url
        : courseData?.courseIntrovideo || "https://www.youtube.com/embed/XcwGoxSYrPo"
    }
    title={
      selectedVideo?.isPreview
        ? selectedVideo.title
        : "Course Introduction"
    }
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
    frameBorder="0"
  ></iframe>
</div>

<div className="bg-white text-black px-4 md:px-6 pt-6">
  <h2 className="text-2xl font-bold mb-2 text-center md:text-left">What you will learn</h2>
  {courseData?.videos?.length > 0 ? (
    courseData.videos.slice(0, visibleCount).map((video) => (
      <div key={video._id} className="mb-3">
        <div
          className={`flex justify-between items-center p-3 rounded cursor-pointer transition-colors ${
            video.isPreview
              ? "bg-gray-50 hover:bg-gray-200"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          onClick={() => {
            console.log("on handle video selection", video);
            handleVideoSelection(video);
          }}
        >
          <span className="text-sm md:text-base font-medium text-black truncate w-full pr-2">
            {video.title}
          </span>
          {video.isPreview ? (
            <span className="text-green-600 text-xs font-semibold whitespace-nowrap">
              Preview
            </span>
          ) : (
            <FaLock className="w-4 h-4 flex-shrink-0 text-gray-600" />
          )}
        </div>
      </div>
    ))
  ) : (
    <ul className="space-y-4">
      {courseData?.whatYouWillLearn?.map((item, index) => (
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

{courseData?.videos?.length > 0 && (
  <div className="flex justify-center gap-2 flex-wrap px-3 pb-4 mt-4">
    {visibleCount < courseData.videos.length && (
      <button
        className="px-3 py-1.5 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 md:text-base"
        onClick={loadMore}
      >
        Load More
      </button>
    )}
    {visibleCount > 5 && (
      <button
        className="px-3 py-1.5 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 md:text-base"
        onClick={loadLess}
      >
        Load Less
      </button>
    )}
  </div>
)}

{/* Enrollment Pop-up */}
{showModal && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg text-center max-w-sm w-full animate-fadeIn">
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
              : `/payment?type=course&courseId=${courseId}`
          }
          className="w-full"
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
                <div className="px-4  max-w-5xl mx-auto">
                  <section className="py-4 mb-6">
                    {/* Course Description */}
                    <h3 className="text-lg md:text-xl font-semibold mt-2 mb-2 text-black">
                      Course Description:
                    </h3>
                    <p className="mb-4 text-gray-800 text-[11pt] md:text-base lg:text-lg text-left md:text-justify">
                      {courseData?.description}
                    </p>

                    {/* Why This Course */}
                    <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                      Why This Course?
                    </h3>
                    <p className="mb-6 text-gray-800 text-[11pt] md:text-base lg:text-lg leading-relaxed text-left md:text-justify tracking-normal">
                      {courseData?.whyCourse}
                    </p>

                    {/* Who Should Enroll */}
                    <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                      Who Should Enroll:
                    </h3>
                    {courseData?.whoShouldEnroll &&
                    courseData.whoShouldEnroll.length > 0 ? (
                      <ul>
                        {courseData.whoShouldEnroll.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start mb-3 last:mb-0"
                          >
                            <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                            <span className="ml-2 text-[11pt] md:text-base lg:text-lg text-gray-800 leading-relaxed text-left md:text-justify">
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

                    {/* Still Confused */}
                    <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                      Still Confused?
                    </h3>
                    {courseData?.stillConfused &&
                    courseData.stillConfused.length > 0 ? (
                      <ul>
                        {courseData.stillConfused.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start mb-3 last:mb-0"
                          >
                            <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                            <span className="ml-2 text-[11pt] md:text-base lg:text-lg text-gray-800 leading-relaxed text-left md:text-justify">
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

                    {/* Reason Why Joshguru */}
                    <h3 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-black">
                      Reason Why Joshguru
                    </h3>
                    {courseData?.reasonWhyJoshGuru &&
                    courseData.reasonWhyJoshGuru.length > 0 ? (
                      <ul className="space-y-1">
                        {courseData.reasonWhyJoshGuru.map((item, index) => (
                          <li key={index} className="flex items-start gap-1.5">
                            <FaCheckCircle className="text-green-500 min-w-[20px] mt-1 text-base md:text-lg" />
                            <span className="ml-2 text-[11pt] md:text-base lg:text-lg text-gray-800 leading-relaxed text-left md:text-justify">
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
                </div>

                {/* Certificate Section */}
                <section className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">
                    Certificate
                  </h1>
                  <p className="text-sm italic mt-3 mb-2 lg:mt-6 text-gray-600 lg:mb-4 lg:ml-2">
                    Unlock better opportunity by sharing your certificate on{" "}
                    <span className="text-blue-600 font-medium">LinkedIn</span>
                  </p>
                  <div className="relative w-full max-w-[500px] border rounded-xl shadow-md overflow-hidden">
                    <img
                      src={certificatePath}
                      alt="Certificate"
                      ref={certificateRef}
                      className="w-full h-auto object-contain"
                    />
                    <button
                      onClick={toggleFullScreen}
                      className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition"
                      aria-label="Full screen"
                    >
                      <FiMaximize size={18} />
                    </button>
                  </div>
                </section>

                {/* Mentor Section */}
                <section className="mt-8 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Mentor
                  </h1>
                  {courseData?.mentor && courseData.mentor.length > 0 ? (
                    <div>
                      {courseData.mentor.map((mentor, index) => (
                        <div
                          key={index}
                          className="flex  flex-row items-center gap-4 mb-2 lg:mb-4 "
                        >
                          <div className="w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 md:mb-0">
                            <img
                              src={
                                mentor?.profileImage ||
                                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                              }
                              alt={mentor?.name || "Mentor"}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h2 className="lg:text-xl text-lg font-semibold">
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
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="YouTube"
                              className="text-black hover:text-red-600"
                            >
                              <FaYoutube size={20} />
                            </a>
                            <a
                              href="#"
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
                        Priya Sharma is a {courseData?.title} with over 8 years
                        of experience. She loves teaching modern JavaScript
                        frameworks and has a strong presence on YouTube, where
                        she shares tips on career growth and tech tutorials.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>

            {/* Right Section - Desktop Sidebar */}
           
          </div>
           {/* right side */}
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
                        {courseData?.isOffline ? (
                          <span className="text-base md:text-lg">offline</span>
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
                      <li className="flex items-center gap-3 ">
                        <MdDownload
                          className="text-2xl text-gray-500 animate-bounce  mt-[0.32rem] 
                            "
                        />
                        <a href={courseData?.pdfPath} download>
                          <span className="hover:border-b-2 hover:border-orange-200">
                            {" "}
                            Download Brochure
                          </span>
                        </a>
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
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-2 w-full mt-8">
                    {/* Buy Now Button */}
                    <Link
                      to={
                        !user
                          ? `/signup?courseId=${courseId}&type=course`
                          : `/payment?type=course&courseId=${courseId}`
                      }
                      className={`${
                        cartContainsCourse ? "w-full" : "w-full sm:w-1/2"
                      }`}
                    >
                      <button className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
                        <FaRupeeSign />
                        {courseData?.price} /-
                      </button>
                    </Link>

                    {/* Add to Cart Button */}
                    {!cartContainsCourse && (
                      <button
                        className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors"
                        onClick={addToCart}
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* GST Note */}
                  <p className="text-sm text-gray-600 italic text-center">
                    * 18% GST will be added at checkout
                  </p>
                </div>
              </div>
            </div>
        
        
      </div>
  ):(
    
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading course information...</div>

      </div>
  )}
  
    </div>
    </div>
  );
};

export default Course;
