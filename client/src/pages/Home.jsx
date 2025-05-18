// import Partner from '../components/Partner'
// import HeroLanding from '../components/HeroLanding'
// import TestimonialBento from '@/components/TestimonialBento'
// import FAQ from '@/components/FAQ'
// import TopCourses from '@/components/TopCourses'
// import TopMentors from '@/components/TopMentors'
// import SearchCourses from '@/components/SearchCourses'
// import SpecialBundles from '@/components/SpecialBundles'
// import DiscountPopup from '@/components/DiscountPopup'
// import DownloadApp from '@/components/DownloadApp'
// import SkillUpCourses from '@/components/SkillUpCourses'
// import EducationalInstituteTestimonial from '@/components/EducationalInstituteTestimonial'
// import WebinarBanner from '@/components/WebinarBanner'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addMentors } from '@/features/mentors/mentorSlice'
// import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils'

const Home = () => {

  // const [mentors, setMentors] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mentors/getAllMentors`, {
          withCredentials: true,
        });
        const mentorList = response.data.data.mentors;
        // setMentors(mentorList);
        dispatch(addMentors(mentorList)); // <-- Dispatching here
      
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
  
    fetchMentors();
  }, [dispatch]);
  
  return (
    <div className="min-h-screen my-0">
      <HeroLanding/>
      <Partner/>
      <SearchCourses/>
      <SpecialBundles />
      <SkillUpCourses/>
      <TopCourses />
      <WebinarBanner/>
      <DownloadApp />
      <TopMentors/>
      <EducationalInstituteTestimonial/>
      <TestimonialBento />
      <FAQ />
      <DiscountPopup/>
    </div>
   
  )
}

export default Home