"use strict"

const { hashPassword } = require("../helper/bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = [
      {
        username: "Arif Rahman",
        email: "arif@mail.com",
        password: hashPassword("123456"),
        phoneNumber: "08123456789",
        address: "Depok",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await queryInterface.bulkInsert("Users", user, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
