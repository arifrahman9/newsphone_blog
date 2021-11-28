import React, { useEffect } from "react"
import { Carousel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { fetchBlog } from "../store/action"

export default function CarouselComponent() {
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
    <div>
      <Carousel className="pt-3">
        {blogs.slice(3, 6).map((el) => (
          <Carousel.Item>
            <img className="d-block w-100" src={el.imgUrl} alt="First slide" style={{ height: "600px" }} />
            <Carousel.Caption className="bg-dark">
              <h2>{el.title}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
