import React,{useContext} from "react";
import LockIcon from '@mui/icons-material/Lock';
import useUserAuth from "../../Context/userContext";
import { useState } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";





const LoginPage=()=>{
    const {signIn}=useUserAuth();
    const navigate=useNavigate();
    const [values,setValues]=useState({email:'',password:''})
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
     const {email,password}=values;
  


    const handleLogin=async(e)=>{
     e.preventDefault();
     signIn(email,password).then((user)=>{
     navigate('/channel/welcome')
    
       console.log(user);
    }).catch((err)=>{
       console.log(err);
    })
    }


    
    

    return(
        <div className="h-screen w-screen bg-[#252329] ">
        <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mx-auto h-12 w-auto text-center text-white font-serif text-[25px]">The Room</h2>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
           
          </div>
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
                  value={values.email}
                  onChange={handleChange}
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
                  value={values.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              
              

              <div className="text-sm">
               
                <Link to='/register' className="text-white">
                  register with us
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleLogin}             
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
        </div>
    )
}


export default LoginPage;