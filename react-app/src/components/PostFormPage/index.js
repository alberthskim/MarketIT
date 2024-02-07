import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../store/post";
import { useHistory } from "react-router-dom";
import "./PostFormPage.css"

function PostFormPage() {
	const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
	const [image, setImage] = useState("https://i.imgur.com/VikcUQA.png");
	const [category, setCategory] = useState("For Sale");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
	const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if(!Object.values(errors).length) {

            const formData = new FormData()

            formData.append('user_id', user.id)
            formData.append('image', image)
            formData.append('categories', category)
            formData.append('title', title)
            formData.append('content', content)
            formData.append('location', location)

            await dispatch(createPostThunk(formData))

            return history.push('/home')
        }
    }

    if(!user) history.push('/login')

	return (
		<div className="postform-page">
			<h1 className="form-title">What would you like to market today?</h1>
			<form className="post-form" onSubmit={handleSubmit} encType="multipart/form-data">
				<label className="post-title-label">
					Title
					<input
                        className="postform-input"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
                    {errors.title && submitted && (
                            <p className="errors">{errors.title}</p>
                    )}
				</label>
                <div className="post-category-field">
                    <div className="category-label">
                        <p>Category</p>
                    </div>
                    <div className="category-options">
                        <select className="select-field" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="For Sale">For Sale</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Relationships">Relationships</option>
                            <option value="Inquiries">Inquiries</option>
                            <option value="Random">Random</option>
                        </select>
                    </div>
                </div>
                <div className="post-image-field">
                    <div className="image-label">
                        <p>Add An Image</p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
				<label className="post-content-label">
					Content
					<textarea
                        className="postform-textarea"
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</label>
				<label className="post-location-label">
					Location
					<input
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Market It!</button>
			</form>
		</div>
	);
}

export default PostFormPage;
