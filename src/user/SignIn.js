import React, { useState } from 'react'

export default function SignIn(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const signInHandler = () => {
        props.signIn(newUser)
    }

  return (
    <div className='container'>
        <h1>Sign In</h1>
        <div className='container'>
        <form className='form-floating'>
                <input className='form-control' name="emailAddress" id="floatingInput" placeholder="name@example.com" onChange={changeHandler}></input>
                <label for="floatingInput">Email Address</label>
            </form>
            <form className='form-floating'>
                <input className='form-control'name="password" type="password" id="floatingPassword" placeholder="Password" onChange={changeHandler}></input>
                <label for="floatingPassword">Password</label>
            </form>
            <button className='btn btn-primary' onClick={signInHandler}>
                Sign In
            </button>
        </div>
    </div>
  )
}