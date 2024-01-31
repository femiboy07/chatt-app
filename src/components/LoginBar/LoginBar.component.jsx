import React,{useEffect} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import useUserAuth from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchImage } from "../../reduxstore/features/Channels/channelSlice";
import { auth } from "../../firebase/firebase";



const LoginBar=({sideRef,bar,handleClickOutsideBar,handleShow})=>{
  
  const {userSignOut,setUser}=useUserAuth();
  const navigate=useNavigate();
  const handleLogOut=async()=>{
    userSignOut().then((user)=>{
        console.log(user,'user signed out succesfully');
        setUser(null)
        // localStorage.clear('selectedRoom');
        navigate('auth/login');
    }).catch((err)=>{
      console.log(err)
    })
  }
 
    return(
        <div className="w-[192.04px] bg-[#252329] z-[51] rounded-lg mb-4 animate-wiggle max-[370px]:left-0  left-[112px] right-[19.2px] bottom-[45.75px] h-fit fixed">
           <div className="flex flex-col  w-[100%]  h-full cursor-pointer ">
              <div onClick={handleShow} className="h-[39.15px] w-[164px] flex items-center mt-[15.05px] pt-2 pb-2  rounded-md ml-[12px]  mr-[19.5px] hover:bg-[#3C393F]">
                <span className="ml-[13.35px]"><AccountCircleIcon sx={{color:"white"}}/></span>
                <span className="ml-2 text-white text-[12px]">My profile</span>
              </div>
              
              <span className=" h-0  border-[0.1px] mt-2 w-[164px] flex items-center ml-[12px]"></span>
              <div onClick={handleLogOut} className="w-[164px] h-[39.15px] mt-2 flex items-center rounded-md ml-[12px] pt-2 pb-2  mb-[23.19px]  mr-[19.5px] hover:bg-[#3C393F]" >
              <span className="ml-[13.35px]"><LogoutIcon sx={{color:"red"}}/></span>
                <span className="ml-2 text-red-500 text-[12px]" >Logout</span>
                </div>
           </div>
         
        </div>
    )
}

export default LoginBar;