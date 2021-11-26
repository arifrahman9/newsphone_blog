const { verifyToken } = require("../helper/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    if (!access_token) {
      throw { name: "AccessTokenInvalid" }
    }

    const payload = verifyToken(access_token)

    const response = await User.findOne({
      where: {
        email: payload.email,
      },
    })

    req.user = {
      id: response.id,
      email: response.email,
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
