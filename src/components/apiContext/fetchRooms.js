import { collection, onSnapshot } from "firebase/firestore"
import React, { useEffect } from "react"
import { firestore } from "../../firebase/firebase"
import { deleteRoom, fetchRooms, updateRoom } from "../../reduxstore/features/Channels/channelSlice";





export const fetchRoomsRealTime=(dispatch)=>{

     
     const roomsRef=collection(firestore,'Rooms');
     const unsubscribe=onSnapshot(roomsRef,{includeMetadataChanges:true},(snapshot)=>{
       // eslint-disable-next-line array-callback-return
       snapshot.docChanges().flatMap((changes)=>{
          // const roomData=changes.doc.data();
          if(changes.type === 'added' || changes.type === 'modified' ){
               const newRoom = { id: changes.doc.id, ...changes.doc.data() };
               dispatch(updateRoom(newRoom));
          }else if(changes.type === 'removed'){
               const deletRoom=changes.doc.id;
               dispatch(deleteRoom(deletRoom));
          }
       })
     })


     return  unsubscribe;


}