const { dirname, resolve } = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, resolve(__dirname, 'public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const uploader = multer({ storage })

module.exports = { uploader }