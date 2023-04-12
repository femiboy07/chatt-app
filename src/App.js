import React,{useEffect, useState} from 'react';
import './index.css';
import Layout from './components/Layout/Layout.component';
import useUserAuth from './Context/userContext';
import LoginPage from './Page/LoginPage/LoginPage.page';
import useOnlineStatus from './Hooks/useOnlineStatus';



function App() {
  const isOnline=useOnlineStatus()
  const {user}=useUserAuth();
  // const [users,setUser]=useState(user);

  // useEffect(()=>{
  //   setUser(user);
     
  // },[user])
  
return (

    <div className='bg-[#252329] h-[100%]'>
      {user === null ? <LoginPage/> :<Layout />}
      {/* {isOnline ? <h1>online</h1>:<h1>offline</h1>} */}
      
    </div>
  );
}

export default App;
