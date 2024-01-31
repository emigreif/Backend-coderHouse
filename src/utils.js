const multer = require('multer');
const { fileURLToPath } = require('url')
const { dirname } = require('path')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const uploader = multer({ storage })

module.exports = { __dirname, uploader  }