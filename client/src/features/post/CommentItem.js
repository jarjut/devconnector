import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAPI } from "../../slices/postSlice";
import PropTypes from "prop-types";

const CommentItem = ({ postId, comment }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const onDeleteClick = (postId, commentId) => {
		dispatch(deleteCommentAPI(postId, commentId));
	};
	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-2">
					<a href="profile.html">
						<img
							className="rounded-circle d-none d-md-block"
							src={comment.avatar}
							alt=""
						/>
					</a>
					<br />
					<p className="text-center">{comment.name}</p>
				</div>
				<div className="col-md-10">
					<p className="lead">{comment.text}</p>
					{comment.user === auth.user.id && (
						<button
							className="btn btn-danger mr-1"
							type="button"
							onClick={() => onDeleteClick(postId, comment._id)}
						>
							<i className="fas fa-times" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
};

export default CommentItem;
