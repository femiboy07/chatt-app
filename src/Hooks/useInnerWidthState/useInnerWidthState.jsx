import React,{useEffect,useState} from "react";



const useInnerWidthState=()=>{
    const [width,setWidth]=useState(window.innerWidth);
    const [height,setHeight]=useState(window.innerHeight);

    useEffect(()=>{
        const handleResize=()=>{
           setWidth(window.innerWidth);
           setHeight(window.innerHeight);
        }

        window.addEventListener('resize',handleResize);
        handleResize();
        return ()=>{
            window.removeEventListener('resize',handleResize);
            
        }
    },[])
    return [width,setWidth,height,setHeight]
}


export default useInnerWidthState;