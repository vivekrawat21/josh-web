import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white  flex flex-col items-center  ">
<div className="w-full flex flex-col space-y-2 justify-between  px-6">
  {/* Logo and Join Button Container */}
  <div className="w-full flex justify-between items-center  mt-0 mb-6 ">
    {/* Logo Section */}
    <Link to="/">
    <div className="relative flex flex-col space-y-0 items-center md:items-start">
  {/* Logo */}
  <img
    src="/logo1.png"
    alt="joshguru"
    className="w-[150px] md:m-0 m-auto mb-0"
  />

  {/* Powered by NIITF text overlaying the image */}
  <span className="absolute bottom-1 text-[16px] font-bold text-white text-center md:text-left">
    Powered by <span className="text-white">NIITF</span>
  </span>
</div>


    </Link>

    {/* Join as Instructor Button */}
    <button className="border-2 py-2 px-5 bg-white text-orange-500 font-bold rounded-lg hover:bg-orange-100 transition duration-300">
     <Link to="/signup" >Join Us</Link>
    </button>
  </div>

  {/* JoshGuru Description Section */}
  <div className="md:w-1/2  text-left">
    <p className="text-lg text-gray-300">
      Learn Anything, Anywhere, Anytime
    </p>
    <p className="mt-2 text-sm leading-relaxed text-gray-400">
      JoshGuru is one of the leading education platforms offering a variety of
      courses at reasonable prices. Learn anytime, anywhere, and anything. We
      specialize in Web Development and Digital Marketing courses.
    </p>
  </div>
</div>


     
      {/* Divider */}
      <hr className="border-t border-gray-600 w-full my-4" />

      {/* Footer Content */}
      <div className="w-full flex flex-col justify-start  md:flex-row jmd:ustify-between px-6 gap-8 md:gap-6">
  {/* Social Links */}
  <div className="w-full md:w-1/3  md:text-left">
    <h2 className="text-lg font-semibold mb-4 text-gray-300 py-2">Follow Us</h2>
    <div className="flex  md:justify-start gap-4 text-xl text-gray-400">
      <Link to="https://www.instagram.com/joshguru.in?igsh=Nnd5aXVxejlqbnA4" target="_blank">
        <img src="/instagram.png" className="w-6 h-6 hover:text-cyan-400 transition-transform transform hover:scale-110" />
      </Link>
      <Link to="https://www.facebook.com/share/18GRUQxohy/" target="_blank">
        <img src="/facebook.png" className="w-6 h-6 hover:text-cyan-400 transition-transform transform hover:scale-110" />
      </Link>
      <Link to="https://www.linkedin.com/company/joshguru/" target="_blank">
        <img src="/linkedin.png" className="w-6 h-6 hover:text-cyan-400 transition-transform transform hover:scale-110" />
      </Link>
      <Link to="https://youtube.com/@joshguruofficial?si=ZJ9JV4GK9wIN1ZLg" target="_blank">
        <img  src="/youtube.png" className=" w-6 h-6 hover:text-cyan-400 transition-transform transform hover:scale-110" />
      </Link>
      <Link to="https://x.com/JoshguruOffice?t=a33I7drosaWUg6z8SDrnuA&s=09" target="_blank">
        <img src="/twitter.svg" className="w-6 h-6 hover:text-cyan-400 transition-transform transform hover:scale-110" />
      </Link>
    </div>
  </div>

  {/* Quick Links */}
  <div className="flex flex-row w-full md:w-1/2 justify-between gap-8">
  <div className="w-full md:w-1/3  md:text-left">
    <h2 className="text-lg font-semibold mb-4 text-gray-300">Quick Links</h2>
    <ul className="text-sm space-y-2 text-gray-400">
      <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
      <li><Link to="/courses" className="hover:text-cyan-400 transition">Courses</Link></li>
      <li><Link to="/signup" className="hover:text-cyan-400 transition">Join Us</Link></li>
      <li><Link to="/blogs" className="hover:text-cyan-400 transition">Blogs</Link></li>
    </ul>
  </div>

  {/* Support Links */}
  <div className="w-full md:w-1/3 md:text-left">
    <h2 className="text-lg font-semibold mb-4 text-gray-300">Support</h2>
    <ul className="text-sm space-y-2 text-gray-400">
      <li><Link to="/contactus" className="hover:text-cyan-400 transition">Contact Us</Link></li>
      <li><Link to="/disclaimer" className="hover:text-cyan-400 transition">Disclaimer</Link></li>
      <li><Link to="/refundandpolicy" className="hover:text-cyan-400 transition">Refund Policy</Link></li>
      <li> <Link to="/terms" className="hover:text-cyan-400 transition">Terms & Conditions</Link></li>
<<<<<<< HEAD
      <li><Link to="/licenseAndAgreement" className="hover:text-cyan-400 transition">Privacy Policy / Shipping & Delivery</Link></li>
=======
      <li><Link to="/privacy&policy" className="hover:text-cyan-400 transition">License & Agreements</Link></li>
      
>>>>>>> vijay
    </ul>
  </div>
  </div>
</div>

      {/* Divider */}
      <hr className="border-t border-gray-600 w-full my-4" />

      {/* Footer Bottom */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 text-sm text-gray-400 space-y-3 py-2">
        {/* Copyright */}
        <div >
          &#169; 2025 JoshGuru Private Limited. All Rights Reserved.
        </div>

        {/* Terms & Conditions */}
        <div className="text-center md:w-1/2 md:text-right">
         
        </div>
      </div>
    </section>
  );
};

export default Footer;
