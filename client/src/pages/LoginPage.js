import React, { useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import NavbarComponent from "../components/Navbar"
import { loggedIn, getOneUser } from "../store/action"
import Swal from "sweetalert2"

export default function LoginPage() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })

  const changeInputLoginHandler = (e) => {
    const value = e.target.value
    const name = e.target.name

    setUserLogin({
      ...userLogin,
      [name]: value,
    })
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(loggedIn(userLogin))
      .then(() => {
        dispatch(getOneUser())
      })
      .then(() => {
        history.push("/")
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        })
      })
  }
  return (
    <div>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center text-center p-5" style={{ minHeight: "100vh", backgroundColor: "#D1D5DB" }}>
        {/* // <h2>LOGIN</h2> */}
        <div className="card" style={{ borderRadius: "10px", width: "400px" }}>
          <div className="card-body">
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleSubmitLogin}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-envelope"></i>
                </span>
                <input type="email" className="form-control" placeholder="Email" aria-describedby="basic-addon1" name="email" value={userLogin.email} onChange={changeInputLoginHandler} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-lock"></i>
                </span>
                <input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon1" name="password" value={userLogin.password} onChange={changeInputLoginHandler} />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-dark" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
