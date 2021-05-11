import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearErrors, getErrors } from "./errorSlice";

const initialState = {
	posts: [],
	post: {},
	loading: false,
};

/**
 * Post Services
 */

// Add Post
export const addPostAPI = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post("/api/posts", postData)
		.then((res) => dispatch(addPost(res.data)))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Get Posts
export const getPostsAPI = (postData) => (dispatch) => {
	dispatch(postLoading());
	axios
		.get("/api/posts", postData)
		.then((res) => dispatch(getPosts(res.data)))
		.catch((err) => dispatch(getPosts(null)));
};

// Get Post
export const getPostAPI = (id) => (dispatch) => {
	dispatch(postLoading());
	axios
		.get(`/api/posts/${id}`)
		.then((res) => dispatch(getPost(res.data)))
		.catch((err) => dispatch(getPost(null)));
};

// Delete Posts
export const deletePostAPI = (id) => (dispatch) => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete(`/api/posts/${id}`)
			.then((res) => dispatch(deletePost(id)))
			.catch((err) => dispatch(getErrors(err.response.data)));
	}
};

// Add Like
export const addLikeAPI = (id) => (dispatch) => {
	axios
		.post(`/api/posts/like/${id}`)
		.then((res) => dispatch(getPostsAPI()))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Remove Like
export const removeLikeAPI = (id) => (dispatch) => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then((res) => dispatch(getPostsAPI()))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Add Comment
export const addCommentAPI = (postId, commentData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then((res) => dispatch(getPost(res.data)))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Delete Comment
export const deleteCommentAPI = (postId, commentId) => (dispatch) => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then((res) => dispatch(getPost(res.data)))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

/**
 * Post Slice
 */

export const postSlice = createSlice({
	name: "post",
	initialState: initialState,
	reducers: {
		postLoading: (state) => {
			state.loading = true;
		},
		getPosts: (state, { payload }) => {
			state.loading = false;
			state.posts = payload;
		},
		getPost: (state, { payload }) => {
			state.loading = false;
			state.post = payload;
		},
		deletePost: (state, { payload }) => {
			state.posts = state.posts.filter((post) => post._id !== payload);
		},
		addPost: (state, { payload }) => {
			state.posts.unshift(payload);
		},
	},
});

export const {
	postLoading,
	getPosts,
	getPost,
	deletePost,
	addPost,
} = postSlice.actions;
