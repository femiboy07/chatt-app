import React, { useEffect,useState,useRef, useLayoutEffect } from "react";
import {getStorage,ref, uploadBytesResumable,getDownloadURL, uploadBytes, getMetadata} from 'firebase/storage'
import { auth, firestore } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import useUserAuth from "../../Context/userContext";
import { doc, updateDoc } from "firebase/firestore";
import useOnlineStatus from "../useOnlineStatus";

export const useUploadImage = (file) => {
  const [progress, setProgress] = useState(0);
  const [ download, setDownloadUrl ] = useState('');
  const isOnline=useOnlineStatus();
  const {user}=useUserAuth()
  
 

 
  useEffect(() => {
    let uploadTaskRef;

    const startUploadTask = async () => {
      const storage = getStorage();
      const uniqueFileName = `timestamp=${Date.now()}`;
      const uniquePath = `images/${auth.currentUser.uid}`
      const storageRef = ref(storage, uniquePath)

      try {
        uploadTaskRef = uploadBytesResumable(storageRef, file);

        uploadTaskRef.on(
          'state_changed',
          (snapShot) => {
            const newProgress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
            setProgress(newProgress);
          },
          (error) => {
            console.error('Error during upload:', error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTaskRef.snapshot.ref);
              
              console.log('File available at', downloadURL);
              const userRef = doc(firestore, 'profile', auth.currentUser.uid);
              if(isOnline && user.uid){
              await updateDoc(userRef, { ImageUrl: downloadURL + `?timestamp= ${Date.now()}` });
              }else{
                console.log('No network, canceling upload.');
                uploadTaskRef.cancel(); // Cancel the upload task
                
              }
            } catch (error) {
              console.error('Error getting download URL:', error);
            }
          }
        );
      } catch (error) {
        console.error('File does not exist or could not be accessed:', error);
      }
    };

    const uploadAndSetImageUrl = async () => {
      
        await startUploadTask();
        // Wait for a short time (e.g., 1 second) before resolving
        await new Promise(resolve => setTimeout(resolve, 1000));
        // You can clear the progress or perform any other cleanup if needed
        setProgress(0);
    
    };
    if(file && isOnline){
      uploadAndSetImageUrl();
    }

   
    return () => {
      // Cleanup: Cancel the upload task when the component unmounts or as needed
      if (uploadTaskRef) {
        uploadTaskRef.cancel();
      }
    };

  }, [file, isOnline, user.uid]);
 


  return [progress,isOnline];
};