import React ,{useEffect, useState,useCallback} from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useUserAuth from '../../Context/userContext';
import { firestore } from '../../firebase/firebase';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setProfiles, setSelectedRoom } from '../../reduxstore/features/Channels/channelSlice';
import fetchRoom from '../../components/apiContext/fetchRoom.component';
import { useForm } from 'react-hook-form';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useOnlineStatus from '../../Hooks/useOnlineStatus';


const RegisterPage=()=>{
  const initialFormValues = { email: '', password: '', FirstName: '', LastName: '' };
  const dispatch=useDispatch()
    const [values,setValues]=useState(initialFormValues);
    const [visibility,setVisibility]=useState(false);
    const [autofocus,setAutoFocus]=useState(true);
    const isOnline=useOnlineStatus()
    const {formState:{errors},register,handleSubmit,setError,clearErrors,reset}=useForm({
      mode:'onChange'
    })
    const navigate=useNavigate();
    const {signUp,loading,setLoading,addUserToWelcomeChannel,signIn}=useUserAuth();
    
    
     const {email,password,FirstName,LastName}=values;
     const allKeys=()=>{
        for(const key in values){
            if(!values[key]){
                return false;
            }
        }
        return true;
     }


     const validateEmail = (email) => {
      const trimmedEmail = email.trim();
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test(trimmedEmail) || "invalid email address";
    };

    

     

 const handleSignUp=async(data)=>{
 
 
    
 
 if(isOnline){
  reset({
    email:'',
    password:'',
    FirstName:'',
    LastName:''
  })
  clearErrors(['err','custom'])
  setLoading(true)
   try{
    await signUp(data.email,data.password);
     clearErrors(['err'])
     const userCredential=await signIn(data.email,data.password);   
        const user=userCredential.user;
        if(!user){
        throw new Error("User is not authenticated");
        }
       
        console.log('mechange',user)
        await setDoc(doc(firestore,'users',user.uid),{
                FirstName: data.FirstName,
                LastName:data.LastName,
                email: data.email,
                password:data.password,
                userId:user.uid
        })
        
       
        // setValues(initialFormValues);
       
        // setError(false);
        await addUserToWelcomeChannel(user.uid,data);
         setLoading(false);
         dispatch(setSelectedRoom({id:'welcome',description:"Welcome to my chatroom !!! huray you wer able to make it",name:"Welcome Channel"}))
         navigate('/channel/welcome');
        
       

       }catch(err){
         console.log(err);
         setLoading(false)
        //  setError(!error);

         if(err.code === 'auth/email-already-in-use'){
           setError("classic",{type:"custom",message:"Email already in use, correct the email pls thank you"})
         }
       
    }finally{
      setLoading(false);
     
      // dispatch(setSelectedRoom())
    }
  }
  if(!isOnline){
    reset({
     email:'',
     password:'',
     FirstName:'',
     LastName:''
   })
   setError('error',{type:'err',message:"Can't sign in something went wrong pls check it "});
 }

}

const handleBlur = (event, fieldName) => {
  const input = event.target.value;
  const label = event.target.nextElementSibling;
  if (input ) {
    label.classList.add("-top-7","text-[12px]");
  } else {
    label.classList.remove("-top-7", "text-[12px]");
  }
};

useEffect(()=>{
  reset({
    email:'',
    password:'',
    FirstName:'',
    LastName:''
  })

  
 
  clearErrors(['FirstName','LastName','email','password','custom','err'])
},[clearErrors,reset,isOnline
])


    return(
        <div  className={"h-screen w-screen flex flex-row bg-center  " }   >
      
        <div className=" bg-black items-center w-[40%] max-md:w-full  shadow-[0px_5px_5px_1px_black]    max-lg:fixed   max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:-translate-x-1/2 justify-center px-3  sm:px-5 lg:px-16" >
            
         <div className=" flex flex-col justify-center h-full " >
         {/* {error ? <Alert severity='warning' variant='filled'>you are already registered</Alert>:null} */}
         {loading && (
          <div className='flex w-full items-center flex-col justify-center '>
          <CircularProgress className='w-full h-full' size={20}/>
         <span className='text-indigo-300 flex justify-center w-full '>Redirecting please wait....</span>
         </div>
         )}
         {errors.classic && (<span className="text-red-600 font-extrabold font-Poppins flex justify-center text-center w-full">{errors.classic?.message}</span>)}
         {errors.error && (<span className="text-red-600 font-extrabold font-Poppins flex justify-center text-center w-full">{errors.error?.message}</span>)}
         <div className="header-title max-lg:text-center text-white text-[35px] font-extrabold mt-0 font-Poppins">
          <h1>Welcome to Room</h1>
          <p className='text-[13px]'>Create your account</p>
         </div>
        
         <form autoComplete="off" className="mt-2 space-y-5  pt-5 pb-9  " onSubmit={handleSubmit(handleSignUp)} >
         
              <div className=" relative p-5  " >
              
                <input
                  {...register("email",{required:true,validate:validateEmail,onBlur:(e)=>handleBlur(e,email)})}
                  id="email-address"
                  name="email"
              
                  aria-invalid={errors.email ? "true" : "false"}
                  autoComplete="email"
                  autoCorrect='off'
                  placeholder='E-mail'
                  className="absolute placeholder:text-transparent  peer   transition-[peer]  border-b border-b-gray-600 pr-5  text-white placeholder:left-0      inset-0 appearance-none    py-2  font-extrabold placeholder-gray-500 autofill:bg-red-600   bg-transparent focus:bg-none focus:outline-none  sm:text-sm"
                  
                />
                 <label htmlFor="email-address" className={`text-white   top-0   peer-focus:text-[12px] peer-focus:transition-[top]   peer-focus:ease-in-out peer-focus:delay-400 peer-focus:-top-7 text-[15px] absolute left-0 translate-y-1/2 `}>
                 E-mail  
                </label>
                <div className='absolute right-0 -translate-y-1/2 z-50'>
                  <AlternateEmailIcon sx={{color:"white"}} fontSize='15'/>
                </div>
              </div>
              {errors?.email && errors?.email?.type === 'required' && (<span role="alert" className=" text-red-600   font-Poppins  text-[14px]">Email is required</span>)}
              {errors?.email && errors?.email?.type === 'validate'   && (<span role="alert" className=" text-red-600  font-Poppins  text-[14px]">{errors.email.message}</span>)}
              
              <div className='relative p-5'>

                <input
                {...register("password",{required:true,minLength:6,maxLength:12,onBlur:(e)=>handleBlur(e,password) })}
                  id="password"
                  name="password"
                  type={visibility ? "text":"password"}
                  autoComplete="password"
                  autoCorrect='off'
                  className="absolute inset-0 peer placeholder:text-transparent text-white pr-5  block bg-transparent  w-full shadow-[0px_0px_5px_0_#120F13]  appearance-none  border-b border-b-gray-600  py-2  font-extrabold placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none  sm:text-sm"
                
                
                />
                 <label htmlFor="password" className ={`text-white ${values.FirstName.length  > 0 ? 'peer-enabled:-top-7   peer-enabled:text-[12px]  ':'top-0  text-[15px]'}   peer-focus:text-[12px]  peer-focus:transition-[top]   peer-focus:ease-in-out peer-focus:delay-400 peer-focus:-top-7 text-[15px] absolute left-0 translate-y-1/2`}>
                  password
                </label>
                {visibility ? 
                (
                <button type="button" onClick={()=>setVisibility(false)} className=' z-50 absolute right-0 -translate-y-1/2 bg-transparent '>
                <VisibilityOffIcon sx={{color:"white",cursor:"pointer"}} fontSize="15"/>
                </button>):(
                  <button type="button"  onClick={()=>setVisibility(true)} className=' z-50 absolute right-0 -translate-y-1/2 bg-transparent '>
                  <VisibilityIcon sx={{color:"white",cursor:"pointer"}} fontSize="15"/>
                  </button>
                )}
              </div>
              {errors.password && errors?.password?.type === 'required' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">password is required</span>}
             {errors.password && errors?.password?.type === 'minLength' && <span role="alert" className=" text-red-600  font-Poppins  text-[14px]">password must have minimum of 6 characters</span>}
             {errors.password && errors?.password?.type === 'maxLength' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">password must have maximum of 12</span>}
            {/* </div> */}

            <div className='relative p-5'>
                
                <input
                {...register("FirstName",{required:true,onBlur:(e)=>handleBlur(e,FirstName)})}
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  
                  autoComplete="off"
                
                  
                  className={"absolute  placeholder:text-transparent block peer   transition-[peer]  border-b border-b-gray-600  text-white placeholder:left-0  focus-within:bg-transparent    inset-0 appearance-none    py-2  font-extrabold placeholder-gray-500  bg-transparent focus:outline-none  sm:text-sm"}
                  placeholder="FirstName"
                />
                <label htmlFor="FirstName" className ={`text-white ${values.FirstName.length  > 0 ? 'peer-enabled:-top-7   peer-enabled:text-[12px]  ':'top-0  text-[15px]'}   peer-focus:text-[12px]  peer-focus:transition-[top]   peer-focus:ease-in-out peer-focus:delay-400 peer-focus:-top-7 text-[15px] absolute left-0 translate-y-1/2`}>
                 <span>FirstName</span>
                </label>
              </div>
              {errors.FirstName && errors?.FirstName?.type === 'required' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">FirstName is required</span>}

              <div className='relative p-5'>
              
                <input
                {...register("LastName",{required:true,onBlur:(e)=>handleBlur(e,LastName)})}
                  id="LastName"
                  name="LastName"
                  type="text"
                
                  autoComplete="off"
                  className={'absolute block w-full  peer placeholder:text-transparent    bg-transparent  inset-0 shadow-[0px_0px_5px_0_#120F13]    appearance-none border-transparent  border-b border-b-gray-600  py-2 text-white font-extrabold placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'}
                  placeholder="LastName"
                />
                  <label htmlFor="LastName" className={`text-white ${values.LastName.length  > 0 ? 'peer-enabled:-top-7   peer-enabled:text-[12px]  ':'top-0  text-[15px]'}   peer-focus:text-[12px]  peer-focus:transition-[top]   peer-focus:ease-in-out peer-focus:delay-400 peer-focus:-top-7 text-[15px] absolute left-0 translate-y-1/2`}>
                 <span>LastName</span>
                </label>
              </div>
              {errors.LastName && errors?.LastName?.type === 'required' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">LastName is required</span>}
              <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#120F13] py-3 px-4 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 onClick={()=>clearErrors(["custom"])}      
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600   ">
                {allKeys()  ? (
                    <LockOpenIcon  className='text-red-500'/>
                ):<LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />}
                </span>
               <span className="text-[#252329] font-extrabold"> Sign Up</span>
              </button>
            </div>
            
       </form>
         
       </div>
            
       </div>
       <div className="bg-intro-page h-full  w-[60%] max-lg:w-full">
          <div className='text-white  max-lg:hidden font-extrabold font-Poppins ml-20 mt-10'>
             <h1 className='text-[60px] tracking-tighter-[0.5em] '>Designed for individuals</h1>
             <span className='font-extrabold tracking-tighter'>Connect with friends and family in diffrent rooms </span>
          </div>
          <div className="image-logo shadow-[5px_5px_5px_0px_indigo-600] fixed max-lg:hidden ml-10 left-[70%]  bg-register-page -rotate-12 scale-150 w-full h-96 z-50 bg-contain mt-5 bg-no-repeat  " ></div>
       </div>

    </div>
    )
}

export default RegisterPage;