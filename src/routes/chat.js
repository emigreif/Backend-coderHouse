const express = require('express')
const router = express.Router()
const MessageManager = require('../dao/mongoDB/messageManager')

router.get('/', async (req, res) => {
  try {
    const messages = await MessageManager.getAllMessages()
    res.render('chat', { messages })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
});

router.post('/send', async (req, res) => {
  try {
    const { user, message } = req.body
    const newMessage = await MessageManager.saveMessage(user, message)
    res.redirect('/chat') 
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
