const multer = require("multer")
const storage = multer.memoryStorage()
const maxSize = 1024 * 1024
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})

module.exports = upload
