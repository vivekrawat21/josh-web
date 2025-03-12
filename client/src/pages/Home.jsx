import Partner from '../components/Partner'
import HeroLanding from '../components/HeroLanding'
import TestimonialBento from '@/components/TestimonialBento'
import FAQ from '@/components/FAQ'
import TopCourses from '@/components/TopCourses'
import TopMentors from '@/components/TopMentors'
import SearchCourses from '@/components/SearchCourses'
import Bundles from '@/components/Bundles'
import DiscountPopup from '@/components/DiscountPopup'


const Home = () => {
  return (
    
    <div className="min-h-screen my-0">
    <HeroLanding/>
    <Partner/>
    <SearchCourses/>
    <Bundles />
    <TopCourses />
    <TestimonialBento />
    <TopMentors/>
    <FAQ />
    <DiscountPopup/>
    </div>
   
  )
}

export default Home