import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import NavbarComponent from "../components/Navbar";
import { fetchBlog } from "../store/action";
import CarouselComponent from "../components/Carousel";
import "./Homepage.css";

export default function Homepage() {
	const { blogs, loading } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [setShowHover] = useState(false);

	useEffect(() => {
		dispatch(fetchBlog());
	}, []);

	const history = useHistory();
	const handleDetail = (id) => {
		history.push(`/blogs/${id}`);
	};

	const unsetHover = (e) => {
		e.preventDefault();
		setShowHover(false);
	};

	return (
		<div>
			<NavbarComponent />
			<Container style={{ backgroundColor: "#D1D5DB" }}>
				<CarouselComponent />
			</Container>
			<Container
				className="d-flex justify-content-center align-items-center text-center p-5"
				style={{ minHeight: "100vh", backgroundColor: "#D1D5DB" }}
			>
				{loading ? (
					<Spinner animation="border" />
				) : (
					<Row xl="3" md="2" sm="1">
						{blogs?.map((el) => (
							<Col className="card-news">
								<Card
									style={{
										marginTop: "3%",
										borderInline: "0",
										borderRadius: "15px",
									}}
									key={el?.id}
								>
									<Card.Img
										className="img-news"
										variant="top"
										src={el?.imgUrl}
										style={{
											borderTopLeftRadius: "15px",
											borderTopRightRadius: "15px",
											height: "300px",
										}}
									/>
									<Card.Body>
										{el?.title.length > 30 ? (
											<Card.Title>{el?.title.slice(0, 30)}...</Card.Title>
										) : (
											<Card.Title
												style={{ fontWeight: "bolder", textAlign: "center" }}
											>
												{el?.title}
											</Card.Title>
										)}
										<Button variant="dark" onClick={() => handleDetail(el?.id)}>
											See More
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				)}
			</Container>
		</div>
	);
}
