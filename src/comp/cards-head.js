import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom'
import {Card} from './cards';
import { useState, } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

function  Cards(a) {
  const [cardsData, setData] = useState([])
  const [checkModal, setModal] = useState(false)
  const [gl, setgl] = useState('')
  const [gt, setgt] = useState('')


  useEffect(() => {
    setInterval(() => {
      fetch("https://check-app-d.herokuapp.com/room")
        .then(response => response.text())
        .then(result => {
          setData(JSON.parse(result))
        })
        .catch(error => console.log('error', error));
    }, 1000);
  }, [])

  function groupInfo(event) {
    if (event.target.name === 'language') {
      let groupLanguage = event.target.value
      setgl(groupLanguage);
    }
    else {
      let groupText = event.target.value
      setgt(groupText);
    }

  }



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


  function createGroup() {
    setModal(false)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      groupLanguage: gl,
      groupText: gt,
      id: auth.currentUser.uid,
      ownerName:auth.currentUser.displayName,
      ownerPicture:auth.currentUser.photoURL,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://check-app-d.herokuapp.com/room", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.open('http://localhost:3000/room:' + auth.currentUser.uid)
  }

  return (

    <section className='section bg-c-grey border-top pb-4'>

      <div className='container'>
        <div className='row'>
          <div className='col-md-12 mb-4 mt-5 text-center'>
            <div><Button onClick={() => { setModal(true) }} className='btn btn-secondary text-center mb-4'>Create your own group</Button>
              <Modal show={checkModal}>
                <Modal.Header>
                  Group Info
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Write something</Form.Label>
                    <Form.Control onChange={(e) => groupInfo(e)} placeholder="Optional" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Select a Language</Form.Label>
                    <Form.Select name='language' onChange={(e) => groupInfo(e)} >
                      <option>None</option>
                      <option value="Afrikaans">Afrikaans</option>
                      <option value="Albanian">Albanian</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Armenian">Armenian</option>
                      <option value="Basque">Basque</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Bulgarian">Bulgarian</option>
                      <option value="Catalan">Catalan</option>
                      <option value="Cambodian">Cambodian</option>
                      <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                      <option value="Croatian">Croatian</option>
                      <option value="Czech">Czech</option>
                      <option value="Danish">Danish</option>
                      <option value="Dutch">Dutch</option>
                      <option value="English">English</option>
                      <option value="Estonian">Estonian</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finnish">Finnish</option>
                      <option value="French">French</option>
                      <option value="Georgian">Georgian</option>
                      <option value="German">German</option>
                      <option value="Greek">Greek</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Hebrew">Hebrew</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Hungarian">Hungarian</option>
                      <option value="Icelandic">Icelandic</option>
                      <option value="Indonesian">Indonesian</option>
                      <option value="Irish">Irish</option>
                      <option value="Italian">Italian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Javanese">Javanese</option>
                      <option value="Korean">Korean</option>
                      <option value="Latin">Latin</option>
                      <option value="Latvian">Latvian</option>
                      <option value="Lithuanian">Lithuanian</option>
                      <option value="Macedonian">Macedonian</option>
                      <option value="Malay">Malay</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Maltese">Maltese</option>
                      <option value="Maori">Maori</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Mongolian">Mongolian</option>
                      <option value="Nepali">Nepali</option>
                      <option value="Norwegian">Norwegian</option>
                      <option value="Persian">Persian</option>
                      <option value="Polish">Polish</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Quechua">Quechua</option>
                      <option value="Romanian">Romanian</option>
                      <option value="Russian">Russian</option>
                      <option value="Samoan">Samoan</option>
                      <option value="Serbian">Serbian</option>
                      <option value="Slovak">Slovak</option>
                      <option value="Slovenian">Slovenian</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Swahili">Swahili</option>
                      <option value="Swedish ">Swedish </option>
                      <option value="Tamil">Tamil</option>
                      <option value="Tatar">Tatar</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Thai">Thai</option>
                      <option value="Tibetan">Tibetan</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Turkish">Turkish</option>
                      <option value="Ukrainian">Ukrainian</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Uzbek">Uzbek</option>
                      <option value="Vietnamese">Vietnamese</option>
                      <option value="Welsh">Welsh</option>
                      <option value="Xhosa">Xhosa</option>
                    </Form.Select>
                  </Form.Group>


                </Modal.Body>
                <Modal.Footer>
                  <Button className='btn btn-light' onClick={() => { setModal(false) }}>Cancel</Button>
                  <Button className='btn btn-secondary' onClick={() => createGroup()}>
                    Create Group
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <h3 className='main-heading'>Active Rooms</h3>
            <div className='underline mx-auto'></div>
          </div>

          {cardsData.map((item) => (

            <Card cardData={item}></Card>


          ))}


        </div>

      </div>
    </section>
  );
}


export default Cards;