import React, { useEffect, useState } from 'react';
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
import AddNewCourse from './AddNewCourse'; // Uncommented this import
import { addCourse } from '@/features/courses/courseSlice';
import { BASE_URL } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addNewCourse, setAddNewCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Changed from navigator to navigate (conventional name)
  const dispatch = useDispatch();
  
  const handleCourseAddButton = () => {
    setAddNewCourse(!addNewCourse);
  };
  
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, { withCredentials: true });
        console.log(res.data.data.courses);
        setCourses(res.data.data.courses);
        dispatch(addCourse(res.data.data.courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []); // Remove dependency on dispatch, fetch on component mount
  
  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const editCourse = (id) => {
    navigate(`/admin/editCourse/${id}`);
  };

  const deleteCourse = async (id) => {
    // Add confirmation
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${BASE_URL}/course/deleteCourse/${id}`, { withCredentials: true });
        // Update local state after successful deletion
        setCourses(courses.filter(course => course._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center my-4'>
        <h1 className="text-2xl font-bold">Courses Dashboard</h1>
        <Button onClick={handleCourseAddButton}>
          {addNewCourse ? "Cancel" : "Add New Course"}
        </Button>
      </div>
      
      {addNewCourse && (
        <div className='my-4 py-4 px-6 border-2 bg-white rounded-lg shadow-sm'>
          <AddNewCourse addNewCourse={addNewCourse} setAddNewCourse={setAddNewCourse} />
        </div>
      )}
      
      <Card className="mt-6">
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Bundle</TableHead>
                  <TableHead>Status</TableHead> {/* Added missing Status TableHead */}
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>₹{course.price}</TableCell>
                      <TableCell>{course.bundleName || "N/A"}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-base font-medium ${
                            course.isTrending && "bg-green-100 text-green-800" 
                          }`}
                        >
                          {/* {course.status || "Draft"} */}
                          {course?.isTrending && "Trending" }
                        </span>
                      </TableCell>
                      <TableCell>
  {course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
</TableCell>
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
                            <DropdownMenuItem onClick={() => editCourse(course._id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuSeparator /> */}
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => deleteCourse(course._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      {searchTerm ? "No courses match your search criteria" : "No courses found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourses;