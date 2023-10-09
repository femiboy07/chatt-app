import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import { collection, doc, getDocs, getDocsFromCache,getDoc, getDocsFromServer, onSnapshot, query,where } from 'firebase/firestore';

import { firestore } from '../../../firebase/firebase'


export const fetchRooms=createAsyncThunk('Rooms/fetchRooms',async()=>{
  
       const roomRef=await getDocs(collection(firestore,'Rooms'));
        const rooms= roomRef.docs.flatMap((doc)=>([{id:doc.id,...doc.data()}]))
        const membersId=rooms.flatMap((room)=>room.members);
        console.log(membersId);
        if(!rooms || rooms.length === 0){
          return [];
        }
       
      

        return {rooms}
      
})

export const fetchRoomProfiles = createAsyncThunk(
  'Rooms/fetchRoomProfiles',
  async (roomId) => {
    const roomRef = doc(firestore, 'Rooms', roomId);
    const roomDoc = await getDoc(roomRef);
    console.log(roomDoc)

    if (!roomDoc.exists()) {
      throw new Error('Room not found');
    }

    const roomData = roomDoc.data();
    const memberIds = roomData.members;
    const profilesRef = collection(firestore, 'profile');
    const profileQuery = query(profilesRef, where('id', 'in', memberIds));

    const profiles = (
      await getDocs(profileQuery)
    ).docs.flatMap((doc) => {
      const profileData = doc.data();
      const entries = Object.entries(profileData);
      const filteredData = entries.filter(([key, value]) => key !== 'password');
      return [
        {
          id: doc.id,
          ...Object.fromEntries(filteredData),
          timestamp: profileData.timestamp.toDate().getTime(),
        },
      ];
    });

    return profiles;
  }
);

const savedSelectedRoom = localStorage.getItem('selectedRoom') ;

const Channels=createSlice({
  name:'Channels',
  initialState:{rooms:[],profiles:[],error:null,loading:false,selectedRoom:savedSelectedRoom !== null ? JSON.parse(savedSelectedRoom):{id:'welcome'}},
  reducers:{
    setSelectedRoom:(state,action)=>{
      state.selectedRoom=action.payload;
      localStorage.setItem('selectedRoom',JSON.stringify(action.payload))
    },

    clearSelectedRoom:(state,action)=>{
      state.selectedRoom={id:null,name:'',description:''};
      localStorage.removeItem('selectedRoom')
    },
    createRoom:(state,action)=>{
      state.rooms=[...state.rooms,action.payload];
    }
},

extraReducers:(builder)=>{
  builder.addCase(fetchRooms.pending,(state,action)=>{
    state.loading=true
  }).addCase(fetchRooms.fulfilled,(state,action)=>{
     state.loading=false;
     state.rooms=action.payload.rooms;
    
  }).addCase(fetchRooms.rejected,(state,action)=>{
    state.loading=false; 
    state.error=action.error.message;
  })
  builder.addCase(fetchRoomProfiles.pending,(state,action)=>{
      state.loading=true;

  }).addCase(fetchRoomProfiles.fulfilled,(state,action)=>{
      state.loading=false;
      state.profiles=action.payload;

  }).addCase(fetchRoomProfiles.rejected,(state,action)=>{
       state.loading=false;
       state.error=action.error.message;
  })
    
  
}
})
export const {setSelectedRoom,createRoom,clearSelectedRoom}=Channels.actions;
export default Channels.reducer;
