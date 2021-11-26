const sendImage = require("../helper/uploadImage")
const { Blog, User } = require("../models")

class BlogController {
  static async getAll(req, res, next) {
    try {
      const response = await Blog.findAll()
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async detailBlog(req, res, next) {
    try {
      const { id } = req.params
      const response = await Blog.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      })
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async addNewBlog(req, res, next) {
    try {
      const { title, content } = req.body
      if (!req.file) {
        throw { name: "ErrorUpload" }
      }
      const imgUrl = await sendImage(req.file)

      const { id } = req.user
      const response = await Blog.create({
        title,
        imgUrl,
        content,
        userId: id,
      })
      // console.log(response, "============>>>>>>>>>>>>>")
      res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async editBlog(req, res, next) {
    try {
      const { id } = req.params
      const { title, content } = req.body
      let imgUrl
      if (req.file) {
        imgUrl = await sendImage(req.file)
      }
      const response = await Blog.update(
        {
          title,
          content,
          imgUrl,
        },
        {
          where: {
            id,
          },
          returning: true,
        }
      )
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async deleteBlog(req, res, next) {
    try {
      const { id } = req.params
      const response = await Blog.destroy({
        where: {
          id,
        },
        returning: true,
      })
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BlogController
