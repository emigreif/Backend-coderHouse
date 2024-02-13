const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const UserModel = require('../models/userModel')

function initializePassport() {
    passport.use(new GitHubStrategy({
        clientID: "Iv1.b8556c1e50167903",
        clientSecret: "6d605460f56ad7a1a9bf9a5e506aac7a0636e57a",
        callbackURL: "http://localhost:8080/github/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await UserModel.findOrCreateUser(profile)
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    ))

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await UserModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}

module.exports = initializePassport