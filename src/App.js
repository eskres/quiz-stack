import React, {useState, useEffect} from 'react'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import Axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if(token != null){
      let user = jwt_decode(token);

      if(user)
      {
        setIsAuth(true);
        setUser(user);
      }
      else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false)
      }
    }

  }, [])

  const signUpHandler = (user) => {
    Axios.post("auth/signup", user)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    });
  }

  const signInHandler = (cred) => {
    Axios.post("auth/signin", cred)
    .then(response => {
      console.log(response.data.token);

      if(response.data.token != null){
        localStorage.setItem("token", response.data.token);
        let user = jwt_decode(response.data.token);
        setIsAuth(true);
        setUser(user);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  const onSignOutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMessage("Signed out successfully");
  }

  const errMessage = message ? (<div className='alert alert-success'>{message}</div>) : null

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Quiz Stack</a>
            <div className="collapse navbar-collapse" id="navbarsExample05">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className='nav-link' to="/">Home</Link>
                </li>
              {isAuth ? (
                <>
                  <li className="nav-item active">
                      <Link className='nav-link' to="#">My Profile</Link>
                  </li>
                  <li>
                    <Link className='nav-link' to="/signout" onClick={onSignOutHandler}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item active">
                    <Link className='nav-link' to="/signup">Sign Up</Link>
                  </li>
                  <li className="nav-item active">
                    <Link className='nav-link' to="/signin">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {errMessage}
      </div>
      <Routes>
          <Route path="/" element={ isAuth ? null : null}></Route>
          <Route path="/signup" element={<SignUp signUp={signUpHandler} />}></Route>
          <Route path="/signin" element={ isAuth ? null : <SignIn signIn={signInHandler}/>}></Route>
        </Routes>
    </Router>
  )
}