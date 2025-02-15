import Partner from '../components/Partner'
import HeroLanding from '../components/HeroLanding'
import TestimonialBento from '@/components/TestimonialBento'
import FAQ from '@/components/FAQ'
const Home = () => {
  return (
    <div className="min-h-screen my-0">
    <HeroLanding/>
    <Partner/>
    <TestimonialBento />
    <FAQ />
    </div>
  )
}

export default Home