// import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-4 flex flex-col items-center rounded-lg">
      <div className=" flex flex-col items-center justify-between text-justify py-2 px-2 md:flex-row">
        <div className="my-2 md:w-7/12 ">
          <h1 className="text-3xl font-bold mb-4">JoshGuru</h1>
          <p className="text-lg">Learn Anything, Anywhere, Anytime</p>
          <p>
            JoshGuru is one of the leading Education Plattform with different
            course at reasonable price and you can learn anytime, anywhere,
            anything. Specialised in Web Development and Digital Marketing
            courses.
          </p>
        </div>
        <div className="  md:w-5/12  flex items-center justify-center py-2 md:justify-end">
          <button className="border-2 py-2 px-4 cursor-pointer bg-white text-orange-500 font-bold   rounded-lg hover:bg-orange-100 transition duration-300">
            Join as Instructor
          </button>
        </div>
      </div>
      <hr className="border-t-2 border-white w-full my-2" />

      <div className="w-full flex flex-col md:justify-between md:flex-row px-2">
        <div className="my-2 md:my-2">
          <h2 className="text-xl font-bold text-justify">Social Links</h2>
          <ul className="grid  md:grid-cols-4 items-center justify-items-center gap-4 justify-start text-2xl my-4">
            <li>
              <a href="#">
                <FaInstagram className="transition-transform duration-300 hover:-translate-y-2 " /> </a>
            </li>

            <li>
              <a href="#">
                <FaFacebook className="transition-transform duration-300 hover:-translate-y-2" /> </a>
            </li>

            <li>
              <a href="#">
                <FaLinkedin className="transition-transform duration-300 hover:-translate-y-2" /> </a>
            </li>
            <li>
              <a href="#">
                <FaYoutube className="transition-transform duration-300 hover:-translate-y-2" />  </a>
            </li>
          </ul>
        </div>
        <div className="my-2 text-justify md:my-2">
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="">
            <li className="hover:underline">About Us</li>
            <li className="hover:underline">Courses</li>
            <li className="hover:underline">Join Us</li>
            <li className="hover:underline">Blogs </li>
          </ul>
        </div>
        <div className="my-2 text-justify md:my-2">
          <h2 className="text-xl font-bold">Support</h2>
          <ul>
            <li className="hover:underline">
              <a href="#">Contact Us</a></li>
            <li className="hover:underline">
              <a href="">Disclaimer</a></li>
            <li className="hover:underline">
              <a href="">Refund Policy</a> </li>
            <li className="hover:underline">
              <a href="">License And Agreements</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-t-2 border-white w-full my-4" />

      <div className="w-full flex flex-col  justify-between px-2 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">JoshGuru</h2>
        </div>
        <div>All Rights Reserved &#xA9; 2025 | JoshGuru Private Limited</div>
        <a href="#" className="hover:underline">
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Footer;
