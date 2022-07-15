import React, { useEffect, useContext } from 'react';
import '../App.css';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom'
import Cards from './cards-head';
import Footer from './Footer';
import Navbar from './navbar'
import {collection, getDocs, exists, getFirestore, } from 'firebase/firestore'
import { io } from "socket.io-client";





function Home(prop) {


  const socket = io('https://check-app-d.herokuapp.com')

  socket.on('receive', (arg) => {
console.log(arg);


  })


const db = getFirestore(prop.app)



//     getDocs(collection(db, "members")).then((querySnapshot) => {
  
//       querySnapshot.forEach((doc) => {
  
//         console.log(doc.data());

       
      
//       });
  
//     })
  

//  setInterval(() => {
  
//   fetch("https://check-app-d.herokuapp.com/deleteroom",)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));  
//  }, 2000);
  
  
  return (
    <div>

      <Navbar/>
      <Cards />
      <Footer />
    </div>
  );
}

export default Home;
