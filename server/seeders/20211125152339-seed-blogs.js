"use strict"
const blog = require("../data/blog.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    blog.forEach((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Blogs", blog, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Blogs", null, {})
  },
}
