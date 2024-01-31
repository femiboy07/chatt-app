import React,{useState,useEffect,useRef} from "react";







 const useScrollDate=(heading)=>{

     const [currentHeading,setCurrentHeading]=useState(Object.keys(heading)[0]);
     const headerRef = useRef(null);


     useEffect(()=>{
          const handleScroll = () => {
         const headerElement=headerRef.current;

         if(headerElement){
          const rect = headerElement.getBoundingClientRect();
          const dateKeys = Object.keys(heading);
         const currentDateIndex= dateKeys.find((date)=>date !== currentHeading && rect.bottom <= 0);
          
    
          if (currentDateIndex !== -1) {
            setCurrentHeading(dateKeys[currentDateIndex]);
          }
         }
     }
         window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
     },[currentHeading,heading])
 return [currentHeading,headerRef]
}


export default useScrollDate;