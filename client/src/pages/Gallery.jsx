import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '@/utils/utils';

const Gallery = () => {
  const { category } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/gallery/category/${category}`);
      console.log("Gallery data:", response.data);
      const data = response.data.map(item => ({
        ...item,
        date: new Date(item.createdAt).toISOString().split('T')[0]
      }));

      setGalleryData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const banner = galleryData[0];

  const groupedByDate = galleryData
    .slice(1)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((acc, item) => {
      acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];
      return acc;
    }, {});

  return galleryData.length === 0 ? (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">No Gallery Data Available</h1>
        <p className="text-gray-600 mt-4">Please check back later.</p>
      </div>
    </div>
  ) : (
    <div className="space-y-16 mb-8 px-4 md:px-8 lg:px-16 mt-20">

      {/* Banner Section */}
      {loading ? (
        <div className="w-full h-[400px] bg-gray-300 animate-pulse rounded-xl shadow-lg" />
      ) : banner ? (
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="p-8 text-center">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
                {banner.title}
              </h2>
              <p className="text-white text-lg">
                Captured on {new Date(banner.date).toLocaleDateString(undefined, {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl">No gallery data available.</div>
      )}

      {/* Gallery Content */}
      {loading ? (
        <div className="space-y-10">
          {[1, 2, 3].map((_, i) => (
            <div key={i}>
              <div className="h-6 w-64 bg-gray-300 animate-pulse rounded mb-4" />
              <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="w-full aspect-[4/3] bg-gray-300 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : Object.keys(groupedByDate).length > 0 ? (
        Object.entries(groupedByDate).map(([date, items]) => (
          <div key={date}>
            <h2 className="text-xl font-semibold text-orange-500 mb-4">
              {new Date(date).toLocaleDateString(undefined, {
                day: 'numeric', month: 'short', year: 'numeric'
              })} — {items.length} Photo{items.length > 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg ${item.aspectRatio === 'landscape' ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg">No gallery items found yet.</div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <p className="text-white text-lg mt-4 text-center">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
