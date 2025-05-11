import { motion } from "framer-motion";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addMentors } from "@/features/mentors/mentorSlice";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const About = () => {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentor?.mentors[0] || []);
  const [selected, setSelected] = useState(null);

  const fetchMentors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mentors/getAllMentors`, {
        withCredentials: true,
      });
      const mentorList = response.data.data.mentors;
      dispatch(addMentors(mentorList));
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    if (mentors.length === 0) {
      fetchMentors();
    }
  }, []);

  const galleryData = [
    {
      title: "Events",
      image: "/event1.webp",
      path: "/Events",
    },
    {
      title: "Trips",
      image: "/event2.webp",
      path: "/Trips",
    },
    {
      title: "Ocassions",
      image: "/event3.webp",
      path: "/Ocassions",
    },
  ];

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-gradient-to-b from-gray-50 to-white mt-20">
      <div className="flex flex-col items-center gap-12">

        {/* About Banner */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/aboutus.jpeg"
            alt="About us"
            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* About Text */}
        <motion.div
          className="text-justify text-base md:text-lg lg:text-xl mt-4 max-w-5xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="leading-relaxed text-gray-600">
            Joshguru Technologies Private Limited is a new-age EdTech company dedicated to empowering youth with in-demand skills and guaranteed career growth.
            We offer offline and online Monday to Friday industry-relevant courses like: <strong>Digital Marketing, Full Stack Development, Microsoft 365, Odoo ERP</strong>.
            With placement assistance, internships, and international job support, our goal is to make every student job-ready.
            Whether you’re a fresher, working professional, or business owner, Joshguru is your trusted partner for skill development and success.
            We have more courses but all those courses for affiliates and that courses in recorded format only.
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2 text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-black">Our </span>
              <span className="text-orange-500">Founder</span>
            </h2>
            <div className="overflow-hidden rounded-xl shadow-2xl hover:scale-105 transition duration-300">
              <img src="/founder.jpeg" alt="Founder" className="h-96 w-full object-cover" />
            </div>
          </motion.div>
          <div className="text-gray-700 md:w-1/2 text-justify">
            <p className="leading-relaxed">
              Kamal Joshi, the Founder and Managing Director of Joshguru Pvt. Ltd, has 10+ years of experience in the marketing industry. A professional networker who began his journey in direct selling at age 24, Kamal has empowered youth to become independent and successful through education and entrepreneurship.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <motion.div
          className="w-full max-w-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-black">Our </span>
            <span className="text-orange-500">Mission</span>
          </h2>
          <p className="text-gray-700 text-justify text-base md:text-lg leading-relaxed">
            Joshguru’s mission is to provide skills development education to youth in every village and corner of India. Joshguru helps all capable youth to change their skills, their presence of mind and the lives of their families. We are here to provide skill-based learning to every interested student, professional, entrepreneur, or a person of any background at a very affordable price.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="w-full max-w-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white shadow-md rounded-xl p-6 mt-4 relative">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed italic relative">
              <span className="text-6xl text-orange-400 absolute -top-6 -left-4">“</span>
              <span className="mx-6 block">
                Our Vision is to make more and more youth independent so that they do not bother for jobs after 12th, and can live their life in a better way and to upskill <strong>10 lakh+ learners</strong> by 2030 through high-quality, practical education.
              </span>
              <span className="text-6xl text-orange-400 absolute -bottom-6 right-4 rotate-180">“</span>
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6">
        <span className="text-black">Meet Our </span>
        <span className="text-orange-500">Team</span>
      </h2>

      {/* Horizontal scrollable grid */}
      <div className="flex gap-6 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-300 pb-4">
        {mentors.map((member, index) => (
          <motion.div
            key={member?._id}
            className="min-w-[260px] max-w-[280px] bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex-shrink-0 cursor-pointer flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onClick={() => setSelected(member)}
          >
            <img
              src={member?.profileImage || "/placeholder.svg"}
              alt={member.name}
              className="w-24 h-24 mb-4 rounded-full object-cover border-4 border-orange-400"
            />
            <h3 className="text-lg font-bold text-gray-800">{member?.name}</h3>
            <p className="text-orange-500 font-medium">{member?.position}</p>
            {/* Hide about/description here */}
          </motion.div>
        ))}
      </div>

      {/* Modal for mentor details */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-[90vw] relative text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 text-2xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selected?.profileImage || "/placeholder.svg"}
              alt={selected.name}
              className="w-28 h-28 mb-4 rounded-full object-cover border-4 border-orange-400 mx-auto"
            />
            <h3 className="text-2xl font-bold text-gray-800">{selected?.name}</h3>
            <p className="text-orange-500 font-medium mb-2">{selected?.position}</p>
            <p className="text-gray-700 mt-4">{selected?.about}</p>
            {/* Add more details if needed */}
          </motion.div>
        </div>
      )}
    </motion.div>

        {/* Gallery Section */}
        <section className="w-full max-w-7xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
            <span className="text-black">Our </span>
            <span className="text-orange-500">Gallery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {galleryData.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl bg-white"
              ><Link to={`/gallery${item.path}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
