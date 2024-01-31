import { doc, onSnapshot,collection,query,where,getDocFromServer,getDoc } from "firebase/firestore";
import React, { useEffect ,useState,useRef, useCallback} from "react";
import { auth, firestore} from "../../firebase/firebase";
import { useUploadImage } from "./useUploadImage";
import useUserAuth from "../../Context/userContext";

// export const useGetProfileImage = () => {
//      const [profile, setProfile] = useState(null);
//      const uniqueProfileIds = useRef(new Set());
    
     

//      const fetchAndSubscribe = useCallback(async () => {
//           try {
//             console.log('Fetching and subscribing...');
//           //  const roomRef = doc(firestore, 'Rooms', roomId);
//           //     const roomDoc = await getDoc(roomRef);
      
//           //     if (!roomDoc.exists()) {
//           //       throw new Error('Room not found');
//           //     }
      
//           //     const roomData = roomDoc.data().members;
//             const profilesRef = collection(firestore, 'profile');
//             const profileQuery = query(profilesRef, where('id', '==', auth.currentUser.uid));
          
//             const unsubscribe = onSnapshot(
//               profileQuery,
//               { includeMetadataChanges: true },
//               (snapShot) => {
//                 snapShot.docChanges().forEach((change) => {
//                   const data = change.doc.data();
//                   const profileData = change.doc.data();
//                   const entries = Object.entries(profileData);
//                   const filteredData = entries.filter(([key, value]) => key !== 'password');
//                   console.log(filteredData)
//                   const updatedProfile = {
//                     id: change.doc.id,
//                     ...data
//                   //     ImageUrl: imageUrl,
   
//                     // Add other profile properties as needed
//                   };
      
//                   if (change.type === 'added' && change.type === 'modified') {
//                     // Add new profile to the state and set
//                     console.log(profile)
//                     setProfile(updatedProfile);
                    
                  
//                   } 

//                 });
//               }
//             );
      
//             return () => {
//               // Cleanup listener on unmount
              
//               unsubscribe();
//             };
//           } catch (error) {
//             console.error('Error fetching profiles:', error);
//           }
//         },[]);
   
//      useEffect(() => {
          
//            fetchAndSubscribe();
     
//      }, [fetchAndSubscribe]);
   
//      return [profile,fetchAndSubscribe];
//    };