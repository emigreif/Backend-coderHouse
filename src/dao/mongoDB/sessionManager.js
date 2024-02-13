const UserModel = require('../../models/userModel')
const bcrypt = require('bcrypt')
const passport = require('passport')

async function registerUser(userData) {
    try {
        const { email, password } = userData

        const existingUser = await UserModel.findByEmail(email)
        if (existingUser) {
            throw new Error('El usuario ya está registrado')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({ ...userData, password: hashedPassword })
        await newUser.save()

        return newUser.toObject()
    } catch (error) {
        throw error
    }
}

async function authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return reject(err)
            }
            if (!user) {
                return reject(new Error(info.message))
            }
            return resolve(user.toObject())
        })({ body: { email, password } })
    })
}

module.exports = {
    registerUser,
    authenticateUser,
}
