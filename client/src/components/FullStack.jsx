import Hero from "./Hero"
import Features from "./Features"
import Benifits from "./Benifits"
import CourseContent from "./CourseContent"
import Why from "./Why"
import Testimonials from "./Testimonials"
import FAQ from "./FAQ"
import Mentor from "./Mentor"
import Certificate from "./Certificate"
import Bonuses from "./Bonuses"




const FullStack = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
          <Hero />
          <Features />
          <Benifits />
          <CourseContent />
          <Why />
          <Testimonials />
          <FAQ />
          <Mentor />
          <Certificate />
          <Bonuses />
        </main>
      )
    }
    

export default FullStack