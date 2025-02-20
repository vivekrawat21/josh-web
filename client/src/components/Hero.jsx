import { useState } from "react"

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-r from-orange-600 to-orange-400">
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">Master Full Stack Development</h1>
          <p className="text-xl opacity-90">
            Learn from industry experts and build real-world projects with our comprehensive course
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Download Brochure
            </button>
            <button className="px-8 py-3 bg-orange-700 text-white rounded-full font-semibold hover:bg-orange-800 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="relative aspect-video bg-black/20 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=400&width=600"
              controls={isPlaying}
              onClick={() => setIsPlaying(true)}
            >
              <source src="/course-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-orange-600 ml-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

