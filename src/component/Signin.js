import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

   
  let navigate=useNavigate();

  const [Credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});


  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=Credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
    
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name , email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // save the auth and redirect
          localStorage.setItem('token',json.authtoken)
          navigate("/Home")
          props.showalert("You signin successfully ","success")
        }
       else{
       props.showalert("Invalid Credentials","danger")
       }
      }
   
      const onchange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
      }
  return (
  <>
    <div className='container mt-2'>
      <h2 className=' mb-3'>Signup in NoteHub📕</h2>
      <form onSubmit={handlesubmit}>
      <div class="mb-3">
  <label htmlFor="name" class="form-label">UserName</label>
  <input type="text" class="form-control" id="name" name="name" onChange={onchange} placeholder="Enter the user name"/>
</div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="Password" className="form-label">Password</label>
      <input type="password" className="form-control" id="Password" name='Password' onChange={onchange} minLength={5} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="cPassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cPassword" name='cPassword' onChange={onchange} minLength={5} required/>
    </div>
   
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  <p>create your account by signin to make your notes accessable only to you</p>
 </div>
 </>
  );

  

export default Signin;