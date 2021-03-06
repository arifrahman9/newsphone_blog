import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { useHistory } from "react-router"
import Swal from "sweetalert2"

export default function NavbarComponent() {
  const history = useHistory()
  const handleToLogin = (e) => {
    history.push("/login")
  }

  const handleToRegister = (e) => {
    history.push("/register")
  }

  const handleLogout = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you must login again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout successfully!")
        localStorage.clear()
        history.push("/login")
      }
    })
  }

  const handleToAdd = (e) => {
    history.push("/addNew")
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <i className="fas fa-mobile-alt"></i> News Phone
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {localStorage.getItem("access_token") ? (
              <Nav.Link href="#" onClick={handleToAdd}>
                Add New Blog
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            {localStorage.getItem("access_token") ? (
              <Nav.Link href="#" onClick={handleLogout}>
                Logout <i className="fas fa-sign-out-alt"></i>
              </Nav.Link>
            ) : (
              <Nav.Link href="#" onClick={handleToLogin}>
                Login <i className="fas fa-sign-in-alt"></i>
              </Nav.Link>
            )}

            {localStorage.getItem("access_token") ? (
              ""
            ) : (
              <Nav.Link href="#" onClick={handleToRegister}>
                Signup <i className="fas fa-user-lock"></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
