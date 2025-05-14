import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASE_URL } from "../utils/utils"
import { useNavigate } from "react-router-dom"

const WebinarBanner = ({ isAdmin = true, autoRotateInterval = 60000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [webinars, setWebinars] = useState([])

  const fetchWebinars = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/webinar/`)
      setWebinars(response.data.data.webinars)
    } catch (error) {
      console.error("Error fetching webinars:", error)
    }
  }

  useEffect(() => {
    fetchWebinars()
  }, [])

  useEffect(() => {
    if (!isVisible || webinars.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % webinars.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [webinars, autoRotateInterval, isVisible])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + webinars.length) % webinars.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % webinars.length)
  }

  return (
    <div className="relative w-full overflow-hidden px-2 sm:px-4 md:p-5">
      {isAdmin && (
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label={isVisible ? "Hide banner" : "Show banner"}
        >
          <X className={`h-4 w-4 text-gray-700 transition-transform ${isVisible ? "" : "rotate-45"}`} />
        </button>
      )}

      {isVisible && webinars.length > 0 && (
        <>
          {/* Desktop View */}
          <div className="hidden md:block">
            {webinars.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Previous webinar"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Next webinar"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={webinars[currentIndex]?.id || currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <WebinarBannerItem webinar={webinars[currentIndex]} />
              </motion.div>
            </AnimatePresence>

            {webinars.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-30">
                {webinars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to webinar ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-3">
              {webinars.map((webinar, index) => (
                <div
                  key={index}
                  className="snap-start shrink-0 w-full px-2"
                >
                  <WebinarBannerItem webinar={webinar} mobile />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function WebinarBannerItem({ webinar, mobile = false }) {
  const navigate = useNavigate()

  const handleSingleWebinar = (webinarId) => {
    const slug = webinar.categories
    navigate(`/${slug}/${webinarId}`)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg ${mobile ? "h-[330px]" : ""}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300" />

      <div className={`relative z-10 p-3 sm:p-4 md:p-6 flex ${mobile ? "flex-col" : "flex-col md:flex-row"} items-center gap-3 md:gap-6 h-full`}>
        <div className={`w-full ${mobile ? "h-[140px]" : "md:w-1/3 aspect-video"} rounded-lg overflow-hidden shadow-md`}>
          <img
            src={webinar.thumbnail || "/placeholder.svg"}
            alt={webinar.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-semibold w-fit mb-2 sm:mb-3">
            <span className="animate-pulse">🔥</span>
            Upcoming Webinar
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">{webinar.title}</h2>

          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white/70 shadow-md">
              <img
                src={webinar.presenterImage || "/placeholder.svg"}
                alt={webinar.presenterName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{webinar.presenterName}</h3>
              <p className="text-xs text-white/80">{webinar.presenterRole}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{formatDate(webinar.date)}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{webinar.time}</span>
            </div>
          </div>

          <Button
            className="bg-white text-orange-600 hover:bg-orange-50 shadow-md text-xs sm:text-sm"
            size="sm"
            onClick={() => handleSingleWebinar(webinar._id)}
          >
            Book Your Spot
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WebinarBanner
