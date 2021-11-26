const errorHandler = (err, req, res, next) => {
  console.log(err.name)
  switch (err.name) {
    case "SequelizeValidationError":
      const error = err.errors.map((el) => {
        return el.message
      })
      res.status(400).json({ message: error })
      break
    case "EmailEmpty":
      res.status(400).json({ message: "Please input email!" })
      break
    case "EmailInvalid":
      res.status(400).json({ message: "Invalid email / password" })
      break
    case "PasswordInvalid":
      res.status(400).json({ message: "Invalid email / password" })
      break
    case "AccessTokenInvalid":
      res.status(400).json({ message: "Please login first!" })
      break
    default:
      res.status(500).json(err)
      break
  }
}

module.exports = errorHandler
