const mongoose = require('mongoose')
exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://emigreif:ruso1545@cluster0.hddv6eb.mongodb.net/ecommerce?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }

}