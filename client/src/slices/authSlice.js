import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import isEmpty from "../validation/is-empty";
import { getErrors } from "./errorSlice";

const initialState = {
	isAuthenticated: false,
	loading: false,
	user: {},
};

/**
 * Auth Services
 */

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post("/api/users/register", userData)
		.then(() => history.push("/login"))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post("/api/users/login", userData)
		.then((res) => {
			// Save to localStorage
			const { access_token, refresh_token } = res.data;
			// Set token to ls
			localStorage.setItem("jwtToken", access_token);
			localStorage.setItem("refreshToken", refresh_token);
			// Set token to Auth header
			setAuthToken(access_token);
			// Decode tokento get user data
			const decoded = jwt_decode(access_token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => dispatch(getErrors(err.response.data)));
};

/**
 * Auth Slice
 */

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCurrentUser: (state, { payload }) => {
			state.user = payload;
			state.isAuthenticated = !isEmpty(payload);
		},
		logoutUser: (state) => {
			state.user = {};
			state.isAuthenticated = false;
		},
	},
});

export const { setCurrentUser, logoutUser } = authSlice.actions;
