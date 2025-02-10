import { useState } from "react";
import { FaCertificate, FaInfinity, FaShoppingCart, FaBook, FaLaptopCode, FaRegClock } from "react-icons/fa";
import AccordionItem from "../components/Accordian";

const Course = () => {
   
  const faqData = [
    { id: 1, title: "What is the duration of the course?",content: "The course duration is 6 weeks." },
    { id: 2, title: "What is the refund policy?", content: "You can request a refund within 7 days of purchase." },
    { id: 3, title: "Is there a certificate provided?",  content: "Yes, a certificate of completion is provided." }
  ];

  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };



  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Course Name</h1>
        
        {/* Video Section */}
        <div className="mb-8 relative">
          <iframe
            className="w-full h-72 md:h-[450px] rounded-lg shadow-xl"
            src="https://www.youtube.com/embed/example"
            title="Course Video"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* About the Course */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">About the Course</h2>
          <p className="text-gray-700 text-lg">This course provides in-depth knowledge of XYZ, covering fundamental and advanced topics with hands-on experience and practical skills.</p>
        </div>

        {/* What You Get/Learn */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">What You'll Learn</h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2"><FaBook className="text-orange-500" /> Key concept 1 - Explanation</li>
            <li className="flex items-center gap-2"><FaLaptopCode className="text-orange-500" /> Key concept 2 - Explanation</li>
            <li className="flex items-center gap-2"><FaRegClock className="text-orange-500" /> Key concept 3 - Explanation</li>
          </ul>
        </div>
        
        {/* Course Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Course Content</h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2"><FaBook className="text-orange-500" /> Module 1 - Introduction</li>
            <li className="flex items-center gap-2"><FaLaptopCode className="text-orange-500" /> Module 2 - Deep Dive</li>
            <li className="flex items-center gap-2"><FaRegClock className="text-orange-500" /> Module 3 - Advanced Topics</li>
          </ul>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="lg:col-span-1 bg-white shadow-xl p-6 rounded-lg sticky top-24 h-fit border border-gray-200">
        <span className="block text-center text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500
 text-white py-1 rounded-lg shadow-md animate-pulse mb-3">Limited Period Offer</span>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Course Pricing</h2>
        <p className="text-gray-800 text-2xl font-semibold mb-6">$199.99</p>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Benefits of Purchasing</h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2"><FaCertificate className="text-orange-500" /> Certified Course</li>
            <li className="flex items-center gap-2"><FaInfinity className="text-orange-500" /> Lifetime Access</li>
            <li className="flex items-center gap-2"><FaShoppingCart className="text-orange-500" /> Exclusive Resources</li>
          </ul>
        </div>
        
        <button className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:opacity-90 transition mb-3">
          Enroll Now
        </button>
        <button className="w-full py-3 border border-orange-500 text-orange-600 text-lg font-semibold rounded-lg shadow-md hover:bg-orange-100 transition flex items-center justify-center gap-2">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>

      {/* FAQ Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={faq.id} 
            title={faq.title}
            isOpen={faqOpen === index}
            child={faq.content}
            onClick= {() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>

      {/* Instructor Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md mt-8 mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Meet Your Instructor</h2>
        <div className="flex items-center gap-6 ">
          <img src="/instructor.jpg" alt="Instructor" className="w-24 h-24 rounded-full shadow-md" />
          <p className="text-gray-700 text-md leading-relaxed font-serif">John Doe, an industry expert with over 10 years of experience, has trained thousands of students worldwide. His passion for teaching and deep understanding of the subject make learning engaging and insightful.</p>
        </div>
      </div>
    </div>
  );
};

export default Course;