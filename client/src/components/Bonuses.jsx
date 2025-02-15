export default function Bonuses() {
    const bonuses = [
      {
        title: "eBooks and Resources",
        description: "Access comprehensive learning materials and reference guides",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-41-RsYn3D19PSXhUQLLBgw45te1QwAiBt.png",
      },
      {
        title: "Ask Your Mentor",
        description: "Get personalized guidance and answers to your questions",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-41-RsYn3D19PSXhUQLLBgw45te1QwAiBt.png",
      },
      {
        title: "AI Generator Blueprint",
        description: "Exclusive guide to building your own AI applications",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-41-RsYn3D19PSXhUQLLBgw45te1QwAiBt.png",
      },
    ]
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Exclusive Bonuses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bonuses.map((bonus, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden">
                <img src={bonus.image || "/placeholder.svg"} alt={bonus.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{bonus.title}</h3>
                  <p className="text-gray-600">{bonus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  