import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';
import {useDispatch,useSelector} from 'react-redux';
import { clearSelectedRoom, fetchRooms ,fetchRoomProfiles} from "../../reduxstore/features/Channels/channelSlice";
import { CircularProgress } from "@mui/material";



const Channel=({bar,sideRef,handleClickOutsideBar,handleClick})=>{
    const {loading,error,profiles,selectedRoom}=useSelector((state)=>state.rooms);
    const dispatch=useDispatch()
   
   console.log(profiles)
   const roomId=selectedRoom?.id;
   useEffect(()=>{
    if(roomId){
      
      dispatch(fetchRoomProfiles(roomId));
    }  
   },[roomId,dispatch])


    

    if(loading){
        return (
         <div className="flex justify-center  items-center h-[100%] w-[100%]">
         <CircularProgress/>
         </div> 
        
        )
    }

    

     
    const abbreviation=(str)=>{
        let words=str.split(' ');
        let abbreviated=words.map(word=>word[0]).join('');
        return abbreviated;
      }
    return(
      
        <div className="overflow-auto">
        
        <div className="h-[3.53rem] w-[324px]   top-96 bottom-3/4 flex items-center">
           <Link to='/allChannel' className="mr-5 ml-4 w-[10.74px] h-[18.77px] flex self-center" > 
             <FontAwesomeIcon icon={faLessThan} className='text-[#F2F2F2]'/>
             </Link>   
            <div className="w-[102px] h-[25px] flex self-center"><span className="text-[#E0E0E0] text-[18px] leading-[24.52px] font-[Noto-Sans]">All Channels</span></div>
            </div>
            <div className="mt-5 ml-6 mr-4 flex flex-col  w-fit">
             <span className="text-[#E0E0E0] text-[18px] uppercase leading-[25px] font-[700] font-[Noto-Sans] ">{selectedRoom.name}</span>
            <span className="text-[#E0E0E0] h-fit w-[257.5px] leading-[25px] font-[Noto-Sans] text-[18px] mt-3 tracking-[-0.035em] ">{selectedRoom.description}</span>
            
            </div>
            
        <div className="mt-10 mr-4 ml-6   ">
          <h1 className="text-[#828282] text-[18px] font-[Noto-Sans] ">MEMBERS</h1>
          <>
          {profiles && profiles.map((user)=>{
            return(
            <ul className="mt-5" key={user.id}>
            <div className="flex flex-row  w-[265.42px] justify-between  h-[42px]">
                {user.ImageUrl == null ?
                <div className="w-[42px] flex items-center justify-center  h-[42px] text-[#FFFFFF] bg-[#252329] rounded-lg absolute ">
                <span >{abbreviation(user.FirstName)}</span>
              </div>:
                <img  className='w-[42px] h-[42px] rounded-lg' alt='loading'/>
               }
                <li className="text-[#828282] flex self-center ml-12 font-[Noto-Sans]">{user.FirstName}</li>
              </div>
             </ul>
            )
          })}
          </>
        </div>
      
        </div>

      
        
    )
}

export default Channel;