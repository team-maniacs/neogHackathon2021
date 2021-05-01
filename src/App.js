
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';
import Chat from './components/Chat';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/room/:roomId">
            <Chat />
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
