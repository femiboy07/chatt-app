import {initializeApp} from "firebase/app";
import  {enableIndexedDbPersistence, enableMultiTabIndexedDbPersistence, getFirestore, initializeFirestore} from "firebase/firestore";
import {getAuth, indexedDBLocalPersistence, signInWithEmailAndPassword} from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyARJAi4P-YS1nqzlXBY3ipXLGzfk_QILcg",
    authDomain: "chatt-app-1c551.firebaseapp.com",
    projectId: "chatt-app-1c551",
    storageBucket: "chatt-app-1c551.appspot.com",
    messagingSenderId: "132263217704",
    appId: "1:132263217704:web:c1800023cc37f9a332031d",
    measurementId: "G-2ESC1LX5N6"
};
  

  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);
  // eslint-disable-next-line no-undef
  const firestore=getFirestore(app)
  
  enableIndexedDbPersistence(firestore).catch((err)=>{
     if(err.code === 'failed-preondition'){
      console.log('failed-condition')
     }else if(err.code === 'unimplemented'){
       console.log('unimplemented')
     }

  })

  

  export {auth,firestore};

 