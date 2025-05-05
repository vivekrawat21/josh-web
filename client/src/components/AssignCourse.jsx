import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

const AssignCourse = ({ assignType, studentId }) => {
  const [list, setList] = useState([]); // Store fetched courses or bundles
  const [name, setName] = useState(""); // Search term
  const [filteredList, setFilteredList] = useState([]); // Filtered list based on search term
  const [selectedCourse, setSelectedCourse] = useState(null); // Selected course or bundle
  const [open, setOpen] = useState(false); // Track dialog open/close state

  // Fetch courses or bundles when the dialog is opened
  useEffect(() => {
    if (open) {
      fetchData(); // Fetch data only when dialog is opened
    }
  }, [open]);

  // Reset selected course and search on dialog close
  const resetDialog = () => {
    setSelectedCourse(null);
    setName("");
    setFilteredList([]);
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      if (assignType === "course") {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, {
          withCredentials: true,
        });
        setList(res.data.data.courses); // Save all fetched courses in state
      } else {
        const res = await axios.get(`${BASE_URL}/bundle/getAllBundles`, {
          withCredentials: true,
        });
        setList(res.data.data.bundles); // Save all fetched bundles in state
      }
    } catch (error) {
      console.error("Error fetching courses or bundles:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setName(searchValue);

    // Standardize the list to check against both bundleName and title
    let standardizedList = [];
    if(assignType === "course") {
      standardizedList = list.map((item) => ({
        ...item,
        displayName: item.title   || "",
      }));
    }
    else {
      standardizedList = list.map((item) => ({
        ...item,
        displayName: item.bundleName   || "",
      }));
    }
 
    // If searchValue is at least 3 characters long, filter the list
    if (searchValue.length > 2) {
      if(assignType === "course") {
        const results = standardizedList.filter((item) =>
          item.title.toLowerCase().includes(searchValue)
        );
        setFilteredList(results);
      }
      else {
        const results = standardizedList.filter((item) =>
          item.displayName.toLowerCase().includes(searchValue)
        );
        setFilteredList(results);
      }
     
    } else {
      setFilteredList([]); // Clear filtered list if search term is too short
    }
  };



  const handleCourseSelect = (course) => {
    setSelectedCourse(course); // Set the selected course
    setFilteredList([]); // Clear the filtered list after selection
  };

  const handleRequest = async () => {
    try {
      const endpoint =
        assignType === "course"
          ? `${BASE_URL}/course/assignCourse`
          : `${BASE_URL}/bundle/assignBundle`;
       let field = assignType === "course" ? "courseId" : "bundleId";
      const response = await axios.patch(
        endpoint,
        {
          studentId,
          [field]: selectedCourse?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert(`${assignType} assigned successfully!`);
        resetDialog(); // Close the dialog and reset the form on success
      } else {
        console.error(`Error assigning ${assignType}`);
      }
    } catch (error) {
      console.error(`Error assigning ${assignType}:`, error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full md:w-1/2 text-sm md:text-base"
        >
          Assign {assignType}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl font-semibold text-gray-800">
            Assign {assignType}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-gray-600">
            Assign a {assignType} to this student
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="search"
              className="text-right font-medium text-sm md:text-base"
            >
              {assignType} Name
            </Label>
            <Input
              id="search"
              value={name}
              onChange={handleSearch}
              placeholder={`Search ${assignType}...`}
              className="col-span-3 text-sm md:text-base"
            />
          </div>

          {/* Display Search Results */}
          {filteredList.length > 0 && (
            <div className="mt-2 border border-gray-300 p-2 rounded-md max-h-40 overflow-y-auto">
              {filteredList.map((course) => (
                <div
                  key={course._id}
                  className="p-2 text-sm md:text-base hover:bg-gray-100 cursor-pointer rounded transition"
                  onClick={() => handleCourseSelect(course)}
                >
                  {course.displayName}
                </div>
              ))}
            </div>
          )}

          {/* Display Selected Course/Bundle */}
          {selectedCourse && (
            <div className="mt-4 border border-green-300 p-3 rounded-md bg-green-50 text-green-700 text-sm md:text-base">
              Selected {assignType}:{" "}
              <strong>{selectedCourse.displayName}</strong>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleRequest}
            disabled={!selectedCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
          >
            Assign {assignType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCourse;
