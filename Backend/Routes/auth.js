const express = require('express')
const User = require('../models/User')
const router = express.Router();
var getuser = require('../middleware/getuser')
const { body, validationResult } = require('express-validator');
//  it is use to provide salt to pssword and store in hash
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_sec = 'thisa$ample';
// route 1: creating user " /api/auth/createuser"
router.post('/createuser', [
  body('name', 'Enter the valid name').isLength({ min: 3 }),
  body('email', ' Enter valid email').isEmail(),
  body('password', 'Enter the password with minimum 5 length')
], async (req, res) => {
  let success = false;
  // if error occur return bad error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   
    return res.status(400).json({ success,errors: errors.array() });
  }
  // check whether user with email exsist already
  try {
    let user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
     
      return res.status(400).json({ success,errors: 'The user with same email already exists' });
    }
    // store the password in hash form
    // await is use to return promise so that first salt takes its value then program run forward  
    const salt = await bcrypt.genSalt(10);

    const secpass = await bcrypt.hash(req.body.password, salt)
    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,

    });
    const data = {
      user: {
        id: user.id
      }
    }
    
    const authtoken = jwt.sign(data, JWT_sec)
    success = true;
    res.json({success, authtoken })
  }
  // catching error
  catch (error) {
    console.error(error.message);
    res.status(500).send("may be some error occur check it")
  }
  // .then(user=>res.json(user)) 
  // .catch(err=>{console.log(err)
  // res.json({error: 'please enter the unique email id ' , message:err.message})})
  // res.send(req.body)
})
//route 2:  Authentication a user using post "/api/auth/loginuser" .  login required
router.post('/loginuser', [
  body('email', ' Enter valid email').isEmail(),
  body('password', 'Enter the password with minimum 5 length').exists(),
], async (req, res) => {
  let success = false;
  // if error occur return bad error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
    
      return res.status(400).json({ success, error: " please enter the correct credentials  " })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare) {
      
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_sec)
    success = true;
    res.json({ success, authtoken })
  }
  catch (error) {
    console.error(error.message)
    res.status(400).send("internal server error")
  }
})

// route 3: get loggined in users detail uing post:" /api/auth/getuser"  . login required
router.post('/gettuser', getuser, async (req, res) => {
  // use middleware which is use to call everytime when function is call in login required whenever the request comes
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    // console.log(user)
  } catch (error) {
    console.error(error.message)
    res.status(400).send("internal server error")
  }
})
module.exports = router
//jsonwebtoken is kind of method to verify user
//jwt token is use to communicate b/w client and server securely