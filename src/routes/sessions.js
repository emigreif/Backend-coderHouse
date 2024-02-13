const express = require('express')
const router = express.Router()
const { registerUser, authenticateUser,findOrCreateUser } = require('../dao/mongoDB/sessionManager')
const passport = require('passport')

router.get('/login', (req, res) => {
  const successMessage = req.session.successMessage
    req.session.successMessage = null
    res.render('login', { successMessage })
})

router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body
      const user = await authenticateUser(email, password)

      if (!req.session) {
          req.session = {}
      }

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
router.get('/github', passport.authenticate('github'))
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login', 
}), async (req, res) => {
  try {
    const profile = req.user.profile
    let user = await findOrCreateUser(profile)
    req.session.user = user
    res.redirect('/products')
  } catch (error) {
    console.error('Error al autenticar con GitHub:', error)
    res.status(500).send('Error interno del servidor')
  }
})


router.post('/register', async (req, res) => {
    try {
      const userData = req.body
      await registerUser(userData)
      req.session.successMessage = '¡Usuario registrado correctamente!'
        
      res.redirect('/login')
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
