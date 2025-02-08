const Wrapper = ({children}) => {
  return (
   <div className="min-h-screen flex justify-center relative">
    <div className="sm:w-[96vw] w-full">
     {children}
    </div>
   </div>
  )
}

export default Wrapper;