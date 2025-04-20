import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {
  const [testCourse, setTestCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/course/68050ceb9bd691a00cf344d4')
        setTestCourse(res.data.data.course)
      } catch (error) {
        console.error("Error fetching course:", error)
      }
    }

    if (!testCourse) {
      fetchCourse()
    }
  }, [testCourse])
 console.log(testCourse)
  return (
    <div>
      {/* {testCourse && (
        <div>
          <h1>{testCourse.title}</h1>
          <h2>This is test heading</h2>
          <p>{testCourse.description}</p>
          <img
            src={testCourse.image}
            alt={testCourse.title}
            style={{ width: '300px', height: 'auto' }}
          />
        </div>
        
      )} */}
      <h2>displaying local images </h2>
      <div>
        <img src="http://localhost:3000/files/1745162419528_astronaut-cat-moon-digital-art-4k-wallpaper-uhdpaper.com-261@0@j.jpg" alt="" />
      </div>
    </div>
  )
}

export default Test
