import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextAreaFieldGroup from "../../components/TextAreaFieldGroup";
import { addPostAPI } from "../../slices/postSlice";

const PostForm = () => {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const { user } = useSelector((state) => state.auth);
	const [text, setText] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		const newPost = {
			text: text,
			name: user.name,
			avatar: user.avatar,
		};

		dispatch(addPostAPI(newPost));
		setText("");
	};

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">Say Something...</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<TextAreaFieldGroup
							placeholder="Create a post"
							name="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							error={errors.text}
						/>
						<button type="submit" className="btn btn-dark">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PostForm;
