const { User, Blog } = require("../models")

const authorization = async (req, res, next) => {
  try {
    const { id } = req.user
    const findUser = await User.findByPk(id)
    const findBlogByUser = await Blog.findByPk(findUser.id)

    if (findUser.id !== findBlogByUser.id) {
      throw { name: "Forbidden" }
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization
