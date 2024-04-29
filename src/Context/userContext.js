import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React,{useContext,useEffect,useState} from "react";
import { createContext } from "react";
import { auth, firestore } from "../firebase/firebase";
import bycrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from "react-router";
import fetchRoom from "../components/apiContext/fetchRoom.component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";



const userAuthContext=createContext();

const hasPassword=async(password)=>{
   const saltround=10;
   const hash=await bycrypt.hash(password,saltround);
   return hash;
}

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch()
    const [selectedFile,setSelectedFile]=useState(null);
    const [download, setDownloadUrl] = useState('');

    const addUserToWelcomeChannel=async(userId,values)=>{
      const id=uuidv4();
       console.log('uid',userId)
       if (!auth.currentUser){
        throw new Error('User is not authenticated');
       }
        const roomRef= doc(firestore,'Rooms','welcome');
        try{
        
        const roomSnap=await getDoc(roomRef);
        if(!roomSnap.exists()){
        await setDoc(roomRef,{
            name:'Welcome Channel',
            description:'Welcome to my chatroom !!! huray you wer able to make it',
            members:[userId,'chatbot'],
            id:roomRef.id
        })
      
        const messageRef=doc(firestore,`${roomRef.path}/Messages/message1`);
   
      await setDoc(messageRef,{
          message:'Welcome to the room!!',
          userId:'chatbot',
          timestamp:Date.now(),
          roomId:roomRef.id
        })

       
        
        const {password,email,FirstName,LastName}=values;
      
        const hashedPassword=await hasPassword(password);
        await setDoc(doc(firestore,'profile',userId),{
             email:email,
             FirstName:FirstName,
             LastName:LastName,
             password:hashedPassword,
             ImageUrl:null,
             id:userId,
             timestamp:serverTimestamp()
        })
        }else{

          const {password,email,FirstName,LastName}=values;
          
          const hashedPassword=await hasPassword(password);
          await setDoc(doc(firestore,'profile',userId),{
               email:email,
               FirstName:FirstName,
               LastName:LastName,
               password:hashedPassword,
               ImageUrl:null,
               id:userId,
               timestamp:serverTimestamp()
          })
          await updateDoc(roomRef,{
             members:arrayUnion(userId),
             timestamp:Date.now()
            
          })
        }
    }catch(error){
      console.log(error)
    }
    
    
    }
    const signIn=(email,password)=>{
       return  signInWithEmailAndPassword(auth,email,password);

    }
    const signUp=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const userSignOut=()=>{
        return signOut(auth);
    }


useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth,async(user)=>{
        if(user){
            console.log('authchange',user);
            // toast.success("redirecting to homepage")
            setTimeout(()=>{

            setUser(user);
            },200)
        }
    
    })
    return ()=>{
      if(unsubscribe){
        
        unsubscribe()
      }
    };
},[user])


    return (
    <userAuthContext.Provider value={{user,selectedFile,download,setDownloadUrl,setSelectedFile,setUser,signIn,signUp,error,setError,loading,setLoading,userSignOut,addUserToWelcomeChannel}}>
      {children}
    </userAuthContext.Provider>
    )
}


const useUserAuth=()=>useContext(userAuthContext);
export default useUserAuth;