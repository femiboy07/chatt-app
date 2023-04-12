import React,{useEffect,useState} from "react";



const useInnerWidthState=()=>{
    const [width,setWidth]=useState(window.innerWidth);

    useEffect(()=>{
        const handleResize=()=>{
           setWidth(width);
        }

        window.addEventListener('resize',handleResize);
        handleResize();
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[width])
    return [width,setWidth]
}


export default useInnerWidthState;