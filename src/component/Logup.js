import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Logup = (props) => {
  let navigate=useNavigate();

const [Credentials, setCredentials] = useState({email:"",password:""});
  const handlesubmit=async(e)=>{
e.preventDefault();
const {email,password}=Credentials;
const response = await fetch('http://localhost:5000/api/auth/Loginuser', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth and redirect
      localStorage.setItem('token',json.authtoken)
      console.log(json.authtoken)
      navigate("/Home")
      props.showalert("Login Successfully","success")
      
     
    }
    else{
      props.showalert("Invalid Details","danger")
    }
   
  }
  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <h2>Login to Continue to NoteHub📕</h2>
    <div><form onSubmit={handlesubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" value={Credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password"value={Credentials.password} onChange={onchange}/>
    </div>
   
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form></div>
  </>
  )
}

export default Logup