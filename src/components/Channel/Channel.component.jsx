import React,{useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { clearProfile, fetchRooms, setSelectedRoom} from "../../reduxstore/features/Channels/channelSlice";
import { CircularProgress } from "@mui/material";
import fetchRoom from "../apiContext/fetchRoom.component";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import useUserAuth from "../../Context/userContext";



const Channel=({bar,sideRef,handleClickOutsideBar,handleClick,handleShowModalProfile})=>{
    const {error,profiles,selectedRoom,rooms,loading}=useSelector((state)=>state.rooms);
   const roomId=selectedRoom?.id;
    const dispatch=useDispatch();
    const {user}=useUserAuth()
    const isOnline=useOnlineStatus();
    


   



 useEffect(() => {
      dispatch(clearProfile())
    
      const fetchData = async () => {
        if(roomId || user.uid ){
        const {unsubscribe,membersListener} = await fetchRoom(roomId,dispatch);
       
        // Cleanup function
        return () => {
          // Make sure to invoke the unsubscribe function
          unsubscribe();
          membersListener() // Unsubscribe when the component unmounts
        };
      }
     };
    
      if(roomId || user.uid){
        fetchData();
      }
  
    }, [dispatch, roomId,isOnline,user.uid]);

   
    console.log(profiles)

    // if(loading){
    //     return (
    //      <div className="flex justify-center flex-col  items-center h-screen w-full">
    //      <CircularProgress color="inherit" size={50} />
    //      </div> 
        
    //     )
    // }

    if(error){
      console.log(error,'error')
      return (
        <span>Error can get channel Information</span>
      )
    }

    

     
    const abbreviation=(str)=>{
        let words=str.split(' ');
        let abbreviated=words.map(word=>word[0]).join('');
        return abbreviated;
      }
    return(
      
     <div className="scrollbar-thin h-full overflow-y-auto overflow-x-hidden max-[370px]:w-full break-all  w-full absolute ">
        
        <div className="h-[3.53rem] w-full max-[370px]:w-full    top-96 bottom-3/4 flex  flex-wrap items-center">
           <Link to='/allChannel' className="mr-5 ml-4 w-[10.74px] h-[18.77px] flex self-center" > 
             <FontAwesomeIcon icon={faLessThan} className='text-[#F2F2F2]'/>
             </Link>   
            <div className="w-[102px] h-[25px] flex self-center"><span className="text-[#E0E0E0] text-[18px] leading-[24.52px] ">All Channels</span></div>
        </div>
            <div className="mt-5 ml-6 mr-4 flex break-all h-67 flex-col max-[370px]:max-w-full flex-wrap   ">
             <span className="text-[#E0E0E0] text-[18px]  uppercase leading-[25px] font-[700] ">{selectedRoom.name}</span>
            <span className="text-[#E0E0E0]  leading-[25px]   text-[18px] mt-3 tracking-[-0.035em] ">{selectedRoom.description}</span>
            
            </div>
            
        <div className="mt-10 mr-4 mb-[100%] ml-6 max-w-full   ">
          <h1 className="text-[#828282] text-[18px] ">MEMBERS</h1>
          <>
          {profiles && profiles.map((user)=>{
            return(
            <ul className="mt-5 mb-5 h-full" key={user.id}>
            <div className="flex flex-row  w-[265.42px]  justify-between  h-[42px]">
                {user.ImageUrl === null ?
                <div className="flex items-center">
                <div className="w-[42px] flex items-center justify-center  h-[42px] text-[#FFFFFF] bg-[#252329] rounded-lg absolute ">
                <span >{abbreviation(user.FirstName)}</span>
                </div>
                <span className="text-[#828282] flex  self-center ml-14"  >{user.FirstName}</span>
              </div>:
              <div className="flex  ">
               <img src={user.ImageUrl}  className='w-[42px] flex items-center justify-center h-[42px] absolute rounded-lg' alt='loading'/>
               <li className="text-[#828282] ml-14 flex self-center  ">{user.FirstName}</li>
              
            </div>}
              </div>
             </ul>
            
            )
          })}
          </>
          {/* <div className="mt-5 flex justify-center w-full">
          <button className="p-3 bg-black text-white" onClick={handleShowModalProfile}>more..</button>
          </div> */}
        </div>
      
        </div>

      
        
    )
}

export default Channel;