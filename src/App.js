import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './Context/notess/NoteStates';
import Alert from './component/Alert';
import Logup from './component/Logup';
import Signin from './component/Signin';

function App() {
  const [alert, setalert] = useState(null);
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 1000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route path="/Home" element={<Home showalert={showalert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/logup" element={<Logup showalert={showalert} />} />
              <Route path="/signin" element={<Signin showalert={showalert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
