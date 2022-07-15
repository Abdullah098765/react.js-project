import { Route, Routes, } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import Home from './comp/Home';
import AboutUs from './comp/About-us';
import ContactUs from './comp/contacus';
import Navbar from './comp/navbar';
import Room from './comp/room'
import { AppContext } from './comp/contextApl';
function App() {

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navbar app={app} />} />
        <Route path="/about-us" element={<Navbar app={app} />} />
        <Route path="/home" element={<Home app={app} />} />
        <Route path="" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="room:id" element={<Room />} />
      </Routes>


      {/* <Home />
<AboutUs />
<ContactUs /> */}
    </div>
  );
}

export default App;
