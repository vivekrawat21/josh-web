import React from 'react'

const Partner = () => {
    const partners =[
        {
            id:1,
            name:"Partner 1",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcyLmfVn46KtwJXHi3uUCoKLWoCrxWqeGGBA&s"
        },
        {
            id:2,
            name:"Partner 2",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tech_Mahindra_New_Logo.svg/1024px-Tech_Mahindra_New_Logo.svg.png"
        },
        {
            id:3,
            name:"Partner 3",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png"
        },
        {
            id:4,
            name:"Partner 4",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
        },

        {
            id:5,
            name:"Partner 2",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
        },
        {
            id:6,
            name:"Partner 3",
            image:"https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg"
        },
        {
            id:7,
            name:"Partner 2",
            image:"https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$"
        }
    ]
  return (
    <>
      <div className="pt-8">
      <h2 className="text-[1.80rem] lg:text[2.20rem] font-bold text-center  text-gray-900">Our <span className=' text-orange-500 font-semibold font-sans'>Partners</span></h2>
        <div className="relative flex  overflow-hidden rounded-lg   group">
          {/* Left blurred gradient */}
          <div className="absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white via-white to-transparent blur-5xl pointer-events-none "></div>

          {/* Scrolling content */}
          <div className='flex space-x-16 animate-loop-scroll h-28 my-4 group-hover:paused'>
            {partners.map((partner) => (
              <img src={partner.image} alt={partner.name} key={partner.id} className="w-16 h-16 md:w-24 md:h-24 mx-16 max-w-32 object-contain" />
            ))}
          </div>

          {/* Duplicate scrolling content */}
          <div className='flex space-x-16 animate-loop-scroll my-6 group-hover:paused ' aria-hidden="true">
            {partners.map((partner) => (
              <img src={partner.image} alt={partner.name} key={partner.id} className="w-16 h-16 md:w-24 md:h-24 mx-8 max-w-32 object-contain" />
            ))}
          </div>

          {/* Right blurred gradient */}
          <div className="absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white via-white to-transparent blur-5xl pointer-events-none"></div>
        </div>
      </div>
    </>
  )
}

export default Partner
