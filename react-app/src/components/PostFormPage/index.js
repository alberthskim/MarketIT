import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../store/post";
import { useHistory } from "react-router-dom";

function PostFormPage() {
	const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
	const [image, setImage] = useState("https://i.imgur.com/VikcUQA.png");
	const [category, setCategory] = useState("For Sale");
	const [title, setTitle] = useState("LOOKING FOR OFFICE SPACE");
	const [content, setContent] = useState("Looking for Office space to rent");
    const [location, setLocation] = useState("Los Angeles");
	const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const chooseCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if(!Object.values(errors).length) {
            console.log("THIS IS THE IMAGE", image)
            const newPost = {
                user_id: user.id,
                image: image,
                categories: category,
                title: title,
                content: content,
                location: location
            }
            console.log("this is new post", newPost)
            await dispatch(createPostThunk(newPost))
            return history.push('/home')
        }
    }

    if(!user) history.push('/login')

	return (
		<>
			<h1>What would you like to market today?</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<label>
					Title
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
                    {errors.title && submitted && (
                            <p className="errors">{errors.title}</p>
                    )}
				</label>
                <div className="category-field">
                    <div className="category-label">
                        <p>Category</p>
                    </div>
                    <div className="category-options">
                        <select className="select-field" value={category} onChange={chooseCategory}>
                            <option value="For Sale">For Sale</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Relationship">Relationship</option>
                            <option value="Inquiries">Inquiries</option>
                            <option value="Random">Random</option>
                        </select>
                    </div>
                </div>
                <div className="image-field">
                    <div className="image-label">
                        <p>Add An Image</p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
				<label>
					Content
					<textarea
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</label>
				<label>
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
		</>
	);
}

export default PostFormPage;
