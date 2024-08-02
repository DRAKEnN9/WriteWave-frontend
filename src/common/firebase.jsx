
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDV9gJYyXG5nfyEWNyTvH7EyDavef2EYKw",
  authDomain: "blog-site-6063d.firebaseapp.com",
  projectId: "blog-site-6063d",
  storageBucket: "blog-site-6063d.appspot.com",
  messagingSenderId: "267612416559",
  appId: "1:267612416559:web:a27b0af0887d10bec234da"
};


const app = initializeApp(firebaseConfig);

// google auth 

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;
    
    await signInWithPopup(auth, provider)
    .then((result) =>{
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user; 
}