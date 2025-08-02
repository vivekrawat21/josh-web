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
import { Loader2 } from "lucide-react";

const AssignCourse = ({ assignType, studentId }) => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const resetDialog = () => {
    setSelectedCourse(null);
    setName("");
    setFilteredList([]);
    setStatusMessage(null);
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const endpoint =
        assignType === "course"
          ? `${BASE_URL}/course/getCourses`
          : `${BASE_URL}/bundle/getAllBundles`;

      const response = await axios.get(endpoint, { withCredentials: true });

      setList(
        assignType === "course"
          ? response.data.data.courses
          : response.data.data.bundles
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setName(searchValue);

    let standardizedList = list.map((item) => ({
      ...item,
      displayName:
        assignType === "course" ? item.title || "" : item.bundleName || "",
    }));

    setFilteredList(
      searchValue.length > 2
        ? standardizedList.filter((item) =>
            item.displayName.toLowerCase().includes(searchValue)
          )
        : []
    );
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setFilteredList([]);
  };

  const handleRequest = async () => {
    setLoading(true);
    setStatusMessage(null);

    try {
      const endpoint =
        assignType === "course"
          ? `${BASE_URL}/course/assignCourse`
          : `${BASE_URL}/bundle/assignBundle`;

      const field = assignType === "course" ? "courseId" : "bundleId";

      const response = await axios.patch(
        endpoint,
        {
          studentId,
          [field]: selectedCourse?._id,
        },
        { withCredentials: true }
      );
  console.log("loggin response",response)
      if (response.status === 200) {
        setStatusMessage({
          type: "success",
          message: `${assignType} assigned successfully!`,
        });
        setTimeout(() => {
          resetDialog();
        }, 2000);
      } else {
        setStatusMessage({
          type: "error",
          message: `Failed to assign ${assignType}.`,
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong";

      setStatusMessage({ type: "error", message });
    } finally {
      setLoading(false);
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

      <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg border border-gray-200 z-[1000]">
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
            <Label htmlFor="search">{assignType} Name</Label>
            <Input
              id="search"
              value={name}
              onChange={handleSearch}
              placeholder={`Search ${assignType}...`}
              className="col-span-3"
            />
          </div>

          {filteredList.length > 0 && (
            <div className="mt-2 border border-gray-300 p-2 rounded-md max-h-40 overflow-y-auto">
              {filteredList.map((course) => (
                <div
                  key={course._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded transition"
                  onClick={() => handleCourseSelect(course)}
                >
                  {course.displayName}
                </div>
              ))}
            </div>
          )}

          {selectedCourse && (
            <div className="mt-4 border border-green-300 p-3 rounded-md bg-green-50 text-green-700 text-sm md:text-base">
              Selected {assignType}:{" "}
              <strong>{selectedCourse.displayName}</strong>
            </div>
          )}
        </div>

        {statusMessage && (
          <div
            className={`text-sm md:text-base text-center mb-2 ${
              statusMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {statusMessage.message}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            onClick={handleRequest}
            disabled={!selectedCourse || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Assign {assignType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCourse;
