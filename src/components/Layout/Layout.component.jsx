import React,{useRef, useState,useEffect} from 'react';
import AppBar from '../AppBar/AppBar.component';
import Chat from '../Chat/Chat.component';
import './Layout.css';
import InputBar from '../InputBar/InputBar.component';
import SideBar from '../SideBar/SideBar.component';
import { Routes,Route, useNavigate } from 'react-router';
import LoginPage from '../../Page/LoginPage/LoginPage.page';
import { useDispatch,useSelector, } from 'react-redux';
import { setSelectedRoom } from '../../reduxstore/features/Channels/channelSlice';

import ProfileBar from '../ProfileBar/ProfileBar.component';
import useOnlineStatus from '../../Hooks/useOnlineStatus';
import { ToastContainer, toast } from 'react-toastify';

import ModalCreate from '../ModalCreate/ModalCreate.component';



const Layout=({user})=>{
    const [isOpen,setIsOpen]=useState(false);
    const [bar,setBar]=useState(false);
    const [display,setDisplay]=useState(false);
    const [modal,setModal]=useState(false)

    const handleClick=()=>{
      setBar(!bar);
    }
    const barRef=useRef(null);
    const sideRef=useRef(null);
    const textRef=useRef(null);

    const handleClickOutside=(event)=>{
       if(!barRef.current.contains(event.target)){
          setIsOpen(false);
        
       }
    }

   const handleClickOutsideText=(event)=>{
    if(!textRef.current.contains(event.target)){
        setModal(false);
        console.log(textRef.current);
    }
   }
   
    const handleClickOutsideBar=(event)=>{
        if(!sideRef.current.contains(event.target)){
            setBar(false);
        }
    }

    const handleRemove=()=>{
        setDisplay(!display);
    }
    const handleShow=()=>{
        setDisplay(true)
    }

    const handleModal=()=>setModal(true)
    const hideModal=()=>setModal(false);



    
 return (
    
    <div className='bg-[#252329] w-full lg:w-screen '>
    <AppBar isOpen={isOpen} setIsOpen={()=>setIsOpen(!isOpen)} barRef={barRef} handleClickOutside={handleClickOutside}/>
    
    <SideBar  
      handleShow={handleShow}
      handleModal={handleModal} 
      display={display}
      modal={modal} 
      isOpen={isOpen } 
      setIsOpen={()=>setIsOpen(!isOpen)} 
      sideRef={sideRef} 
      bar={bar} 
      setBar={setBar} 
      handleClickOutsideBar={handleClickOutsideBar} 
      handleClick={handleClick} 
    />
    

    
    <main className="bg-[#252329] text-white flex flex-wrap flex-col ">
    {display  ? (
    <ProfileBar 
    display={display} 
    handleRemove={handleRemove}/>):null}
    {modal ? (
     <ModalCreate
     textRef={textRef}
     modal={modal}
     setModal={setModal}
     hideModal={hideModal}
     handleClickOutsideText={handleClickOutsideText}
     />
    ):null}
     <Chat/> 
    {/* <ToastContainer/> */}
    <div className='fixed bottom-[10px] lg:left-[380px] left-0 lg:right-[78px] right-0'>
    <InputBar/>
    </div> 
    </main>
    </div>
    

 )
}

export default Layout;