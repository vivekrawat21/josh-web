import React from 'react';
import { ArrowRight, BookOpen, Star, Zap } from 'lucide-react';

const MyCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      name: 'Introduction to React',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      image: '/reactjs.jpg',
    },
    {
      id: 2,
      name: 'Advanced JavaScript',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      image: '/javascript.jpg',
    },
  ];

  const suggestedCourses = [
    {
      id: 3,
      name: 'Node.js Fundamentals',
      rating: 4.8,
      oldPrice: 99.99,
      newPrice: 79.99,
      image: '/nodejs.jpg',
    },
    {
      id: 4,
      name: 'Full Stack Development',
      rating: 4.9,
      oldPrice: 149.99,
      newPrice: 119.99,
      image: '/fullstack.jpeg',
    },
  ];

  return (
    <div className='w-full container  px-4 py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen'>
      <h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>My Learning Journey</h1>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700 flex items-center'>
              <Zap className='w-6 h-6 mr-2 text-yellow-500' /> Enrolled Courses
            </h2>
            <div className='grid gap-4'>
              {enrolledCourses.map((course) => (
                <div key={course.id} className='overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white rounded-lg'>
                  <div className='relative h-48'>
                    <img src={course.image} alt={course.name} className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                    <div className='absolute bottom-0 left-0 p-4'>
                      <h3 className='text-xl font-semibold text-white'>{course.name}</h3>
                      <p className='text-sm text-gray-200'>
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </p>
                    </div>
                  </div>
                  <div className='pt-4 px-4'>
                    <div className='w-full h-2 bg-gray-300 rounded-full'>
                      <div
                        className='h-2 bg-green-500 rounded-full'
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className='text-right text-sm text-gray-600 mt-2'>{course.progress}% Complete</p>
                  </div>
                  <div className='p-4'>
                    <button className='w-full py-2 px-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:bg-orange-600 transition'>
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700 flex items-center'>
              <Star className='w-6 h-6 mr-2 text-yellow-500' /> Suggested Courses
            </h2>
            <div className='grid gap-4'>
              {suggestedCourses.map((course) => (
                <div key={course.id} className='overflow-hidden transition-all duration-300 hover:shadow-lg bg-white rounded-lg group'>
                  <div className='relative h-48'>
                    <img src={course.image} alt={course.name} className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                    <div className='absolute top-0 right-0 p-2'>
                      <span className='bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md flex items-center'>
                        <Star className='w-4 h-4 mr-1' /> {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                      {course.name}
                    </h3>
                    <div className='flex items-baseline justify-end space-x-2'>
                      <span className='text-sm line-through text-gray-500'>₹{course.oldPrice.toFixed(2)}</span>
                      <span className='text-2xl font-bold text-green-600'>₹{course.newPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='p-4'>
                    <button className='w-full py-2 px-4 border border-gray-300 rounded-lg group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-600 transition-colors duration-300"'>
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className='space-y-6'>
          <div className=' text-white overflow-hidden rounded-lg'>
            <div className='relative h-48'>
              <img src='/UpgradeCourseImage.png' alt='Upgrade your learning' className='w-full h-full object-cover opacity-100 ' />
              <div className='absolute inset-0 '></div>
            </div>
            <div className='bg-gradient-to-br from-purple-400 to-indigo-600'>
            <div className='p-4'>
              <h3 className='text-2xl font-semibold'>Upgrade Your Learning</h3>
              <p className='text-purple-100'>Get access to all courses and exclusive content</p>
            </div>
            <div className='p-4'>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <BookOpen className='w-5 h-5 mr-2' /> Unlimited access to all courses
                </li>
                <li className='flex items-center'>
                  <Star className='w-5 h-5 mr-2' /> Exclusive workshops and webinars
                </li>
                <li className='flex items-center'>
                  <ArrowRight className='w-5 h-5 mr-2' /> Personal learning coach
                </li>
              </ul>
            </div>
            <div className='p-4'>
              <button className='w-full py-2 px-4 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition'>
                Upgrade to Pro
              </button>
            </div>
            </div>
          </div>

          <div className='bg-white rounded-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-green-400 to-blue-500 text-white p-4'>
              <h3 className='text-lg font-semibold'>Your Progress</h3>
            </div>
            <div className='p-4'>
              <div className='text-center'>
                <span className='text-5xl font-bold text-gray-700'>2</span>
                <span className='text-sm text-gray-500 ml-1'>courses in progress</span>
              </div>
              <div className='mt-4'>
                <span className='w-full py-1 px-2 text-blue-600 border border-blue-300 rounded-lg inline-block text-center'>
                  Keep up the good work!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;