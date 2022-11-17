import React, { useState } from 'react'

export default function SignUp(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const signUpHandler = () => {
        props.signUp(newUser)
    }

  return (
    <>
        <form className="dropdown-menu p-3">
            <h6 class="dropdown-header pb-2 px-0">Join the scrum!</h6>
            <div className='form-floating mb-3'>
                <input className='form-control' name="emailAddress" id="floatingInput" placeholder="name@example.com" onChange={changeHandler}></input>
                <label for="floatingInput">Email Address</label>
            </div>
            <div className='form-floating mb-3'>
                <input className='form-control'name="password" type="password" id="floatingPassword" placeholder="Password" onChange={changeHandler}></input>
                <label for="floatingPassword">Password</label>
            </div>
            <button type="button" className='btn btn-success' onClick={signUpHandler}>
                Sign Up
            </button>
        </form>
    </>
  )
}