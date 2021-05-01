
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';

import Talk from './components/Talk';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/room/:roomId">
            <Talk />
          </Route>
          <Route path="/">
            <h1>Welcome</h1>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
