import React, { useState,useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";



const SearchBar=({searchChannel,searchTerm})=>{

    const [showClearBtn,setShowClearBtn]=useState(false);

     const searchRef=useRef(null)

    const handleSearchClick=(e)=>{
        if(searchRef.current){
        searchRef.current.style.display='none';
        setShowClearBtn(true)

        }
    }

    const handleShowSearch=()=>{
        searchRef.current.style.display='block'
        setShowClearBtn(false)
    }

    return(
        <div className="absolute top-[79.07px]  max-[370px]:pl-2 max-[370px]:pr-2  max-[370px]:w-full  left-[32.99px]     max-[370px]:left-0 max-[370px]:right-0    h-[48px] w-[265.42px] rounded-3xl ">
            <div className=" h-[48px] w-[265.42px] group max-[370px]:w-full    bg-[#3C393F] relative rounded-md shadow-md">
             <div className="absolute inset-y-0 group-hover:-left-0   left-0 pl-3 flex items-center">
             <FontAwesomeIcon  ref={searchRef} icon={faSearch} size="md" className="   text-white " />
            </div> 
            <input type="text" onFocus={handleSearchClick} onBlur={handleShowSearch}  value={searchTerm} onChange={searchChannel}   placeholder='Search' className="w-full focus:pl-2  text-white placeholder:font-[Poppins] font-[Poppins]  rounded-md bg-[#3C393F]  placeholder:pl-0 pl-10 h-full outline-none border-none focus-visible:outline-none focus-within:border-none focus-visible:shadow-none" />
            {showClearBtn ? <button className="absolute rounded-full right-3 inset-y-0">
               <FontAwesomeIcon  icon={faClose} size='md' className="rounded-full w-4 h-4 bg-white"/> 
             </button>:null}
        </div>
        </div>
    )
}

export default SearchBar;