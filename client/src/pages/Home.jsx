import Partner from '../components/Partner'
import HeroLanding from '../components/HeroLanding'
import TestimonialBento from '@/components/TestimonialBento'
import FAQ from '@/components/FAQ'
import TopCourses from '@/components/TopCourses'
import TopMentors from '@/components/TopMentors'
import SearchCourses from '@/components/SearchCourses'
import SpecialBundles from '@/components/SpecialBundles'
import DiscountPopup from '@/components/DiscountPopup'
import DownloadApp from '@/components/DownloadApp'


const Home = () => {
  return (
    
    <div className="min-h-screen my-0">
      <HeroLanding/>
      <Partner/>
      <SearchCourses/>
      <SpecialBundles />
      <TopCourses />
      <TestimonialBento />
      {/* <DownloadApp /> */}
      <TopMentors/>

      <FAQ />
      <DiscountPopup/>
    </div>
   
  )
}

export default Home