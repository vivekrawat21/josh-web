import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BASE_URL } from "@/utils/utils";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import axios from "axios";

const AdminOffers = () => {
  const [courses, setCourses] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Alert dialog state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  // For delete confirmation
  const [deletePopupId, setDeletePopupId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAllCourses();
    getPopUp();
  }, [loading]);

  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bundle/getAllBundles`, { withCredentials: true });
      setCourses(res.data.data.bundles || []);
    } catch (error) {
      showAlert("Error", "Error fetching courses.");
      console.error("Error fetching courses:", error);
    }
  };

  const getPopUp = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/popup`, { withCredentials: true });
      setMessages(res.data.data.popup || []);
    } catch (error) {
      showAlert("Error", "Error fetching popups.");
      console.error("Error fetching popups:", error);
    }
  };

  // Show AlertDialog
  const showAlert = (title, description) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertOpen(true);
  };

  // Handles discount and/or popup (course association optional)
  const handleSetDiscountAndPopup = async () => {
    if (!discount && !popupMessage) {
      showAlert("Missing Data", "Enter a discount or a popup message!");
      return;
    }
    setLoading(true);
    try {
      // Set discount if provided and course is selected
      if (discount && selectedCourse) {
        await axios.put(
          `${BASE_URL}/discount`,
          {
            courseId: selectedCourse._id,
            discount: Number(discount),
          },
          { withCredentials: true }
        );
      }
      // Set popup if provided (bundle field optional)
      if (popupMessage) {
        await axios.post(
          `${BASE_URL}/popup`,
          {
            text: popupMessage,
            bundle: selectedCourse ? selectedCourse._id : undefined,
          },
          { withCredentials: true }
        );
      }
      if (discount && selectedCourse) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === selectedCourse._id
              ? {
                  ...course,
                  discount: Number(discount),
                  discountedPrice: course.price - (course.price * discount) / 100,
                }
              : course
          )
        );
      }
      if (popupMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: popupMessage, bundle: selectedCourse ? selectedCourse._id : undefined },
        ]);
      }
      setDiscount(0);
      setPopupMessage("");
      setSelectedCourse(null);
      showAlert(
        "Success",
        discount && popupMessage
          ? "Discount and popup message set!"
          : discount
          ? "Discount set!"
          : "Popup message set!"
      );
    } catch (error) {
      console.error("Error setting discount or popup:", error);
      showAlert("Error", "Failed to set discount or popup.");
    }
    setLoading(false);
  };

  // Handles popup only (no course association)
  const handleSetPopupOnly = async () => {
    if (!popupMessage) {
      showAlert("Missing Data", "Enter a popup message!");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/popup`,
        {
          text: popupMessage,
          bundle: undefined,
        },
        { withCredentials: true }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: popupMessage, bundle: undefined },
      ]);
      setPopupMessage("");
      setSelectedCourse(null);
      showAlert("Success", "Popup message set!");
    } catch (error) {
      console.error("Error setting popup:", error);
      showAlert("Error", "Failed to set popup message.");
    }
    setLoading(false);
  };

  const handleRemoveDiscount = async (courseId) => {
    setLoading(true);
    try {
      await axios.put(
        `${BASE_URL}/discount/remove`,
        { courseId },
        { withCredentials: true }
      );
      await axios.delete(`${BASE_URL}/popup/${courseId}`, { withCredentials: true });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, discount: 0, discountedPrice: course.price } : course
        )
      );
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.bundle?._id !== courseId && msg.bundle !== courseId)
      );
      showAlert("Success", "Offer removed!");
    } catch (error) {
      console.error("Error removing discount:", error);
      showAlert("Error", "Failed to remove offer.");
    }
    setLoading(false);
  };

  // Delete any popup by id (text-only or bundle)
  const handleDeletePopup = async (popupId) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/popup/delete/${popupId}`, { withCredentials: true });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== popupId));
      showAlert("Success", "Popup deleted!");
    } catch (error) {
      console.error("Error deleting popup:", error);
      showAlert("Error", "Failed to delete popup.");
    }
    setLoading(false);
    setDeletePopupId(null);
    setDeleteDialogOpen(false);
  };

  // Mobile card view for courses with discounts
  const renderMobileDiscountCard = (course) => {
    const popupMsg =
      messages.find((msg) => (msg.bundle?._id || msg.bundle) === course._id)?.text ||
      "No message available";
    const discountedPrice =
      course.discountedPrice ||
      (course.price - (course.price * course.discount) / 100).toFixed(2);

    return (
      <div
        key={course._id}
        className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base">{course.bundleName}</h3>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <MdDiscount className="mr-1" /> {course.discount}% Off
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="line-through text-gray-500 text-sm">₹{course.price}</span>
          <span className="text-green-600 font-bold">₹{discountedPrice}</span>
        </div>
        <div className="bg-gray-50 p-3 rounded-md mb-3 text-sm">
          <div className="flex items-start gap-2">
            <IoMdInformationCircle className="text-blue-600 mt-1 flex-shrink-0" />
            <p className="text-xs text-gray-700">{popupMsg}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveDiscount(course._id)}
          disabled={loading}
          className="w-full flex items-center justify-center gap-1 text-xs"
        >
          <FaTrash size={12} /> {loading ? "Processing..." : "Remove Offer"}
        </Button>
      </div>
    );
  };

  const discountedCourses = courses.filter((course) => course.discount > 0);

  // Table of all popups (including text-only)
  const renderAllPopups = () => (
    <Card className="mt-6 overflow-hidden shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">
          All Popups
          {messages.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full">
              {messages.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No popups available</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Popup Message</TableHead>
                  <TableHead>Associated Course</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => {
                  const course = courses.find(
                    (c) => c._id === (msg.bundle?._id || msg.bundle)
                  );
                  return (
                    <TableRow key={msg._id}>
                      <TableCell className="max-w-[300px] break-words">{msg.text}</TableCell>
                      <TableCell>
                        {course ? (
                          course.bundleName
                        ) : (
                          <span className="italic text-gray-400">No course/bundle</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setDeletePopupId(msg._id);
                            setDeleteDialogOpen(true);
                          }}
                          disabled={loading}
                          className="flex items-center gap-1 text-xs"
                        >
                          <FaTrash size={12} /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-full sm:max-w-3xl mx-auto p-3 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Admin Panel - Manage Offers & Popups
      </h2>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl">Set Discounts & Popups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Select
              value={selectedCourse ? JSON.stringify(selectedCourse) : undefined}
              onValueChange={(value) => setSelectedCourse(value ? JSON.parse(value) : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Course (optional)" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course._id} value={JSON.stringify(course)}>
                    {course.bundleName} (Current Discount: {course.discount}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Enter Discount %"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              disabled={loading}
              className="text-sm"
              min={0}
              max={100}
            />
            <Textarea
              placeholder="Enter Popup Message"
              value={popupMessage}
              onChange={(e) => setPopupMessage(e.target.value)}
              disabled={loading}
              className="text-sm min-h-[100px]"
            />
            <Button
              className="w-full"
              onClick={handleSetDiscountAndPopup}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <MdDiscount className="mr-2" />
              )}
              <span>Apply Discount & Add Popup</span>
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleSetPopupOnly}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <IoMdInformationCircle className="mr-2" />
              )}
              <span>Add Popup Only</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 overflow-hidden shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl">
            Courses with Discounts
            {discountedCourses.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full">
                {discountedCourses.length}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {discountedCourses.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No discounted courses available
            </div>
          ) : (
            <>
              {/* Mobile View */}
              <div className="md:hidden">
                {discountedCourses.map((course) => renderMobileDiscountCard(course))}
              </div>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Course Name</TableHead>
                      <TableHead className="whitespace-nowrap">Original Price</TableHead>
                      <TableHead className="whitespace-nowrap">Discounted Price</TableHead>
                      <TableHead className="whitespace-nowrap">Discount</TableHead>
                      <TableHead className="whitespace-nowrap">Popup Message</TableHead>
                      <TableHead className="whitespace-nowrap">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountedCourses.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell className="font-medium">{course.bundleName}</TableCell>
                        <TableCell className="line-through text-gray-500">
                          ₹{course.price}
                        </TableCell>
                        <TableCell className="text-green-600 font-bold">
                          ₹
                          {course.discountedPrice ||
                            (
                              course.price -
                              (course.price * course.discount) / 100
                            ).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {course.discount}%
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {messages.find(
                            (msg) => (msg.bundle?._id || msg.bundle) === course._id
                          )?.text || "No message available"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveDiscount(course._id)}
                            disabled={loading}
                            className="flex items-center gap-1 text-xs"
                          >
                            <FaTrash size={12} /> Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* All popups, whether associated or not */}
      {renderAllPopups()}

      {/* AlertDialog for feedback */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation dialog for popups */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Popup</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this popup? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeletePopup(deletePopupId)}
              disabled={loading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOffers;
