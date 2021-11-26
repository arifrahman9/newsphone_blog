const route = require("express").Router()
const BlogRoutes = require("./blog-routes")
const UserRoutes = require("./user-routes")
const UserController = require("../controller/userController")
const errorHandler = require("../middlewares/errorHandler")

route.get("/", (req, res) => {
  res.send("Hello World")
})

route.post("/register", UserController.register)
route.post("/login", UserController.login)

route.use("/users", UserRoutes)
route.use("/blogs", BlogRoutes)

route.use(errorHandler)
module.exports = route
