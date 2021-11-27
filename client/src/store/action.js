import { GET_ALL, GET_DETAIL_ALL, LOGIN, REGISTER, ADDBLOG, EDITBLOG, DELETEBLOG, GET_DETAIL_USER, ISLOADING } from "./actionTypes"
import axios from "axios"

export function getData(payload) {
  return {
    type: GET_ALL,
    payload,
  }
}

export function getDetail(payload) {
  return {
    type: GET_DETAIL_ALL,
    payload,
  }
}

export function setLogin(payload) {
  return {
    type: LOGIN,
    payload,
  }
}

export function setRegister(payload) {
  return {
    type: REGISTER,
    payload,
  }
}

export function setAddNew(payload) {
  return {
    type: ADDBLOG,
    payload,
  }
}

export function setEdit(payload) {
  return {
    type: EDITBLOG,
    payload,
  }
}

export function setDelete(payload) {
  return {
    type: DELETEBLOG,
    payload,
  }
}

export function setOneUser(payload) {
  return {
    type: GET_DETAIL_USER,
    payload,
  }
}

export function setIsLoading(payload) {
  return {
    type: ISLOADING,
    payload,
  }
}

export function fetchBlog() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: "http://localhost:3000/blogs",
        method: "GET",
      })
        .then(({ data }) => {
          dispatch(getData(data))
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }
}

export function fetchDetailBlog(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `http://localhost:3000/blogs/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          // console.log(data, "from action")
          dispatch(getDetail(data))
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }
}

export function loggedIn(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: data,
      })
        .then(({ data }) => {
          dispatch(setLogin(data))
          localStorage.setItem("access_token", data.access_token)
          dispatch(setOneUser(data))
          resolve()
        })
        .catch((err) => {
          // console.log(err)
          reject(err.response.data)
        })
    })
  }
}

export function registered(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => [
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: data,
      })
        .then((data) => {
          dispatch(setRegister(data))
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err.response.data)
        }),
    ])
  }
}

export function addNew(data, file) {
  let form = new FormData()
  form.append("title", data.title)
  form.append("imgUrl", file)
  form.append("content", data.content)

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: "http://localhost:3000/blogs",
        method: "POST",
        data: form,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          dispatch(setAddNew(data))
          resolve()
        })
        .catch((err) => {
          // console.log(err)
          reject(err.response.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}

export function editBlog(id, data, file) {
  // console.log(id, data, file, "from action")
  let form = new FormData()
  form.append("title", data.title)
  form.append("imgUrl", file)
  form.append("content", data.content)
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `http://localhost:3000/blogs/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: form,
      })
        .then((data) => {
          // console.log(data)
          dispatch(setEdit(data))
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}

export function deleteBlog(id) {
  // console.log(id, "from action")
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `http://localhost:3000/blogs/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data, "from action")
          dispatch(setDelete(data))
          resolve()
        })
        .catch((err) => reject(err))
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    })
  }
}

export function getOneUser() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `http://localhost:3000/users`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data)
          dispatch(setOneUser(data))
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
}
