/* eslint-disable no-unused-vars */
import React,{useCallback, useEffect, useRef, useState} from 'react';
import AppBar from '../AppBar/AppBar.component';
import Chat from '../Chat/Chat.component';
import './Layout.css';
import InputBar from '../InputBar/InputBar.component';
import SideBar from '../SideBar/SideBar.component';
import {  useMatch } from 'react-router';
import { useDispatch,useSelector, } from 'react-redux';
import ProfileBar from '../ProfileBar/ProfileBar.component';
import { fetchRooms } from '../../reduxstore/features/Channels/channelSlice';
import ModalCreate from '../ModalCreate/ModalCreate.component';
import Picker from 'emoji-picker-react';
import HomePage from '../../Page/HomePage/HomePage.page';
import ScrollButtonDown from '../ScrollButtonDown/ScrollButtonDown.component';




const Layout=({user})=>{
    const dispatch=useDispatch();
    const [isOpen,setIsOpen]=useState(false);
    const [isEnd,setEnd]=useState(false);
    const [smIsOpen,smSetIsOpen]=useState(false);
    const [bar,setBar]=useState(false);
    const [display,setDisplay]=useState(false);
    const [modal,setModal]=useState(false)
    const [room,setRooms]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const {selectedRoom}=useSelector((state)=>state.rooms);
    const roomId=selectedRoom.id
    const [showModalProfile,setShowModalProfile]=useState(false);
    const [isScroll,setIsScroll]=useState(false);
    const [height,setHeight]=useState(window.scrollY);
    const match=useMatch('allChannel/homePage')
    const handleClick=()=>setBar(!bar);
    const handleRemove=()=>setDisplay(!display);
    const handleShow=()=>setDisplay(true);
    const handleModal=()=>setModal(true)
    const hideModal=()=>setModal(false);
    const handleShowModalProfile=()=>setShowModalProfile(true);
    const barRef=useRef(null);
    const smBarRef=useRef(null)
    const sideRef=useRef(null);
    const textRef=useRef(null);
    const emojiRef=useRef(null);
    const [text,setText]=useState('');
    const scrollRef=useRef(null);
    const handleClickOutside=(event)=>{
       if(!barRef.current.contains(event.target)){
          setIsOpen(false);
        }
    }
    console.log(scrollRef?.current?.scrollHeight,"offsetHeight")
    const handleClickOutsideText=(event)=>{
    if(!textRef.current.contains(event.target)){
        setModal(false);
        console.log(textRef.current);
       return;
    }
    
    if(!textRef.current.contains(event.target)){
      setShowModalProfile(false);}
    }
    const handleCloseEmoji=(event)=>{
    if(!emojiRef.current.contains(event.target)){
        setShowEmojiPicker(false)
        return;}
    }
    const handleClickOutsideBar=(event)=>{
        if(!sideRef.current.contains(event.target)){
            setBar(false);
        }
    }
  const handleEmojiSelect=(emojiData,e)=>{
    e.preventDefault();
    setText((prevText)=>prevText + emojiData.emoji);
  }

  const searchChannel = (e) => {
        const lowerCaseSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(lowerCaseSearchTerm)
        dispatch(fetchRooms(lowerCaseSearchTerm))
  };

  const handleScroll=()=>{
    const scrollHeight=scrollRef?.current?.scrollHeight;
    const scrollTop=scrollRef?.current?.scrollTop;
    const clientHeight=scrollRef?.current?.clientHeight;
    console.log(scrollHeight,scrollTop,clientHeight)
   
    if(scrollHeight - scrollTop > clientHeight && scrollRef?.current?.style.overScrollY !== 'hidden' ){
      console.log("scrolling")
     setIsScroll(true);
    console.log(scrollRef?.current?.offsetHeight);
    }else {
      setIsScroll(false)
    }

    
}

const handleScrollEnd=()=>{

}

const handleScrollDown=()=>{
  console.log('clicked')
 
  // var scrollTop=scrollRef?.current?.scrollTop;
  if(scrollRef.current){
  scrollRef.current.scrollTop=scrollRef?.current?.scrollHeight;
  }
}



  






    
 return (
    
<div className='bg-[#252329] relative flex h-full w-full overflow-hidden '>
    {!match && <AppBar isOpen={isOpen} setIsOpen={()=>setIsOpen(!isOpen)} barRef={barRef} handleClickOutside={handleClickOutside}/>}
    <AppBar isOpen={isOpen} setIsOpen={()=>setIsOpen(!isOpen)} barRef={barRef} handleClickOutside={handleClickOutside}/>
    <SideBar  
      handleShow={handleShow}
      handleModal={handleModal} 
      display={display}
      modal={modal} 
      isOpen={isOpen } 
      setIsOpen={()=>setIsOpen(!isOpen)} 
      sideRef={sideRef} 
      handleShowModalProfile={handleShowModalProfile}
      room={room}
      searchTerm={searchTerm}
      setRooms={setRooms}
      bar={bar} 
      barRef={barRef}
      smBarRef={smBarRef}
      smSetIsOpen={smSetIsOpen}
      smIsOpen={smIsOpen}
      setText={setText}
      setBar={setBar} 
      searchChannel={searchChannel}
      setSearchTerm={setSearchTerm}
      handleClickOutsideBar={handleClickOutsideBar} 
      handleClick={handleClick}
      handleScrollDown={handleScrollDown} 
      scrollRef={scrollRef}
    /> 
   <main  ref={scrollRef} onScroll={handleScroll}   className={`bg-[#252329] relative flex flex-col ${match ? 'lg:ml-0' :'lg:ml-[387px]'}  w-full scrollbar-thin lg:overflow-y-hidden lg:hover:overflow-y-auto   h-full  lg:gap-x-96  overflow-x-auto       text-white  `}>
    <>
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
    
   
    
    {match ? <HomePage/> :
    <>
    <Chat searchTerm={searchTerm} handleScrollDown={handleScrollDown} isEnd={isEnd} isScroll={isScroll} scrollRef={scrollRef}/> 
    {showEmojiPicker && <div onClick={handleCloseEmoji}  className="fixed top-0 left-0 right-0 bottom-0  opacity-50  z-[9000000000000000000000]    w-screen h-screen  bg-[#252329]"></div>}
    {showEmojiPicker &&
        <div  ref={emojiRef} className={'max-w-full lg:left-24   animate-slideUp fixed  left-0  bottom-24 z-[500000000000000]'}>
       <Picker className={'max-w-full md:w-[500px]'}   style={{height:'350px',width:'500px',zIndex:5000}} theme="dark" onEmojiClick={handleEmojiSelect}/>
    </div>} 
    <div className='fixed lg:bottom-5 bottom-0 lg:right-[78px]  right-0 w  left-0 lg:left-[368px]      z-[50] '>
     {selectedRoom.id === 'welcome' ? <h1 className='w-full flex justify-center'>Only chatbot can send message</h1>:<InputBar showEmojiPicker={showEmojiPicker} text={text} setText={setText} setShowEmojiPicker={setShowEmojiPicker}/>}
    </div>
    </> 
}
    </>
    {isScroll ? <ScrollButtonDown handleScrollDown={handleScrollDown}/>:null}
    </main>
</div>)
}

export default Layout;