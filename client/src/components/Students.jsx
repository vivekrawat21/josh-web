import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import { Button } from "../components/ui/button";
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center"><h2 className="text-3xl font-bold text-center mb-8">Students Data</h2>
      <Button className="mb-8" >Assign course</Button>
      </div>
      

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
