const UserModel = require('../../models/userModel')

async function registerUser(userData) {
  try {
    
    const existingUser = await UserModel.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error('El usuario ya está registrado')
    }

   
    const newUser = new UserModel(userData)
    await newUser.save()

    return newUser.toObject()
  } catch (error) {
    throw error
  }
}

async function authenticateUser(credentials) {
  try {
   
    const user = await UserModel.findOne({ email: credentials.email })
    if (!user) {
      throw new Error('Correo electrónico o contraseña incorrectos')
    }

    
    const isPasswordValid = await user.comparePassword(credentials.password)
    if (!isPasswordValid) {
      throw new Error('Correo electrónico o contraseña incorrectos')
    }

    return user.toObject()
  } catch (error) {
    throw error
  }
}

module.exports = {
  registerUser,
  authenticateUser,
}
