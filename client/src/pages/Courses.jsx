"use client"

import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"  // Use navigate instead of useParams
import { useParams } from "react-router-dom"
// Mock course data
const coursesData = [
  // Excel and Earn using AI and ChatGPT
  {
    id: 1,
    title: "Mastering AI with Excel and ChatGPT",
    description: "Leverage AI and Excel to automate processes and enhance productivity.",
    category: "Excel and Earn using AI and ChatGPT",
    level: "Beginner",
    price: 4999, // in rupees
    image: "https://source.unsplash.com/random/200x300?excel-ai",
  },
  {
    id: 2,
    title: "Excel Automation with ChatGPT",
    description: "Automate repetitive Excel tasks using ChatGPT and boost your efficiency.",
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
    description: "Master content creation techniques to build a strong online presence.",
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
    description: "Learn cutting-edge marketing strategies to promote your business.",
    category: "Marketing Mastery",
    level: "Advanced",
    price: 7999, // in rupees
    image: "https://source.unsplash.com/random/200x300?marketing",
  },
  {
    id: 8,
    title: "Email Marketing for Beginners",
    description: "Start with email marketing to reach and engage your audience.",
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
    description: "Learn corporate branding strategies to enhance business reputation.",
    category: "Branding Mastery",
    level: "Advanced",
    price: 8999, // in rupees
    image: "https://source.unsplash.com/random/200x300?corporate-branding",
  },

  // Traffic Mastery
  {
    id: 13,
    title: "Traffic Generation Techniques",
    description: "Learn proven strategies to drive consistent traffic to your website.",
    category: "Traffic Mastery",
    level: "Advanced",
    price: 8999, // in rupees
    image: "https://source.unsplash.com/random/200x300?website-traffic",
  },
  {
    id: 14,
    title: "Organic Traffic Boost",
    description: "Master the art of generating organic traffic to your website.",
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
    description: "Learn social influence techniques to drive behavior and success.",
    category: "Influence Mastery",
    level: "Beginner",
    price: 5999, // in rupees
    image: "https://source.unsplash.com/random/200x300?persuasion",
  },
  
  // Finance Mastery
  {
    id: 19,
    title: "Finance Fundamentals for Business",
    description: "Develop strong financial management skills to grow your business.",
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
    description: "Learn to build modern web applications with the latest technologies.",
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
  }]

// Get unique categories for filter buttons
const categories = Array.from(new Set(coursesData.map((course) => course.category)))

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()  // Initialize the navigate hook
  const category = useParams().category  // Get the category from the URL params
  const id = useParams().id  // Get the id from the URL params
  console.log(category, id)  // Log the category and id
  const [selectedCategory, setSelectedCategory] = useState(category)

  // Filter courses based on search term and selected category
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory ? course.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
  }

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  // Handle course card click (navigate to a course details page)
  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Courses</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-orange-600" type="submit">Search</Button>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden cursor-pointer" onClick={() => handleCourseClick(course.id)}>
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge className="bg-orange-600">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">{course.category}</Badge>
                <p className="font-bold">₹{course.price}</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">No courses found. Try a different search term or category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
