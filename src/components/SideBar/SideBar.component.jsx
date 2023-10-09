import React, {  useState } from "react";
import Channels from "../Channels/Channels.component";
import { Routes,Route } from "react-router";
import Channel from "../Channel/Channel.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import LoginBar from "../LoginBar/LoginBar.component";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';
import { Link } from "react-router-dom";
import { setSelectedRoom } from "../../reduxstore/features/Channels/channelSlice";
import { useDispatch } from "react-redux";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";
import useUserAuth from "../../Context/userContext";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { updateDoc,doc, arrayUnion } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import './sidebar.component.css'




const SideBar=({isOpen,setIsOpen,bar,setBar,handleClick,sideRef,handleClickOutsideBar,handleShow,handleModal})=>{
   const [changeSide,setChangeSide]=useState(false);
   const user=useUserAuth();
   const dispatch=useDispatch();
   const [width]=useInnerWidthState();
   console.log(width)
   console.log(auth.currentUser.uid);
  //  const match=useMatch();
   const handleChangeSide=()=>{
        setChangeSide(!changeSide);
   } 

   const handleChangeChannel=async(room)=>{
    console.log('...joining room')
    
    const memberIds=room.members;
    const currentUser=auth.currentUser.uid;
    console.log(memberIds.includes(currentUser))
    if(memberIds.includes(currentUser)){
      setChangeSide(false);
      dispatch(setSelectedRoom(room));
    }else{
      toast.dark(
        <>
          Do you want to join the <strong>{room.name}</strong> room?
          <div>
            <button onClick={() => handleJoinRoomConfirm(room)} style={{paddingLeft:'5px',paddingRight:'5px'}}>Yes</button>
            <button onClick={() => toast.dismiss()}>No</button>
          </div>
        </>,
        {
          onClose: (reason) => {
            if (reason === 'manual') {
              // Toast was closed by clicking Yes or No button
              toast.dismiss();
            }
          },
          autoClose: false,
        }
      );
    }

    }

    const handleJoinRoomConfirm = async (room) => {
      try{
      const currentUser = auth.currentUser.uid;
      const roomsRef=doc(firestore,'Rooms',room.id)
      await updateDoc(roomsRef, {
         members: arrayUnion(currentUser)
      });
      setChangeSide(false);
      dispatch(setSelectedRoom(room));
      toast.dismiss();
      }catch(err){
        console.log(err)
      }
    };

   
return (    
        // <div className={`relative `}> 
           <aside className={ ` fixed   ${isOpen === true ? `block` : `hidden`} overflow-auto lg:block col-start-1 col-end-2 row-start-1 row-end-3  left-0 top-0 box-border h-screen  max-[370px]:h-screen bg-opacity-90   max-[370px]:w-fit  md:bg-opacity-[0.98]  z-[90]  w-[324px]   max-h-[full] bg-[#120F13]   `}>
          <Routes>
            <Route path={'/'} element={<Channels/>}/>
            <Route  path={`/channel/:id`} element={
            <Channel
             bar={bar} 
             handleClickOutsideBar={handleClickOutsideBar} 
             sideRef={sideRef} 
             setBar={setBar}
             handleClick={handleClick}
             />}/>
             <Route  path={`/allChannel`} element={<Channels handleModal={handleModal} handleChangeChannel={handleChangeChannel}/>}/>

            </Routes>
             {bar === true ? (
            <LoginBar 
             sideRef={sideRef} 
             handleShow={handleShow}
             bar={bar} 
             handleClickOutsideBar={handleClickOutsideBar} 
            /> 
            ):null} 
          {bar && <div onClick={handleClickOutsideBar}  className="w-[324px]  fixed left-0 top-0  z-50 bg-transparent"></div>}
               <div className="bg-black flex justify-between fixed p-4 w-[324px] max-[370px]:w-full  bottom-0 mt-5 left-0 rounded-bl-lg">
                <div className="  left-[27.76px]">
                  <img src={myDog} className='w-[45px] h-[42px] rounded-lg'  alt='profile'/>
                </div>
                <div className="text-[18px] w-[159px] h-[24.16px] self-center absolute left-[97.9px]">
                    <span className="text-[#828282] text-[18px] ">okon feranmi</span>
                </div>
                <Link className="text-black self-center"  onClick={handleClick} ref={sideRef}>
                  <FontAwesomeIcon icon={faArrowDown} color='white'/>
                </Link>
                </div> 
             </aside> 
      // </div>

    )
}

export default SideBar;