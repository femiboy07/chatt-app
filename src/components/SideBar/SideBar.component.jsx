import React, {  useCallback, useEffect, useState } from "react";
import Channels from "../Channels/Channels.component";
import { Routes,Route } from "react-router";
import Channel from "../Channel/Channel.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import LoginBar from "../LoginBar/LoginBar.component";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';
import { Link } from "react-router-dom";
import { fetchImage, fetchRooms, setProfiles, setSelectedRoom, updateProfile, updateRoom } from "../../reduxstore/features/Channels/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";
import useUserAuth from "../../Context/userContext";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { updateDoc,doc, arrayUnion, collection, query, where, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import './sidebar.component.css'
import ChannelItem from "../channelitem/ChannelItem.component";
import { AccountCircle } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import fetchRoom from "../apiContext/fetchRoom.component";
import { useGetCurrentProfile } from "../../Hooks/useUploadImage/useGetCurrentProfile";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useOnlineStatus from "../../Hooks/useOnlineStatus";




const SideBar=({isOpen,setIsOpen,bar, smIsOpen, smSetIsOpen,setBar,handleClick,searchTerm,setText, barRef,setSearchTerm,searchChannel,sideRef,handleClickOutsideBar,handleShow,handleModal,room,setRooms,handleShowModalProfile,scrollRef,handleScrollDown})=>{
   const [changeSide,setChangeSide]=useState(false);
   const {error,profiles,selectedRoom,rooms,loading}=useSelector((state)=>state.rooms);
   const [userProfile]=useGetCurrentProfile(auth.currentUser);
   const isOnline=useOnlineStatus();
   const dispatch=useDispatch();
   const [width]=useInnerWidthState();
   const roomId=selectedRoom?.id
   console.log(width)
   console.log(auth.currentUser.uid);




  

    const handleJoinRoomConfirm = useCallback(async (room) => {
      try{
        handleScrollDown()
      if(isOnline){ 
         
      const currentUser = auth.currentUser.uid;
      const roomsRef=doc(firestore,'Rooms',room.id)
            await updateDoc(roomsRef, {
        members: arrayUnion(currentUser)
      });
      setChangeSide(false);
      dispatch(setSelectedRoom(room));
       setSearchTerm('')
          toast.dismiss();
      }else{
        toast.dark(
          <div>
          You can join room when offline
          <div className="mt-3">
          <button onClick={() => toast.dismiss()} className="pl-8 pr-8 bg-white ml-2 text-black rounded-md" >No</button>
          </div>
          </div>,
          {
          onClose: (reason) => {
            if (reason === 'manual') {
              // Toast was closed by clicking Yes or No button
              toast.dismiss();
            }
          },
          autoClose: 5000,
        }
        )
      }
      }catch(err){
        console.log(err)
      }
      
    },[dispatch, isOnline, setSearchTerm,handleScrollDown]);

    const handleChangeChannel=useCallback(async(room)=>{
      console.log('...joining room')
    
      const memberIds=room.members;
      const currentUser=auth.currentUser.uid;
      console.log(memberIds.includes(currentUser))
      if(memberIds.includes(currentUser)){
        setChangeSide(false);
        dispatch(setSelectedRoom(room));
         handleScrollDown()
       
        // scrollRef.current.scrollTop=scrollRef?.current?.scrollHeight;
        setSearchTerm('')
        setText('')
      }else{
        // dispatch(selectedRoom('welcome'))
        toast.dark(
          <>
            Do you want to join the <strong>{room.name}</strong> room?
            <div className="mt-3">
              <button onClick={() => handleJoinRoomConfirm(room)} className="pl-8 pr-8  bg-white rounded-md text-black">Yes</button>
              <button onClick={() => toast.dismiss()} className="pl-8 pr-8 bg-white ml-2 text-black rounded-md" >No</button>
            </div>
          </>,
          {
            onClose: (reason) => {
              if (reason === 'manual') {
                // Toast was closed by clicking Yes or No button
                toast.dismiss();
              }
            },
            autoClose: 5000,
          }
        );
      }
  
      },[dispatch, handleJoinRoomConfirm, setSearchTerm, setText,handleScrollDown])
   
 
    

   
return (    
          
          <div className={ `fixed ${isOpen === true ? `fixed animate-wiggle` : `hidden `}  shadow-[15px_10px_5px_5px_red] scrollbar-thin sm:overflow-y-hidden  max-w-[570px]:overflow-y-auto  sm:hover:overflow-y-auto overflow-x-hidden lg:flex  left-0 top-0  bottom-0 box-border h-full max-[370px]:h-screen  max-[370px]:text-sm   max-[370px]:w-full   shadow-[0,4,4,0,#000000,25%]  max-[370px]:max-w-full  z-[90]  w-[324px]    bg-[#120F13]   `}>
         
          <Routes>
          <Route path={'/'} element={<Channels/>}/>
          <Route  path={`/channel/:id`} element={
          <Channel
             bar={bar} 
             handleShowModalProfile={handleShowModalProfile}
             handleClickOutsideBar={handleClickOutsideBar} 
             sideRef={sideRef} 
             setBar={setBar}
             handleClick={handleClick}
             />}/>
             <Route  
             path={`/allChannel/homePage`} 
             element={<Channels 
             searchTerm={searchTerm} 
             handleModal={handleModal} 
             setSearchTerm={setSearchTerm} 
             searchChannel={searchChannel} 
             setIsOpen={setIsOpen}
             barRef={barRef}
             room={room} 
             setRooms={setRooms} 
             handleChangeChannel={handleChangeChannel}/>}
             
             />

            <Route  
             path={'/allChannel'} 
             element={<Channels 
             searchTerm={searchTerm} 
             handleModal={handleModal} 
             setSearchTerm={setSearchTerm} 
             searchChannel={searchChannel} 
             setIsOpen={setIsOpen}
             smSetIsOpen={smSetIsOpen}
             smIsOpen={smIsOpen}
             isOpen={isOpen}
             barRef={barRef}
             room={room} 
             setRooms={setRooms} 
             handleChangeChannel={handleChangeChannel}/>}
            />
            </Routes>
             {bar === true ? (
            <LoginBar 
             sideRef={sideRef} 
             handleShow={handleShow}
             bar={bar} 
             handleClickOutsideBar={handleClickOutsideBar} 
            /> 
            ):null} 
            {bar && <div onClick={handleClickOutsideBar}  className="w-[324px] animate-wiggle  fixed left-0 top-0  z-50 bg-transparent"></div>}
               <div className="bg-black flex justify-between animate-wiggle fixed p-4 w-[324px] max-[370px]:w-full  bottom-0 mt-5 left-0 rounded-bl-lg">
               {userProfile  && userProfile?.ImageUrl === null  ? <span><AccountCircleIcon  className="w-[45px] bg-slate-50 h-[42px] rounded-full" color="black" fontSize="large"  /></span>:
                <div className="  left-[27.76px]">
                  <img src={userProfile?.ImageUrl} className='w-[45px] h-[42px] rounded-lg'  alt='profile'/>
                </div>}
                <div className="text-[18px] w-[159px] max-[370px]:hidden h-[24.16px] self-center absolute left-[97.9px]">
                    <span className="text-[#828282] font-bold tracking-[-3.5%] text-[18px] leading-[24.52px] max-[370px]:hidden  ">{userProfile?.FirstName}</span>
                </div>
                <Link className="text-black self-center left-0 "  onClick={handleClick} ref={sideRef}>
                  <FontAwesomeIcon icon={faArrowDown} color='white'/>
                </Link>
                </div> 
             </div> 
            

    )
}

export default SideBar;