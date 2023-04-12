import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addDoc,setDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import {v4 as uuidv4} from 'uuid'
import { useSelector } from "react-redux";



  

export const createMessage = createAsyncThunk(
  'Messages/createMessage',
  async ({ roomId, messageData }, { dispatch }) => {
    console.log(roomId, messageData);
    const id=uuidv4()
     await setDoc(doc(firestore, `Rooms/${roomId}/Messages`,id),messageData);

    if (
      messageData.timestamp instanceof Date &&
      typeof messageData.timestamp.toDate === 'function'
    ) {
      const newMessage = {
        id,
        ...messageData,
        timestamp: messageData.timestamp.toDate().getTime(),
      };
      dispatch(addMessage(newMessage));
      return newMessage;
    } else {
      const newMessage = { id, ...messageData };
      dispatch(addMessage(newMessage));
      return newMessage;
    }
  }
);







const Messages=createSlice({
    name:'Messages',
    initialState:{messages:[],loading:false,error:null},
    reducers:{
      addMessage: (state, action) => {
        state.messages.push(action.payload) 
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
      },
    },
  
  extraReducers:(builder)=>{
    builder.addCase(createMessage.pending,(state,action)=>{
      state.loading=true;
    }).addCase(createMessage.fulfilled,(state,action)=>{
       state.loading=false;
       state.messages=action.payload
    }).addCase(createMessage.rejected,(state,action)=>{
      state.loading=false; 
      state.error=action.error.message;
       
    });
  }
  })
  export const {addMessage,setMessages}=Messages.actions;
  
  export default Messages.reducer;