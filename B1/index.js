require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
  res.send('https://twitter.com/yourprofile')
})

app.get('/login', (req,res)=>{
    res.send('Login Page'); // Simple login page response. In a real app, you'd render a login form or handle authentication here.
})

app.get('/rishi',(req,res)=>{
    res.send('<h1>The Rishi Rana</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
