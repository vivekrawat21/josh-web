"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

function CoursePlayer() {
  const [activeTab, setActiveTab] = useState("DISCUSSIONS")
  // const [isEnrolled, setIsEnrolled] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [openModule, setOpenModule] = useState(1)
  const [currentVideo, setCurrentVideo] = useState(" ")
  const [currentLessonTitle, setCurrentLessonTitle] = useState("HTML and VSCode - Getting Started")
  const { courseId } = useParams()
  const { courses, loading, error } = useSelector((state) => state.course)

  if (loading) return <p>Loading courses...</p>
  if (error) return <p>Error loading courses: {error}</p>

  const course = courses[0]?.find((course) => course._id === courseId)
  if (!course) return <p>Course not found</p>
  // setCurrentVideo(course.videos[0]?.url || " ")

  const playLesson = (videoLink, title) => {
    setCurrentVideo(videoLink)
    setCurrentLessonTitle(title)
    setShowTitle(true)
    setTimeout(() => setShowTitle(false), 3000)
  }

  const toggleModule = (videoId, isPreview) => {
    console.log("video toggled")
    if (!isPreview) {
      setOpenModule(openModule === videoId ? -1 : videoId)
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      {/* Left Video Panel */}
      <div className="w-full md:w-2/3 bg-white text-black shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h1 className="text-lg font-medium">{course.title}</h1>
        </div>

        <div className="relative p-4">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
            <iframe
              src={currentVideo}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            ></iframe>
            {showTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 transition-opacity">
                <h3 className="text-lg font-medium">{currentLessonTitle}</h3>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
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
              <h3 className="text-2xl font-bold">Lesson FEEDBACK</h3>
              <textarea
                placeholder="Give a feedback"
                className="w-full bg-gray-100 outline-none resize-none h-20 border border-gray-300 rounded-lg p-2 mt-4"
              ></textarea>
              <div className="flex gap-4 mt-2">
                <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">POST FEEDBACK</button>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h3 className="text-2xl font-bold mb-4">About This Course</h3>
              <p className="text-gray-700">{course.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-lg">What you'll learn:</h4>
                <ul className="list-disc pl-5 mt-2">
                  {course.whatYouWillLearn.flatMap((module) =>
                    module.lessons.map((lesson, index) => (
                      <li key={`${module.id}-${index}`}>{lesson}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/3 bg-white text-black border-l border-gray-300 md:relative fixed bottom-0 h-auto md:h-full overflow-y-auto">
        <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
          <h3 className="font-semibold">Course Content</h3>
        </div>
        <div className="p-4">
          {course.videos.map((video) => (
            <div key={video._id} className="mb-4">
              <div
                className={`flex justify-between items-center p-3 rounded cursor-pointer hover:bg-gray-200 
                  ${video.isPreview ? "bg-gray-50 text-gray-500" : "bg-gray-100"}`}
                onClick={() => {
                  toggleModule(video._id, video.isPreview)
                  if (video.isPreview) {
                    playLesson(video.url, video.title)
                  }
                }}
              >
                <span className="text-sm font-medium text-black">{video.title}</span>
                {!video.isPreview ? (
                  <Lock size={20} className="text-gray-400" />
                ) : openModule === video._id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer
