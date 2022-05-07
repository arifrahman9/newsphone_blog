import React, { useEffect } from "react";
import {
	Container,
	Card,
	Row,
	Col,
	Figure,
	Button,
	Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { fetchDetailBlog, deleteBlog, fetchBlog } from "../store/action";
import Swal from "sweetalert2";
import "./Detail.css";

export default function DetailPage() {
	const { blog, blogs, user } = useSelector((state) => state);

	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchDetailBlog(id));
		dispatch(fetchBlog());
	}, []);

	const history = useHistory();
	const handleBack = (e) => {
		e.preventDefault();
		history.push("/");
	};

	const handleDelete = (e) => {
		e.preventDefault();

		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#D1D5DB",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				// Swal.fire("Deleted!", "Your file has been deleted.", "success");
				Swal.fire({
					title: "Deleted!",
					text: "Your file has been deleted.",
					icon: "success",
					confirmButtonColor: "#D1D5DB",
				});
				dispatch(deleteBlog(id))
					.then(() => {
						history.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	};
	const handleToEdit = (e) => {
		e.preventDefault();
		history.push(`/edit/${id}`);
	};

	return (
		<div style={{ backgroundColor: "#E5E7EB" }}>
			<NavbarComponent />
			<Container
				className="d-flex justify-content-center align-items-center p-5 text-center"
				style={{ backgroundColor: "#D1D5DB", minHeight: "100vh" }}
			>
				<Row
					style={{
						minHeight: "100vh",
						width: "100%",
					}}
					className="news-side"
				>
					<Col
						style={{
							minHeight: "100vh",
							width: "70%",
						}}
					>
						<div>
							<Figure>
								<Figure.Image
									width={500}
									height={100}
									alt="image news"
									src={blog.imgUrl}
								/>
								<Figure.Caption>{blog?.title}</Figure.Caption>
							</Figure>
						</div>
						<br></br>
						<div style={{ textAlign: "right" }}>
							{localStorage.getItem("access_token") ? (
								blog.userId === user.id ? (
									<button
										className="btn"
										style={{ backgroundColor: "#D1D5DB" }}
										onClick={handleToEdit}
									>
										<i class="fa fa-pencil-square-o"></i> Edit
									</button>
								) : (
									""
								)
							) : (
								""
							)}
							{localStorage.getItem("access_token") ? (
								blog.userId === user.id ? (
									<button
										className="btn"
										style={{ backgroundColor: "#D1D5DB" }}
										onClick={handleDelete}
									>
										<i class="fa fa-trash-alt"></i> Delete
									</button>
								) : (
									""
								)
							) : (
								""
							)}
						</div>
						<div style={{ textAlign: "justify" }}>
							<p style={{ whiteSpace: "pre-line" }}>{blog?.content}</p>
						</div>
						<hr></hr>
						<div style={{ textAlign: "left" }}>
							<span style={{ fontWeight: "bolder" }}>Penulis :</span>{" "}
							{blog?.User?.username} <br></br>
							<span style={{ fontWeight: "bolder" }}>Dibuat tangal :</span>{" "}
							{blog?.createdAt?.split("T")[0]}
						</div>
					</Col>
					<Col md="auto" style={{ minHeight: "100vh", width: "30%" }}>
						<Badge pill bg="secondary">
							Artikel Lain
						</Badge>
						<div
							style={{
								width: "100%",
							}}
							className="mt-3"
						>
							<Row>
								{blogs?.map((el) => (
									<div className="artikel-side">
										<Col
											// lg={4}
											// sm={10}
											style={
												{
													// width: "40%",
													// backgroundColor: "#F5F5F5",
												}
											}
											className="img-side"
										>
											<Figure>
												<Figure.Image
													width={500}
													height={100}
													alt="image news"
													src={el?.imgUrl}
												/>
											</Figure>
										</Col>
										<Col
											// xl={6}
											// lg={8}
											// sm={2}
											style={{
												// width: "60%",
												textAlign: "left",
												// backgroundColor: "red",
											}}
											className="title-side"
										>
											{el?.title.length > 40 ? (
												<a
													className="title-news"
													href={`/blogs/${el?.id}`}
													style={{ textDecoration: "none" }}
												>
													{el?.title.slice(0, 40)}...
												</a>
											) : (
												<a
													className="title-news"
													href={`/blogs/${el?.id}`}
													style={{ textDecoration: "none" }}
												>
													{el?.title}
												</a>
											)}
										</Col>
									</div>
								))}
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
