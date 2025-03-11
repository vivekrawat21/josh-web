import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_URL } from "@/utils/utils";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const AdminOffers = () => {
  const [courses, setCourses] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [discount, setDiscount] = useState("");
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Courses from Backend
  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course`, { withCredentials: true });
      setCourses(res.data.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []); // Run once on mount

  // Handle setting a discount on a course
  const handleSetDiscount = async () => {
    if (!selectedCourse || !discount) {
      alert("Select a course and enter a discount!");
      return;
    }

    setLoading(true);

    try {
      const updatedCourse = {
        ...selectedCourse,
        discount: Number(discount),
        discountedPrice: selectedCourse.price - (selectedCourse.price * discount) / 100,
      };

      // Update backend
      await axios.patch(`${BASE_URL}/discount`, {
        courseId: selectedCourse._id,
        discount: Number(discount),
      },
      {
        withCredentials: true,
      }
    );

      // Update frontend state
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course._id === selectedCourse._id ? updatedCourse : course))
      );

      setDiscount("");
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error setting discount:", error);
    }

    setLoading(false);
  };

  // Handle removing a discount
  const handleRemoveDiscount = async (courseId) => {
    setLoading(true);

    try {
      await axios.delete(`${BASE_URL}/discount`, {  courseId  },{
        withCredentials: true,
      });

      // Update frontend state
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, discount: 0, discountedPrice: course.price } : course
        )
      );
    } catch (error) {
      console.error("Error removing discount:", error);
    }

    setLoading(false);
  };

  // Handle popup submission
  const handlePopupSubmit = () => {
    if (!popupMessage) return alert("Enter a popup message!");

    setPopups((prev) => [...prev, popupMessage]);
    setPopupMessage("");
  };

  // Handle removing a popup
  const handleRemovePopup = (index) => {
    setPopups((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-full md:max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel - Manage Offers & Popups</h2>

      {/* Section for Adding Popups */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add a Popup Message</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter popup message..."
            value={popupMessage}
            onChange={(e) => setPopupMessage(e.target.value)}
          />
          <Button className="mt-3 w-full" onClick={handlePopupSubmit} disabled={loading}>
            Add Popup
          </Button>
        </CardContent>
      </Card>

      {/* Display Existing Popups */}
      {popups.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Existing Popups</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popups.map((popup, index) => (
                  <TableRow key={index}>
                    <TableCell>{popup}</TableCell>
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleRemovePopup(index)} disabled={loading}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Section for Managing Course Discounts */}
      <Card>
        <CardHeader>
          <CardTitle>Set Discounts on Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedCourse(JSON.parse(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course?._id} value={JSON.stringify(course)}>
                  {course?.title} (Current Discount: {course.discount}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            className="mt-3"
            placeholder="Enter Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={loading}
          />
          <Button className="mt-3 w-full" onClick={handleSetDiscount} disabled={loading}>
            {loading ? <FaSpinner className="animate-spin" /> : "Apply Discount"}
          </Button>
        </CardContent>
      </Card>

      {/* Display Courses & Remove Discount */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Courses with Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Discounted Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) =>
                course.discount > 0 ? (
                  <TableRow key={course._id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell className="line-through text-gray-500">${course.price}</TableCell>
                    <TableCell className="text-green-500 font-bold">
                      ${course.discountedPrice || (course.price - (course.price * course.discount) / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>{course.discount}%</TableCell>
                    <TableCell>
                      <Button variant="destructive" onClick={() => handleRemoveDiscount(course._id)} disabled={loading}>
                        Remove Offer
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOffers;
