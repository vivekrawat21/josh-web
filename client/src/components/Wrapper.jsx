const Wrapper = ({children}) => {
  return (
   <div className="min-h-screen flex justify-center">
    <div className="sm:w-4/5 w-full">
     {children}
    </div>
   </div>
  )
}

export default Wrapper;