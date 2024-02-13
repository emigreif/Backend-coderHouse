const passport =require("passport")
const GitHubStrategy =require("passport-github2")
const UserModel =require("../models/userModel")
function initializePassport() {

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

passport.use('github',new GitHubStrategy({
      clientID: "Iv1.b8556c1e50167903",
      clientSecret: "6d605460f56ad7a1a9bf9a5e506aac7a0636e57a",
      callbackURL: "http://localhost:8080/api/sessions/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ githubId: profile.id })

        if (!user) {
          user = new UserModel({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails ? profile.emails[0].value : null
          })
          await user.save()
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)}
module.exports = initializePassport