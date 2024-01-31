import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import './font.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { FirebaseProvider } from './firebase/firebase';
import Channel from './components/Channel/Channel.component';
import SideBar from './components/SideBar/SideBar.component';
import Channels from './components/Channels/Channels.component';
import LoginPage from './Page/LoginPage/LoginPage.page';
import { AuthContextProvider } from './Context/userContext';
import RegisterPage from './Page/RegisterPage/RegisterPage.page';
import store from './store/store';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import HomePage from './Page/HomePage/HomePage.page';





const router=createBrowserRouter([
  {
   path:'/',
   element:<App/>,
   children:[
    {
      path:'channel/:id',
        element:<Channel/>
        },
        {
          path:'/allChannel/',
          element:<Channels/>,
          children:[
            {
            path:'homePage',
            element:<HomePage/>
            }
          ]
        },
       
      
      ]
},
  {
    path:'auth/login',
    element:<LoginPage/>
  },
  {
    path:'register',
    element:<RegisterPage/>
  },
  

 
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider >
    <RouterProvider  router={router} ></RouterProvider>
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
