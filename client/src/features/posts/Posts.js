/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAPI } from "../../slices/postSlice";

const Posts = () => {
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getPostsAPI());
	}, []);

	let postContent;
	if (posts === null || loading) {
		postContent = <Spinner />;
	} else {
		postContent = <PostFeed posts={posts} />;
	}
	return (
		<div className="feed">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<PostForm />
						{postContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Posts;
