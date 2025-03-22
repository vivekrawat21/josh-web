import React from "react";

const blog = {
  id: 1,
  title: "The Benefits of Daily Meditation",
  author: {
    name: "Sophia Johnson",
    avatar: "https://via.placeholder.com/40",
  },
  date: "March 1, 2025",
  image: "https://via.placeholder.com/600x400",
  content: `
    Meditation is one of the simplest and most effective ways to reduce stress,
    increase concentration, and improve overall well-being. Incorporating
    meditation into your daily routine can lead to long-term benefits for both
    your mental and physical health.

    The Science Behind Meditation
    Research shows that meditation helps activate the parasympathetic nervous
    system, leading to a state of relaxation. It reduces cortisol levels, which
    are often associated with stress.

    Practical Tips for Beginners
    1. Start small – try meditating for just 5-10 minutes a day.
    2. Focus on your breathing – inhale deeply, exhale slowly.
    3. Use guided meditation apps for support.

    Conclusion
    By setting aside a few minutes each day to meditate, you can experience
    improved focus, emotional balance, and a greater sense of calm.
  `,
};

const BlogPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
          {blog.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={blog?.author?.avatar}
            alt={blog?.author?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {blog.author.name}
            </p>
            <p className="text-gray-500 text-sm">{blog.date}</p>
          </div>
        </div>

        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto mb-8 rounded-lg object-cover shadow-lg"
        />

        {/* Blog Content */}
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {blog.content}
        </div>

        {/* About the Author */}
        <div className="mt-8 p-6 border border-gray-300 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">About the Author</h2>
          <p className="text-gray-600">
            {blog.author.name} is a passionate writer with experience in covering
            a wide range of topics, including {blog.title.split(" ")[1].toLowerCase()} and personal growth.{" "}
            {blog.author.name} enjoys sharing knowledge and connecting with readers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
