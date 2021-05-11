import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const errorSlice = createSlice({
	name: "errors",
	initialState: initialState,
	reducers: {
		getErrors: (state, action) => {
			return action.payload;
		},
		clearErrors: () => {
			return {};
		},
	},
});

export const { getErrors, clearErrors } = errorSlice.actions;
