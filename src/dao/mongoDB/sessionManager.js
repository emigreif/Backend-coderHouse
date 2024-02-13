const UserModel = require('../../models/userModel')
const bcrypt = require('bcrypt')

async function registerUser(userData) {
    try {
        const { email } = userData

        const existingUser = await UserModel.findByEmail(email)
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

async function findOrCreateUser(profile) {
    try {
        const { id, displayName, emails } = profile
        const email = emails[0].value

        let user = await UserModel.findOne({ email })

        if (!user) {
            user = new UserModel({
                githubId: id,
                email,
                displayName
            })
            await user.save()
        }

        return user.toObject()
    } catch (error) {
        throw error
    }
}
async function authenticateUser(email, password) {
    try {
        const user = await UserModel.findByEmail(email)
        if (!user) {
            return null
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return null
        }
        return user.toObject()
    } catch (error) {
        throw error
    }
}

module.exports = { registerUser, findOrCreateUser, authenticateUser,}
