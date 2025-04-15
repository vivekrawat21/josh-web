import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("DISCUSSIONS")
  const [showTitle, setShowTitle] = useState(false)
  const [openModule, setOpenModule] = useState(1)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [currentLessonTitle, setCurrentLessonTitle] = useState("")
  const [visibleCount, setVisibleCount] = useState(5)
  const { courseId } = useParams()
  const { courses, loading, error } = useSelector((state) => state.course)
  const user = useSelector((state) => state.user)

  const course = courses[0]?.find((course) => course._id === courseId)
  const courseExists = user?.courses.some(course => course._id.toString() === courseId.toString())

  useEffect(() => {
    if (!loading && course && courseExists && course.videos.length > 0) {
      setCurrentVideo(course.videos[0].url)
      setCurrentLessonTitle(course.videos[0].title)
    }
  }, [loading, course, courseExists])

  const playLesson = (videoLink, title) => {
    setCurrentVideo(videoLink)
    setCurrentLessonTitle(title)
    setShowTitle(true)
    setTimeout(() => setShowTitle(false), 3000)
  }

  const toggleModule = (videoId) => {
    setOpenModule(openModule === videoId ? -1 : videoId)
  }

  const loadMore = () => setVisibleCount(prev => prev + 5)
  const loadLess = () => setVisibleCount(prev => prev - 5)

  if (loading || !user) {
    return (
      <div className="p-6 sm:p-10 w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="aspect-video bg-gray-200 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mt-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error) return <p className="text-red-500 text-center p-4">Error loading courses: {error}</p>
  if (!course) return <p className="text-center p-4">Course not found</p>

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      {courseExists ? (
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-2/3 bg-white text-black shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h1 className="text-lg font-semibold truncate w-full pr-2">{course.title}</h1>
            </div>

            <div className="relative p-4">
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
                    <h3 className="text-sm md:text-lg font-medium">{currentLessonTitle}</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-gray-300 flex overflow-x-auto">
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

            <div className="p-4">
              {activeTab === "DISCUSSIONS" ? (
                <>
                  <h3 className="text-xl font-bold">Lesson Feedback</h3>
                  <textarea
                    placeholder="Give a feedback"
                    className="w-full bg-gray-100 outline-none resize-none h-24 border border-gray-300 rounded-lg p-3 mt-4"
                  ></textarea>
                  <div className="flex gap-4 mt-3">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition">Post Feedback</button>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{course.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">What you'll learn:</h4>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {course.whatYouWillLearn.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white text-black border-t md:border-t-0 md:border-l border-gray-300 h-[300px] md:h-auto md:max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white p-3 border-b border-gray-200 z-10">
              <h3 className="font-semibold text-base md:text-lg">Course Content</h3>
            </div>
            <div className="p-4">
              {course.videos.slice(0, visibleCount).map((video) => (
                <div key={video._id} className="mb-3">
                  <div
                    className={`flex justify-between items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${video.isPreview ? "bg-gray-50 text-gray-500" : "bg-gray-100"}`}
                    onClick={() => {
                      toggleModule(video._id)
                      playLesson(video.url, video.title)
                    }}
                  >
                    <span className="text-sm font-medium text-black truncate w-full pr-2">{video.title}</span>
                    {openModule === video._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 flex-wrap px-4 pb-4">
              {visibleCount < course?.videos.length && (
                <button
                  className="px-4 py-2 border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  onClick={loadMore}
                >
                  Load More
                </button>
              )}
              {visibleCount > 5 && (
                <button
                  className="px-4 py-2 border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-500 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  onClick={loadLess}
                >
                  Load Less
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center bg-white text-center p-10">
          <p className="text-xl text-gray-700 font-semibold">🚫 You have not bought this course.</p>
        </div>
      )}
    </div>
  )
}

export default CoursePlayer