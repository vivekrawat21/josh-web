const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      imageUrl: "/member1.jpg",
      description:
        "John leads our projects with a focus on delivering quality and innovation. He has over 10 years of experience managing teams.",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Lead Developer",
      imageUrl: "/member2.jpg",
      description:
        "Jane is an expert in full-stack development and ensures that our technical solutions are cutting-edge and efficient.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "UX/UI Designer",
      imageUrl: "/member4.jpg",
      description:
        "Emily designs user-friendly interfaces and experiences, ensuring our products are intuitive and accessible.",
    },
  ];

  return (
    <section className="py-16 px-8">
      <div className="flex flex-col items-center justify-center gap-12">
        {/* About Section */}
        <div className="w-full">
          <img
            src="/aboutus2.jpeg"
            alt="About us photo"
            className="w-full h-[400px] object-fill" // Adjusted height
          />
        </div>

        {/* About section text */}
        <div className="text-justify text-base md:text-lg lg:text-xl mt-6">
          <p>
          Our Founder and CEO,, is a visionary leader with a
              passion for education and technology. With a background in
              computer science and years of experience in the tech industry,
              ----- saw the need for a platform that would provide high-quality
              education to learners around the world. He founded JoshGuru with
              the goal of making learning accessible and engaging, empowering
              students to achieve their dreams and build a better future. ----
              is dedicated to creating a supportive and inclusive learning
              community that fosters growth and innovation, helping students
              develop the skills they need to succeed in the digital age.  
          </p>
        </div>

        {/* Founder Section */}
        <div className="w-full max-w-6xl flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:w-1/2 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold mb-6">
              Our Founder
            </h2>
            <div className="w-full rounded-lg overflow-hidden shadow-lg">
              <img
                src="/founder.jpeg"
                alt="Founder photo"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
          <div className="text-sm md:text-base lg:text-lg text-gray-700 md:w-1/2">
            <p className="leading-relaxed text-justify">
            At JoshGuru,"Masters Of Education Online", "Education Degrees" ,we believe that education is the key to unlocking
            opportunities and achieving success. Our platform offers a range of
            courses in technology, business, and design, providing learners with
            the skills they need to thrive in the digital world. We are
            committed to creating an engaging and interactive learning
            experience that is accessible to all, connecting students with
            top-notch instructors and industry professionals. Whether you are
            looking to start a new career, enhance your skills, or pursue a
            passion, JoshGuru is here to help you reach your goals, "General Education Requirements".
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold mb-6">
            Our Mission
          </h2>
          <div className="text-sm md:text-base lg:text-lg text-gray-700">
            <p className="leading-relaxed text-justify">
              Our mission is to provide accessible, high-quality education that
              meets industry standards and prepares learners for real-world
              challenges. We focus on delivering practical, hands-on learning
              experiences through the guidance of top mentors, ensuring students
              gain valuable insights into current industry practices. By
              fostering critical thinking, creativity, and problem-solving
              skills, we empower learners to adapt to evolving environments and
              prepare them for the future of work. "Executive Education"
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-48 h-48 mx-auto rounded-full mb-4"
                />
                <h2 className="text-lg md:text-xl font-bold">{member.name}</h2>
                <p className="text-gray-600 text-justify">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-justify">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
