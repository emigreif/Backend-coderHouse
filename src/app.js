const express = require('express')
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')
const chatRouter = require('./routes/chat')
const sessionsRouter = require('./routes/sessions')
const Handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const { connectDB } = require('./config/connectDB')
const { uploader } = require('./utils/uploader')
const passport =require ('passport')
const initializePassport=require('./config/passport.config') 
const session=require ('express-session')
const PORT = 8080


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
connectDB()
initializePassport()
app.use(session({
secret:"coderSecrets"
}))
app.use(passport.session())
app.engine('handlebars', Handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.post('/file', uploader.single('myFile'), (req, res) => {
    console.log('File uploaded')
    res.send('File uploaded')
})

const httpServer = app.listen(PORT, () => {
    console.log("listening on  8080")
})

const io = new Server(httpServer)

app.set('io', io)


