import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Body from './components/Body';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Course from './pages/Course';
import TopCourses from './pages/TopCourses';
import Cart from './pages/Cart';


function App() {

  return (
  <>
   <BrowserRouter basename='/'>
    <Routes>
     
      <Route path='/' element={
        <Wrapper>
          <Body />
        </Wrapper>
      }>
        <Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/topcourse/:coursename' element={<TopCourses />}></Route>
          <Route path='/course/:id' element={<Course />}/>
          <Route path='/login'element={<Login />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='*' element={<div>404</div>}/>
        </Route>
      </Route>
    </Routes>
   </BrowserRouter>
  </>
)
}
export default App;
