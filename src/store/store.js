import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "../reduxstore/features/Channels/channelSlice";
import MessagesSlice from "../reduxstore/features/Messages/MessagesSlice";



const store= configureStore({
    reducer:{
       rooms:channelSlice,
       message:MessagesSlice
    }
})

export default store;