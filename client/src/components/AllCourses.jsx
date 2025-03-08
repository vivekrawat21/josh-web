import React, { useEffect } from 'react'
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddNewCourse from './AddNewCourse';
import { BASE_URL } from '@/utils/utils';



// useEffect({
//    fetchCourses()
// },[])
const AllCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addCourse,setAddCourse]=useState(false);
  const [courses,setCourses]= useState([])
  // const [closeAddCourse,setCloseAddCourse]=useState(false)
  const handleCourseAddButton= ()=>{
    // console.log("")
    setAddCourse(!addCourse)
  }
  const fetchCourses = async()=>{
    try {
      const res = await axios.get(`${BASE_URL}/course`,{withCredentials:true})
    console.log(res)
    setCourses(res.data.data.courses)
    } catch (error) {
        console.log(error)
    }
    
  
  }
  useEffect(()=>{
    fetchCourses()
  },[])

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>Courses Dashboard</div>
        <div>
          <Button onClick={handleCourseAddButton}>Add new Course</Button>
        </div>
      </div>
      {addCourse && (
   <div className='my-2 py-2  px-4 border-2 bg-white rounded-lg'>
    <AddNewCourse addCourse={addCourse} setAddCourse={setAddCourse}/>
   </div>
          )}
       <div>
       <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Course Management</CardTitle>
            <CardDescription>Manage your courses, edit details, or remove courses.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search courses..."
              className="w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Bundle</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Added </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>₹{course.price}</TableCell>
                <TableCell>{course.bundleName}</TableCell>
                <TableCell>{course.date}</TableCell>
                
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      course.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </TableCell>
                <TableCell>{course.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
       </div>
       
    </div>
  )
}

export default AllCourse