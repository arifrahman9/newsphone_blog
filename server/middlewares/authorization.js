const { User, Blog } = require("../models")

const authorization = async (req, res, next) => {
  try {
    const { id } = req.user
    const findUser = await User.findByPk(id)
    const findBlogByUser = await Blog.findOne({
      where: {
        userId: findUser.id,
      },
    })

    if (findUser.id !== findBlogByUser.userId) {
      throw { name: "Forbidden" }
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization
