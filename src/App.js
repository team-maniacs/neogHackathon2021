import React from 'react';

import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';

import Talk from './components/Talk';
import Login from './components/Login';
import { useAuth } from './context/user-context';


function App() {

  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      <Router>
        {!user ? <Login /> :
          <>

            <Sidebar />
            <Routes>
              <Route path="/room/:roomId">
                <Talk />
              </Route>
              <Route path="/">
                <h1>Welcome</h1>
              </Route>
            </Routes>
          </>
        }
      </Router>
    </div>
  );
}

export default App;
