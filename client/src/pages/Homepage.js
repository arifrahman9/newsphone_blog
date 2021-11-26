import React, { useEffect, useState } from "react"
import { Container, Card, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import NavbarComponent from "../components/Navbar"
import { fetchBlog } from "../store/action"

export default function Homepage() {
  const { blogs } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlog())
  }, [])

  const history = useHistory()
  const handleDetail = (id) => {
    history.push(`/blogs/${id}`)
  }

  return (
    <div style={{ backgroundColor: "#E5E7EB" }}>
      <NavbarComponent />
      <Container className="d-flex justify-content-center align-items-center text-center p-5" style={{ minHeight: "100vh", backgroundColor: "#D1D5DB" }}>
        <Row xl="2" md="2" sm="1">
          {blogs?.map((el) => (
            <Col>
              <Card style={{ marginTop: "3%", borderInline: "0", borderRadius: "15px" }} key={el?.id}>
                <Card.Img variant="top" src={el?.imgUrl} style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", height: "400px" }} />
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bolder", textAlign: "left" }}>{el?.title}</Card.Title>
                  <Button variant="dark" onClick={() => handleDetail(el?.id)}>
                    See More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
