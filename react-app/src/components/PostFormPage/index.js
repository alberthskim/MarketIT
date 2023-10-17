import React, { useState } from "react";
import { useDispatch } from "react-redux";

function PostFormPage() {
	const dispatch = useDispatch();
	// const [images, setImages] = useState("");
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
	const [errors, setErrors] = useState([]);


	return (
		<>
			<h1>What would you like to market today?</h1>
			<form>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Title
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
                <div className="category-field">
                    <div className="category-label">
                        <p>Category</p>
                    </div>
                    <div className="category-options">
                        <select className="select-field" value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option value="For Sale">For Sale</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Relationship">Relationship</option>
                            <option value="Inquiries">Inquiries</option>
                            <option value="Random">Random</option>
                        </select>
                    </div>
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
