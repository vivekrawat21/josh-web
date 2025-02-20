export default function CourseContent() {
    const modules = [
      {
        title: "Module 1: Fundamentals",
        topics: ["HTML & CSS Basics", "JavaScript Essentials", "Git Version Control"],
      },
      {
        title: "Module 2: Frontend Development",
        topics: ["React.js", "State Management", "API Integration"],
      },
      {
        title: "Module 3: Backend Development",
        topics: ["Node.js", "Express.js", "Database Design"],
      },
      {
        title: "Module 4: Advanced Topics",
        topics: ["Authentication", "Deployment", "Performance Optimization"],
      },
    ]
  
    return (
      <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-400">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-white/90 flex items-center gap-2">
                      <span className="text-orange-200">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  