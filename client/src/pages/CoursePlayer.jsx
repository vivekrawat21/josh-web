import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Menu, X, Circle, CircleDot } from "lucide-react";
import { useParams } from "react-router-dom";
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
  const [showSidebar, setShowSidebar] = useState(true);

  const { courseId } = useParams();
  const user = useSelector((state) => state.user);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
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
    if (course?.videos?.length > 0) {
      const firstVideo = course.videos[0];
      setCurrentVideo(getEmbedUrl(firstVideo.url));
      setCurrentLessonTitle(firstVideo.title);
    }
  }, [course]);

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const playLesson = (videoLink, title) => {
    setCurrentVideo(getEmbedUrl(videoLink));
    setCurrentLessonTitle(title);
    setShowTitle(true);
    setShowSidebar(false)
    setTimeout(() => setShowTitle(false), 3000);
  };

  const toggleModule = (videoId) => {
    setOpenModule(openModule === videoId ? -1 : videoId);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 5);
  const loadLess = () => setVisibleCount((prev) => Math.max(5, prev - 5));

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!course) return <div className="p-4">Course not found.</div>;

  return (
    <div className="flex flex-col bg-white min-h-screen relative">
      {/* Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
      )}

      {/* Content Button at Top */}
      {!showSidebar && (
        <button
          className="md:hidden fixed top-16 right-4 flex items-center p-2 rounded-md bg-white shadow z-50"
          onClick={() => setShowSidebar(true)}
        >
          <Menu size={20} />
          <span className="ml-2 text-sm">Content</span>
        </button>
      )}

      <div className="flex flex-col md:flex-row w-full mt-14 md:mt-0">
        {/* Video Area */}
        <div className="w-full md:w-2/3 bg-white text-black shadow-md flex flex-col">
          <div className="flex items-center justify-between px-3 border-b border-gray-300 sticky top-0 bg-white z-20">
            <h1 className="text-base sm:text-lg font-semibold truncate pr-2 pt-2 pb-3">{course.title}</h1>
          </div>

          <div className="p-2 sm:p-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
              {currentVideo ? (
                <iframe
                  src={currentVideo}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
              )}
              {showTitle && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                  <h3 className="text-sm md:text-lg font-medium">{currentLessonTitle}</h3>
                </div>
              )}
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="flex overflow-x-auto">
              {["ABOUT", "DISCUSSIONS"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium ${
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

          <div className="p-3 sm:p-4 flex-grow">
            {activeTab === "DISCUSSIONS" ? (
              <>
                <h3 className="text-lg sm:text-xl font-bold">Lesson Feedback</h3>
                <textarea
                  placeholder="Give feedback"
                  className="w-full bg-gray-100 outline-none resize-none h-24 border border-gray-300 rounded-lg p-3 mt-4"
                />
                <div className="flex gap-4 mt-3">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600">
                    Post Feedback
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3">About This Course</h3>
                <p className="text-gray-700 text-sm md:text-base">{course.description}</p>
                <div className="mt-4">
                  <h3 className="text-lg sm:text-xl font-bold">What you'll learn:</h3>
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

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block md:w-1/3 md:h-auto`}
        >
          <div className="overflow-y-auto sticky top-0 bg-white px-4 pt-4 pb-3 border-b border-gray-200 z-20 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Course Content</h3>
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100" onClick={() => setShowSidebar(false)}>
              <X className="text-black" size={24} />
            </button>
          </div>

          <div className="p-4">
            {course.videos.length > 0 ? (
              course.videos.slice(0, visibleCount).map((video) => (
                <div key={video._id} className="mb-3">
                  <div
                    className={`flex justify-between items-center p-3 rounded cursor-pointer transition-all duration-300 border-2 ${
                      openModule === video._id
                        ? "border-orange-400 bg-orange-50 shadow-sm"
                        : video.isPreview
                        ? "bg-gray-50 border-transparent hover:border-gray-300"
                        : "bg-gray-100 border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => {
                      toggleModule(video._id);
                      playLesson(video.url, video.title);
                    }}
                  >
                    <span className="text-sm font-medium text-black truncate w-full pr-2">
                      {video.title}
                    </span>
                    {openModule === video._id ? (
                      <CircleDot size={18} className="animate-pulse text-orange-400" />
                    ) : (
                      <Circle size={18} className="text-orange-500" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No videos available.
              </p>
            )}
          </div>

          {course.videos.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap px-4 pb-4">
              {visibleCount < course.videos.length && (
                <button
                  className="px-4 py-2 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white"
                  onClick={loadMore}
                >
                  Load More
                </button>
              )}
              {visibleCount > 5 && (
                <button
                  className="px-4 py-2 text-sm border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white"
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
  );
};

export default CoursePlayer;
