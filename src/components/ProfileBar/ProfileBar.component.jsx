import React,{useState} from "react";
import { Form } from "react-router-dom";
import myDog from '../../svg/portrait-pomeranian-dog.jpg';
import CreateIcon from '@mui/icons-material/Create';
import { Icon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';

const ProfileBar=({display,handleRemove})=>{
  const initialValues={email:'',lastname:'',firstname:''}
    const [value, setValue] = useState(initialValues);
    const [editable,setEditable]=useState(false);
    

    function handleInputChange(e) {
        setValue({...value,[e.target.name]:e.target.value})
    } 
   
    function handleEditClick() {
    setEditable(true); // Set editable status to true when edit button is clicked
    }

    function handleSaveClick() {
    setEditable(false); // Set editable status to false when save button is clicked
    }
    return(
   <div className={`relative ${display ? 'block'  :'hidden'} transistion ease-in-out duration-100`}>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[115] opacity-50   w-screen h-screen  bg-[#120F13]"></div>
      <div className="fixed top-0 right-0 bottom-0 w-screen rounded-lg h-[600px] md:w-[350px] z-[116] bg-[#120F13]  ">
      <div className="flex justify-center items-center  mt-7  ">
      <div className="relative">
         <img src={myDog} alt='person' className="w-[150px] h-[150px] rounded-full"/> 
         <button className="bg-[#120F13] w-[50px] h-[50px] rounded-full absolute  right-[0px] translate-x-1/2 bottom-[15px] ">
         <Icon component={BrowseGalleryIcon} sx={{color:'pink'}} />     
         </button>
      </div> 
    </div>
     <button  className={`absolute top-0 left-[25px] top-[25px]`} onClick={handleRemove}>
         <FontAwesomeIcon icon={faClose} color='white'  size="xl"/>
    </button>
      <Form className="mt-5 relative ">
        <div className="flex flex-col pl-4 pr-4   justify-center">
         <div className="relative mb-[45px] h-[50px] ">
         <input type='text' name="firstname" disabled={!editable} onChange={handleInputChange}  defaultValue={'OluwaFeranmi'} className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="firstname"/>  
         <label htmlFor="firstname" className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
          value.firstname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]   text-gray-400 text-base"
        }`}>FirstName</label>

         </div >

         <div className="relative mb-[45px] h-[50px]">
            
        <input type='text' name="lastname" disabled={!editable}  onChange={handleInputChange} defaultValue={'Okon'}  className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="lastname"/>  
         <label htmlFor="lastname"  className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
          value.lastname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]     text-gray-400 text-base"
        }`}>LastName</label>
        </div>   
         
        <div className="relative mb-[45px] h-[50px]">
            
            <input type='text' name="email" disabled={!editable} readOnly  onChange={handleInputChange} defaultValue={'okonoluwaferanmi@gmail.com'}  className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="lastname"/>  
             <label htmlFor="email"  className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
              value.lastname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]    text-gray-400 text-base"
            }`}>Email </label>
            </div>
        </div>

        <div className="absolute right-5">
          {editable ? (
            <button className="w-[80px] h-[50px] rounded-md bg-[#252329]    flex justify-center items-center ">
                <span>Save</span>
                <Icon
                component={SaveIcon}
                onClick={handleSaveClick}
                />
            </button>
          ):<button className="w-[80px] h-[50px] rounded-md bg-[#252329]    flex justify-center items-center">
               <span className="text-[18px]">Edit</span>
               <Icon
                component={EditIcon}
                sx={{color:'white'}}
                onClick={handleEditClick}
                className='text-black'
                />
            </button>}
        </div>
        </Form>   
      </div>
      </div>
       
    )

}



export default ProfileBar;