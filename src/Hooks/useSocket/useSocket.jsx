import React,{useEffect,useState} from "react";
import socketio from 'socket.io-client';



const useSocket=(url)=>{
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
        const socket=socketio(url);
        setSocket(socket);

        return ()=>{
            socket.disconnect()
        }
    },[url])
    return socket;
}

export default useSocket;