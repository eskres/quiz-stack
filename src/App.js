import React, {useState, useEffect} from 'react'
import SignIn from './user/SignIn'
import SignUp from './user/SignUp'
import CategoryList from './quiz/CategoryList'
import CategoryQuestions from './quiz/CategoryQuestions'
import {BrowserRouter as Router, Route, Routes, Link, Redirect} from "react-router-dom"
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import Home from './Home'
import Footer from './Footer'
import Profile from './user/Profile'

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

  const scoreHandler = (user, score, category) => {
    Axios.post("/score/create/", {user: user, score: score, category: category })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    });
  }

  const errMessage = message ? (<div className='alert alert-success'>{message}</div>) : null

  return (
    <>
    <div className='container bg-transparent'>
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg mb-5">
          <Link className="navbar-brand" to="/">Quiz Stack</Link>
            <div className="navbar-nav collapse navbar-collapse justify-content-end" >

              {isAuth ? (
                <>
                  <Link className='nav-link' to="/">Home</Link>
                  <Link className='nav-link' to="/quiz">Quizzes</Link>
                  <Link className='nav-link' to="/myProfile">My Profile</Link>
                  <Link className='nav-link' to="/signout" onClick={onSignOutHandler}>Logout</Link>
                </>
              ) : (
                <>
                  <div class="nav-item dropstart">
                    <a type="button" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                      Sign Up
                    </a>
                    <SignUp signUp={signUpHandler}/>
                  </div>
                  <div class="nav-item dropstart">
                    <a type="button" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                      Sign In
                    </a>
                    <SignIn signIn={signInHandler}/>
                  </div>
                </>
              )}
          </div>
        </nav>
        {errMessage}
        
      </div>
      <Routes>
          <Route path="/" element={ isAuth ? <Home/> : <Home/>}></Route>
          <Route path="/myProfile" element={ isAuth ? <Profile user={user.user}/> : null}></Route>
          <Route path="/quiz" element={ isAuth ? <CategoryList/> : null }></Route>
          <Route path="/quiz/:id" element={<CategoryQuestions scoreHandler={scoreHandler} user={user.user}/>}></Route>
      </Routes>
    </Router>
    </div>
    {/* <Footer/> */}
    </>
    
  )
}