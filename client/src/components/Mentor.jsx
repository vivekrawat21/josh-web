export default function Mentor() {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-400">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Meet Your Mentor</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-22-rcYUKVbbdlH7sVSBKbXJHh3cuQhZSA.png"
                alt="Mentor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-20 h-20 flex items-center justify-center rounded-full bg-white/90">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-orange-600 ml-1" />
                </button>
              </div>
            </div>
            <div className="mt-8 text-center text-white">
              <h3 className="text-2xl font-semibold">Expert-Led Learning Experience</h3>
              <p className="mt-4 text-white/90">
                Learn from industry professionals with years of practical experience. Get personalized guidance and
                feedback throughout your learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  