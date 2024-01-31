import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";
import { useSelector } from "react-redux";


const AppBar=({isOpen,setIsOpen,barRef,handleClickOutside})=>{
    const {selectedRoom}=useSelector(state=>state.rooms)
    const [width]=useInnerWidthState();

   
   
       return(
    <header className="bg-[#252329] h-[59.49px] z-50 fixed left-0 top-0    lg:w-full     w-full flex items-center   shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {isOpen === false ? (
            <button onClick={setIsOpen}  className='lg:hidden md:block ml-4 lg:ml-5 flex items-center bg-inherit w-fit h-full     justify-center '>
                <FontAwesomeIcon icon={faBars} color='#F2F2F2'  className='w-[18px] h-6 '/>
            </button>):(
           <button onClick={setIsOpen} ref={barRef} className={`${width <= '1024' ? 'block':'hidden'} absolute flex  bg-[#120F13]   max-[370px]:z-50 items-center h-[24px] w-[24px] justify-center left-[330.42px] `}>
           <FontAwesomeIcon icon={faClose} color='white'  size="lg"/>
           </button>
        )}  
        {isOpen && <div onClick={handleClickOutside} className="h-screen w-screen fixed left-0 right-0 bg-red z-50"></div>} 
    <div className={`flex  ml-5 items-center ${width  > 228 ? 'block':'hidden'}`}>
    <button className={` font-medium   lg:ml-[372px]    uppercase text-[#E0E0E0]  `} >{selectedRoom.name}</button>
    </div>
    </header>

     
  
     )
}



export default AppBar;
