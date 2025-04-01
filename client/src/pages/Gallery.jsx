import React from 'react';

const Gallery = () => {
  return (
    <div className="space-y-16 mb-8">
      {/* Hero image - full width */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
        <img
          src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg"
          alt="Beautiful landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Mountain Sunrise</h2>
            <p className="text-lg opacity-90">Captured at dawn in the Swiss Alps</p>
          </div>
        </div>
      </div>
      
      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative overflow-hidden rounded-lg aspect-square">
            <img
              src={`https://picsum.photos/800/800?random=${i}`}
              alt={`Gallery image ${i}`}
              className="object-cover transition-all duration-300 group-hover:scale-110 absolute inset-0 w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* 2-column feature */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src="https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg"
            alt="Feature image 1"
            className="object-cover absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`relative ${i > 2 ? 'col-span-2 aspect-video' : 'aspect-square'} overflow-hidden rounded-lg`}>
            <img
              src={`https://picsum.photos/600/600?random=${i + 10}`}
              alt={`Grid image ${i}`}
              className="object-cover hover:scale-105 transition-transform duration-300 absolute inset-0 w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;