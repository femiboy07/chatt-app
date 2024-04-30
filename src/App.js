import React,{useEffect, useState} from 'react';
import './index.css';
import Layout from './components/Layout/Layout.component';
import useUserAuth from './Context/userContext';
import LoginPage from './Page/LoginPage/LoginPage.page';
import useOnlineStatus from './Hooks/useOnlineStatus';
import { ToastContainer } from 'react-toastify';



function App() {
  const isOnline=useOnlineStatus()
  const {user}=useUserAuth();


  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  },[])
 
  
return (

    <div className='bg-[#252329] relative  flex justify-center mx-auto items-center flex-col h-screen w-full overflow-y-auto'>
      {user === null ? <LoginPage/> :<Layout />}
     
    </div>
  );
}

export default App;
