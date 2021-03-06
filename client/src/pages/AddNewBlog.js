import React, { useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import NavbarComponent from "../components/Navbar"
import { addNew, setIsLoading } from "../store/action"

export default function AddNew() {
  const { loading } = useSelector((state) => state)
  const [addBlog, setAddBlog] = useState({
    title: "",
    imgUrl: "",
    content: "",
  })
  const [addFile, setAddFile] = useState(null)

  const changeInputAddHandler = (e) => {
    const value = e.target.value
    const name = e.target.name

    setAddBlog({
      ...addBlog,
      [name]: value,
    })
  }

  const changeFileinput = (e) => {
    const file = e.target.files[0]
    setAddFile(file)
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmitAdd = (e) => {
    e.preventDefault()
    dispatch(addNew(addBlog, addFile)).then(() => {
      history.push("/")
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
            <h3 className="text-center">Add New Blog</h3>
            <form onSubmit={handleSubmitAdd}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Title" name="title" value={addBlog.title} onChange={changeInputAddHandler} />
                <label for="floatingInput">Title</label>
              </div>
              <div className="input-group mb-3">
                <input type="file" className="form-control" id="inputGroupFile01" onChange={changeFileinput} />
              </div>
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea" placeholder="Please input your content" name="content" value={addBlog.content} onChange={changeInputAddHandler}></textarea>
                <label for="floatingTextarea">Content</label>
              </div>
              <div className="d-grid gap-2 mt-3">
                {loading === true ? (
                  <button className="btn btn-dark" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-dark" type="submit">
                    Submit and Publish
                  </button>
                )}
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
