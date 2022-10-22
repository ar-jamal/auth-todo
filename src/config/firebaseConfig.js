// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHqU5jZtBVzUqamQrcVZFVvrEWb-f1_3U",
  authDomain: "todo-authentication-d24db.firebaseapp.com",
  projectId: "todo-authentication-d24db",
  storageBucket: "todo-authentication-d24db.appspot.com",
  messagingSenderId: "471397567057",
  appId: "1:471397567057:web:09b97be6b8cee51b8f4670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;