const axios = require("axios")
const FormData = require("form-data")

async function sendImage(file) {
  try {
    const form = new FormData()
    form.append("image", file.buffer.toString("base64"))
    const response = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=a35549db1575a661a53541e4820a5028",
      headers: form.getHeaders(),
      data: form,
    })

    if (!response.data.data.url) {
      throw { name: "Upload Error!" }
    }
    return response.data.data.url
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = sendImage
