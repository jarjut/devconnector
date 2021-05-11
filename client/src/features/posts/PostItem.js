import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	addLikeAPI,
	deletePostAPI,
	removeLikeAPI,
} from "../../slices/postSlice";

const PostItem = ({ showActions = true, post }) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const onDeleteClick = (id) => dispatch(deletePostAPI(id));
	const onLikeClick = (id) => dispatch(addLikeAPI(id));
	const onUnlikeClick = (id) => dispatch(removeLikeAPI(id));
	const findUserLike = (likes) => {
		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-2">
					<a href="profile.html">
						<img
							className="rounded-circle d-none d-md-block"
							src={post.avatar}
							alt=""
						/>
					</a>
					<br />
					<p className="text-center">{post.name}</p>
				</div>
				<div className="col-md-10">
					<p className="lead">{post.text}</p>
					{showActions && (
						<React.Fragment>
							<button
								type="button"
								className="btn btn-light mr-1"
								onClick={() => onLikeClick(post._id)}
							>
								<i
									className={classNames("fas fa-thumbs-up", {
										"text-info": findUserLike(post.likes),
										"text-secondary": !findUserLike(post.likes),
									})}
								/>
								<span className="badge badge-light">{post.likes.length}</span>
							</button>
							<button
								type="button"
								className="btn btn-light mr-1"
								onClick={() => onUnlikeClick(post._id)}
							>
								<i className="text-secondary fas fa-thumbs-down" />
							</button>
							<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
								Comments
							</Link>
							{post.user === auth.user.id && (
								<button
									className="btn btn-danger mr-1"
									type="button"
									onClick={() => onDeleteClick(post._id)}
								>
									<i className="fas fa-times" />
								</button>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostItem;
