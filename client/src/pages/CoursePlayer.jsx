import { useState, useEffect } from "react";
// Import ArrowLeft for the back button and useNavigate for navigation
import { ArrowLeft, ChevronDown, ChevronUp, Menu, X, PlayCircle, CheckCircle, Info, MessageSquare } from "lucide-react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Skeleton Loader Component ---
const PlayerSkeleton = () => (
  <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
    {/* Shimmer background definition */}
    <style jsx>{`
      .shimmer-bg {
        background-image: linear-gradient(to right, transparent 0%, #e5e7eb 50%, transparent 100%);
        background-size: 200% 100%;
      }
    `}</style>

    {/* Main Content Skeleton */}
    <div className="w-full md:flex-1 p-3 sm:p-4 animate-shimmer shimmer-bg">
      <div className="h-10 w-3/4 bg-slate-200 rounded-md mb-4"></div>
      <div className="aspect-video w-full bg-slate-200 rounded-xl mb-4"></div>
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-24 bg-slate-200 rounded-md"></div>
        <div className="h-10 w-24 bg-slate-200 rounded-md"></div>
      </div>
      <div className="h-8 w-1/2 bg-slate-200 rounded-md mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 rounded-md"></div>
        <div className="h-4 w-full bg-slate-200 rounded-md"></div>
        <div className="h-4 w-3/4 bg-slate-200 rounded-md"></div>
      </div>
    </div>

    {/* Sidebar Skeleton */}
    <div className="w-full md:w-80 lg:w-96 border-l border-slate-200 p-4 animate-shimmer shimmer-bg">
      <div className="h-8 w-1/2 bg-slate-200 rounded-md mb-6"></div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 w-full bg-slate-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

const CoursePlayer = () => {
  const [activeTab, setActiveTab] = useState("ABOUT");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentLessonTitle, setCurrentLessonTitle] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [showSidebar, setShowSidebar] = useState(true);

  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/course/${courseId}`, { withCredentials: true });
        const fetchedCourse = res.data.data.course;
        setCourse(fetchedCourse || null);
        if (fetchedCourse?.videos?.length > 0) {
          const firstVideo = fetchedCourse.videos[0];
          setCurrentVideo(getEmbedUrl(firstVideo.url));
          setCurrentLessonTitle(firstVideo.title);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return url;
  };

  const playLesson = (video) => {
    setCurrentVideo(getEmbedUrl(video.url));
    setCurrentLessonTitle(video.title);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  if (loading) return <PlayerSkeleton />;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold p-4">{error}</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-slate-600 font-semibold p-4">Course not found.</div>;

  const tabs = [
    { id: "ABOUT", label: "About", icon: Info },
    { id: "DISCUSSIONS", label: "Discussions", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-slate-50 min-h-screen text-slate-800 mt-16 md:mt-0">
      <AnimatePresence>
        {!showSidebar && (
          <motion.button
            className="md:hidden fixed top-20 right-4 flex items-center p-2.5 rounded-full bg-white shadow-lg z-30"
            onClick={() => setShowSidebar(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={20} className="text-orange-500" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full md:flex-1 flex flex-col transition-all duration-300">
        <div className="w-full p-3 sm:p-4 bg-white border-b border-slate-200">
          {/* --- NEW: Back Button and Lesson Title Header --- */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft size={22} className="text-slate-700" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold truncate">
              {currentLessonTitle || course.title}
            </h1>
          </div>
          {/* --- END: New Header --- */}

          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {currentVideo ? (
              <iframe
                key={currentVideo}
                src={currentVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={currentLessonTitle}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">Select a lesson to begin.</div>
            )}
          </div>
        </div>

        {/* The old H1 tag is removed from here as it's now above the video */}
        
        <div className="px-4 border-b border-slate-200">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id ? "" : "hover:text-orange-600/80"} relative rounded-t-md px-3 py-3 text-sm font-medium transition-colors`}
              >
                <span className="flex items-center gap-2">
                  <tab.icon size={16} /> {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 flex-grow overflow-y-auto">
          {activeTab === "ABOUT" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-bold mb-3">About This Course</h3>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
              <div className="mt-6">
                <h3 className="text-xl font-bold">What you'll learn:</h3>
                <ul className="list-none mt-3 space-y-2">
                  {course.whatYouWillLearn.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-bold">Lesson Feedback</h3>
              <textarea
                placeholder="Share your thoughts or ask a question..."
                className="w-full bg-white outline-none resize-none h-28 border border-slate-300 rounded-lg p-3 mt-4 focus:ring-2 focus:ring-orange-400 transition"
              />
              <div className="flex justify-end mt-3">
                <button className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm hover:bg-orange-600 transition shadow-sm">
                  Post Feedback
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setShowSidebar(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 w-80 h-full bg-white border-r border-slate-200 flex flex-col
                         md:static md:w-80 lg:w-96 md:translate-x-0"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <div className="px-2 pt-4 pb-3 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                <Link to={"/dashboard/mycourses"}>
                <h3 className=" text-sm p-[0.35rem] bg-gray-200 font-semibold flex items-center rounded-md hover:shadow-md hover:bg-slate-20 cursor-pointer "> <ArrowLeft /> Course Dashboard</h3>
                </Link>
                <button className="md:hidden p-2 rounded-full hover:bg-slate-100" onClick={() => setShowSidebar(false)}>
                  <X className="text-slate-600" size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-2">
                {course.videos.length > 0 ? (
                  course.videos.slice(0, visibleCount).map((video, index) => {
                    const isActive = getEmbedUrl(video.url) === currentVideo;
                    return (
                      <div
                        key={video._id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 mb-2
                                  ${isActive
                                    ? "border-orange-500 bg-orange-50 font-semibold text-orange-700"
                                    : "border-transparent hover:bg-slate-100"
                                  }`}
                        onClick={() => playLesson(video)}
                      >
                        {isActive ? (
                            <PlayCircle size={20} className="text-orange-500 flex-shrink-0 animate-pulse" />
                        ) : (
                            <span className="text-sm font-medium text-slate-400 w-5 text-center flex-shrink-0">{index + 1}</span>
                        )}
                        <span className="text-sm truncate flex-grow">{video.title}</span>
                        <span className="text-xs text-slate-400 flex-shrink-0">{video.duration}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-slate-500 py-10">No videos available in this course.</p>
                )}
                {visibleCount < course.videos.length && (
                  <div className="text-center mt-2">
                    <button
                      className="w-full px-4 py-2.5 text-sm border-2 border-orange-200 text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition"
                      onClick={loadMore}
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursePlayer;