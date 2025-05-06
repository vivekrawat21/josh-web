import React from 'react';

// Dummy data with title, image, date
const galleryData = [
  {
    title: "Mountain Sunrise",
    image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    date: "March 10, 2024",
  },
  {
    title: "Forest Walk",
    image: "https://picsum.photos/800/800?random=2",
    date: "March 10, 2024",
  },
  {
    title: "City Lights",
    image: "https://picsum.photos/800/800?random=3",
    date: "March 10, 2024",
  },
  {
    title: "Mystic Fog",
    image: "https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg",
    date: "April 5, 2024",
  },
  {
    title: "Calm Lake",
    image: "https://picsum.photos/800/800?random=4",
    date: "April 5, 2024",
  },
  {
    title: "Snowy Peak",
    image: "https://picsum.photos/800/800?random=5",
    date: "April 5, 2024",
  },
];

const Gallery = () => {
  // Group galleryData by date
  const groupedByDate = galleryData.reduce((acc, item) => {
    acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];
    return acc;
  }, {});

  // Get the first image for banner
  const banner = galleryData[0];

  return (
    <div className="space-y-16 mb-8 px-4 md:px-8 lg:px-16 mt-20">

      {/* Banner Section */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
        <img
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-8 text-white drop-shadow-xl">
            <h2 className="text-4xl font-bold mb-2 drop-shadow-xl">{banner.title}</h2>
            <p className="text-lg drop-shadow-md opacity-100">Captured on {banner.date}</p>
          </div>
        </div>
      </div>

      {/* Filtered Grids by Date */}
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date} className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">{date}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover transition-all duration-300 group-hover:scale-110 absolute inset-0 w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm font-semibold">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
