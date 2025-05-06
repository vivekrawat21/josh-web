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
  const [messages, setMessages] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCourses();
    getPopUp();
  }, [loading]);

  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course/getAllBundles`, { withCredentials: true });
      setCourses(res.data.data.bundles || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getPopUp = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/popup`, { withCredentials: true });
 
      setMessages(res.data.data.popup|| []);
    } catch (error) {
      console.error("Error fetching popups:", error);
    }
  };

  const handleSetDiscountAndPopup = async () => {
    if (!selectedCourse || !discount || !popupMessage) {
      alert("Select a course, enter a discount, and add a popup message!");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/discount`, {
        courseId: selectedCourse._id,
        discount: Number(discount),
      }, { withCredentials: true });

      await axios.post(`${BASE_URL}/popup`, {
        text: popupMessage,
        bundle: selectedCourse._id,
      }, { withCredentials: true });

      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === selectedCourse._id
            ? { ...course, discount: Number(discount), discountedPrice: course.price - (course.price * discount) / 100 }
            : course
        )
      );

      setMessages(prevMessages => [...prevMessages, { text: popupMessage, bundle: selectedCourse._id }]);

      setDiscount(0);
      setPopupMessage("");
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error setting discount or popup:", error);
    }
    setLoading(false);
  };

  const handleRemoveDiscount = async (courseId) => {
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/discount/remove`, { courseId }, { withCredentials: true });

      await axios.delete(`${BASE_URL}/popup/${courseId}`, { withCredentials: true });

      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId ? { ...course, discount: 0, discountedPrice: course.price } : course
        )
      );

      setMessages(prevMessages => prevMessages.filter(msg => msg.bundle?._id != courseId));
    } catch (error) {
      console.error("Error removing discount:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-full md:max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel - Manage Offers & Popups</h2>
      <Card>
        <CardHeader><CardTitle>Set Discounts & Popups</CardTitle></CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedCourse(JSON.parse(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course?._id} value={JSON.stringify(course)}>
                  {course?.bundleName} (Current Discount: {course.discount}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="number" className="mt-3" placeholder="Enter Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} disabled={loading} />
          <Textarea className="mt-3" placeholder="Enter Popup Message" value={popupMessage} onChange={(e) => setPopupMessage(e.target.value)} disabled={loading} />
          <Button className="mt-3 w-full" onClick={handleSetDiscountAndPopup} disabled={loading}>
            {loading ? <FaSpinner className="animate-spin" /> : "Apply Discount & Add Popup"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>Courses with Discounts</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Discounted Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Popup Message</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map(course =>
                course.discount > 0 ? (
                  <TableRow key={course._id}>
                    <TableCell>{course.bundleName}</TableCell>
                    <TableCell className="line-through text-gray-500">${course.price}</TableCell>
                    <TableCell className="text-green-500 font-bold">
                      ${course.discountedPrice || (course.price - (course.price * course.discount) / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>{course.discount}%</TableCell>
                    <TableCell>
                      {messages.find(msg => msg.bundle?._id === course._id)?.text || "No message available"}
                    </TableCell>
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
