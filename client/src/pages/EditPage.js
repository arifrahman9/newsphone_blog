import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { editBlog, fetchDetailBlog } from "../store/action";

export default function EditPage() {
	const [editBlogPost, setEditBlog] = useState({
		title: "",
		imgUrl: "",
		content: "",
	});
	const { blog } = useSelector((state) => state);

	const [addFile, setAddFile] = useState(null);

	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchDetailBlog(id))
			.then((data) => {
				dispatch(setEditBlog(data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const changeInputEdit = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setEditBlog({
			...editBlogPost,
			[name]: value,
		});
	};

	const handleFileInput = (e) => {
		const file = e.target.files[0];
		setAddFile(file);
	};

	const history = useHistory();
	const handleSubmitEdit = (e) => {
		e.preventDefault();
		dispatch(editBlog(id, editBlogPost, addFile)).then(() => {
			history.push("/");
		});
	};

	const handleCancel = (id) => {
		history.push(`/blogs/${id}`);
	};

	return (
		<div>
			<NavbarComponent />
			<Container
				className="d-flex justify-content-center align-items-center text-center p-5"
				style={{ minHeight: "100vh", backgroundColor: "#D1D5DB" }}
			>
				<div className="card" style={{ borderRadius: "10px", width: "500px" }}>
					<div className="card-body">
						<h3 className="text-center">Edit Blog</h3>
						<form onSubmit={handleSubmitEdit}>
							<div className="form-floating mb-3">
								<input
									type="text"
									className="form-control"
									id="floatingInput"
									placeholder="Title"
									name="title"
									value={editBlogPost?.title}
									onChange={changeInputEdit}
								/>
								<label for="floatingInput">Title</label>
							</div>
							<img
								src={editBlogPost?.imgUrl}
								width="100%"
								alt="Previous"
								className="mb-3"
							/>
							<div className="input-group mb-3">
								<input
									type="file"
									className="form-control"
									id="inputGroupFile01"
									onChange={handleFileInput}
								/>
							</div>
							<div className="form-floating">
								<textarea
									className="form-control"
									id="floatingTextarea"
									placeholder="Please input your content"
									name="content"
									value={editBlogPost?.content}
									onChange={changeInputEdit}
								></textarea>
								<label for="floatingTextarea">Content</label>
							</div>
							<div className="d-grid gap-2 mt-3">
								<button className="btn btn-dark" type="submit">
									Save and Publish
								</button>
								<button
									className="btn btn-dark"
									type="button"
									onClick={() => handleCancel(blog?.id)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</Container>
		</div>
	);
}
