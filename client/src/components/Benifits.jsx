export default function Benifits() {
    const benefits = [
      {
        title: "Instant Access to Full Content",
        description: "Start learning immediately with complete access to all course materials",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-33-6ArXd5X3Fq2S9DAFdExpdBcPXzEKA9.png",
      },
      {
        title: "Detailed Step-by-Step Guide",
        description: "Follow our structured learning path designed for optimal progress",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-33-6ArXd5X3Fq2S9DAFdExpdBcPXzEKA9.png",
      },
      {
        title: "Fun Quizzes and Assignments",
        description: "Reinforce your learning with interactive exercises and projects",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-11%2019-16-33-6ArXd5X3Fq2S9DAFdExpdBcPXzEKA9.png",
      },
    ]
  
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Course Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <img
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  