import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import CustomToast from '@/components/CustomToast';
import { FaTrash } from 'react-icons/fa';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';

const AdminGallery = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', type: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/gallery`, { withCredentials: true });
      setGallery(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery', err);
      setToast({ open: true, message: 'Failed to fetch gallery.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category) {
      setToast({ open: true, message: 'Title and category are required', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    if (image) formData.append('galleryImage', image);

    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${BASE_URL}/gallery/${editId}`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setToast({ open: true, message: 'Image info updated successfully!', type: 'success' });
      } else {
        if (!image) {
          setToast({ open: true, message: 'Image is required for new upload.', type: 'error' });
          setLoading(false);
          return;
        }
        await axios.post(`${BASE_URL}/gallery`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setToast({ open: true, message: 'Image uploaded successfully!', type: 'success' });
      }

      setTitle('');
      setCategory('');
      setImage(null);
      setPreview(null);
      setEditId(null);
      fetchGallery();
    } catch (err) {
      console.error('Upload error:', err);
      setToast({ open: true, message: 'Failed to upload or update.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setCategory(item.category);
    setPreview(item.image);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setSelectedImage(id);
  };

  const handleRemoveImage = async () => {
    try {
      await axios.delete(`${BASE_URL}/gallery/${selectedImage}`, { withCredentials: true });
      setToast({ open: true, message: 'Image deleted.', type: 'success' });
      fetchGallery();
    } catch (err) {
      console.error('Delete error:', err);
      setToast({ open: true, message: 'Delete failed.', type: 'error' });
    } finally {
      setSelectedImage(null);
    }
  };

  const handleToastClose = () => {
    setToast({ open: false, message: '', type: '' });
  };

  // Group images by category
  const groupedGallery = gallery.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Mobile card render for each gallery item
  const renderMobileCard = (item, idx, category) => (
    <div key={item._id} className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
          {idx === 0 && (
            <span className="absolute top-0 left-0 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-br-lg shadow-md font-semibold">
              Banner
            </span>
          )}
        </div>
        <div className="flex-1">
          <h5 className="font-semibold text-sm">{item.title}</h5>
          <p className="text-xs text-gray-500">{item.category}</p>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        Last updated: {new Date(item.updatedAt).toLocaleDateString()}
      </div>
      
      <div className="flex space-x-2">
        <Button
          onClick={() => handleEdit(item)}
          className="bg-black text-white text-xs flex-1"
          size="sm"
        >
          Edit
        </Button>
        
        {idx !== 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="text-xs flex-1"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash className="mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this image?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemoveImage}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          {editId ? 'Edit' : 'Add'} Gallery Image
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-sm">Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-sm">Category</label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full border px-4 py-2 rounded text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent position="popper" className="w-full min-w-[180px]">
                <SelectItem value="Trips">Trips</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Ocassions">Ocassions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-sm">Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-sm file:font-medium hover:file:bg-gray-200"
            />
          </div>
          {preview && (
            <div className="mt-2">
              <p className="font-medium mb-1 text-sm">Preview:</p>
              <img src={preview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md" />
            </div>
          )}
          <div className="col-span-1 md:col-span-2 mt-2">
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full text-sm bg-black hover:bg-gray-800 text-white"
            >
              {loading ? 'Submitting...' : editId ? 'Update Image' : 'Upload Image'}
            </Button>
          </div>
        </form>
      </div>

      {/* Gallery Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Gallery Images</h3>
        
        {Object.keys(groupedGallery).length === 0 && (
          <p className="text-center text-gray-500 py-4">No images found in gallery.</p>
        )}
        
        {Object.keys(groupedGallery).map((cat) => (
          <div key={cat} className="mb-8">
            <h4 className="text-base sm:text-lg font-semibold mb-2 pb-1 border-b">{cat}</h4>
            
            {/* Mobile View */}
            <div className="md:hidden">
              {groupedGallery[cat].map((item, idx) => renderMobileCard(item, idx, cat))}
            </div>
            
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedGallery[cat].map((item, idx) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div className="relative w-16 h-16">
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                          {idx === 0 && (
                            <span className="absolute top-0 left-0 bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-br-lg shadow-md font-semibold">
                              Banner
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          onClick={() => handleEdit(item)}
                          className="bg-black text-white text-xs"
                          size="sm"
                        >
                          Edit
                        </Button>
                        {idx !== 0 && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleDelete(item._id)}
                              >
                                <FaTrash className="mr-1" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this image?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleRemoveImage}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>

      {toast.open && (
        <CustomToast
          open={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default AdminGallery;