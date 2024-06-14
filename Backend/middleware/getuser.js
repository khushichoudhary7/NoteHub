var jwt = require('jsonwebtoken')
const JWT_sec = 'thisa$ample';
const getuser = (req, res, next) => {
   // get the user from the jwt token and add id to req object
   const token = req.header("auth-token")
   if (!token) {
      res.status(401).send({ error: "please authenticate using a valid token" })
   }
   try {
      const data = jwt.verify(token, JWT_sec);
      req.user = data.user;
      next()
   }
   catch (error) {
      res.status(401).send({ error: " please authenticate using a valid token " })
   }

}

module.exports = getuser;