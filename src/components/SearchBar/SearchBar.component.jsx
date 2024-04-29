import React, { useState,useRef, useEffect, useCallback } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";



const SearchBar=({searchChannel,searchTerm,setSearchTerm,linkRef})=>{

    const [showClearBtn,setShowClearBtn]=useState(false);
    const {loading}=useSelector((state)=>state.rooms);
    const [width]=useInnerWidthState()

     const searchRef=useRef(null);
     const divRef=useRef(null);
     const inpuRef=useRef(null);
     console.log(inpuRef,"inpuRef")

    // const handleSearchClick=(e)=>{
        
    
    
    //     // searchRef.current.style.display='none';
    //     setShowClearBtn(true);
       
    //     // searchRef.current.style.display='block'

    
    // }

    const handleShowSearch=(e)=>{



        
        const isLink = e.relatedTarget && e.relatedTarget.tagName === 'A';

        if ((!isLink && width >= 550)  ) {
          // Execute your blur logic here
          console.log('Blur event outside link');
        
        setSearchTerm('')
        searchRef.current.style.display='block'
        setShowClearBtn(false);
       }

       
        //  divRef.current.style.width='2.5rem'
    
    }

    const handleRemoveSearchTerm=()=>setSearchTerm('');

 

  


    return(
        <div className="absolute top-[79.07px]  max-[370px]:pl-2 max-[370px]:pr-2  max-[370px]:w-full  left-[32.99px]     max-[370px]:left-0 max-[370px]:right-0    h-[48px] w-[265.42px] rounded-3xl ">
            <div ref={divRef} className=" h-[48px] w-[265.42px]  group max-[370px]:w-full      bg-[#3C393F] relative rounded-md shadow-md">
             <div className="absolute inset-y-0 group-hover:-left-0  transition-all  left-0 pl-3 flex items-center" >
             <FontAwesomeIcon  ref={searchRef} icon={faSearch} size="md" className="   text-white " />
            </div>
            <input type="text"      value={searchTerm} onChange={searchChannel}   placeholder='Search' className={`w-full    text-white placeholder:font-[Poppins] font-[Poppins]  rounded-md bg-[#3C393F]  pl-10 placeholder:pl-0   h-full outline-none border-none focus-visible:outline-none focus-within:border-none pr-8 focus-visible:shadow-none`} />
            {loading  ? (
            <button tye="button" className="absolute rounded-full right-3 inset-y-0" >
            {searchTerm ? <CircularProgress sx={{color:"white"}}  size={15}/>: null}
            </button>)
            :
            searchTerm ? <button type="button" onClick={handleRemoveSearchTerm} className="absolute rounded-full right-3 inset-y-0" >
               <FontAwesomeIcon icon={faClose} size='md' className="rounded-full w-4 h-4 bg-white"/> 
             </button>:null}
             
        </div>
        </div>
    )
}

export default SearchBar;