import React  from "react";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';


const Message=({message,user})=>{
  
          if(!message){
            return null;
           }

       
        function formatDate(date) {
                const today = new Date();
                const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
                const aMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                const aWeekAgo=new Date(today.getTime()- 7 * 24 * 60 * 60 * 1000)
                const diff = today.getTime() - date.getTime();
              
                if (diff < 24 * 60 * 60 * 1000 && today.getDate() === date.getDate()) {
                  return `Today at ${date.toLocaleTimeString()}`;
                } else if (diff < 2 * 24 * 60 * 60 * 1000 && yesterday.getDate() === date.getDate()) {
                  return `Yesterday at ${date.toLocaleTimeString()}`;
                } else if (diff < 30 * 24 * 60 * 60 * 1000 && aMonthAgo.getMonth() === date.getMonth()) {
                  return `A month ago at ${date.toLocaleTimeString()}`;
                } else if(diff < 7 *24 * 60 * 60 * 1000 && aWeekAgo.getMonth() === date.getMonth() ) {
                   return `a week ago at ${date.toLocaleTimeString()}`
                }else{
                   return date.toLocaleDateString(); 
                }
              } 
              
              const date=new Date(message.timestamp)
            
         
        return(
    
        <div className="lg:ml-14 ml-0 mt-9 lg:w-1 flex  flex-wrap" >   
           <div className="flex">
           <img  alt='person' className="mr-5 ml-[28px] lg:ml-0 w-[42px] h-[42px] rounded-lg"/>
            <div className="flex flex-col w-fit align-baseline ">
            <div className="flex items-baseline ">
              {user?.FirstName === undefined ?
           <span className="text-sm text-[#828282] text-[18px] font-[Noto-Sans] ">chatbot</span>:
           <span className="text-sm text-[#828282] text-[18px] font-[Noto-Sans] ">{user?.FirstName}</span>  }
            <span className="text-[14px] text-[#828282] self-start ml-4 leading-[19px] font-[Noto-Sans] ">{formatDate(date)}</span>
            </div>
            <span className="leading-[25px] text-[18px]  text-[#E0E0E0] w-fit font-[500] font-[Noto-Sans] tracking-[-0.035em] mt-2 text-left ">{message.message}</span>
            </div>
           
            </div> 
        </div>
        )
    
}

export default Message;