const route = require("express").Router()
const UserController = require("../controller/userController")
const authentication = require("../middlewares/authentication")

route.use(authentication)
route.get("/", UserController.fetchOneUser)

module.exports = route
