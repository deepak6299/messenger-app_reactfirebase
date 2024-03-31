import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4IwtauDH4TGd0RrKV4GZDYCgptfWpOsM",
  authDomain: "react-messenger-app-95872.firebaseapp.com",
  databaseURL: "https://react-messenger-app-95872-default-rtdb.firebaseio.com",
  projectId: "react-messenger-app-95872",
  storageBucket: "react-messenger-app-95872.appspot.com",
  messagingSenderId: "842579775818",
  appId: "1:842579775818:web:73e1551f0fef8e5a0d71b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
