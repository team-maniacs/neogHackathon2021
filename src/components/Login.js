import React, { useEffect } from "react";
import { useAuth } from "../context/user-context";
import { auth, provider } from "../firebase";

const Login = () => {
  const { dispatch, login } = useAuth();

  const loginHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({ type: "SET_USER", payload: res.user });

        localStorage.setItem("userDetails", JSON.stringify(res.user));
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    const data = JSON.parse(localStorage?.getItem("userDetails"));
    console.log(data);
    if (data) {
      dispatch({ type: "SET_USER", payload: data });
      dispatch({ type: "LOGIN" });
    }
  }, [dispatch]);
  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={loginHandler}>{login ? "Logout" : "Log In"}</button>
    </div>
  );
};

export default Login;
