import { collection, onSnapshot, query, where } from "firebase/firestore";
import React,{useEffect, useState} from "react";
import { firestore } from "../../firebase/firebase";
import useOnlineStatus from "../useOnlineStatus";







export const useGetCurrentProfile=(currentUser)=>{
   const [userProfile,setUserProfile]=useState(null)
   const isOnline=useOnlineStatus()

     useEffect(()=>{
          // const user = auth.currentUser;
  
          if (currentUser) {
            // Reference to the profiles collection
           const profileRef= collection(firestore,"profile")
      
            // Query to find the profile document with the user's UID
            const q=query(profileRef,where('id' ,'==', currentUser.uid))
      
            // Subscribe to the query and update state when data changes
            const unsubscribe = onSnapshot(q,{includeMetadataChanges:true},(snapshot) => {
              if (!snapshot.empty) {
                // Get the first document from the query result
                const profileData = snapshot.docs[0].data();
                console.log(profileData)
                setUserProfile(profileData);
              } else {
                // Profile not found
                setUserProfile(null);
              }
            });
      
            // Cleanup function to unsubscribe when the component unmounts
            return () => unsubscribe();
          }
     },[currentUser,isOnline])

     return [userProfile,setUserProfile]
}