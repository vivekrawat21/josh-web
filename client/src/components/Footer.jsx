import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaThreads, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-6 flex flex-col items-center rounded-lg mb-2">
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 px-6">
        <div className="text-center md:text-left md:w-7/12">
          <Link to="/">
           
           <img src="/logo1.png"  alt="Logo" className="w-[150px]" />
        
         
       </Link>

          <p className="text-lg">Learn Anything, Anywhere, Anytime</p>
          <p className="mt-2 text-sm leading-relaxed">
            JoshGuru is one of the leading education platforms with various courses at reasonable prices. 
            You can learn anytime, anywhere, and anything. We specialize in Web Development and Digital Marketing courses.
          </p>
        </div>
        <div className="md:w-5/12 flex justify-center md:justify-end mt-4 md:mt-0">
          <button className="border-2 py-2 px-5 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-100 transition duration-300">
            Join as Instructor
          </button>
        </div>
      </div>

      <hr className="border-t-2 border-white w-full my-4" />

      <div className="w-full flex flex-col md:flex-row justify-between px-6 gap-6">
        {/* Social Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Social Links</h2>
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <Link to="https://www.instagram.com/joshguru.in?igsh=Nnd5aXVxejlqbnA4" target="_blank"><FaInstagram className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://www.facebook.com/share/18GRUQxohy/" target="_blank"><FaFacebook className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://www.linkedin.com/company/joshguru/" target="_blank"><FaLinkedin className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://youtube.com/@joshguruofficial?si=ZJ9JV4GK9wIN1ZLg" target="_blank"><FaYoutube className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://x.com/JoshguruOffice?t=a33I7drosaWUg6z8SDrnuA&s=09" target="_blank"><FaTwitter className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://www.threads.net/@joshguru.in" target="_blank"><FaThreads className="hover:scale-110 transition-transform" /></Link>
            <Link to="https://t.me/JoshguruEducation" target="_blank"><FaTelegram className="hover:scale-110 transition-transform" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="text-sm space-y-1">
            <li className="hover:underline"><Link to="/about">About Us</Link></li>
            <li className="hover:underline"><Link to="/courses">Courses</Link></li>
            <li className="hover:underline"><Link to="/join">Join Us</Link></li>
            <li className="hover:underline"><Link to="/blogs">Blogs</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Support</h2>
          <ul className="text-sm space-y-1">
            <li className="hover:underline"><Link to="/contact">Contact Us</Link></li>
            <li className="hover:underline"><Link to="/disclaimer">Disclaimer</Link></li>
            <li className="hover:underline"><Link to="/refund-policy">Refund Policy</Link></li>
            <li className="hover:underline"><Link to="/license">License And Agreements</Link></li>
          </ul>
        </div>
      </div>

      <hr className="border-t-2 border-white w-full my-4" />

      {/* Footer Bottom Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 text-sm">
        <div className="text-center md:text-left md:w-1/3">
          <h2 className="text-lg font-bold">JoshGuru powered by NIITF</h2>
          <p className="text-sm">
            Uttarakhand Office Address:<br />
            Plot no 86, Heera Nagar, Haldwani<br />
            Dist. Nainital (Uttarakhand) 263139
          </p>
        </div>
        <div className="text-center md:w-1/3">All Rights Reserved &#169; 2025 | JoshGuru Private Limited</div>
        <div className="text-center md:w-1/3 md:text-right">
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
