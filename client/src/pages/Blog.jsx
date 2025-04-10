// import React from "react";

// const blog = {
//   id: 1,
//   title: "The Benefits of Daily Meditation",
//   author: {
//     name: "Sophia Johnson",
//     avatar: "https://via.placeholder.com/40",
//   },
//   date: "March 1, 2025",
//   image: "https://via.placeholder.com/600x400",
//   content: `
//     Meditation is one of the simplest and most effective ways to reduce stress,
//     increase concentration, and improve overall well-being. Incorporating
//     meditation into your daily routine can lead to long-term benefits for both
//     your mental and physical health.

//     The Science Behind Meditation
//     Research shows that meditation helps activate the parasympathetic nervous
//     system, leading to a state of relaxation. It reduces cortisol levels, which
//     are often associated with stress.

//     Practical Tips for Beginners
//     1. Start small – try meditating for just 5-10 minutes a day.
//     2. Focus on your breathing – inhale deeply, exhale slowly.
//     3. Use guided meditation apps for support.

//     Conclusion
//     By setting aside a few minutes each day to meditate, you can experience
//     improved focus, emotional balance, and a greater sense of calm.
//   `,
// };

// const BlogPage = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen py-12">
//       <div className="max-w-4xl mx-auto px-4 lg:px-6">
//         <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-800">
//           {blog.title}
//         </h1>

//         {/* Author and Date */}
//         <div className="flex items-center gap-4 mb-6">
//           <img
//             src={blog?.author?.avatar}
//             alt={blog?.author?.name}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-lg font-semibold text-gray-700">
//               {blog.author.name}
//             </p>
//             <p className="text-gray-500 text-sm">{blog.date}</p>
//           </div>
//         </div>

//         {/* Blog Image */}
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-auto mb-8 rounded-lg object-cover shadow-lg"
//         />

//         {/* Blog Content */}
//         <div className="prose max-w-none text-gray-700 whitespace-pre-line">
//           {blog.content}
//         </div>

//         {/* About the Author */}
//         <div className="mt-8 p-6 border border-gray-300 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-2">About the Author</h2>
//           <p className="text-gray-600">
//             {blog.author.name} is a passionate writer with experience in covering
//             a wide range of topics, including {blog.title.split(" ")[1].toLowerCase()} and personal growth.{" "}
//             {blog.author.name} enjoys sharing knowledge and connecting with readers.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;


import React from 'react';
import { BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
const post = {
  title: "A Beginner's Guide on How to Start Your Amazon FBA Journey",
  category: "Amazon FBA",
  date: "February 12, 2024",
  author: "admin",
  headerImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  content: `
Are you a beginner who wants to dive into the world of e-commerce and make your own mark? Look no further! Amazon FBA is your ticket to hassle-free selling, allowing you to focus on growing your business while Amazon takes care of all the other requirements. Amazon FBA is your stress-buster for selling online. Imagine focusing on your business dreams while Amazon handles the rest. It's like having a business buddy making things super easy!

## What is Amazon FBA?

Amazon FBA is a revolutionary fulfilment service provided by the e-commerce giant for online orders. When you sign up as an Amazon seller and opt for FBA, the process becomes incredibly simple. All you need to do is ship your products to Amazon Fulfilment Centers. From that point forward, Amazon does the rest of the hard work for you – storing your inventory and managing the entire shipping process, including packing and delivering the products to the customer's doorstep.

## Benefits of Amazon FBA

1. **Hassle-free Fulfillment**: Amazon handles storage, packing, and shipping
2. **Prime Eligibility**: Your products become eligible for Amazon Prime
3. **Customer Service**: Amazon manages returns and customer inquiries
4. **Scalability**: Easy to grow your business without logistics concerns

### Getting Started

1. Create your Amazon Seller account
2. Choose your products carefully
3. Source your inventory
4. Prepare and ship products to Amazon
5. List your products on Amazon

> "Success on Amazon FBA starts with choosing the right products and understanding your market."

For more detailed information, visit [Amazon's FBA page](https://sell.amazon.com/fulfillment-by-amazon).
`
};
const Blog = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        {/* Blog Header */}
        <div className="mb-8">
          <img 
            src={post.headerImage} 
            alt={post.title} 
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-2xl shadow-lg mb-8"
          />
          <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-4 text-sm sm:text-base">
            <span className="flex items-center gap-1">
              <BookOpen size={18} />
              {post.category}
            </span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
        </div>

        {/* Blog Content with Markdown */}
        <div className="prose prose-base sm:prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-3" {...props} />,
              p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
              ),
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
