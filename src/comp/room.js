import React from 'react';
import '../App.css'
import { useEffect, useState } from 'react'
import { collection, addDoc, getFirestore, where, query, orderBy, deleteDoc, doc, getDoc, getDocs, setDoc, } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import Members from './members';
import { io } from "socket.io-client";
import { Smile } from 'react-feather';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Picker from 'emoji-picker-react';
import * as Scroll from 'react-scroll';

function Room() {

  const [chosenEmoji, setChosenEmoji] = useState(null);


  const socket = io('https://check-app-d.herokuapp.com')






  var url = window.location.href
  var id = url.substring(url.lastIndexOf(':') + 1);

  const [roomData, setData] = useState({})
  const [message, setMessage] = useState('')
  const [members, setMembers] = useState([])
  const [length, setLength] = useState(0)


  const firebaseConfig = {
    apiKey: "AIzaSyCmpqOzl80y01bEgUoJ8P5QNHjfh9-VF2Y",
    authDomain: "yaromeha-app.firebaseapp.com",
    projectId: "yaromeha-app",
    storageBucket: "yaromeha-app.appspot.com",
    messagingSenderId: "460269542777",
    appId: "1:460269542777:web:50fef46c9b05ab6711a3a8",
    measurementId: "G-49QXQF2J91"
  };
  const app = initializeApp(firebaseConfig);


  const auth = getAuth(app)
  const db = getFirestore();

  const messageRef = collection(db, 'messages');
  const q1 = query(messageRef, orderBy("createdAt",),);
  const q = query(messageRef, where("roomId", "==", id),);
  const [newMessages] = useCollectionData(q1,);

  const membersRef = collection(db, 'members');
  const mq = query(membersRef, where("groupId", "==", id));


  var scroll = Scroll.animateScroll;


  const [newMembers] = useCollectionData(mq);

  // setMembers(newMembers)



  useEffect(() => {



    setTimeout(() => {
      let a = {
        memberName: auth.currentUser.displayName,
        memberProfilePic: auth.currentUser.photoURL,
        groupId: id,
        memberId: auth.currentUser.uid
      }
      const docSnap = setDoc(doc(db, "members", auth.currentUser.uid), a)

      docSnap.then((docSnap) => {
        console.log(docSnap);
      })
      const handleTabClose = event => {
        event.preventDefault();

        console.log('beforeunload event triggered');

        deleteDoc(doc(db, "members", auth.currentUser.uid)).then((a) => {
          console.log(a);
        })

        socket.emit('send', id)

        return (event.returnValue = 'Are you sure you want to exit?');
      };

      window.addEventListener('beforeunload', handleTabClose);

      return () => {
        window.removeEventListener('beforeunload', handleTabClose);


      };




    }, 1000);

  }, [])



  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://check-app-d.herokuapp.com/roomdata", requestOptions)
      .then(response => response.text())
      .then(result => {
        setData(JSON.parse(result))
      })
      .catch(error => console.log('error', error));



  }, [])


  // useEffect(()=>{






  //   getDocs(collection(db, "members")).then((querySnapshot) => {

  //         querySnapshot.forEach((doc) => {

  //           console.log(doc.exists());
  // })

  // })



  //   // if (doc.exists()) {
  //   // }
  //   // else{
  //   //   var myHeaders = new Headers();
  //   //   myHeaders.append("Content-Type", "application/json");

  //   //   var raw = JSON.stringify({
  //   //     id,
  //   //     a:'Pooaaaana'
  //   //   });
  //   //   var requestOptions = {
  //   //     method: 'POST',
  //   //     headers: myHeaders,
  //   //     body: raw,
  //   //     redirect: 'follow'
  //   //   };

  //   //   fetch("https://check-app-d.herokuapp.com/deleteroom", requestOptions)
  //   //     .then(response => response.text())
  //   //     .then(result => console.log(result))
  //   //     .catch(error => console.log('error', error));
  //   // }



  // })

  function sendMeassege(params) {

    if (message !== '') {
      const timestamp = Date.now();

      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = dayNames[date.getDay()]

        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + day;
        return strTime;
      }


      addDoc(messageRef, {
        message: message,
        createdAt: timestamp,
        roomId: id,
        typerId: auth.currentUser.uid,
        typerPic: auth.currentUser.photoURL,
        time: formatAMPM(new Date)




      })
      setMessage('')
    scroll.scrollToBottom();
    }

  }

  const onEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject);
    setChosenEmoji(emojiObject);
    // String.fromCodePoint(parseInt('1f976'))
    console.log(event);
  };


  function onEnter(e) {
    if (e.code === 'Enter') {
      sendMeassege()
    }
  }




  function leaveRoom(params) {
    deleteDoc(doc(db, "members", auth.currentUser.uid)).then((a) => {
    })
  }

  return (
    <div>
      <div>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <button className='btn btn-scendary' onClick={() => leaveRoom()}>Leave Room</button>     <h4>Recent Members </h4>

                </div>
              </div>
              <div className="inbox_chat">


                {newMembers && newMembers.map((item) => (
                  <div >
                    <Members newMembers={item} />
                  </div>))}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {newMessages && newMessages.map((item) => (
                  auth.currentUser.uid === item.typerId ? <div key={item.createdAt} className="outgoing_msg">
                    <div className="sent_msg ">
                      <p className="bg-secondary">{item.message}</p>
                      <span className="time_date"> {item.time}</span> </div>
                  </div> : <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img className='rounded-circle' src={item.typerPic} alt="sunil" /> </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{item.message}</p>
                        <span className="time_date">{item.time}</span></div>
                    </div>
                  </div>
                ))}

              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input value={message} onKeyPress={(e) => onEnter(e)} onChange={(e) => setMessage(e.target.value)} type="text" className="write_msg" placeholder={"Type a message"} />
                  <div>
                    {/* {chosenEmoji ?
                      <Picker onEmojiClick={(event) => onEmojiClick(event)} /> : <Smile onClick={() => setChosenEmoji(true)} />
                    } */}
                  </div>
                  <button onClick={() => sendMeassege()} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    </div>
  );
}

export default Room;
