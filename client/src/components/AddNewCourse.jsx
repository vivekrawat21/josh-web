import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import CustomToast from "@/components/CustomToast";

const AddNewCourse = ({ addCourse, setAddCourse }) => {
  const initialState = {
    title: "",
    category: "",
    price: "",
    duration: "",
    bundleName: "",
    description: "",
    courseIntrovideo: "",
    image: null,
    imageFile: null,
    pdfFile: null,
    certificateFile: null,
    isTrending: false,
    isOffline: false,
    whyCourse: [""],
    videos: [{ title: "", url: "", isPreview: false }],
    whatYouWillLearn: [""],
    whoShouldEnroll: [""],
    stillConfused: [""],
    reason: [""],
    reasonWhyJoshGuru: [""],
    courseHighlights: [""],
    HowWillHelpYou: "",
  };

  const [courseData, setCourseData] = useState(initialState);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    setToast({
      message: `New ${name.replace(/([A-Z])/g, ' $1').trim()} field added`,
      type: "success"
    });
  };

  const removeArrayItem = (name, index) => {
    const newArray = [...courseData[name]];
    newArray.splice(index, 1);
    setCourseData((prev) => ({
      ...prev,
      [name]: newArray,
    }));
    setToast({
      message: `Field removed successfully`,
      type: "success"
    });
  };

  const resetForm = () => {
    setCourseData(initialState);
    setToast({
      message: "Form has been reset",
      type: "success"
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setCourseData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const uploadCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    for (const key in courseData) {
      if (
        key !== 'imageFile' &&
        key !== 'pdfFile' &&
        key !== 'certificateFile' &&
        !Array.isArray(courseData[key]) &&
        !(courseData[key] instanceof File) &&
        key !== 'videos' &&
        courseData[key] !== null &&
        courseData[key] !== undefined
      ) {
        formData.append(key, courseData[key]);
      }
    }

    ['whatYouWillLearn', 'whoShouldEnroll', 'whyCourse', 'stillConfused',
      'reason', 'reasonWhyJoshGuru', 'courseHighlights'].forEach(arrayField => {
        if (courseData[arrayField] && Array.isArray(courseData[arrayField])) {
          formData.append(arrayField, JSON.stringify(courseData[arrayField]));
        }
      });

    formData.append('videos', JSON.stringify(courseData.videos));

    if (courseData.imageFile instanceof File) {
      formData.append('imageFile', courseData.imageFile);
    }

    if (courseData.pdfFile instanceof File) {
      formData.append('pdfFile', courseData.pdfFile);
    }

    if (courseData.certificateFile instanceof File) {
      formData.append('certificateFile', courseData.certificateFile);
    }

    try {
      const res = await axios.post(`${BASE_URL}/course/createCourse`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      resetForm();
      setToast({
        message: "Course uploaded successfully!",
        type: "success"
      });
      setShowToast(true);
    
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || "Failed to upload course",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setCourseData({ ...courseData, videos: updatedVideos });
  };

  const addVideoInput = () => {
    setCourseData({
      ...courseData,
      videos: [...courseData.videos, { title: "", url: "", isPreview: false }],
    });
    setToast({
      message: "New video field added",
      type: "success"
    });
  };

  const removeVideoInput = (index) => {
    const updatedVideos = courseData.videos.filter((_, i) => i !== index);
    setCourseData({ ...courseData, videos: updatedVideos });
    setToast({
      message: "Video field removed",
      type: "success"
    });
  };

  const renderArrayField = (label, name) => (
    <div className="space-y-4">
      <Label className="text-xl font-semibold">{label}</Label>
      {courseData[name].map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(name, index, e.target.value)}
            className="w-full rounded border"
          />
          <Button
            type="button"
            className="bg-black hover:bg-gray-900 text-white px-3 py-1 rounded-md w-full sm:w-auto"
            onClick={() => removeArrayItem(name, index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-md w-full sm:w-auto"
        onClick={() => addArrayItem(name)}
      >
        Add Item
      </Button>
    </div>
  );

  const clearToast = () => {
    setToast({ message: "", type: "" });
  };

  return (
    <div className="relative">
      <form
        onSubmit={uploadCourse}
        className="space-y-8 max-w-5xl mx-auto px-4 py-6"
      >
        <h1 className="text-2xl font-bold mb-6">Add New Course</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "title",
            "category",
            "price",
            "duration",
            "bundleName",
          ].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="block mb-2 font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === "price" ? "number" : "text"}
                value={courseData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="block mb-2 font-medium">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            placeholder="Enter course description..."
            className="min-h-[120px] w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="courseIntrovideo" className="block mb-2 font-medium">Course Introduction URL</Label>
          <Input
            id="courseIntrovideo"
            name="courseIntrovideo"
            type="text"
            value={courseData.courseIntrovideo}
            onChange={handleChange}
            placeholder="Enter video URL"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block mb-2 font-medium">Thumbnail Image</label>
            {courseData?.imageFile && (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(courseData.imageFile)}
                  alt="Selected thumbnail"
                  className="h-20 object-contain"
                />
                <p className="text-sm text-gray-500">Selected image</p>
              </div>
            )}
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="space-y-2">
            <label className="block mb-2 font-medium">Syllabus PDF</label>
            {courseData?.pdfFile && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Selected PDF: {courseData.pdfFile.name}</p>
              </div>
            )}
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="space-y-2">
            <label className="block mb-2 font-medium">Certificate Image</label>
            {courseData?.certificateFile && (
              <div className="mb-2">
                <img
                  src={URL.createObjectURL(courseData.certificateFile)}
                  alt="Selected certificate"
                  className="h-20 object-contain"
                />
                <p className="text-sm text-gray-500">Selected certificate</p>
              </div>
            )}
            <input
              type="file"
              name="certificateFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isOffline"
              checked={courseData.isOffline}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>Is Offline</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isTrending"
              checked={courseData.isTrending}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>Is Trending</span>
          </label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="HowWillHelpYou" className="block mb-2 font-medium">How Will This Course Help You?</Label>
          <Textarea
            id="HowWillHelpYou"
            name="HowWillHelpYou"
            value={courseData.HowWillHelpYou}
            onChange={handleChange}
            placeholder="Explain how this course benefits the learner"
            className="min-h-[100px] w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        <div className="space-y-8">
          {renderArrayField("What You Will Learn", "whatYouWillLearn")}
          {renderArrayField("Why Take This Course", "whyCourse")}
          {renderArrayField("Who Should Enroll", "whoShouldEnroll")}
          {renderArrayField("Still Confused", "stillConfused")}
          {renderArrayField("Reasons To Join", "reason")}
          {renderArrayField("Why Choose Josh Guru", "reasonWhyJoshGuru")}
          {renderArrayField("Course Highlights", "courseHighlights")}
        </div>

        <div className="space-y-4">
          <Label className="block text-xl font-semibold mb-2">Course Videos</Label>
          {courseData.videos.map((video, index) => (
            <div
              key={index}
              className="border p-4 mb-4 rounded-lg bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="block mb-1 font-medium">Title</Label>
                  <Input
                    type="text"
                    placeholder="Video Title"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <Label className="block mb-1 font-medium">URL</Label>
                  <Input
                    type="text"
                    placeholder="Video URL"
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>
              <div className="mt-2 mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={video.isPreview || false}
                  onChange={(e) => handleVideoChange(index, "isPreview", e.target.checked)}
                  className="w-4 h-4 mr-2"
                />
                <label>Preview (Free to access)</label>
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  className="bg-black hover:bg-gray-900 text-white px-3 py-1 rounded-md w-full sm:w-auto mt-2"
                  onClick={() => removeVideoInput(index)}
                >
                  Remove Video
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-md w-full sm:w-auto"
            onClick={addVideoInput}
          >
            + Add Another Video
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : null}
            Upload Course
          </Button>
          <Button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md w-full sm:w-auto"
            onClick={resetForm}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </form>

      {showToast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setShowToast(false);
          }}
        />
      )}
    </div>
  );
};

export default AddNewCourse;
