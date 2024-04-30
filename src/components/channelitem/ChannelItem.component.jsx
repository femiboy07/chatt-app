import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate, useParams,useLocation} from "react-router-dom";
import { fetchRooms, setSelectedRoom } from '../../reduxstore/features/Channels/channelSlice';
import { fetchRoomsRealTime } from '../apiContext/fetchRooms';
import useUserAuth from '../../Context/userContext';
import { auth } from '../../firebase/firebase';


const ChannelItem=({handleChangeChannel,setRooms,room,searchTerm,linkRef})=>{
    
    const {rooms,selectedRoom,loading}=useSelector((state)=>state.rooms);
    const roomId=selectedRoom?.id;
  
    const [isInitialMount, setIsInitialMount] = useState(true);
    const {user}=useUserAuth()
    const dispatch=useDispatch();
    

     

    useEffect(()=>{
       if(roomId || user.uid){
        dispatch(fetchRooms(searchTerm));
        
       }
      const unsubscribe=fetchRoomsRealTime(dispatch);

      return  ()=>{
        unsubscribe()
      }
     },[dispatch,searchTerm,user,roomId])





    
    if (rooms.length === 0 || !rooms) {
        return(
         <div className='text-white absolute  right-[25.6px] flex flex-col gap-5 left-[32.99px] top-[168.14px]'>
            <div className='flex justify-center'>
            No result found...
        </div>
        </div>
        );
    }


    
    const abbreviation=(str)=>{
        let words=str.split(' ').splice(0,2);
        let abbreviated=words.map(word=>word[0]).join('');
        return abbreviated;
      }
    return (
        
        <div className={`absolute ${loading ?'animate-pulse bg-transparent ':''}  max-[370px]:left-3 flex-wrap  right-[25.6px] flex flex-col justify-center items-center gap-5 pb-20  left-[32.99px] top-[168.14px]`}>
          {rooms.length > 0  && rooms.map((room)=>{
            console.log(room,'room')
            return(
           <div className={`flex ${loading ? 'animate-pulse bg-[black] opacity-5 ':''} flex-wrap max-[370px]:w-full max-[370px]:max-w-full w-[265.42px] justify-between  min-h-[42px]`} key={`room-${room.id}-${new Date().getTime()}`}>
           <div className={`w-[42px] ${loading ? 'animate-pulse ':''} flex items-center justify-center  h-[42px] text-[#FFFFFF] bg-[#252329] rounded-lg absolute `}>
            <span >{loading ? '' : abbreviation(room.name.toUpperCase())}</span>
          </div>
          <Link  ref={linkRef} onClick={()=>{ handleChangeChannel(room);console.log(room,'click')}}  to={`/channel/${room.id.replace(/\s+/g, '')}`}  className={`h-full ml-12 cursor-pointer text-[#BDBDBD] ${loading ? 'animate-pulse bg-[#252329]': ''}  break-all font-[Poppins] self-center text-[18px] leading-[25px] tracking-[-0.035em]  w-fit`}>{loading ? '' :room.name.toUpperCase()}</Link>
         </div>
            )
         })}
         </div>
    )
}

export default ChannelItem;