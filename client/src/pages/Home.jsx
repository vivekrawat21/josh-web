import Partner from '../components/Partner'
import HeroLanding from '../components/HeroLanding'
const Home = () => {
  return (
    <div className="min-h-screen my-0">
    <HeroLanding/>
    <h2 className='text-center my-4 text-4xl text-orange-600 font-bold'>Our Partners</h2>
    <Partner/>
    
    </div>
  )
}

export default Home