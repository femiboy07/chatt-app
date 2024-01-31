import React,{useEffect,useState,useRef, useCallback} from "react";
import Message from "../Message/Message.component";
import { useSelector,useDispatch} from "react-redux";
import { CircularProgress } from "@mui/material";
import { collection,doc,query,onSnapshot,orderBy } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { fetchRooms, setProfiles, updateProfile } from "../../reduxstore/features/Channels/channelSlice";
import { fetchRoomProfiles } from "../../reduxstore/features/Channels/channelSlice";
import fetchRoom from "../apiContext/fetchRoom.component";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import { fetchRoomsRealTime } from "../apiContext/fetchRooms";
import useScrollDate from "../../Hooks/useUploadImage/useScrollDate";
import { debounce } from "lodash";


const Chat=({searchTerm})=>{
  const dispatch=useDispatch();
  const [messages, setMessages] = useState([]);
  const {profiles,loading,selectedRoom}=useSelector((state)=>state.rooms)
  const unsubscribeRef=useRef(null);
   const roomId=selectedRoom?.id;

  const [prevMessageDate,setPrevMessageDate]=useState(null);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false);


  
  
  const getMessageHeading = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
   
  
    if (isSameDay(messageDate, today)) {
      // If the message is from today, return a formatted date
      return messageDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
     } else if (isSameWeek(messageDate, today)) {
      return messageDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });;
    } else if (isSameMonth(messageDate, today)) {
      return  messageDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }); ;
    } else {
      // For other dates, return a custom heading
      return messageDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'long' });
    }
  

    
  };

  
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  // Function to check if a date is in the same week as another date
  const isSameWeek = (date1, date2) => {
    const daysInWeek = 7;
    const diffInDays = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
    return diffInDays <= daysInWeek && date1.getDay() === date2.getDay();
  };
  
  // Function to check if two dates are inz the same month
  const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };
  
  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
  
    messages.forEach((message) => {
      const timestamp = message.timestamp;
      const heading = getMessageHeading(timestamp);
  
      if (!groupedMessages[heading]) {
        groupedMessages[heading] = [];
      }
  
      groupedMessages[heading].push(message);
    });
  
    return groupedMessages;
  };
  
    const fetchData =  useCallback(async() => {
      
      const {unsubscribe,membersListener} = await fetchRoom(roomId,dispatch);

      // Cleanup function
      return () => {
        // Make sure to invoke the unsubscribe function
        unsubscribe();
        membersListener() // Unsubscribe when the component unmounts
      };
    
    },[roomId,dispatch]);
  




  useEffect(() => {
    
      if(roomId){
       
        dispatch(fetchRooms());
        fetchData()
        setMessages([])
      }
      const unsubscribe=fetchRoomsRealTime(dispatch);

      return  ()=>{
        unsubscribe()
      }
     
    }, [roomId,dispatch,fetchData]);


  
    
  
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
  
        
         
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    );
    
    return () => {
      unsubscribeRef.current && unsubscribeRef.current(); // cleanup listener on unmount
    };
  }, [roomId]);

  

  const meet = groupMessagesByDate(messages);

  const headerRefs = useRef([]);



  // Function to handle scrolling and update sticky headers
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      const headerPositions = headerRefs?.current.map((ref) => ref.getBoundingClientRect().top);

      const currentScrollPosition = window.scrollY;
      console.log(currentScrollPosition)

      let isTransparent = true;

      for (let i = 0; i < headerPositions.length - 1; i++) {
        if (currentScrollPosition >= headerPositions[i] && currentScrollPosition < headerPositions[i + 1]) {
          isTransparent = false;
          break;
        }
      }

      setIsHeaderTransparent(isTransparent);
    },200);

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Detach event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(meet,"meet")
  
console.log(isHeaderTransparent)

    return(
        <>
      {Object.entries(meet).length > 0 && (
        <div  className="flex flex-col justify-center items-center lg:pr-[55px] w-full mt-[55px] mb-[78px]">
          {Object.entries(meet).map(([heading, messages], index) => {
            
            const headerRef = React.createRef();
            headerRefs.current[index] = headerRef;
            
            return (
              <span key={index}  className=" h-auto  sticky  w-full" >
                <div ref={headerRef}  className={`text-[#828282] sticky w-full  flex 
                  border-[#828282] ${isHeaderTransparent ? 'bg-transparent sticky opacity-0':' sticky'}    justify-center top-10 pt-9    mb-2  font-[Noto-Sans]`}>
                  
                  <span  className={'flex  justify-center items-center  rounded-md h-full pl-5 text-[14px] bg-[#120F13] pr-5'}>{heading}</span>
                 
                </div>
                {messages.map((message, index) => {
                  const user = profiles.find((profile) => profile.id === message.userId);
                  return (
                    <Message
                      user={user}
                      key={`${message.id}-${index}`}
                      message={message}
                      prevMessageDate={prevMessageDate}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>
         )}
        </>
    )
}

export default Chat;