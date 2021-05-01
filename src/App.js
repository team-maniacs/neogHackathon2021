import React from "react";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Talk from "./components/Talk";
import Login from "./components/Login";
import { useAuth } from "./context/user-context";

function App() {
  const { user } = useAuth();

  return (
    <div className='App'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className='app-content'>
              <Sidebar />
              <Routes>
                <Route path='/room/:roomId'>
                  <Talk />
                </Route>
                <Route path='/'>
                  <h1>Welcome</h1>
                </Route>
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
