import React from "react";
import { Link } from "react-router-dom";
import './card.css'
import { collection, addDoc, getFirestore, where, query, orderBy, deleteDoc  } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'



export const  Card = (prop) => {
    const db = getFirestore();


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

    const membersRef = collection(db, 'members');
    const q = query(membersRef, where("groupId", "==", prop.cardData.id),);

    
    const [newMembers] = useCollectionData(q,);

    function joinNow(params) {
        window.open('http://localhost:3000/room:' + prop.cardData.id)
    }
    return (

        <div className="container">
            <div className="card-row">
                <div className="col-lg-13">
                    <div className="card m-b-30">
                        <div className="card-body">
                            <div className="media">
                                <img className="d-flex mr-3 rounded-circle img-thumbnail thumb-lg" src={prop.cardData.ownerPicture} alt="Group Creator " />
                                <div className="media-body">
                                    <h6 className="text-muted font-18">{prop.cardData.groupText}</h6>
                                    <p className="mt-0 font-18 mb-1">Created by  <b>{prop.cardData.ownerName}</b> | |  Group Language <b>{prop.cardData.groupLanguage}</b>.
                                    </p>

                                    <div className="avatars">
                                        {newMembers && newMembers.map((item) => (
                                            <span className="avatar">
                                                <img src={item.memberProfilePic} width="40" height="40" />
                                            </span>


                                        ))}

                                    </div>

                                </div>
                                <button className="btn btn-secondary mt-5" onClick={() => joinNow(prop.cardData.Id)}>Join now</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}