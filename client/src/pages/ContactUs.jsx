import React from 'react';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdLanguage } from 'react-icons/md';

const ContactUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-16">
      <h1 className="text-4xl font-extrabold text-orange-500 text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10">
        We'd love to hear from you. Reach out with any questions, feedback, or inquiries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">
        {/* Form Section */}
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info Section */}
        <div className="space-y-5 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Joshguru Technologies Pvt. Ltd.</h2>
            <div className="flex items-start gap-3 mb-3">
              <MdLocationOn className="text-orange-500 text-xl mt-1" />
              <p>86, Heera Nagar, Near Satyam Diagnostic Center, Mukhani Choraha, Haldwani (Uttarakhand) 263139</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <MdPhone className="text-orange-500 text-xl" />
              <a href="tel:+918191980334" className="hover:underline">+91-8191980334</a>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <MdLanguage className="text-orange-500 text-xl" />
              <a href="https://www.joshguru.com" target="_blank" rel="noreferrer" className="hover:underline">
                www.joshguru.com
              </a>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <MdEmail className="text-orange-500 text-xl" />
              <a href="mailto:support@joshguru.com" className="hover:underline">
                support@joshguru.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MdAccessTime className="text-orange-500 text-xl" />
              <p>Mon – Sat (10:00 AM – 6:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
