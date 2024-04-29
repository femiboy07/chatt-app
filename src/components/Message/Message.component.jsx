import React  from "react";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';
import { AccountCircleOutlined, AccountCircleRounded } from "@mui/icons-material";


const Message=({message,user,prevMessageDate})=>{
  
          if(!message){
            return null;
           }

        console.log(prevMessageDate)
        function formatDate(date) {
                const today = new Date();
                const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                const aMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                const aWeekAgo=new Date(today.getTime()- 7 * 24 * 60 * 60 * 1000)
                const diff = today.getTime() - date.getTime();
              
                if (diff < 24 * 60 * 60 * 1000 && today.getDate() === date.getDate()) {
                  return `today at ${date.toLocaleTimeString()}`;
                } else if (diff < 2 * 24 * 60 * 60 * 1000 && yesterday.getDate() === date.getDate()) {
                  return `yesterday at ${date.toLocaleTimeString()}`;
                } else if (diff < 30 * 24 * 60 * 60 * 1000 && aMonthAgo.getMonth() === date.getMonth()) {
                  return `a month ago at ${date.toLocaleTimeString()}`;
                } else if(diff < 7 *24 * 60 * 60 * 1000 && aWeekAgo.getMonth() === date.getMonth() ) {
                   return `a week ago at ${date.toLocaleTimeString()}`
                }else{
                   return date.toLocaleDateString(); 
                }
              }
                   
              const date=new Date(message.timestamp)
              const formattedDate = formatDate(date);
         
        return(
       
        <div className=" mb-[15px]  pr-5  flex w-full "> 
           <div className="flex flex-1   pt-5 pb-5 h-full   w-full">
            {user?.ImageUrl === null ? <AccountCircleRounded className="mr-4  ml-1 flex-shrink-0 lg:ml-0 " color="white" sx={{width:50,height:50}} fontSize="large"/>:
           <img src={user?.FirstName === 'chatBot' ? '../../../public/room icon.png':user?.ImageUrl } alt='person' className="mr-4 ml-2 flex-shrink-0  lg:ml-[0] shadow-gray-900 shadow-inner   w-[50px] object-cover   h-[50px] rounded-md"/>}
          <div className="flex flex-col flex-shrink flex-wrap  w-full    align-baseline ">
           <div className="flex  w-full">
            {user?.FirstName === 'chatBot' ?
           <span className="text-sm text-[#828282] text-[18px] font-[Noto-Sans] ">chatbot</span>:
           <span className="text-sm text-[#828282] font-bold  text-[18px] font-[Poppins] ">{user?.FirstName}</span>}
            <span className="text-[12px] text-[#828282] self-start ml-4  font-[Noto-Sans] ">{formattedDate}</span>
          </div>
            <p className="leading-[1.4em] text-[18px] font-[Poppins] lg-w-[500px]   text-[#E0E0E0]  font-[500] break-all  tracking-[-0.0435em] mt-2 text-left ">{message.message}</p>
            </div>
           </div> 
         </div>
         
        )
    
}

export default Message;