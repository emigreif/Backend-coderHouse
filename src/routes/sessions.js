const express = require('express')
const router = express.Router()
const SessionManager = require('../dao/mongoDB/sessionManager')

router.post('/register', async (req, res) => {
  try {
    const newUser = await SessionManager.registerUser(req.body)
    res.json(newUser)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await SessionManager.authenticateUser(req.body)
    if (user) {
      req.session.user = user
      res.redirect('/products')
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router
