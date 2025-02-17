// Vite + React with Framer Motion for Animations

import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Project Manager',
      imageUrl: '/member1.jpg',
      description: 'John leads our projects with a focus on delivering quality and innovation. He has over 10 years of experience managing teams.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Lead Developer',
      imageUrl: '/member2.jpg',
      description: 'Jane is an expert in full-stack development and ensures that our technical solutions are cutting-edge and efficient.',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'UX/UI Designer',
      imageUrl: '/member4.jpg',
      description: 'Emily designs user-friendly interfaces and experiences, ensuring our products are intuitive and accessible.',
    },
  ];

  return (
    <section className='py-16 px-8 bg-gradient-to-b from-gray-50 to-white'>
      <div className='flex flex-col items-center justify-center gap-16'>
        
        {/* About Section */}
        <motion.div
          className='w-full max-w-6xl'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src='/aboutus.jpeg'
            alt='About us'
            className='w-full h-[400px] object-cover rounded-lg shadow-2xl'
          />
        </motion.div>

        {/* About section text */}
        <motion.div
          className='text-justify text-base md:text-lg lg:text-xl mt-6'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className='leading-relaxed text-gray-600'>
            Our Founder and CEO is "Masters Of Online Education",a visionary leader with a passion for education and technology. With a background in computer science and years of experience in the tech industry, he saw the need for a platform that would provide high-quality education to learners around the world. He founded JoshGuru with the goal of making learning accessible and engaging, empowering students to achieve their dreams and build a better future.
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className='w-full max-w-6xl flex flex-col items-center justify-between gap-12 md:flex-row'>
          <motion.div
            className='md:w-1/2 text-center'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl md:text-4xl lg:text-5xl text-orange-500 font-bold mb-8'>Our Founder</h2>
            <div className='w-full rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300'>
              <img
                src='/founder.jpeg'
                alt='Founder'
                className='h-96 w-full object-cover'
              />
            </div>
          </motion.div>
          <div className="text-sm md:text-base lg:text-lg text-gray-700 md:w-1/2">
            <p className="leading-relaxed text-justify">
              At JoshGuru,"Executive Education","Education Degrees" ,we believe that education is the key to unlocking opportunities and achieving success. Our platform offers "Education Online" a range of courses in technology, business, and design, providing 'Masters Of Education" learners with the skills they need to thrive in the digital world. We are committed to creating an engaging and interactive learning experience that is accessible to all, connecting students with top-notch instructors and industry professionals. Whether you are looking to start a new career, enhance your skills, or pursue a passion, JoshGuru is here to help you reach your goals.
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
              Our mission is to provide accessible, high-quality education that meets industry standards and prepares learners for real-world challenges. We focus on delivering practical, hands-on learning experiences through the guidance of top mentors, ensuring students gain valuable insights into current industry practices. By fostering critical thinking, creativity, and problem-solving skills, we empower learners to adapt to evolving environments and prepare them for the future of work with "General Education Requirements ".
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className='w-full max-w-6xl text-center'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl text-orange-500 font-bold mb-12'>Meet Our Team</h2>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className='bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <img
                  src={member.imageUrl || '/placeholder.svg'}
                  alt={member.name}
                  className='w-48 h-48 mx-auto mb-6 rounded-full'
                />
                <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-2'>{member.name}</h2>
                <p className='text-orange-500 font-semibold mb-4'>{member.role}</p>
                <p className='text-sm leading-relaxed text-gray-600'>{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

