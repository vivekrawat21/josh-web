import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaThreads, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-4 flex flex-col items-center rounded-lg mb-1">
      <div className="flex flex-col items-center justify-between text-justify py-2 px-2 md:flex-row">
        <div className="my-2 md:w-7/12">
          <h1 className="text-3xl font-bold mb-4">JoshGuru</h1>
          <p className="text-lg">Learn Anything, Anywhere, Anytime</p>
          <p>
            JoshGuru is one of the leading education platforms with various courses at reasonable prices. 
            You can learn anytime, anywhere, and anything. We specialize in Web Development and Digital Marketing courses.
          </p>
        </div>
        <div className="md:w-5/12 flex items-center justify-center py-2 md:justify-end">
          <button className="border-2 py-2 px-4 cursor-pointer bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-100 transition duration-300">
            Join as Instructor
          </button>
        </div>
      </div>

      <hr className="border-t-2 border-white w-full my-2" />

      <div className="w-full flex flex-col md:justify-between md:flex-row px-2">
        {/* Social Links */}
        <div className="my-2 md:my-2">
          <h2 className="text-xl font-bold text-justify">Social Links</h2>
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-2xl my-4">
            <li>
              <Link to="https://www.instagram.com/joshguru.in?igsh=Nnd5aXVxejlqbnA4" target="_blank">
                <FaInstagram className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://www.facebook.com/share/18GRUQxohy/" target="_blank">
                <FaFacebook className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/company/joshguru/" target="_blank">
                <FaLinkedin className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com/@joshguruofficial?si=ZJ9JV4GK9wIN1ZLg" target="_blank">
                <FaYoutube className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://x.com/JoshguruOffice?t=a33I7drosaWUg6z8SDrnuA&s=09" target="_blank">
                <FaTwitter className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://www.threads.net/@joshguru.in" target="_blank">
                <FaThreads className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
            <li>
              <Link to="https://t.me/JoshguruEducation" target="_blank">
                <FaTelegram className="transition-transform duration-300 hover:-translate-y-2" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="my-2 text-justify md:my-2">
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul>
            <li className="hover:underline cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/courses">Courses</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/join">Join Us</Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="my-2 text-justify md:my-2">
          <h2 className="text-xl font-bold">Support</h2>
          <ul>
            <li className="hover:underline">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="hover:underline">
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
            <li className="hover:underline">
              <Link to="/refund-policy">Refund Policy</Link>
            </li>
            <li className="hover:underline">
              <Link to="/license">License And Agreements</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-t-2 border-white w-full my-4" />

      {/* Footer Bottom Section */}
      <div className="w-full flex flex-col justify-between px-2 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">JoshGuru</h2>
        </div>
        <div>All Rights Reserved &#169; 2025 | JoshGuru Private Limited</div>
        <Link to="/terms" className="hover:underline">
          Terms & Conditions
        </Link>
      </div>
    </section>
  );
};

export default Footer;
