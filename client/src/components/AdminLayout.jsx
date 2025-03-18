import React, {useEffect} from "react";
import { setUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import Admin from "@/pages/Admin";
import { BASE_URL } from "@/utils/utils";


const AdminLayout = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try{
      console.log("use effect")
      const res  = await axios.get(`${BASE_URL}/user`,{withCredentials:true})
      console.log("use effect")
      
        console.log(res.data.data)
        dispatch(setUser(res.data.data.user));
    }
    catch(e){
      console.log(e)
    }
    

    
  }
  useEffect(()=>{

    fetchUser()
    
  },[])
  return (
    <div>
      <Admin />
    </div>
  );
};

export default AdminLayout;
