import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';

const AdminMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMentor, setAddMentor] = useState(false);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/mentors/getAllMentors`, { withCredentials: true });
        if (res.data.statusCode === 200) {
          setMentors(res.data.data.mentors || []); 
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);
  const handleAddMentor = () => {
    setAddMentor(!addMentor);
  }
 console.log(mentors)
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
      <h1>Mentors</h1>
    <button className='bg-gray-800 text-white px-4 py-2 rounded-md ml-4 ' onClick={handleAddMentor}>{addMentor ? "Cancel" :"Add Mentor"}</button>
      </div>
      {addMentor && (
        <div className='flex flex-col gap-4 my-4'>
          <input type="text" placeholder='Name' className='border p-2 rounded-md' />
          <input type="text" placeholder='Email' className='border p-2 rounded-md' />
          <input type="text" placeholder='Mobile Number' className='border p-2 rounded-md' />
          <input type="file" placeholder='Upload Mentor Image' className='border p-2 rounded-md' />
          <input type="text" placeholder='About the mentor' className='border p-2 rounded-md' />
          <div className='flex  justify-start gap-4'>
          <input type="text" placeholder='Plattform name eg. Facebook,linkedIn...' className='border p-2 rounded-md' />
          <input type="text" placeholder='LinkedIn Profile' className='border p-2 rounded-md' />
          </div>
       
          <button className='bg-gray-800 text-white px-4 py-2 rounded-md ml-4'>Add Mentor</button>

        </div>
      )

      }

      {Array.isArray(mentors) && mentors.length > 0 ? (
        <div className="flex flex-col gap-4 my-4">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="flex justify-between border p-4 rounded-md">
              <div className=''>
              <h2 className="text-xl font-bold">{mentor.name}</h2>
              <p className="text-gray-600">{mentor.email}</p>
              <p className="text-gray-600">{mentor.mobileNumber}</p>
              </div>
              <div className=''>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md ml-4'>
                  Assign Course
                </button>
              </div>
              
            </div>

          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center">No Mentors Found</h1>
      )}
    </div>
  );
};

export default AdminMentor;
