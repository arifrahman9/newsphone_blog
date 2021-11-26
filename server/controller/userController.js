const { User } = require("../models")
const { comparePassword } = require("../helper/bcrypt")
const { createToken } = require("../helper/jwt")

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body

      const response = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      })
      res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      console.log(email)

      if (!email) {
        throw { name: "EmailEmpty" }
      }
      const response = await User.findOne({
        where: {
          email,
        },
      })

      if (!response) {
        throw { name: "EmailInvalid" }
      }

      if (!comparePassword(password, response.password)) {
        throw { name: "PasswordInvalid" }
      }

      const payload = {
        id: response.id,
        email: response.email,
      }

      const access_token = createToken(payload)
      res.status(200).json({ access_token })
    } catch (err) {
      next(err)
    }
  }

  static async fetchOneUser(req, res, next) {
    try {
      const { id } = req.user
      const response = await User.findByPk(id)
      res.status(200).json({ id: response.id, username: response.username, email: response.email })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
