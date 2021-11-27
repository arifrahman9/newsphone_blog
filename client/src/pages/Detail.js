import React, { useEffect } from "react"
import { Container, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import NavbarComponent from "../components/Navbar"
import { fetchDetailBlog, deleteBlog } from "../store/action"
import Swal from "sweetalert2"

export default function DetailPage() {
  const { blog, user } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchDetailBlog(id))
  }, [])

  const history = useHistory()
  const handleBack = (e) => {
    e.preventDefault()
    history.push("/")
  }

  const handleDelete = (e) => {
    e.preventDefault()
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success")
          dispatch(deleteBlog(id)).then(() => {
            history.push("/")
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleToEdit = (e) => {
    e.preventDefault()

    history.push(`/edit/${id}`)
  }

  return (
    <div style={{ backgroundColor: "#E5E7EB" }}>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center p-5 text-center" style={{ backgroundColor: "#D1D5DB" }}>
        <Card style={{ marginTop: "3%", borderInline: "0", borderRadius: "15px" }} className="col-md-6">
          <Card.Img variant="top" src={blog.imgUrl} style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} />
          <Card.Body style={{ zIndex: "99" }}>
            <div className="row justify-content-between mb-3">
              <div className="col-9 mb-3">
                <Card.Text style={{ textAlign: "left", marginBottom: "-6px" }}>
                  <span style={{ fontWeight: "bolder" }}>Created By:</span> {blog?.User?.username}
                </Card.Text>
              </div>
              <div className="col-3">
                {localStorage.getItem("access_token") ? (
                  blog.userId === user.id ? (
                    <button className="btn" style={{ backgroundColor: "#D1D5DB" }} onClick={handleToEdit}>
                      <i class="fa fa-pencil-square-o"></i> Edit
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
            <Card.Title style={{ fontWeight: "bolder" }}>{blog.title}</Card.Title>
            <Card.Text style={{ textAlign: "justify", whiteSpace: "pre-line" }}>{blog.content}</Card.Text>
            <div class="d-grid gap-2">
              {localStorage.getItem("access_token") ? (
                blog?.userId === user.id ? (
                  <button class="btn btn-danger" type="button" onClick={handleDelete}>
                    Delete
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <button class="btn btn-dark" type="button" onClick={handleBack}>
                Back
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
