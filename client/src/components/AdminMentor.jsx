import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import Select from 'react-select';

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link } from 'react-router-dom';
const AdminMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMentor, setAddMentor] = useState(false);
  const [updateMentor, setUpdateMentor] = useState(false);
  const [updateMentorId, setUpdateMentorId] = useState(null);

 
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    image: null,
    about: '',
    socialLinks: [], // Initialized as an array
    position:''
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Twitter', label: 'Twitter' },
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/mentors/getAllMentors`, { withCredentials: true });
        if (res.data.statusCode === 200) {
          setMentors(res.data.data.mentors || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);
  console.log(mentors)
  const handleAddMentor = () => {
    setAddMentor(!addMentor);
  };
  const handleMentorToggle = (mentorId) => {
    // Toggle the update section
    // console.log("updating mentor")
    setUpdateMentor(!updateMentor);
    setUpdateMentorId(prevId => prevId === mentorId ? null : mentorId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };
 const handleUpdateMentor = async() => {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('mobileNumber', formData.mobileNumber);
    payload.append('about', formData.about);
    payload.append('position', formData.position);

    if (formData.image) {
      payload.append('mentorImage', formData.image);
    }

    payload.append('socialLinks', JSON.stringify(formData.socialLinks));

    try {
      const res = await axios.patch(`${BASE_URL}/mentors/update/${updateMentorId}`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.statusCode === 200) {
        alert('Mentor updated successfully!');
        setUpdateMentor(false);
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          mentorImage: null,
          about: '',
          socialLinks: [],
        });
        setSelectedOptions([]);
        // Re-fetch mentors
        const refreshedMentors = await axios.get(`${BASE_URL}/mentors/getAllMentors`, { withCredentials: true });
        setMentors(refreshedMentors.data.data.mentors || []);
      }
    } catch (err) {
      console.log('Error updating mentor:', err);
    }

 }
  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => {
      // Ensure socialLinks is an array
      const updatedSocialLinks = [...prev.socialLinks];
      
      // Update the specific platform link or add a new one if not already present
      const index = updatedSocialLinks.findIndex(link => link.platform === platform);
      if (index !== -1) {
        updatedSocialLinks[index] = { platform, link: value };
      } else {
        updatedSocialLinks.push({ platform, link: value });
      }

      return { ...prev, socialLinks: updatedSocialLinks };
    });
  };

  const addNewMentor = async () => {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('mobileNumber', formData.mobileNumber);
    payload.append('about', formData.about);
    payload.append('position', formData.position);

    if (formData.image) {
      payload.append('mentorImage', formData.image);
    }

    payload.append('socialLinks', JSON.stringify(formData.socialLinks));

    try {
      const res = await axios.post(`${BASE_URL}/mentors/add`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.statusCode === 201) {
        alert('Mentor added successfully!');
        setAddMentor(false);
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          mentorImage: null,
          about: '',
          socialLinks: [],
        });
        setSelectedOptions([]);
        // Re-fetch mentors
        const refreshedMentors = await axios.get(`${BASE_URL}/mentors/getAllMentors`, { withCredentials: true });
        setMentors(refreshedMentors.data.data.mentors || []);
      }
    } catch (err) {
      console.log('Error adding mentor:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mentors</h1>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md ml-4"
          onClick={handleAddMentor}
        >
          {addMentor ? 'Cancel' : 'Add Mentor'}
        </button>
      </div>

      {addMentor && (
        <div className="flex flex-col gap-4 my-4 bg-gray-100 p-6 rounded-md delay-100 transform  scale-95 animate-open">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2 rounded-md"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded-md"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            className="border p-2 rounded-md"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
           <input
            type="text"
            name="position"
            placeholder="Enter mentor position"
            className="border p-2 rounded-md"
            value={formData.position}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="mentorImage"
            accept="image/*"
            placeholder="Upload Image"
            className="border p-2 rounded-md"
            onChange={handleFileChange}
          />
          <textarea
            name="about"
            placeholder="About the mentor"
            className="border p-2 rounded-md"
            value={formData.about}
            onChange={handleInputChange}
          />

          {/* Social Media Select */}
          <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={(selected) => {
              setSelectedOptions(selected);
              // Clean up unselected platforms
              const updatedSocialLinks = [];
              selected.forEach((opt) => {
                if (formData.socialLinks.find(link => link.platform === opt.value)) {
                  updatedSocialLinks.push(
                    formData.socialLinks.find(link => link.platform === opt.value)
                  );
                } else {
                  updatedSocialLinks.push({ platform: opt.value, link: '' });
                }
              });
              setFormData((prev) => ({
                ...prev,
                socialLinks: updatedSocialLinks,
              }));
            }}
            className="text-black"
          />

          {/* Dynamic Social Media Inputs */}
          {selectedOptions.map((option) => (
            <div key={option.value} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                {option.label} Profile Link
              </label>
              <input
                type="text"
                placeholder={`Enter your ${option.label} profile link`}
                className="border p-2 rounded-md"
                value={
                  formData.socialLinks.find((link) => link.platform === option.value)?.link || ''
                }
                onChange={(e) =>
                  handleSocialLinkChange(option.value, e.target.value)
                }
              />
            </div>
          ))}

          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md ml-4"
            onClick={addNewMentor}
          >
            Add Mentor
          </button>
        </div>
      )}

      {/* Mentor List */}
      {Array.isArray(mentors) && mentors.length > 0 ? (
        <div className="flex flex-col gap-4 my-4">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="flex flex-wrap justify-between items-center border p-4 rounded-md mb-4"
            >
              <div className="flex flex-col items-center sm:items-start sm:w-auto w-full p-4">
                <div className="w-24 h-24 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={mentor?.profileImage}
                    alt={mentor?.name}
                  />
                </div>
                <h2 className="text-xl font-bold text-center sm:text-left">{mentor?.name}</h2>
                <p className="text-gray-600 text-center sm:text-left">{mentor?.email}</p>
                <p className="text-gray-600 text-center sm:text-left">{mentor?.mobileNumber}</p>
              </div>
              <div className="flex flex-row sm:flex-col gap-4">
                <Link to={`/admin/${mentor._id}/assignMentor`}> 
                <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md ml-4">
                  Assign Course
                </button>
                </Link>
                <button
                  className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-md ml-4"
                  onClick={() => handleMentorToggle(mentor._id)}
                >
                 {updateMentor ? " Cancel" : "Update Mentor"}
                </button>
              </div>
              
              {updateMentorId === mentor._id && (
                <div className=" w-full mt-4 bg-gray-200 p-4 rounded-md">
                  <h3 className="font-bold">Update Mentor Information</h3>
                  {/* You can replace this with the actual form to update mentor details */}
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      defaultValue={mentor?.name}
                      className="block w-full p-2 mb-2 border rounded-md"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      defaultValue={mentor?.email}
                      className="block w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      defaultValue={mentor?.mobileNumber}
                      className="block w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Mentor Position"
                      defaultValue={mentor?.position}
                      className="block w-full p-2 mb-2 border rounded-md"
                    />
                    <input 
                    type="file"
                    accept="image/*"
                    placeholder="Upload Image"
                    className="block w-full p-2 mb-2 border rounded-md"
                    onChange={handleFileChange}
                    name='mentorImage'

                    />
                    <span>Previous Image ****</span>
                    <img src={mentor?.profileImage} alt="" />
                    <Select
                      options={options}
                      isMulti
                      value={selectedOptions}
                      onChange={(selected) => {
                        setSelectedOptions(selected);
                        // Clean up unselected platforms
                        const updatedSocialLinks = [];
                        selected.forEach((opt) => {
                          if (formData.socialLinks.find(link => link.platform === opt.value)) {
                            updatedSocialLinks.push(
                              formData.socialLinks.find(link => link.platform === opt.value)
                            );
                          } else {
                            updatedSocialLinks.push({ platform: opt.value, link: '' });
                          }
                        });
                        setFormData((prev) => ({
                          ...prev,
                          socialLinks: updatedSocialLinks,
                        }));
                      }}
                      className="text-black"
                    />
                     {selectedOptions.map((option) => (
            <div key={option.value} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                {option.label} Profile Link
              </label>
              <input
                type="text"
                placeholder={`Enter your ${option.label} profile link`}
                className="border p-2 rounded-md"
                value={
                  formData.socialLinks.find((link) => link.platform === option.value)?.link || ''
                }
                onChange={(e) =>
                  handleSocialLinkChange(option.value, e.target.value)
                }
              />
            </div>
          ))}
                    <textarea
                      placeholder="About"
                      defaultValue={mentor?.about}
                      className="block w-full mt-4 p-2 mb-2 border rounded-md"
                    />
                    {/* Add a save button to handle form submission */}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                      onClick={handleUpdateMentor}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center">No Mentors Found</h1>
      )}
    </div>
  );
};

export default AdminMentor;
