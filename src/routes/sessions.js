const express = require('express')
const router = express.Router()
const { registerUser, authenticateUser } = require('../dao/mongoDB/sessionManager')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authenticateUser({ email, password })

    if (user) {
      req.session.user = user
      res.redirect('/products')
    } else {
      res.status(401).send('Credenciales incorrectas')
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Error interno del servidor')
  }
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
    try {
      const userData = req.body
      const newUser = await registerUser(userData)
      res.json(newUser)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })

router.get('/products', (req, res) => {
  const { user } = req.session
  if (user) {
    const welcomeMessage = `Bienvenido, ${user.first_name} ${user.last_name}`
    res.render('products', { user, welcomeMessage })
  } else {
    res.redirect('/login')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router
