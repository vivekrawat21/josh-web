import React, { useState } from 'react';

const galleryData = [
  // Banner image
  {
    title: "Annual Office Meetup",
    image: "https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg",
    date: "2024-05-01",
  },

  // Trip Day
  {
    title: "Trip to the Hills",
    image: "https://images.pexels.com/photos/208686/pexels-photo-208686.jpeg",
    date: "2024-04-15",
  },
  {
    title: "Group Selfie",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    date: "2024-04-15",
  },
  {
    title: "Bonfire Night",
    image: "https://images.pexels.com/photos/939700/pexels-photo-939700.jpeg",
    date: "2024-04-15",
  },
  {
    title: "Camp Lunch",
    image: "https://images.pexels.com/photos/1231365/pexels-photo-1231365.jpeg",
    date: "2024-04-15",
  },

  // Office Life
  {
    title: "Team Working",
    image: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
    date: "2024-03-12",
  },
  {
    title: "Office Setup",
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
    date: "2024-03-12",
  },
  {
    title: "Cafeteria Hangout",
    image: "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg",
    date: "2024-03-12",
  },
  {
    title: "Morning Standup",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    date: "2024-03-12",
  },

  // Birthday Celebration
  {
    title: "Birthday Cake Cutting",
    image: "https://images.pexels.com/photos/796602/pexels-photo-796602.jpeg",
    date: "2024-02-22",
  },
  {
    title: "Birthday Decoration",
    image: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
    date: "2024-02-22",
  },
  {
    title: "Birthday Selfies",
    image: "https://images.pexels.com/photos/788896/pexels-photo-788896.jpeg",
    date: "2024-02-22",
  },
  {
    title: "Birthday Group Pic",
    image: "https://images.pexels.com/photos/1239359/pexels-photo-1239359.jpeg",
    date: "2024-02-22",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Grouped by date descending
  const groupedByDate = galleryData
    .slice(1) // exclude the banner image
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((acc, item) => {
      acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];
      return acc;
    }, {});

  const banner = galleryData[0]; // First image is the banner

  return (
    <div className="space-y-16 mb-8 px-4 md:px-8 lg:px-16 mt-20">

      {/* Banner Section */}
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
              Captured on {new Date(banner.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Grouped Gallery */}
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date}>
          <h2 className="text-xl font-semibold text-orange-500 mb-4">
            {new Date(date).toLocaleDateString(undefined, {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </h2>
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

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
