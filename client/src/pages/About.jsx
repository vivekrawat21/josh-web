import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const galleryData = [
    {
      title: "Events",
      image: "/event1.webp",
      path: "/gallery/events",
      date: "March 10, 2024",
    },
    {
      title: "Trips",
      image: "/event2.webp",
      path: "/gallery/Trips",
      date: "March 10, 2024",
    },
    {
      title: "Occasions",
      image: "/event3.webp",
      path: "/gallery/occassions",
      date: "April 5, 2024",
    },
  ];

  const mentors = useSelector((state) => state.mentor?.mentors[0] || []);

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
            Joshguru is an Ed-Tech Platform that provides skill development programs to youth across India. We offer a wide range of courses such as Public Speaking, Personality Development, English Communication, MS Excel, Social Media Mastery, Website Designing, AI Mastery, Stock Market, and more. Join us as a student or become an affiliate and earn commissions by promoting our courses.
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
            Our mission is to bring skill-based education to every corner of India, transforming youth into capable and independent individuals who can support themselves and their families through modern skills.
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
                We aim to bridge the gap between traditional education and the current job market's demands, fostering a generation of self-reliant youth equipped with practical skills that empower them to thrive in their careers.
              </span>
              <span className="text-6xl text-orange-400 absolute -bottom-6 right-4 rotate-180">“</span>
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6">
            <span className="text-black">Meet Our </span>
            <span className="text-orange-500">Team</span>
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 px-2 scroll-smooth">
            {mentors.map((member, index) => (
              <motion.div
                key={member?._id}
                className="min-w-[280px] bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <img
                  src={member?.profileImage || "/placeholder.svg"}
                  alt={member.name}
                  className="w-40 h-40 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-lg font-bold text-gray-800">{member?.name}</h3>
                <p className="text-orange-500 font-medium">{member?.position}</p>
                <p className="text-sm mt-2 text-gray-600">{member?.about}</p>
              </motion.div>
            ))}
          </div>
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
              >
                <Link to={item.path}>
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
