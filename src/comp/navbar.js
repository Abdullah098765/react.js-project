import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'



function Navbar(prop) {

  const auth = getAuth(prop.app);
  const provider = new GoogleAuthProvider();


  function addUser() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        let userData = {
          fullName: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          uid: result.user.uid,

        }
        const db = getFirestore()
        try {
          const docRef = addDoc(collection(db, "users",), userData)
          docRef.then((value) => {
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        // ...
      }).catch((error) => {
        console.log(error);
      });




  }


  function logout() {
    signOut(auth).then(() => {
      console.log('Sign-out successful');
    }).catch((error) => {
      // An error happened.
    });
  }

  const [user] = useAuthState(auth)

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link to='/' className='navbar-brand text-light'>Home</Link>
          <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='about-us' className='nav-link active text-light'>About</Link>

              </li>
              <li className="nav-item">
                <Link to='contact-us' className='nav-link text-light'>Contact Us</Link>

              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link to='contact-us' className='dropdown-item'>Contact Us</Link></li>
                  <li><Link to='about-us' className='dropdown-item'>About Us</Link></li>
                  <li><hr className="dropdown-divider" /></li>


                </ul>
              </li>
              <li><Link to='home' className='dropdown-item'>Home</Link></li>


            </ul>


            {user ? <div>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={auth.currentUser.photoURL} alt="Avatar" width="40" height="40" className="rounded-circle" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" onClick={() => logout()}>Logout</a></li>
                </ul>
              </div>

            </div> : <div><button type="button" onClick={() => addUser()} className="btn btn-light btn-sm ">Sign in</button></div>}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
