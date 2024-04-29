import { ArrowCircleDownRounded, ArrowDownwardOutlined, ArrowDropDown } from "@mui/icons-material";
import React from "react";





const ScrollButtonDown=({handleScrollDown})=>{

    

     return(
          <div className="fixed right-5 lg:bottom-10 bottom-20 " onClick={handleScrollDown}>
            <button className="w-[50px] rounded-md h-[50px] bg-black">
              <ArrowDownwardOutlined color="white" fontSize="medium"  className=""/>
            </button>
          </div>
     )
}




export default ScrollButtonDown;