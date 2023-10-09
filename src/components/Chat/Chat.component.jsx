import React,{useEffect,useState,useRef} from "react";
import Message from "../Message/Message.component";
import { useSelector,useDispatch} from "react-redux";
import { CircularProgress } from "@mui/material";
import { collection,doc,query,onSnapshot,orderBy } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { fetchRooms } from "../../reduxstore/features/Channels/channelSlice";
import { fetchRoomProfiles } from "../../reduxstore/features/Channels/channelSlice";


const Chat=()=>{
  const dispatch=useDispatch();
  const [messages, setMessages] = useState([]);
  const {profiles,loading}=useSelector((state)=>state.rooms)
  const unsubscribeRef=useRef(null)
  console.log(messages);
  
  
  const {selectedRoom}=useSelector(state=>state.rooms);
  const roomId=selectedRoom?.id;
  console.log(roomId,'roomId')
  
  useEffect(() => {
    if(roomId){
    dispatch(fetchRooms());
    dispatch(fetchRoomProfiles(roomId));
    setMessages([])
    }
  }, [roomId,dispatch]);
    useEffect(() => {
    

    const messageRef = collection(firestore, `Rooms/${roomId}/Messages`);
    console.log(messageRef.path,'messageRef')
    const messageQuery = query(messageRef, orderBy('timestamp', 'asc'));
    
  
    unsubscribeRef.current && unsubscribeRef.current(); // cleanup previous listener
  
    unsubscribeRef.current = onSnapshot(
      messageQuery,
      {includeMetadataChanges:true},
      (snapshot) => {
        const newMessages = [];
  
        snapshot.docChanges().forEach((change) => {
          const messageData = change.doc.data();
          console.log(messageData)
  
          if (change.type === 'added' || change.type === 'modified') {
            if (messageData && messageData.timestamp && messageData.timestamp.toDate) {
              newMessages.push({
                id: change.doc.id,
                ...messageData,
                timestamp: messageData.timestamp?.toDate()?.getTime() || null,
              });
            } else {
              newMessages.push({
                id: change.doc.id,
                ...messageData,
              });
            }
          }
        });
  
        // Merge new messages with existing messages
       
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    );
  
    return () => {
      unsubscribeRef.current && unsubscribeRef.current(); // cleanup listener on unmount
    };
  }, [roomId]);

 
  if(loading){

    return <div className="flex justify-center items-center [500px] h-full">
    <CircularProgress/>
    </div>
}


  
    return(
        <div className="mb-[95px] mt-[25px] lg:w-full pr-[55px] h-screen ">
        {messages && messages.map((message,index)=>{
        const user = profiles.find(profile => profile.id === message.userId);
        return(
        <Message 
        user={user}
        key={`${message.id}-${index}`}
        message={message}
        />
    )}) }
        </div>
    )
}

export default Chat;