"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Ashish",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-27-bgJ3zt6veFl93EjYW07NzQYzCMeNlC.png",
    text: "I am genuinely grateful for the impact his training has had on our capabilities. Without hesitation, I recommend Aashish to anyone looking to understand and apply AI in their work. His program is not just educational; it's transformative.",
  },
  {
    name: "Nitish",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-27-bgJ3zt6veFl93EjYW07NzQYzCMeNlC.png",
    text: "His willingness to share his expertise and explain complex concepts in a clear and understandable manner has been a game-changer for me. Aashish's deep understanding of AI has helped me grasp the intricacies of the technology.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-400 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Student Feedback</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                  <p className="text-lg mb-6">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium">{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

