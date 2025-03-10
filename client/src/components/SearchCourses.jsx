import React, { useState } from "react";
import { Link } from "react-router-dom";
// Sample coursesData
const coursesData = [
  // Excel and Earn using AI and ChatGPT
  {
    id: 1,
    title: "Mastering AI with Excel and ChatGPT",
    description:
      "Leverage AI and Excel to automate processes and enhance productivity.",
    category: "Excel and Earn using AI and ChatGPT",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?excel-ai",
  },
  {
    id: 2,
    title: "Excel Automation with ChatGPT",
    description:
      "Automate repetitive Excel tasks using ChatGPT and boost your efficiency.",
    category: "Excel and Earn using AI and ChatGPT",
    level: "Intermediate",
    price: 5999, // in rupees
    image: "https://source.unsplash.com/random/200x300?automation-excel",
  },
  {
    id: 3,
    title: "AI-Powered Excel Dashboards",
    description: "Create dynamic dashboards in Excel powered by AI insights.",
    category: "Excel and Earn using AI and ChatGPT",
    level: "Advanced",
    price: 6999, // in rupees
    image: "https://source.unsplash.com/random/200x300?dashboard-excel",
  },

  // Content Creation Mastery
  {
    id: 4,
    title: "Become a Content Creation Pro",
    description:
      "Master content creation techniques to build a strong online presence.",
    category: "Content Creation Mastery",
    level: "Intermediate",
    price: 5999, // in rupees
    image: "https://source.unsplash.com/random/200x300?content-creation",
  },
  {
    id: 5,
    title: "Social Media Content Mastery",
    description: "Create engaging social media content and grow your audience.",
    category: "Content Creation Mastery",
    level: "Advanced",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?social-media",
  },
  {
    id: 6,
    title: "Video Content Creation 101",
    description: "Learn how to create impactful video content for your brand.",
    category: "Content Creation Mastery",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?video-creation",
  },

  // Marketing Mastery
  {
    id: 7,
    title: "Complete Marketing Strategies",
    description:
      "Learn cutting-edge marketing strategies to promote your business.",
    category: "Marketing Mastery",
    level: "Advanced",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?marketing",
  },
  {
    id: 8,
    title: "Email Marketing for Beginners",
    description:
      "Start with email marketing to reach and engage your audience.",
    category: "Marketing Mastery",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?email-marketing",
  },
  {
    id: 9,
    title: "SEO Strategies for Content Creators",
    description: "Master SEO to improve your website's ranking and traffic.",
    category: "Marketing Mastery",
    level: "Intermediate",
    price: 6999, // in rupees
    image: "https://source.unsplash.com/random/200x300?seo",
  },

  // Branding Mastery
  {
    id: 10,
    title: "Ultimate Guide to Branding",
    description: "Build a strong brand identity to leave a lasting impression.",
    category: "Branding Mastery",
    level: "Intermediate",
    price: 6999, // in rupees
    image: "https://source.unsplash.com/random/200x300?branding",
  },
  {
    id: 11,
    title: "Personal Branding Success",
    description: "Develop your personal brand and create a unique presence.",
    category: "Branding Mastery",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?personal-branding",
  },
  {
    id: 12,
    title: "Corporate Branding Strategies",
    description:
      "Learn corporate branding strategies to enhance business reputation.",
    category: "Branding Mastery",
    level: "Advanced",
    price: 8999, // in rupees
    image: "https://source.unsplash.com/random/200x300?corporate-branding",
  },

  // Traffic Mastery
  {
    id: 13,
    title: "Traffic Generation Techniques",
    description:
      "Learn proven strategies to drive consistent traffic to your website.",
    category: "Traffic Mastery",
    level: "Advanced",
    price: 8999, // in rupees
    image: "https://source.unsplash.com/random/200x300?website-traffic",
  },
  {
    id: 14,
    title: "Organic Traffic Boost",
    description:
      "Master the art of generating organic traffic to your website.",
    category: "Traffic Mastery",
    level: "Intermediate",
    price: 6999, // in rupees
    image: "https://source.unsplash.com/random/200x300?organic-traffic",
  },
  {
    id: 15,
    title: "Social Media Traffic Growth",
    description: "Drive traffic from social media platforms to your website.",
    category: "Traffic Mastery",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?social-traffic",
  },

  // Influence Mastery
  {
    id: 16,
    title: "Influence Building for Entrepreneurs",
    description: "Master the art of influence and grow your network.",
    category: "Influence Mastery",
    level: "Advanced",
    price: 9999, // in rupees
    image: "https://source.unsplash.com/random/200x300?influence",
  },
  {
    id: 17,
    title: "Networking Skills for Success",
    description: "Build a network of meaningful connections for career growth.",
    category: "Influence Mastery",
    level: "Intermediate",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?networking",
  },
  {
    id: 18,
    title: "Social Influence and Persuasion",
    description:
      "Learn social influence techniques to drive behavior and success.",
    category: "Influence Mastery",
    level: "Beginner",
    price: 5999, // in rupees
    image: "https://source.unsplash.com/random/200x300?persuasion",
  },

  // Finance Mastery
  {
    id: 19,
    title: "Finance Fundamentals for Business",
    description:
      "Develop strong financial management skills to grow your business.",
    category: "Finance Mastery",
    level: "Intermediate",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?finance-business",
  },
  {
    id: 20,
    title: "Personal Finance Management",
    description: "Take control of your personal finances and build wealth.",
    category: "Finance Mastery",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?personal-finance",
  },
  {
    id: 21,
    title: "Investing for Beginners",
    description: "Learn how to invest wisely and grow your wealth over time.",
    category: "Finance Mastery",
    level: "Beginner",
    price: 5999, // in rupees
    image: "https://source.unsplash.com/random/200x300?investing",
  },

  // Development
  {
    id: 22,
    title: "Web Development Essentials",
    description:
      "Learn to build modern web applications with the latest technologies.",
    category: "Development",
    level: "Intermediate",
    price: 6999, // in rupees
    image: "https://source.unsplash.com/random/200x300?web-development",
  },
  {
    id: 23,
    title: "JavaScript Masterclass",
    description: "Master JavaScript and develop dynamic web applications.",
    category: "Development",
    level: "Advanced",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?javascript",
  },
  {
    id: 24,
    title: "Full Stack Development",
    description: "Learn to build full-stack web applications from scratch.",
    category: "Development",
    level: "Advanced",
    price: 8999, // in rupees
    image: "https://source.unsplash.com/random/200x300?full-stack",
  },

  // Business Mastery
  {
    id: 25,
    title: "Business Strategy Masterclass",
    description: "Gain a competitive edge with expert business strategies.",
    category: "Business Mastery",
    level: "Advanced",
    price: 8999,
    image: "https://source.unsplash.com/random/200x300?corporate-branding",
  },
];

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 2);
  };

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 space-y-6">
      {/* Search Input */}
      <h2 className="text-xl sm:text-2xl text-red-700 brightness-200 font-bold">
        Discover Your Next Learning Journey
      </h2>
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tell us what you're looking to learn"
          className="w-full p-4 pl-10 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
        />

        {/* Search Results */}
        {showResults && (
          <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                Courses
              </h4>

              {/* Check if there are no filtered courses */}
              {filteredCourses.length > 0 ? (
                <ul className="space-y-3">
                  {filteredCourses.map((course) => (
                    <li
                      key={course.id}
                      className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-6 h-6 sm:w-8 sm:h-8 mr-3"
                      />
                      <div>
                        <Link to={`/courses/${course.category}/${course.id}`}>
                          <p className="text-gray-700 text-xs sm:text-sm">
                            {course.title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {course.description}
                          </p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-xs sm:text-sm">
                  No courses found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-lg sm:text-xl font-semibold text-center">
        Popular learning goals
      </p>

      {/* Goal Options */}
      <div className="flex flex-wrap gap-2 justify-center w-full sm:w-auto">
        {[
          "Advance to a higher role",
          "Earn a professional certificate",
          "Transition to a new career field",
          "Pursue entrepreneurship",
          "Free Course",
          "Gear up for your first job",
          "Ace interviews skills",
          "Get ready for Government exams",
          
        ].map((goal, index) => (
          <button
            key={index}
            className="inline-flex h-auto text-center py-1 sm:py-2 sm:h-auto px-2 border-2 rounded-md sm:rounded-xl text-gray700 hover:bg-gray-200 focus:ring-2 focus:ring-red-400 text-[12px] sm:text-sm"
          >
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
