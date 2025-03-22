import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const allBlogPosts = [
  {
    id: 1,
    title: "Introducing Our New Product Line",
    excerpt: "We're excited to announce our latest product line designed to revolutionize your workflow and boost productivity.",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Product",
    image: "https://via.placeholder.com/600x400",
    author: {
      name: "Alex Johnson",
      avatar: "https://via.placeholder.com/40",
    },
  },
  {
    id: 2,
    title: "5 Tips for Improving Team Collaboration",
    excerpt: "Discover proven strategies to enhance communication and collaboration within your team, leading to better results.",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Productivity",
    image: "https://via.placeholder.com/600x400",
    author: {
      name: "Sarah Miller",
      avatar: "https://via.placeholder.com/40",
    },
  },
  {
    id: 3,
    title: "The Future of Remote Work",
    excerpt: "Explore how remote work is evolving and what trends to expect in the coming years as companies adapt to new work models.",
    date: "March 5, 2025",
    readTime: "10 min read",
    category: "Workplace",
    image: "https://via.placeholder.com/600x400",
    author: {
      name: "David Chen",
      avatar: "https://via.placeholder.com/40",
    },
  },
  // Add more articles for "View All" functionality
  {
    id: 4,
    title: "How to Boost Your Team’s Efficiency",
    excerpt: "Efficiency is key. Learn how to streamline processes and boost your team's output.",
    date: "March 1, 2025",
    readTime: "7 min read",
    category: "Teamwork",
    image: "https://via.placeholder.com/600x400",
    author: {
      name: "Michael Smith",
      avatar: "https://via.placeholder.com/40",
    },
  },
  {
    id: 5,
    title: "The Best Practices for Remote Work",
    excerpt: "Maximize productivity in a remote work environment with these best practices.",
    date: "February 25, 2025",
    readTime: "6 min read",
    category: "Remote Work",
    image: "https://via.placeholder.com/600x400",
    author: {
      name: "Emily Brown",
      avatar: "https://via.placeholder.com/40",
    },
  },
  // More articles can be added here
];
const Blogs = () => {
  // Load an initial number of articles, for example, 3
  const [blogPosts, setBlogPosts] = useState(allBlogPosts.slice(0, 3));
  const [showAll, setShowAll] = useState(false);

  // Function to load more articles
  const handleViewAll = () => {
    if (!showAll) {
      setBlogPosts(allBlogPosts); // Load all articles
      setShowAll(true);
    } else {
      setBlogPosts(allBlogPosts.slice(0, 3)); // Reset to initial articles
      setShowAll(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The latest news, articles, and resources, curated by our team.
        </p>
      </div>

      {/* Featured post */}
      <div className="mb-16 grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="px-2 py-1 bg-gray-200 rounded">{blogPosts[0].category}</span>
            <span className="ml-4 text-sm text-gray-500">{blogPosts[0].date}</span>
          </div>
          <h2 className="text-2xl mb-4">{blogPosts[0].title}</h2>
          <p className="mb-4">{blogPosts[0].excerpt}</p>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={blogPosts[0].author.avatar}
              alt={blogPosts[0].author.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{blogPosts[0].author.name}</span>
            <span className="ml-4 text-sm text-gray-500">{blogPosts[0].readTime}</span>
          </div>
          <Link to={`/blogs/${blogPosts[0].id}`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Read Article
            </button>
          </Link>
        </div>
      </div>

      {/* Blog post grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <motion.div
            key={post.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.03 }} // Minimal hover effect for scaling
            transition={{ type: "spring", stiffness: 300 }} // Smooth transition
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <div className="mb-2">
                <span className="px-2 py-1 bg-gray-200 rounded">{post.category}</span>
                <span className="ml-4 text-sm text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{post.author.name}</span>
                <span className="ml-4 text-sm text-gray-500">{post.readTime}</span>
              </div>
              <Link to={`/blogs/${post.id}`}>
                <button
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded"
                >
                  Read Article
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View all button */}
      <div className="text-center mt-12">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded"
          onClick={handleViewAll}
        >
          {showAll ? "Show Less" : "View All Articles"}
        </button>
      </div>
    </div>
  );
};

export default Blogs;
