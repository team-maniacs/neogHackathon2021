import "./App.css";

import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Talk from "./components/Talk";
import React from "react";

import Login from "./components/Login";
import { useAuth } from "./context/user-context";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  const { user } = useAuth();

  return (
    <div className='App'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Routes>
              <Route path='/login' element={<Login />} />
              <PrivateRoute path='/user' element={<Sidebar />} />
              <PrivateRoute path='/room/:roomId'>
                <Talk />
              </PrivateRoute>
              <Route path='/'>
                <div>
                  <h1>Welcome</h1>
                  <NavLink to='/login'>
                    <button>Login</button>
                  </NavLink>
                </div>
              </Route>
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
