import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/utils'
const AdminAssignMentor = () => {
    const {mentorId} = useParams()
    const [mentor, setMentor] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(mentorId)
    useEffect(()=>{
        const fetchMentor = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/mentors/getMentorById/${mentorId}`, { withCredentials: true });
                setMentor(res.data.data.mentor);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching mentor:", error);
                setLoading(false);
            }
        };
        fetchMentor();
    },[mentorId])
    console.log(mentor)
  return (
    <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
                <h1>Mentor Details</h1>
                <p>Courses list of <span className='text-xl'>{mentor?.name}</span> </p>
                
                {/* Add more mentor details as needed */}
                {
                    mentor?.courses.map((course) => (
                        <div key={course._id} className='flex flex-col'>
                            <h2 className='text-xl'>{course.name}</h2>
                            <p>{course.description}</p>
                            <p>Duration: {course.duration}</p>
                            {/* Add more course details as needed */}
                        </div>
                    ))
                }
            </div>
        )}
    </div>
  )
}

export default AdminAssignMentor