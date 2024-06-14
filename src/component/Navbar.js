import React,{useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {
  let navigate=useNavigate();
  let location=useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handlelogout=()=>{
localStorage.removeItem('token')
navigate('/logup')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand bs-body-bg-rgb" to="#">NoteHub📕</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/Home"?"active":""}`}  aria-current="page" to="Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="About">About</Link>
        </li>
      </ul>
     {!localStorage.getItem('token')? <form className="d-flex" >
        <div className='container mx-3'>
        <Link className="btn btn-primary mx-3" to="signin" role="button">Signup</Link>
        <Link className="btn btn-primary " to="logup" role="button">Login</Link>
        </div>
      </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
    </div>
  </div>
</nav>
  );
}

export default Navbar