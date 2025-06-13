import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import Select from 'react-select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2, Trash2 } from 'lucide-react';

const AdminMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [addMentor, setAddMentor] = useState(false);
  const [updateMentorId, setUpdateMentorId] = useState(null);
  const [deletingMentorId, setDeletingMentorId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    mentorImage: null,
    about: '',
    socialLinks: [],
    position: ''
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Twitter', label: 'Twitter' },
  ];

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/mentors/getAllMentors`, { withCredentials: true });
      if (res.data.statusCode === 200) {
        setMentors(res.data.data.mentors || []);
      }
    } catch (err) {
      // console.log(err);
      toast.error("Failed to fetch mentors");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMentor = () => {
    setAddMentor(!addMentor);
    if (updateMentorId) {
      setUpdateMentorId(null);
      resetForm();
    }
  };

  const handleMentorToggle = (mentorId) => {
    // If clicking the same mentor, toggle the update form off
    if (updateMentorId === mentorId) {
      setUpdateMentorId(null);
      resetForm();
      return;
    }
    
    const selectedMentor = mentors.find(m => m._id === mentorId);
    setFormData({
      name: selectedMentor?.name || '',
      email: selectedMentor?.email || '',
      mobileNumber: selectedMentor?.mobileNumber || '',
      mentorImage: selectedMentor?.profileImage || null,
      about: selectedMentor?.about || '',
      socialLinks: selectedMentor?.socialLinks || [],
      position: selectedMentor?.position || ''
    });

    const selectedPlatforms = (selectedMentor.socialLinks || []).map(link => ({
      value: link.platform,
      label: link.platform
    }));
    setSelectedOptions(selectedPlatforms);

    setUpdateMentorId(mentorId);
    setAddMentor(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, mentorImage: e.target.files[0] }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => {
      const updated = [...prev.socialLinks];
      const idx = updated.findIndex(link => link.platform === platform);
      if (idx !== -1) updated[idx] = { platform, link: value };
      else updated.push({ platform, link: value });
      return { ...prev, socialLinks: updated };
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      mentorImage: null,
      about: '',
      socialLinks: [],
      position: ''
    });
    setSelectedOptions([]);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    // Add more validations as needed
    return true;
  };

  const addNewMentor = async () => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    const loadingToast = toast.loading("Adding mentor...");
    
    const payload = new FormData();
    
    // Add text fields explicitly
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    if (formData.mobileNumber) payload.append('mobileNumber', formData.mobileNumber);
    if (formData.position) payload.append('position', formData.position);
    if (formData.about) payload.append('about', formData.about);
    
    // Add the file with exactly the right field name
    if (formData.mentorImage) {
      payload.append('mentorImage', formData.mentorImage);
    }
    
    // Add socialLinks as JSON string
    payload.append('socialLinks', JSON.stringify(formData.socialLinks));

    try {
      const res = await axios.post(`${BASE_URL}/mentors/add`, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (res.data.statusCode === 201) {
        toast.success('Mentor added successfully!');
        resetForm();
        setAddMentor(false);
        fetchMentors();
      } else {
        toast.error(res.data.message || 'Failed to add mentor');
      }
    } catch (err) {
      console.error('Error adding mentor:', err);
      if (err.response) {
        toast.error(err.response.data.message || `Error ${err.response.status}: Failed to add mentor`);
      } else {
        toast.error('Network error or server not responding');
      }
    } finally {
      toast.dismiss(loadingToast);
      setSubmitting(false);
    }
  };

  const handleUpdateMentor = async (mentorId) => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    const loadingToast = toast.loading("Updating mentor...");
    
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'socialLinks' && key !== 'mentorImage' && value) {
        payload.append(key, value);
      }
    });
    
    if (formData.mentorImage && formData.mentorImage instanceof File) {
      payload.append('mentorImage', formData.mentorImage);
    }
    
    payload.append('socialLinks', JSON.stringify(formData.socialLinks));

    try {
      const res = await axios.patch(`${BASE_URL}/mentors/update/${mentorId}`, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (res.data.statusCode === 200) {
        toast.success('Mentor updated successfully!');
        setUpdateMentorId(null);
        resetForm();
        fetchMentors();
      } else {
        toast.error(res.data.message || 'Failed to update mentor');
      }
    } catch (err) {
      console.error('Error updating mentor:', err);
      toast.error(err.response?.data?.message || 'Error updating mentor');
    } finally {
      toast.dismiss(loadingToast);
      setSubmitting(false);
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    if (window.confirm('Are you sure you want to delete this mentor? This action cannot be undone.')) {
      setDeletingMentorId(mentorId);
      const loadingToast = toast.loading("Deleting mentor...");
      
      try {
        const res = await axios.delete(`${BASE_URL}/mentors/delete/${mentorId}`, {
          withCredentials: true
        });
        
        if (res.data.statusCode === 200) {
          toast.success('Mentor deleted successfully!');
          fetchMentors();
        } else {
          toast.error(res.data.message || 'Failed to delete mentor');
        }
      } catch (err) {
        console.error('Error deleting mentor:', err);
        toast.error(err.response?.data?.message || 'Error deleting mentor');
      } finally {
        toast.dismiss(loadingToast);
        setDeletingMentorId(null);
      }
    }
  };

  const renderLoading = () => (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-gray-800 mb-4" />
      <h1 className="text-2xl font-bold">Loading mentors...</h1>
    </div>
  );

  const renderMentorForm = (isUpdate = false, mentorId = null) => (
    <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">{isUpdate ? 'Update Mentor' : 'Add New Mentor'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input 
            id="name" 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="w-full" 
            required 
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleInputChange} 
            className="w-full" 
            required 
          />
        </div>
        
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input 
            id="mobileNumber" 
            type="text" 
            name="mobileNumber" 
            placeholder="Mobile Number" 
            value={formData.mobileNumber} 
            onChange={handleInputChange} 
            className="w-full" 
          />
        </div>
        
        <div>
          <Label htmlFor="position">Position</Label>
          <Input 
            id="position" 
            type="text" 
            name="position" 
            placeholder="Position/Title" 
            value={formData.position} 
            onChange={handleInputChange} 
            className="w-full" 
          />
        </div>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="mentorImage">Profile Image</Label>
        <Input 
          id="mentorImage" 
          type="file" 
          name="mentorImage"
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full" 
        />
        {formData.mentorImage && (
          <p className="text-sm text-gray-500 mt-1">
            Selected file: {formData.mentorImage instanceof File ? formData.mentorImage.name : 'Current image'}
          </p>
        )}
      </div>
      
      <div className="mb-4">
        <Label htmlFor="about">About</Label>
        <textarea 
          id="about" 
          name="about" 
          placeholder="About the mentor" 
          value={formData.about} 
          onChange={handleInputChange} 
          className="border p-2 rounded-md w-full min-h-[100px]" 
        />
      </div>

      <div className="mb-4">
        <Label>Social Media</Label>
        <Select
          options={options}
          isMulti
          value={selectedOptions}
          onChange={(selected) => {
            setSelectedOptions(selected);
            const updated = selected.map(opt =>
              formData.socialLinks.find(link => link.platform === opt.value) || { platform: opt.value, link: '' }
            );
            setFormData(prev => ({ ...prev, socialLinks: updated }));
          }}
          className="mt-1"
        />
      </div>

      {selectedOptions.map(opt => (
        <div key={opt.value} className="mb-3">
          <Label htmlFor={`link-${opt.value}`}>{opt.label} Link</Label>
          <Input
            id={`link-${opt.value}`}
            type="text"
            className="w-full"
            placeholder={`${opt.label} profile URL`}
            value={formData.socialLinks.find(l => l.platform === opt.value)?.link || ''}
            onChange={(e) => handleSocialLinkChange(opt.value, e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
          onClick={isUpdate ? () => handleUpdateMentor(mentorId) : addNewMentor}
          disabled={submitting}
        >
          {submitting ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {isUpdate ? 'Updating...' : 'Adding...'}
            </div>
          ) : (
            isUpdate ? 'Update Mentor' : 'Add Mentor'
          )}
        </button>

        <button
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => {
            isUpdate ? setUpdateMentorId(null) : setAddMentor(false);
            resetForm();
          }}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  if (loading) {
    return renderLoading();
  }

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mentors</h1>
        <div className="flex gap-2">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={fetchMentors}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Refreshing...
              </div>
            ) : (
              "Refresh"
            )}
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={handleAddMentor}
          >
            {addMentor ? 'Cancel' : 'Add Mentor'}
          </button>
        </div>
      </div>

      {addMentor && renderMentorForm(false)}

      {Array.isArray(mentors) && mentors.length > 0 ? (
        <div className="grid gap-6">
          {mentors.map(mentor => (
            <div key={mentor?._id} className="border rounded-md shadow-md hover:shadow-lg transition-shadow">
              <div className="p-4 flex flex-col sm:flex-row sm:justify-between">
                <div className="flex gap-4 items-center">
                  <img src={mentor.profileImage} alt={mentor.name} className="w-20 h-20 rounded-full object-cover shadow-sm" />
                  <div>
                    <h2 className="text-xl font-bold">{mentor.name}</h2>
                    <p className="text-gray-600">{mentor.email}</p>
                    <p className="text-gray-600">{mentor.mobileNumber}</p>
                    <p className="italic text-sm text-gray-600">{mentor.position}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0 sm:items-start">
                  <Link to={`/admin/${mentor._id}/assignMentor`}>
                    <button className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition-colors">
                      Assign Course
                    </button>
                  </Link>
                  <button
                    className={`${updateMentorId === mentor._id ? 'bg-gray-600' : 'bg-gray-800'} text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors`}
                    onClick={() => handleMentorToggle(mentor._id)}
                  >
                    {updateMentorId === mentor._id ? 'Cancel' : 'Update'}
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                    onClick={() => handleDeleteMentor(mentor._id)}
                    disabled={deletingMentorId === mentor._id}
                  >
                    {deletingMentorId === mentor._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {updateMentorId === mentor._id && (
                <div className="border-t">
                  {renderMentorForm(true, mentor._id)}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <p className="text-xl text-gray-500">No mentors found.</p>
          <button 
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={() => setAddMentor(true)}
          >
            Add your first mentor
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMentor;