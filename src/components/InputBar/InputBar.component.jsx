import React, {useEffect, useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import PerfectScrollbar from 'react-perfect-scrollbar';
import TextAreaWithRef from "../TextAreaWithRef/TextArea.component";
import {useSelector,useDispatch} from 'react-redux'
import { createMessage } from "../../reduxstore/features/Messages/MessagesSlice";
import useUserAuth from "../../Context/userContext";

const InputBar=()=>{
    const [text,setText]=useState('');
    const currentTextArea=useRef(null);
    const wrapperRef=useRef(null);
    const buttonWrapper=useRef(null);
    const {selectedRoom}=useSelector((state)=>state.rooms);
    const {user}=useUserAuth()
    const roomId=selectedRoom.id;
    const dispatch=useDispatch();
    
 
    
   
   

  const [divHeight, setDivHeight] = useState('52px');
  const [textAreaRef,setTextAreaRef]=useState(null);

  useEffect(()=>{
    if(textAreaRef){
      new PerfectScrollbar(textAreaRef);
    }
  },[textAreaRef]);

  
  
  

  const handleCreateMessage=(e)=>{
    e.preventDefault();
    const data={message:text,userId:user.uid,timestamp:Date.now()}
    console.log(data,'data')
     dispatch(createMessage({roomId,messageData:data}))
     setText('');
     
  }

  const handleChange = (event) => {
    setText(event.target.value);
    setDivHeight(`${event.target.scrollHeight}px`);
    if (event.target.scrollHeight > 200) {
      setDivHeight('200px');
    } else {
      setDivHeight('auto');
     
    }
  };

const style={
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
}


    return (
    <form className=" mx-2 flex flex-col gap-3 pt-6 last:mb-2 mb-6 md:last:mb-6 lg:rounded-lg lg:max-w-3xl lg:pt-6 ">
        <PerfectScrollbar ref={(element)=>setTextAreaRef(element)} style={{height:divHeight,overflowY:'scroll',overflow:'visible'}}  className={`dark:text-white flex flex-col  items-center  dark:bg-gray-700  w-full py-4 flex-grow md:py-4 md:pl-4 relative pl-4  border-black/10shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] rounded-md  bg-[#3C393F]`}>
            <TextAreaWithRef style={{minRows:divHeight}} onChange={handleChange}  
              value={text} className={`m-0  placeholder-text-left placeholder-items-center bg-[#3C393F]   text-white      resize-none   pr-16 p-0  lg:pl-4 lg:pr-16 focus:ring-0  focus-visible:ring-0 dark:bg-transparent   md:pl-0  w-full outline-none `} 
                placeholder="Type a message here"></TextAreaWithRef>
            <button ref={buttonWrapper} type='submit' onClick={handleCreateMessage} className="w-[39.34px] h-[39.34px] absolute bottom-[50%] top-[50%] right-[0] -translate-x-1/2 -translate-y-1/2 rounded-lg  bg-[#2F80ED]">
            <FontAwesomeIcon icon={faPaperPlane } color="white" />
            </button>
            
        </PerfectScrollbar>
    </form>
          )
};

export default InputBar;