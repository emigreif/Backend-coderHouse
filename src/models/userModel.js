const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },
})


userSchema.pre('save', async function (next) {
    try {
        const user = this

        if (!user.isModified('password')) {
            return next()
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword

        return next()
    } catch (error) {
        return next(error)
    }
})
userSchema.statics.findByEmail = async function(email) {
    return this.findOne({ email })
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw error
    }
}
userSchema.statics.findOrCreateUser = async function(profile) {
    try {
        let user = await this.findOne({ email: profile.email })

        
        if (!user) {
            user = new this({
                email: profile.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
              
            })
            await user.save();
        }

        return user
    } catch (error) {
        throw error
    }
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
