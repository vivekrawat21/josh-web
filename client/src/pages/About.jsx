// Vite + React with Framer Motion for Animations

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      imageUrl: "/member1.jpg",
      description:
        "John leads our projects with a focus on delivering quality and innovation. He has over 10 years of experience managing teams.",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Lead Developer",
      imageUrl: "/member2.jpg",
      description:
        "Jane is an expert in full-stack development and ensures that our technical solutions are cutting-edge and efficient.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "UX/UI Designer",
      imageUrl: "/member4.jpg",
      description:
        "Emily designs user-friendly interfaces and experiences, ensuring our products are intuitive and accessible.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col items-center justify-center gap-16">
        {/* About Section */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/aboutus.jpeg"
            alt="About us"
            className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* About section text */}
        <motion.div
          className="text-justify text-base md:text-lg lg:text-xl mt-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="leading-relaxed text-gray-600">
            Joshguru is an Ed-Tech Platform that Provides Skills development
            program to all youth in India. Joshguru has various types of courses
            available for Skills enhancement like Public Speaking, Personality
            Development, English Speaking, Communication Skills, Preparation for
            Interviews, Attraction Marketing, MS Excel, Social Media Mastery,
            Website Designing, Graphic Designing, Finance Mastery, Artificial
            Intelligence mastery, Stock Market, etc. Joshguru also provide you
            an Opportunity to become an Affiliates with Joshguru and Earn
            Commission on the promotion of Courses available on Joshguru.in
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className="w-full max-w-6xl flex flex-col items-center justify-between gap-12 md:flex-row">
          <motion.div
            className="md:w-1/2 text-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-orange-500 font-bold mb-8">
              Our Founder
            </h2>
            <div className="w-full rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/founder.jpeg"
                alt="Founder"
                className="h-96 w-full object-cover"
              />
            </div>
          </motion.div>
          <div className="text-sm md:text-base lg:text-lg text-gray-700 md:w-1/2">
            <p className="leading-relaxed text-justify">
              Kamal Joshi is The Founder, Managing Director of'Joshguru Pvt
              Ltd’. He has 10 year of experience in marketing industry. He is a
              professional networker and marketing expert who built his career
              in marketing industry last 11 Years and direct selling industry
              which he entered at a young age of 24 in 2017. He created history
              by touching the heights of success and by supporting youth in
              becoming successful.
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold mb-6">
            Our Mission
          </h2>
          <div className="text-sm md:text-base lg:text-lg text-gray-700">
            <p className="leading-relaxed text-justify">
              Joshguru’s MISSION is to provide skills development education to
              youth in every village and corner of India. Joshguru will help all
              capableyouth to change their skills, their presence of mind and
              the lives of their families . Our VISION is to make more and more
              youth independent so that theydo not bother for jobs after 12th,
              and can live their life in a better way ,"General Education
              Requirements ".
            </p>
          </div>
        </motion.div>
        {/* Vision Section */}
        <motion.div
          className="w-full max-w-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold mb-6">
            Our Vision
          </h2>
          <div className="text-sm md:text-base lg:text-lg text-gray-700">
            <p className="leading-relaxed text-justify">
              At Joshguru, our vision is to empower the youth of India with
              practical and modern skills that will not only enhance their
              professional careers but also foster a culture of continuous
              learning and personal development. We aim to bridge the gap
              between traditional education and the current market demands,
              ensuring that every individual, regardless of their background,
              has access to high-quality, skills-oriented training. We envision
              a future where every young person has the tools and resources to
              become self-reliant and successful, transforming their lives and
              the communities around them.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="w-full max-w-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-orange-500 font-bold mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-48 h-48 mx-auto mb-6 rounded-full"
                />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h2>
                <p className="text-orange-500 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <section class=" h-auto w-full p-6">
    <div class=" w-full h-auto mx-auto ">
        <h2 class="text-3xl font-bold mb-6">Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to ="/gallery/events" class="block  rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <h3 class="text-xl font-semibold mb-2">Events</h3>
                <div class="h-auto  flex items-center justify-center">
                  <img src="/event1.webp" alt="" />
                </div>
            </Link>
            <Link to ="/gallery/Trips" class="block  rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <h3 class="text-xl font-semibold mb-2">Trips</h3>
                <div class="h-auto  flex items-center justify-center">
                  <img src="/event2.webp" alt="" />
                </div>
            </Link>
            <Link to ="/gallery/occassions" class="block  rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <h3 class="text-xl font-semibold mb-2">Occassions</h3>
                <div class="h-auto flex items-center justify-center">
                  <img src="/event3.webp" alt="" />
                </div>
            </Link>
        </div>
    </div>
</section>

      </div>
    </section>
  );
};

export default About;
