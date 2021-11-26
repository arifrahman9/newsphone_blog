const route = require("express").Router()
const BlogController = require("../controller/blogController")
const upload = require("../middlewares/multer")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const errorHandler = require("../middlewares/errorHandler")

route.get("/", BlogController.getAll)
route.get("/:id", BlogController.detailBlog)

route.use(authentication)
route.post("/", upload.single("imgUrl"), BlogController.addNewBlog)
route.put("/:id", upload.single("imgUrl"), authorization, BlogController.editBlog)
route.delete("/:id", authorization, BlogController.deleteBlog)

route.use(errorHandler)
module.exports = route
