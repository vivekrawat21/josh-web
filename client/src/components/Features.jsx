export default function Features() {
    const features = [
      {
        title: "100+ Hours of Content",
        description: "Comprehensive curriculum covering all aspects of development",
        icon: "📚",
      },
      {
        title: "Hindi & English",
        description: "Learn in the language you're most comfortable with",
        icon: "🗣️",
      },
      {
        title: "Beginner to Advanced",
        description: "Structured learning path for all skill levels",
        icon: "📈",
      },
      {
        title: "Live + Recorded",
        description: "Flexible learning with both live and recorded sessions",
        icon: "🎥",
      },
    ]
  
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  