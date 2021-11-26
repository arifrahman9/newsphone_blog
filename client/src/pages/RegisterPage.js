import React, { useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import NavbarComponent from "../components/Navbar"
import { registered } from "../store/action"
import Swal from "sweetalert2"

export default function RegisterPage() {
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })

  const changeInputLoginHandler = (e) => {
    const value = e.target.value
    const name = e.target.name

    setUserRegister({
      ...userRegister,
      [name]: value,
    })
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(registered(userRegister))
      .then(() => {
        history.push("/login")
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        })
      })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    history.push("/")
  }

  return (
    <div>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center text-center p-5" style={{ minHeight: "100vh", backgroundColor: "#D1D5DB" }}>
        <div className="card" style={{ borderRadius: "10px", width: "500px" }}>
          <div className="card-body">
            <h3 className="text-center">Register</h3>
            <form onSubmit={handleSubmitLogin}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i class="fa fa-user-plus"></i>
                </span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" name="username" value={userRegister.username} onChange={changeInputLoginHandler} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-envelope"></i>
                </span>
                <input type="email" className="form-control" placeholder="Email" aria-describedby="basic-addon1" name="email" value={userRegister.email} onChange={changeInputLoginHandler} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-lock"></i>
                </span>
                <input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon1" name="password" value={userRegister.password} onChange={changeInputLoginHandler} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i class="fa fa-phone"></i>
                </span>
                <input type="number" className="form-control" placeholder="No. Handphone" aria-describedby="basic-addon1" name="phoneNumber" value={userRegister.phoneNumber} onChange={changeInputLoginHandler} />
              </div>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fa fa-home"></i>
                </span>
                <textarea class="form-control" aria-label="With textarea" placeholder="Address" name="address" value={userRegister.address} onChange={changeInputLoginHandler}></textarea>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-dark" type="submit">
                  Submit
                </button>
                <button className="btn btn-dark" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
