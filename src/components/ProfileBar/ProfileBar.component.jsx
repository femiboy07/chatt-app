import React,{ useState} from "react";
import { Form } from "react-router-dom";
import { Icon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EditIcon from '@mui/icons-material/Edit';
import { useUploadImage } from "../../Hooks/useUploadImage/useUploadImage";
import { doc, updateDoc} from "firebase/firestore";
import { firestore,auth } from "../../firebase/firebase";
import useUserAuth from "../../Context/userContext";
import { AccountCircleRounded, ModeEditOutlineSharp } from "@mui/icons-material";
import { useGetCurrentProfile } from "../../Hooks/useUploadImage/useGetCurrentProfile";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import { deleteObject, getStorage, ref } from "firebase/storage";


const ProfileBar=({display,handleRemove})=>{
  const initialValues={email:'',lastname:'',firstname:''}
    const [value, setValue] = useState(initialValues);
    const [editable,setEditable]=useState(false);
    const [userProfile,setUserProfile]=useGetCurrentProfile(auth.currentUser)
    const {user,selectedFile,setSelectedFile}=useUserAuth();
    const [showModalBox,setShowModalBox]=useState(false);
    const isOnline=useOnlineStatus()
    
     
 
 
 

  
   const handleShowModalBox=()=>setShowModalBox(true);
    
    

    function handleInputChange(e) {
      

        setValue({...value,[e.target.name]:e.target.value})
    } 
   
    function handleEditClick() {
    setEditable(true); // Set editable status to true when edit button is clicked
    }

    function handleSaveClick() {
    setEditable(false); // Set editable status to false when save button is clicked
    }

  

    const [progress]=useUploadImage(selectedFile);
   
    function handleFileChange(e){
      
      if(isOnline){
      const file=e.target.files[0];
      console.log(file.name)
      setSelectedFile(file);
      }else{
        setSelectedFile(null)
      }
     
     
   }

  


   



   

 

  function handleShowModalImage() {
    return (
      <div className="fixed right-5 z-50 top-0">
        <div className="w-full bg-white h-full  z-50 rounded-lg">
          <ul className="flex text-black w-full flex-col p-5 justify-center list-none">
            <li className="w-full">
              <button type="button"  onClick={handleRemoveImage} className="w-full h-full hover:bg-blue hover:opacity-25">
                Remove image
              </button>
            </li>
            <li>
              <label htmlFor="file-input" className="w-full h-full relative cursor-pointer hover:bg-blue hover:opacity-25 ">
                Change image
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  className="sr-only absolute top-0 left-0  rounded-full right-0 bottom-0 w-full before:cursor-pointer h-full"
                  accept="image/*"
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
 


 

const handleRemoveImage=async(e)=>{
  e.preventDefault();
  
  const storage=getStorage()
    const desertRef=ref(storage,`images/${user.uid}`);
    await deleteObject(desertRef);
    const profileRef=doc(firestore,"profile",user.uid);
 
  await updateDoc(profileRef,{
  ImageUrl:null,
  })
   setUserProfile({
    ...userProfile,
    ImageUrl:null,
  });

   setSelectedFile(null)

}

 

  
    

    return(
   <div className={`relative ${display ? 'block':'hidden'}  animate-slideUp `}>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[115] opacity-50   w-screen h-screen  bg-[#120F13]"></div>
      <div className="fixed top-1/2  left-1/2 w-full  -translate-x-1/2 -translate-y-1/2   rounded-lg  scroll-m-0 scrollbar-thin   overflow-y-auto md:w-[650px] h-[550px] z-[116] bg-[#120F13]  ">
      <div className="flex justify-center  items-center  mt-7  ">
      {showModalBox && handleShowModalImage()}
      <div className="relative w-[150px]  rounded-full  h-[150px]">
       <div className="absolute w-full h-full left-1/2  rounded-full top-2 -translate-x-1/2 ">
      
        {userProfile && userProfile?.ImageUrl === null   ? 
          <span><AccountCircleRounded sx={{width:'100%',height:'100%',color:'white'}}  fontSize="large"/></span>: <img src={userProfile?.ImageUrl} alt='person' className="w-[150px] z-40 bg-slate-400  h-[150px] rounded-full"/>} 
          
          <button type="button"  onClick={handleShowModalBox} className="  cursor-pointer w-full h-full  rounded-full absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:bg-slate-900 hover:opacity-40   ">
         
          <label  className="cursor-pointer w-full h-full flex justify-center items-center  ">
            <Icon component={ModeEditOutlineSharp}  sx={{color: 'pink', backgroundColor: 'transparent', cursor: 'pointer'}} />
          </label>
         </button> 
         
        </div>
      </div> 
    </div>
     <button  className={'absolute  left-[25px] top-[25px]'} onClick={handleRemove}>
         <FontAwesomeIcon icon={faClose} color='white'  size="xl"/>
    </button>
      <Form className="mt-5 relative w-full">
        <div className="flex flex-col pl-4 pr-3 w-full justify-center">
         <div className="relative mb-[45px] h-[50px] ">
         {/* <button onClick={handleEditClick} type="button"  className=" rounded-md absolute right-0 translate-y-1/2    flex justify-center items-center">
               <Icon
               width={5}
                height={5}
                component={EditIcon}
                sx={{color:'white'}}
                className='text-black'
                />
        </button>  */}
         <input type='text' name="firstname" disabled={!editable} onChange={handleInputChange}  defaultValue={userProfile?.FirstName} className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="firstname"/>  
         <label htmlFor="firstname" className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
          value.firstname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]   text-gray-400 text-base"
        }`}>FirstName</label>
         
         </div>

         <div className="relative mb-[45px] h-[50px]">
         {/* <button onClick={handleEditClick} type="button"  className=" rounded-md absolute right-0 translate-y-1/2    flex justify-center items-center">
               <Icon
               width={5}
                height={5}
                component={EditIcon}
                sx={{color:'white'}}
                className='text-black'
                />
        </button>    */}
        <input type='text' name="lastname" disabled={!editable}  onChange={handleInputChange} defaultValue={userProfile?.LastName}  className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="lastname"/>  
         <label htmlFor="lastname"  className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
          value.lastname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]     text-gray-400 text-base"
        }`}>LastName</label>
        </div>   
         
        <div className="relative mb-[45px] h-[50px]">
        {/* <button onClick={handleEditClick}  type="button" className=" rounded-md absolute right-0 translate-y-1/2    flex justify-center items-center">
               <Icon
               width={5}
                height={5}
                component={EditIcon}
                sx={{color:'white'}}
                className='text-black'
                />
        </button>  */}
            <input type='text' name="email" disabled={!editable} readOnly  onChange={handleInputChange} defaultValue={userProfile?.email}  className=" h-full block bg-transparent border-b-2 duration-500 transistion-all w-full focus:outline-none  text-[18px] text-[#333] text-red" id="lastname"/>  
             <label htmlFor="email"  className={`absolute left-0 text-[18px] text-[#999] transistion-all ${
              value.lastname ? "top-[-20px] text-gray-500 text-base" : "top-[-20px]    text-gray-400 text-base"
            }`}>Email </label>
            </div>
        </div>

        {/* <div className="absolute right-5">
          {editable ? (
            <button onClick={handleSaveClick}  className="w-[80px] h-[50px] rounded-md bg-[#252329]    flex justify-center items-center ">
                <span>Save</span>
                <Icon
                component={SaveIcon}
                
                />
            </button>
          ):<button onClick={handleEditClick}  className="w-full h-full p-3 rounded-md bg-[#252329]    flex justify-center items-center">
               <span className="text-[18px]">Edit</span>
               <Icon
               width={5}
               height={5}
                component={EditIcon}
                sx={{color:'white'}}
               
                className='text-black'
                />
            </button>}
        </div> */}
        </Form>   
      </div>
      </div>
       
    )

}



export default ProfileBar;