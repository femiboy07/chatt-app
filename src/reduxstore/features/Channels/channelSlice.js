import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import { collection, doc, getDocs, getDocsFromCache } from 'firebase/firestore';
import { firestore } from '../../../firebase/firebase'


export const fetchRooms = createAsyncThunk('Rooms/fetchRooms', async (searchTerm) => {
  const roomRef = await getDocs(collection(firestore, 'Rooms'));
  const rooms = roomRef.docs.flatMap((doc) => [{ id: doc.id, ...doc.data() }]);
  const membersId = rooms.flatMap((room) => room.members);

  if (!rooms || rooms.length === 0) {
    return [];
  }

  // If a search term is provided, filter the rooms based on the search term
  const filteredRooms = searchTerm
    ? rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : rooms;
    await new Promise((resolve) => setTimeout(resolve, 5000));

  return { rooms: filteredRooms };
});


export const fetchImage=createAsyncThunk('Rooms/fetchImage',async(userId)=>{
     const profileRef=doc(firestore,"profile",userId);
     const docSnap=await getDocsFromCache(profileRef)
     if(docSnap.exists){
      const image=docSnap.data().ImageUrl;
      return image
     }
     

     
})



const savedSelectedRoom = localStorage.getItem('selectedRoom') ;

const Channels=createSlice({
  name:'Channels',
  initialState:{rooms:[],profiles:[],profileImage:'',error:null,loading:false,selectedRoom:savedSelectedRoom !== null ? JSON.parse(savedSelectedRoom):{id:'welcome'}},
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
      
    },

    updateRoom:(state,action)=>{
      const updatedRoom=action.payload;
     state.rooms=state.rooms.map((room)=>room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room)

    },

    deleteRoom:(state,action)=>{
      const deletedRoom=action.payload;
      state.rooms=state.rooms.filter((room)=>room.id !== deletedRoom.id);

      
    },
    setProfiles:(state,action)=>{
      const newProfile = action.payload;



      // Check if the profile already exists in the array
      const existingProfileIndex = state.profiles.findIndex(profile => profile.id === newProfile.id);
    
      if (existingProfileIndex !== -1) {
        // If the profile exists, update it
        state.profiles[existingProfileIndex] =newProfile ;
      }else{
        state.profiles.push(newProfile)
      } 
      

    },
    updateProfile: (state, action) => {
      const updatedProfile = action.payload;
      state.profiles = Array.isArray(state.profiles) ? state.profiles : [];
      const existingProfileIndex = state.profiles.findIndex(profile => profile.id === updatedProfile.id);
      if (existingProfileIndex !== -1) {
        // If the profile exists in the state, update it
        state.profiles[existingProfileIndex] = updatedProfile;
      } 
    },

    clearProfile:(state,action)=>{
      state.profiles=[];
    },

    setProfileImage:(state,action)=>{
       state.profileImage=action.payload;
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

  builder.addCase(fetchImage,(state,action)=>{
    state.loading=true;
  }).addCase(fetchImage.fulfilled,(state,action)=>{
    state.loading=false;
    state.profileImage=action.payload
  }).addCase(fetchImage.rejected,(state,action)=>{
    state.loading=false;
    state.error=action.error.message;
  })
  
    
  
}
})
export const {setSelectedRoom,createRoom,clearSelectedRoom,setProfiles,updateProfile,clearProfile,updateRoom,deleteRoom}=Channels.actions;
export default Channels.reducer;
