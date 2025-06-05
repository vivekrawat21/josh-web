import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import CustomToast from '@/components/CustomToast';
import { Button } from '@/components/ui/button';

const TEXT_FIELDS_KEYS = ['description', 'ourMission', 'ourVision', 'aboutFounder'];
const IMAGE_FIELDS_KEYS = ['bannerImage', 'founderImage'];

const AdminAbout = () => {
  const [formData, setFormData] = useState({
    bannerImage: '',
    founderImage: '',
    ourMission: '',
    ourVision: '',
    aboutFounder: '',
    description: '',
  });

  const [initialServerData, setInitialServerData] = useState({ ...formData });
  const [preview, setPreview] = useState({ bannerImage: '', founderImage: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', type: '' });

  const fetchAbout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/about`, { withCredentials: true });
      const serverData = res.data.data || {};

      const normalizedData = {
        ourMission: serverData.ourMission || '',
        ourVision: serverData.ourVision || '',
        aboutFounder: serverData.aboutFounder || '',
        description: serverData.description || '',
        bannerImage: serverData.bannerImage || '',
        founderImage: serverData.founderImage || '',
      };

      setFormData(normalizedData);
      setInitialServerData(normalizedData);
      setPreview({
        bannerImage: normalizedData.bannerImage,
        founderImage: normalizedData.founderImage,
      });
      setEditMode(false);
    } catch (err) {
      const message = err.response?.data?.message || `Fetch failed: ${err.message}`;
      setToast({ open: true, message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, [field]: file }));
    setPreview(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleCancel = () => {
    setFormData(initialServerData);
    setPreview({
      bannerImage: initialServerData.bannerImage || '',
      founderImage: initialServerData.founderImage || '',
    });
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
    TEXT_FIELDS_KEYS.forEach(key => payload.append(key, formData[key]));

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

  const hasActualChanges = checkForChanges();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">About Section</h2>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button
                  onClick={handleSaveToServer}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm"
                  disabled={loading || !hasActualChanges}
                  title={!hasActualChanges ? "No changes made to save" : "Save changes to server"}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 text-sm"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm"
                disabled={loading}
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
                className="w-full border px-4 py-2 rounded text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                <div className="mt-2 mb-2">
                  <img
                    src={preview[field]}
                    alt={`${field} preview`}
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, field)}
                  className="w-full text-sm mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
                  disabled={!editMode || loading}
                />
              )}

              {!preview[field] && !editMode && (
                <p className="text-sm text-gray-500 mt-1">No image uploaded.</p>
              )}
            </div>
          ))}
        </div>
      </div>

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
