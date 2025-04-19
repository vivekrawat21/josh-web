import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react';

const EditCourse = () => {
    // const { course } = useSelector((state) => state.course);
    const { id } = useParams();
  
  return (
    <div>EditCourse</div>
  )
}

export default EditCourse