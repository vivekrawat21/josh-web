export default function Why() {
    const reasons = [
      {
        title: "If you are a Job Professional",
        description: "Learn AI to land better jobs! Companies love tech skills, and our course helps you get noticed.",
        icon: "👨‍💼",
      },
      {
        title: "If you are a Freelancer",
        description: "Automate your work and increase productivity with AI tools and techniques.",
        icon: "💻",
      },
      {
        title: "If you are an Entrepreneur",
        description: "Leverage AI to scale your business and stay ahead of the competition.",
        icon: "🚀",
      },
    ]
  
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why AI is Important for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  