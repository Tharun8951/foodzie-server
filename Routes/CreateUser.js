const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = '1234567890'

router.post(
  '/createuser',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email should include @ symbol').isEmail(),
    body('password', 'Minimum length of password is 5').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, email, password, location } = req.body
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      await User.create({ name, email, password: hashedPassword, location })
      res.json({ success: true })
    } catch (err) {
      console.log(err)
      res.json({ success: false })
    }
  },
)

router.post('/loginuser', async (req, res) => {
  const { email, password } = req.body

  try {
    const userdata = await User.findOne({ email })
    if (userdata) {
      const passwordMatch = await bcrypt.compare(password, userdata.password)

      if (passwordMatch) {
        const data = {
          user: {
            id: userdata._id
          }
        }
        const authToken = jwt.sign(data, secret_key)
        res.json({ success: true, authToken: authToken })
      } else {
        res.json({ err: 'Wrong password' })
      }
    } else {
      res.json({ msg: 'Could not find the email, please try signing up' })
    }
  } catch (err) {
    console.log(err)
    res.json({ success: false })
  }
})

module.exports = router
