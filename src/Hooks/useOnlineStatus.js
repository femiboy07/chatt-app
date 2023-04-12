import React,{useEffect, useState} from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const useOnlineStatus = () => {
    const [isOnline, setOnline] = useState(navigator.onLine);
    useEffect(() => {
          const handleOnline = () => {
            toast.success("You are now online");
            setOnline(true);
          };
      
          const handleOffline = () => {
            toast.error("You are now offline");
            setOnline(false);
          };
      
          window.addEventListener("online", handleOnline);
          window.addEventListener("offline", handleOffline);
      
          return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
          };
    }, []);
   return isOnline;
};

export default useOnlineStatus;