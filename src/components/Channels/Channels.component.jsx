import React,{useEffect, useRef, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "../SearchBar/SearchBar.component";
import ChannelItem from "../channelitem/ChannelItem.component";
import { useSelector ,useDispatch} from "react-redux";
import { fetchRooms } from "../../reduxstore/features/Channels/channelSlice";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";






const Channels=({handleChangeChannel,smIsOpen,isOpen,smSetIsOpen,handleModal,setRooms,room,setSearchTerm,searchChannel,searchTerm,setIsOpen,barRef})=>{
    
    
    const param=useParams()
    const [width]=useInnerWidthState()
    // const encodeName=decodeURIComponent(param)
    const linkRef=useRef(null)
  

     const handleCloseSideBar=()=>{
        setIsOpen(!isOpen)
     }
    
  return(
        <>
        <div className="w-[100%]  h-[59.49px]  flex items-center max-[370px]:max-w-full bg-[#120F13]     justify-between ">
        <span className=" absolute left-[32.99px] max-[370px]:left-5 text-[18px] text-[#E0E0E0]">Channels</span>
        <AddIcon onClick={handleModal} className="text-white absolute cursor-pointer right-10 h-[32px]   w-full bg-[#252329] "/>
        {width <= '370' ?
        <button onClick={handleCloseSideBar}  className={`${width <= '370' ? 'absolute':'hidden'}   flex w-[38px]    items-center  justify-center right-0 `}>
         <FontAwesomeIcon icon={faClose} color='white'  fontSize={25}/>
         </button>:null}
        </div>
        <SearchBar linkRef={linkRef} searchChannel={searchChannel} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> 
        <ChannelItem  linkRef={linkRef} setRooms={setRooms} setSearchTerm={setSearchTerm} searchTerm={searchTerm} room={room} handleChangeChannel={handleChangeChannel}/>
        </>
    
    )
}


export default Channels;