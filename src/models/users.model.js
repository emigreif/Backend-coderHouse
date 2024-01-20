const mongoose=require ('mongoose')
const usersCollection='users'
const usersSchema= new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type: String,
        unique: true
    }
        ,
    password:String
})
const userModel=mongoose.model(userCollection, usersSchema)
module.exports={
    userModel
}