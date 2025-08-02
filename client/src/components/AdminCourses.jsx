import React, { useEffect, useState } from 'react';
import { Edit, MoreHorizontal, Trash, Search, Plus, FileSpreadsheet } from "lucide-react";
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '@/features/courses/courseSlice';
import exportToExcel from '@/utils/exportToExcel';
import Students from './Students';

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addNewCourse, setAddNewCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCourseAddButton = () => {
    setAddNewCourse(!addNewCourse);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, { withCredentials: true });
        setCourses(res.data.data.courses);
        dispatch(addCourse(res.data.data.courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const exportData = (filteredCourses.length > 0 ? filteredCourses : courses).map(item => ({
    Name: item.title || "",
    Bundle: item.bundleName || "",
    Price: item.price || "",
    Status: item.isTrending ? "Trending" : "Standard",
    CreatedAt: new Date(item.createdAt).toISOString().split('T')[0] ||  '',
    StudentsEnrolled: item.students.length || 0,
    ID: item._id,
  }));
  
  const editCourse = (id) => {
    navigate(`/admin/editCourse/${id}`);
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${BASE_URL}/course/deleteCourse/${id}`, { withCredentials: true });
        setCourses(courses.filter(course => course._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // Responsive card display for mobile view
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{course.category}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-lg rounded-md">
            <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => editCourse(course._id)}
              className="text-sm px-3 py-1.5 hover:bg-gray-100"
            >
              <Edit className="mr-2 h-4 w-4 text-gray-600" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 hover:bg-red-50 text-sm px-3 py-1.5"
              onClick={() => deleteCourse(course._id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-medium">₹{course.price}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Bundle</p>
          <p className="text-sm">{course.bundleName || "N/A"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              course.isTrending ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {course?.isTrending ? "Trending" : "Standard"}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Added</p>
          <p className="text-sm">
            {course?.createdAt
              ? new Date(course.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-3 sm:p-6 bg-white shadow rounded-lg">
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Courses Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleCourseAddButton}
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {addNewCourse ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add New Course</span>
              </>
            )}
          </Button>

          <Button
            onClick={() => exportToExcel(exportData, "Courses")}
            className="bg-orange-600 text-white hover:bg-orange-700 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export to Excel</span>
          </Button>
        </div>
      </div>
      
      {addNewCourse && (
        <div className="my-4 py-4 px-3 sm:px-6 border-2 bg-white rounded-lg shadow-sm">
          <AddNewCourse addNewCourse={addNewCourse} setAddNewCourse={setAddNewCourse} />
        </div>
      )}
      
      <Card className="mt-6 shadow-md">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Course Management</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                Manage your courses, edit details, or remove courses.
              </CardDescription>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                className="w-full pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on mobile */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-700">Title</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Category</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Price</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Bundle</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Added</TableHead>
                      <TableHead className="text-right text-sm font-medium text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <TableRow key={course._id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-sm">{course.title}</TableCell>
                          <TableCell className="text-sm text-gray-600">{course.category}</TableCell>
                          <TableCell className="text-sm text-gray-600">₹{course.price}</TableCell>
                          <TableCell className="text-sm text-gray-600">{course.bundleName || "N/A"}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                course.isTrending ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {course?.isTrending ? "Trending" : "Standard"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
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
                                  <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="shadow-lg rounded-md">
                                <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
                                <DropdownMenuItem 
                                  onClick={() => editCourse(course._id)}
                                  className="text-sm px-3 py-1.5 hover:bg-gray-100"
                                >
                                  <Edit className="mr-2 h-4 w-4 text-gray-600" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600 hover:bg-red-50 text-sm px-3 py-1.5"
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
                        <TableCell colSpan={7} className="text-center py-6 text-sm text-gray-500">
                          {searchTerm ? "No courses match your search criteria" : "No courses found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View - Shown only on mobile */}
              <div className="md:hidden">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-6 text-sm text-gray-500">
                    {searchTerm ? "No courses match your search criteria" : "No courses found"}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourses;