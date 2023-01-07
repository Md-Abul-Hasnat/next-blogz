import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAILoqNYMI-dCL1iqd1PM6PFXB47s4SL8E",
  authDomain: "next-blogz.firebaseapp.com",
  projectId: "next-blogz",
  storageBucket: "next-blogz.appspot.com",
  messagingSenderId: "1037134576888",
  appId: "1:1037134576888:web:4a8385d6d9d42f75100f0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
