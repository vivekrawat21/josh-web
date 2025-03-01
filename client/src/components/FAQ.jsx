

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What if I miss any live session?",
    answer:
      "Don't worry! All live sessions are recorded and available for replay at your convenience. You'll never miss out on any content.",
  },
  {
    question: "How much is the mentor involved?",
    answer:
      "Our mentors are highly involved throughout your learning journey. They provide regular feedback, answer questions, and conduct live sessions.",
  },
  {
    question: "How much time should I dedicate weekly?",
    answer:
      "We recommend dedicating at least 8-10 hours per week to get the most out of the course. This includes watching lectures, completing assignments, and attending live sessions.",
  },
  {
    question: "What's included in the course?",
    answer:
      "The course includes video lectures, live sessions, assignments, projects, mentor support, and lifetime access to course materials.",
  },
  {
    question: "What if I have questions between sessions?",
    answer:
      "You can ask questions anytime in our community forum or during dedicated doubt-clearing sessions with mentors.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-2 pb-6">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center mb-8 text-gray-900 relative inline-block ">
          Frequently{" "}
          <span className=" text-orange-500 font-semibold font-sans relative inline-block">
            Asked Questions
            {/* Swiggly Underline */}
            <svg
              className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-[120%] h-6"
              viewBox="0 0 220 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 15 C50 40, 170 -10, 218 15"
                stroke="url(#gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF9800" />
                  <stop offset="100%" stopColor="#FF5722" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-orange-200 rounded-lg overflow-hidden bg-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className="w-full px-5 py-3 text-left flex items-center justify-between hover:bg-orange-100 transition-all"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <motion.span animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <FaChevronDown className="text-orange-600" />
                </motion.span>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 py-3 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
