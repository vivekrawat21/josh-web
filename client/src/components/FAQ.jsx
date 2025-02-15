"use client"

import { useState } from "react"

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
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl  space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-orange-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-2xl text-orange-600">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-orange-50/50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

