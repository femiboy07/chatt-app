import React from "react";





const  LargeImage=({userProfile})=>{
     return(
          <>
          <div className="fixed w-full h-screen bg-black z-[158] inset-0"></div>
          <div className="w-full h-full flex justify-center  items-center">
              <div  className="w-64 h-64 max-w-full relative ">
                {userProfile?.ImageUrl && <img src={userProfile?.ImageUrl} alt='profile-user'/>}
              </div>
          </div>
          </>
     )
}


export default LargeImage;