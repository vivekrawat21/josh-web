import Partner from '../components/Partner'
import HeroLanding from '../components/HeroLanding'
import TestimonialBento from '@/components/TestimonialBento'
import FAQ from '@/components/FAQ'
import TopCourses from '@/components/TopCourses'
import TopMentors from '@/components/TopMentors'
const Home = () => {
  return (
    <div className="min-h-screen my-0">
    <HeroLanding/>
    <Partner/>
    <TopCourses />
    <TestimonialBento />
    <TopMentors/>
    <FAQ />
    </div>
  )
}

export default Home