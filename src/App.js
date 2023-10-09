import React,{useEffect, useState} from 'react';
import './index.css';
import Layout from './components/Layout/Layout.component';
import useUserAuth from './Context/userContext';
import LoginPage from './Page/LoginPage/LoginPage.page';
import useOnlineStatus from './Hooks/useOnlineStatus';



function App() {
  const isOnline=useOnlineStatus()
  const {user}=useUserAuth();
 
  
return (

    <div className='bg-[#252329] h-[100%] w-full'>
      {user === null ? <LoginPage/> :<Layout />}
    </div>
  );
}

export default App;
