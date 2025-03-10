import {
  FaCertificate,
  FaInfinity,
  FaShoppingCart,
  FaBook,
  FaLaptopCode,
  FaRegClock,
  FaRegBell,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import FAQ from "../components/FAQ";
import axios from "axios";
import { useParams } from "react-router-dom";

import {useState, useEffect } from "react";
import { BASE_URL } from "@/utils/utils";
const Course = () => {
  const {id} = useParams();
  const [course,setCourse] = useState(null);
  console.log(id)
  const fetchCourse = async()=>{
    const res = await axios.get(`${BASE_URL}/course/${id}`);
    console.log(res.data.data.course)
    setCourse(res.data.data.course)
    console.log(course.title)

  }
  useEffect(()=>{
    if(course!=null){
      return;
    }
    fetchCourse()
  },[])
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {course?.title}
        </h1>

        {/* Video Section */}
        <div className="mb-8 relative">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Dhpb0rz8fjU?si=5leyB-1ehX_3MAIi"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        {/* About the Course */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            What IsPersonality Development ?
          </h2>
          <p className="text-gray-700 text-lg">
            Personality development is a multifaceted process encompassing
            various aspects of an individual's life. From social skills to
            emotional intelligence, every facet plays a crucial role in shaping
            who we are. It's essential to recognize that personal growth is an
            ongoing journey, and embracing change is key.
          </p>
        </div>

        {/* What You Get/Learn */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            What you’ll Learn from us:
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2">
              <FaRegArrowAltCircleRight className="text-orange-500" />{" "}
              BuildingConfidenceandSelf-Esteem
            </li>
            <li className="flex items-center gap-2">
              <FaRegArrowAltCircleRight className="text-orange-500" /> Dress to
              Impress
            </li>
            <li className="flex items-center gap-2">
              <FaRegArrowAltCircleRight className="text-orange-500" />
              Grooming and Manners
            </li>
            <li className="flex items-center gap-2">
              <FaRegArrowAltCircleRight className="text-orange-500" />
              Sittingand Walking Postures
            </li>
            <li className="flex items-center gap-2">
              <FaRegArrowAltCircleRight className="text-orange-500" />
              Corporate Ettiquettes
            </li>
          </ul>
        </div>

        {/* Course Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">
            Course Content
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2">
              <FaBook className="text-orange-500" /> Module 1 - Introduction
            </li>
            <li className="flex items-center gap-2">
              <FaLaptopCode className="text-orange-500" /> Module 2 - Deep Dive
            </li>
            <li className="flex items-center gap-2">
              <FaRegClock className="text-orange-500" /> Module 3 - Advanced
              Topics
            </li>
          </ul>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="lg:col-span-1 bg-white shadow-xl p-6 rounded-lg sticky top-24 h-fit border border-gray-200">
        <span
          className="block text-center text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-500
 text-white py-1 rounded-lg shadow-md animate-pulse mb-3"
        >
          Limited Period Offer
        </span>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Course Pricing
        </h2>
        <p className="text-gray-800 text-2xl font-semibold mb-6">₹{course?.price}</p>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Benefits of Purchasing
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-2">
              <FaCertificate className="text-orange-500" /> Certified Course
            </li>
            <li className="flex items-center gap-2">
              <FaInfinity className="text-orange-500" /> Lifetime Access
            </li>
            <li className="flex items-center gap-2">
              <FaShoppingCart className="text-orange-500" /> Exclusive Resources
            </li>
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
      <div className="lg:col-span-2 bg-white p-6 ">
        <FAQ />
      </div>

      {/* Instructor Section */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md mt-8 mb-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Meet Your Instructor
        </h2>
        <div className="flex items-center gap-6 ">
          <img
            src="/founder.jpeg"
            alt="Instructor"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <p className="text-gray-700 text-md leading-relaxed font-serif">
            John Doe, an industry expert with over 10 years of experience, has
            trained thousands of students worldwide. His passion for teaching
            and deep understanding of the subject make learning engaging and
            insightful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Course;
