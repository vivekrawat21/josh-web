import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import CustomToast from '@/components/CustomToast';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const TEXT_FIELDS_KEYS = ['description', 'ourMission', 'ourVision'];
const IMAGE_FIELDS_KEYS = ['bannerImage'];

const AdminAbout = () => {
  // About page states
  const [formData, setFormData] = useState({
    bannerImage: '',
    ourMission: '',
    ourVision: '',
    description: '',
  });
  const [initialServerData, setInitialServerData] = useState({ ...formData });
  const [preview, setPreview] = useState({ bannerImage: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', type: '' });

  // Management team states
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', image: null });
  const [previewMemberImage, setPreviewMemberImage] = useState(null);

  // Fetch About data
  const fetchAbout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/about`, { withCredentials: true });
      const serverData = res.data.data || {};
      const normalizedData = {
        ourMission: serverData.ourMission || '',
        ourVision: serverData.ourVision || '',
        description: serverData.description || '',
        bannerImage: serverData.bannerImage || '',
      };
      setFormData(normalizedData);
      setInitialServerData(normalizedData);
      setPreview({ bannerImage: normalizedData.bannerImage });
      setEditMode(false);
    } catch (err) {
      const message = err.response?.data?.message || `Fetch failed: ${err.message}`;
      setToast({ open: true, message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch management team
  const fetchManagementTeam = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/management`);
      setTeam(res.data.data || []);
    } catch {
      setToast({ open: true, message: 'Failed to fetch management team', type: 'error' });
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchManagementTeam();
  }, [fetchAbout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setPreview((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleCancel = () => {
    setFormData(initialServerData);
    setPreview({ bannerImage: initialServerData.bannerImage || '' });
    setEditMode(false);
  };

  const checkForChanges = useCallback(() => {
    for (const key of TEXT_FIELDS_KEYS) {
      if (formData[key] !== initialServerData[key]) return true;
    }
    for (const key of IMAGE_FIELDS_KEYS) {
      if (formData[key] instanceof File) return true;
      if (formData[key] === '' && initialServerData[key] !== '') return true;
    }
    return false;
  }, [formData, initialServerData]);

  const handleSaveToServer = async () => {
    if (!checkForChanges()) {
      setToast({ open: true, message: 'No changes to save.', type: 'info' });
      setEditMode(false);
      return;
    }

    const payload = new FormData();
    TEXT_FIELDS_KEYS.forEach((key) => payload.append(key, formData[key]));
    IMAGE_FIELDS_KEYS.forEach((key) => {
      if (formData[key] instanceof File) {
        payload.append(key, formData[key]);
      }
    });

    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/about/update`, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setToast({ open: true, message: 'Updated successfully!', type: 'success' });
      await fetchAbout();
    } catch (err) {
      const message = err.response?.data?.message || `Update failed: ${err.message}`;
      setToast({ open: true, message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Management team handlers
  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember((prev) => ({ ...prev, image: file }));
      setPreviewMemberImage(URL.createObjectURL(file));
    }
  };

  const handleAddTeamMember = async () => {
    if (!newMember.name || !newMember.role || !newMember.image) {
      return setToast({ open: true, message: 'All fields required', type: 'warning' });
    }

    const form = new FormData();
    form.append('name', newMember.name);
    form.append('role', newMember.role);
    form.append('image', newMember.image);

    try {
      await axios.post(`${BASE_URL}/management/create`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setToast({ open: true, message: 'Member added!', type: 'success' });
      setNewMember({ name: '', role: '', image: null });
      setPreviewMemberImage(null);
      fetchManagementTeam();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add member';
      setToast({ open: true, message: msg, type: 'error' });
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/management/delete/${id}`,{withCredentials: true});
      setToast({ open: true, message: 'Member deleted!', type: 'success' });
      fetchManagementTeam();
    } catch {
      setToast({ open: true, message: 'Failed to delete member', type: 'error' });
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      {/* About Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">About Section</h2>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button
                  onClick={handleSaveToServer}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                  disabled={loading || !checkForChanges()}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-black text-sm"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-black hover:bg-gray-800 text-white text-sm"
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {TEXT_FIELDS_KEYS.map((field) => (
            <div key={field}>
              <label className="block font-semibold mb-1 text-sm capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <textarea
                name={field}
                rows={3}
                className="w-full border px-4 py-2 rounded text-sm disabled:bg-gray-100"
                value={formData[field]}
                onChange={handleChange}
                disabled={!editMode || loading}
              />
            </div>
          ))}

          {IMAGE_FIELDS_KEYS.map((field) => (
            <div key={field}>
              <label className="block font-semibold mb-1 text-sm capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>

              {preview[field] && (
                <img src={preview[field]} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
              )}

              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, field)}
                  className="text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Management Team Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Management Team</h2>

        {/* Team list */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {team.map((member) => (
            <div
              key={member._id}
              className="border rounded-lg p-3 text-center relative shadow-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto object-cover mb-2"
              />
              <h4 className="text-sm font-medium">{member.name}</h4>
              <p className="text-xs text-gray-500">{member.role}</p>
              <Button
                onClick={() => handleDeleteMember(member._id)}
                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-full"
                variant="ghost"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>

        {/* Add new member form */}
        <div className="grid gap-4 mt-4">
          <input
            name="name"
            placeholder="Name"
            value={newMember.name}
            onChange={handleTeamInputChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            name="role"
            placeholder="Role"
            value={newMember.role}
            onChange={handleTeamInputChange}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleTeamImageChange}
            className="text-sm"
          />
          {previewMemberImage && (
            <img
              src={previewMemberImage}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <Button
            onClick={handleAddTeamMember}
            className="bg-green-600 hover:bg-green-700 text-white text-sm"
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.open && (
        <CustomToast
          open={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ open: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default AdminAbout;
