import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useUserAuth from "../../Context/userContext";
import { createRoom} from "../../reduxstore/features/Channels/channelSlice";



const ModalCreate=({modal,handleClickOutsideText,textRef,setModal})=>{
    const [value,setValue]=useState({channelName:'',description:''})
    const dispatch=useDispatch();
    const {user}=useUserAuth();
    const handleChange=(e)=>{
        setValue({...value,[e.target.name]:e.target.value})
        console.log(value)
    }

    const handleCreate=async(e)=>{
        e.preventDefault();
        if (user != null){
          const data={
            name:value.channelName,
            description:value.description,
            members:[user.uid],
            id:value.channelName
          }
          dispatch(createRoom(data));
          
          await setDoc(doc(firestore,'Rooms',data.name),data,);
          setModal(false);
          setValue({ channelName: '', description: '' });
        }
      }
    return (
 <>
   {modal && <div onClick={handleClickOutsideText}  className="fixed top-0 left-0 right-0 bottom-0  opacity-50  z-[112]    w-screen h-screen  bg-[#120F13]"></div>}
   <div ref={textRef} className={`fixed ${modal ? 'block' :'hidden'}  z-[555] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `} >
   <div className="flex flex-col   md:h-[359.38px] md:w-[500px]  w-[350px]  bg-[#120F13] rounded-lg  ">
    <div className="flex flex-col p-6   rounded-lg">
    <h1 color='white'>NEW CHANNEL</h1>
    <Form className="mb-4 mt-4">
     <div className="bg-[#3C393F]  w-[450px] relative h-[40px] border-none">
     <input name="channelName" type="text" placeholder="Channel Name" value={value.channelName} onChange={handleChange} className="absolute h-[100%] bg-[#3C393F] pl-5 focus:outline-none text-[white] w-[100%] border-none"/>
     </div>
     <div className="mt-5  w-[450px] relative h-[115.55px] border-none">
    <textarea type="text" name="description" placeholder="Description" value={value.description} onChange={handleChange} className="absolute focus:outline-none bg-[#3C393F] text-[white]   h-[100%] resize-none  pl-5 pt-4 text-[black] w-[100%] border-none" />
     </div>
     <div className="absolute right-[25px] flex flex-col justify-center rounded-lg items-center border mt-5 p-5 w-[99.09px] h-[39.34px] bg-[#2F80ED]">
     <button onClick={handleCreate}>Save</button>
     </div>
    </Form>
    </div>
    </div>
   </div>
   </>
   )
}

export default ModalCreate;