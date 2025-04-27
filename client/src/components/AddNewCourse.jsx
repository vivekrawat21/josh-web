import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import { Button } from "@/components/ui/button";

const AddNewCourse = ({ addCourse, setAddCourse }) => {
  const initialState = {
    title: "",
    category: "",
    price: 0,
    duration: "",
    bundleName: "",
    description: "",
    video: "",
    image: null,
    isTrending: false,
    isOffline: false,
    whyCourse: [""],
    videos: [{ title: "", url: "" }],
    whatYouWillLearn: [""],
    whoShouldEnroll: [""],
    stillConfused: [""],
    reason: [""],
    courseHighlights: [""],
    HowWillHelpYou: "",
    certificatePath: null,
    pdfPath: null,
  };

  const [courseData, setCourseData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleArrayChange = (name, index, value) => {
    const newArray = [...courseData[name]];
    newArray[index] = value;
    setCourseData((prev) => ({
      ...prev,
      [name]: newArray,
    }));
  };

  const addArrayItem = (name) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };

  const removeArrayItem = (name, index) => {
    const newArray = [...courseData[name]];
    newArray.splice(index, 1);
    setCourseData((prev) => ({
      ...prev,
      [name]: newArray,
    }));
  };

  const resetForm = () => {
    setCourseData(initialState);
  };

  const uploadCourse = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Append primitive values
  for (const key in courseData) {
    const value = courseData[key];
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else if (typeof value === "object" && value !== null && key === "videos") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== null) {
      formData.append(key, value);
    }
  }

  // Log the formData contents
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const res = await axios.post(`${BASE_URL}/course/createCourse`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    resetForm();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};


  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[index][field] = value;
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  const addVideoInput = () => {
    setCourseData({
      ...courseData,
      videos: [...courseData.videos, { title: "", url: "" }],
    });
  };

  const removeVideoInput = (index) => {
    const updatedVideos = courseData.videos.filter((_, i) => i !== index);
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  const renderArrayField = (label, name) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {courseData[name].map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(name, index, e.target.value)}
            className="w-full"
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeArrayItem(name, index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => addArrayItem(name)}>
        Add Item
      </Button>
    </div>
  );

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: Array.from(files), // Convert FileList to an array
    }));
  };

  return (
    <form
      onSubmit={uploadCourse}
      className="space-y-6 max-w-5xl mx-auto px-4 py-6"
    >
      {/* Basic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          "title",
          "category",
          "price",
          "duration",
          "bundleName",
          "video",
        ].map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              name={field}
              type={field === "price" ? "number" : "text"}
              value={courseData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Thumbnail Image</Label>
        <Input
          id="image"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pdf">Choose Syllabus PDF</Label>
        <Input
          id="pdf"
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate">Choose Certificate Image</Label>
        <Input
          id="certificate"
          name="certificateFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={courseData.description}
          onChange={handleChange}
          placeholder="Enter course description..."
          className="min-h-[120px]"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isOffline"
            checked={courseData.isOffline}
            onChange={handleCheckboxChange}
          />
          Is Offline
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isTrending"
            checked={courseData.isTrending}
            onChange={handleCheckboxChange}
          />
          Is Trending
        </label>
      </div>

      {/* Array Fields */}
      {renderArrayField("What You Will Learn", "whatYouWillLearn")}
      {renderArrayField("Why Take This Course", "whyCourse")}
      {renderArrayField("Who Should Enroll", "whoShouldEnroll")}
      {renderArrayField("Still Confused", "stillConfused")}
      {renderArrayField("Reasons To Join", "reason")}
      {/* {renderArrayField("Course Highlights", "courseHighlights")} */}

      {/* HowWillHelpYou */}
      {/* <div className="space-y-2">
        <Label htmlFor="HowWillHelpYou">How Will This Course Help You?</Label>
        <Textarea
          id="HowWillHelpYou"
          name="HowWillHelpYou"
          value={courseData.HowWillHelpYou}
          onChange={handleChange}
          placeholder="Explain how this course benefits the learner"
          className="min-h-[100px]"
        />
      </div> */}

      {/* Video Section */}
      <div className="space-y-4">
        <Label>Videos</Label>
        {courseData.videos.map((video, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded"
          >
            <Input
              type="text"
              placeholder="Video Title"
              value={video.title}
              onChange={(e) =>
                handleVideoChange(index, "title", e.target.value)
              }
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Video URL"
              value={video.url}
              onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              className="w-full"
            />
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeVideoInput(index)}
                className="w-fit"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={addVideoInput}>
          + Add Another Video
        </Button>
      </div>

      {/* Submit/Reset Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button type="submit">Upload Course</Button>
        <Button type="button" variant="outline" onClick={resetForm}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default AddNewCourse;