// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtWzZT0NZX1iXb9u7Qz7NTJHAz_eEL0oo",
  authDomain: "fernweh-2db0f.firebaseapp.com",
  databaseURL: "https://fernweh-2db0f-default-rtdb.firebaseio.com",
  projectId: "fernweh-2db0f",
  storageBucket: "fernweh-2db0f.appspot.com",
  messagingSenderId: "866510266859",
  appId: "1:866510266859:web:f0dd5f1c1099c9a9f4f9ae",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
