const MessageModel = require('../models/messageModel')

class MessageManager {
  async saveMessage(user, message) {
    try {
      const newMessage = new MessageModel({ user, message })
      await newMessage.save()
      return newMessage
    } catch (error) {
      throw error
    }
  }

  async getAllMessages() {
    try {
      const messages = await MessageModel.find()
      return messages
    } catch (error) {
      throw error
    }
  }
}

module.exports = new MessageManager()
