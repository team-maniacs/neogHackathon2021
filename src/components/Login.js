import React from 'react'
import { useAuth } from '../context/user-context';
import { auth, provider } from '../firebase';

const Login = () => {

    const { dispatch } = useAuth();

    const login = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then(res => {
                dispatch({ type: "SET_USER", payload: res.user })
            })
            .catch((err => alert(err.message)))
    }

    return (
        <div>
            <h1>Login with Google</h1>
            <button onClick={login}>Log In</button>
        </div>
    )
}

export default Login
