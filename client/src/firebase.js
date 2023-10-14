import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU2Nzkhid3hO - lnIR - B - fYc5gzz28GWYA",
  authDomain: "easyhomes-c4146.firebaseapp.com",
  projectId: "easyhomes-c4146",
  storageBucket: "easyhomes-c4146.appspot.com",
  messagingSenderId: "522091435438",
  appId: "1:522091435438:web:4e0fddf8c33f39f053243f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
