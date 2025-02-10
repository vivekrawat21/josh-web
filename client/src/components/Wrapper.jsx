const Wrapper = ({children}) => {
  return (
   <div className="min-h-screen flex justify-center relative">
    <div className="sm:w-[96vw] w-full mt-24">
     {children}
    </div>
   </div>
  )
}

export default Wrapper;