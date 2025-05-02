import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import CustomToast from "@/components/CustomToast"; // Import the CustomToast component

const AddNewBundle = ({ addBundle, setAddBundle }) => {
  const initialState = {
    bundleName: "",
    description: "",
    price: 0,
    whyBundle: [""],
    bundleImage: null,
  };

  const [bundleData, setBundleData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [showToast, setShowToast] = useState(false); // Show toast state
  const [toastInfo, setToastInfo] = useState({ message: "", type: "success" }); // Toast content

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBundleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, value) => {
    const updated = [...bundleData.whyBundle];
    updated[index] = value;
    setBundleData((prev) => ({
      ...prev,
      whyBundle: updated,
    }));
  };

  const addArrayItem = () => {
    setBundleData((prev) => ({
      ...prev,
      whyBundle: [...prev.whyBundle, ""],
    }));
  };

  const removeArrayItem = (index) => {
    const updated = [...bundleData.whyBundle];
    updated.splice(index, 1);
    setBundleData((prev) => ({
      ...prev,
      whyBundle: updated,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setBundleData((prev) => ({
        ...prev,
        bundleImage: file,
      }));
    }
  };

  const resetFormFields = () => {
    setBundleData(initialState);
    setUploadProgress(0);
  };

  const uploadBundle = async (e) => {
    e.preventDefault();
    if (!bundleData.bundleImage) {
      alert("Please select an image before uploading!");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("bundleName", bundleData.bundleName);
    formData.append("description", bundleData.description);
    formData.append("price", bundleData.price);
    bundleData.whyBundle.forEach((item) => formData.append("whyBundle", item));
    formData.append("bundleImage", bundleData.bundleImage);

    try {
      const res = await axios.post(`${BASE_URL}/bundle/createBundle`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      console.log(res.data);

      // Show success toast
      setToastInfo({
        message: "Bundle uploaded successfully!",
        type: "success",
      });
      setShowToast(true);

      resetFormFields();
    } catch (error) {
      console.error("Error uploading bundle:", error);

      // Show error toast
      setToastInfo({
        message: "Failed to upload bundle!",
        type: "error",
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={uploadBundle}
      className="space-y-6 max-w-3xl mx-auto px-4 py-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bundleName">Bundle Name</Label>
          <Input
            id="bundleName"
            name="bundleName"
            type="text"
            value={bundleData.bundleName}
            onChange={handleChange}
            placeholder="Enter bundle name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={bundleData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bundleImage">Bundle Thumbnail</Label>
        <Input
          id="bundleImage"
          name="bundleImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Image upload progress bar (only visible while uploading) */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={bundleData.description}
          onChange={handleChange}
          placeholder="Enter bundle description..."
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Why Enroll in this Bundle</Label>
        {bundleData.whyBundle.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              placeholder="Reason..."
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addArrayItem}>
          + Add Reason
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading Bundle...
            </div>
          ) : (
            "Upload Bundle"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={resetFormFields}
          disabled={loading}
        >
          Reset
        </Button>
      </div>

      {/* Custom Toast - show if it's active */}
      {showToast && (
        <CustomToast
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default AddNewBundle;
