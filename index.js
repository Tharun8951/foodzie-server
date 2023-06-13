const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./Models/User')
require('dotenv').config()

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://foodzie-client.vercel.app',
    ],
  }),
)

app.use(express.json())

app.listen(4040, () => {
  console.log('server started at port 4040')
})

const mongoDB = require('./db')
mongoDB()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/displayData'))
app.get('/all', async (req, res) => {
  const alldata = await User.find({})
  res.json({
    data: alldata,
  })
})
