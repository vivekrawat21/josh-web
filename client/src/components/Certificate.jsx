export default function Certificate() {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-36-osrW613gxsuLZE63AhacHAwkHNn95j.png"
                alt="Certificate of Completion"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Earn Your Certificate</h2>
              <p className="text-lg text-gray-600 mb-8">
                Upon completion of the course, receive a verified certificate that you can share with your network and
                potential employers. Our certificates are recognized in the industry and demonstrate your expertise in
                full-stack development.
              </p>
              <button className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  