import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";

const Students = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUsers`, {
        withCredentials: true,
      });
      setStudents(res.data.data.users);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Students Data</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students?.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{student.name}</h3>
            <p className="text-gray-600">Email: {student.email}</p>
            <p className="text-gray-600">Mobile: {student.mobilenumber}</p>
            {/* Uncomment this section when there are courses available
            {student.courses?.map((course) => (
              <li key={course}>{course}</li>
            ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
