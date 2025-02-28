import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center rounded-lg mb-2">
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 px-6">
        {/* Logo and Description */}
        <div className="text-center md:text-left md:w-7/12">
          <Link to="/">
            <div className="relative">
              <img src="/logo1.png" alt="Logo" className="w-[150px]" />
              <span className="absolute text-[16px] font-bold text-cyan-400 top-[75%] left-[2%]">
                Powered by <span className="text-white">NIITF</span>
              </span>
            </div>
          </Link>
          <p className="text-lg mt-2 text-gray-300">Learn Anything, Anywhere, Anytime</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            JoshGuru is one of the leading education platforms offering a variety of courses at reasonable prices. 
            Learn anytime, anywhere, and anything. We specialize in Web Development and Digital Marketing courses.
          </p>
        </div>

        {/* Join Instructor Button */}
        <div className="md:w-5/12 flex justify-center md:justify-end mt-4 md:mt-0">
          <button className="border-2 py-2 px-5 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-100 transition duration-300">
            Join as Instructor
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-600 w-full my-4" />

      {/* Footer Content */}
      <div className="w-full flex flex-col md:flex-row justify-between px-6 gap-6">
        {/* Social Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4 text-xl text-gray-400">
            <Link to="https://www.instagram.com/joshguru.in?igsh=Nnd5aXVxejlqbnA4" target="_blank">
              <FaInstagram className="hover:text-cyan-400 transition-transform transform hover:scale-110" />
            </Link>
            <Link to="https://www.facebook.com/share/18GRUQxohy/" target="_blank">
              <FaFacebook className="hover:text-cyan-400 transition-transform transform hover:scale-110" />
            </Link>
            <Link to="https://www.linkedin.com/company/joshguru/" target="_blank">
              <FaLinkedin className="hover:text-cyan-400 transition-transform transform hover:scale-110" />
            </Link>
            <Link to="https://youtube.com/@joshguruofficial?si=ZJ9JV4GK9wIN1ZLg" target="_blank">
              <FaYoutube className="hover:text-cyan-400 transition-transform transform hover:scale-110" />
            </Link>
            <Link to="https://x.com/JoshguruOffice?t=a33I7drosaWUg6z8SDrnuA&s=09" target="_blank">
              <FaTwitter className="hover:text-cyan-400 transition-transform transform hover:scale-110" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Quick Links</h2>
          <ul className="text-sm space-y-1 text-gray-400">
            <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
            <li><Link to="/courses" className="hover:text-cyan-400 transition">Courses</Link></li>
            <li><Link to="/join" className="hover:text-cyan-400 transition">Join Us</Link></li>
            <li><Link to="/blogs" className="hover:text-cyan-400 transition">Blogs</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Support</h2>
          <ul className="text-sm space-y-1 text-gray-400">
            <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact Us</Link></li>
            <li><Link to="/disclaimer" className="hover:text-cyan-400 transition">Disclaimer</Link></li>
            <li><Link to="/refund-policy" className="hover:text-cyan-400 transition">Refund Policy</Link></li>
            <li><Link to="/license" className="hover:text-cyan-400 transition">License & Agreements</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-600 w-full my-4" />

      {/* Footer Bottom */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 text-sm text-gray-400">
        {/* Copyright */}
        <div className="text-center md:w-1/2">
          &#169; 2025 JoshGuru Private Limited. All Rights Reserved.
        </div>

        {/* Terms & Conditions */}
        <div className="text-center md:w-1/2 md:text-right">
          <Link to="/terms" className="hover:text-cyan-400 transition">Terms & Conditions</Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
