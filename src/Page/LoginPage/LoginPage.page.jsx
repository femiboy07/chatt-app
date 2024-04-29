import React,{useCallback, useContext, useEffect, useRef} from "react";
import LockIcon from '@mui/icons-material/Lock';
import useUserAuth from "../../Context/userContext";
import { useState } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";
import { setSelectedRoom } from "../../reduxstore/features/Channels/channelSlice";
import {useForm, useWatch} from "react-hook-form";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import useInnerWidthState from "../../Hooks/useInnerWidthState/useInnerWidthState";






const LoginPage=()=>{
    const {signIn}=useUserAuth();
    const {register, handleSubmit,formState:{errors,isLoading,isSubmitting},clearErrors,watch,setError,setFocus,setValue,reset}=useForm()
    const navigate=useNavigate();
    const [width,setWidth,height,setheight]=useInnerWidthState()
  


  
   
    const validateEmail = (email) => {
      const trimmedEmail = email.trim();
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test(trimmedEmail) || "invalid email address";
    };
  
    
  

  
  const handleLogin = async (data) => {
    try {
        clearErrors(["invalidUser","wrongPassword", "email", "password"]);
        // Use await to handle async login
        console.log(data)
        const user = await signIn(data.email, data.password);
        // Show success toast upon successful login
        // Redirect to home page after successful login
        toast.success("Login successful!");
        navigate('/allChannel/homePage');
        console.log(user);
    } catch (error) {

        // Handle login errors
        if(error.code === 'auth/user-not-found'){
        setError("invalidUser", { type: "custom", message: "Invalid user. Please create an account with us." });
        }
        if(error.code === 'auth/wrong-password'){
          setError("wrongPassword",{type:"pass",message:"wrong password. Please check your password and try again"});
        }else{

        // console.error('An unexpected error occurred:', error);
        // Show error toast upon login failure
        toast.error("Failed to log in. Please try again. And check your internet connection",{className:"bg-black "});
        return;
        }
      }
};

useEffect(()=>{
  clearErrors(["invalidUser","email","password","wrongPassword"])
 
  reset({
    email:'',
    password:'',
    
  })
},[clearErrors,reset])

    
    

    return(
        <div className={`w-full ${height <= 370 ? 'h-full' : 'h-screen' }  relative my-auto  flex  justify-center items-center box-border  overflow-y-hidden `}>
        
        {/* <div className="flex  flex-col items-center justify-center place-items-center w-full  my-auto sm:px-6 lg:px-12 overflow-y-auto "> */}
       
      <div className=" h-full w-screen   flex  flex-col items-center justify-center overflow-y-auto  ">
         <h2 className="mx-auto w-screen h-fit   text-center font-Poppins text-white font-serif text-[25px]">The Room</h2>
            <h2 className="mt-1 text-center text-3xl font-bold tracking-tight font-Poppins text-white">
              Sign in to your account
        </h2>
      <form className=" pt-9 mt-3  pl-2 pr-2 max-w-md   w-full  pb-5  rounded-md space-y-4  bg-white" onSubmit={handleSubmit(handleLogin)} autoComplete="off" >
           {errors.invalidUser  && (<span className="text-red-600 font-extrabold font-Poppins flex justify-center text-center w-full">{errors.invalidUser?.message}</span>)}
           {errors.wrongPassword  && (<span className="text-red-600 font-extrabold font-Poppins flex justify-center text-center w-full">{errors.wrongPassword?.message}</span>)}
             <div className=" mb-1 shadow-[0px_0px_3px_0px_#120F13]  relative p-6" >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  {...register("email",{required:true,validate:validateEmail})}
                  id="email-address"
                  name="email"
                  autoComplete="off"
                  autoCorrect="off"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`absolute ${errors.email ? 'border border-red-600':null} inset-0 block w-full h-full appearance-none font-Poppins rounded-none rounded-t-md  px-3 py-4 text-gray-900 placeholder-gray-500   focus:outline-none  sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && errors.email?.type === 'required' && (<span role="alert" className=" text-red-600   font-Poppins  text-[14px]">Email is required</span>)}
              {errors.email && errors.email?.type === 'validate'   && (<span role="alert" className=" text-red-600  font-Poppins  text-[14px]">{errors.email.message}</span>)}
              <div className="mt-2 shadow-[0px_0px_3px_0px_#120F13]  relative p-6">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password",{required:true,value:6,minLength:6,maxLength:12})}
                  name="password"
                  type="password"
                  // aria-invalid={errors.password  ? 'true' :'false'}
                  autoComplete="true"
                  autoCorrect="off"
                  autoSave="false"
                  className={`absolute block inset-0 w-full ${errors?.password ? 'border border-red-600':null} h-full appearance-none rounded-none font-Poppins  rounded-b-md  border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
            
             {errors.password && errors?.password?.type === 'required' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">password is required</span>}
             {errors.password && errors?.password?.type === 'minLength' && <span role="alert" className=" text-red-600  font-Poppins  text-[14px]">password must have minimum of 6 characters</span>}
             {errors.password && errors?.password?.type === 'maxLength' && <span role="alert" className=" text-red-600   font-Poppins  text-[14px]">password must have maximum of 12</span>}
              <div>
              <button
                type="submit"
                className=" relative flex  w-full justify-center rounded-md border border-transparent bg-[#120F13] py-4 mb-4 px-4 text-sm font-medium text-white hover:opacity-25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 onClick={()=>clearErrors(["invalidUser","wrongPassword"])}          
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-white group-hover:t ext-indigo-400" aria-hidden="true" />
                </span>
                {isSubmitting ? <CircularProgress color="inherit" size={25}/>:"Sign in"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-sm">
               <Link to='/register' className="text-black p-3 rounded-md hover:bg-slate-300">
                register with us
                </Link>
              </div>
             </div>
          </form>
             
        </div>
        
      </div>
      
    
    )
}


export default LoginPage;