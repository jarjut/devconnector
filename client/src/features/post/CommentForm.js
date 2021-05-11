import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextAreaFieldGroup from "../../components/TextAreaFieldGroup";
import { addCommentAPI } from "../../slices/postSlice";
import PropTypes from "prop-types";

const CommentForm = ({ postId }) => {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.errors);
	const [text, setText] = useState("");
	const { user } = useSelector((state) => state.auth);

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const newComment = {
			text: text,
			name: user.name,
			avatar: user.avatar,
		};

		dispatch(addCommentAPI(postId, newComment));
		setText("");
	};

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">Make a comment...</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<TextAreaFieldGroup
							placeholder="Reply to post"
							name="text"
							value={text}
							onChange={onChange}
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

CommentForm.propTypes = {
	postId: PropTypes.string.isRequired,
};

export default CommentForm;
