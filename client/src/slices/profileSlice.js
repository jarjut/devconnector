import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentUser } from "./authSlice";
import { getErrors } from "./errorSlice";

const initialState = {
	profile: null,
	profiles: null,
	loading: false,
};

/**
 * Profile Services
 */

export const getCurrentProfile = () => (dispatch) => {
	dispatch(profileLoading());
	axios
		.get("/api/profile")
		.then((res) => dispatch(getProfile(res.data)))
		.catch((err) => dispatch(getProfile({})));
};

// Get current profile by handle
export const getProfileByHandle = (handle) => (dispatch) => {
	dispatch(profileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then((res) => dispatch(getProfile(res.data)))
		.catch((err) => dispatch(getProfile(null)));
};

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post("/api/profile", profileData)
		.then((res) => history.push("/dashboard"))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Add experience
export const addExperience = (expData, history) => (dispatch) => {
	axios
		.post("/api/profile/experience", expData)
		.then((res) => history.push("/dashboard"))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Add education
export const addEducation = (eduData, history) => (dispatch) => {
	axios
		.post("/api/profile/education", eduData)
		.then((res) => history.push("/dashboard"))
		.catch((err) => dispatch(getErrors(err.response.data)));
};

// Delete experience
export const deleteExperience = (id) => (dispatch) => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete(`/api/profile/experience/${id}`)
			.then((res) => dispatch(getProfile(res.data)))
			.catch((err) => dispatch(getErrors(err.response.data)));
	}
};

// Delete education
export const deleteEducation = (id) => (dispatch) => {
	if (window.confirm("Are you sure?")) {
		axios
			.delete(`/api/profile/education/${id}`)
			.then((res) => dispatch(getProfile(res.data)))
			.catch((err) => dispatch(getErrors(err.response.data)));
	}
};

// Get all profiles
export const getProfilesAPI = () => (dispatch) => {
	dispatch(profileLoading());
	axios
		.get("/api/profile/all")
		.then((res) => dispatch(getProfiles(res.data)))
		.catch((err) => dispatch(getProfiles(null)));
};

// Delete account & profile
export const deleteAccount = () => (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		axios
			.delete("/api/profile")
			.then((res) => dispatch(setCurrentUser({})))
			.catch((err) => dispatch(getErrors(err.response.data)));
	}
};

/**
 * Profile Slice
 */

export const profileSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		profileLoading: (state) => {
			state.loading = true;
		},
		getProfile: (state, { payload }) => {
			state.loading = false;
			state.profile = payload;
		},
		getProfiles: (state, { payload }) => {
			state.loading = false;
			state.profiles = payload;
		},
		clearCurrentProfile: (state) => {
			state.profile = null;
		},
	},
});

export const {
	profileLoading,
	getProfile,
	getProfiles,
	clearCurrentProfile,
} = profileSlice.actions;
