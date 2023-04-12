import React from "react";
import SearchIcon from '@mui/icons-material/Search';



const SearchBar=()=>{
    return(
        <div className="absolute top-[79.07px] left-[32.99px]  h-[48px] w-[265.42px] rounded-3xl ">
            <div className=" h-[48px] w-[265.42px] bg-[#3C393F] relative rounded-md shadow-md">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
             <SearchIcon sx={{color:'white'}}/>
                </div>   
            <input type='text' placeholder='Search' className="w-full text-white  rounded-md bg-[#3C393F]  placeholder:pl-0 pl-10 h-full outline-none border-none focus-visible:outline-none focus-within:border-none focus-visible:shadow-none" />
        </div>
        </div>
    )
}

export default SearchBar;