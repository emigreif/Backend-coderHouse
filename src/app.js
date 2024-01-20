const express = require('express')
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')
const Handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const PORT=8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.engine('handlebars', Handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(PORT, () => {
    console.log("listening on  8080")
})

const io = new Server(httpServer); 

app.set('io', io); 

app.get('/', (req, res) => {
    res.render('index', {})
    
})
