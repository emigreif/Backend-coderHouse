
const bcrypt = require ('bcrypt')
export const createHash= password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password)

