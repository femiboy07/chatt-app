import React, { useState,useRef } from "react";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useUserAuth from "../../Context/userContext";
import { createRoom} from "../../reduxstore/features/Channels/channelSlice";
import { CircularProgress } from "@mui/material";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import {toast} from 'react-toastify';



const ModalCreate=({modal,handleClickOutsideText,textRef,setModal})=>{
    const [value,setValue]=useState({channelName:'',description:''})
    const [isloading ,setIsLoading]=useState(false);
    const [iserror,setError]=useState(false);
    const isOnline=useOnlineStatus()
    const dispatch=useDispatch();
    const {user}=useUserAuth();
    const channelRef=useRef(null)
    const descRef=useRef(null);
    const handleChange=(e)=>{
        e.target.value.trim().replace(/%20/g, '')
        setValue({...value,[e.target.name]:e.target.value})
        setError(false)

    }

    const handleCreate=async(e)=>{
        e.preventDefault();
       

      if(!channelRef.current.checkValidity() || !descRef.current.checkValidity()){
        setError(true);
        e.preventDefault();
        return;
      }

      if(!isOnline){
        
          toast.dark(
           <div>
           You can create room when offline
           <div className="mt-3">
           <button onClick={() => toast.dismiss()} className="pl-8 pr-8 bg-white ml-2 text-black rounded-md" >Cancel</button>
           </div>
           </div>,
           {
           onClose: (reason) => {
             if (reason === 'manual') {
               // Toast was closed by clicking Yes or No button
               toast.dismiss();
             }
           },
           autoClose: 1000,
         }
         )
    
      }
        
        if (user !== null && isOnline){
          const data={
            name:value.channelName.trim(),
            description:value.description,
            members:[user.uid],
            id:value.channelName
          }
          setError(false)
          dispatch(createRoom(data));
          setIsLoading(true);
          
          await setDoc(doc(firestore,'Rooms',data.name),data);
          setIsLoading(false);
          setModal(false);
          setValue({ channelName: '', description: '' });
        }
      }
    return (
 <>
   {modal && <div onClick={handleClickOutsideText}  className="fixed top-0 left-0 right-0 bottom-0  opacity-50  z-[112]    w-full h-full  bg-[#120F13]"></div>}
   <div ref={textRef} className={`fixed ${modal ? 'flex' :'hidden'}   z-[254] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `} >
  
   <div className="  h-fit    pb-8  flex flex-col justify-center  bg-[#120F13] w-screen max-w-[450px] rounded-lg  ">
    <div className=" p-6 flex flex-col  rounded-lg">
    <h1 color='white' className="">NEW CHANNEL</h1>
    <Form className="mb-4 mt-4 " noValidate>
     <div className="bg-[#3C393F] rounded-lg  w-full relative h-[40px] ">
     <input name="channelName"  ref={channelRef} type="text" placeholder="Channel Name" required value={value.channelName} onChange={handleChange} className="absolute placeholder:font-[Poppins]  h-[100%] bg-[#3C393F]  appearance-none pl-5 focus:outline-none rounded-lg text-[white] w-[100%] border-none"/>
     </div>
     {iserror ? <span className=" w-full text-red-400 text-sm">Channel Name & Description needed</span>:null}
     <div className="mt-5  w-full relative rounded-xl h-[115.55px] border-none">
    <textarea type="text" ref={descRef} name="description" placeholder="Description" required value={value.description} onChange={handleChange} className="absolute placeholder:font-[Poppins] focus:outline-none bg-[#3C393F] text-white break-words break-all   h-[100%] resize-none rounded-lg  pl-5 pr-3 pt-4  w-[100%] border-none" />
     </div>
     <div className=" absolute right-5 justify-center   border mt-5 p-2 pl-5 pr-5   bg-[#120F13]">
     <button className="text-center w-full" onClick={handleCreate}>{isloading ? <CircularProgress size={15} color="inherit"/>:'save'}</button>
     </div>
    </Form>
    </div>
    </div>
   </div>
   </>
   )
}

export default ModalCreate;