import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/user-context";
import db, { auth, provider } from "../firebase";

const Login = () => {
  const { dispatch, login } = useAuth();
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({ type: "SET_USER", payload: res.user });
        db.collection("users").doc(res.user.uid).set({
          id: res.user.uid,
          username: res.user.displayName,
          rooms: [],
        });
        localStorage.setItem("userDetails", JSON.stringify(res.user));
        navigate("/user");
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    const data = JSON.parse(localStorage?.getItem("userDetails"));
    navigate("/user");
    if (data) {
      dispatch({ type: "SET_USER", payload: data });
      dispatch({ type: "LOGIN" });
    }
  }, [dispatch, navigate]);
  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={loginHandler}>{login ? "Logout" : "Log In"}</button>
    </div>
  );
};

export default Login;
