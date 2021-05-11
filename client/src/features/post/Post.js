/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPostAPI } from "../../slices/postSlice";

import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const Post = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { post, loading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getPostAPI(id));
	}, []);

	let postContent;
	if (post === null || loading || Object.keys(post).length === 0) {
		postContent = <Spinner />;
	} else {
		postContent = (
			<div>
				<PostItem post={post} showActions={false} />
				<CommentForm postId={post._id} />
				<CommentFeed postId={post._id} comments={post.comments} />
			</div>
		);
	}
	return (
		<div className="post">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Link to="/feed" className="btn btn-light mb-3">
							Back to Feed
						</Link>
						{postContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
