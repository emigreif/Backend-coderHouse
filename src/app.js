const express = require('express')
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')
const Handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const PORT = 8080
const chatRouter = require('./routes/chat')
const indexRouter = require('./routes/views')
const { connectDB } = require('./config/connectDB')
const { uploader } = require('./utils')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/', indexRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
connectDB()

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


