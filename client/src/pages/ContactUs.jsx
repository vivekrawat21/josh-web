import React from 'react'
const ContactUs = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Contact Us</h1>
      <p className="text-gray-700 mb-4 text-center">
        If you have any questions, feedback, or inquiries, feel free to reach out to us.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
