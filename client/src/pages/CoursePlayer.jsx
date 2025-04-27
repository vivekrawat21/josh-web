import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { Circle, CircleDot } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
const CoursePlayer = () => {
  const [activeTab, setActiveTab] = useState("ABOUT");
  const [showTitle, setShowTitle] = useState(false);
  const [openModule, setOpenModule] = useState(1);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentLessonTitle, setCurrentLessonTitle] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [showSidebar, setShowSidebar] = useState(false);

  const { courseId } = useParams();
  const user = useSelector((state) => state.user);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Making API call...");
        const res = await axios.get(`${BASE_URL}/course/${courseId}`, {
          withCredentials: true,
        });

        setCourse(res.data.data.course || null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (course && course.videos && course.videos.length > 0) {
      setCurrentVideo(course.videos[0].url);
      setCurrentLessonTitle(course.videos[0].title);
    }
  }, [course]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const playLesson = (videoLink, title) => {
    setCurrentVideo(videoLink);
    setCurrentLessonTitle(title);
    setShowTitle(true);

    setTimeout(() => setShowTitle(false), 3000);

    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const toggleModule = (videoId) => {
    setOpenModule(openModule === videoId ? -1 : videoId);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 5);
  const loadLess = () => setVisibleCount((prev) => Math.max(5, prev - 5));

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-10 w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="aspect-video bg-gray-200 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-center p-4 max-w-md">
          Error loading course: {error}
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[50vh]">
        <p className="text-center p-4 max-w-md">Course not found.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white min-h-screen">
      {course ? (
        <div className={`flex flex-col md:flex-row w-full relative `}>
          {/* Main Content Area */}
          <div  className={`w-full md:w-2/3 bg-white text-black shadow-md flex flex-col `}
>
            {/* Course Title Bar with Mobile Sidebar Toggle */}
            <div className={`flex items-center justify-between px-3 border-b border-gray-300 sticky top-0 bg-white z-20 
               
              `}>
              <h1 className="text-base sm:text-lg font-semibold truncate pr-2 pt-2 pb-3">
                {course.title}
              </h1>
              <button
                className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label="Toggle course content"
              >
                {showSidebar ? <X size={20} /> : <Menu size={20} />}
                <span className="ml-2 text-sm">Content</span>
              </button>
            </div>

            {/* Video Player */}
            <div className="p-2 sm:p-4">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
                {currentVideo ? (
                  <iframe
                    src={currentVideo}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Course Video"
                  ></iframe>
                ) : (
                  <div className="animate-pulse w-full h-full bg-gray-300 rounded-lg" />
                )}
                {showTitle && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 md:p-3 transition-opacity">
                    <h3 className="text-sm md:text-lg font-medium line-clamp-2">
                      {currentLessonTitle}
                    </h3>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300">
              <div className="flex overflow-x-auto">
                {["ABOUT", "DISCUSSIONS"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                      activeTab === tab
                        ? "border-b-2 border-orange-500 text-orange-600"
                        : "text-gray-500 hover:text-orange-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-3 sm:p-4 flex-grow">
              {activeTab === "DISCUSSIONS" ? (
                <>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Lesson Feedback
                  </h3>
                  <textarea
                    placeholder="Give a feedback"
                    className="w-full bg-gray-100 outline-none resize-none h-24 border border-gray-300 rounded-lg p-3 mt-4"
                  ></textarea>
                  <div className="flex gap-4 mt-3">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition">
                      Post Feedback
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-2 sm:mt-2">
                  <h3 className="text-lg sm:text-xl font-bold mb-3">
                    About This Course
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {course.description}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-bold">
                      What you'll learn:
                    </h3>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1 md:text-base">
                      {course.whatYouWillLearn.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Content Sidebar - Mobile Overlay / Desktop Side Panel */}
          <div
            className={`
    ${showSidebar ? "fixed  inset-0 z-30 bg-gray-900 bg-opacity-50" : "hidden"} 
    md:relative md:block md:w-1/3 md:bg-white md:text-black md:border-l md:border-gray-300 md:z-10
  `}
          >
            <div
              className={`
      ${
        showSidebar
          ? "fixed right-0 top-0 w-full max-w-xs h-full bg-white transform transition-transform duration-300 ease-in-out translate-x-0"
          : "translate-x-full"
      }
      md:static md:transform-none md:max-w-none md:w-full md:h-auto md:max-h-screen md:overflow-y-auto
    `}
            >
              {/* Sidebar Header */}
              <div className="overflow-y-auto sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 z-20 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Course Content</h3>

                {/* Close button (only visible on small screens) */}
              </div>

              {/* Sidebar Content */}

              <div className="p-4">
                {showSidebar && (
                  <button
                    className="block md:hidden top-0 left-64 p-2 rounded-full hover:bg-gray-100 relative z-50"
                    onClick={() => setShowSidebar(false)}
                    aria-label="Close sidebar"
                  >
                    <X className="text-black " size={24} />
                  </button>
                  

                )}

                {course.videos.length > 0 ? (
                  course.videos.slice(0, visibleCount).map((video) => (
                    <div key={video._id} className="mb-3">
                    
                      <div
                        className={`
    flex justify-between items-center p-3 rounded cursor-pointer transition-all duration-300 border-2 
    ${
      openModule === video._id
        ? "border-orange-400 bg-orange-50 shadow-sm"
        : video.isPreview
        ? "bg-gray-50 border-transparent hover:border-gray-300"
        : "bg-gray-100 border-transparent hover:border-gray-300"
    }
  `}
                        onClick={() => {
                          toggleModule(video._id);
                          playLesson(video.url, video.title);
                        }}
                      >
                        <span className="text-sm font-medium text-black truncate w-full pr-2">
                          {video.title}
                        </span>

                        {openModule === video._id ? (
                          <CircleDot
                            size={18}
                            className="animate-pulse text-orange-400"
                          />
                        ) : (
                          <Circle size={18} className="text-orange-500" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    Currently, No videos available for this course.
                  </p>
                )}
              </div>

              {/* Load More/Less Buttons */}
              {course.videos.length > 0 && (
                <div className="flex justify-center gap-2 flex-wrap px-4 pb-4 ">
                  {visibleCount < course.videos.length && (
                    <button
                      className="px-4 py-2 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 "
                      onClick={loadMore}
                    >
                      Load More
                    </button>
                  )}
                  {visibleCount > 5 && (
                    <button
                      className="px-4 py-2 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      onClick={loadLess}
                    >
                      Load Less
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-white text-center p-6 min-h-[50vh]">
          <div className="max-w-md p-6 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-xl text-gray-700 font-semibold">
              🚫 You have not purchased this course.
            </p>
            <p className="mt-2 text-gray-600">
              Please enroll in this course to access the content.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
