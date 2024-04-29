import React, {useEffect, useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from 'react-perfect-scrollbar';
import TextAreaWithRef from "../TextAreaWithRef/TextArea.component";
import {useSelector,useDispatch} from 'react-redux'
import { createMessage } from "../../reduxstore/features/Messages/MessagesSlice";
import useUserAuth from "../../Context/userContext";


const InputBar=({showEmojiPicker,setShowEmojiPicker,text,setText})=>{
   
    
    const buttonWrapper=useRef(null);
    const {selectedRoom}=useSelector((state)=>state.rooms);
    const {user}=useUserAuth()
    const roomId=selectedRoom.id;
    const dispatch=useDispatch();
    const [textAreaRef]=useState(null);

  useEffect(()=>{
    if(textAreaRef){
      new PerfectScrollbar(textAreaRef);
    }
  },[textAreaRef]);

  

  

  const handleCreateMessage=(e)=>{
    e.preventDefault();
    const data={message:text,userId:user.uid,timestamp:Date.now()}
  
    if(data.message !== ''){
     dispatch(createMessage({roomId,messageData:data}))
     setShowEmojiPicker(false);
    }
     setText('');
     
  }

  const handleChange = (event) => {
     setText(event.target.value);
     buttonWrapper.current.disabled=event.target.value === '';
     
  }



  

 


    return (
    <form className=" flex flex-col flex-1 rounded-md  w-full h-full  pt-2  bg-[#3C393F]  ">
       <div className="flex md:flex-col h-full  flex-1  items-stretch">
        <div className="flex w-full flex-grow items-center h-full ">
        <div  style={{overflowY:'scroll',overflow:'visible'}}  className={'dark:text-white   scroll-m-3  h-full relative  pl-3  dark:bg-gray-700  w-full py-4 flex-grow-2 md:py-4 md:pl-4    border-black/10shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] rounded-md  bg-[#3C393F]'}>
            <TextAreaWithRef 
            minRows={1} 
            maxRows={10} 
            onChange={handleChange}  
            value={text} 
            className={'m-0 placeholder-text-left placeholder-items-center  placeholder:font-[Poppins] scrollbar-thin  max-h-[150px] flex justify-center items-center h-full  bg-[#3C393F]  text-white   resize-none pl-8 pr-12 lg:pr-12  lg:pl-9  focus:ring-0 scroll-m-8 scrollbar-track-[black]  scrollbar-thumb-[red]   focus-visible:ring-0 dark:bg-transparent     w-full outline-none '} 
            placeholder="Type a message here....."></TextAreaWithRef>
            <button type='button'  onClick={()=>setShowEmojiPicker(!showEmojiPicker)} className="absolute   top-50 bottom-0 flex flex-col justify-center items-center   left-0  -translate-y-1/2 p-1.5 bg-transparent   " >
              <FontAwesomeIcon  icon={faSmile} color="white" width={34} height={34} fill="none"/>
            </button>
           
            <button ref={buttonWrapper}  disabled={!text} type='submit' onClick={handleCreateMessage} className=" border max-w-full border-black disabled:opacity-10 disabled:bg-gray-300  absolute  md:bottom-3 bottom-1.5  right-3 p-0.5  rounded-lg  bg-[#2F80ED]">
            <FontAwesomeIcon icon={faPaperPlane } width={24} height={24} color="white" fill="none" />
            </button>
            </div>
        </div>
        </div>
        
    </form>
          )
};

export default InputBar;