
const Wrapper = ({children}) => {
  return (
    
   <div className="w-full flex justify-center relative">


    <div className=" w-full mt-20 ">
     {children}
    </div>
   </div>
  )
}

export default Wrapper;