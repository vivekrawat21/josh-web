import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiGooglemarketingplatform, SiSocialblade, SiMarketo, SiGoogletagmanager, SiAppian } from 'react-icons/si';

const courses = [
  {
    title: 'Full Stack Development',
    description: 'Master frontend and backend development with the latest technologies and build real-world applications.',
    image: 'https://www.cdmi.in/courses@2x/full-stack.webp',
    topics: [
      { name: 'React, Next.js & TailwindCSS', icon: <SiReact className="text-blue-500 text-xl" /> },
      { name: 'Node.js, Express & MongoDB', icon: <SiNodedotjs className="text-green-600 text-xl" /> },
      { name: 'Authentication & Security', icon: <SiMongodb className="text-green-500 text-xl" /> },
      { name: 'Deploying Full Stack Apps', icon: <SiNextdotjs className="text-black text-xl" /> },
    ],
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, Social Media Marketing, and advanced digital marketing strategies to grow your brand.',
    image: 'https://theincmagazine.com/wp-content/uploads/2023/11/Digital-Marketing-Strategies-Unlocking-Success-in-the-Online-Realm.jpg',
    topics: [
      { name: 'SEO & Content Marketing', icon: <SiGooglemarketingplatform className="text-orange-500 text-xl" /> },
      { name: 'Social Media & Ads', icon: <SiSocialblade className="text-red-500 text-xl" /> },
      { name: 'Email & Affiliate Marketing', icon: <SiMarketo className="text-purple-600 text-xl" /> },
      { name: 'Marketing Analytics & Strategies', icon: <SiGoogletagmanager className="text-blue-600 text-xl" /> },
    ],
  },
];

export default function TopCourses() {
  return (
    <section className="py-3 px-10 w-full ">
      <h2 className="text-[2.70rem] font-semibold text-center mb-5  text-gray-900">Explore<span className='text-orange-500 text-[2.70rem] font-sans font-semibold'>Top Courses</span>  </h2>
      {courses.map((course, index) => (
        <motion.div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-12 mb-16 bg-gradient-to-r from-orange-100 to-white shadow-xl rounded-2xl overflow-hidden p-8 w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.img
            src={course.image}
            alt={course.title}
            className="w-full md:w-1/2 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 border-4 border-white"
          />
          <div className="w-full md:w-1/2 text-gray-800">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">{course.title}</h3>
            <p className="text-lg mb-6 text-gray-700">{course.description}</p>
            <ul className="grid grid-cols-2 gap-4 mb-6">
              {course.topics.map((topic, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg font-medium bg-white p-3 rounded-lg shadow">
                  {topic.icon}
                  {topic.name}
                </li>
              ))}
            </ul>
            <Button className="bg-orange-500 text-white text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">Enroll Now</Button>
          </div>
        </motion.div>
      ))}
    </section>
  );
}