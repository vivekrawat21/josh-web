"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Lock, Paperclip } from "lucide-react"

function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("DISCUSSIONS")
  const videoRef = useRef(null)
  const [isEnrolled, setIsEnrolled] = useState(false) // Simulate enrollment status
  const [showTitle, setShowTitle] = useState(false)
  const [progress, setProgress] = useState(0)
  const [openModule, setOpenModule] = useState(1)
  const [currentVideo, setCurrentVideo] = useState("https://www.w3schools.com/html/mov_bbb.mp4")
  const [currentLessonTitle, setCurrentLessonTitle] = useState("HTML and VSCode - Getting Started")

  const courseData = {
    title: "Chai aur HTML in Hindi",
    about: "This course covers everything you need to know about HTML, from basics to advanced concepts like forms, tables, and accessibility.",
    modules: [
      {
        id: 1,
        title: "Complete HTML Course",
        lessons: [
          { title: "HTML and VSCode - Getting Started", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Tags and Elements", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Forms and Input Fields", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Tables and Lists", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Semantic Elements", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Multimedia Elements", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML Attributes and Global Attributes", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
        ],
      },
      {
        id: 2,
        title: "Advanced HTML and Forms",
        locked: !isEnrolled,
        lessons: [
          { title: "Advanced HTML Introduction", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "Complex Form Structures", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "Form Validation Techniques", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "Advanced Table Layouts", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "HTML5 APIs and Features", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "Responsive HTML Design", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { title: "Accessibility Best Practices", type: "video", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4" },
        ],
      },
    ],
  };

  // Toggle title visibility when clicking on video
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
    setShowTitle(true)
    setTimeout(() => setShowTitle(false), 3000)
  }

  // Play selected lesson
  const playLesson = (videoLink, title) => {
    setCurrentVideo(videoLink)
    setCurrentLessonTitle(title)
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }

  // Toggle module expansion
  const toggleModule = (moduleId, isLocked) => {
    if (!isLocked) {
      setOpenModule(openModule === moduleId ? -1 : moduleId)
    }
  }

  // Simulate progress update
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      <div className="w-full md:w-2/3 bg-white text-black shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center">
            <button className="mr-4 text-gray-600">⬅</button>
            <h1 className="text-lg font-medium">
              {courseData.title} - {currentLessonTitle}
            </h1>
          </div>
        </div>

        <div className="relative p-4">
          <div
            className="aspect-video bg-gray-200 cursor-pointer rounded-lg overflow-hidden shadow-md"
            onClick={handleVideoClick}
          >
            <video ref={videoRef} controls className="w-full h-full rounded-lg">
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {showTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 transition-opacity">
                <h3 className="text-lg font-medium">{currentLessonTitle}</h3>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-gray-300 flex">
          {["ABOUT", "DISCUSSIONS"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
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
              <h3 className="text-2xl font-bold">Lesson Discussion</h3>
              <textarea
                placeholder="Start a Discussion"
                className="w-full bg-gray-100 outline-none resize-none h-20 border border-gray-300 rounded-lg p-2 mt-4"
              ></textarea>
              <div className="flex gap-4 mt-2">
                <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">POST DISCUSSION</button>
                <button className="px-4 py-2 bg-transparent border border-gray-300 rounded text-sm flex items-center gap-2">
                  <Paperclip size={16} /> ATTACH FILE
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h3 className="text-2xl font-bold mb-4">About This Course</h3>
              <p className="text-gray-700">{courseData.about}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-lg">What you'll learn:</h4>
                <ul className="list-disc pl-5 mt-2">
                  {courseData.modules.flatMap((module) =>
                    module.lessons.map((lesson, index) => (
                      <li key={`${module.id}-${index}`}>{lesson.title}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - always visible */}
      <div className="w-full md:w-1/3 bg-white text-black border-l border-gray-300 md:relative fixed bottom-0 h-auto md:h-full overflow-y-auto">
        <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
          <h3 className="font-semibold">Course Content</h3>
        </div>
        <div className="p-4">
          {courseData.modules.map((module) => (
            <div key={module.id} className="mb-4">
              <div
                className={`flex justify-between items-center p-3 rounded cursor-pointer hover:bg-gray-200 
                           ${module.locked ? "bg-gray-50 text-gray-500" : "bg-gray-100"}`}
                onClick={() => toggleModule(module.id, module.locked)}
              >
                <div>
                  <span className="text-lg font-semibold text-orange-500">
                    {module.id.toString().padStart(2, "0")}{" "}
                  </span>
                  {module.title}
                  <p className="text-sm text-gray-600">{module.lessons.length} Lessons</p>
                </div>
                {module.locked ? (
                  <Lock size={20} className="text-gray-400" />
                ) : openModule === module.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {openModule === module.id && !module.locked && (
                <div className="mt-2 bg-gray-50 rounded p-2">
                  {module.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded cursor-pointer"
                      onClick={() => playLesson(lesson.videoLink, lesson.title)}
                    >
                      <span className="text-orange-400">📹</span>
                      <p className="truncate">{lesson.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer

