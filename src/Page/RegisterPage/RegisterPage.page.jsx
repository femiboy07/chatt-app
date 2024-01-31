import React ,{useEffect, useState} from 'react';
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



const RegisterPage=()=>{
  const initialFormValues = { email: '', password: '', FirstName: '', LastName: '' };
  const dispatch=useDispatch()
    const [values,setValues]=useState(initialFormValues);
    const navigate=useNavigate();
    const {signUp,loading,error,setError,setLoading,addUserToWelcomeChannel,signIn}=useUserAuth();
    
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
     const {email,password,FirstName,LastName}=values;
     const allKeys=()=>{
        for(const key in values){
            if(!values[key]){
                return false;
            }
        }
        return true;
     }




    

     

 const handleSignUp=async(e)=>{
    e.preventDefault();
  
    try{
     setLoading(true);
     await signUp(email,password);
     const userCredential=await signIn(email,password);   
        const user=userCredential.user;
        if(!user){
        throw new Error("User is not authenticated");
        }
        console.log('mechange',user)
        await setDoc(doc(firestore,'users',user.uid),{
                FirstName: FirstName,
                LastName:LastName,
                email: email,
                password:password,
                userId:user.uid
        })
        await addUserToWelcomeChannel(user.uid,values)
       
        setValues(initialFormValues);
        setLoading(false);
        setError(false);
        
        
        navigate('/channel/welcome');
             
      
      
      }catch(err){
         console.log(err);
         setLoading(false)
         setError(!error)
    }finally{
      setLoading(false);
    }
}


    return(
        <div className='h-screen w-screen '>
        <>
        
           <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
            
         <div className=" w-full  max-w-md space-y-8 h-full" >
         {error ? <Alert severity='warning' variant='filled'>you are already registered</Alert>:null}
         {loading ? <span className='text-indigo-300 flex justify-center w-full h-full'>Redirecting please wait....</span>
         :(
         <form className="mt-8 space-y-6 " action="#" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm ">
              <div className="mb-5" >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
                <label htmlFor="FirstName" className="sr-only">
                  Password
                </label>
                <input
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  onChange={handleChange}
                  value={values.FirstName}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="FirstName"
                />
              </div>

              <div>
                <label htmlFor="LastName" className="sr-only">
                  Password
                </label>
                <input
                  id="LastName"
                  name="LastName"
                  type="text"
                  onChange={handleChange}
                  value={values.LastName}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="LastName"
                />
              </div>
            
              <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSignUp}       
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {allKeys()  ? (
                    <LockOpenIcon  className='text-red-500'/>
                ):<LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />}
                </span>
                Sign Up
              </button>
            </div>
            
       </form>
         )}
       </div>
            
       </div>
        
       </>
        </div>
    )
}

export default RegisterPage;