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
        <>
            <form className="dropdown-menu p-3">
                <h6 class="dropdown-header pb-2 px-0">Welcome back!</h6>
                <div className='form-floating mb-3'>
                    <input className='form-control' name="emailAddress" id="floatingInput" placeholder="name@example.com" onChange={changeHandler}></input>
                    <label for="floatingInput">Email Address</label>
                </div>
                <div className='form-floating mb-3'>
                    <input className='form-control'name="password" type="password" id="floatingPassword" placeholder="Password" onChange={changeHandler}></input>
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="button" className='btn btn-success' onClick={signInHandler}>
                    Sign In
                </button>
            </form>
        </>
      )
    }