import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import AssignCourse from '../components/AssignCourse';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUsers`, {
        withCredentials: true,
      });
      setStudents(res.data.data.users);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-center mb-8 text-gray-900 tracking-tight sm:text-4xl'>
        Students Data
      </h2>

      {/* Search bar */}
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search by name...'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Student Cards Grid */}
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className='bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl'
          >
            {/* Profile Image */}
            <img
              src={student?.image || 'https://via.placeholder.com/150'}
              alt={student.name}
              className='w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border border-gray-300'
            />

            {/* Student Info */}
            <h3 className='text-xl md:text-2xl font-semibold text-gray-800 mb-2'>
              {student.name}
            </h3>
            <p className='text-sm md:text-base text-gray-600 mb-1'>
              Email: {student.email}
            </p>
            <p className='text-sm md:text-base text-gray-600 mb-4'>
              Mobile: {student.mobilenumber}
            </p>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-2 w-full'>
              <AssignCourse assignType='course' studentId={student._id} />
              <AssignCourse assignType='bundle' studentId={student._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
