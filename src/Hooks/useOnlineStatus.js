import React,{useEffect, useState} from "react";
import { toast } from "react-toastify";
// import { debounce } from "lodash";

const useOnlineStatus = () => {
  const [isOnline, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      // if (!isOnline) {
      //   toast.success("You are now online", {
      //     toastId: 'onLine',
      //   });
      // }
      setOnline(true);
    };

    const handleOffline = () => {
      // if (isOnline) {
      //   toast.error("You are now offline", {
      //     toastId: 'first-offline',
      //   });
      // }
      setOnline(false);
    };

     if(navigator.onLine){
      handleOnline()
     }else{
      handleOffline()
     }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
     
    };
  }, [isOnline]);

  return isOnline;
};

// Debounce utility function
// const debounce = (func, delay) => {
//   let timeout;
//   return function () {
//     const context = this;
//     const args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(context, args), delay);
//   };
// };


export default useOnlineStatus;
