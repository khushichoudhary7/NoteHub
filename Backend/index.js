const connectmongo=require('./db');
var cors = require('cors')
connectmongo();
const express = require('express')
const app = express()
const port = 5000

// var app = express()

app.use(cors())

app.use(express.json())
app.use('/api/auth' , require('./Routes/auth'))
app.use('/api/notes' , require('./Routes/notes'))

app.listen(port, () => {
  console.log(`NoteHub is listening on port ${port}`)
})