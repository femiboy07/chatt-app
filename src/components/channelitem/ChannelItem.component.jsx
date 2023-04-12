import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate} from "react-router-dom";


const ChannelItem=({handleChangeChannel})=>{
    
    const {loading,rooms}=useSelector((state)=>state.rooms);
    

    
    if(loading){
        return <CircularProgress/>
    }

    // if(error){
    //     return <div>Error {error.message}</div>
    // }
    if (!rooms || rooms.length === 0) {
        return <div className='text-white absolute  right-[25.6px] flex flex-col gap-5 left-[32.99px] top-[168.14px]'>
            <div className='flex justify-center'>
            Rooms not yet created
            </div>
          
            </div>;
    }
    const abbreviation=(str)=>{
        let words=str.split(' ');
        let abbreviated=words.map(word=>word[0]).join('');
        return abbreviated;
      }
    return (
        
        <div className="absolute  right-[25.6px] flex flex-col gap-5 pb-20  left-[32.99px] top-[168.14px]">
          {rooms.length> 0 && rooms.map((room)=>{
            console.log(room,'room')
            return(
           <div className="flex w-[265.42px] justify-between h-[42px] " key={`room-${room.id}-${new Date().getTime()}`}>
           <div className="w-[42px] flex items-center justify-center  h-[42px] text-[#FFFFFF] bg-[#252329] rounded-lg absolute ">
            <span >{abbreviation(room.name)}</span>
          </div>
          <Link onClick={()=>handleChangeChannel(room)} to={`/channel/${room.id}`}  className=" h-[25px] ml-12 cursor-pointer text-[#BDBDBD] self-center text-[18px] leading-[25px] tracking-[-0.035em]  w-fit">{room.name}</Link>
         </div>
            )
         })}
         </div>
    )
}

export default ChannelItem;