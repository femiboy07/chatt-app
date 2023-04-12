import React from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "../SearchBar/SearchBar.component";
import ChannelItem from "../channelitem/ChannelItem.component";






const Channels=({handleChangeChannel,handleModal})=>{
  
    
    const abbreviation=(str)=>{
      let words=str.split(' ');
      let abbreviated=words.map(word=>word[0]).join('');
      return abbreviated;
    }

   

    

    return(
        <>
        <div className="w-[324px] h-[3.53rem] flex items-center absolute justify-between  ">
        <span className=" absolute left-[32.99px] text-[18px] text-[#E0E0E0]">Channels</span>
        <AddIcon onClick={handleModal} className="text-white absolute cursor-pointer  left-[270.4px] h-[32px] right-[86px] w-[32px] bg-[#252329] rounded-lg"/>
        </div>
        <SearchBar/> 
        <ChannelItem handleChangeChannel={handleChangeChannel}/>
        </>
    
    )
}


export default Channels;