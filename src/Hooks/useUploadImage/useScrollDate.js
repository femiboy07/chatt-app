import {useState,useEffect,useRef, useLayoutEffect} from "react";







 const useScrollDate=(heading)=>{
    const [currentHeading,setCurrentHeading]=useState(Object.keys(heading)[0]);
     const headerRef = useRef(null);
    

     useEffect(()=>{
      const handleScroll = () => {
        const headerElement = headerRef?.current;
  
        if (headerElement) {
          const rect = headerElement.getBoundingClientRect();
          const dateKeys = Object.keys(heading);
          const currentDateIndex = dateKeys.indexOf(currentHeading);
  
          if (currentDateIndex !== -1 && rect.bottom <= 0) {
            setCurrentHeading(dateKeys[currentDateIndex + 1]);
          }
        }
      };
  
         window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
     },[currentHeading,heading])
   return [currentHeading,headerRef]
}


export default useScrollDate;