import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import AssignCourse from '../components/AssignCourse';

const Students = () => {
  const [students, setStudents] = useState([]);

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

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-3xl font-bold text-center mb-8 text-gray-900 tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
        Students Data
      </h2>

      {/* Grid container */}
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {students?.map((student) => (
          <div
            key={student._id}
            className='bg-white shadow-lg rounded-xl p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl'
          >
            {/* Student Info */}
            <h3 className='text-xl md:text-2xl font-semibold text-gray-800 mb-3'>
              {student.name}
            </h3>
            <p className='text-sm md:text-base text-gray-600 mb-2'>
              Email: {student.email}
            </p>
            <p className='text-sm md:text-base text-gray-600 mb-4'>
              Mobile: {student.mobilenumber}
            </p>

            {/* Action buttons for assigning course/bundle */}
            <div className='flex justify-between space-x-2'>
              {/* Assign Course */}
              <AssignCourse assignType='course' studentId={student._id} />

              {/* Assign Bundle */}
              <AssignCourse assignType='bundle' studentId={student._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
